# Architecture

Proposed modular monolith with a separate worker. Related: [schema](DATABASE.md), [API](API.md), [deployment](DEPLOYMENT.md).

## Components

```text
Browser → Next.js web / API → domain services → Postgres + private storage
                                  ↓ transactional outbox
Device → TLS MQTT broker → Node ingest worker → Postgres
                                  ↓
                       outbox dispatcher → BullMQ / Redis
                                               ↓
                  forecast / routing / export / notification workers
                                ↓ optional AI provider, email provider
```

Postgres is the source of truth. Redis is a transport/cache, not the reward ledger. Supabase Auth supplies identity. Next.js verifies the identity and active membership, then invokes domain services or constrained database functions. Authenticated read clients retain user JWT/RLS; worker connections use a restricted role and bounded functions. The browser never receives database service credentials.

## Intended repository structure

```text
apps/web/src/app/                 public, auth, app routes and api/v1
apps/web/src/components/          shared UI and accessible charts
apps/worker/src/                  ingest, outbox dispatcher, job processors
packages/domain/src/             routing, rewards, units, transition rules
packages/contracts/src/          Zod DTOs and generated OpenAPI schemas
packages/db/src/                 generated types, typed repositories
packages/config/                 shared lint/typescript/env validation
supabase/migrations/             ordered SQL, RLS, functions, indexes
supabase/seed.sql                 deterministic synthetic tenants only
infra/                           local compose and deploy definitions
tests/integration/               database, API, worker checks
tests/e2e/                       browser user journeys
docs/                            optional future home for this pack
```

These directories do not exist in this documentation-only deliverable. Keep domain code independent of Next.js components and providers. Route handlers parse and authorize; domain services decide; repositories transact; workers perform delayed work. Feature flags are evaluated server-side per tenant, never inferred from a hidden button.

## Intake and freshness

1. Authenticate device at broker with its unique credential and topic ACL. Bind org/site/device from trusted registry, not only the payload.
2. Validate schema, sensor mapping, unit, timestamp, range, sequence, and maximum body size. Record rejection reason without leaking credentials.
3. Insert measurement using unique `(org_id, device_id, boot_id, sequence, metric)` for telemetry. MQTT QoS 1 can redeliver; duplicates are harmless.
4. In one transaction create rollup/alert outbox events. Acknowledge durable handling only after commit; on failure reconnect/retry and rely on duplicate protection.
5. Aggregate accepted readings; UI polls authorized summaries while visible. Device becomes stale after `max(3 × expected_interval, 5 minutes)` unless a stricter module rule exists.

Store observed and received timestamps. Up to 24h late readings are accepted with `late` flag; older events are quarantined for review. More than five minutes in the future is rejected. Counter resets require a new epoch or explicit operator correction; do not turn a reset into negative consumption. Gauge samples (tank fullness) are not summed; interval quantities are summed; cumulative counters are differenced within a monotonic epoch. Maintenance gaps remain gaps.

## Forecast baseline v1

Forecast cafeteria `portions_served` for the next named meal service using the median of the previous four matching weekdays at that site and meal type, excluding closure days and invalid observations. Require at least four comparable service observations. Input cutoff precedes the target service; actual target-day outcomes are never features. With fewer samples, return `insufficient_data` and show historical records only.

Use rolling-origin evaluation and report MAE in portions; WAPE = sum absolute error / sum actual, undefined when denominator is zero. A residual-based interval requires at least 20 out-of-sample residuals; otherwise leave interval null and label uncertainty unavailable. Production planning remains manager-controlled: suggested initial production is bounded by site-configured minimum service buffer and reduction limit, never simply “forecast equals production.” Record service stockouts as a counter-metric.

## Routing v1

Construct candidate actions from configured modules/partners. Hard filters: matching resource type/unit, quality approval valid through handoff, expiry window, recipient capacity, site permissions, freshness, and allowed use. Unknown food/water quality blocks the relevant route. Prioritize prevention before stock exists; after production, prefer eligible local reuse, exchange, recycling/composting, then approved disposal.

Within a hierarchy tier, rank by feasible time window, capacity fit, then shortest known distance; ties use stable candidate UUID ordering. Do not mix CO2, litres, money, and kWh into an unexplained scalar score. Persist eligible/rejected candidate reasons and input versions. Manager sees recommendation, rationale, quantity, confidence limitations, and expiry. Approval reruns eligibility against current state; no silent downgrade or automatic actuation.

Solar-aware irrigation is advice only: require approved water use, available volume, valid soil input, equipment availability, and operator checks. A high-solar reading alone cannot authorize irrigation. Garden-food suitability and salinity are external engineering/agronomy decisions recorded as constraints.

## Optional AI explanations

Provide only minimal structured facts and opaque evidence IDs to the AI adapter. Output schema: `summary`, `reasons[]`, `limitations[]`, `evidence_ids[]`. Reject unknown evidence IDs, unsupported numerical claims, tool calls, or attempted state changes. Use one bounded request with 10-second timeout and deterministic fallback; store model identifier, prompt version, latency, and result status. Never send member names, exact household addresses, device secrets, or raw uploaded text without need. A malformed output cannot block a valid routing recommendation.

## Jobs, transactions, and idempotency

Write domain change and outbox row in the same DB transaction. Dispatcher claims rows with `FOR UPDATE SKIP LOCKED`, adds a stable job ID, then marks dispatched. A crash between queue publish and marking can duplicate delivery: every consumer must have a durable unique effect key. Queue retention is not the deduplication mechanism.

Jobs: `aggregate_measurements`, `forecast_service`, `evaluate_routes`, `send_notification`, `generate_export`, `expire_reservations`. Retry transient errors up to five attempts with exponential backoff and jitter; validation errors go directly to failed state. Persist terminal failure and alert manager/operations. Store a lease for running jobs; requeue expired leases. Scheduled sweeps recover unpublished outbox rows and expired reservations. Rebuild queue state from Postgres after Redis loss.

External email is not atomic with Postgres: pass a stable provider idempotency key when supported by the selected adapter, persist provider message ID, and reconcile ambiguous timeouts before resending. If provider deduplication is unavailable or expired, surface uncertain delivery for operations instead of claiming exactly-once email. Financial/stock/reward effects remain DB-transactional. Additional processors handle CSV import and evidence scanning using the same durable job contract.

## Impact accounting

Receipt of verified eligible non-disposal transfers can generate a measured recovery record using actual accepted quantity. Do not count both a food input and its compost output as two units of waste diversion: link transformation lineage and use one boundary-specific accounting event. Food prevention is estimated against a documented baseline, not added to measured diversion. Water reuse requires an actual reuse meter/verified log. Energy generation, self-consumption, and estimated avoided grid use are separate metrics.

Store factor version, geography, period, unit, and source for any CO2e estimate. Disable aggregate CO2e until methodology is approved. Never label recorded handoff quantity as avoided landfill without a defensible counterfactual.

## Physical module interfaces

Each module records vendor/model, capacity/unit, commissioning status, responsible operator, allowed uses, calibration due date, and last inspection. Smart bins supply weight/fill readings; compost units supply batch events; water systems supply levels/flows and external quality evidence; solar provides meter values; gardens provide soil readings. Commissioned sensors are optional per module. P0 has no command topic or actuator endpoint. Physical procedures and local fail-safe controls remain outside this web specification.

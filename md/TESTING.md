# Test strategy

The operational tests and commands below remain planned. The repository root now includes a website/demo test suite and a validation record of checks actually executed; those checks do not establish the backend, hardware, or pilot acceptance described here. Feature acceptance: [FEATURES](FEATURES.md). Command contract: [README](README.md).

## Test layers

Unit tests cover pure rules, quantities, date boundaries, routing eligibility, forecast math and reward calculation. Integration tests use disposable local Postgres/Supabase, Redis and MQTT with actual constraints/RLS. Browser tests cover role-specific flows and failure recovery. Hardware acceptance uses separately commissioned equipment and cannot be inferred from simulator success.

## Deterministic fixtures

Seed two synthetic organizations: Demo Campus and Demo RWA, each with a site. Create owner, manager, operator, member, and partner test users using local test identities. Campus timezone Asia/Kolkata; add a second timezone fixture to catch UTC boundary errors. Use fixed clock in tests. Seed 35 days of meal-service observations, one closure day, missing readings, a revoked device, an expired quality review, and one partner assigned only one transfer.

No real personal data, actual partner claims, or real-world emission factors. Forecast fixture with comparable values 100/110/90/120 has median 105 portions. Reward fixture 10kg ×2×1.5 =30 points before cap. Quantity precision fixture 0.100+0.200 =0.300 using decimal arithmetic, not binary float assumptions.

## Required scenarios

| Feature | Test and expected result |
|---|---|
| F01 | Tenant A JWT against B UUID returns 404/no rows; direct Supabase calls also denied; revoked membership denied; last owner removal blocked. |
| F02 | Uncommissioned module cannot produce actionable route; missing module shows not configured. |
| F03 | QoS duplicate, reconnect, duplicate CSV, source ID replay, boot change, late/future packet, unit mismatch, negative invalid value, counter reset. Exactly one accepted effective reading or explicit rejection. |
| F03 | Atomic CSV with one invalid row inserts zero new rows; expired preview rejected; corrected measurement preserves chain and rebuilds rollup. |
| F04 | Gauges are not summed; mixed units cannot aggregate; missing CO2 factor renders unavailable; site switch clears old data. |
| F05 | Insufficient history produces no invented forecast; closure exclusion; no target leakage; interval absent below residual threshold; zero-denominator WAPE unavailable. |
| F06/F07 | Unsafe/unknown-quality route excluded; stable tie order; changed input invalidates approval; unauthorized operator cannot approve; completion requires evidence. |
| F08/F09 | Expired batch blocked; two concurrent 70kg reservations against 100kg produce at most one success; cancel before dispatch restores stock once. |
| F09 | Dispatch does not earn impact credit; repeated receipt earns once; partial receipt requires remainder disposition; partner cannot read unrelated transfer. |
| F10 | Parallel verification creates one award; 90 points already awarded and 30-point contribution yields 10; policy locked at submission; timezone day boundary correct. |
| F10 | Self-verification fails; full reversal occurs once; no ledger update/delete; replay beyond API idempotency TTL still cannot duplicate. |
| F11 | Email failure leaves in-app event and domain transaction committed; duplicate outbox deliveries do not duplicate user messages. |
| F12 | Correct site/date scope; dangerous text escaped in CSV; evidence URLs expire; revoked recipient cannot get export; estimates separate from measured figures. |
| F13 | Production rejects simulator source; demo cannot send real notifications or award production points. |
| F14 | Malicious note, unknown evidence ID, invented quantity, invalid JSON, provider timeout, quota exhausted → deterministic fallback; no state mutation. |

## End-to-end journeys

1. Owner onboarding → scoped invite → operator entry → dashboard reading.
2. Meal log → forecast → recommendation → manager review → operator completion → actual-outcome report.
3. Batch → quality review → reservation → dispatch → partner receipt → passport history and single impact record.
4. Contribution → independent verification → points calculation → reversal → transparent ledger.
5. Expired session, permission loss, 409 conflict, delayed job, and network timeout each preserve accurate UI state.

## Resilience and load

Kill worker after queue publish but before outbox mark; effect still occurs once. Restart Redis and reconstruct pending jobs from DB. Disconnect broker and replay buffered telemetry. Simulate DB unavailability, storage scan failure, SMTP outage, and AI timeout. Verify retry ceilings and visible failed jobs.

Load-test the PRD envelope: 1,000 devices at one sample/minute, bursts after reconnect, 50 concurrent users, 30-day dashboards. Capture p50/p95/error rate, ingestion lag, queue depth, DB query plans and memory. Baseline performance targets are acceptance goals, not current benchmarks.

## Planned commands

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm test:a11y
pnpm test:load
pnpm docs:check
pnpm build
```

T01 must implement these scripts; `docs:check` checks required documents, local links, Markdown formatting and examples. CI uses frozen lockfile, isolated test services, migrations from empty DB, deterministic seeds and redacted artifacts. Never run reset/seed tests against production.

## Release evidence

Attach command results, tested commit/runtime/dependency versions, migration IDs, a11y/manual browser findings, RLS matrix, backup restore report, and known failures. No “all tests pass” claim without execution. P0 release blocks on unresolved critical authorization, inventory, reward, evidence, or core-accessibility defects. A baseline forecast can ship without an LLM if documented fallback behavior passes.

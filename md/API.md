# API contracts

Proposed REST API prefix `/api/v1`. Not implemented. [Database](DATABASE.md) owns stored fields; [security](SECURITY.md) owns role/site checks. Generate an OpenAPI document from shared schemas during implementation.

## Common protocol

HTTPS only outside local development. Browser uses validated Supabase session cookies; require same-origin mutation requests and CSRF protection. Non-browser user clients may use verified Bearer JWTs. Organization ID in the path selects scope but never grants permission. Query site_id is required for site-scoped lists/creation. Foreign IDs must belong to the authorized scope.

All successful JSON replies use `{ "data": ..., "meta": { "request_id": "uuid" } }`; list meta also contains `next_cursor` or null. POST creates use 201; async jobs use 202; reads/transitions use 200; no-content logout may use 204 through auth adapter. Default page limit 25, max 100. Cursor is opaque and validated; order by created_at/id descending. UTC timestamps use RFC3339. Quantities are decimal strings; points are integer strings; counts and version are integers.

Error shape:

```json
{"error":{"code":"STALE_VERSION","message":"This record changed. Refresh before retrying.","fields":{},"retryable":false},"meta":{"request_id":"00000000-0000-4000-8000-000000000001"}}
```

400 malformed query/cursor; 401 unauthenticated; 403 forbidden role or CSRF; 404 missing or inaccessible object; 409 stale state, reused idempotency key with different body, or insufficient stock; 413 oversized payload; 422 field/domain validation; 429 rate limit with Retry-After; 503 unavailable dependency. Never return SQL errors, stack traces, secrets, or another tenant's existence.

Require `Idempotency-Key` UUID on all application POST mutations except pure preview/validation; persist request hash and exact response for 24h. Same key/body replays response; different body returns 409. State transitions require body `expected_version`; stale version returns 409. Durable unique domain effect keys protect retries beyond 24h. Atomic functions commit state, audit, and outbox together.

## Roles legend

O owner; M manager; W operator; U member; P partner. O has all organization administrative rights. M manages assigned sites. W records and completes assigned work. U reads own participation and approved aggregates. P accesses assigned transfers only. All rows below require active membership and applicable site assignment; details are in SECURITY.

## Endpoint inventory

Paths below are relative to `/api/v1`; `:org` means organization UUID.

| Method / path | Allowed | Request / response contract |
|---|---|---|
| GET /me | authenticated | User profile, active memberships, accessible sites; no secrets |
| POST /organizations | authenticated verified user | `{name,slug}` → organization and owner membership; rate-limit creation |
| POST /orgs/:org/invitations | O/M | `{email,role,site_ids,partner_id?}` → invitation id/expiry; M cannot invite owner/manager |
| POST /invitations/accept | authenticated | `{token}` → membership; verified account email must match invitation |
| GET /orgs/:org/sites | all | Authorized site summaries |
| POST /orgs/:org/sites | O | `{name,timezone,enabled_streams}` → site |
| PATCH /orgs/:org/sites/:id | O/M | `{expected_version, name?, timezone?, enabled_streams?}` → updated site; timezone change requires no active reward bucket day ambiguity |
| GET, POST /orgs/:org/modules | GET O/M/W; POST O/M | GET site_id; POST module fields from DATABASE → module |
| GET, POST /orgs/:org/measurement-points | O/M/W read; O/M create | Point schema including site_id, metric, unit, aggregation, bounds |
| GET, POST /orgs/:org/devices | O/M | Registry metadata; POST site_id/module_id/external_id → provisioning reference; credentials delivered separately through secret workflow |
| POST /orgs/:org/devices/:id/revoke | O/M | `{expected_version,reason}` → revoked; broker ACL removal task |
| GET /orgs/:org/measurements | O/M/W | site_id, point_id?, from/to, cursor → effective readings |
| POST /orgs/:org/measurements | O/M/W | Manual reading schema below → reading |
| POST /orgs/:org/measurements/:id/correct | O/M | `{value,observed_at,reason}` → replacement and correction link |
| POST /orgs/:org/imports/preview | O/M/W | UTF-8 CSV max 5 MB/10k rows; point_id, observed_at, value, unit, source_event_id → validation report and signed preview token |
| POST /orgs/:org/imports/commit | O/M/W | `{preview_token}` → job; revalidate authorization/content hash; token expires 30 minutes |
| GET /orgs/:org/dashboard | O/M/W/U | site_id, from/to max 366 days → metric groups, basis, units, freshness; U receives aggregates only |
| GET, POST /orgs/:org/meal-services | O/M/W | GET site/date range; POST service fields → service; updates via PATCH /:id with expected_version |
| GET /orgs/:org/forecasts | O/M/W | site_id, target date range → immutable forecast records |
| POST /orgs/:org/forecasts/run | O/M | `{site_id,target_date,meal_type}` → job; one effect key per input cutoff/version |
| GET /orgs/:org/recommendations | O/M/W | site_id,state?,cursor → recommendations with reasons |
| POST /orgs/:org/recommendations/evaluate | O/M | `{site_id}` → routing job |
| GET /orgs/:org/recommendations/:id | O/M/W | Recommendation plus evidence summaries |
| POST /orgs/:org/recommendations/:id/transition | O/M; W completion only | `{expected_version,action,reason?,evidence_ids?,assigned_to?}`; action approve/reject/complete/cancel → new state; approval requires an active operator/manager assignee in the same site |
| GET, POST /orgs/:org/batches | O/M/W | GET filters; POST site/type/quantity/unit/produced_at/expires_at/source_measurement_id → batch and passport |
| POST /orgs/:org/batches/:id/review | O/M trained verifier | `{expected_version,decision,checklist_version,valid_until,evidence_id,notes?}` → quality review |
| GET /orgs/:org/passports/:code | O/M/W; P assigned projection | Passport and chronological events; no public PII |
| GET, POST /orgs/:org/partners | O/M | Registered contacts; creation initially pending |
| POST /orgs/:org/partners/:id/verify | O/M | `{expected_version,allowed_resource_types,verification_expires_at,evidence_id}` → verified partner |
| GET, POST /orgs/:org/transfers | O/M/W read; O/M create | POST `{site_id,batch_id,partner_id,quantity,unit,reserved_until,recommendation_id?}` → reserved transfer |
| POST /orgs/:org/transfers/:id/transition | by action | `{expected_version,action,accepted_quantity?,evidence_id?,reason?,remainder_disposition?}`; O/M cancel/reconcile, assigned W dispatch, assigned P receive/dispute |
| GET, POST /orgs/:org/contributions | U own; O/M/W scoped | POST `{site_id,batch_id,measurement_id,quantity,unit}` → submitted with policy snapshot; server sets member_id |
| POST /orgs/:org/contributions/:id/verify | O/M/W independent verifier | `{expected_version,decision,evidence_id}` → verified/rejected; verified award atomic |
| GET /orgs/:org/points | U own; O/M scoped | site_id, member_id? → ledger and balance; U cannot select another member |
| POST /orgs/:org/points/:entry/reverse | O/M | `{reason,evidence_id}` → full reversal; repeated request returns existing reversal |
| GET, POST /orgs/:org/reward-policies | GET all except P; POST O/M | Versioned rates/multiplier/cap/effective_from → immutable policy |
| GET /orgs/:org/notifications | all | Own notifications only |
| POST /orgs/:org/notifications/:id/read | recipient | `{}` → read timestamp; idempotent |
| PUT /orgs/:org/notification-preferences | recipient | `{category,email_enabled}` → preference |
| POST /orgs/:org/evidence/upload-url | O/M/W/P assigned | `{site_id,media_type,byte_size,sha256,purpose,entity_id}` → short-lived signed URL and evidence_id |
| POST /orgs/:org/evidence/:id/finalize | uploader | `{}` → scan job; no clean status until verified |
| POST /orgs/:org/exports | O/M/W | `{site_id,kind,from,to,format:"csv"}` → job; scoped fields only |
| GET /orgs/:org/jobs/:id | requester or O/M | State/progress; signed result URL only on success and still authorized |
| GET /orgs/:org/audit | O/M | Authorized scope and pagination; no unrestricted export |
| GET /health/live | public minimal | `{status:"ok"}`; no configuration |
| GET /health/ready | deployment monitor | Dependency readiness; protect detailed diagnostics |

Detail GETs for modules, devices, batches, transfers, and jobs use the corresponding collection path plus `/:id` with identical scope restrictions. PATCH memberships and site assignments is O-only, with expected_version and last-owner protection; removing access revokes pending invitation/session capability at authorization boundary. These admin actions must be implemented with F01, not by direct dashboard database editing.

Administrative paths are `GET /orgs/:org/memberships`, `PATCH /orgs/:org/memberships/:id` with `{expected_version,role?,status?,site_ids?}`, and `PATCH /orgs/:org/meal-services/:id` for meal updates. Module/point/partner configuration updates use PATCH on their detail paths with expected_version and the create schema's editable fields; historical units/aggregation cannot change once readings exist (create a new point instead). Published site/reward policies are immutable: `GET, POST /orgs/:org/site-policies` provides O/M publication with `{site_id,kind,policy_version,effective_from,config}`. Server validates typed config and effective dates.

## Examples

Manual measurement creation:

```json
{"site_id":"11111111-1111-4111-8111-111111111111","point_id":"22222222-2222-4222-8222-222222222222","observed_at":"2026-09-28T06:30:00Z","value":"12.500","unit":"kg","source_event_id":"manual-cafeteria-20260928-01"}
```

Server assigns source `manual`, actor, org, and received_at. A resource's canonical unit must match the point. A negative weight is 422. Replaying the same event cannot add another reading even with a different API idempotency key.

Recommendation response fragment (fictional):

```json
{"id":"33333333-3333-4333-8333-333333333333","version":1,"state":"proposed","kind":"reduce_initial_food_production","stream":"food","quantity":"30","unit":"portion","valid_until":"2026-09-29T05:00:00Z","rule_version":"food-buffer-v1","reasons":["Comparable service demand is below the current preparation plan."],"basis":"estimated","requires_human_approval":true}
```

State command: `{"expected_version":1,"action":"approve","reason":"Kitchen lead reviewed the service buffer."}`. Approval of an expired or stale-input recommendation returns 409 `REVALIDATION_REQUIRED`, with no state change.

## MQTT telemetry contract

Topic: `ecoloop/v1/{org_id}/{site_id}/{device_id}/telemetry`. TLS required, QoS 1, retained false. ACL permits a device to publish only its own topic. Worker verifies registry/topic/payload agreement. No P0 command topic.

```json
{"schema_version":1,"device_id":"44444444-4444-4444-8444-444444444444","boot_id":"55555555-5555-4555-8555-555555555555","sequence":18,"observed_at":"2026-09-28T06:30:00Z","readings":[{"metric":"bin_weight","value":"12.500","unit":"kg"}]}
```

Maximum 16KB payload and 20 readings; sequence nonnegative safe integer; boot_id changes per boot; metric is a provisioned device_points key. Reject unknown schema versions. Persist valid readings atomically for a packet; any invalid reading quarantines the packet for review, not partial invisible success. Device buffers up to 24h and reconnects with bounded exponential backoff. Simulator emits this same contract into the isolated demo broker.

## Operational limits and future contracts

Starting limits: 120 reads/min/user, 30 mutations/min/user, 5 export requests/hour/user, 10 AI explanations/day/site; device expected rate plus a 3x burst allowance. Tune using pilot telemetry and return clear retry instructions. CSV and uploads never fetch arbitrary user-supplied URLs. Evidence permits PDF/JPEG/PNG up to 10MB; server inspects bytes, scans, strips image metadata where practical, and denies active content.

P1 network APIs require a separate bilateral-access contract before coding. No placeholder marketplace write endpoint, payments endpoint, actuator endpoint, or reward redemption endpoint should appear live in P0.

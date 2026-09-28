# Database specification

PostgreSQL through Supabase; SQL migrations are authoritative. This is a schema design, not executed DDL. [API](API.md) defines wire formats; [SECURITY](SECURITY.md) defines authorization.

## Conventions

Unless stated otherwise each table has `id uuid PK default gen_random_uuid()`, `created_at timestamptz not null default now()`. Tenant tables have `org_id uuid not null FK organizations`. Mutable rows have `updated_at timestamptz`, `version integer not null default 1`. Enumerations below are enforced with SQL CHECK constraints or reference tables. Quantities use `numeric(18,3)`; multiplier/rates use `numeric(12,4)`; points use `bigint`. API decimals are strings. UUIDs are not secrets.

Every referenced tenant entity has `UNIQUE(org_id,id)` and every tenant-child reference uses a composite FK `(org_id,parent_id) → parent(org_id,id)`. Site-scoped entities additionally enforce matching site through a unique `(org_id,site_id,id)` parent key and matching FK where necessary. This prevents cross-tenant/site references even through privileged code. Nullable fields below are marked `?`; other fields are required unless a default is stated.

## Identity and configuration

| Table | Fields beyond conventions | Constraints / behavior |
|---|---|---|
| organizations | name text, slug text, status `active/suspended`, timezone text | Unique slug; valid IANA timezone; first owner established atomically |
| profiles | id uuid FK auth.users, display_name text, locale text default `en-IN` | Global user profile, no org_id; no role here |
| memberships | user_id uuid FK profiles, role `owner/manager/operator/member/partner`, status `active/revoked`, partner_id? | Unique `(org_id,user_id)`; partner role requires partner_id; last active owner cannot be removed |
| sites | name, timezone default `Asia/Kolkata`, address_private?, latitude?, longitude?, enabled_streams text[] | Coordinates bounded; exact location private; streams restricted to four canonical values |
| site_memberships | membership_id, site_id | Unique `(org_id,membership_id,site_id)`; owner may access all org sites |
| invitations | email_normalized, role, site_ids uuid[], token_hash, expires_at, accepted_at? | Owner/manager scoped creation; single-use hash; site_ids validated before insert and acceptance |
| modules | site_id, kind `bin/compost/water/solar/garden`, name, capacity?, unit?, status `planned/commissioned/maintenance/retired`, operator_id?, commissioned_at?, calibration_due_at?, metadata jsonb | Typed metadata schema: vendor/model, allowed_uses, inspection timestamp, reference documents; no arbitrary secrets |
| resource_types | code, stream, canonical_unit, transferable boolean, requires_quality boolean | Unique `(org_id,code)`; energy/water not transferable in P0; no cross-dimensional conversion |
| measurement_points | site_id, module_id?, resource_type_id, metric, unit, aggregation `gauge/interval/counter`, min_value?, max_value?, expected_interval_seconds? | Unique `(org_id,site_id,metric,id)`; point defines aggregation, not client payload |
| devices | site_id, module_id?, external_id, credential_ref, status `active/revoked`, last_seen_at? | Unique `(org_id,external_id)`; credential_ref points to secret manager, no raw secret |
| device_points | device_id, point_id, metric | Unique `(org_id,device_id,metric)`; point and device belong to same site |
| site_policies | site_id, kind, policy_version, effective_from, config jsonb, published_by | Immutable published row; unique `(org_id,site_id,kind,policy_version)`; schema validates freshness, food buffer, route eligibility, etc. |

## Observations and planning

| Table | Fields | Constraints / behavior |
|---|---|---|
| measurements | site_id, point_id, device_id?, source `manual/csv/mqtt/simulator`, source_event_id, observed_at, received_at, value, unit, quality `valid/late/quarantined/invalid`, boot_id?, sequence?, supersedes_id?, created_by? | Immutable; source_event_id unique per org/source; partial unique telemetry key `(org_id,device_id,boot_id,sequence,point_id)`; finite bounded value and matching unit; simulator accepted only in demo |
| measurement_corrections | site_id, original_id, replacement_id, reason, actor_id | Unique original_id; replacement must use same point; effective query follows latest chain; prevent cycles |
| measurement_rollups | site_id, point_id, bucket_start, bucket_seconds, value?, valid_samples, expected_samples?, quality, calculated_at | Unique point/bucket; regenerated derived data; null value for no valid observations |
| meal_services | site_id, service_date date, meal_type `breakfast/lunch/dinner`, planned_portions integer, prepared_portions?, served_portions?, discarded_food_kg?, stockout boolean default false, closed boolean default false, verified_by? | Unique site/date/meal; nonnegative counts; served <= prepared when both known; closed days excluded from forecast |
| forecasts | site_id, meal_type, target_at, cutoff_at, algorithm_version, status `ready/insufficient_data/failed`, predicted_portions?, lower_bound?, upper_bound?, sample_count, input_refs jsonb, metrics jsonb | Target > cutoff; range lower <= point <= upper; bounds both null when unavailable |
| recommendations | site_id, kind, stream, state, quantity?, unit?, batch_id?, assigned_to?, valid_until, rule_version, input_refs jsonb, reasons jsonb, expected_outcome jsonb, approved_by?, approved_at?, completed_at? | States below; JSON typed and size-bounded; approval version increment; estimates never treated as observations |
| recommendation_events | site_id, recommendation_id, event_type, actor_id?, payload jsonb | Append-only state/evidence history; event type matches transition |

Recommendation states: `proposed → approved/rejected/expired`; `approved → completed/cancelled/expired`. No transition out of a terminal state; create a new linked recommendation for a new attempt. Completion requires evidence references and an authorized assigned operator or manager. Expiry during work requires manager review before a new action is proposed.

## Resources and movement

| Table | Fields | Constraints / behavior |
|---|---|---|
| resource_batches | site_id, resource_type_id, passport_code, initial_quantity, available_quantity, reserved_quantity default 0, unit, state `available/depleted/quarantined/expired`, produced_at, expires_at?, source_measurement_id?, quality_status `pending/approved/rejected`, quality_valid_until? | Unique org/passport_code; quantities >=0; available + reserved <= initial; approved quality required for quality-sensitive routes |
| batch_lineage | site_id, parent_batch_id, child_batch_id, input_quantity, input_unit, process_type | Acyclic links, positive input; conversion yield not assumed equal; links prevent double-counting |
| quality_reviews | site_id, batch_id, decision, verifier_id, valid_until?, checklist_version, evidence_id, notes? | Append-only; latest valid approval drives batch projection; no automatic AI approval |
| passport_events | site_id, batch_id, type, actor_id?, occurred_at, payload jsonb | Append-only; creation, review, reservation, dispatch, receipt, amendment |
| partners | name, contact_email?, allowed_resource_types uuid[], status `pending/verified/suspended`, verification_expires_at?, verification_evidence_id?, latitude?, longitude?, capacity_config jsonb | Tenant-owned P0 partner contact; verification evidence required before eligible route; type IDs must be validated against same org |
| transfers | site_id, batch_id, partner_id, recommendation_id?, quantity, unit, accepted_quantity?, state, reserved_until, dispatched_at?, received_at?, receipt_by?, evidence_id?, dispute_reason? | States below; quantity >0; accepted between 0 and quantity; source batch/unit fixed |
| contributions | site_id, member_id, batch_id, measurement_id, quantity, unit, policy_id, status `submitted/verified/rejected`, verified_by?, verified_at?, verification_evidence_id? | Unique source measurement/member action; contribution totals cannot exceed eligible batch quantity; verifier differs from contributor |

P0 transfer states: `reserved → dispatched/cancelled/expired`; `dispatched → received/disputed`; `disputed → received/cancelled`. A disputed cancellation requires source manager reconciliation evidence and records lost/disposed/returned disposition. A received partial quantity requires the unaccepted remainder's disposition in the same transaction; do not silently restore dispatched inventory.

Reservation transaction locks batch row; require enough available quantity and eligible quality/expiry/partner; decrement available, increment reserved, insert transfer and passport event/outbox. Dispatch decrements reserved; quantity remains out of available stock. Pre-dispatch cancel/expire restores available. Receipt records accepted amount and accounting event once. Post-dispatch return only restores stock through an explicit checked amendment with evidence. A unique transfer receipt event prevents duplicate credit.

## Rewards, evidence, and operations

| Table | Fields | Constraints / behavior |
|---|---|---|
| reward_policies | site_id, policy_version, effective_from, rates jsonb, multiplier, daily_cap, published_by | Immutable; multiplier 1..2; cap >=0; unique site/version |
| reward_buckets | site_id, member_id, local_date, awarded_points | Unique member/site/date; locked during award to enforce cap |
| reward_ledger | site_id, member_id, contribution_id?, entry_type `award/reversal`, points_delta bigint, policy_id?, calculation jsonb, reverses_id?, effect_key | Append-only; unique org/effect_key; award >0, reversal <0; one reversal per award; corrections use full reversal plus new award with new correction source |
| impact_factors | metric, geography, valid_from, valid_to?, factor_value, input_unit, output_unit, source_url, method_version, approved_by | Tenant-owned/versioned; not seeded with purported real-world factors |
| impact_records | site_id, source_type, source_id, metric, amount, unit, basis `measured/estimated`, factor_id?, boundary_key, evidence_refs jsonb | Unique `(org_id,source_type,source_id,metric,boundary_key)`; correction by compensating record; separate dimensions |
| evidence_files | site_id, owner_id, purpose, entity_type, entity_id, storage_path, media_type, byte_size, sha256, status `pending/clean/rejected`, retention_until | Private bucket; signed upload; clean evidence only may satisfy receipt/review; domain function validates polymorphic target in same site |
| notifications | recipient_id, site_id?, event_key, category, body_template, data jsonb, read_at?, email_status | Unique `(org_id,recipient_id,event_key)`; no arbitrary HTML |
| notification_preferences | user_id, category, email_enabled | Unique org/user/category; in-app operational history retained |
| imports | site_id, requested_by, storage_path, content_hash, row_count, validation_summary jsonb, token_hash, expires_at, state `previewed/committed/failed`, job_id? | Private staged CSV; commit token bound to actor/org/content hash; purge staged file after job completion or expiry |
| jobs | site_id?, requested_by?, kind, payload jsonb, effect_key, state `queued/running/succeeded/failed`, attempt_count, lease_until?, result_path?, error_code? | Unique org/effect_key; typed payload; export result expires after 24h |
| outbox | site_id?, event_type, aggregate_id, payload jsonb, effect_key, dispatched_at? | Immutable payload; unique org/effect_key; index undelivered rows |
| processed_effects | consumer, effect_key, completed_at, result_ref? | Unique `(org_id,consumer,effect_key)`; inserted atomically with side effect |
| idempotency_keys | actor_id, route, key_hash, request_hash, status_code, response jsonb, expires_at | Unique org/actor/route/key_hash; 24h API replay window; durable domain constraints persist longer |
| audit_events | site_id?, actor_type, actor_id?, action, entity_type, entity_id, before_summary?, after_summary?, request_id | Append-only; redact PII/secrets; privileged access audited |

P1 tables (do not migrate until T13): `network_listings` with owner org, coarse location, resource projection, `predicted/measured`, visibility/expiry and optional batch; `listing_interests` with requester org and non-binding quantity; `network_matches` with explicitly authorized source/destination orgs and state. Do not apply the tenant-local transfer FK model directly to cross-tenant writes; ADR and separate bilateral policies are required before implementation.

## Indexes and performance

Index membership lookup `(user_id,org_id,status)`, site access keys, measurements `(org_id,site_id,point_id,observed_at desc)`, recommendations `(org_id,site_id,state,valid_until)`, transfers `(org_id,state,reserved_until)`, passport events `(org_id,batch_id,occurred_at)`, reward ledger `(org_id,member_id,created_at)`, and notifications `(org_id,recipient_id,created_at desc)`. Use keyset pagination on `(created_at,id)`. Review query plans against pilot-size fixtures before adding telemetry partitioning. Rollups are rebuilt from canonical corrected observations.

## RLS and database write boundary

Enable RLS on every tenant table and private storage object. Deny anon access to business rows. Active membership plus site assignment gates read access, further narrowed for member/partner roles. Owner sees all sites in own org. Members see their contributions/ledger and approved site aggregates, not raw observations or other members. Partners see assigned transfers and minimum associated passport projection.

Revoke direct client insert/update/delete on ledgers, stock balances, state machines, audit, outbox, and impact tables. Expose narrowly scoped transactional functions with caller checks. SECURITY DEFINER functions set a fixed search_path, use schema-qualified names, reject arbitrary org claims, and grant execute only to intended roles. Test RLS with user JWTs, not only service keys. No permissive `USING (true)` business policies.

## Migration sequence and retention

1. Identity/config and RLS; 2. observations and quality; 3. forecasts/recommendations; 4. batches/transfers/evidence; 5. rewards/impact; 6. jobs/audit/indexes. Each migration gets forward/rollback notes and seed fixtures. Production uses expand/contract migrations; destructive schema changes require data migration and verified backup.

Proposed pilot retention: raw telemetry 90 days, rollups 24 months, private evidence 12 months, operational/ledger/audit records 24 months, exports 24h, API idempotency rows 24h. These are product defaults awaiting contractual/privacy review. Purging a raw row referenced by active evidence must preserve an immutable minimal evidence snapshot first. Purge jobs honor legal/contractual holds; user deletion pseudonymizes retained records and removes unnecessary identifiers without rewriting ledger history. Never claim statutory retention compliance from these defaults.

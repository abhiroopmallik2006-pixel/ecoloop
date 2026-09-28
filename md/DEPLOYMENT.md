# Deployment and operations

Proposed runbook; nothing has been deployed. Selected provider references are in [TECH_STACK](TECH_STACK.md). Do not purchase plans, register domains, send real emails, or provision hardware merely by following this document without the project's deployment authorization.

## Environments

Local: local Supabase + Redis + Mosquitto; synthetic seed; mock email/AI. Demo/preview: isolated credentials/data, simulator allowed, external messaging disabled, no production account access. Staging: production-like services with synthetic data and explicit test recipients. Production: real users only after pilot gates; no demo seed or simulator credentials.

Default web host is Vercel; long-running Node worker on Render; managed Supabase database/auth/storage; Redis-compatible endpoint validated for BullMQ; separately hosted TLS MQTT broker. Select regions and processing terms together. Do not expose local unencrypted broker/Redis ports to the internet or assume a web serverless host runs persistent subscriptions.

## Environment variable contract

T01 must implement strict startup validation and `.env.example` with placeholders only. Values below are names, not credentials.

| Name | Scope | Purpose |
|---|---|---|
| NODE_ENV | all | Runtime production/development mode |
| APP_ENV | server/worker | local/demo/staging/production |
| APP_BASE_URL | server | Trusted canonical and auth callback origin |
| NEXT_PUBLIC_SUPABASE_URL | web | Public platform URL |
| NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY | web | Public client key; RLS still required |
| SUPABASE_SECRET_KEY | restricted server admin | Administrative Auth/storage tasks only; never browser |
| DATABASE_URL | worker/server if needed | Restricted runtime DB role and connection pooling |
| MIGRATION_DATABASE_URL | CI deployment only | Privileged migration role; absent from web runtime |
| REDIS_URL | worker | TLS queue endpoint |
| MQTT_URL | worker | `mqtts://` broker endpoint |
| MQTT_USERNAME / MQTT_PASSWORD | worker | Restricted subscriber identity if certificate auth not used |
| MQTT_CA_PATH / MQTT_CERT_PATH / MQTT_KEY_PATH | worker | Mounted secret files for certificate configuration |
| RESEND_API_KEY / EMAIL_FROM | worker | Optional approved transactional sending |
| EMAIL_ENABLED | worker | False in local/demo; explicit allowlist in staging |
| AI_ENABLED | worker | Default false until provider evaluated |
| AI_PROVIDER / AI_MODEL | worker | Approved provider adapter/model identifier |
| AI_PROVIDER_API_KEY | worker | Adapter maps this secret to selected provider client |
| AI_DAILY_REQUEST_LIMIT | worker | Default 10/site; server-side budget |
| MAP_STYLE_URL | server config | P1 approved tile/style endpoint; use restricted public token if required |
| OTEL_EXPORTER_OTLP_ENDPOINT | server/worker | Optional telemetry sink |
| OTEL_EXPORTER_OTLP_HEADERS | server/worker | Secret auth headers, redacted |
| STORAGE_BUCKET_EVIDENCE | server/worker | Private evidence bucket name |
| STORAGE_BUCKET_EXPORTS | worker | Private export bucket name |

Feature flags are server configuration: `network_enabled=false`, `redemption_enabled=false`, `actuation_enabled=false` for P0. Even if an unknown flag is enabled accidentally, no unsupported endpoint should exist. Device-specific credentials are issued through secure provisioning, never baked into firmware examples or shared `.env` files.

## Local startup contract

After T01 provides configuration, install pinned Node/pnpm and container runtime, copy `.env.example` to `.env.local`, populate local credentials, start `pnpm infra:up`, apply `pnpm db:migrate`, then `pnpm db:seed`, then `pnpm dev` (web) and `pnpm worker:dev` (separate terminal). `pnpm simulator` publishes only into local/demo. These commands do not exist in this pack yet.

## Release procedure

1. Confirm P0 gates and rollout owner; choose tested commit, record version/runtime/migrations.
2. Verify backups and recent restore drill; check secrets, auth redirect allowlist, TLS, email domain, bucket privacy, broker ACLs, quotas and region decisions.
3. Run frozen install, lint/types/tests/build in CI. Generate dependency inventory; reject secret leakage and critical unresolved findings.
4. Apply backward-compatible migrations in staging, deploy worker and web, run synthetic smoke flows, and inspect traces/queue lag.
5. Apply additive production migrations using the dedicated migration role. Deploy worker and web compatible with both old and new schema during rollout.
6. Smoke login/site access, safe manual test reading, private export, worker readiness and alert delivery with approved test account. Use non-impact test records, not fake real recoveries.
7. Enable one pilot tenant; observe errors/lag/authorization before expansion. Record release and known limits.

Web build uses `pnpm --filter @ecoloop/web build`; worker build uses `pnpm --filter @ecoloop/worker build`; production worker starts compiled Node entrypoint. Package names and commands must be created by T01. Web request handlers must not launch background subscriber loops.

## Monitoring and operations

Observe API latency/error rate, DB connections, ingestion lag, stale devices, undelivered outbox age, queue retry/failure count, email failures, AI budget usage, unauthorized attempts, and export failures. Starting alert thresholds: undelivered outbox >5 minutes, queue oldest age >10 minutes, sustained API 5xx >2% over 5 minutes, unexpected reward invariant failure immediately. Tune to pilot operating hours; avoid treating missing night-time manual entries as sensor outages.

Liveness checks process health. Readiness checks essential dependencies but does not expose secrets publicly. Correlate request_id, job_id, and aggregate ID without logging raw user data. Assign owner and response instructions for each alert.

## Backup, recovery, rollback

Proposed RPO 24h/RTO 4h requires backup plan with DB and private object storage coverage; managed database backups do not automatically prove evidence objects are backed up. Test restoration into an isolated environment, verify tenant access and ledger/stock invariants, and measure recovery time.

Rollback application to prior tested artifact; keep additive schema. Do not run destructive down migrations against live data. Pause affected consumers if new jobs are incompatible; replay from durable outbox only after fixed consumers are deployed. On data corruption restore into a new database, reconcile post-backup events and object files, verify counts/invariants, then switch traffic deliberately. Redis loss should require queue reconstruction, not loss of transactions. Rotate compromised credentials separately from rollback.

## Cost and operational gates

Set budgets for continuous compute, storage/egress, database backups, email, maps, and model tokens. No exact prices/free-tier claims are assumed. Pilot owner must choose production domain, vendor regions, notification recipients, safety contacts, retention policy, and support hours. Document these decisions before T12 completion.

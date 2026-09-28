# Technology stack and reference register

Research date: **2026-09-28**. These are proposed dependencies and implementation references, not installed or compatibility-tested packages. Public pages below were opened during research. No repository code was copied. Pin exact versions and review licenses/security at scaffold time; do not use floating `latest` in CI.

## Selected baseline

Use a TypeScript pnpm workspace with Next.js App Router for the web/API, Supabase for Postgres/Auth/private object storage, and a separate long-running Node worker for MQTT intake and jobs. Use SQL migrations and generated database types, not a second competing ORM migration system. Choose Node 24 LTS as a proposed runtime baseline, subject to dependency/hosting verification in T01; pin the actual tested patch and pnpm version in the repository.

| Area | Selection and public reference | EcoLoop use / constraint |
|---|---|---|
| Web/API | [Next.js documentation](https://nextjs.org/docs) | Server-rendered public pages, authenticated App Router screens, Route Handlers. Keep privileged modules server-only. |
| UI primitives | [shadcn/ui repository](https://github.com/shadcn-ui/ui) | Reference for composable dashboard controls. Its source-distribution approach means generated component files become maintained project code; retain applicable notices. |
| Animation | [Motion repository](https://github.com/motiondivision/motion) | Optional brief panel transitions and public explainer animation; reduced-motion fallback. No paid examples assumed. |
| Charts | [Recharts repository](https://github.com/recharts/recharts) | Responsive stream trends with units, accessible tabular alternative, and explicit gaps. |
| Tables | [TanStack Table repository](https://github.com/TanStack/table) | Filtering/sorting/pagination state for batches and readings; server performs authorized querying. |
| Maps | [MapLibre GL JS repository](https://github.com/maplibre/maplibre-gl-js) | P1 partner discovery. Renderer does not supply tiles, geocoding, or routing services; choose licensed providers separately. |
| Database/platform | [Supabase repository](https://github.com/supabase/supabase) | Managed Postgres, Auth, storage; platform hosting terms differ from repository licenses. |
| Auth | [Supabase SSR guide](https://supabase.com/docs/guides/auth/server-side/nextjs) | Cookie-aware server/client integration with `@supabase/ssr`. Validate identities server-side; don't trust UI route guards. |
| Tenant isolation | [Supabase RLS guide](https://supabase.com/docs/guides/database/postgres/row-level-security) | Row policies plus application authorization; server secrets can bypass RLS and need separate restriction. |
| Validation | [Zod repository](https://github.com/colinhacks/zod) | Shared request schemas, discriminated telemetry types, AI output validation. DB constraints remain authoritative. |
| AI integration | [Vercel AI SDK repository](https://github.com/vercel/ai) | Provider adapter for schema-constrained explanations. Select provider/model through configuration after evaluation; no model needed for baseline forecasting. |
| Queue | [BullMQ repository](https://github.com/taskforcesh/bullmq), [documentation](https://docs.bullmq.io/) | Redis-backed jobs for exports, forecasts, alerts. Use documented stable Redis mode for this design; DB outbox remains durable truth. |
| IoT broker | [Eclipse Mosquitto documentation](https://mosquitto.org/documentation/) | Local/dev MQTT broker and possible managed-by-operator deployment. TLS, per-device ACLs, persistent configuration required. |
| IoT client | [MQTT.js repository](https://github.com/mqttjs/MQTT.js) | Worker subscribes to authorized telemetry topics; simulator uses same payload. No browser MQTT credentials. |
| Notifications | [Resend Node SDK](https://github.com/resend/resend-node) | Transactional email adapter; verify sending domain, configure preferences and suppression. In-app messages are stored independently. |
| Web hosting | [Vercel Next.js guide](https://vercel.com/docs/frameworks/full-stack/nextjs) | Proposed web/API host. Preview environments need separate non-production data and restricted credentials. |
| Worker hosting | [Render background workers](https://render.com/docs/background-workers) | Proposed continuous worker host; separate broker endpoint required. Confirm region and plan support before purchase. |
| Observability | [OpenTelemetry JavaScript](https://opentelemetry.io/docs/languages/js/) | Server traces and job correlation; redact payloads and user identifiers. Backend choice remains open. |
| Unit/integration tests | [Vitest repository](https://github.com/vitest-dev/vitest) | Pure rule/math tests and API integration harness. |
| Browser tests | [Playwright repository](https://github.com/microsoft/playwright) | Login, tenant isolation, mobile flows, retries, accessible page checks. |
| Accessibility checks | [axe-core repository](https://github.com/dequelabs/axe-core), [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Automated checks plus keyboard/screen-reader review; automation alone cannot certify conformance. |

Use CSS custom properties and a small Tailwind utility layer if compatible with the selected shadcn version. Native fetch/server data loading is sufficient initially; add a query-cache library only after interaction complexity warrants it. Use built-in Intl formatting with explicit site timezone. For QR generation, select a maintained encoder during T06 after license/accessibility review; QR is a navigation aid, never authentication.

## Deployment shape and alternatives

Default: Vercel web + Supabase managed project + Render Node worker + a Redis-compatible service validated against the chosen BullMQ version + hosted MQTT broker. For local work, containerize Redis and Mosquitto and run Supabase locally. A single container host can later run Next.js and the worker if operational simplicity/cost favors it; do not run an unbounded MQTT subscriber inside a request-scoped function.

Do not add Kubernetes, Kafka, a separate Python service, TimescaleDB, a vector database, or a general-purpose agent framework for P0. Postgres hourly rollups cover the pilot. Revisit partitioning after measured telemetry volume; add Python forecasting only if a validated model requires it. The AI SDK handles optional language generation, not numerical truth or safety decisions.

## Versions, licenses, and costs

T01 must create a lockfile, exact runtime declaration, dependency inventory, automated vulnerability checks, and THIRD_PARTY_NOTICES if required by adopted code. For every imported component record source URL, package version/commit, license, local modifications, and attribution. Public GitHub visibility is not permission to copy without reviewing its license. This pack's links are references/inspiration; using the libraries later requires their normal licensing obligations.

Do not claim a free tier covers production. Budget separately for database storage/backups, egress, web compute, continuous workers, Redis, MQTT, email, map tiles, and model tokens. AI must have per-tenant daily request/token ceilings, timeout, and an off switch. Hosting regions, data processing terms, retention, and vendor SLAs are deployment decisions, not verified guarantees here.

## Source limits

The AI SDK documentation URL returned an unsupported-content response during research; its official GitHub README was used instead. Source review establishes suitability, not a security audit, benchmark, or guarantee of future API compatibility. No novelty/exclusivity claim about EcoLoop or market-size claim is inferred from these technical references.

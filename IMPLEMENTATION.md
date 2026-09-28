# Specification coverage and implementation boundary

All 22 source Markdown files were reviewed. This website exposes a public product explanation and an explicitly simulated, read-only exploration of P0 workflows. It does not mark database-dependent tasks complete.

| Source | Applied to this website |
|---|---|
| README / MAIN | Preserve the product vocabulary, four streams, resource hierarchy and demo boundary. |
| AGENTS | Strict TypeScript, preserve supplied documentation, honest completion claims, tests and decision record. |
| PRD / FEATURES | Campus/RWA audience; supervised recommendations; no marketplace, payments, redemption, or actuation. |
| PAGES | Public home, how-it-works, solutions, pilot, demo; nested demo views; genuine 404. Account/private routes remain unimplemented. |
| USER_FLOWS | Explain forecast → review → action → evidence; passport provenance; independently verified rewards. No fake mutations. |
| DESIGN | Green/cream palette, resource-specific accents, system fonts, calm layout, original campus artwork, mobile navigation. |
| TECH_STACK | Next.js App Router and strict TypeScript; exact pinned package versions and lockfile. npm workspaces used for this website slice. |
| ARCHITECTURE | UI/shared types/domain split; deterministic demo explanations. Production worker and service boundaries remain deferred. |
| DATABASE | No live persistence or new schema; fixture quantities remain decimal strings; no ledgers computed as authoritative user state. |
| API | No placeholder operational endpoints or broker topics. API contracts remain explicitly proposed. |
| SECURITY | No private data, credentials, external messaging, or mutation controls. Text rendering, CSV formula escaping, security response headers. |
| TASKS | Record website/demo slice independently; T01/T02 and other full operational tasks remain pending. |
| TESTING | Exact decimal/CSV unit tests, site isolation within fixtures, responsive browser flows and axe checks. |
| CONTENT | Precise simulated/predicted labels; pilot contact unavailable; no invented claims, customer logos, prices, or savings. |
| SEO | Server-rendered public content and metadata; noindex preview/demo; no invented domain or organization structured data. |
| ACCESSIBILITY | Semantic landmarks, skip link, real controls, labeled filters, table equivalent for charts, dialog focus, drawer focus, reduced motion. |
| DEPLOYMENT | Local-only server; no resource purchases/provisioning, production deployment, or public data transmission. |
| DECISIONS | ADR-015 defines this website slice and its npm tooling deviation without changing the production data architecture. |
| CHANGELOG | Added an implementation entry with explicit operational limitations. |
| KNOWN_ISSUES | Website now exists; production integration, site safety, contact, legal, and release gates remain open. |

No source specification has been silently rewritten into a claim that the complete operational system is implemented.

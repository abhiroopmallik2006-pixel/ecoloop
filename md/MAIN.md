# EcoLoop AI — Circularity Autopilot

Documentation release: **0.1.0 — 28 September 2026**. Status: proposed implementation specification; no application, integrations, hardware deployment, or measured outcomes are delivered in this pack.

## Concept

EcoLoop helps campuses and resident welfare associations (RWAs) predict resource surplus, prevent avoidable waste, and route remaining resources to a suitable next use. The decision hierarchy is **prevent → reuse locally → exchange → recycle/compost → dispose responsibly**, subject to eligibility, quality, capacity, timing, and human approval. Food, water, energy, and materials share an operational dashboard but retain different units, safety requirements, and accounting rules.

Three layers support the concept:

1. **EcoLoop Hub:** modular bins, weighing, composting, water recovery, solar monitoring, and garden sensors. Install only site-approved modules; the web application is not treatment equipment.
2. **Circularity Autopilot:** measurements, demand forecasts, recommendations, resource passports, verified handoffs, dynamic GreenPoints, and sustainability reporting.
3. **EcoLoop Network:** an opt-in exchange between communities, recyclers, nurseries, and other verified partners. Predictive listings are non-binding until measured stock exists.

“Autopilot” is a product name. The MVP recommends actions and records human decisions; it does not operate pumps, certify water or food, or trade electricity.

## Read this pack

| File | Purpose |
|---|---|
| [README.md](README.md) | Starting point and planned developer commands |
| [PRD.md](PRD.md) | Outcomes, users, boundaries, release gates |
| [FEATURES.md](FEATURES.md) | Stable feature IDs and acceptance criteria |
| [PAGES.md](PAGES.md) | Routes, page contents, access |
| [USER_FLOWS.md](USER_FLOWS.md) | End-to-end flows and failure paths |
| [DESIGN.md](DESIGN.md) | Visual system and component behavior |
| [TECH_STACK.md](TECH_STACK.md) | Selected stack and researched source register |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Services, data movement, algorithms |
| [DATABASE.md](DATABASE.md) | Schema, constraints, transactions, RLS |
| [API.md](API.md) | HTTP and telemetry contracts |
| [SECURITY.md](SECURITY.md) | Trust boundaries, roles, abuse controls |
| [AGENTS.md](AGENTS.md) | Instructions for future implementation agents |
| [TASKS.md](TASKS.md) | Dependency-ordered delivery backlog |
| [TESTING.md](TESTING.md) | Fixtures, automated checks, release validation |
| [CONTENT.md](CONTENT.md) | Public and product copy |
| [SEO.md](SEO.md) | Public discovery and private-page exclusions |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | Accessible interaction requirements |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Environments, secrets, release and recovery |
| [DECISIONS.md](DECISIONS.md) | Accepted specification choices and open decisions |
| [CHANGELOG.md](CHANGELOG.md) | Documentation history |
| [KNOWN_ISSUES.md](KNOWN_ISSUES.md) | Unimplemented capabilities and unresolved gates |

## Shared vocabulary and invariants

- Organization = tenant; site = a campus or apartment community within it. Every private business row has `org_id`; operational rows also have `site_id` where relevant.
- Resource streams: `food`, `water`, `energy`, `materials`. Types refine a stream, for example `cardboard`, `compost`, `recovered_water`, `solar_generation`.
- Canonical units: `kg`, `L`, `kWh`, `portion`, `percent`, `celsius`. Never total unlike units. Conversion requires explicit calibrated metadata.
- Measurement = observed quantity; forecast = future estimate; recommendation = proposed action; transfer = actual handoff; passport = traceable resource identity and event history.
- `P0` = MVP/pilot requirement; `P1` = controlled expansion; `P2` = research or later product. All features currently have status **planned**.
- Times are RFC 3339 UTC in APIs and `timestamptz` in storage. Display in site IANA timezone, default `Asia/Kolkata`. Currency, if displayed, is INR; MVP has no payments.
- Human roles: `owner`, `manager`, `operator`, `member`, `partner`. Device and worker identities are service principals, never human roles.
- Quality verification is an evidence-backed human record, not an AI certification. Demo data is visibly labeled and isolated.
- IDs are UUIDs; API fields use snake_case. Decimal measurements are strings in JSON to avoid silent precision loss.

## Authority and change control

Product scope is owned by PRD/FEATURES; schema by DATABASE; contracts by API; role policy by SECURITY. ARCHITECTURE describes their implementation. If these disagree, do not silently improvise: resolve the discrepancy and update the affected files together. Record substantive changes in DECISIONS and CHANGELOG.

The source conversation “Startup Idea EcoLoop” was reviewed in full through available chat retrieval. Its examples, prices, competitive claims, and hypothetical savings are inspiration, not validated business facts. This pack turns that concept into explicit engineering assumptions. Public technical references were checked on 28 September 2026 and are linked in TECH_STACK; no third-party application code has been copied into this pack.

# Decision log

Status terminology: **accepted for specification** means a design default, not implemented; **open gate** requires evidence before the dependent release. Date for this initial log: 2026-09-28.

| ID | Status | Decision and rationale | Consequence / revisit trigger |
|---|---|---|---|
| ADR-001 | Accepted for specification | Start with a supervised campus pilot and support RWAs through configurable modules. | Cafeteria forecasting first; no need to install every hub module. Revisit after buyer/operator interviews. |
| ADR-002 | Accepted for specification | Autopilot recommends; humans approve and execute. | No actuator topics/endpoints. Separate engineering project for physical control. |
| ADR-003 | Accepted for specification | Next.js/TypeScript modular monolith plus continuous worker. | Shared types and simple deployment boundaries; split services only after measured need. |
| ADR-004 | Accepted for specification | Supabase Postgres/Auth/private storage with SQL migrations and RLS. | Both app and DB authorization required; privileged roles constrained. Revisit if vendor/region requirements fail. |
| ADR-005 | Accepted for specification | Baseline numerical forecasts and deterministic resource routing precede optional LLM explanations. | Core flow works without model provider; advanced model must beat holdout baseline. |
| ADR-006 | Accepted for specification | Resource passports are database identities plus append-only history, not blockchain. | QR is a lookup aid, not ownership/authentication. |
| ADR-007 | Accepted for specification | Dynamic GreenPoints use published bounded multipliers and capped immutable ledger. | No cash/redemption in P0; verified contribution only; correction by reversal. |
| ADR-008 | Accepted for specification | Measured recovery and estimated prevention are separate accounting categories. | No single inflated “impact score”; no CO2e without approved factors. |
| ADR-009 | Accepted for specification | P0 transfers remain tenant-owned records with invited partner access. | Cross-tenant marketplace waits for bilateral schema/security design in T13. |
| ADR-010 | Accepted for specification | Predicted listings are non-binding and cannot create stock/rewards. | Conversion needs measured batch and explicit review. |
| ADR-011 | Accepted for specification | MQTT QoS 1 plus application deduplication; Postgres outbox plus idempotent workers. | Exactly-once business effect is enforced in DB, not promised by transport. |
| ADR-012 | Accepted for specification | English-first, mobile-capable, accessible operational UI. | Localization-ready strings; no untested dark mode; chart/map table alternatives. |
| ADR-013 | Accepted for specification | Water and energy remain site-local monitoring/advice in MVP. | No resource trading of these streams or water-quality certification. |
| ADR-014 | Accepted for specification | Public technical repositories are references, not bundled code. | Adoption requires license/provenance and compatibility review. |

## Open gates and accountable roles

| ID | Decision needed | Proposed owner | Blocks |
|---|---|---|---|
| G01 | Pilot site, operations lead, baseline period and buyer requirements | Product lead | T12 real pilot |
| G02 | Actual hardware vendor, calibration, water/food allowed-use procedures, responsible reviewers | Site engineering/safety lead | Any corresponding real-world module/action |
| G03 | Provider/model, data terms, quality/cost evaluation, API compatibility | Technical/privacy lead | Enabling AI; deterministic mode remains available |
| G04 | Hosting regions, budget, backups, retention and operator notices | Operations/privacy lead | Production deployment |
| G05 | Approved carbon/impact factors and accounting boundaries | Sustainability lead | CO2e claims/reports |
| G06 | Reward funding, rates, fraud escalation and redemption economics | Product/finance lead | Real policy launch; redemption specifically P1 |
| G07 | Network verification, bilateral authorization, dispute procedures and transport responsibility | Product/security lead | T13 network |
| G08 | Domain, pilot contact, legal entity, terms and application license | Project owner | Public production site/public code release |
| G09 | Tested dependency versions, QR library, broker/Redis plan, telemetry backend | Technical lead | T01/T09/T12 as applicable |

No human is assigned by name because none was provided. Resolve these gates through project ownership; do not invent approvals. Proposed default retention and costs are not legal/financial conclusions.

## Change template

### ADR-015 — Local website and read-only demo slice (2026-09-28)

Accepted for this implementation: deliver the user-requested website from the complete specification pack, including public explanatory pages and an isolated synthetic demo. No authenticated production features or operational writes are exposed. T01/T02 and later P0 acceptance remain pending; a rendered demo does not complete them. Use npm workspaces and a pinned package-lock for this slice because the usable local package tooling is npm; the proposed pnpm production scaffold can be revisited with T01. Next.js/TypeScript and the shared domain/contracts separation remain in place. Use the supplied design specification directly; the optional Superdesign CLI preflight was unavailable through the initial local tooling/network environment and no remote design was generated.

Local preview is noindex on all routes. No real contact address, canonical deployment domain, legal notice, private data, AI provider, or equipment capability is invented. No migration or service provisioning is required for the read-only fixtures.

Record ID/date/status, context, selected option, alternatives considered, consequences, evidence links, owner, and revisit trigger. Changing an accepted decision requires updating all affected contracts and tests. Preserve superseded rationale rather than silently rewriting history.

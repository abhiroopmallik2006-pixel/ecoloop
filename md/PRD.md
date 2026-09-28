# Product requirements

Status: specification only. Related: [feature contracts](FEATURES.md), [decisions](DECISIONS.md), [implementation backlog](TASKS.md).

## Problem and proposition

Campus and RWA teams often record waste pickups, water use, food preparation, and solar output separately. They cannot easily anticipate surplus, coordinate its next use, or verify that an intended recovery actually occurred. EcoLoop should unify these operational records and recommend timely, explainable actions, while preserving the evidence needed to evaluate the result.

The initial buyer is a campus facilities lead or RWA committee. Operators include cafeteria staff, waste contractors, gardeners, and maintenance teams. Members participate and see their own rewards. Partners accept resource handoffs. A campus with a staffed cafeteria is the first pilot assumption; the same tenancy model supports RWAs without requiring cafeteria features.

## Jobs to be done

| Persona | Job | Success evidence |
|---|---|---|
| Manager | Identify avoidable surplus and assign a response | Reviewed recommendation with measured follow-up |
| Operator | Record accurate quantities and complete handoffs | Valid measurement and recipient receipt |
| Member | Understand and receive credit for verified contributions | Transparent reward ledger with policy version |
| Partner | Accept suitable available material at a feasible time | Confirmed transfer and provenance |
| Owner | Manage access and assess site performance | Auditable membership and comparable reports |

## MVP scope

P0 includes invite-based access, organization/site setup, manual readings and controlled CSV import, a telemetry simulator plus a real MQTT adapter contract, four-stream dashboards, baseline cafeteria demand forecasts, deterministic resource routing, approval and completion workflows, resource passports with QR references, verified transfers to registered partners, capped dynamic GreenPoints, in-app/email notifications, exports, and audit records.

The MVP supports material/compost batch handoffs inside one tenant to its registered partner contacts. Partners are invited into that tenant with access only to assigned transfers. Food redistribution requires a site-approved eligibility checklist and trained verifier; leave it disabled until that gate is met. Water and energy recommendations remain site-local operational advice. MVP does not transfer or sell water or electricity through the marketplace.

P1 adds opt-in cross-organization material listings, non-binding predicted availability, partner verification workflows, geospatial discovery, and limited reward redemption after funding/fulfillment decisions. P2 includes advanced optimization, camera classification, equipment control, and richer digital-twin simulation.

## Non-goals

No guaranteed savings, autonomous safety decisions, clinical/air-quality health claims, carbon credits, carbon-neutral certification, blockchain/token economy, marketplace payments, electricity trading, or public ranking of households. No requirement to install all hub modules before using the software. The product does not replace licensed waste, water, electrical, or food-handling services.

## Pilot plan and targets

These are proposed acceptance targets, not achieved results. Begin with one site, named operational owners, two weeks of data collection, and an eight-week evaluation window. Forecast availability depends on sufficient comparable history rather than elapsed calendar time alone.

| Metric | Definition | Pilot target |
|---|---|---|
| Reading completeness | Valid expected readings / configured expected readings | At least 95% daily; manual streams report separately |
| Food waste intensity | Measured discarded edible-food kg / actual meals served | Seek 10% reduction versus matched baseline; report uncertainty and service stockouts |
| Forecast quality | MAE and WAPE on rolling holdouts | Beat same-weekday baseline before promoting a more complex model |
| Handoff traceability | Received transfers with evidence / received transfers | 100% |
| Recommendation handling | Reviewed / generated, excluding expired data | At least 80% within site-defined operating window |
| Reward integrity | Duplicate awards per source action | Zero |
| Authorization | Cross-tenant or unassigned-object access | Zero accepted in security tests |

Track water recovered and water actually reused separately. Solar generated is not synonymous with grid electricity avoided. Waste prevented is a modeled counterfactual, reported separately from measured waste diverted. Avoided CO2e remains unavailable until approved factors and boundaries are configured; missing factors must not render as zero.

## Nonfunctional requirements

- Proposed pilot sizing: up to 10 sites, 100 devices/site, one sample/device/minute, 50 concurrent users. This is a load-test envelope, not capacity already demonstrated.
- Target dashboard p95 under 2 seconds for a 30-day aggregate view; mutation p95 under 1 second excluding asynchronous work, measured from API ingress at target load.
- Target healthy telemetry-to-dashboard freshness under 2 minutes; show observed time and stale state when unmet. Poll every 30 seconds while page is visible.
- Design for WCAG 2.2 AA, mobile widths from 360px, slow connections, readable exports, and English-first copy with localization-ready messages.
- Availability target 99.5% monthly for the pilot; proposed RPO 24h and RTO 4h require demonstrated backup recovery before production.
- No cross-tenant cached responses. Retention, deletion, auditability, cost controls, and least privilege are release requirements.

## Commercial assumptions to validate

Likely revenue: site subscription, installation/maintenance delivered by partners, and later exchange service fees. Prices in the source conversation were illustrative and are not adopted here. Validate willingness to pay, baseline operating costs, installation constraints, recycler eligibility, and who funds rewards before committing to pricing or redemption liabilities.

## Release gates

Demo: synthetic dataset only, no real rewards or control actions. Pilot: P0 acceptance tests, RLS checks, backups, named site staff, calibrated measurements, approved retention and module procedures. Network: bilateral opt-in, revocable listing visibility, counterparty vetting, dispute handling, and concurrency tests. Physical actuation: a separate hazard assessment, interlocks, local override, hardware commissioning, and explicit product approval; excluded from this release.

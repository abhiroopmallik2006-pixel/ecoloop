# Known limitations and open issues

The root now includes a local public website and read-only synthetic demo. The operational system remains specification-stage. The items below are unresolved production capabilities or design/deployment inputs; the root validation record describes checks actually executed for the website.

| ID | Severity / state | Limitation | Workaround / resolution |
|---|---|---|---|
| K01 | Blocking operational implementation / open | Website/demo source, build scripts and a lockfile exist; authenticated APIs, migrations and infrastructure do not. | Implement the full T01/T02 acceptance criteria before operational data. Root README lists real website commands. |
| K02 | Blocking real pilot / open | No selected site, commissioned hardware or calibrated data. | Use isolated synthetic fixtures; resolve G01/G02 before real decisions. |
| K03 | Functional / expected | Cold-start sites lack comparable forecast history. | Manual planning and honest insufficient-data state; baseline requires four comparable observations. |
| K04 | Blocking quality-sensitive routes / open | Food/water eligibility procedures and approved use constraints not supplied. | Keep affected routes disabled until site safety lead approves procedures/evidence. |
| K05 | Reporting / expected | No approved carbon factors or counterfactual method. | Show stream quantities and basis; CO2e unavailable, not zero. |
| K06 | Product / deferred | Cross-tenant exchange, predicted listings and map discovery are P1. | P0 uses tenant-local partners and handoffs; T13 must design bilateral authorization. |
| K07 | Product / deferred | GreenPoints redemption/funding not established. | P0 non-cash ledger only; confirm production policy and do not promise redeemability. |
| K08 | Integration / open | AI provider/model not chosen or evaluated. | Deterministic explanations work as specified; resolve G03 before enabling adapter. |
| K09 | Operational / open | Regions, pricing, domain, SMTP, Redis/MQTT service and backup plan not selected. | Complete deployment gates; no free-tier or residency guarantee. |
| K10 | Production verification / open | Website browser/unit/automated accessibility checks have run; production authorization, hardware, load, recovery and full manual accessibility checks have not. | See root validation evidence; execute operational TESTING gates after implementation. |
| K11 | Physical / deferred | No autonomous pump, power or treatment control. | Record operator-approved advice; separate commissioning project for actuation. |
| K12 | Scope / deferred | No payments, electricity/water trading, tokenization or certified ESG/carbon report. | Keep these absent from P0; specify separately if later requested. |
| K13 | Source / bounded | Public source inspection is not dependency compatibility testing or security audit. | Pin/review versions during T01 and at upgrades. |
| K14 | Research / open | Pricing, market size, competitors and novelty not validated in this pack. | Treat prior conversation figures as examples; conduct dedicated commercial research before claims. |
| K15 | Operations / open | Contribution attribution and partner staffing may require field workflow refinement. | Pilot one resource flow; retain independent verification and audit trail. |

## Known contract limits

The database/API documents are detailed implementation specifications, not executable migration SQL or OpenAPI files. Generate those artifacts during T01–T10 and validate them together. P1/P2 intentionally require additional contracts rather than pretending the entire city-scale network is ready to build unchanged.

Offline operator editing is not included in P0; a draft stays in the current form but persistence across browser restarts is not promised. MQTT gateway buffering is separate. The model called a “digital twin” in the concept is a future capability; the MVP is a measured operational model plus forecasts, not a calibrated physical simulator.

## Issue handling

New observed bugs must include affected version, environment, reproduction, expected/actual behavior, severity, data risk, workaround, owner and linked task. Prioritize tenant leakage, stock/reward integrity, quality gating and inaccurate operational claims above visual polish. Close issues only with reproducible verification.

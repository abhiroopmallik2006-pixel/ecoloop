# Features and acceptance contracts

All features are **planned**. P0 defines the pilot; P1/P2 must remain behind disabled feature flags until their gates pass. See [PRD](PRD.md), [API](API.md), [TESTING](TESTING.md).

## P0 — implement in dependency order

| ID | Feature | Behavior and acceptance criteria |
|---|---|---|
| F01 | Identity and tenancy | Invite-based login; active membership checked on every request; switching sites resets filters; revoked membership loses access immediately on the next server request. A guessed UUID never grants access. |
| F02 | Site and hub setup | Manager records timezone, enabled streams, module capacities, measurement points, thresholds, and responsible operators. Missing/disabled modules show “Not configured,” never zero performance. |
| F03 | Measurement intake | Manual entry, CSV preview/import, and telemetry use the same unit/range validator. Duplicate source IDs cannot double-count. Invalid units, counter resets, late readings, and stale devices are visible. Corrections preserve original records. |
| F04 | Sustainability dashboard | Four stream panels, time/site filters, source and freshness labels, accessible table alternatives, and downloadable report. No mixed-unit total. Measured/estimated/simulated values are distinguishable. |
| F05 | Food demand forecast | Forecast next service demand from comparable meal history. Persist input cutoff, algorithm version, point estimate, sample count, and interval when supportable. Insufficient history shows “Collect more data”; no fabricated confidence. |
| F06 | Resource Router | Filter unsafe/ineligible routes, rank eligible routes by hierarchy and practical fit, and show reasons. Stale critical inputs block approval. Every recommendation records rule version, evidence IDs, validity window, and expected outcome. |
| F07 | Human decision workflow | Manager approves/rejects proposed action with version check; assigned operator completes it with evidence. Approved does not mean completed. Cancellation/expiry has an audit trail. No device commands exist in P0. |
| F08 | Resource passports | Batch identity, source, measured quantity, quality review, expiry, and chronological events. QR resolves to authenticated detail; scanning cannot claim rewards or assert ownership. Amendments append events. |
| F09 | Verified handoffs | Eligible measured batch → reserved transfer → dispatched → received/disputed. Recipient confirms actual quantity. Concurrent reservations cannot exceed available stock. Planned, dispatched, and disputed quantities earn no diversion credit. |
| F10 | Dynamic GreenPoints | Award only for verified contribution; versioned bounded multiplier and daily cap; append-only ledger; duplicate retries return prior result. Reversal links original entry. Show estimate before verification and final calculation after it. |
| F11 | Alerts and notifications | In-app alerts for stale sensors, pending approvals, and transfer events; optional email. Deduplicate by event/recipient/channel. Email failure does not roll back operational transaction. |
| F12 | Reports and audit | CSV export respects role/site filters, escapes spreadsheet formula injection, includes methodology and quality flags. Audit records actor, transition, time, and request ID without secrets. |
| F13 | Demo and simulator | Separate seeded environment with persistent “Demo • simulated data” banner. Simulated receipts cannot enter production points or impact reports. |
| F14 | AI explanation adapter | Optional LLM summarizes structured recommendation evidence. Schema-check output and referenced IDs; timeout/provider failure uses deterministic explanation. LLM cannot alter quantities, eligibility, awards, or approval state. |

## P1 — controlled expansion

| ID | Feature | Acceptance and gate |
|---|---|---|
| F15 | Network marketplace | Opt-in coarse-location listing projection, request/accept flow, measured availability reservation, two-tenant access isolation, expiry and disputes. Start with cardboard and eligible compost; no payment. |
| F16 | Pre-waste availability | Forecast listing clearly marked predicted; users express non-binding interest. Conversion requires new measured batch and explicit owner confirmation. Predicted stock cannot be reserved or receive points. |
| F17 | Maps and logistics | MapLibre map and equivalent list; licensed tiles with attribution; distance is straight-line unless routing provider is explicitly added. Exact pickup location visible only after authorized match. |
| F18 | Reward redemption | Funded catalog, reserved balance, fulfillment, cancellation/refund ledger, abuse review. Disabled until economic, tax/accounting, and operations decisions are recorded. |
| F19 | Advanced forecasts | Weather/calendar/menu features and temporal evaluation; candidate model must beat baseline without increasing service failures. Publish model card and drift checks. |

## P2 — research and separate release

F20: locally interlocked pump/equipment scheduling; F21: image-assisted segregation with consent and human checks; F22: calibrated site simulation/digital twin; F23: community garden/activity programs. Clean air and well-being are adjacent outcomes to investigate, not measured health benefits. No P2 user controls should appear enabled in the MVP.

## Shared edge-case behavior

Empty dataset displays setup guidance. Zero is shown only for a valid zero observation. Stale data remains visible with timestamp and is excluded from actions requiring freshness. Pending save disables repeat submission but preserves text on failure. A 409 conflict asks the user to refresh and compare the latest record. Permission denial does not reveal another tenant's object. Export errors allow retry without creating duplicate jobs.

## GreenPoints v1 rule

For an eligible verified contribution, compute `floor(quantity × base_rate × multiplier)`, then apply the remaining member/site/day cap. Quantity is decimal, rate is points per resource unit, and multiplier is decimal in `[1.00, 2.00]`. Only configured resource types participate. Initial demo policy: cardboard `2 points/kg`, multiplier `1.50`, cap `100 points/member/site/local-day`; verified `10 kg` earns `30 points` if the full cap remains. These are design fixtures, not commercial reward promises.

Manager publishes a future-effective policy; a contribution locks its policy at submission time. Verification must occur within seven days or require resubmission under the current policy. Cap bucket uses verification time in site timezone. Two concurrent awards lock the same cap bucket. Policies cannot be edited retroactively. Reject self-verification by the contributing operator. P0 points have no cash value, redemption, expiry, transfers, or negative spending; correcting an award can reduce balance via a linked reversal.

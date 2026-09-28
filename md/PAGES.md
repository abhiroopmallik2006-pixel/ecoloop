# Pages and routes

All pages are planned. Routes use organization/site UUIDs to avoid mutable-slug authorization ambiguity. [Design](DESIGN.md), [flows](USER_FLOWS.md), [access policy](SECURITY.md).

## Public and account pages

| Route | Contents and primary action | States |
|---|---|---|
| `/` | Clear proposition, three layers, example loop, pilot CTA | No fake live statistics |
| `/how-it-works` | Predict/prevent/reuse/exchange/recycle sequence; human approval explanation | Accessible static diagram |
| `/solutions/campuses` | Cafeteria, facilities, solar/water use cases | Hypothetical examples labeled |
| `/solutions/rwas` | Community waste and water coordination; modular setup | No mandatory hardware bundle |
| `/pilot` | Pilot requirements and contact method | Published contact only after operator supplies one; no nonworking form |
| `/privacy`, `/terms` | Operator-approved notices | Draft text must not masquerade as legal terms |
| `/demo` | Entry into separate read-only simulated demo | Persistent demo label; no production writes |
| `/login` | Email magic-link request, privacy link | Sent, rate-limited, expired link, generic failure |
| `/auth/callback` | Exchange auth code and validate safe return path | Error/retry login |
| `/invite/:token` | Invite summary after token validation and email matching | Expired/used/wrong account |
| `/onboarding` | Organization and initial site setup | Resume saved stage; errors preserve input |

## Authenticated application

Use layout `/app/:orgId/:siteId/...` for site screens. Site switcher shows only permitted sites; URL and server queries change together. Default site comes from explicit last selection or first authorized site; no cross-site merge by accident.

| Route suffix | Access | Contents / action / data |
|---|---|---|
| `/overview` | O/M/W/U | Food, water, energy, materials panels; freshness, date filter, priority actions. Members receive aggregate projection. |
| `/measurements` | O/M/W | Readings table, manual form, CSV preview, quality badges; links to point/module. |
| `/food` | O/M/W | Meal-service log, forecast band when available, planned/served/discarded comparison, service buffer. |
| `/water` | O/M/W | Recovered vs reused quantities, tank gauge, approved-use metadata, stale/quality warnings. |
| `/energy` | O/M/W | Generated kWh trend and advisory scheduling; no electricity-sale controls. |
| `/materials` | O/M/W | Measured stock, resource type filters, available/reserved/quality state. |
| `/autopilot` | O/M/W | Recommendation inbox with urgency, evidence freshness, assigned owner, state. |
| `/autopilot/:id` | O/M/W | Explainable recommendation, expected outcome labeled estimate, approval/rejection or completion controls by role. |
| `/passports` | O/M/W | Batches with QR/reference code, quality and expiry filters. |
| `/passports/:code` | O/M/W; P assigned projection | Provenance, quantity, quality review, event timeline, handoff links; print-friendly. |
| `/transfers` | O/M/W/P | Role-scoped handoff list, reserved/dispatched/received/disputed tabs. |
| `/transfers/:id` | same, scoped | Quantity and pickup window, evidence upload, dispatch/receipt/dispute action. |
| `/points` | O/M/W/U | Own balance and ledger; O/M member selector; calculation and reversal detail. |
| `/contributions` | O/M/W/U | Own submissions; authorized verifier queue; no self-verification. |
| `/hub` | O/M/W | Module map/list, commissioning, calibration and freshness status; configuration O/M only. |
| `/reports` | O/M/W | Reporting period, methodology, metric breakdown, export job status. |
| `/notifications` | all | Own events, read status, email preferences. |
| `/settings` | O/M | Site thresholds, modules, points policy, device registry, partners; hide forbidden subsections server-side. |
| `/network` | P1 only | Coarse map/list, material listings, predicted badges, expressions of interest; absent from P0 nav. |

Organization-level `/app/:orgId/settings/members` is owner-only for privileged role/site assignment changes. Manager invitation form remains scoped to its assigned sites. Account page `/app/account` permits profile/preferences and logout without a selected site. Access-denied page offers a permitted destination; does not disclose inaccessible entities.

## Page contract

Every data page defines loading skeleton, no-data guidance, error/retry, stale and partial results, and empty filtered result. Render summary as available while slow charts load, but never combine stale previous-site data with a new site header. Keep filter state in validated query parameters (`from`, `to`, `stream`, `state`, `cursor`). Dates use site timezone; backend receives UTC boundaries.

Detail pages handle 404, permission loss, expired action, conflicting version, and network failure. Show unsaved-change warning for long forms. Destructive/corrective operations show the concrete effect before submission. Approval confirmation states explicitly “This records approval; it does not operate equipment.” No disabled future feature should look operational.

## Navigation

Desktop: 240px sidebar, site selector and date range in header, readable content area. Mobile: compact header and drawer with the same destinations; primary task actions remain visible without horizontal scrolling. Partner sees Transfers, relevant Passports, and Notifications. Member sees Overview, Contributions, Points, and Notifications. Breadcrumbs connect batch, recommendation, and transfer without bypassing permission checks.

# User flows

All flows are target behavior, not existing functionality. [API](API.md) defines commands and [FEATURES](FEATURES.md) defines acceptance.

## 1. Owner creates pilot site — F01/F02

Login → verify email → create organization → atomic owner membership → create site/timezone → enable streams → add modules and points → invite staff → enter first reading → overview. Onboarding can resume from stored setup. A second organization creation submission replays the first result. No hardware connection is required to complete manual-data setup. Owner cannot delete the last active owner through member management.

## 2. Invite and join — F01

Manager chooses operator/member/partner role and assigned sites → server checks inviter scope → invitation recorded → email delivered asynchronously → recipient logs in with matching verified email → accepts unused unexpired token → scoped navigation. Wrong email shows “Sign in with the invited address.” Expired token requires a new invitation. Sending a new invite invalidates the older pending invitation for the same intended membership.

## 3. Record and correct observations — F03

Operator selects point → form shows fixed metric/unit → enters quantity and observation time → validation → save with idempotency key → dashboard reflects committed value. Duplicate tap does not add another reading. For CSV, upload → preview invalid rows → correct file → commit token → job summary with inserted/duplicate/rejected counts. No silent partial import: preview flags errors; commit either validates all rows then inserts atomically, or fails without new readings.

Manager corrects erroneous measurement → supplies reason → replacement and correction link created → rollups recomputed → affected forecast/recommendation flagged for re-evaluation. Old evidence remains visible in audit history.

## 4. Prevent cafeteria surplus — F05/F06/F07

Operator records meal history and current production plan → scheduled forecast checks sample availability → deterministic routing creates proposal → manager sees predicted demand, buffer, limitations, and input age → approves/rejects → kitchen operator follows local procedure → records prepared/served/wasted actuals and completes recommendation with evidence. Approval never reduces inventory or claims savings. If forecast data is insufficient, show data-collection guidance. If plan or source data changes before approval, reject stale version and re-evaluate.

## 5. Recover material with a passport — F08/F09

Operator weighs batch → passport created → trained verifier records quality evidence if required → manager selects eligible partner and pickup window → reservation atomically reduces availability → operator dispatches → assigned partner confirms actual quantity and receipt → impact record added once. QR takes recipient to authenticated detail. Unverified partner or expired quality blocks reservation.

Before dispatch, cancel/timeout releases stock. After dispatch, a disagreement enters disputed state; no recovery credit until resolved. Partial receipt records accepted quantity and the remainder's disposition. A manager cannot mark a transfer received by impersonating the partner.

## 6. Earn dynamic GreenPoints — F10

Member submits contribution linked to a measured batch → policy version and estimated points shown → independent verifier confirms quantity/evidence → server locks contribution and daily cap bucket → ledger award committed once → user sees calculation and policy → notification sent asynchronously. Unsupported action earns no points. Verification after seven days requires resubmission. Suspected fraud pauses verification without exposing accusations publicly. Incorrect award is fully reversed with a reason, never deleted.

## 7. Water/solar recommendation — F04/F06/F07

Healthy sensors indicate recovered-water volume, approved use, garden demand, and solar output → rule engine filters unsuitable water/maintenance windows → eligible advisory shown → manager approves → operator performs local checks and action → actual water reuse/energy readings are recorded. A stale sensor, missing water-quality evidence, or unknown permitted use blocks actionable recommendation. UI may still display observations with limitations.

## 8. Reports and notifications — F11/F12

Manager selects site/period → reviews measured vs estimated metrics → requests CSV → queued/running/succeeded status → authorization checked again → short-lived download. Revoked membership prevents download even if the export was previously queued. An email outage leaves in-app status available and retries delivery; it cannot undo a completed transfer.

## 9. Device lifecycle — F02/F03

Manager registers module/device → operations provisions unique broker identity → assigns measurement points → simulator/bench check → commissioning and calibration recorded → live intake. Missed heartbeat produces stale status. Revoke device → broker access disabled → worker rejects further data → historical readings retained. Offline replay is deduplicated and marked late; it never appears as freshly observed data.

## 10. Pre-waste network — P1, F15–F17

Owner opts into network → creates predicted listing with confidence/availability window → another organization expresses non-binding interest → actual batch is measured and quality-reviewed → source confirms listing conversion → bilateral match/reservation → handoff and receipt → dispute window. Exact pickup details become visible only to authorized counterparties. Expired prediction closes without points, stock, or recovery credit. P0 exposes none of these transactional screens.

## Recovery expectations

Network timeout after submission is ambiguous: retry with the same idempotency key before creating a new request. Conflict responses preserve the user's draft and show latest state. Permission loss exits privileged views and cancels further fetches. Queue failures have visible status and audited retry controls. Unsaved operator readings remain in the form but are not shown as committed site metrics.

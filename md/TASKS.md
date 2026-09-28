# Implementation backlog

The full operational tasks below remain **pending**. A separate local website/read-only demo slice has been implemented; it does not satisfy the authenticated P0 acceptance gates. See the root implementation and validation records. Priority and feature scope are defined in [FEATURES](FEATURES.md). Replace status only when evidence exists.

## Delivery sequence

| Task | Priority / features | Depends on | Deliverable and done criteria |
|---|---|---|---|
| T01 | P0 foundation | — | Create workspace, pin compatible Node/pnpm/packages, scripts, CI, env schemas, license inventory. Fresh install, lint, typecheck, build and test harness pass. |
| T02 | P0 F01 | T01 | Auth, organizations, memberships, sites, invitations, owner protections, RLS. Two-tenant/revoked-user/direct-client tests pass; safe redirect handling verified. |
| T03 | P0 F02/F13 | T02 | Module/point/device registry, typed site policies, isolated synthetic seed. Missing modules display honestly; no production simulator writes. |
| T04 | P0 F03 | T03 | Manual readings, atomic CSV preview/import, correction chain, meal services, rollups. Duplicate/unit/counter/timezone tests pass. |
| T05 | P0 F04 | T04 | Four-stream dashboard, filters, accessible tables, freshness and partial-data states. Never sum gauges or mix units; member projection tested. |
| T06 | P0 F08/F09 | T04 | Batches, passports, quality reviews, partner registry, evidence pipeline, stock reservations and receipts. Concurrent over-reservation impossible; dispute/partial receipt tested. |
| T07 | P0 F05/F06/F07 | T05,T06 | Forecast baseline, rules, recommendations, approval/completion. Temporal evaluation report; stale/unsafe candidates blocked; no actuator code. |
| T08 | P0 F10 | T06 | Contributions, immutable policies, cap buckets, points ledger/reversal. Concurrent verification awards once; self-verification blocked. |
| T09 | P0 F03/F11 | T03,T04 | Broker ACLs, MQTT worker, durable outbox/jobs, stale alerts, in-app/email adapter. Reconnect/replay and dependency-outage recovery tests pass. |
| T10 | P0 F12 | T05,T06,T08,T09 | Reporting, audited mutations, traceability, measured/estimated accounting, scoped export jobs. Formula injection and signed download revocation tests pass. |
| T11 | P0 F14 | T07,T09 | Optional AI explanation adapter, budget limits, timeout/fallback, evaluation fixtures. Provider outage and prompt injection cannot affect numeric/state outcomes. |
| T12 | P0 launch | T01–T11 | Public pages/copy, a11y/security/performance review, environment deployment, backup restore, operational runbook and pilot onboarding. All pilot gates signed by accountable owners. |
| T13 | P1 F15/F16/F17 | T12 + network ADR | Bilateral network data model, opt-in listings, predicted interest flow, map/list, disputes. Separate authorization/concurrency review before enablement. |
| T14 | P1 F18/F19 | T12 + product decisions | Funded redemption and/or advanced forecasts as separate changes. Economic gate for redemption; held-out improvement and model card for forecast promotion. |
| T15 | P2 F20–F23 | explicit separate scope | Research proposals only. Actuation requires independent engineering/safety commissioning; never bundled into an ordinary UI release. |

## Suggested milestones

M0: T01–T03, isolated authenticated demo shell. M1: T04–T06, trustworthy observations and material handoffs. M2: T07–T11, recommendations, rewards, intake and reporting. M3: T12, supervised pilot. Milestones are dependency checkpoints, not promised dates or staffing estimates.

## Work item template

Each implementation issue records feature ID, task ID, affected routes/tables, role checks, migrations, failure states, tests, rollout flag, and evidence of completion. Use statuses pending → active → review → complete; blocked items name the missing decision or dependency and owner. “UI rendered” alone is not completion of an operational feature.

## Definition of done

Acceptance criteria met; server authorization and invariants enforced; meaningful tests pass; accessibility reviewed for changed flow; empty/error/stale states implemented; no secret or unlicensed asset committed; migrations safe and documented; changes reflected in API/DATABASE/DECISIONS/CHANGELOG as applicable. Record actual command output and unresolved limitations. Do not check off hardware integration based solely on a simulator.

## First coding-agent assignment

Implement T01 and T02 as the first vertical slice: create an organization, invite one operator to one site, record an authenticated membership view, and prove a second tenant cannot read it. Read [AGENTS](AGENTS.md) first. Do not build the marketplace or AI chat interface ahead of the tenant/data foundation.

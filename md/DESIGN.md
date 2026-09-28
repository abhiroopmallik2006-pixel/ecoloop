# Product design system

Planned visual/interaction specification. [Pages](PAGES.md), [copy](CONTENT.md), and [accessibility](ACCESSIBILITY.md) are companion contracts.

## Direction

Build a calm operational workspace: readable quantities, clear evidence, and actions with visible consequences. Public pages can illustrate resource loops; authenticated pages prioritize decisions and trustworthy data. Avoid decorative “AI brain” graphics, spinning globes, gamified public household rankings, and invented live activity.

## Tokens

| Token | Initial value | Usage |
|---|---|---|
| background | `#F6F8F5` | Page canvas |
| surface | `#FFFFFF` | Cards and forms |
| text | `#17251D` | Body/headings |
| text-muted | `#526158` | Secondary copy; verify contrast |
| primary | `#166534` | Primary action; white text |
| primary-soft | `#E8F3E9` | Selected/positive background |
| water | `#075985` | Water accent with label/icon |
| energy | `#854D0E` | Energy accent with label/icon |
| materials | `#6B21A8` | Materials accent with label/icon |
| danger | `#B91C1C` | Errors/rejections |
| border | `#CBD5CC` | Decorative dividers; not sufficient alone for every control boundary |
| focus | `#1D4ED8` | 3px focus ring with offset |

These are starting colors, not a contrast certification. Validate actual combinations and use stronger control borders where needed. Status uses text/icon as well as color. Charts use distinct line patterns/markers where series could be confused.

Typography: system sans stack initially; no external font dependency. Body 16px/1.5, secondary 14px/1.45, labels 14px/1.4, h1 32px/1.2, h2 24px/1.3, metric 32px tabular numerals. Avoid all-caps paragraphs. Spacing scale 4/8/12/16/24/32/48/64px. Card radius 12px, input 8px; light shadows only for overlays. Content maximum 1440px; prose maximum 72 characters/line.

## Responsive structure

Below 768px use single-column cards and drawer navigation; 768–1199px use two-column summaries; 1200px+ use four stream cards plus full-width priority table. Detail pages use main content and 320px supporting history panel when room permits. Wide tables scroll within a labeled region or switch to semantic cards, never force the entire page sideways. Touch controls aim for 44px height.

## Core components

- `MetricCard`: label, value/unit, reporting interval, basis badge, source link, last observation time, and data-quality indicator. Missing data shows em dash with explanation, not 0.
- `StreamChart`: title, units, legend, source/basis, focusable series controls, downloadable/table view. Missing periods are gaps. Forecast uses dashed line/band and clear target period.
- `RecommendationCard`: action, scope, expected outcome labeled estimate, expiration, reasons, input freshness, responsible person, and role-based action.
- `PassportTimeline`: resource identity and immutable events, distinguishing measured quantity from reservation and actual receipt. Quality badge links to review and validity.
- `PointsBreakdown`: measured quantity × rate × multiplier, cap adjustment, final points, verification state and reversal links.
- `FreshnessBadge`: “Updated 2 min ago,” “Last observed yesterday,” or “No readings yet.” Never animate stale data to imply live status.
- `EvidenceUploader`: accepted formats/limits, progress, scanning state, accessible remove/retry. Uploaded does not mean verified.
- `AsyncJobStatus`: queued/running/failed/succeeded with retry and expiry information. Unknown progress uses indeterminate indicator, not invented percentage.

## Interaction rules

Use one primary action per task panel. Confirmation dialog summarizes changed quantity/state and next step. Disable repeat submit while pending; preserve form on error. Use inline field errors plus error summary; toasts supplement persistent confirmation, never replace it. Optimistic updates are allowed for notification read state, not inventory, points, quality, or approval transitions. Show 409 conflicts with “Refresh record” and retained draft.

## Motion

Use Motion only where helpful: 120–180ms opacity/position transitions for drawers and completed saves; one optional 300ms public resource-flow reveal. Honor prefers-reduced-motion by removing movement and count-up effects. No continuous animation on dashboards, flashing alarms, or animations delaying actions. Respect user pause controls for any future autoplay explainer.

## Inspiration and attribution

[shadcn/ui](https://github.com/shadcn-ui/ui) is a component reference; [Motion](https://github.com/motiondivision/motion) supplies optional animation primitives; [Recharts](https://github.com/recharts/recharts) is the chart candidate. Build an original EcoLoop composition and copy. Do not copy a commercial dashboard, paid template, brand mark, screenshots, or sample data and present them as EcoLoop assets. Dependency research and adoption rules are in [TECH_STACK](TECH_STACK.md).

## Design verification

Review synthetic fixtures at 360/768/1280/1440px, 200% zoom, reduced motion, keyboard-only navigation, long names, translated-length text, zero values, large quantities, missing modules, and stale data. Dark mode is deferred to avoid shipping an untested second palette. No user-facing design should claim a future feature is already active.

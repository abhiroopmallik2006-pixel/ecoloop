# Accessibility requirements

Target **WCAG 2.2 AA**; conformance is not yet tested. Reference: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/). Implement alongside [DESIGN](DESIGN.md), not as a final overlay.

## Required behavior

- Semantic landmarks, skip link, ordered headings, labeled navigation and exactly one main landmark. Real buttons for actions and links for navigation.
- Complete keyboard operation; visible focus never obscured by sticky bars. Dialog traps focus while open, supports Escape where safe, and restores focus to trigger. Drawer follows equivalent behavior.
- Text contrast at least 4.5:1 for ordinary text and 3:1 for large text; meaningful graphical/control boundaries at least 3:1. Validate rendered combinations. Never use color alone for quality, stream, or state.
- Visible labels and appropriate autocomplete/input modes. Errors associate through aria-describedby and appear in a focusable summary. Required status is written, not only an asterisk. Preserve entered values after validation failure.
- Charts have titles, units, summaries and equivalent data tables. Forecast intervals are explained in text; gaps remain explicit. Tables use header cells and sort-state announcements. Maps have an equivalent partner list and keyboard controls.
- QR codes always include a readable passport code and normal link. Camera access is optional. Evidence upload supports a standard file input; drag-and-drop is supplementary.
- Respect reduced motion, zoom and text resizing. No flashing; avoid auto-updating announcements on every telemetry poll. Announce user-triggered saves/errors via restrained live regions.
- Aim for 44px targets; meet the applicable 24px minimum target criterion/exceptions. At 320 CSS px reflow and 400% zoom, essential content is usable without page-wide horizontal scrolling except intrinsically two-dimensional tables/maps.
- Session expiry warns when feasible and preserves non-sensitive draft input; login supports password managers/paste and accessible magic-link alternatives. Do not impose cognitive puzzles without an accessible alternative.

## Critical flows to review

Login/invite, onboarding, recording a measurement, reviewing forecast uncertainty, approving a recommendation, uploading evidence, confirming a transfer, understanding points, switching sites, and exporting a report. Focus order must match visual/reading order. Loading UI does not steal focus. After route change, update document title and provide predictable focus behavior.

## Verification

Use axe-core browser checks plus manual keyboard and screen-reader passes. Suggested matrix: Chromium/Firefox with NVDA on Windows; Safari/VoiceOver when available; mobile screen-reader check before broad rollout. Test 200% text zoom, 400% page zoom, reduced motion, high contrast, long labels, error states, and slow network. Record unavailable device/browser coverage rather than claiming it passed.

Automated checks catch a subset of issues. Release requires zero known critical accessibility blockers in core tasks, reviewed contrast, and documented manual findings with owners. Publish an accessibility statement only after actual assessment and a real support channel exist.

# Website validation — 28 September 2026

Executed locally on Windows with Node 24.21.0, Next.js 16.3.6, TypeScript 5.9.3, Playwright 1.63.0, Chromium 153.0.8010.12, and axe-core Playwright 4.13.0.

| Check | Actual result |
|---|---|
| `npm run build` | Passed. Public pages prerendered; demo metadata resolves from validated view/site parameters. |
| `npm run typecheck` | Passed; final production build also completed TypeScript validation. |
| `node --test tests/domain.test.mjs` | 3 tests passed: exact decimal addition, invalid quantity rejection, CSV formula/quote escaping. |
| `node scripts/docs-check.mjs` | 22 supplied Markdown files and 73 local Markdown links checked. |
| `node node_modules/@playwright/test/cli.js test` | Final production-server run: 7 tests passed in 11.4 seconds. |
| npm installation audit | 0 reported vulnerabilities for the installed dependency set. |
| Visual inspection | Reviewed desktop homepage/dashboard and full mobile homepage screenshots, plus the running in-app browser. |

Browser coverage includes public pages/404, downloadable pilot checklist, period totals/table values, community site switching and unconfigured modules, recommendation evidence and Escape/focus return, resource search and empty state, passport history, site/period-scoped CSV content, and mobile drawer focus containment/return. Runtime and hydration errors are captured and fail the tests; none occurred in the final run.

Layout overflow checks passed for home/demo at 320, 360, 768, 1280, and 1440 CSS pixels. Screenshots are in `artifacts/home-1440.png`, `artifacts/demo-1440.png`, `artifacts/home-360.png`, and `artifacts/demo-360.png` (local ignored artifacts).

Automated axe checks found zero violations under WCAG 2 A/AA, WCAG 2.1 AA, and WCAG 2.2 AA tags on home, how-it-works, campus solution, pilot, demo overview, points, hub, and reports. This does **not** certify full WCAG conformance. NVDA/VoiceOver, other browser engines, high-contrast mode, 200% text/400% browser zoom, and comprehensive manual accessibility testing remain unperformed.

Issues found and corrected during verification: narrow-screen grid overflow, low-contrast text/status colors, ambiguous native-select labels, a recommendation leaking campus-specific fixture context into the community view, and demo metadata being overwritten during production hydration. Browser test locators were corrected to account for accessible whitespace, the transient Suspense fallback, and the separately labeled drawer backdrop. Screenshot capture waits for hydration to avoid introducing a test-only caret-style mismatch.

No database, authentication, role/RLS, concurrency, real hardware, AI provider, recovery, email, or production load test was run because those services are not implemented in this website slice. Their absence remains explicit in the root README and source backlog. The local production preview is served only on loopback; nothing was deployed publicly.

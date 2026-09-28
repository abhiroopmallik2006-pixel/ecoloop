# EcoLoop AI website

A responsive Next.js website and an isolated, read-only simulated workspace, built from all 22 specifications in [md/MAIN.md](md/MAIN.md) and the supplied working flow.

## Green Startup Challenge / Render

Start with [RENDER_SETUP.md](RENDER_SETUP.md) for deployment and [PITCH_GUIDE.md](PITCH_GUIDE.md) for the seven-minute presentation and Q&A. `render.yaml` configures the existing simulated demo as a Node web service. No API keys or database are required for this demo.

## Run locally

Requires Node 24.x. Dependencies are pinned in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. On this Windows installation, if the global npm wrapper is broken, use `& 'C:/Program Files/nodejs/npm.cmd' run dev` in PowerShell.

```sh
npm run typecheck
npm test
npm run docs:check
npm run build
npm start
```

Browser tests require a running local server. Install Chromium once with `npx playwright install chromium`, then run `npm run test:e2e` or `npm run test:a11y`. The supplied specs' production integration, worker, migration, and load-test scripts are not implemented; they are not aliased to passing placeholder scripts.

## Website

- `/`: original campus illustration, four resource streams, workflow and pilot invitation.
- `/how-it-works`: complete users → measurement → central platform → prediction → prevent/reuse/route → results workflow.
- `/solutions/campuses` and `/solutions/rwas`: proposed campus and community use cases.
- `/pilot`: practical checklist and real downloadable text file. No pretend contact form.
- `/demo`: site/period selection, separate resource units, charts with equivalent tables, explainable recommendations, passport search/history, GreenPoints calculation, module freshness, alerts, and scoped simulated CSV export.

The demo uses a fixed **28 September 2026, 12:00 Asia/Kolkata** snapshot. All readings, partners, quality reviews, rewards and events are fictional. Site and period filters are reflected in the URL. Unsupported site modules display unavailable, not zero. Community fixtures do not expose campus passports or campus-specific recommendations.

## Implementation boundary

This is a website and interactive demonstration, **not the completed P0 operational system**. It contains no login, private user records, database, production APIs, LLM calls, MQTT connection, equipment control, emails, actual approval/receipt mutations, or live reward ledger. All read-only controls are functional; export downloads only explicit demo fixtures. There is no server-side business mutation to secure or migrate in this slice.

Production features remain governed by [md/TASKS.md](md/TASKS.md), [md/SECURITY.md](md/SECURITY.md), and [md/DEPLOYMENT.md](md/DEPLOYMENT.md). Public launch requires approved operator identity/contact and notices, deployment decisions, and the applicable release checks. This local preview sets noindex everywhere and invents no canonical production domain.

## Structure

`apps/web` contains App Router pages, original SVG artwork, reusable UI, and demo fixtures. `packages/contracts` holds shared fixture types. `packages/domain` contains exact decimal addition and CSV escaping, with unit tests. The production architecture remains specified in `md/`.

See [IMPLEMENTATION.md](IMPLEMENTATION.md) for how each source specification informs the result and [VALIDATION.md](VALIDATION.md) for executed checks and remaining coverage. External package provenance is recorded in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

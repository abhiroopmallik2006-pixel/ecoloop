# EcoLoop AI — Render setup

This package contains the existing interactive, simulated EcoLoop demo, configured for Render. It does not require a database, API key, login or sensor connection. It is not a live monitoring system.

## 1. Put the extracted project on GitHub

Extract the ZIP. Open the `nonprofithub` folder. Upload its CONTENTS to your GitHub repository: `package.json`, `package-lock.json`, `render.yaml`, `apps`, `packages` and the remaining source files. Do not upload the ZIP itself. Do not upload `node_modules` or `.next`.

The repository root should contain `package.json` and `render.yaml`. If you uploaded the outer `nonprofithub` folder instead, use `nonprofithub` as the Render Root Directory for the manual setup below.

## 2. Create a Render Web Service

Open https://dashboard.render.com/ → New → Web Service → connect/select the GitHub repository.

| Setting | Value |
| --- | --- |
| Name | `ecoloop-green-challenge` or another available name |
| Language / Runtime | Node |
| Branch | Your uploaded branch, usually `main` |
| Root Directory | Leave blank when `package.json` is at the repository root |
| Build Command | `npm ci --include=dev && npm run build` |
| Start Command | `npm start` |
| Instance Type | Free, if available for your account |
| Health Check Path | `/` |
| Environment: `NODE_VERSION` | `24` |
| Environment: `NEXT_TELEMETRY_DISABLED` | `1` |

Click Deploy/Create Web Service and watch the build log. Render supplies the final URL after a successful deployment; no live URL is included in this ZIP.

Alternative: New → Blueprint → select the repository. The included `render.yaml` supplies these settings. This alternative assumes the project files are at the repository root.

## 3. Verify before presenting

1. Open the homepage and `/demo` on the deployed URL.
2. Select Food, then open the first recommendation and its explanation.
3. Open Resource passports and a batch history.
4. Switch Campus/Community and day/week to show scoped data.
5. Download a simulated CSV from Reports.
6. Check the URL once on your phone.

For a reliable presentation, also keep a local copy ready: install Node 24, run `npm ci`, `npm run build`, then `npm start`; open http://localhost:3000. Keep the terminal running.

## Troubleshooting

- `package.json` not found: fix Root Directory or upload the folder contents at repository root.
- No open port: confirm the updated web package start script contains `next start --hostname 0.0.0.0`. Next reads Render's `PORT` automatically.
- Missing TypeScript/build dependencies: use the exact build command above, including `--include=dev`.
- Unavailable Node patch version: remove an older `NODE_VERSION=24.21.0` override and use `24`.
- Build failure: share the first error and the nearby log lines. Do not share passwords or tokens.

This guide covers the demonstration in this package. The larger architecture in `md/DEPLOYMENT.md` is a future operational-system proposal, not a prerequisite for this demo.

Official references checked for these settings:
- https://render.com/docs/deploy-nextjs-app
- https://render.com/docs/web-services
- https://render.com/docs/node-version
- https://render.com/docs/blueprint-spec

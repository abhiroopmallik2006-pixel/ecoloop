# EcoLoop AI documentation pack

**Status: 22 source specifications with a local website/demo implementation in the repository root (2026-09-28).** See the root README for runnable website commands. This folder describes the wider operational system; migrations, live auth, trained models, connected sensors, and production services remain unimplemented.

EcoLoop AI is a proposed Circularity Autopilot for campuses and RWAs: predict surplus, prevent waste, route resources to suitable uses, track evidence, and reward verified contributions. Read [MAIN](MAIN.md) for the complete index and [PRD](PRD.md) for scope.

## Start here

1. Read [AGENTS](AGENTS.md), [PRD](PRD.md), and [FEATURES](FEATURES.md).
2. Review [ARCHITECTURE](ARCHITECTURE.md), [DATABASE](DATABASE.md), [API](API.md), and [SECURITY](SECURITY.md) together.
3. Implement [TASKS](TASKS.md) in dependency order, beginning with T01/T02.
4. Use [TECH_STACK](TECH_STACK.md) for researched references and adoption rules.
5. Validate against [TESTING](TESTING.md) and deploy only after [DEPLOYMENT](DEPLOYMENT.md) gates.

## Planned development quick start

The following commands are a contract for the scaffold task, not commands available in this documentation folder:

```sh
pnpm install --frozen-lockfile
pnpm infra:up
pnpm db:migrate
pnpm db:seed
pnpm dev
# separate terminal
pnpm worker:dev
```

On the first scaffold installation, create the lockfile with pinned dependencies before using frozen-lockfile. Prerequisites: tested Node 24 LTS patch, pinned pnpm, container runtime, local environment file. T01 must verify runtime compatibility and document actual versions. Follow DEPLOYMENT for variables; never put production secrets in examples.

## Required script contracts

| Script | Intended action |
|---|---|
| `dev`, `worker:dev` | Run web and continuous worker independently |
| `infra:up`, `infra:down` | Start/stop local Supabase, Redis, MQTT services; no production targets |
| `db:migrate` | Apply ordered SQL to explicitly selected environment |
| `db:seed` | Populate synthetic local/demo only; fail closed in production |
| `simulator` | Publish synthetic telemetry into local/demo only |
| `lint`, `typecheck`, `build` | Workspace quality/build checks |
| `test`, `test:integration`, `test:e2e`, `test:a11y`, `test:load` | Checks described in TESTING |
| `docs:check` | Required-file, link, Markdown and contract consistency checks |

## Implementation boundaries

P0 is a supervised pilot with deterministic rules and baseline forecasting. Optional AI explains validated facts. Network exchange, reward redemption, advanced models, and physical control have later gates. No financial, carbon-credit, health, compliance, or operational savings claims are established by this pack.

The root [AGENTS](AGENTS.md) is intended for future coding agents; keep it at repository root if these documents are moved into docs/. Update relative links when moving files. Third-party resources are references/inspiration, not code bundled with this archive. No license for a future EcoLoop application is selected; the project owner must decide before publication.

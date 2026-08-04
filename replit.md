# Jihami Na Records

A pnpm monorepo with a React/Vite frontend and an Express.js API backend, connected to a PostgreSQL database via Drizzle ORM.

## Project Structure

```
artifacts/
  jihami-website/   — React + Vite frontend (shadcn/ui, Tailwind, Framer Motion)
  api-server/       — Express.js API server (TypeScript, pino logging)
  mockup-sandbox/   — Design canvas / component preview server

lib/
  db/               — Drizzle ORM schema + PostgreSQL client (@workspace/db)
  api-spec/         — OpenAPI spec (openapi.yaml + orval codegen config)
  api-zod/          — Zod schemas generated from API spec
  api-client-react/ — React Query API client (@workspace/api-client-react)
```

## How to Run

All workflows are configured and start automatically:

| Service | Workflow name | URL |
|---|---|---|
| Frontend | `artifacts/jihami-website: web` | `/` |
| API server | `artifacts/api-server: API Server` | `/api` |
| Mockup sandbox | `artifacts/mockup-sandbox: Component Preview Server` | `/__mockup` |

## Environment Variables

- `DATABASE_URL` — Replit-managed PostgreSQL (auto-provided by runtime, no manual setup needed)
- `SESSION_SECRET` — Session signing secret (stored as a Replit Secret)
- `PORT` — Set automatically per artifact by Replit

## Database

Uses Replit's built-in PostgreSQL. To push schema changes:

```bash
pnpm --filter @workspace/db run push
```

## Install Dependencies

```bash
pnpm install
```

## User Preferences

<!-- Add user preferences here -->

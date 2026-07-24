# Jihami Na Records

A professional business finance management web platform for Kenyan SMEs — landing page, auth flows, and a full SPA dashboard for transactions, POS, inventory, HR, hotel management, and reports.

## Run & Operate

- `pnpm --filter @workspace/jihami-website run dev` — run the website (served via Vite, port from `PORT` env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port from `PORT` env, path `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite (multi-page app — vanilla HTML/CSS/JS, Bootstrap 5, Chart.js)
- API: Express 5 (`artifacts/api-server`)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Backend build: esbuild (CJS bundle)

## Where things live

- `artifacts/jihami-website/` — Vite-served static website
  - `index.html` — marketing landing page
  - `login.html` / `register.html` — auth pages
  - `dashboard.html` — SPA dashboard shell (hash-based router)
  - `privacy-policy.html` / `terms-of-service.html` — legal pages
  - `public/assets/css/` — `style.css` (landing), `dashboard.css` (dashboard)
  - `public/assets/js/` — vanilla JS modules: `api.js` (endpoint constants), `auth.js` (token/auth), `http.js` (XHR wrapper), `router.js` (hash router), `ui.js` (UI helpers), `dashboard.js` (SPA init)
  - `public/assets/js/pages/` — per-page SPA modules (transactions, invoices, customers, items, employees, hotel, reports, etc.)
  - `public/assets/logos/` + `public/assets/images/` — brand assets and onboarding images
- `artifacts/api-server/` — Express API server
- `lib/api-spec/openapi.yaml` — OpenAPI source of truth
- `lib/db/src/schema/` — Drizzle DB schema

## Architecture decisions

- Multi-page Vite app: each HTML file is a Rollup entry point; static assets live in `public/` so they're served at root-relative paths (e.g. `/assets/css/style.css`).
- Hash-based SPA router in `dashboard.html` — no server-side routing needed; all page modules in `public/assets/js/pages/` register themselves on `Router.routes`.
- Backend API at `https://jihami.co.ke` (production). The `API_BASE_URL` in `public/assets/js/api.js` points there; change it to `/api` when wiring up the local Express server.
- Auth uses JWT stored in `localStorage` via `TokenManager` (in `auth.js`).

## Product

- **Landing page** (`/`) — marketing site with features, screenshots, download CTA, and contact form
- **Auth** (`/login`, `/register`) — JWT-based sign-in and registration
- **Dashboard SPA** (`/dashboard`) — full business management suite:
  - Overview, Transactions, Categories
  - POS: Invoices, Quotations, Credit Notes, Payments, Customers
  - Inventory: Items, Stock Take, Stock Receipts, Suppliers
  - HR: Employees
  - Hotel management
  - Reports
  - Profile/Settings

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after changing `lib/api-spec/openapi.yaml`.
- The Vite config is not a React app — React/Tailwind plugins are removed. The site is vanilla HTML/CSS/JS with Bootstrap.
- Static assets must live inside `public/` so they are accessible at root-relative paths from any HTML file.
- The existing JS uses `var` / function declarations (not ES modules), so no `import`/`export` syntax in the page scripts.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

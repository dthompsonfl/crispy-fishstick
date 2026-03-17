# Copilot Instructions — Vantus Systems (Next.js 16 + Prisma)

These instructions are for GitHub Copilot (VS Code) working **inside this repository**.

## What this repo is
- Project name (package.json): `crispy-fishstick`
- App title (README.md): **Vantus Systems**
- Primary goal: A production-grade public website (marketing, case studies, labs) plus a hardened **Admin Portal** and APIs for operational workloads (leads, projects, proposals, contracts, invoices, media, audits, JIT access, MFA, webhooks, and observability tools).
- Total source files: ~450 TypeScript/JS/MDX/MD files (excluding node_modules, .next, coverage)

## Tech stack (grounded in this repo)
- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui patterns + Radix UI
- **Animation:** Framer Motion + GSAP + **Remotion** (`@remotion/player` embedded in every primary public page for bespoke animated compositions)
- **Content:** MDX (configured via `@next/mdx`) — case studies in `content/work/`, insights in `content/insights/`
- **Database:** Prisma (schema at `prisma/schema.prisma`) — SQLite used for local/dev, PostgreSQL recommended for production
- **Auth:** NextAuth v4 (JWT strategy) with MFA, session helpers in `lib/auth.ts`
- **Storage:** S3-compatible uploads (AWS SDK) + signed URL flow (`lib/storage.ts` + admin media APIs)
- **Validation/Types:** Zod for request validation; Prisma as source-of-truth for persistent models
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Observability & Security:** Build-proof artifacts, audit logs, strict CSP via `proxy.ts`, CSRF double-submit pattern, rate limiting (DB / Redis)

 ## Directory map (complete structure)
### Core Application
- `package.json` — scripts & dependency list (`dev`, `build`, `test`, `test:e2e`, `prisma:migrate`, etc.)
- `next.config.mjs` — MDX setup and pageExtensions
- `tsconfig.json`, `tailwind.config.ts` — project language + styling configs
- `proxy.ts` — **central request interceptor** (nonce generation, CSP, admin route protection)
- `prisma/schema.prisma` & `prisma/seed.ts` — DB schema and seed data
- `env.example` — exhaustive environment variable template
- `scripts/` — operational scripts (postinstall, setup-env, generate-build-proof, generate-nginx-config, verify-admin, bootstrap scripts)

### Frontend (Next.js App Router)
- `app/` — App Router surfaces
  - `app/(site)/...` — Public site routes (home, work, insights, lab, trust, contact, pages)
  - `app/(admin)/admin/...` — Admin portal UI & admin dashboard routes
  - `app/api/` — Server routes (see Backend section)
  - `app/layout.tsx`, `app/globals.css`, `app/vantus-theme.css` — global layout and theming
- `components/` — UI building blocks, admin UI, MDX components (`components/mdx/*`), and `components/ui/*` primitives
- `content/` — MDX content
  - `content/work/` — case studies
  - `content/insights/` — insights / blog-style posts
- `remotion/` — Remotion compositions for embedded animated players (**planned**)
  - `remotion/Root.tsx` — registers all compositions
  - `remotion/compositions/` — individual Remotion compositions (TopologyNetwork, AuditChecklist, MorphingBarChart, etc.)

### Backend (Server routes & libs)
- `app/api/` — server route handlers (`route.ts` files). There are ~75 server routes (including cron/webhooks and public endpoints)
  - `app/api/auth/[...nextauth]/route.ts` — NextAuth route
  - `app/api/csrf/route.ts` — CSRF helper token
  - `app/api/proof/headers/route.ts` — build-proof headers
  - `app/api/webhooks` — inbound webhook handlers (e.g., e-sign webhooks)
  - `app/api/cron/*` — scheduled endpoint hooks
  - `app/api/admin/*` — ~67 admin endpoints (users, sessions, projects, proposals, contracts, invoices, leads, media, webhooks, JIT requests, audit exports, time entries, etc.)
- `lib/` — core server helpers and business logic
  - `lib/admin/route.ts` — `adminRead` / `adminMutation` wrappers (CSRF, same-origin, RBAC, audit)
  - `lib/admin/guards.ts` — `requireAdmin()` and `tenantWhere()` helpers
  - `lib/security/*` — CSRF, origin assertions, rate-limiter, MFA wiring, session management, upload protection, redaction helpers
  - `lib/prisma.ts` — Prisma client boot
  - `lib/storage.ts`, `lib/email.ts`, `lib/proof.ts` etc.
- `scripts/` — infra automation and verification scripts (see Scripts & Tooling below)

## Database & Migrations
- Prisma schema location: `prisma/schema.prisma` (canonical source-of-truth for models: `User`, `Tenant`, `Role`, `RoleAssignment`, `AuditLog`, `Contract`, `Proposal`, `Project`, `Lead`, `MediaAsset`, `Invoice`, etc.)
- Migration workflow (when changing models):
  1. `npm run prisma:migrate` (or `npx prisma migrate dev`) to create migrations
  2. `npm run prisma:generate` to refresh client
  3. Update Zod schemas used at API boundaries
  4. Update tests and any consuming UI

## Scripts & Tooling
- `scripts/postinstall.js` — postinstall hook (warns on Node version, generates build proof when possible)
- `scripts/setup-env.js` — interactive production-safe environment configuration (generates critical secrets when needed)
- `scripts/generate-build-proof.mjs` — writes `public/proof/build.json` with commit and gate info
- `scripts/generate-nginx-config.mjs` — helper to produce Nginx configuration
- `scripts/verify-admin.ts` — verify bootstrap admin account and roles
- `playwright.config.ts`, `vitest.config.ts` — test runners configuration (Playwright uses a deterministic port for CI)

## Documentation & Audit Artifacts
- `README.md` — high-level project summary and quick start
- `AGENT.md`, `AGENT_GUIDE.md`, `ADMIN.md`, `ARCHITECTURE_REVIEW.md` — agent & architecture contracts and hard requirements
- `docs/` — deployment, security review, and operational runbooks
- `docs/public/DESIGN_SYSTEM/BESPOKE_DESIGN_SCHEMA.md` — **Bespoke UI design schema for all public pages** (design tokens, Remotion compositions, animation patterns, SVG masks, per-page inventory)
- `.agent/` — agent artifacts, decisions, and verification workflows
- **2026-01-13:** `/.github/agents/general.agent.md` updated to add anti-hallucination controls, bounded execution rules, DAP workflow, and skills-based subagent orchestration (details.md updated)
- **2026-03-17:** Bespoke design schema created. Stitch project `17263530675590024345` holds 18 screen designs covering every page in `PUBLIC.SITE_MAP.md`. Remotion added to animation stack. Design system documented in `docs/public/DESIGN_SYSTEM/BESPOKE_DESIGN_SCHEMA.md`.
- `public/proof/build.json` — build proof artifact generated at build time

## API Endpoints (75 route files total; ~67 admin endpoints)
### Convention
- Uses App Router file-based routing. `route.ts` handles HTTP verbs for that path.
- Admin endpoints are namespaced under `app/api/admin/*` and must use `adminRead/adminMutation` wrappers.

### Notable Public Endpoints
- `GET /api/csrf` (via `app/api/csrf/route.ts`) — issue CSRF token cookie + signature
- `POST /api/contact` (`app/api/contact/route.ts`) — public contact form with rate limiting
- `GET /api/proof/headers` — proof headers used by trust center
- Cron endpoints: `app/api/cron/*` (session cleanup, contract reminders)

### Auth endpoints
- `ANY /api/auth/[...nextauth]` — NextAuth auth providers, JWT/session configuration

### Admin endpoints (examples)
- `POST/GET /api/admin/users` — user management
- `POST/GET /api/admin/projects` — projects CRUD
- `POST/GET /api/admin/proposals` — proposals & workflow actions
- `POST/GET /api/admin/contracts` — contract lifecycle (sign/restore)
- `POST/GET /api/admin/invoices` — invoices & draft-from-time helper
- `POST/GET /api/admin/leads` — lead ingestion + bulk import
- `POST/GET /api/admin/media` — media upload, download and authorization
- `POST/GET /api/admin/jit/requests` — Just-In-Time access request flow
- `POST/GET /api/admin/webhooks/*` — webhook endpoints and deliveries

## Environment Variables
### Documented in `env.example`
- `NODE_ENV`, `PORT`, `DEPLOY_DOMAIN`, `NEXTAUTH_URL`
- `NEXTAUTH_SECRET` — required in production (NextAuth signing)
- `MFA_ENCRYPTION_KEY` — AES-256-GCM key for MFAs
- `CSRF_SECRET` — CSRF HMAC secret
- `CRON_SECRET` — authenticate cron jobs
- `DATABASE_URL` — Prisma connection string
- `REDIS_URL` — Optional Redis connection for sessions/rate-limiting
- AWS / S3 variables: `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`
- Admin bootstrap helpers: `ADMIN_BOOTSTRAP_EMAIL`, `ADMIN_BOOTSTRAP_PASSWORD`, `BOOTSTRAP_ACCOUNT_ENABLED`

### Observed in scripts but not always in `env.example`
- `SESSION_ENCRYPTION_KEY` — additional secret used by session utilities
- SMTP variables (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`) found in the template

 ## Key Workflows
### Postinstall Flow (postinstall hook)
- `node scripts/generate-build-proof.mjs` runs during `npm install` postinstall (non-fatal on read-only filesystems)
- `scripts/postinstall.js` performs Node version checks and optional build-proof generation

### Development Workflow
```bash
npm install
npm run dev       # Next dev server
npm run lint       # ESLint
npm run test       # Vitest unit tests
npm run test:e2e   # Playwright E2E (uses build+start in Playwright config)
```

### Database Management
```bash
npm run prisma:migrate    # Create & apply migrations (dev)
npm run prisma:generate   # Refresh Prisma client
npm run prisma:seed       # Seed dev/admin data
```
Notes: `scripts/setup-env.js` guides production env setup (generates secrets) and indicates steps to seed and migrate DB in production.

### Admin Verification
- `npx tsx scripts/verify-admin.ts` — checks bootstrap admin account and role assignments
- Playwright E2E test suite exercises end-to-end admin flows; Playwright config defaults to a deterministic port (3002) in CI

## Security Architecture
### Authentication & Session
- NextAuth handles sessions (`app/api/auth/[...nextauth]`); server-side checks via `lib/admin/guards.ts` and `getServerSession`.
- MFA flows implemented (`app/api/admin/auth/mfa/*`, `lib/security/mfa.ts`) — secrets encrypted with `MFA_ENCRYPTION_KEY`.

### CSRF & Same-origin
- Double-submit CSRF pattern: `csrf-token` cookie + `x-csrf-token` header (see `lib/security/csrf.ts` and `app/api/csrf/route.ts`).
- `adminMutation` wrappers validate CSRF by default and use `assertSameOrigin()` for same-origin checks.

### CSP / Nonce / Proxy
- `proxy.ts` is the canonical request interceptor. It generates a nonce (`x-nonce` header), sets strict CSP/security headers, and performs admin access pre-checks.
- Do NOT weaken CSP (no `unsafe-inline` for scripts), and preserve nonce logic.

### Audit Logging & Redaction
- Audit logs created via `lib/admin/audit.ts` (immutable `AuditLog` table). Sensitive fields are redacted before logging via `lib/security/redact.ts`.

### Rate Limiting
- Rate limiting is enforced via `lib/rate-limit.ts` and `lib/security/rate-limit.ts` (DB-backed + optional Redis)

## Golden Rules for Copilot Changes
1. **Never break logic** — Restate goal, invariants, acceptance criteria, and plan before changing code (see `AGENT.md` policy).
2. **Security-first** — Do not weaken CSP/headers, CSRF, tenant isolation, or audit trails.
3. **Server controls access** — Client-side checks are UI-only; server must enforce RBAC and tenant scoping.
4. **Use the admin wrappers** — All admin API writes MUST use `adminMutation()` (or explicit CSRF/same-origin + audit) and be scoped by `tenantWhere()`.
5. **Prisma changes require full wiring** — Update migrations, `prisma generate`, Zod schemas, API handlers, tests, and seed data as applicable.
6. **Update docs** — **Always** update `/.github/details.md` (this file) as the first item in your Plan; add `details.md updated` when completed.
7. **Gates** — `npm run lint`, `npm run test`, `npm run build` must pass before merging.

## Reference Files (Patterns to Follow)
- `app/api/auth/[...nextauth]/route.ts` — full auth flow example
- `lib/admin/route.ts` — admin mutation/read wrappers
- `lib/admin/guards.ts` — `requireAdmin()` and `tenantWhere()` patterns
- `lib/security/csrf.ts` — double-submit CSRF implementation
- `app/api/csrf/route.ts` — CSRF token endpoint for clients
- `prisma/schema.prisma` — canonical DB models
- `components/admin/*` — admin UI patterns and forms

## Where to Look First
### New to the codebase?
1. `README.md` — overview
2. `next.config.mjs` / `proxy.ts` — MDX and security interceptor
3. `app/(site)/page.tsx` and `app/(admin)/admin/(dashboard)/page.tsx` — public & admin entry points
4. `app/api/auth/[...nextauth]/route.ts` and `app/api/csrf/route.ts` — auth & CSRF
5. `lib/admin/route.ts` and `lib/admin/guards.ts` — how admin APIs are protected

### Debugging an issue?
1. Reproduce locally: `npm run dev` or run Playwright E2E with `npm run test:e2e`
2. Check middleware/proxy (`proxy.ts`) for CSP/session issues
3. Check `lib/security/*` helpers for CSRF, origin, rate limiting
4. Inspect `prisma/schema.prisma` and DB state (`npx prisma studio`)

### Adding a feature?
1. Read similar endpoints under `app/api/admin/` and follow `adminMutation` pattern for writes
2. Add Zod schemas at API boundary and update any consuming UI
3. Run migrations/`prisma generate` + update tests (unit + e2e)

## Key routes you must not break
### Pages (App Router)
- `/` (site index)
- `/admin` & `/admin/login`
- `/admin/(dashboard)` and core dashboard sub-pages (users, leads, projects, contracts, invoices, media)
- `/work` & `/work/[slug]` (MDX content)
- `/lab/revenue-leak` and `/lab/server-config`
- `/trust` (trust & build proof UX)

### API endpoints
- `ANY /api/auth/[...nextauth]` — auth
- `GET /api/csrf` — CSRF token
- `POST /api/contact` — public contact form
- `app/api/admin/*` — all admin API routes (users, projects, proposals, contracts, invoices, leads, media, webhooks, JIT access, audit exports)

## Deployment Scripts & Infrastructure (`scripts/` directory)

Updated 2026-01-13: All scripts have been reviewed, completed, and consolidated. See [SCRIPTS_INVENTORY.md](../scripts/SCRIPTS_INVENTORY.md) for full details.

### Bootstrap & Deployment

**`bootstrap-ubuntu22.sh`** ⭐ — **Production-grade Ubuntu 22.04 bootstrap**
- Complete automated setup: user creation → package install → app build → Nginx config → systemd services
- **Usage**: `sudo bash scripts/bootstrap-ubuntu22.sh` (11-step process)
- **Verify mode**: `sudo bash scripts/bootstrap-ubuntu22.sh --verify` (check deployment state anytime)
- Features: Fortune-500 hardened error handling, comprehensive logging, full idempotency, atomic rollback support

### Configuration Generation

- **`generate-nginx-config.mjs`** — Generates Nginx reverse proxy config (output: `config/nginx/nginx.conf`)
  - Auto-detects TLS certificates, generates HTTP-only or HTTPS+redirect config
  - Called during bootstrap with env vars: `DEPLOY_DOMAIN`, `DEPLOY_PORT`, `DEPLOY_ROOT`
- **`generate-build-proof.mjs`** — Creates build proof artifact (`public/proof/build.json`)
  - Git commit SHA, timestamp, dependency hash, quality gate status
  - Auto-called via npm postinstall hook

### Database & Backup

- **`database-backup.sh`** — Secure backup/restore for SQLite, PostgreSQL, MySQL
  - **Usage**: `sudo bash scripts/database-backup.sh backup [name]`, `restore [name]`, `verify [name]`, `list`
  - Features: atomic ops, encryption, 90-day retention, integrity checks, least-privilege
- **`validate-database.sh`** — Check DB connectivity, Prisma readiness, schema state
  - Tests: DATABASE_URL, DB type detection, Prisma schema validation, migrations status

### Environment & Permissions

- **`setup-env.js`** — Interactive environment configuration
  - Generates `.env` with all required variables, auto-generates secrets, admin credentials
  - **Usage**: `node scripts/setup-env.js`
- **`validate-file-permissions.sh`** — Audit sensitive file permissions
  - Checks: `/var/www/vantus/.env`, `/etc/default/vantus` (both should be 600, vantus:vantus)

### Admin Tools

- **`verify-admin.ts`** — Check admin user existence, role assignments, MFA state
  - **Usage**: `npx tsx scripts/verify-admin.ts [--email=...] [--password=...]`
- **`reset-mfa.ts`** — Admin MFA reset (requires `--yes` flag for safety)
  - **Usage**: `npx tsx scripts/reset-mfa.ts --email=user@example.com --yes`
- **`check-permissions.ts`** — Read-only role & permission inspector
  - **Usage**: `npx tsx scripts/check-permissions.ts --email=admin@example.com`
- **`update-permissions.ts`** — Manage RBAC permissions
  - **Usage**: `npx tsx scripts/update-permissions.ts --role=Owner --add=users:read`

### Testing & Validation

- **`test-bootstrap-workflow.sh`** — Validate bootstrap script structure & dependencies
- **`test-port-configuration.sh`** — Verify port 3005 consistency across all components
- **`smoke-test.ts`** — Production smoke tests (homepage, NextAuth, optional health endpoints)
- **`validate-file-permissions-test.sh`** — Test permission validation logic

### Utilities

- **`worker.ts`** — Background worker entrypoint with graceful shutdown & error handling
- **`postinstall.js`** — npm postinstall hook (Node.js version check + build proof generation)

### Important Notes

- **Config Management**: Bootstrap generates `config/nginx/nginx.conf` and copies systemd services from `config/systemd/`
- **Edge Device Configs**: `config/nginx/edge_device/` are **never** modified by bootstrap (manual deploy only)
- **Port**: All components consistently use PORT=3005 (verified by `test-port-configuration.sh`)
- **Idempotency**: All scripts are safe to re-run; `--verify` flag checks state without modifying
- **Documentation**: Full script inventory at `scripts/SCRIPTS_INVENTORY.md`

## Standard workflow (commands defined in package.json)
```bash
# install
npm install

# dev
npm run dev

# build + start
npm run build
npm run start

# quality gates
npm run lint
npm run test

# e2e
npm run test:e2e

# prisma
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

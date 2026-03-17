# REMEDIATION ROADMAP (28 Days)

**GOAL:** Transform "NO-GO" codebase to Production-Ready

---

## WEEK 1: SECURITY HARDENING (CRITICAL)
*Focus: Locking down the application and fixing vulnerabilities.*

- **Day 1:** Fix `proxy.ts` matcher to include API routes. Implement `adminMutation` wrapper in all admin routes.
- **Day 2:** Remove `force-dynamic` from `app/layout.tsx`. Remove hardcoded secrets from `lib/auth.config.ts`.
- **Day 3:** Fix `components/admin/content/content-form.tsx` XSS vulnerability (add `rehype-sanitize`).
- **Day 4:** Migrate Database from SQLite to PostgreSQL (Local Dev & Schema).
- **Day 5:** Implement "Fail Closed" logic for Rate Limiting in `lib/auth.ts`.
- **Day 6:** Audit and rotate all existing secrets. Set up proper `.env` validation.
- **Day 7:** Security Penetration Test (Self-Scan) & Verification.

## WEEK 2: INFRASTRUCTURE & DEVOPS
*Focus: reliable deployment and environment parity.*

- **Day 8:** Create production `Dockerfile`.
- **Day 9:** Create `docker-compose.yml` for local dev (App + Postgres + Redis).
- **Day 10:** Rewrite `scripts/bootstrap-ubuntu22.sh` or replace with Ansible playbook.
- **Day 11:** Set up GitHub Actions CD pipeline (Build -> Push to Registry -> Deploy).
- **Day 12:** Configure S3 Backups for PostgreSQL.
- **Day 13:** Set up Monitoring (Datadog/Prometheus) and Logging (ELK/CloudWatch).
- **Day 14:** Disaster Recovery Simulation (Restore DB from backup).

## WEEK 3: PERFORMANCE & QUALITY
*Focus: Speed and maintainability.*

- **Day 15:** Remove duplicate animation libraries. Standardize on `framer-motion`.
- **Day 16:** Implement Redis caching in `lib/dal.ts` for public-facing data.
- **Day 17:** Configure CDN (CloudFront/Cloudflare) for static assets.
- **Day 18:** Fix `tsconfig.json` (`skipLibCheck: false`) and resolve type errors.
- **Day 19:** Add Unit Tests for `lib/auth.ts` and `lib/security`.
- **Day 20:** Refactor large components (e.g., `content-form.tsx`).
- **Day 21:** Load Testing (K6) to verify concurrency handling.

## WEEK 4: FINAL POLISH & GO-LIVE
*Focus: Verification and launch.*

- **Day 22:** Full E2E Test Suite Run & Fixes.
- **Day 23:** Accessibility Audit (WCAG 2.1).
- **Day 24:** SEO Audit & Optimization.
- **Day 25:** Documentation Update (README, API Docs).
- **Day 26:** Staging Deployment & Final Acceptance Testing.
- **Day 27:** Executive Sign-off.
- **Day 28:** **PRODUCTION LAUNCH**.

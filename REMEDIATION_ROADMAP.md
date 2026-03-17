# REMEDIATION ROADMAP (28-Day Plan)

## 📅 Week 1: Critical Security Hardening (P0)

### Day 1-2: Fix Authentication & CSRF
- [ ] **Task:** Refactor all Admin API routes to use `adminMutation` wrapper.
- [ ] **Task:** Implement `verifyCsrfToken` logic in `lib/security/csrf.ts` if missing (verified present, but ensure robust).
- [ ] **Task:** Remove `DISABLE_RATE_LIMITING` logic and implement robust Redis fallback (fail closed).

### Day 3: Session Security
- [ ] **Task:** Replace `Math.random()` with `crypto.randomUUID()` for session tokens in `lib/auth.ts`.
- [ ] **Task:** Enforce strict secrets validation in `instrumentation.ts` (halt startup if missing).

### Day 4-5: Audit & Penetration Testing (Internal)
- [ ] **Task:** Write unit tests for CSRF bypass scenarios (`tests/admin/csrf.test.ts`).
- [ ] **Task:** Verify Admin route protection path matching in `proxy.ts`.

---

## 📅 Week 2: Infrastructure & Database (P1)

### Day 6-7: Database Migration
- [ ] **Task:** Switch `schema.prisma` provider to `postgresql`.
- [ ] **Task:** Provision RDS/Cloud SQL instance.
- [ ] **Task:** Create migration scripts and verify data integrity.

### Day 8-9: Containerization
- [ ] **Task:** Create `Dockerfile` (multi-stage: deps, builder, runner).
- [ ] **Task:** Create `docker-compose.yml` for local dev (App + Postgres + Redis).

### Day 10: CI/CD Pipeline
- [ ] **Task:** Implement GitHub Actions for Lint, Test, Build, and Push to Registry.
- [ ] **Task:** Add Sentry source map upload step.

---

## 📅 Week 3: Performance & Scalability (P2)

### Day 11-12: Job Queue Implementation
- [ ] **Task:** Install BullMQ.
- [ ] **Task:** Refactor `app/api/cron/contract-reminders` to push jobs to queue.
- [ ] **Task:** Create worker process to consume email jobs.

### Day 13-14: Frontend Optimization
- [ ] **Task:** Lazy load `@splinetool/react-spline`.
- [ ] **Task:** Remove `gsap` (migrate to `framer-motion`) or vice-versa to remove duplication.
- [ ] **Task:** Install `sharp` for image optimization.

### Day 15: Caching Strategy
- [ ] **Task:** Implement `stale-while-revalidate` headers for Admin Read APIs.
- [ ] **Task:** Configure CDN caching rules.

---

## 📅 Week 4: QA & Code Quality (P3)

### Day 16-20: Testing & Documentation
- [ ] **Task:** Increase test coverage to >80% for `lib/auth.ts` and `lib/admin`.
- [ ] **Task:** Resolve all TypeScript `any` violations.
- [ ] **Task:** Standardize dependency versions (`react-markdown`).
- [ ] **Task:** Final Regression Test.
- [ ] **Task:** **Sign-off for Production Deploy.**

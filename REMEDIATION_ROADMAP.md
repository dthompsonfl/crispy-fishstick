# REMEDIATION ROADMAP

**GOAL:** Bring codebase to "Production Ready" status.
**TIMELINE:** 28 Days (4 Sprints)

---

## Week 1: Security & Infrastructure (CRITICAL)

- [ ] **Day 1: Deployment Fixes**
  - Fix `bootstrap-ubuntu22.sh` exit bug.
  - Create `Dockerfile` and `docker-compose.yml`.
- [ ] **Day 2: Database Migration**
  - Spin up Postgres instance.
  - Update `schema.prisma`.
  - Run migrations and verify data integrity.
- [ ] **Day 3: Auth Hardening**
  - Fix Rate Limiting "Fail-Open" bug.
  - Fix "Admin" string matching (implement Enums).
- [ ] **Day 4: API Security**
  - Refactor `getLeads` and DAL to fail-safe on missing `tenantId`.
  - Standardize CSRF middleware wrapper.
- [ ] **Day 5: Verification**
  - Run penetration tests on Auth and Admin API.
  - Verify Docker build works.

## Week 2: Performance & Cleanup

- [ ] **Day 6-7: Bundle Diet**
  - Remove `gsap` and `@splinetool`.
  - Refactor `living-blueprint-section` to use Framer Motion.
- [ ] **Day 8: Rendering Fixes**
  - Remove `force-dynamic` from `layout.tsx`.
  - Implement caching strategy for Marketing pages.
- [ ] **Day 9: Code Quality**
  - Remove `console.log` statements.
  - Fix `any` types in core files.
- [ ] **Day 10: Performance Testing**
  - Run Lighthouse CI.
  - Verify TTFB < 200ms.

## Week 3: DevOps & Stability

- [ ] **Day 11-12: CI/CD Pipeline**
  - Implement "Deploy to Staging" GitHub Action.
  - Fix flaky `sleep 10` tests.
- [ ] **Day 13: Monitoring**
  - Set up CloudWatch/Datadog log shipping.
  - Create Sentry alerts for Critical errors.
- [ ] **Day 14-15: Testing**
  - Write unit tests for `rate-limit`.
  - Write integration tests for Tenant Isolation.

## Week 4: Final Polish & Launch Prep

- [ ] **Day 16-20: Final Audit & Documentation**
  - Update `README.md`.
  - Complete API documentation.
  - Executive Sign-off.

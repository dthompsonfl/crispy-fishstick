# COMPLETE FILE AUDIT

## [API Route]: Admin User Creation

**PATH:** `/app/api/admin/users/route.ts`

### Issues Found:
1. **Line 37:** Missing `verifyCsrfToken` invocation. - Severity: CRITICAL
   - **Impact:** Allows Cross-Site Request Forgery (CSRF). An attacker can create admin users if a logged-in admin visits a malicious page.
   - **Fix:**
     ```typescript
     // Use the wrapper
     export const POST = adminMutation({ permissions: ["users.write"] }, async (user, body) => { ... })
     ```
   - **Estimated Time:** 2 hours

2. **Line 11:** `const where: any` - Severity: LOW
   - **Impact:** Loss of type safety.
   - **Fix:** `const where: Prisma.UserWhereInput = ...`
   - **Estimated Time:** 0.5 hours

### Recommendations:
- Refactor to use `adminMutation` wrapper consistently.

---

## [Library]: Authentication Logic

**PATH:** `/lib/auth.ts`

### Issues Found:
1. **Line 15:** `process.env.DISABLE_RATE_LIMITING === "true"` - Severity: HIGH
   - **Impact:** Allows bypassing security controls via simple env var change, often left on by mistake.
   - **Fix:** Remove this block. Rate limiting should always be enabled in production.
   - **Estimated Time:** 1 hour

2. **Line 18:** Mock Rate Limiter always returns success - Severity: HIGH
   - **Impact:** If Redis fails, the system fails open (allows all requests), enabling brute force attacks.
   - **Fix:** Fail closed or implement a memory-based fallback with actual limits.
   - **Estimated Time:** 4 hours

3. **Line 132:** `Math.random()` for session token - Severity: HIGH
   - **Impact:** Predictable session tokens allow session hijacking.
   - **Fix:**
     ```typescript
     token.sessionToken = `session_${crypto.randomUUID()}`;
     ```
   - **Estimated Time:** 1 hour

### Recommendations:
- Switch to `crypto.randomUUID()`.
- Implement robust fallback for Redis unavailability.

---

## [Middleware]: Security Proxy

**PATH:** `/proxy.ts`

### Issues Found:
1. **Line 45:** `pathname.startsWith("/admin")` - Severity: MEDIUM
   - **Impact:** Fragile route protection. If an admin route is created at `/api/admin` (not covered by `matcher` exclusion?) or `/Admin` (if case sensitive), it might be bypassed.
   - **Fix:** Use a robust pattern matcher or centralize admin routes.
   - **Estimated Time:** 2 hours

### Recommendations:
- Ensure strict lowercase comparison or use a dedicated `isAdminRoute(pathname)` helper with comprehensive logic.

---

## [API Route]: Cron Contract Reminders

**PATH:** `/app/api/cron/contract-reminders/route.ts`

### Issues Found:
1. **Loop:** `for (const contract of expiringContracts) { await sendEmail(...) }` - Severity: HIGH
   - **Impact:** Serial execution will timeout with large datasets (performance/reliability).
   - **Fix:** Use `Promise.all` for batches or a job queue.
   - **Estimated Time:** 6 hours

### Recommendations:
- Move email sending to a background job (BullMQ).

---

## [Database]: Prisma Schema

**PATH:** `/prisma/schema.prisma`

### Issues Found:
1. **Line 5:** `provider = "sqlite"` - Severity: HIGH (for Enterprise)
   - **Impact:** Non-scalable, no concurrent writes.
   - **Fix:** Change to `postgresql`.
   - **Estimated Time:** 16 hours (migration + testing)

### Recommendations:
- Plan migration to Postgres immediately.

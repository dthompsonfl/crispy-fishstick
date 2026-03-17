# COMPLETE FILE AUDIT

**DATE:** 2025-05-15
**SCOPE:** Critical Files Analysis

---

## `proxy.ts` (Middleware)
**PATH:** `/proxy.ts`

### Issues Found:
1. **Line 57:** Security Matcher Bypass - **Severity: CRITICAL**
   - **Impact:** API routes (`/api/*`) are explicitly excluded from the middleware. They receive NO security headers (CSP, HSTS) and NO authentication checks from this layer.
   - **Fix:**
     ```typescript
     // Remove 'api' from the negative lookahead
     matcher: ['/((?!_next/static|_next/image|favicon.ico|...).*)'],
     ```
   - **Estimated Time:** 1 hour

---

## `app/api/admin/users/route.ts`
**PATH:** `/app/api/admin/users/route.ts`

### Issues Found:
1. **Line 19:** Force Dynamic - **Severity: HIGH**
   - **Impact:** `export const dynamic = "force-dynamic";` disables caching for this route. While acceptable for admin APIs, if copied to public routes, it degrades performance.
   - **Fix:** Use only when necessary.
   - **Estimated Time:** 0.5 hours

2. **Line 46-48:** Manual Security Implementation - **Severity: HIGH**
   - **Impact:** Manually calling `assertSameOrigin` and `verifyCsrfToken` is error-prone.
   - **Fix:** Use `adminMutation` wrapper.
   - **Estimated Time:** 2 hours (refactor)

3. **Line 63:** Weak Password Hashing - **Severity: MEDIUM**
   - **Impact:** `bcrypt.hash(password, 10)` is too weak for 2025 standards.
   - **Fix:** `bcrypt.hash(password, 14)`
   - **Estimated Time:** 1 hour

---

## `app/layout.tsx`
**PATH:** `/app/layout.tsx`

### Issues Found:
1. **Line 48:** Global Force Dynamic - **Severity: CRITICAL**
   - **Impact:** `export const dynamic = "force-dynamic";` forces the entire application (including marketing pages) to render server-side on every request.
   - **Fix:** Delete this line immediately.
   - **Estimated Time:** 0.5 hours

---

## `lib/auth.config.ts`
**PATH:** `/lib/auth.config.ts`

### Issues Found:
1. **Line 35:** Hardcoded Fallback Secret - **Severity: CRITICAL**
   - **Impact:** Returns `"dev-secret-fallback-for-development-only"` if secret is missing.
   - **Fix:** Throw error in production if secret is missing.
   - **Estimated Time:** 0.5 hours

## `package.json`: Dependencies

**PATH:** `/package.json`

## `scripts/bootstrap-ubuntu22.sh`
**PATH:** `/scripts/bootstrap-ubuntu22.sh`

### Issues Found:
1. **Line 538:** Syntax Error & Unconditional Exit - **Severity: BLOCKER**
   - **Impact:** Script fails to run. `exit 1` is placed in the main execution flow, not an error block, and there is a dangling `fi`.
   - **Fix:** Rewrite the logic flow.
   - **Estimated Time:** 2 hours

---

## `components/admin/content/content-form.tsx`
**PATH:** `/components/admin/content/content-form.tsx`

### Issues Found:
1. **Line 227:** Unsanitized Markdown Rendering - **Severity: CRITICAL**
   - **Impact:** Stored XSS via `<ReactMarkdown>{field.value}</ReactMarkdown>`.
   - **Fix:** Add `rehype-sanitize` plugin.
   - **Estimated Time:** 1 hour

**PATH:** `/lib/dal.ts`

## `prisma/schema.prisma`
**PATH:** `/prisma/schema.prisma`

### Issues Found:
1. **Line 6:** SQLite Provider - **Severity: HIGH**
   - **Impact:** Not suitable for production concurrency.
   - **Fix:** Change to `postgresql`.
   - **Estimated Time:** 4 hours (migration & config)

---

## `lib/auth.ts`
**PATH:** `/lib/auth.ts`

### Issues Found:
1. **Line 24:** Rate Limit Fail Open - **Severity: HIGH**
   - **Impact:** If Redis fails, rate limiting is disabled.
   - **Fix:** Fail closed (deny login) or implement in-memory fallback with strict limits.
   - **Estimated Time:** 2 hours

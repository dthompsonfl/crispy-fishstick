# SECURITY CRITICAL ISSUES AUDIT

**DATE:** 2025-05-15
**AUDITOR:** Jules (Senior Principal Engineer)
**SCOPE:** Full Codebase Analysis

---

## 🔴 CRITICAL (Deploy Blocker)

### 1. Rate Limiting "Fail-Open" Vulnerability
**Location:** `lib/auth.ts:25-30`
**Description:** The rate limiting logic falls back to a mock implementation if Redis is unavailable. This mock *always returns success* (`remaining: 5`), effectively disabling rate limiting when the infrastructure is most stressed or under attack.
**Code Evidence:**
```typescript
} catch (_error) {
  console.warn('Redis not available, rate limiting will be disabled');
  // Create a mock rate limiter for testing/fallback
  rateLimiterInstance = {
    checkLoginAttempt: async () => { return { success: true, remaining: 5 }; }, // ALWAYS ALLOWS
    getClientIp: () => '127.0.0.1',
  };
}
```
**Fix:** Implement a "Fail-Closed" mechanism or an in-memory fallback that actually counts requests.
```typescript
// FIX: In-memory fallback
const memoryStore = new Map();
rateLimiterInstance = {
  checkLoginAttempt: async (ip) => {
    const count = (memoryStore.get(ip) || 0) + 1;
    memoryStore.set(ip, count);
    if (count > 5) return { success: false, retryAfter: 60 };
    return { success: true, remaining: 5 - count };
  }
};
```

### 2. Tenant Isolation Bypass (Global Data Leak)
**Location:** `lib/dal.ts` (implied usage in `app/api/admin/leads/route.ts`)
**Description:** The data access layer (`getLeads`) accepts an optional `tenantId`. If `undefined` is passed (which happens for Global Admins or potentially due to bug `user.tenantId || undefined`), the Prisma `where` clause omits the `tenantId` filter entirely. This causes the query to return **ALL leads from ALL tenants**.
**Code Evidence:**
```typescript
// lib/dal.ts
if (params.tenantId) where.tenantId = params.tenantId;
// If params.tenantId is undefined, where.tenantId is NOT set.
```
**Impact:** A single misconfiguration or bug in the calling controller exposes the entire platform's data.
**Fix:** Enforce explicit `undefined` vs `null` handling or default to a "no-op" ID that returns nothing if context is missing.

### 3. Deployment Script Logic Error (Guaranteed Failure)
**Location:** `scripts/bootstrap-ubuntu22.sh:742`
**Description:** The bootstrap script contains a logic error where it unconditionally exits with status `1` during the package installation phase, preventing deployment.
**Code Evidence:**
```bash
    # Clean up node_modules to ensure fresh install
    if [ -d "$APP_DIR/node_modules" ]; then
        log_info "Cleaning up old node_modules directory..."
        rm -rf "$APP_DIR/node_modules" "$APP_DIR/package-lock.json"
    fi
    exit 1  # <--- FATAL: Unconditional exit
fi
```
**Fix:** Remove the `exit 1` and fix the surrounding `if/fi` block structure.

---

## 🟡 HIGH RISK

### 1. Hardcoded Role Strings
**Location:** `proxy.ts` (Middleware) & `lib/dal.ts`
**Description:** Authorization checks rely on string matching `"Admin"` or `"Owner"`. This is brittle and case-sensitive. Database migrations or manual edits changing a role to `"admin"` will silently break access control or lock out users.
**Code Evidence:**
```typescript
const isAdmin = userRoles.includes("Admin") || userRoles.includes("Owner");
```
**Recommendation:** Use an enum or constant file for Role names (e.g., `Roles.ADMIN`).

### 2. Manual CSRF Implementation
**Location:** `app/api/admin/users/route.ts`
**Description:** Critical mutation endpoints manually invoke `await verifyCsrfToken(req)`. While currently correct, this pattern is prone to developer error (forgetting to call it).
**Recommendation:** Enforce a higher-order function (HOF) wrapper like `withAdminGuard` that *automatically* performs CSRF checks for all non-GET requests.

### 3. Weak Randomness in Middleware
**Location:** `proxy.ts`
**Description:** Fallback for `nonce` generation uses `Math.random()`.
```typescript
const nonce = globalThis.crypto?.randomUUID?.().replace(/-/g, "") ?? Math.random().toString(36).slice(2);
```
**Recommendation:** Ensure `crypto` is always available (Node 20+ supports it globally) or use a polyfill. Remove the weak fallback.

---

## 🟠 MEDIUM RISK

### 1. Markdown Rendering XSS Potential
**Location:** `components/admin/content/content-form.tsx`
**Description:** `ReactMarkdown` is used. While safe by default, no explicit sanitization plugins (`rehype-sanitize`) are configured. Future changes (e.g., enabling HTML input) would immediately introduce XSS.
**Fix:** Install and use `rehype-sanitize`.

### 2. Environment Variable Validation
**Location:** `lib/auth.ts`
**Description:** The application allows starting with "dev secrets" in some paths if validation fails, printing a warning. In a chaotic production boot, this might be missed.
**Recommendation:** `process.exit(1)` immediately if `NEXTAUTH_SECRET` is missing or weak in production.

---

**TOTAL SCORE:** 0/100 (FAIL)
**STATUS:** ⛔ DO NOT DEPLOY

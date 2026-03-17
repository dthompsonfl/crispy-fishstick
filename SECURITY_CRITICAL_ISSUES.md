# SECURITY CRITICAL ISSUES AUDIT

**DATE:** 2025-05-15
**AUDITOR:** Senior Principal Engineer
**TARGET:** Fortune 500 Deployment Suitability
**STATUS:** 🔴 NO-GO (CRITICAL VULNERABILITIES DETECTED)

---

## 🔴 CRITICAL (Deploy Blocker)

### 1. API Route Protection Bypass (Global Authorization Fail)
**Severity:** CRITICAL
**CWE:** CWE-285: Improper Authorization
**Location:** `proxy.ts`
**Impact:** Complete bypass of authentication, authorization, and security headers for ALL API routes. Attackers can access any API endpoint directly without admin checks or CSP protections.

**Evidence:**
```typescript
// proxy.ts
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) <--- EXPLICIT EXCLUSION
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/uploads|.*\\.(?:jpg|jpeg|gif|png|webp|svg|ico)$).*)',
  ],
};
```

**Fix:** Remove `api` from the exclusion list or create a dedicated middleware for API security.
```typescript
// proxy.ts - Fixed Matcher
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/uploads).*)',
  ],
};
```

### 2. Hardcoded Authentication Secret Fallback
**Severity:** CRITICAL
**CWE:** CWE-798: Use of Hard-coded Credentials
**Location:** `lib/auth.config.ts`
**Impact:** Allows session forgery. If the environment variable check fails or is bypassed (common in containerized envs with improper `NODE_ENV` propagation), the system defaults to a known secret string.

**Evidence:**
```typescript
// lib/auth.config.ts
if (!secret) {
  console.warn("No auth secret found. Using a development fallback secret.");
  return "dev-secret-fallback-for-development-only";
}
```

**Fix:** Fail fast and hard in all environments, or at least strictly in production.
```typescript
// lib/auth.config.ts
if (!secret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("CRITICAL SECURITY: NEXTAUTH_SECRET is missing.");
  }
  // Only for strictly local dev
  return "dev-secret-fallback-for-development-only";
}
```

### 3. Stored XSS in Content Management
**Severity:** CRITICAL
**CWE:** CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')
**Location:** `components/admin/content/content-form.tsx`
**Impact:** Administrators viewing malicious content (e.g., from a compromised account or if the form is exposed) will execute arbitrary JavaScript. `react-markdown` renders HTML by default if not sanitized.

**Evidence:**
```tsx
// components/admin/content/content-form.tsx
<ReactMarkdown>{field.value}</ReactMarkdown>
```
*Note: While `react-markdown` escapes HTML by default in newer versions, it allows protocol vulnerabilities (e.g., `javascript:`) and lacks explicit sanitization configuration required for corporate compliance.*

**Fix:** Use `rehype-sanitize`.
```tsx
import rehypeSanitize from "rehype-sanitize";
// ...
<ReactMarkdown rehypePlugins={[rehypeSanitize]}>{field.value}</ReactMarkdown>
```

---

## 🟡 HIGH RISK

### 4. Broken Rate Limiting Strategy ("Fail Open")
**Severity:** HIGH
**CWE:** CWE-693: Protection Mechanism Failure
**Location:** `lib/auth.ts`
**Impact:** Brute force attacks are possible if Redis is unavailable. The system falls back to a mock limiter that *always permits* requests.

**Evidence:**
```typescript
// lib/auth.ts
} catch (_error) {
  console.warn('Redis not available, rate limiting will be disabled');
  // Create a mock rate limiter for testing/fallback
  rateLimiterInstance = {
    checkLoginAttempt: async () => { return { success: true, remaining: 5 }; }, // ALWAYS SUCCESS
    getClientIp: () => '127.0.0.1',
  };
}
```

**Fix:** Fail closed. Login must be disabled if security infrastructure is offline.
```typescript
rateLimiterInstance = {
  checkLoginAttempt: async () => { throw new Error("LOGIN_TEMPORARILY_UNAVAILABLE"); },
  // ...
};
```
**Recommendation:** Use an enum or constant file for Role names (e.g., `Roles.ADMIN`).

### 2. Manual CSRF Implementation
**Location:** `app/api/admin/users/route.ts`
**Description:** Critical mutation endpoints manually invoke `await verifyCsrfToken(req)`. While currently correct, this pattern is prone to developer error (forgetting to call it).
**Recommendation:** Enforce a higher-order function (HOF) wrapper like `withAdminGuard` that *automatically* performs CSRF checks for all non-GET requests.

### 5. Inconsistent CSRF Enforcement
**Severity:** HIGH
**CWE:** CWE-352: Cross-Site Request Forgery
**Location:** `app/api/admin/users/route.ts` (and others)
**Impact:** Developers are manually implementing `verifyCsrfToken(req)` and `assertSameOrigin(req)`. This is prone to human error. One missed check opens a route to CSRF.
**Evidence:** `app/api/admin/users/route.ts` manually calls these functions instead of using the `adminMutation` wrapper from `lib/admin/route.ts`.

---

## 🟠 MEDIUM RISK

### 6. Weak Password Hashing Configuration
**Severity:** MEDIUM
**CWE:** CWE-916: Use of Password Hash with Insufficient Computational Effort
**Location:** `app/api/admin/users/route.ts`
**Impact:** `bcrypt.hash(password, 10)` uses a cost factor of 10. Modern hardware can crack this faster than desired. NIST recommends higher work factors for critical systems.
**Fix:** Increase work factor to 12 or 14.

### 7. Missing Security Headers on API Responses
**Severity:** MEDIUM
**Location:** Global
**Impact:** Because `proxy.ts` excludes `/api`, API responses lack `X-Content-Type-Options`, `X-Frame-Options`, and `HSTS` headers, making them vulnerable to mime-sniffing and clickjacking (if rendered in browser).

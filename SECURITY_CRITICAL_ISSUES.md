# SECURITY CRITICAL ISSUES AUDIT

## 🔴 CRITICAL RISK (Deploy Blocker)

### 1. CSRF Vulnerability in Admin API
**Location:** `app/api/admin/users/route.ts` (and potentially others not using `adminMutation`)
**Issue:** The Admin API for user creation (`POST`) manually implements `requireAdmin` and `assertSameOrigin` but fails to invoke `verifyCsrfToken`. This allows attackers to forge requests if they can trick an admin into visiting a malicious site (CSRF), bypassing the Origin check if the browser doesn't send it or if it's spoofed in certain non-browser contexts (though Origin is robust in modern browsers, defense-in-depth is missing).
**Code Evidence:**
```typescript
// app/api/admin/users/route.ts
export async function POST(req: NextRequest) {
  try {
    // Phase 6: CSRF/Origin Enforcement
    assertSameOrigin(req); // Good, but insufficient alone
    const actor = await requireAdmin({ permissions: ["users.write"] });
    // MISSING: await verifyCsrfToken(req);
```
**Fix:**
Replace manual logic with the secure wrapper `adminMutation` which enforces CSRF:
```typescript
import { adminMutation } from "@/lib/admin/route";

export const POST = adminMutation({ permissions: ["users.write"] }, async (user, body) => {
  // Handler logic...
});
```

### 2. Authentication Bypass / Weak Rate Limiting
**Location:** `lib/auth.ts`
**Issue:** The code allows disabling rate limiting via an environment variable `DISABLE_RATE_LIMITING`. Furthermore, the fallback mock rate limiter hardcodes `remaining: 5` and returns `success: true` always. If Redis fails or is disabled, brute force attacks are trivial.
**Code Evidence:**
```typescript
// lib/auth.ts
if (process.env.DISABLE_RATE_LIMITING === "true") {
  console.warn('Rate limiting disabled via env var'); // DANGEROUS IN PROD
  rateLimiterInstance = {
    checkLoginAttempt: async () => ({ success: true, remaining: 5 }), // ALways allows
    getClientIp: () => '127.0.0.1',
  };
}
```
**Fix:**
Remove the bypass. Fail securely if Redis is down (deny login) or fallback to an in-memory Map rate limiter, not a "always success" mock.

---

## 🟡 HIGH RISK

### 1. Weak Session Token Generation
**Location:** `lib/auth.ts`
**Issue:** Session tokens are generated using `Math.random()`, which is not cryptographically secure.
**Code Evidence:**
```typescript
// lib/auth.ts
token.sessionToken = `session_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
```
**Fix:**
Use `crypto.randomUUID()`:
```typescript
token.sessionToken = `session_${crypto.randomUUID()}`;
```

### 2. Fragile Admin Route Protection
**Location:** `proxy.ts`
**Issue:** Admin route protection relies on string matching `pathname.startsWith("/admin")`. While `pathname` is generally normalized by Next.js, reliance on string prefixes can be fragile if case-sensitivity handling varies or if new admin routes are introduced that don't match the pattern (e.g., `/api/v2/admin`).
**Fix:**
Use a robust matcher or move admin routes to a separate subdomain/app to enforce isolation. Ensure `pathname` is lowercased before check (it is in the current code, but the pattern is manual).

---

## 🟠 MEDIUM RISK

### 1. Graceful Degradation on Missing Secrets
**Location:** `instrumentation.ts`
**Issue:** The application logs a warning but continues startup if `NEXTAUTH_SECRET` or `DATABASE_URL` are missing in production. This can lead to runtime errors or insecure defaults.
**Code Evidence:**
```typescript
if (missing.length > 0) {
  console.warn(`⚠️ Missing required environment variables... continuing with graceful degradation`);
}
```
**Fix:**
Throw an error and halt startup in production if critical secrets are missing.

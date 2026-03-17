# SECURITY CRITICAL ISSUES

## 🔴 CRITICAL (Deploy Blocker)

### 1. Hardcoded Secret Fallback in Auth Config
**Risk**: Authentication Bypass / Session Forgery
**Location**: `lib/auth.config.ts`
**Description**: The authentication configuration includes a hardcoded fallback secret that is used when environment variables are missing. While it logs a warning, it returns the weak secret, allowing attackers who know this open-source default to forge session tokens.
**Snippet**:
```typescript
if (!secret) {
  console.warn("No auth secret found. Using a development fallback secret.");
  return "dev-secret-fallback-for-development-only";
}
```
**Fix**:
```typescript
if (!secret) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("FATAL: NEXTAUTH_SECRET is missing in production");
  }
  console.warn("Using dev secret for local development only");
  return "dev-secret-fallback-for-development-only";
}
```

### 2. Broken Rate Limiting (Fail-Open)
**Risk**: DDoS Vulnerability
**Location**: `lib/security/rate-limit.ts`
**Description**: The rate limiter catches Redis connection errors and explicitly returns `{ success: true }`, effectively disabling protection when the infrastructure is under stress—exactly when it is needed most.
**Snippet**:
```typescript
} catch (error) {
  console.error("Rate limiting error:", error);
  // Fail open if Redis is unavailable
  return {
    success: true,
    remaining: this.maxAttempts
  };
}
```
**Fix**: Implement a memory-based fallback or fail-closed strategy for critical endpoints.

### 3. Unconditional Deployment Failure
**Risk**: Deployment Integrity
**Location**: `scripts/bootstrap-ubuntu22.sh`
**Description**: The bootstrap script contains an unconditional `exit 1` inside the package installation phase, preventing the script from ever completing the setup. This leaves the server in a partially configured, vulnerable state.
**Snippet**:
```bash
    # Clean up node_modules to ensure fresh install
    if [ -d "$APP_DIR/node_modules" ]; then
        log_info "Cleaning up old node_modules directory..."
        rm -rf "$APP_DIR/node_modules" "$APP_DIR/package-lock.json"
    fi
    exit 1
fi
```
**Fix**: Remove the `exit 1` and fix the dangling `fi`.

---

## 🟡 HIGH RISK

### 1. Stored XSS in CMS
**Risk**: Cross-Site Scripting
**Location**: `components/admin/content/content-form.tsx`
**Description**: The Admin CMS uses `ReactMarkdown` to preview content without any sanitization plugins (like `rehype-sanitize`). If an admin account is compromised, malicious scripts can be stored and executed against other admins.
**Snippet**:
```tsx
<ReactMarkdown>{field.value}</ReactMarkdown>
```
**Fix**:
```tsx
import rehypeSanitize from 'rehype-sanitize';
<ReactMarkdown rehypePlugins={[rehypeSanitize]}>{field.value}</ReactMarkdown>
```
**Recommendation:** Use an enum or constant file for Role names (e.g., `Roles.ADMIN`).

### 2. Manual CSRF Implementation
**Location:** `app/api/admin/users/route.ts`
**Description:** Critical mutation endpoints manually invoke `await verifyCsrfToken(req)`. While currently correct, this pattern is prone to developer error (forgetting to call it).
**Recommendation:** Enforce a higher-order function (HOF) wrapper like `withAdminGuard` that *automatically* performs CSRF checks for all non-GET requests.

### 2. Missing Containerization
**Risk**: Environment Drift / RCE
**Location**: Root
**Description**: There is no `Dockerfile` or container strategy. The project relies on a fragile bash script for VM mutation, increasing the attack surface and risk of configuration drift compared to immutable containers.

---

## 🟠 MEDIUM RISK

### 1. Brittle CSRF Implementation
**Risk**: CSRF Bypass
**Location**: `app/api/admin/users/route.ts`
**Description**: While `verifyCsrfToken(req)` is called, it is a manual invocation in the route handler. If a developer adds a new POST endpoint and forgets this line, the endpoint is vulnerable. Middleware-based enforcement is preferred for admin routes.

### 2. Weak Middleware Admin Check
**Risk**: Authorization Bypass
**Location**: `proxy.ts`
**Description**: The middleware checks `pathname.startsWith("/admin")` but relies on `token.roles.includes("Admin")`. While valid, complex role logic should be centralized in a guard function (like `lib/admin/guards.ts`) rather than duplicated in the edge middleware.

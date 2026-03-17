# CODE QUALITY VIOLATIONS AUDIT

**DATE:** 2025-05-15
**AUDITOR:** Senior Principal Engineer
**STATUS:** NEEDS REMEDIATION

---

## 🔴 MAINTAINABILITY BLOCKERS

### 1. Loose TypeScript Configuration
**Severity:** HIGH
**Location:** `tsconfig.json`
**Issue:** `"skipLibCheck": true` hides type errors in dependencies, potentially masking incompatibility issues.
**Metric:** Type safety confidence is reduced.
**Fix:** Set `"skipLibCheck": false` and resolve the underlying type conflicts.

### 2. Inconsistent Security Implementation Patterns
**Severity:** HIGH
**Location:** API Routes
**Issue:** Some routes (like `app/api/admin/users/route.ts`) manually implement security checks (`assertSameOrigin`, `verifyCsrfToken`), ignoring the standardized `adminMutation` wrapper available in `lib/admin/route.ts`.
**Code Smell:** DRY (Don't Repeat Yourself) violation leading to security holes.
**Fix:** Refactor all admin API routes to use `adminMutation` and `adminRead`.

```typescript
// BAD (Current Manual Pattern)
export async function POST(req: NextRequest) {
  assertSameOrigin(req);
  await verifyCsrfToken(req);
  const user = await requireAdmin(...);
  // ...
}

// GOOD (Standardized Pattern)
export const POST = adminMutation(
  { permissions: ["users.write"] },
  async (user, body) => {
    // ... business logic only
  }
);
```

---

## 🟡 QUALITY DEBT

### 3. Error Handling Antipatterns
**Severity:** MEDIUM
**Location:** Multiple files (e.g., `app/api/admin/users/route.ts`)
**Issue:** Catching `any` and weak error normalization.
```typescript
catch (error: any) {
    if (error?.message === "Forbidden") ...
}
```
**Fix:** Use the centralized `normalizeError` utility consistently.

### 4. Magic Strings & Hardcoded Configuration
**Severity:** MEDIUM
**Location:** `lib/auth.config.ts`, `lib/auth.ts`
**Issue:** Strings like `"dev-secret-fallback-for-development-only"` and hardcoded IP `"127.0.0.1"` in fallback logic.
**Fix:** Move all configuration to a strictly typed Environment configuration module.

### 5. Complex/God Components
**Severity:** MEDIUM
**Location:** `components/admin/content/content-form.tsx`
**Issue:** The component handles UI rendering, form state, validation, data fetching, and routing logic. It is over 150 lines.
**Fix:** Extract the form submission logic into a custom hook (`useContentForm`) and split the UI into smaller sub-components (e.g., `<ContentFormFields />`, `<MarkdownEditor />`).

**Violation Count:** High
**Severity:** HIGH

*   **`any` Usage:**
    *   `app/api/admin/users/route.ts`: `catch (error: any)`
    *   `components/admin/content/content-form.tsx`: `catch (error: any)`
    *   **Impact:** defeats the purpose of TypeScript. If an error shape changes, the app crashes silently.
    *   **Fix:** Use `if (error instanceof Error)` checks or Zod schema validation for unknown data.

*   **Config Looseness:**
    *   `tsconfig.json`: `"skipLibCheck": true` is enabled. While common, it hides potential library incompatibility issues.

## 2. Code Smells & Maintainability

*   **Console Logs in Production:**
    *   **Count:** 27 occurrences found.
    *   **Location:** `proxy.ts`, `lib/auth.ts`, etc.
    *   **Example:** `console.log("Proxy checking admin access for:", pathname...)`
    *   **Impact:** Performance degradation (synchronous I/O) and Security Risk (leaking tokens/PII).
    *   **Fix:** Use a proper logger (Winston/Pino) and strip `console.log` in production builds.

*   **Magic Strings:**
    *   Roles `"Admin"`, `"Owner"` are scattered across `proxy.ts`, `guards.ts`, `dal.ts`.
    *   **Fix:** Create `lib/constants/roles.ts` and import.

*   **Duplicate Logic:**
    *   CSRF verification is manually implemented in multiple places.
    *   Rate limiting fallback logic is duplicated or weak.

## 🟠 TESTING GAPS

### 6. Missing Unit Tests for Critical Logic
**Issue:** While `tests/` folder exists, coverage is spotty. `lib/auth.ts` has complex logic (MFA, Rate Limit) that needs comprehensive unit testing with mocked dependencies.

### 7. No Integration Tests for API Routes
**Issue:** API routes are tested via E2E tests (Playwright), which are slow and brittle.
**Recommendation:** Add `node-mocks-http` based integration tests for API routes to verify security headers and error states quickly.

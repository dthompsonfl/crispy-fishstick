# CODE QUALITY VIOLATIONS

**DATE:** 2025-05-15
**AUDITOR:** Jules (Senior Principal Engineer)

---

## 1. TypeScript & Type Safety

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

## 3. Error Handling

*   **Silent Failures:**
    *   `JSON.parse(permissions)` inside `map` functions in `lib/auth.ts` and `lib/admin/guards.ts` has a `catch { return [] }` block.
    *   **Impact:** If data corruption occurs in the DB, permissions silently disappear, confusing users/admins.
    *   **Fix:** Log the error to Sentry before returning the fallback.

## 4. Testing Gaps

*   **Unit Tests:** Vitest is configured but `package.json` shows minimal test scripts.
*   **E2E Tests:** Playwright is present but `ci.yml` shows flakey setup (`sleep 10`).
*   **Coverage:** No coverage report available, but manual audit suggests low coverage of edge cases (e.g., Redis failure).

## 5. Documentation

*   **Missing JSDoc:** Critical functions in `lib/dal.ts` lack documentation on parameters (specifically that `tenantId` is optional and what happens if omitted).
*   **README:** Exists but focuses on "Agents" (`AGENTS.md`) rather than human developer onboarding.

---

**RECOMMENDATION:** Enforce `eslint` rules for `no-console` and `no-explicit-any`. Refactor role management immediately.

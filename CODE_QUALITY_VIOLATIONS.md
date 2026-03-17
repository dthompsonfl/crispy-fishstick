# CODE QUALITY VIOLATIONS

## 🚨 TypeScript & Type Safety

### 1. Excessive Use of `any`
**Count:** Multiple occurrences in critical paths.
**Locations:**
- `lib/auth.ts`: `let rateLimiterInstance: any = null;`
- `lib/admin/route.ts`: `context: any`, `error: any`
- `app/api/admin/users/route.ts`: `const where: any = ...`
**Impact:** Defeats the purpose of TypeScript. "Any" types propagate, leading to runtime crashes when properties are accessed on undefined values.
**Fix:** Define proper interfaces.
```typescript
interface RateLimiter {
  checkLoginAttempt: (ip: string, email: string) => Promise<{ success: boolean; remaining: number }>;
  getClientIp: () => string;
}
```

### 2. Magic Strings & Hardcoded Roles
**Location:** `proxy.ts`
**Issue:** `userRoles.includes("Admin") || userRoles.includes("Owner")`
**Impact:** Renaming a role in the DB requires grepping the codebase. Typos ("admin" vs "Admin") cause security bugs.
**Fix:** Use an Enum or Constant object.
```typescript
export enum ROLES {
  ADMIN = "Admin",
  OWNER = "Owner",
  USER = "User"
}
```

---

## 🧹 Maintainability & Structure

### 1. Inconsistent API Patterns
**Issue:**
- `app/api/admin/users/route.ts` uses direct `requireAdmin` + `assertSameOrigin`.
- `lib/admin/route.ts` provides `adminMutation` / `adminRead` wrappers.
**Impact:** Developers are confused about which pattern to use. Security features (CSRF) implemented in the wrapper are missed in the direct implementation.
**Fix:** Enforce usage of `adminMutation`/`adminRead` wrappers for all admin routes via linting or code review.

### 2. Dependency Version Mismatches
**Issue:**
- `react-markdown`: ^10.1.0
- `next-mdx-remote`: ^5.0.0
- `@mdx-js/react`: ^3.0.1
**Impact:** Potential conflicts between MDX/Markdown parsing versions, leading to rendering bugs or bundle duplication.
**Fix:** Audit and align versions.

### 3. "Console.log" Debugging
**Location:** `lib/auth.ts`, `app/api/cron/contract-reminders/route.ts`
**Issue:** `console.log("Password invalid for user", user.email);`
**Impact:** Clutters production logs. Can leak PII (email addresses) to log aggregators.
**Fix:** Use a proper logger (`winston` is in dependencies) with log levels and redaction.

---

## 🧪 Testing

### 1. Test Coverage Gaps
**Observation:** `vitest` and `playwright` are installed.
**Gap:** Critical paths like `lib/auth.ts` fallback logic (mock rate limiter) and `app/api/admin/users` manual checks need rigorous unit tests.
**Action:** Ensure `tests/admin/` covers the CSRF bypass scenario to confirm the vulnerability.

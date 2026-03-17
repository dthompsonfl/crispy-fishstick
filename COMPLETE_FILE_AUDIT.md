## app/layout.tsx: Global Performance Killer

**PATH:** `/app/layout.tsx`

### Issues Found:
1. **Line 43:** Global Dynamic Forcing - Severity: CRITICAL
   - **Impact**: Disables Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for the entire application. Every page load hits the server CPU.
   - **Fix**:
     ```typescript
     // DELETE THIS LINE
     // export const dynamic = "force-dynamic";
     ```
   - **Estimated Time**: 0.5 hours

## scripts/bootstrap-ubuntu22.sh: Broken Deployment

**PATH:** `/scripts/bootstrap-ubuntu22.sh`

### Issues Found:
1. **Line 605-612:** Logic Error & Early Exit - Severity: CRITICAL
   - **Impact**: The script attempts to remove `middleware.ts`, then unconditionally exits with `exit 1` before installing Node.js or the app.
   - **Fix**:
     ```bash
     if [ -f "$APP_DIR/middleware.ts" ]; then
         log_info "Removing legacy middleware.ts (Next.js 16 uses proxy.ts only)"
         rm -f "$APP_DIR/middleware.ts"
     fi

     # Clean up node_modules to ensure fresh install
     if [ -d "$APP_DIR/node_modules" ]; then
         log_info "Cleaning up old node_modules directory..."
         rm -rf "$APP_DIR/node_modules" "$APP_DIR/package-lock.json"
     fi
     # REMOVE THE 'exit 1' AND THE EXTRA 'fi' if present
     ```
   - **Estimated Time**: 1 hour

## lib/auth.config.ts: Security Backdoor

**PATH:** `/lib/auth.config.ts`

### Issues Found:
1. **Line 45:** Hardcoded Secret Return - Severity: CRITICAL
   - **Impact**: Allows session hijacking if `NEXTAUTH_SECRET` is unset.
   - **Fix**:
     ```typescript
     if (!secret) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("Missing NEXTAUTH_SECRET in production");
        }
        return "dev-fallback...";
     }
     ```
   - **Estimated Time**: 0.5 hours

## lib/security/rate-limit.ts: Fail-Open Vulnerability

**PATH:** `/lib/security/rate-limit.ts`

### Issues Found:
1. **Line 115:** Fail-Open Logic - Severity: HIGH
   - **Impact**: Rate limiting is completely bypassed if Redis is down/unreachable.
   - **Fix**:
     ```typescript
     } catch (error) {
       console.error("Rate limiting error:", error);
       // Fail CLOSED for critical security, or implement in-memory fallback
       return { success: false, retryAfter: 60 };
     }
     ```
   - **Estimated Time**: 2 hours

## package.json: Dependency Bloat

**PATH:** `/package.json`

### Issues Found:
1. **Dependencies:** Duplicate Animation Libs - Severity: HIGH
   - **Impact**: Massive bundle size.
   - **Fix**: Remove `gsap`, `@gsap/react`, `@splinetool/react-spline` and refactor components to use `framer-motion` exclusively.
   - **Estimated Time**: 16 hours (Refactoring required)

## prisma/schema.prisma: Scalability Block

## `app/api/admin/users/route.ts`: Admin API

**PATH:** `/app/api/admin/users/route.ts`

### Issues Found:
1. **Line 6:** SQLite Provider - Severity: CRITICAL
   - **Impact**: Cannot handle concurrent writes.
   - **Fix**:
     ```prisma
     provider = "postgresql"
     ```
   - **Estimated Time**: 4 hours (plus migration setup)

# PERFORMANCE OPTIMIZATION GUIDE

**DATE:** 2025-05-15
**AUDITOR:** Jules (Senior Principal Engineer)

---

## 1. Bundle Analysis & Bloat

**🚨 CRITICAL ISSUE:** Triple Animation Library Overhead
The application currently loads THREE separate animation libraries + a 3D runtime.

| Library | Usage | Size (Est. Gzipped) | Status |
| :--- | :--- | :--- | :--- |
| `framer-motion` | Global (`layout.tsx`) | ~50KB | **KEEP** (Heavily used) |
| `gsap` | `living-blueprint-section.tsx` | ~60KB+ | **REMOVE** |
| `@splinetool/runtime` | `spline-blueprint-canvas.tsx` | ~150KB+ | **REMOVE** |
| `@splinetool/react-spline` | `spline-blueprint-canvas.tsx` | ~3MB (Parsed) | **REMOVE** |

**Recommendation:**
1.  **Delete GSAP:** Rewrite `living-blueprint-section.tsx` using `framer-motion`.
2.  **Delete Spline:** The `HeroBackground` uses a custom Canvas implementation (`Waves.tsx`) which is lightweight. Verify if `spline-blueprint-canvas.tsx` is actually used. If not, delete it. If yes, lazy load it dynamically with `next/dynamic`.

## 2. Rendering Performance

**🚨 CRITICAL ISSUE:** `force-dynamic` in Root Layout
**Location:** `app/layout.tsx`
```typescript
export const dynamic = "force-dynamic";
```
**Impact:** This disables Static Site Generation (SSG) and Incremental Static Regeneration (ISR) for the **ENTIRE APPLICATION**. Every request hits the server.
**Reason:** Likely added to generate a nonce for CSP.
**Fix:** Move nonce generation to `middleware.ts` (already there) and pass it via headers, but DO NOT force dynamic on the layout. Use `Script` strategy `nonce` from request headers if possible, or accept that the Marketing Site (`app/(site)`) should be static and might need a different layout than the Admin App.

**Component Issues:**
*   `components/react-bits/Waves.tsx`: Runs `requestAnimationFrame` continuously.
    *   **Fix:** Use `IntersectionObserver` to pause the animation loop when the component is not in the viewport.

## 3. Database Performance

**🚨 CRITICAL ISSUE:** SQLite in Production
**Location:** `prisma/schema.prisma` (`provider = "sqlite"`)
**Impact:** SQLite allows only one writer at a time. For a $10M enterprise deployment, this will deadlock immediately under load.
**Fix:** Migrate to PostgreSQL (AWS RDS or similar).
```prisma
datasource db {
  provider = "postgresql" // WAS sqlite
  url      = env("DATABASE_URL")
}
```

**N+1 Queries:**
*   `getSessionUser` in `lib/admin/guards.ts` manually re-fetches user and roles. Ensure indexes exist on `User.email` and `RoleAssignment.userId` (They do in schema, but verify execution plan).

## 4. Metrics & SLA Targets

| Route | Current Est. | Target | Action |
| :--- | :--- | :--- | :--- |
| `/` (Home) | ~1.2s (TTFB) | <200ms | Remove `force-dynamic`, Cache HTML |
| `/admin/*` | ~500ms | <300ms | Optimize DB queries, use Redis for Session |
| `bundle.js` | ~1.5MB | <300KB | Remove GSAP, Spline, Tree-shake |

---

## 5. Infrastructure Optimization

*   **CDN:** Not configured. Assets are served from the Node.js server.
    *   **Fix:** Configure `next.config.mjs` to upload assets to S3/CloudFront or use a Vercel/Cloudflare adapter.
*   **Images:** `splinetool.com` is in `remotePatterns`.
    *   **Fix:** If Spline is removed, remove this pattern to reduce security surface area.

**VERDICT:** The application is currently unoptimized for scale. Immediate refactoring of the animation strategy and database layer is required.

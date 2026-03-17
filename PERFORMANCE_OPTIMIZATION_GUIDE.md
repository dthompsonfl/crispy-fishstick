# PERFORMANCE OPTIMIZATION GUIDE

**DATE:** 2025-05-15
**AUDITOR:** Senior Principal Engineer
**TARGET:** < 200ms TTFB, < 1.5s LCP

---

## 🔴 CRITICAL PERFORMANCE KILLERS

### 1. Global Dynamic Rendering Force
**Impact:** **Catastrophic (0% Cache Hit Rate)**
**Location:** `app/layout.tsx`
**Issue:** `export const dynamic = "force-dynamic";`
**Analysis:** This line forces *every single page* in the application to skip the build cache and render on the server for every request.
**Metric:** TTFB will be 500ms-1s+ instead of <50ms (CDN edge).
**Fix:** Remove this line. Use `dynamic = "force-dynamic"` ONLY on specific API routes or pages that absolutely require it.
```typescript
// app/layout.tsx
// DELETE THIS LINE:
// export const dynamic = "force-dynamic";
```

### 2. Animation Library Bloat
**Impact:** **High Bundle Size**
**Issue:** Three distinct animation libraries are loaded.
**Evidence:** `package.json` includes:
- `framer-motion` (approx 30kb gzipped)
- `gsap` (approx 23kb gzipped)
- `@splinetool/runtime` (approx 100kb+ depending on usage)
- `tailwindcss-animate`
**Analysis:** This creates unnecessary main-thread overhead and payload size.
**Recommendation:** Standardize on `framer-motion` for UI and `tailwindcss-animate` for simple CSS transitions. Remove GSAP unless absolutely critical for a specific complex timeline. Lazy load Spline.

### 3. Database Bottleneck (SQLite)
**Impact:** **Zero Concurrency**
**Issue:** SQLite serializes all write operations.
**Metric:** Write latency will spike exponentially with concurrent users.
**Recommendation:** Migrate to PostgreSQL.

---

## 🟡 RENDERING OPTIMIZATIONS

### 4. Client-Side Hydration Weight
**Issue:** `app/(site)/layout.tsx` renders `SystemLayer`, `ConsoleHud`, and `RouteTransitionLayer` for all users.
**Analysis:** These likely contain heavy interactive logic.
**Recommendation:** Ensure these are code-split and lazy-loaded. Use `dynamic(() => import(...))` for non-critical visual components like `SystemLayer`.

### 5. Missing Image Optimization Strategy
**Issue:** No explicit image loader configuration found in `next.config.ts` (default generic loader).
**Recommendation:** Configure `next/image` with a CDN loader (Cloudinary or Vercel Blob) for production.

---

## 🟠 INFRASTRUCTURE OPTIMIZATIONS

### 6. No CDN Configuration
**Issue:** Static assets are served directly from the Node.js server (via Next.js).
**Recommendation:** Put Cloudflare or AWS CloudFront in front of the application to offload static asset delivery.

### 7. Missing Redis Caching for Data
**Issue:** `lib/dal.ts` fetches data directly from Prisma without a caching layer.
**Recommendation:** Implement `unstable_cache` (Next.js) or manual Redis caching for read-heavy operations like `getLeads` or `content` retrieval.

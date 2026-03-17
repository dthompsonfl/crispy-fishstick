# PERFORMANCE OPTIMIZATION GUIDE

## ⚡ Bundle Analysis & Bloat

### 1. Duplicate Animation Libraries (Waste: ~150KB+)
**Issue:** The project includes both `framer-motion` (approx 50KB gzipped) and `gsap` (approx 60KB+ gzipped depending on plugins). Both serve similar purposes (complex animations).
**Recommendation:** Standardize on one. `framer-motion` is more "React-native", while `GSAP` is more powerful for timeline sequencing.
**Action:** Remove `gsap` if possible, or `framer-motion` if GSAP is the primary driver.
**Files:** `package.json`

### 2. Heavy 3D Runtime
**Issue:** `@splinetool/react-spline` and `@splinetool/runtime` are included. These runtimes are extremely heavy (>500KB - 1MB parsed).
**Impact:** Significant Time-To-Interactive (TTI) delay on pages using 3D elements.
**Action:** Lazy load the Spline component using `next/dynamic` with `ssr: false`.
```tsx
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div>Loading 3D...</div>
})
```

---

## 🐢 Database & Backend Bottlenecks

### 1. Synchronous Email Loop in Cron
**Location:** `app/api/cron/contract-reminders/route.ts`
**Issue:** The route fetches all expiring contracts and iterates through them, `await`ing `sendEmail` for each one.
```typescript
for (const contract of expiringContracts) {
  await sendEmail({...}); // API call per iteration
}
```
**Impact:** If 500 contracts expire, and email sending takes 200ms, the request takes 100 seconds. This will likely time out Vercel/AWS Lambda functions (default 10-60s limit).
**Fix:**
1.  **Queueing:** Push jobs to Redis/BullMQ.
2.  **Batching:** Send emails in parallel chunks (e.g., `Promise.all` with concurrency limit).
```typescript
// Better approach (simple concurrency)
await Promise.all(expiringContracts.map(c => sendEmail(...)));
```

### 2. Missing Caching on Admin Reads
**Location:** `app/api/admin/users/route.ts`
**Issue:** `export const dynamic = "force-dynamic"` is used. While correct for real-time data, frequent polling by the admin dashboard will hammer the database.
**Fix:** Implement `stale-while-revalidate` caching headers or Redis caching for list views where realtime consistency isn't strictly required (e.g., 60s cache).

---

## 🏗️ Infrastructure & Rendering

### 1. Image Optimization
**Status:** `next/image` is used, but `sharp` is missing from `package.json`.
**Impact:** Next.js's built-in image optimization is slower in production without `sharp`.
**Fix:** `npm install sharp`

### 2. Standalone Build
**Status:** `output: 'standalone'` is configured.
**Note:** Ensure `node_modules` are correctly copied or installed in the final container image for the standalone server to work if it relies on native modules (like `sharp` or `bcrypt`).

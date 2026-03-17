## 2026-01-14 - Standardizing Button Loading States
**Learning:** Inconsistent manual implementation of loading spinners in buttons leads to code duplication and visual inconsistencies (e.g., spacing, icon size).
**Action:** Implemented a reusable `loading` prop in the core `Button` component that handles the spinner injection and disabled state automatically. Future forms should use this prop instead of manually rendering `Loader2`.

## 2025-05-18 - Semantic Badge Variants
**Learning:** The Design System tokens (`--signal-success`) existed in global CSS but were disconnected from the `Badge` component, forcing developers to use generic variants (like `default` for paid invoices) which harms semantic clarity.
**Action:** Always check `globals.css` for unused semantic tokens when auditing components. Added `success`, `warning`, and `info` variants to `Badge` to bridge this gap.

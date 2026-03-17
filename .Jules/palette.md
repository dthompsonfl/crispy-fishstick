## 2026-01-14 - Standardizing Button Loading States
**Learning:** Inconsistent manual implementation of loading spinners in buttons leads to code duplication and visual inconsistencies (e.g., spacing, icon size).
**Action:** Implemented a reusable `loading` prop in the core `Button` component that handles the spinner injection and disabled state automatically. Future forms should use this prop instead of manually rendering `Loader2`.

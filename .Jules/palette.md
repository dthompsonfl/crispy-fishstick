## 2026-01-14 - Standardizing Button Loading States
**Learning:** Inconsistent manual implementation of loading spinners in buttons leads to code duplication and visual inconsistencies (e.g., spacing, icon size).
**Action:** Implemented a reusable `loading` prop in the core `Button` component that handles the spinner injection and disabled state automatically. Future forms should use this prop instead of manually rendering `Loader2`.

## 2025-05-23 - Mobile Navigation Accessibility
**Learning:** Custom navigation components (like `MobileBottomNav`) often miss standard accessibility attributes (`aria-current`) and focus indicators, making them difficult to use for keyboard/screen-reader users.
**Action:** Always ensure custom nav links include `aria-current="page"` when active and use standard `focus-visible` utility classes (e.g., `focus-visible:ring-2`) to maintain consistent keyboard navigation experiences.

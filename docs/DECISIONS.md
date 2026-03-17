# Decisions Log

## Architecture
- **Dual Shells:** Implemented `DesktopShell` and `MobileShell` in `app/(site)/layout.tsx` using Tailwind display utilities (`hidden md:block`, etc.). This ensures distinct DOM structures for different devices without hydration mismatches.
- **Routing:** Using `app/(site)` group for the public SMB site. Overwriting existing "Enterprise" pages to pivot to SMB focus.
- **State:** No global state management (Redux/Zustand) needed for marketing site; reliant on URL state and React Server Components.

## Tech Stack
- **Styling:** Tailwind CSS v4 with OKLCH colors.
- **Animation:** Framer Motion for transitions; "React Bits" style custom components for hero effects.
- **Icons:** `lucide-react`.

## Content Strategy
- **Tone:** "Math, not marketing." Transparent, engineering-led, reassuring for SMBs.
- **Pricing:** Explicit ranges and packages. No "Call for quote" gating for basic tiers.

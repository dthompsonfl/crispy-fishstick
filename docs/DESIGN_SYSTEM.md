# Vantus SMB Design System

## Core Principles
1. **Engineering Precision:** UI should feel like a high-quality tool (linear gradients, thin borders, mono fonts for data).
2. **Trust & Calm:** Avoid alarmist colors. Use "Signal Green" for success/stability.
3. **Accessibility First:** AA+ contrast, reduced motion support.

## Tokens (Tailwind)
- **Colors:** defined in `app/globals.css` (OKLCH).
  - Primary: Deep Slate / High Contrast White
  - Signal Success: Emerald/Green
  - Surface: Subtle off-whites/greys for depth.
- **Typography:** Inter (Sans), JetBrains Mono (likely for data - need to verify if installed or use generic mono).

## Components
- **Buttons:** `btn-precision` class for interactions.
- **Cards:** `card-precision` for hover effects and borders.
- **Shells:**
  - `DesktopShell`: Wide, sidebar/top-nav hybrid or standard top-nav.
  - `MobileShell`: App-like, bottom tab bar, stacked cards.

<div align="center">
  <img src="https://raw.githubusercontent.com/Thompson-Development/vantus-new-design-system/main/.github/vantus-logotype-dark.svg" alt="Vantus Logotype" width="400">
  <br/>
  <p><strong>Engineering-Grade Systems for Small Business.</strong></p>
</div>

[![Build Status](https://img.shields.io/github/actions/workflow/status/Thompson-Development/crispy-fishstick/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/Thompson-Development/crispy-fishstick/actions)
[![License](https://img.shields.io/badge/License-Proprietary-blue.svg?style=for-the-badge)](https://github.com/Thompson-Development/crispy-fishstick/blob/main/README.md#%EF%B8%8F-license)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

**Vantus Systems** helps small business owners escape the "agency trap" with rigorous, high-performance websites and systems. We trade marketing fluff for engineering precision, offering fixed-scope packages, 100% ownership transfer, and a "math-not-marketing" approach.

**Live Site:** [**vantus.systems**](https://vantus.systems)

## ✨ Key Features (SMB Pivot)

This repository implements the Vantus SMB platform, featuring a unique "Dual Shell" architecture.

*   **Dual Shell Architecture:**
    *   **Desktop:** A premium B2B marketing experience with wide layouts, kinetic typography, and scrollytelling.
    *   **Mobile:** A native-app-like experience with bottom navigation, stacked cards, and sheet modals.
    *   *Implementation:* Both shells coexist in the DOM but are strictly gated via CSS for instant responsiveness without hydration mismatches.
*   **Kinetic UI (React Bits):**
    *   `TextReveal`: Character-based reveal animations for headlines.
    *   `AmbientBackground`: Performant canvas-based particle effects.
    *   `HeroBadge`: Pulsing status indicators.
*   **Trust-First Content:**
    *   Dedicated `/trust` and `/bus-factor-protocol` routes to address SMB fears of vendor lock-in.
    *   Transparent `/pricing` with fixed scopes.
    *   Engineering-grade `/audit` tools.
*   **Performance:**
    *   Server Components (RSC) by default.
    *   Zero-CLS layout shifts.
    *   Reduced Motion support for all kinetic components.

## 🛠 Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript 5.x](https://www.typescriptlang.org/) (Strict Mode)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/) + Custom Canvas
*   **Testing:** [Playwright](https://playwright.dev/) (Visual Verification)

## 🚀 Getting Started

### 1. Installation

```bash
git clone https://github.com/Thompson-Development/crispy-fishstick.git
cd crispy-fishstick
npm install
```

### 2. Running Development

```bash
npm run dev
```

### 3. Build & Verification

We enforce strict type safety and visual verification.

```bash
# Run Type Checking
npm run typecheck

# Run Visual Verification (Playwright)
# Note: Requires python3 and playwright installed
python3 verification/verify_smb.py
```

## 📂 Documentation

*   [**Decisions Log**](/docs/DECISIONS.md): Architectural choices and trade-offs.
*   [**Design System**](/docs/DESIGN_SYSTEM.md): Tokens, components, and usage.
*   [**Content Voice**](/docs/CONTENT_VOICE.md): Guidelines for "Math, not marketing" copy.

## 📂 Project Structure

```
.
├── app/
│   ├── (site)/           # SMB Public Site (Dual Shell)
│   │   ├── layout.tsx    # Implements DesktopShell + MobileShell
│   │   ├── page.tsx      # Landing Page
│   │   └── ...           # Other routes (/pricing, /audit, etc.)
│   ├── (admin)/          # Admin Dashboard (Legacy/Internal)
│   └── layout.tsx        # Root Layout
├── components/
│   ├── shells/           # DesktopShell and MobileShell implementation
│   ├── ui/               # Shared UI (Button, Card, etc.)
│   └── kinetic/          # Animation components (TextReveal, etc.)
├── verification/         # Python/Playwright verification scripts
└── docs/                 # Project documentation
```

## 📄 License

Proprietary. Vantus Systems.

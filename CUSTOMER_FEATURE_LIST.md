# Customer Portal Feature List

This document provides an exhaustive inventory of features, functionalities, and content within the Vantus Public Website / Customer Portal (`app/(site)`).

## Core Architecture & Experience

### "Unified Shell" Architecture
- **Seamless Navigation:**
    - Desktop: Sticky Header with "Precision" links and progress line indicator.
    - Mobile: Full-screen overlay menu with blurred backdrop.
    - Mobile Bottom Nav: Specific navigation for mobile users (hidden on desktop).
- **Global Styling:**
    - **Tailwind v4 Theme:** Utilizes semantic tokens (e.g., `--signal-success`, `--primary`) and OKLCH color space.
    - **Dark/Light Mode:** Full theming support with system preference detection and toggle.
    - **View Transitions:** Native View Transitions API support for smooth page loads.
    - **System Layer:** Background ambient effects (`SystemLayer`) providing depth and motion.
    - **Console HUD:** Overlay providing technical "system status" aesthetics.

### Visual Effects & Micro-Interactions
- **Precision UI:**
    - `.btn-precision`: Buttons with subtle lift, shadow, and shimmer effects.
    - `.card-precision`: Cards with border gradients and internal shimmer on hover.
    - `.input-precision`: Inputs with beam-sweep focus animations.
- **Carbon Glass:**
    - `.signal-sheen`: Interactive mouse-following sheen effects on Hero and Cover sections.
- **Motion:**
    - Powered by `framer-motion` and CSS animations.
    - Page transitions with error boundary protection.
    - Scroll-linked animations (e.g., Progress Line in Header).

## Page Inventory & Features

### Homepage (`/`)
- **Hero Section:**
    - "Ownership. Control. Peace of Mind." value proposition.
    - Interactive `HeroBackground`.
    - Animated text reveals.
    - Dual CTA: "Tour the Platform" / "View Case Studies".
- **"No-Code Promise" Section:**
    - Value prop: "We build the engine. You drive the car."
    - **Dashboard Preview:** Visual representation of the Owner's Dashboard.
- **"Hidden Dangers" Section:**
    - Educational focus on risks of cheap agencies.
    - **RiskCards:** Interactive cards highlighting common pitfalls.
    - Link to Academy.
- **Social Proof:**
    - **LocalBusinessImpact:** Showcase of real results.
- **Final CTA:**
    - "Ready to take control?" with booking link.

### Platform (`/platform`)
- **Purpose:** Detailed tour of the "BusinessOS" / Owner's Dashboard capabilities.
- **Features:** Showcase of the Admin Portal features (CMS, CRM, Analytics) to the prospective buyer.

### Work (`/work`)
- **Purpose:** Case studies and portfolio.
- **Features:**
    - Detailed breakdown of past projects.
    - "Before/After" comparisons.
    - Performance metrics.

### System (`/performance`)
- **Purpose:** Technical deep dive into the infrastructure and performance standards.
- **Features:**
    - Explanation of "Design Engineering".
    - Performance benchmarks.

### Lab (`/lab` / `/lab/revenue-leak`)
- **Purpose:** Experimental tools and calculators.
- **Revenue Leak Detector:** Interactive tool for businesses to estimate lost revenue.

### Process (`/process`)
- **Purpose:** Explanation of the engagement model and delivery workflow.

### Trust (`/trust`)
- **Purpose:** Security compliance, reliability guarantees, and transparency.

### Academy (`/academy`)
- **Purpose:** Educational content marketing.
- **Features:**
    - Guides and Articles (e.g., "The Hidden Dangers").
    - Resource downloads.

### Contact (`/contact`)
- **Features:**
    - Contact form / Booking interface.
    - Agency contact information.

## Layout Components

### Header
- **Navigation Links:** Work, System, Lab, Process, Trust.
- **Actions:** Theme Toggle, "Start" CTA.
- **Behavior:** Transforms on scroll (backdrop blur, border).

### Footer
- **Sections:**
    - Company Info & Value Prop.
    - Services Links (Design Engineering, Frontend Architecture, Commerce Systems).
    - Social Links (GitHub, LinkedIn, Twitter).
    - Legal (Privacy, Terms).
- **System Status:** "Systems Operational" indicator with pulse animation.

### Console HUD
- **Features:**
    - Draggable/Collapsible debug overlay (likely for "tech" aesthetic or dev mode).
    - Displays system metrics or route info.

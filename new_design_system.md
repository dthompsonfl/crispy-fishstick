# Vantus System Design System
**Codename:** AXIOM
**Scope:** Public website UI (marketing + resources + careers)
**Status:** Draft v1.0
**Last Updated:** 2026-01-03

---

## 1. Core principles

AXIOM is designed to communicate **precision, trust, and systems-level craft**—with an interface that feels modern and premium without becoming decorative noise.

1. **Clarity over spectacle**
   The brand is earned by readability, structure, and restraint. Motion and visuals serve comprehension.

2. **Trust is a UI feature**
   Security cues, consistency, and performance are part of the design language.

3. **Systems thinking**
   Every component is modular, composable, and token-driven. No one-off styling.

4. **Accessible by default**
   The default experience meets WCAG 2.2 AA; enhancement never breaks access.

5. **Performance is part of the aesthetic**
   Fast interactions feel “premium”. Slow pages feel untrustworthy.

---

## 2. Design tokens

> Token values are expressed as concepts and CSS variables. Exact OKLCH values should be finalized during visual design, then locked.

### 2.1 Color system (OKLCH-first)

**Semantic tokens (required)**
- `--bg` / `--fg`
- `--muted` / `--muted-fg`
- `--card` / `--card-fg`
- `--border`
- `--primary` / `--primary-fg`
- `--accent` / `--accent-fg`
- `--danger` / `--danger-fg`
- `--success` / `--success-fg`
- `--warning` / `--warning-fg`
- `--focus-ring`

**Brand intent**
- Primary: deep, trustworthy “systems” tone (navy/graphite family)
- Accent: high-signal highlight for CTAs and key UI (teal/cyan family)
- Secondary accent: restrained warm highlight for emphasis (amber family)

**Theme support**
- Light + Dark are mandatory.
- Default theme must follow `prefers-color-scheme`.

### 2.2 Typography

**Font families**
- Sans: modern grotesk (e.g., Inter / Geist / system UI)
- Mono: engineering accent (e.g., Geist Mono / JetBrains Mono)

**Scale (suggested)**
- Display: 48–64
- H1: 40–48
- H2: 30–36
- H3: 24–28
- Body: 16–18
- Small: 14
- Micro: 12

**Rules**
- Use a consistent max line length: 65–80 characters for long-form content.
- Headings always have generous whitespace. Avoid “dense walls of text”.

### 2.3 Spacing & layout

- Base unit: **4px**
- Common spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
- Container widths:
  - `sm`: 640
  - `md`: 768
  - `lg`: 1024
  - `xl`: 1280
  - `2xl`: 1440

**Grid**
- 12-column grid on desktop
- 4-column grid on mobile
- Gutters: 16 (mobile), 24 (desktop)

### 2.4 Radius

- `--radius-sm`: 10
- `--radius-md`: 14
- `--radius-lg`: 18
- `--radius-xl`: 24

> Use one radius scale consistently. Avoid mixing square + highly-rounded styles in the same surface.

### 2.5 Elevation & shadow

- Shadows are subtle and primarily used for floating layers (menus, dialogs).
- Prefer borders + background contrast over heavy shadows.

### 2.6 Motion

**Durations**
- fast: 120–160ms
- base: 200–260ms
- slow: 320–420ms

**Easing**
- Default: cubic-bezier that feels “tight” (avoid bouncy by default)
- Reduced motion: disable parallax and scroll-bound transforms

---

## 3. Layout patterns

### 3.1 Page anatomy
- Sticky header (blur + adaptive contrast)
- Main content
- Contextual CTA banner (on high-intent pages)
- Footer (legal + navigation + newsletter)

### 3.2 Section pattern
Each section should be one of:
- `Section: Narrative` (headline + supporting copy + visual)
- `Section: Grid` (3–6 cards)
- `Section: Proof` (logos, stats, testimonials)
- `Section: CTA` (single purpose)

Rules:
- Never put more than **two different interaction types** in one section.
- Maintain predictable spacing between sections (64–96 desktop, 40–64 mobile).

---

## 4. Component standards

### 4.1 Primitives (foundation)
- Button
- Link
- Input
- Textarea
- Select
- Checkbox / Radio
- Switch
- Badge
- Card / Surface
- Tooltip
- Popover
- Dialog
- Drawer (mobile nav)
- Tabs
- Accordion
- Toast (non-blocking feedback)
- Skeleton (loading)

### 4.2 Marketing modules (composed)
- Hero
- Proof Strip (logos/stats)
- Feature Grid
- Narrative Split
- Case Study Card + Grid
- Testimonial Card + Wall
- FAQ Accordion
- Pricing Table (optional)
- Newsletter Signup
- Contact Form
- Article Layout (with TOC support)

### 4.3 Component rules
- All components must:
  - use semantic tokens (no raw hex)
  - include hover + active + focus-visible states
  - support keyboard navigation
  - have predictable disabled states
- Icon-only buttons require accessible names (`aria-label`).

---

## 5. Interaction patterns

### 5.1 Hover / focus / press
- Hover: subtle lift or background tint (no large transforms)
- Focus-visible: high-contrast ring using `--focus-ring`
- Pressed: reduce elevation and slightly darken background

### 5.2 Forms
- Inline validation with specific, constructive messages.
- Error text is paired with the field and announced to screen readers.
- Success states should confirm next steps.

### 5.3 Navigation
- Header links: clear active state
- Mobile nav: drawer with large targets and clear hierarchy
- Breadcrumbs on deep content pages (Resources)

### 5.4 Motion usage
- Use motion to:
  - transition between section states
  - animate counters (where meaningful)
  - reveal content as the user scrolls (subtle)
- Avoid:
  - long scroll-jacking sequences
  - motion that causes layout shift

---

## 6. Accessibility and inclusivity

AXIOM treats accessibility as a quality bar, not a compliance afterthought.

- **WCAG 2.2 AA baseline**
- **Target sizes:** minimum 24×24 CSS pixels; prefer 44×44 when possible
- **Contrast:** AA for body text
- **Keyboard:** everything operable via keyboard, with visible focus order
- **Reduced motion:** honor `prefers-reduced-motion`

---

## 7. Content design guidelines

### 7.1 Voice & tone
- Confident, precise, calm.
- Avoid hype words unless backed by proof.
- Prefer verbs that imply control and reliability: “govern, orchestrate, secure, automate, measure.”

### 7.2 Copy structure
Use:
- **Headline:** outcome-driven
- **Subhead:** who it’s for and what it enables
- **Proof:** metric, testimonial, certification, or case study

---

## 8. Implementation rules for coding agents

1. **Token discipline**
   - Never introduce ad-hoc colors, radii, shadows, or spacing.
   - Extend tokens intentionally if needed.

2. **Component-first**
   - Prefer existing primitives and modules before creating new ones.
   - New modules must be composed from primitives.

3. **Performance guardrails**
   - No animation that creates CLS.
   - Avoid heavy third-party scripts and large client bundles.

4. **Accessibility guardrails**
   - All interactive elements must have accessible names and focus states.
   - No keyboard traps; dialogs must manage focus correctly.

5. **Responsiveness**
   - Mobile-first layouts, no horizontal scroll.
   - Ensure CTA accessibility on mobile.

---

## Appendix — Recommended token mapping (example)

> Final values are to be defined during visual design and then locked.

- `--primary`: brand “systems” tone
- `--accent`: CTA highlight
- `--bg`: base background
- `--card`: elevated surface
- `--border`: hairline borders
- `--focus-ring`: accessible focus outline

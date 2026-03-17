# Vantus System Design System (AXIOM)
**Codename:** AXIOM
**Scope:** Public website UI (marketing + resources + careers)
**Status:** Production
**Last Updated:** 2026-05-20

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

All tokens are defined in `app/globals.css` using OKLCH color space and exposed via CSS variables and Tailwind v4 `@theme`.

### 2.1 Color system (OKLCH)

**Semantic tokens (enforced)**
- `--background` / `--foreground`
- `--muted` / `--muted-foreground`
- `--card` / `--card-foreground`
- `--border`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- `--destructive` / `--destructive-foreground`
- `--input`, `--ring`

**Signal Tokens (Strict Usage)**
Used for status indicators, alerts, and feedback.
- `--signal-success`: Operational, Good, Safe (Emerald-ish)
- `--signal-warning`: Attention needed, Low disk, Slow (Amber-ish)
- `--signal-danger`: Critical, Error, Down (Red-ish)
- `--signal-info`: Neutral info, System status (Blue-ish)

**Brand intent**
- Primary: Deep, trustworthy “systems” tone.
- Accent: High-signal highlight.
- Surfaces: `oklch(1 0 0)` (White) in light mode, deep dark `oklch(0.13 0.01 261)` in dark mode.

**Theme support**
- Light + Dark are mandatory.
- Default theme must follow `prefers-color-scheme`.

### 2.2 Typography

**Font families**
- Sans: Inter (System UI fallback)
- Mono: Geist Mono / JetBrains Mono (Engineering accent)

**Scale**
- Follows Tailwind default scale but with tighter tracking for headings (`tracking-tight`).

### 2.3 Spacing & Layout

- Base unit: **4px** (Tailwind default)
- Container: Fluid with fixed padding steps at breakpoints.
- Max Width: `1400px` standard container.

### 2.4 Radius

- `--radius`: `0.75rem` (12px) - Standard for cards and buttons.
- `--radius-md`: `calc(var(--radius) - 2px)`
- `--radius-sm`: `calc(var(--radius) - 4px)`

### 2.5 Micro-Interactions

Defined in `app/globals.css` as utility classes:
- `.btn-precision`: Subtle lift and shine on hover.
- `.card-precision`: Border shimmer and lift on hover.
- `.link-precision`: Underline expansion.
- `.input-precision`: Focus beam effect.

---

## 3. Component standards

### 3.1 Primitives (Foundation)
All UI elements must use the primitives in `components/ui/`.
- **Button**: Use `variant` prop (`default`, `secondary`, `outline`, `ghost`, `link`, `destructive`, `premium`).
- **Badge**: Use `variant` prop (`default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`).
- **Card**: Always use `<Card>`, `<CardHeader>`, etc., or apply `.card-precision` if building a custom clickable surface.

### 3.2 Rules
- **No Raw Colors**: Never use `text-blue-500`, `bg-red-100`. Use `text-primary`, `bg-signal-danger/10`, etc.
- **No Bespoke Buttons**: Never style a raw `<button>`. Use `<Button>`.
- **Consistency**: Layouts must use the standard container and section spacing.

---

## 4. Implementation rules for coding agents

1. **Token discipline**
   - **STRICT:** Do not use Tailwind palette colors (e.g., `emerald`, `amber`, `blue`, `red`) directly.
   - Use `signal-*` tokens for all status colors.

2. **Component-first**
   - Prefer existing primitives and modules before creating new ones.

3. **Performance guardrails**
   - No animation that creates CLS.

4. **Accessibility guardrails**
   - All interactive elements must have accessible names and focus states.

---

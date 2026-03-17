# Vantus Theme System (Vantus Systems Edition)

## Overview
The Vantus Theme System has been updated to align with the Vantus Systems brand identity. This document outlines the core design tokens, typography, and component styling principles used in the application.

## Design Tokens

### Colors
The color system uses a semantic naming convention mapped to HSL values in `globals.css`.

| Token | Description | Value (HSL) | Usage |
|-------|-------------|-------------|-------|
| `--background` | Main background color | `0 0% 100%` | Page background |
| `--foreground` | Main text color | `220 15% 10%` | Body text, Headings |
| `--primary` | Primary brand color | `220 15% 10%` | Primary buttons, active states |
| `--primary-foreground` | Text on primary color | `0 0% 98%` | Button text |
| `--secondary` | Secondary brand color | `220 15% 96%` | Secondary buttons, backgrounds |
| `--secondary-foreground` | Text on secondary color | `220 15% 10%` | Secondary button text |
| `--muted` | Muted background | `220 15% 96%` | Muted sections |
| `--muted-foreground` | Muted text | `220 15% 40%` | Subtitles, help text |
| `--accent` | Accent color | `220 15% 96%` | Hover states, highlights |
| `--accent-foreground` | Text on accent color | `220 15% 10%` | Accent text |
| `--destructive` | Destructive action color | `0 84.2% 60.2%` | Delete buttons, errors |
| `--destructive-foreground` | Text on destructive color | `0 0% 98%` | Destructive button text |
| `--border` | Border color | `220 15% 90%` | Dividers, inputs |
| `--input` | Input border color | `220 15% 90%` | Form inputs |
| `--ring` | Focus ring color | `220 15% 10%` | Focus states |
| `--radius` | Border radius | `0.75rem` | Components, Cards |

### Typography
The system uses the default font stack with careful weight distribution.

- **Headings**: Bold/Semibold, tight tracking.
- **Body**: Regular/Medium, relaxed leading.
- **Monospace**: Used for code snippets and technical data.

### Spacing & Layout
- **Container**: Centered with max-width.
- **Grid system**: Flexible grid using CSS Grid and Flexbox.
- **Spacing scale**: Tailwind's default spacing scale.

## Component Styling

### Buttons
Buttons (`.btn-precision`) feature a custom micro-interaction:
- `relative overflow-hidden`
- `transition-transform duration-150 ease-precision`
- Hover state: `transform: translateY(-2px)`

### Animations
Custom keyframes and utilities are defined in `globals.css`:
- `animate-accordion-down`: Expands accordion content.
- `animate-accordion-up`: Collapses accordion content.
- `ease-precision`: Custom cubic-bezier timing function `cubic-bezier(0.22, 1, 0.36, 1)`.

## Dark Mode
Dark mode is supported via the `.dark` class, inverting the color tokens:
- `--background`: `224 71% 4%`
- `--foreground`: `213 31% 91%`
- `--primary`: `210 40% 98%`
- `--primary-foreground`: `222.2 47.4% 1.2%`

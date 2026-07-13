# Design System reference

## Fonts

Cormorant Garamond (serif) · DM Sans (sans) · Space Mono (mono alt) · JetBrains Mono (mono) — loaded from Google Fonts in `index.html`.

## Design Tokens

Defined in `src/tokens.js`. Key tokens (updated April 2026):

| Token     | Dark                     | Light              |
| --------- | ------------------------ | ------------------ |
| `bg`      | `#0c0c0f`                | `#f4f4f5`          |
| `fg`      | `#fafafa`                | `#18181b`          |
| `fgSec`   | `#d4d4d8`                | `#3f3f46`          |
| `fgMute`  | `#71717a`                | `#71717a`          |
| `gold`    | `#36a7f5` (blue)         | `#1a7ac4` (blue)   |
| `goldHov` | `#60bcff`                | `#2d8fd8`          |
| `mono`    | `#22c55e` (green)        | `#16a34a` (green)  |
| `surface` | `#18181b`                | `#ffffff`          |
| `border`  | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |

**Accent convention:** `gold`/`goldHov` = blue — used for all actionable links. `mono` = green — used only for decorative terminal elements (`~/`, cursor, about-page keys). Tags and labels use `fgMute` (neutral zinc).

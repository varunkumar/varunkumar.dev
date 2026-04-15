# Coming Soon Page — varunkumar.dev

**Date:** 2026-04-16  
**Status:** Approved

---

## Overview

A bold, modern coming soon page for varunkumar.dev. Single static HTML file deployed to Cloudflare Pages. Supports dark (default) and light themes with a toggle, persisted via localStorage.

---

## Content

### Identity
- **Name:** Varunkumar Nagarajan
- **Taglines (rotating or stacked):**
  - Software Engineer · Engineering Leader · Builder
  - Wildlife Photographer

### Coming Soon Copy
Short, confident: _"Something's coming."_ or _"Building something new."_

### Social Links
| Label | Handle / URL |
|---|---|
| GitHub | github.com/varunkumar |
| Twitter/X | @varunkumar |
| Instagram | @varunkumar (wildlife photography) |
| LinkedIn | linkedin.com/in/varunkumar.nagarajan |
| Blog | blog.varunkumar.dev |

---

## Visual Design

### Layout
- Full-viewport, vertically centered single column
- Theme toggle button fixed top-right
- Name: large, bold (~clamp 56px–100px)
- Tagline: muted, smaller weight
- "Coming Soon" label: accent-colored small caps or letter-spaced text above or below tagline
- Social row: icon + label links, subtle hover underline

### Color System (CSS custom properties)

**Dark theme (default):**
- `--bg`: `#0d0d0d`
- `--text`: `#f0f0f0`
- `--muted`: `#888888`
- `--accent`: `#f59e0b` (amber)
- `--border`: `rgba(255,255,255,0.08)`

**Light theme:**
- `--bg`: `#fafafa`
- `--text`: `#0d0d0d`
- `--muted`: `#666666`
- `--accent`: `#d97706` (amber, slightly darker for contrast on white)
- `--border`: `rgba(0,0,0,0.08)`

### Typography
- Heading font: `Inter` or system-ui — semibold/black weight
- Body/links: same family, regular weight
- Monospace accents: `JetBrains Mono` or `ui-monospace` for the coming soon label

### Theme Toggle
- Sun/moon SVG icon, top-right corner
- Clicking switches `data-theme` on `<html>`
- Preference stored in `localStorage`
- Defaults to dark

---

## Tech Stack

- Pure HTML + CSS + vanilla JS — no build step
- CSS custom properties for theming
- Google Fonts (Inter) via `<link>` — or system font stack as fallback
- No external JS dependencies

---

## Deployment

- File: `public/index.html`
- Cloudflare Pages serves `public/` as document root (matching the slides project pattern)
- No wrangler config needed for pure static — or reuse wrangler.jsonc pattern from slides project

---

## Out of Scope

- Email capture / waitlist
- Countdown timer
- Any page beyond index.html

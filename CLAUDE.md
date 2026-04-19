# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Design System

The visual design lives at **[claude.ai/design — varunkumar.dev project](https://api.anthropic.com/v1/design/h/3EhV9wl8dNT84pSYAU9EuA?open_file=index.html)**. When the user updates the design there and exports a handoff bundle, fetch that URL, decompress the `.tar.gz`, read `project/index.html` and `chats/chat1.md`, then port the relevant changes into the React codebase.

## Overview

Personal site for Varunkumar Nagarajan at `varunkumar.dev`. Built with React + Vite. Deployed to Cloudflare Pages — Vite builds `src/` to `dist/`, which Cloudflare Pages serves from the `main` branch.

## Local Development

```bash
npm install        # first time only
npm run dev        # starts Vite dev server at http://localhost:5173
```

## Build & Deploy

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

Cloudflare Pages runs `npm run build` automatically on push to `main`. Output directory is `dist/`.

## Code Quality — run before every commit

```bash
npm run lint:fix   # ESLint: fix auto-fixable issues
npm run format     # Prettier: format all files in src/
```

Or in one shot:

```bash
npm run lint:fix && npm run format
```

To check without writing:

```bash
npm run lint          # ESLint (report only)
npm run format:check  # Prettier (report only)
```

ESLint config: `eslint.config.js` (flat config, ESLint 9).  
Prettier config: `.prettierrc`.

## Architecture

- **Entry:** `index.html` → `src/main.jsx` → `src/App.jsx`
- **Routing:** URL-based SPA using `window.history.pushState`. `App.jsx` holds `active` page state; deep-links (`/writing`, `/projects`, `/about`) work on load. Browser back/forward handled via `popstate`.
- **Theming:** `src/tokens.js` exports `DARK`, `LIGHT`, and a mutable `T` object. `App.jsx` toggles theme by calling `Object.assign(T, isDark ? DARK : LIGHT)` before re-render. Theme stored in `localStorage('vk_theme')`. Body background set imperatively to avoid flash-of-wrong-theme.
- **Inline styles:** All component styles are inline. No CSS-in-JS library, no CSS modules. Global animations, resets, and contrib-img filters live in `index.html`.
- **Static assets:** `public/favicon.svg`. `public/images/` holds wildlife photos. Vite copies `public/` to `dist/` as-is.

## Fonts

Cormorant Garamond (serif) · DM Sans (sans) · Space Mono (mono alt) · JetBrains Mono (mono) — loaded from Google Fonts in `index.html`.

## Design Tokens

Defined in `src/tokens.js`. Key tokens (updated April 2026):

| Token | Dark | Light |
|---|---|---|
| `bg` | `#0c0c0f` | `#f4f4f5` |
| `fg` | `#fafafa` | `#18181b` |
| `fgSec` | `#d4d4d8` | `#3f3f46` |
| `fgMute` | `#71717a` | `#71717a` |
| `gold` | `#36a7f5` (blue) | `#1a7ac4` (blue) |
| `goldHov` | `#60bcff` | `#2d8fd8` |
| `mono` | `#22c55e` (green) | `#16a34a` (green) |
| `surface` | `#18181b` | `#ffffff` |
| `border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |

**Accent convention:** `gold`/`goldHov` = blue — used for all actionable links. `mono` = green — used only for decorative terminal elements (`~/`, cursor, about-page keys). Tags and labels use `fgMute` (neutral zinc).

## Integrations

- **GitHub contributions:** Image from `https://ghchart.rshah.org/22c55e/varunkumar` — public, no auth. Fetched fresh on each page load.
- **GitHub projects:** Public API `https://api.github.com/users/varunkumar/repos?sort=updated&per_page=20` — no auth, 60 req/hr rate limit.
- **Instagram:** Placeholder grid until an Instagram Basic Display API OAuth token is connected. See `src/data/instagram.js` and `src/components/InstagramSection.jsx`.

## Key Files

| File | Purpose |
|---|---|
| `src/tokens.js` | Theme design tokens (`DARK`, `LIGHT`, mutable `T`) |
| `src/App.jsx` | Root: theme toggle, URL routing, scroll container |
| `src/components/Nav.jsx` | Fixed 64px nav with blur, mobile hamburger, theme toggle |
| `src/components/ContribGraph.jsx` | GitHub heatmap + walking pixel-art mascot |
| `src/components/BrewingLabel.jsx` | Cycling verb label (`// brewing`, `// shipping`, …) |
| `src/pages/HomePage.jsx` | Hero, writing preview, contributions, projects, Instagram, photo CTA |
| `src/pages/WritingPage.jsx` | Full writing list |
| `src/pages/ProjectsPage.jsx` | Full GitHub projects grid |
| `src/pages/AboutPage.jsx` | About key-value section |
| `src/hooks/useTypewriter.js` | Character-by-character reveal hook |
| `src/hooks/useGitHub.js` | GitHub repo fetch + filter hook |
| `src/data/posts.js` | Static blog post array |
| `src/data/instagram.js` | Instagram placeholder tile array |

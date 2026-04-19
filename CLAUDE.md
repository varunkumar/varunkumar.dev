# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

## Architecture

- **Entry:** `index.html` → `src/main.jsx` → `src/App.jsx`
- **Routing:** In-memory SPA (no URL changes). `App.jsx` holds `active` page state; `localStorage` persists between sessions.
- **Theming:** `src/tokens.js` exports `DARK`, `LIGHT`, and a mutable `T` object. `App.jsx` toggles theme by calling `Object.assign(T, isDark ? DARK : LIGHT)` before re-render. Theme is stored in `localStorage('vk_theme')`. Body background is set imperatively to avoid flash-of-wrong-theme.
- **Inline styles:** All component styles are inline (matching the design prototype). No CSS-in-JS library, no CSS modules. Global animations and resets live in `index.html`.
- **Static assets:** `public/favicon.svg` — amber sketch portrait. Vite copies `public/` to `dist/` as-is.

## Fonts

Cormorant Garamond (serif) · DM Sans (sans) · JetBrains Mono (mono) — loaded from Google Fonts in `index.html`.

## Design Tokens

Defined in `src/tokens.js`. Key tokens:

| Token | Dark | Light |
|---|---|---|
| `bg` | `#0d0d0b` | `#f5f2ec` |
| `fg` | `#e8e4dc` | `#1a1814` |
| `fgSec` | `#9a9288` | `#4a4640` |
| `fgMute` | `#555048` | `#9a9690` |
| `gold` | `#d4890a` | `#a86a00` |
| `mono` | `#6a9e68` | `#2d7a2b` |
| `surface` | `#151512` | `#edeae3` |
| `border` | `#2a2820` | `#d2cfc7` |

## Integrations

- **GitHub contributions:** Image from `https://ghchart.rshah.org/{color}/varunkumar` — public, no auth.
- **GitHub projects:** Public API `https://api.github.com/users/varunkumar/repos?sort=updated&per_page=20` — no auth, 60 req/hr rate limit.
- **Instagram:** Placeholder grid until an Instagram Basic Display API OAuth token is connected. See `src/data/instagram.js` for placeholder data and `src/components/InstagramSection.jsx` for wiring notes.

## Key Files

| File | Purpose |
|---|---|
| `src/tokens.js` | Theme design tokens |
| `src/App.jsx` | Root: theme toggle, page routing, scroll container |
| `src/components/Nav.jsx` | Fixed nav with blur, mobile hamburger, theme toggle |
| `src/pages/HomePage.jsx` | Home: hero, writing preview, contributions, projects, Instagram, photo CTA |
| `src/pages/WritingPage.jsx` | Full writing list |
| `src/pages/ProjectsPage.jsx` | Full GitHub projects grid |
| `src/pages/AboutPage.jsx` | About key-value section |
| `src/hooks/useTypewriter.js` | Character-by-character reveal hook |
| `src/hooks/useGitHub.js` | GitHub repo fetch + filter hook |
| `src/data/posts.js` | Static blog post array |
| `src/data/instagram.js` | Instagram placeholder tile array |

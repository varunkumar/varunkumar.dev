# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal site for Varunkumar Nagarajan at `varunkumar.dev`. Currently a coming soon page. Deployed to Cloudflare Pages — `public/` is the document root, no build step.

## Local Development

```bash
cd public
python3 -m http.server 8080
# open http://localhost:8080
```

No package manager, no build step, no test suite.

## Deployment

Cloudflare Pages serves `public/` directly from the `main` branch. Push to `main` to deploy.

## Architecture

Single file: `public/index.html` — all CSS and JS are inlined. No framework, no bundler.

- **Theming:** CSS custom properties on `:root[data-theme="dark|light"]`. Theme is initialised in an inline `<script>` in `<head>` (before paint) to avoid flash-of-wrong-theme, with `localStorage` persistence and `prefers-color-scheme` fallback. The toggle event listener sits separately at the bottom of `<body>`.
- **Fonts:** Inter + JetBrains Mono loaded from Google Fonts.
- **Favicon:** `public/favicon.svg` — amber sketch portrait of Varunkumar on a dark circle background.

## Design Tokens

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#0d0d0d` | `#fafafa` |
| `--text` | `#f0f0f0` | `#0d0d0d` |
| `--muted` | `#888888` | `#666666` |
| `--accent` | `#f59e0b` | `#d97706` |
| `--border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` |

# varunkumar.dev

[![Cloudflare Pages](https://img.shields.io/github/check-runs/varunkumar/varunkumar.dev/main?logo=cloudflare&logoColor=white&label=Cloudflare%20Pages)](https://github.com/varunkumar/varunkumar.dev/commits/main)

Personal site for [Varunkumar Nagarajan](https://varunkumar.dev) — Senior VP of Technology · Engineering Leader · Wildlife Photographer.

Built with **React + Vite**, deployed to **Cloudflare Pages** (auto-deploy on push to `main`).

The badge tracks the `Workers Builds: website` check on `main`. That is the Pages/Workers build of `npm run build` (Vitest + Playwright + Vite). Green means the latest `main` build passed and published `dist/`. Red or pending is the current build, not a static "deployed" label.

## Stack

- React 18 + Vite 8
- Inline styles, no CSS framework, no CSS-in-JS
- Google Fonts: Cormorant Garamond · DM Sans · Space Mono · JetBrains Mono
- Cloudflare Pages for hosting

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & Deploy

```bash
npm run build      # Vitest + Playwright smoke, then Vite write to dist/
npm run build:vite # Vite only
npm run preview    # preview production build locally
```

Push to `main` → Cloudflare Pages runs `npm run build` and serves `dist/`. A failing test fails the Pages build.

There is no GitHub Actions workflow. The same gate runs locally on every commit (`lint-staged`, then `npm run build`). Skip once with `SKIP_SIMPLE_GIT_HOOKS=1 git commit`.

## Tests

```bash
npm test           # Vitest (routing, tokens, hooks)
npm run test:e2e   # Playwright smoke of /, /projects, /about
```

## Code Quality

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier (write)
npm run format:check  # Prettier (check only)
```

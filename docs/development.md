# Development

## Local Development

```bash
npm install        # first time only
npm run dev        # starts Vite dev server at http://localhost:5173
```

## Build & Deploy

```bash
npm run build      # Vitest + Playwright smoke, then Vite write to dist/
npm run build:vite # Vite only (used by Playwright; skip if you want the full gate)
npm run preview    # preview the production build locally
```

Cloudflare Pages runs `npm run build` on push to `main`, so the same unit and route smoke tests run in the Pages build before `dist/` is published.

## Tests

```bash
npm test           # Vitest unit suite (routing, tokens, hooks)
npm run test:watch # Vitest in watch mode
npm run test:e2e   # Playwright smoke over /, /projects, /about
```

`test:e2e` installs Chromium if needed, builds with `build:vite`, serves `dist/` on port 4173, and walks every SPA route plus in-app nav.

## Code Quality

```bash
npm run lint:fix   # ESLint: fix auto-fixable issues
npm run format     # Prettier: format all files in src/ and e2e/
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

A pre-commit hook runs `lint-staged` (eslint + prettier on staged files), then `npm run build` (Vitest + Playwright + Vite). Skip once with `SKIP_SIMPLE_GIT_HOOKS=1 git commit`.

ESLint config: `eslint.config.js` (flat config, ESLint 9).
Prettier config: `.prettierrc`.

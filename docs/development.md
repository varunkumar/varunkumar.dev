# Development

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

## Code Quality

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

A pre-commit hook (`simple-git-hooks` + `lint-staged`) already runs `eslint --fix` and `prettier --write` on staged files automatically, so this is a safety net rather than a strict requirement.

ESLint config: `eslint.config.js` (flat config, ESLint 9).
Prettier config: `.prettierrc`.

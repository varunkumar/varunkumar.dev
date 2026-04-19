# varunkumar.dev

Personal site for [Varunkumar Nagarajan](https://varunkumar.dev) — Senior VP of Technology · Engineering Leader · Wildlife Photographer.

Built with **React + Vite**, deployed to **Cloudflare Pages** (auto-deploy on push to `main`).

## Stack

- React 18 + Vite 6
- Inline styles — no CSS framework, no CSS-in-JS
- Google Fonts: Cormorant Garamond · DM Sans · Space Mono · JetBrains Mono
- Cloudflare Pages for hosting

## Local Development

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & Deploy

```bash
npm run build     # outputs to dist/
npm run preview   # preview production build locally
```

Push to `main` → Cloudflare Pages runs `npm run build` and serves `dist/`.

## Code Quality

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier (write)
npm run format:check  # Prettier (check only)
```

Run both before committing:

```bash
npm run lint:fix && npm run format
```

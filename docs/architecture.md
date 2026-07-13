# Architecture

- **Entry:** `index.html` → `src/main.jsx` → `src/App.jsx`
- **Routing:** URL-based SPA using `window.history.pushState`. `App.jsx` holds `active` page state; deep-links (`/writing`, `/projects`, `/about`) work on load. Browser back/forward handled via `popstate`.
- **Theming:** `src/tokens.js` exports `DARK`, `LIGHT`, and a mutable `T` object. `App.jsx` toggles theme by calling `Object.assign(T, isDark ? DARK : LIGHT)` before re-render. Theme stored in `localStorage('vk_theme')`. Body background set imperatively to avoid flash-of-wrong-theme.
- **Inline styles:** All component styles are inline. No CSS-in-JS library, no CSS modules. Global animations, resets, and contrib-img filters live in `index.html`.
- **Static assets:** `public/favicon.svg`. `public/images/` holds wildlife photos. Vite copies `public/` to `dist/` as-is.

## Key Files

| File                              | Purpose                                                              |
| --------------------------------- | -------------------------------------------------------------------- |
| `src/tokens.js`                   | Theme design tokens (`DARK`, `LIGHT`, mutable `T`)                   |
| `src/App.jsx`                     | Root: theme toggle, URL routing, scroll container                    |
| `src/components/Nav.jsx`          | Fixed 64px nav with blur, mobile hamburger, theme toggle             |
| `src/components/ContribGraph.jsx` | GitHub heatmap + walking pixel-art mascot                            |
| `src/components/BrewingLabel.jsx` | Cycling verb label (`// brewing`, `// shipping`, …)                  |
| `src/pages/HomePage.jsx`          | Hero, writing preview, contributions, projects, Instagram, photo CTA |
| `src/pages/WritingPage.jsx`       | Full writing list                                                    |
| `src/pages/ProjectsPage.jsx`      | Full GitHub projects grid                                            |
| `src/pages/AboutPage.jsx`         | About key-value section                                              |
| `src/hooks/useTypewriter.js`      | Character-by-character reveal hook                                   |
| `src/hooks/useGitHub.js`          | GitHub repo fetch + filter hook                                      |
| `src/data/posts.js`               | Static blog post array                                               |
| `src/data/instagram.js`           | Instagram placeholder tile array                                     |

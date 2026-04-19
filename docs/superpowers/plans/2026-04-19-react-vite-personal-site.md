# React + Vite Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate varunkumar.dev from a static coming-soon page to a full React + Vite SPA featuring hero, writing, GitHub contributions, GitHub projects, Instagram placeholder, and photography CTA sections.

**Architecture:** Vite builds `src/` into `dist/`; Cloudflare Pages serves `dist/`. The app is a client-side SPA with in-memory routing (no URL changes — `localStorage` persists the active page). Design tokens live in a single `tokens.js` file and are passed via a mutable `T` object (matching the prototype exactly). Inline styles throughout — no CSS-in-JS library needed.

**Tech Stack:** React 18, Vite 6, JetBrains Mono + DM Sans + Cormorant Garamond (Google Fonts), GitHub public API, ghchart.rshah.org (contributions image)

---

## File Map

| File | Responsibility |
|---|---|
| `package.json` | npm scripts, dependencies |
| `vite.config.js` | Vite configuration |
| `index.html` | Vite HTML entry point |
| `wrangler.jsonc` | Cloudflare Pages — update `directory` to `dist` |
| `CLAUDE.md` | Update with new architecture / dev commands |
| `public/favicon.svg` | Static asset (unchanged, Vite copies as-is) |
| `src/main.jsx` | React root mount |
| `src/tokens.js` | DARK/LIGHT theme token objects + mutable `T` |
| `src/App.jsx` | Theme state, page routing, scroll-root div |
| `src/components/Cursor.jsx` | Blinking block cursor |
| `src/components/Divider.jsx` | 1px horizontal rule |
| `src/components/SectionLabel.jsx` | Monospace `// label` section header |
| `src/components/SocialRow.jsx` | Social link pills (GitHub/Twitter/LinkedIn/Instagram/Photography) |
| `src/components/BrewingLabel.jsx` | Cycling verb label (`// brewing ▌`) |
| `src/components/ContribGraph.jsx` | GitHub contributions heatmap via ghchart.rshah.org |
| `src/components/InstagramSection.jsx` | 3×2 placeholder grid linking to @varunkumar |
| `src/components/ProjectCard.jsx` | Single GitHub repo card with hover state |
| `src/components/PhotoCTA.jsx` | Aganadhiram photography call-to-action block |
| `src/components/Nav.jsx` | Fixed top nav: wordmark, page links, theme toggle, mobile hamburger |
| `src/hooks/useTypewriter.js` | Character-by-character text reveal hook |
| `src/hooks/useGitHub.js` | Fetches public repos from GitHub API, filters/sorts |
| `src/pages/HomePage.jsx` | Hero + SocialRow + Writing preview + ContribGraph + Projects + Instagram + PhotoCTA + Footer |
| `src/pages/WritingPage.jsx` | Full writing list with all posts |
| `src/pages/ProjectsPage.jsx` | Full GitHub projects grid |
| `src/pages/AboutPage.jsx` | Key-value about section |
| `src/data/posts.js` | Static array of blog post objects |
| `src/data/instagram.js` | Static array of IG placeholder tile definitions |

---

## Task 1: Vite + React project scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "varunkumar-dev",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.3.2"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 3: Create `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
```

- [ ] **Step 4: Create `index.html`** (Vite entry — replaces the old static `public/index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Varunkumar Nagarajan</title>
  <meta name="description" content="Software Engineer · Engineering Leader · Wildlife Photographer." />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { font-size: 16px; }
    body {
      background: #0d0d0b;
      color: #e8e4dc;
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
    }
    #root { min-height: 100vh; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #0d0d0b; }
    ::-webkit-scrollbar-thumb { background: #2a2820; }
    a { color: inherit; text-decoration: none; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.45s cubic-bezier(0.4,0,0.2,1) both; }
    .fade-up-1 { animation-delay: 0.04s; }
    .fade-up-2 { animation-delay: 0.12s; }
    .fade-up-3 { animation-delay: 0.22s; }
    .fade-up-4 { animation-delay: 0.32s; }
    .fade-up-5 { animation-delay: 0.42s; }
    .fade-up-6 { animation-delay: 0.52s; }

    @media (max-width: 599px) {
      .page-pad { padding-left: 20px !important; padding-right: 20px !important; }
    }

    .contrib-img { width: 100%; border-radius: 4px; opacity: 0.85; }
    .contrib-img.dark  { filter: invert(1) hue-rotate(180deg) brightness(0.75) sepia(0.4); }
    .contrib-img.light { filter: sepia(0.2) saturate(1.4) brightness(0.92); }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 5: Create `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts on `http://localhost:5173`. Browser shows blank page (no App yet). No console errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.jsx
git commit -m "feat: add Vite + React scaffold"
```

---

## Task 2: Update Cloudflare config and CLAUDE.md

**Files:**
- Modify: `wrangler.jsonc`
- Modify: `CLAUDE.md`
- Delete: `public/index.html` (replaced by Vite build output in `dist/`)

- [ ] **Step 1: Update `wrangler.jsonc` — point assets to `dist`**

Replace the full file with:

```jsonc
{
  "name": "website",
  "compatibility_date": "2026-04-16",
  "assets": {
    "directory": "dist"
  }
}
```

- [ ] **Step 2: Delete old static `public/index.html`**

The old coming-soon page is replaced by the Vite build. Keep `public/favicon.svg` — Vite copies `public/` assets verbatim to `dist/`.

```bash
rm public/index.html
```

- [ ] **Step 3: Rewrite `CLAUDE.md`**

Replace with:

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
git add wrangler.jsonc CLAUDE.md
git rm public/index.html
git commit -m "chore: update Cloudflare config and CLAUDE.md for Vite build"
```

---

## Task 3: Design tokens

**Files:**
- Create: `src/tokens.js`

- [ ] **Step 1: Create `src/tokens.js`**

```js
export const DARK = {
  bg:      '#0d0d0b',
  surface: '#151512',
  raised:  '#1e1d18',
  border:  '#2a2820',
  borderLt:'#3a3830',
  fg:      '#e8e4dc',
  fgSec:   '#9a9288',
  fgMute:  '#555048',
  gold:    '#d4890a',
  goldHov: '#e8a020',
  mono:    '#6a9e68',
  monoDk:  '#3a6e38',
  isDark:  true,
};

export const LIGHT = {
  bg:      '#f5f2ec',
  surface: '#edeae3',
  raised:  '#e4e1d9',
  border:  '#d2cfc7',
  borderLt:'#b8b5ad',
  fg:      '#1a1814',
  fgSec:   '#4a4640',
  fgMute:  '#9a9690',
  gold:    '#a86a00',
  goldHov: '#c07800',
  mono:    '#2d7a2b',
  monoDk:  '#1a5a18',
  isDark:  false,
};

// Mutable reference — App.jsx calls Object.assign(T, DARK|LIGHT) before re-render.
// All components read from T directly (no prop drilling, no context).
export const T = { ...DARK };

export const sans  = "'DM Sans', sans-serif";
export const serif = "'Cormorant Garamond', serif";
export const mono  = "'JetBrains Mono', monospace";
```

- [ ] **Step 2: Commit**

```bash
git add src/tokens.js
git commit -m "feat: add design tokens"
```

---

## Task 4: Utility components (Cursor, Divider, SectionLabel)

**Files:**
- Create: `src/components/Cursor.jsx`
- Create: `src/components/Divider.jsx`
- Create: `src/components/SectionLabel.jsx`

- [ ] **Step 1: Create `src/components/Cursor.jsx`**

Blinking block cursor — used in nav wordmark and loading states.

```jsx
import React from 'react';
import { T, mono } from '../tokens.js';

export default function Cursor() {
  const [on, setOn] = React.useState(true);
  React.useEffect(() => {
    const i = setInterval(() => setOn(p => !p), 540);
    return () => clearInterval(i);
  }, []);
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 13,
      background: on ? T.mono : 'transparent',
      borderRadius: 1, verticalAlign: 'middle',
      transition: 'background 80ms', marginLeft: 2,
    }} />
  );
}
```

- [ ] **Step 2: Create `src/components/Divider.jsx`**

```jsx
import React from 'react';
import { T } from '../tokens.js';

export default function Divider({ mt = 0, mb = 0 }) {
  return <div style={{ height: 1, background: T.border, marginTop: mt, marginBottom: mb }} />;
}
```

- [ ] **Step 3: Create `src/components/SectionLabel.jsx`**

```jsx
import React from 'react';
import { T, mono } from '../tokens.js';

export default function SectionLabel({ children }) {
  return (
    <span style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, letterSpacing: '0.08em' }}>
      // {children}
    </span>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Cursor.jsx src/components/Divider.jsx src/components/SectionLabel.jsx
git commit -m "feat: add Cursor, Divider, SectionLabel utility components"
```

---

## Task 5: Data files

**Files:**
- Create: `src/data/posts.js`
- Create: `src/data/instagram.js`

- [ ] **Step 1: Create `src/data/posts.js`**

```js
export const POSTS = [
  {
    title: 'Why engineering managers should have non-technical hobbies',
    date: 'Mar 2025',
    mins: 7,
    excerpt: 'Wildlife photography taught me patience. Patience made me a better engineering leader.',
    tags: ['leadership', 'thinking'],
  },
  {
    title: 'Building for scale: lessons from a decade of engineering',
    date: 'Nov 2024',
    mins: 8,
    excerpt: 'The patterns I keep returning to after ten years of building teams and products.',
    tags: ['engineering', 'leadership'],
  },
  {
    title: 'Shooting wildlife at 600mm — the physics and the patience',
    date: 'Aug 2024',
    mins: 6,
    excerpt: 'What a 600mm prime teaches you about reaching things that are far away.',
    tags: ['photography', 'craft'],
  },
];
```

- [ ] **Step 2: Create `src/data/instagram.js`**

```js
// Placeholder tiles used until an Instagram Basic Display API access token is wired in.
// To connect real posts: obtain a long-lived token via instagram.com/developers,
// then fetch from https://graph.instagram.com/me/media?fields=id,media_url,permalink&access_token=TOKEN
// and replace this array with the live data.
export const IG_PLACEHOLDERS = [
  { grad: 'linear-gradient(135deg,#1a2e10 0%,#2a4012 55%,rgba(190,110,20,0.5) 100%)', caption: 'Western Ghats · monsoon' },
  { grad: 'linear-gradient(150deg,#100a02,rgba(195,95,18,0.55),#0e1404)',               caption: 'Golden hour · 600mm' },
  { grad: 'linear-gradient(120deg,rgba(38,100,55,0.75),#05100a,#182808)',               caption: 'Forest canopy' },
  { grad: 'linear-gradient(140deg,#12080a,rgba(175,88,15,0.55),#141204)',               caption: 'Spotted deer' },
  { grad: 'linear-gradient(160deg,#0a1803,rgba(50,120,65,0.6),#08100a)',                caption: 'Tree frog · macro' },
  { grad: 'linear-gradient(130deg,rgba(180,100,15,0.45),#100e04,#0e1a08)',              caption: 'Eagle in flight' },
];
```

- [ ] **Step 3: Commit**

```bash
git add src/data/posts.js src/data/instagram.js
git commit -m "feat: add static data files for posts and Instagram placeholders"
```

---

## Task 6: Hooks (useTypewriter, useGitHub)

**Files:**
- Create: `src/hooks/useTypewriter.js`
- Create: `src/hooks/useGitHub.js`

- [ ] **Step 1: Create `src/hooks/useTypewriter.js`**

```js
import { useState, useEffect } from 'react';

export default function useTypewriter(text, speed = 22, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text]);

  return { displayed, done };
}
```

- [ ] **Step 2: Create `src/hooks/useGitHub.js`**

```js
import { useState, useEffect } from 'react';

export default function useGitHub(username = 'varunkumar') {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
      .then(r => r.json())
      .then(data => {
        const filtered = data
          .filter(r => !r.fork && r.description)
          .sort((a, b) =>
            (b.stargazers_count - a.stargazers_count) ||
            (new Date(b.updated_at) - new Date(a.updated_at))
          )
          .slice(0, 6);
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return { repos, loading };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useTypewriter.js src/hooks/useGitHub.js
git commit -m "feat: add useTypewriter and useGitHub hooks"
```

---

## Task 7: SocialRow component

**Files:**
- Create: `src/components/SocialRow.jsx`

- [ ] **Step 1: Create `src/components/SocialRow.jsx`**

```jsx
import React from 'react';
import { T, mono } from '../tokens.js';

const SOCIALS = [
  { label: 'GitHub',      href: 'https://github.com/varunkumar' },
  { label: 'Twitter',     href: 'https://twitter.com/varunkumar' },
  { label: 'LinkedIn',    href: 'https://linkedin.com/in/varunkumar-nagarajan' },
  { label: 'Instagram',   href: 'https://instagram.com/varunkumar' },
  { label: 'Photography', href: 'https://aganadhiram.in', highlight: true },
];

export default function SocialRow() {
  return (
    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
      {SOCIALS.map(({ label, href, highlight }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: mono, fontSize: 11,
            color: highlight ? T.gold : T.fgSec,
            padding: '5px 11px', borderRadius: 3,
            border: `1px solid ${highlight ? 'rgba(212,137,10,0.3)' : T.border}`,
            opacity: highlight ? 1 : 0.7,
            transition: 'all 150ms', letterSpacing: '0.02em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.color = highlight ? T.goldHov : T.fg;
            e.currentTarget.style.borderColor = highlight ? 'rgba(212,137,10,0.6)' : T.borderLt;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = highlight ? '1' : '0.7';
            e.currentTarget.style.color = highlight ? T.gold : T.fgSec;
            e.currentTarget.style.borderColor = highlight ? 'rgba(212,137,10,0.3)' : T.border;
          }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialRow.jsx
git commit -m "feat: add SocialRow component"
```

---

## Task 8: BrewingLabel + ContribGraph components

**Files:**
- Create: `src/components/BrewingLabel.jsx`
- Create: `src/components/ContribGraph.jsx`

- [ ] **Step 1: Create `src/components/BrewingLabel.jsx`**

Cycles through 15 GitHub-flavoured verbs every 2 seconds with a fade transition.

```jsx
import React from 'react';
import { T, mono } from '../tokens.js';

const VERBS = [
  'brewing', 'shipping', 'committing', 'pushing', 'merging',
  'compiling', 'deploying', 'refactoring', 'diffing', 'rebasing',
  'building', 'patching', 'reviewing', 'iterating', 'hacking',
];

export default function BrewingLabel() {
  const [idx, setIdx] = React.useState(0);
  const [vis, setVis] = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(i => (i + 1) % VERBS.length); setVis(true); }, 180);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, letterSpacing: '0.08em' }}>
      {'// '}
      <span style={{
        display: 'inline-block', minWidth: 100,
        opacity: vis ? 1 : 0,
        transition: 'opacity 160ms cubic-bezier(0.4,0,0.2,1)',
      }}>
        {VERBS[idx]}
      </span>
    </span>
  );
}
```

- [ ] **Step 2: Create `src/components/ContribGraph.jsx`**

Loads the GitHub contributions heatmap image from ghchart.rshah.org. Shows a `loading` + blinking cursor while the image is in-flight.

```jsx
import React from 'react';
import { T, mono } from '../tokens.js';
import Cursor from './Cursor.jsx';
import BrewingLabel from './BrewingLabel.jsx';

export default function ContribGraph({ isDark }) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <BrewingLabel />
        <a
          href="https://github.com/varunkumar"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: mono, fontSize: 10, color: T.mono, transition: 'color 150ms' }}
          onMouseEnter={e => e.currentTarget.style.color = T.gold}
          onMouseLeave={e => e.currentTarget.style.color = T.mono}
        >
          github/varunkumar →
        </a>
      </div>
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 6, padding: '16px 18px', overflow: 'hidden',
        position: 'relative', minHeight: 96,
      }}>
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: mono, fontSize: 11, color: T.fgMute,
          }}>
            loading<Cursor />
          </div>
        )}
        <img
          className={`contrib-img ${isDark ? 'dark' : 'light'}`}
          src="https://ghchart.rshah.org/6a9e68/varunkumar"
          alt="GitHub contributions"
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? 'block' : 'none' }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/BrewingLabel.jsx src/components/ContribGraph.jsx
git commit -m "feat: add BrewingLabel and ContribGraph components"
```

---

## Task 9: InstagramSection component

**Files:**
- Create: `src/components/InstagramSection.jsx`

- [ ] **Step 1: Create `src/components/InstagramSection.jsx`**

```jsx
import React from 'react';
import { T, mono } from '../tokens.js';
import SectionLabel from './SectionLabel.jsx';
import { IG_PLACEHOLDERS } from '../data/instagram.js';

export default function InstagramSection() {
  const [hov, setHov] = React.useState(null);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <SectionLabel>instagram · @varunkumar</SectionLabel>
        <a
          href="https://instagram.com/varunkumar"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: mono, fontSize: 10, color: T.mono, transition: 'color 150ms' }}
          onMouseEnter={e => e.currentTarget.style.color = T.gold}
          onMouseLeave={e => e.currentTarget.style.color = T.mono}
        >
          view profile →
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
        {IG_PLACEHOLDERS.map((p, i) => (
          <a
            key={i}
            href="https://instagram.com/varunkumar"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: 'block', aspectRatio: '1 / 1',
              background: p.grad, borderRadius: 4,
              border: `1px solid ${hov === i ? T.borderLt : T.border}`,
              position: 'relative', overflow: 'hidden',
              transition: 'border-color 150ms, transform 200ms',
              transform: hov === i ? 'scale(1.015)' : 'scale(1)',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(13,13,11,0.8) 0%, transparent 55%)',
              opacity: hov === i ? 1 : 0.5,
              transition: 'opacity 200ms',
            }} />
            <div style={{
              position: 'absolute', bottom: 8, left: 9, right: 9,
              fontFamily: mono, fontSize: 9, color: T.fgSec,
              opacity: hov === i ? 1 : 0,
              transition: 'opacity 200ms',
              letterSpacing: '0.03em',
            }}>
              {p.caption}
            </div>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 10, fontFamily: mono, fontSize: 9, color: T.fgMute, fontStyle: 'italic' }}>
        Real posts appear after connecting your Instagram access token.
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InstagramSection.jsx
git commit -m "feat: add InstagramSection component with placeholder grid"
```

---

## Task 10: ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.jsx`

- [ ] **Step 1: Create `src/components/ProjectCard.jsx`**

```jsx
import React from 'react';
import { T, mono, sans } from '../tokens.js';

function timeAgo(dateStr) {
  const months = Math.floor((Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24 * 30));
  if (months < 1) return 'this month';
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function ProjectCard({ repo }) {
  const [hov, setHov] = React.useState(false);

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', padding: '18px 20px',
        background: hov ? T.raised : 'transparent',
        border: `1px solid ${hov ? T.borderLt : T.border}`,
        borderRadius: 6, transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
        <span style={{ fontFamily: mono, fontSize: 12, color: hov ? T.gold : T.mono, transition: 'color 150ms' }}>
          {repo.name}
        </span>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          {repo.stargazers_count > 0 && (
            <span style={{ fontFamily: mono, fontSize: 9, color: T.fgMute }}>★ {repo.stargazers_count}</span>
          )}
          <span style={{ fontFamily: mono, fontSize: 9, color: T.fgMute }}>{timeAgo(repo.updated_at)}</span>
        </div>
      </div>
      <p style={{ fontFamily: sans, fontSize: 13, color: T.fgSec, lineHeight: 1.65, marginBottom: 10 }}>
        {repo.description}
      </p>
      {repo.language && (
        <span style={{
          fontFamily: mono, fontSize: 9, color: T.monoDk,
          border: `1px solid ${T.border}`, borderRadius: 2,
          padding: '2px 7px', letterSpacing: '0.04em',
        }}>
          {repo.language}
        </span>
      )}
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectCard.jsx
git commit -m "feat: add ProjectCard component"
```

---

## Task 11: PhotoCTA component

**Files:**
- Create: `src/components/PhotoCTA.jsx`

- [ ] **Step 1: Create `src/components/PhotoCTA.jsx`**

```jsx
import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import { IG_PLACEHOLDERS } from '../data/instagram.js';

export default function PhotoCTA() {
  return (
    <div style={{
      background: T.raised, border: `1px solid ${T.border}`,
      borderRadius: 6, padding: '24px 28px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
    }}>
      <div>
        <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 300, color: T.fg, marginBottom: 6 }}>
          Aganadhiram Creations
        </div>
        <div style={{ fontFamily: sans, fontSize: 13, color: T.fgSec, lineHeight: 1.7, maxWidth: 360, marginBottom: 14 }}>
          Wildlife art &amp; photography. அகநாதிரம் — the inner heart of nature.
        </div>
        <a
          href="https://aganadhiram.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: mono, fontSize: 11, color: T.gold, borderBottom: '1px solid rgba(212,137,10,0.3)', paddingBottom: 1 }}
          onMouseEnter={e => e.currentTarget.style.color = T.goldHov}
          onMouseLeave={e => e.currentTarget.style.color = T.gold}
        >
          aganadhiram.in →
        </a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, flexShrink: 0 }}>
        {IG_PLACEHOLDERS.slice(0, 4).map((p, i) => (
          <div
            key={i}
            style={{ width: 56, height: 56, background: p.grad, borderRadius: 3, border: `1px solid ${T.border}` }}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/PhotoCTA.jsx
git commit -m "feat: add PhotoCTA component"
```

---

## Task 12: Nav component

**Files:**
- Create: `src/components/Nav.jsx`

- [ ] **Step 1: Create `src/components/Nav.jsx`**

Fixed top nav with: wordmark (`~/varunkumar` + blinking cursor on home), desktop page links, theme toggle, and responsive mobile hamburger with slide-down drawer.

```jsx
import React from 'react';
import { T, mono, sans } from '../tokens.js';
import Cursor from './Cursor.jsx';

const LINKS = ['writing', 'projects', 'about'];

export default function Nav({ active, setActive, isDark, toggleTheme }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [narrow, setNarrow] = React.useState(window.innerWidth < 600);

  React.useEffect(() => {
    const el = document.getElementById('scroll-root');
    if (!el) return;
    const h = () => setScrolled(el.scrollTop > 24);
    el.addEventListener('scroll', h);
    return () => el.removeEventListener('scroll', h);
  }, []);

  React.useEffect(() => {
    const h = () => setNarrow(window.innerWidth < 600);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  function go(page) { setActive(page); setMenuOpen(false); }

  const solidBg = isDark ? 'rgba(13,13,11,0.97)' : 'rgba(245,242,236,0.97)';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 52, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px',
        background: scrolled || menuOpen ? solidBg : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${scrolled || menuOpen ? T.border : 'transparent'}`,
        transition: 'background 280ms, border-color 280ms',
      }}>
        <button onClick={() => go('home')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ fontFamily: mono, fontSize: 13, color: T.mono }}>~/</span>
          <span style={{ fontFamily: mono, fontSize: 13, color: T.fg }}>varunkumar</span>
          {active === 'home' && <Cursor />}
        </button>

        {narrow ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={toggleTheme} style={{
              background: 'none', border: `1px solid ${T.border}`, borderRadius: 4,
              cursor: 'pointer', padding: '4px 8px',
              fontFamily: mono, fontSize: 11, color: T.fgMute,
            }}>
              {isDark ? '○' : '●'}
            </button>
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px 2px', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', width: 18, height: 1.5,
                  background: T.fg, borderRadius: 1,
                  transition: 'all 220ms cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen
                    ? i === 0 ? 'translateY(5.5px) rotate(45deg)'
                    : i === 2 ? 'translateY(-5.5px) rotate(-45deg)'
                    : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {LINKS.map(k => (
              <button key={k} onClick={() => go(k)} style={{
                background: 'none', border: 'none', borderRadius: 4, cursor: 'pointer',
                padding: '5px 12px', fontFamily: sans, fontSize: 13,
                color: active === k ? T.fg : T.fgSec,
                fontWeight: active === k ? 500 : 400,
                transition: 'color 150ms',
              }}
                onMouseEnter={e => { if (active !== k) e.currentTarget.style.color = T.fg; }}
                onMouseLeave={e => { if (active !== k) e.currentTarget.style.color = T.fgSec; }}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
            <button onClick={toggleTheme} style={{
              background: 'none', border: `1px solid ${T.border}`, borderRadius: 4,
              cursor: 'pointer', padding: '4px 8px', marginLeft: 6,
              fontFamily: mono, fontSize: 11, color: T.fgMute,
              transition: 'all 150ms',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = T.fg; e.currentTarget.style.borderColor = T.borderLt; }}
              onMouseLeave={e => { e.currentTarget.style.color = T.fgMute; e.currentTarget.style.borderColor = T.border; }}
            >
              {isDark ? '○' : '●'}
            </button>
          </div>
        )}
      </nav>

      {narrow && (
        <div style={{
          position: 'fixed', top: 52, left: 0, right: 0, zIndex: 99,
          background: solidBg, backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${T.border}`,
          padding: menuOpen ? '8px 24px 16px' : '0 24px',
          maxHeight: menuOpen ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 280ms cubic-bezier(0.4,0,0.2,1), padding 280ms',
        }}>
          {LINKS.map(k => (
            <button key={k} onClick={() => go(k)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '12px 0', borderBottom: `1px solid ${T.border}`,
              fontFamily: sans, fontSize: 16,
              color: active === k ? T.fg : T.fgSec,
              fontWeight: active === k ? 500 : 400,
            }}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "feat: add Nav component with mobile hamburger and theme toggle"
```

---

## Task 13: Pages (HomePage, WritingPage, ProjectsPage, AboutPage)

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/WritingPage.jsx`
- Create: `src/pages/ProjectsPage.jsx`
- Create: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Create `src/pages/HomePage.jsx`**

```jsx
import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import SectionLabel from '../components/SectionLabel.jsx';
import Divider from '../components/Divider.jsx';
import Cursor from '../components/Cursor.jsx';
import SocialRow from '../components/SocialRow.jsx';
import ContribGraph from '../components/ContribGraph.jsx';
import InstagramSection from '../components/InstagramSection.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import PhotoCTA from '../components/PhotoCTA.jsx';
import useTypewriter from '../hooks/useTypewriter.js';
import useGitHub from '../hooks/useGitHub.js';
import { POSTS } from '../data/posts.js';

const BIO_TEXT = "Software engineer · Engineering leader · Builder · Wildlife photographer. I build software and the teams that build software. When I'm not shipping, I'm deep in a forest with a 600mm lens, learning to wait.";

function PostRow({ post }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ padding: '18px 0', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, lineHeight: 1.3, color: hov ? T.fg : T.fgSec, transition: 'color 150ms', marginBottom: 5 }}>
            {post.title}
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: T.fgMute, lineHeight: 1.6, marginBottom: 8 }}>{post.excerpt}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {post.tags.map(t => (
              <span key={t} style={{ fontFamily: mono, fontSize: 9, color: T.monoDk, border: `1px solid ${T.border}`, padding: '2px 7px', borderRadius: 2 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 9, color: T.fgMute, flexShrink: 0, textAlign: 'right', lineHeight: 1.9 }}>
          {post.date}<br />{post.mins}m read
        </div>
      </div>
    </div>
  );
}

function TypewriterBio() {
  const { displayed, done } = useTypewriter(BIO_TEXT, 18, 600);
  return (
    <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.8, maxWidth: 500, marginBottom: 26, minHeight: '6em' }}>
      {displayed}
      {!done && <span style={{ display: 'inline-block', width: 6, height: 14, background: T.fgMute, borderRadius: 1, verticalAlign: 'middle', marginLeft: 2 }} />}
    </p>
  );
}

export default function HomePage({ setActive, isDark }) {
  const { repos, loading } = useGitHub();

  return (
    <div className="page-pad" style={{ maxWidth: 700, margin: '0 auto', padding: '88px 32px 100px' }}>

      {/* Hero */}
      <section className="fade-up fade-up-1" style={{ marginBottom: 60 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, marginBottom: 18, letterSpacing: '0.06em' }}>
          // varunkumar nagarajan
        </div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(52px,8vw,80px)', lineHeight: 0.92, letterSpacing: '-0.02em', color: T.fg, marginBottom: 4 }}>
          Varunkumar
        </h1>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(52px,8vw,80px)', lineHeight: 0.92, letterSpacing: '-0.02em', color: T.fgSec, marginBottom: 28 }}>
          Nagarajan
        </h1>
        <TypewriterBio />
        <SocialRow />
      </section>

      {/* Writing preview */}
      <section className="fade-up fade-up-2" style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <SectionLabel>recent writing</SectionLabel>
          <button onClick={() => setActive('writing')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: mono, fontSize: 10, color: T.mono, transition: 'color 150ms' }}
            onMouseEnter={e => e.currentTarget.style.color = T.gold}
            onMouseLeave={e => e.currentTarget.style.color = T.mono}
          >view all →</button>
        </div>
        <Divider />
        {POSTS.map((p, i) => (
          <React.Fragment key={i}>
            <PostRow post={p} />
            <Divider />
          </React.Fragment>
        ))}
        <div style={{ paddingTop: 12, fontFamily: mono, fontSize: 9, color: T.fgMute }}>
          blog.varunkumar.dev — coming soon
        </div>
      </section>

      {/* GitHub contributions */}
      <section className="fade-up fade-up-3" style={{ marginBottom: 56 }}>
        <ContribGraph isDark={isDark} />
      </section>

      {/* Projects */}
      <section className="fade-up fade-up-5" style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <SectionLabel>projects</SectionLabel>
          <a href="https://github.com/varunkumar" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: mono, fontSize: 10, color: T.mono, transition: 'color 150ms' }}
            onMouseEnter={e => e.currentTarget.style.color = T.gold}
            onMouseLeave={e => e.currentTarget.style.color = T.mono}
          >github/varunkumar →</a>
        </div>
        {loading
          ? <div style={{ fontFamily: mono, fontSize: 12, color: T.fgMute }}>fetching repos<Cursor /></div>
          : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 7 }}>
              {repos.map(r => <ProjectCard key={r.id} repo={r} />)}
            </div>
        }
      </section>

      {/* Instagram */}
      <section className="fade-up fade-up-6" style={{ marginBottom: 56 }}>
        <InstagramSection />
      </section>

      {/* Photography CTA */}
      <section style={{ marginBottom: 20 }}>
        <PhotoCTA />
      </section>

      <footer style={{ marginTop: 72, paddingTop: 24, borderTop: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 9, color: T.fgMute }}>
        <span>© 2025 varunkumar nagarajan</span>
        <span>Chennai, India</span>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/WritingPage.jsx`**

```jsx
import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import Divider from '../components/Divider.jsx';
import { POSTS } from '../data/posts.js';

function PostRow({ post }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ padding: '18px 0', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, lineHeight: 1.3, color: hov ? T.fg : T.fgSec, transition: 'color 150ms', marginBottom: 5 }}>
            {post.title}
          </div>
          <p style={{ fontFamily: sans, fontSize: 13, color: T.fgMute, lineHeight: 1.6, marginBottom: 8 }}>{post.excerpt}</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {post.tags.map(t => (
              <span key={t} style={{ fontFamily: mono, fontSize: 9, color: T.monoDk, border: `1px solid ${T.border}`, padding: '2px 7px', borderRadius: 2 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 9, color: T.fgMute, flexShrink: 0, textAlign: 'right', lineHeight: 1.9 }}>
          {post.date}<br />{post.mins}m read
        </div>
      </div>
    </div>
  );
}

export default function WritingPage() {
  return (
    <div className="page-pad" style={{ maxWidth: 680, margin: '0 auto', padding: '88px 32px 100px' }}>
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, marginBottom: 12 }}>// writing</div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 48, color: T.fg, lineHeight: 1.1, marginBottom: 10 }}>
          Things I think about
        </h1>
        <p style={{ fontFamily: sans, fontSize: 14, color: T.fgSec, lineHeight: 1.7 }}>
          Engineering, leadership, craft, and field reports from the forest.{' '}
          Blog at <a href="https://blog.varunkumar.dev" style={{ color: T.gold }}>blog.varunkumar.dev</a> — coming soon.
        </p>
      </div>
      <Divider />
      {POSTS.map((p, i) => (
        <React.Fragment key={i}>
          <div className={`fade-up fade-up-${i + 2}`}><PostRow post={p} /></div>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/pages/ProjectsPage.jsx`**

```jsx
import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import Cursor from '../components/Cursor.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import useGitHub from '../hooks/useGitHub.js';

export default function ProjectsPage() {
  const { repos, loading } = useGitHub();

  return (
    <div className="page-pad" style={{ maxWidth: 720, margin: '0 auto', padding: '88px 32px 100px' }}>
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, marginBottom: 12 }}>// projects</div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 48, color: T.fg, lineHeight: 1.1, marginBottom: 10 }}>
          Things I've built
        </h1>
        <p style={{ fontFamily: sans, fontSize: 14, color: T.fgSec, lineHeight: 1.7 }}>
          Side projects, experiments, tools. More at{' '}
          <a href="https://github.com/varunkumar" target="_blank" rel="noopener noreferrer" style={{ color: T.gold }}>github/varunkumar</a>.
        </p>
      </div>
      {loading
        ? <div style={{ fontFamily: mono, fontSize: 13, color: T.fgMute }}>fetching<Cursor /></div>
        : <div className="fade-up fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 7 }}>
            {repos.map(r => <ProjectCard key={r.id} repo={r} />)}
          </div>
      }
    </div>
  );
}
```

- [ ] **Step 4: Create `src/pages/AboutPage.jsx`**

```jsx
import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import Divider from '../components/Divider.jsx';

const ABOUT_ITEMS = [
  { k: 'currently',  v: 'Engineering leadership at Arcesium India Private Limited' },
  { k: 'building',   v: 'Software and the teams that build software' },
  { k: 'shooting',   v: 'Canon R5 · 600mm f/4 · Mammals, birds, landscapes' },
  { k: 'location',   v: 'Chennai, India' },
  { k: 'contact',    v: 'varunkumar [dot] n [at] gmail [dot] com' },
];

export default function AboutPage() {
  return (
    <div className="page-pad" style={{ maxWidth: 620, margin: '0 auto', padding: '88px 32px 100px' }}>
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, marginBottom: 12 }}>// about</div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 48, color: T.fg, lineHeight: 1.1, marginBottom: 22 }}>
          Varunkumar Nagarajan
        </h1>
        <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.85, marginBottom: 18 }}>
          I've spent a decade building software and building the people who build software.
          Engineering leadership, to me, means creating the conditions for great work —
          systems, teams, and culture.
        </p>
        <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.85 }}>
          The other half of my life happens behind a camera, deep in forests, waiting.
          Wildlife photography demands the same qualities good engineering does — patience,
          precision, and the willingness to sit with uncertainty.
        </p>
      </div>
      <Divider />
      {ABOUT_ITEMS.map(({ k, v }) => (
        <div key={k} style={{
          display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16,
          padding: '14px 0', borderBottom: `1px solid ${T.border}`,
          fontFamily: mono, fontSize: 12,
        }}>
          <span style={{ color: T.mono }}>{k}</span>
          <span style={{ color: T.fg, lineHeight: 1.65 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.jsx src/pages/WritingPage.jsx src/pages/ProjectsPage.jsx src/pages/AboutPage.jsx
git commit -m "feat: add all four page components"
```

---

## Task 14: App root (routing + theme)

**Files:**
- Create: `src/App.jsx`

- [ ] **Step 1: Create `src/App.jsx`**

```jsx
import React from 'react';
import { T, DARK, LIGHT } from './tokens.js';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import WritingPage from './pages/WritingPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

const PAGES = { home: HomePage, writing: WritingPage, projects: ProjectsPage, about: AboutPage };

export default function App() {
  const [active, setActive] = React.useState(() => {
    try { return localStorage.getItem('vk_page') || 'home'; } catch { return 'home'; }
  });
  const [isDark, setIsDark] = React.useState(() => {
    try { return localStorage.getItem('vk_theme') !== 'light'; } catch { return true; }
  });

  // Sync mutable T before render — all components read from T directly.
  Object.assign(T, isDark ? DARK : LIGHT);

  function toggleTheme() {
    const next = !isDark;
    Object.assign(T, next ? DARK : LIGHT);
    setIsDark(next);
    try { localStorage.setItem('vk_theme', next ? 'dark' : 'light'); } catch {}
  }

  React.useEffect(() => {
    document.body.style.background = T.bg;
    document.body.style.color = T.fg;
    document.body.style.transition = 'background 250ms, color 250ms';
  }, [isDark]);

  React.useEffect(() => {
    try { localStorage.setItem('vk_page', active); } catch {}
    const el = document.getElementById('scroll-root');
    if (el) el.scrollTop = 0;
  }, [active]);

  const Page = PAGES[active] || HomePage;

  return (
    <div
      id="scroll-root"
      style={{ height: '100vh', overflowY: 'auto', background: T.bg, transition: 'background 250ms' }}
    >
      <Nav active={active} setActive={setActive} isDark={isDark} toggleTheme={toggleTheme} />
      <Page setActive={setActive} isDark={isDark} />
    </div>
  );
}
```

- [ ] **Step 2: Verify dev server — full app works**

```bash
npm run dev
```

Open `http://localhost:5173`. Verify:
- Dark background (`#0d0d0b`) on load
- Nav shows `~/varunkumar` with blinking cursor
- Typewriter bio types itself out on hero
- Writing section shows 3 posts with dividers
- Contributions graph loads (ghchart image appears after network fetch)
- Projects grid fetches and renders GitHub repos
- Instagram 3×2 placeholder grid renders
- Aganadhiram CTA block renders
- Theme toggle (○/●) switches between dark and light
- Writing / Projects / About nav links render their pages
- Mobile: hamburger menu at <600px

- [ ] **Step 3: Build and verify output**

```bash
npm run build
```

Expected: `dist/` created. `dist/index.html` and hashed JS/CSS bundles present. No build errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add App root with theme and page routing"
```

---

## Task 15: Verify production build + update .gitignore

**Files:**
- Modify: `.gitignore` (or create if absent)

- [ ] **Step 1: Add `dist/` and `node_modules/` to `.gitignore`**

```bash
cat .gitignore 2>/dev/null || true
```

Ensure `.gitignore` contains at minimum:

```
node_modules/
dist/
```

If the file doesn't exist:

```bash
printf 'node_modules/\ndist/\n' > .gitignore
```

If it exists but lacks these entries, add them.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Open `http://localhost:4173`. Run through the same visual checklist as Task 14 Step 2.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: add .gitignore for node_modules and dist"
```

---

## Integration Notes

### GitHub Contributions
- **Service:** `https://ghchart.rshah.org/{hex-color}/varunkumar`
- **Auth:** None — fully public
- **Color:** `6a9e68` (green matching design tokens). The `ContribGraph` component applies CSS filters to tune appearance in dark/light mode.
- **Refresh:** The image is fetched fresh on each page load; ghchart.rshah.org caches daily.

### GitHub Projects
- **Endpoint:** `https://api.github.com/users/varunkumar/repos?sort=updated&per_page=20`
- **Auth:** None — public API. Rate limit: 60 requests/hour per IP.
- **Filtering:** `useGitHub` hook excludes forks, requires a description, sorts by stars then recency, limits to 6.

### Instagram (future)
1. Create an app at [developers.facebook.com](https://developers.facebook.com) with "Instagram Basic Display" product.
2. Add your Instagram account as a test user.
3. Obtain a short-lived token via OAuth, then exchange for a **long-lived token** (valid 60 days, renewable).
4. Fetch: `https://graph.instagram.com/me/media?fields=id,media_url,thumbnail_url,permalink,media_type&access_token=TOKEN`
5. Replace `IG_PLACEHOLDERS` in `src/data/instagram.js` with the live API response and update `InstagramSection.jsx` to render real `<img>` tags.
6. Store the token in a Cloudflare Pages environment variable (not in source) — proxy the API call through a Cloudflare Function/Worker to keep the token server-side.

### Blog RSS (future)
Once `blog.varunkumar.dev` is live, replace `src/data/posts.js` with a fetch from the RSS feed (e.g., `https://blog.varunkumar.dev/rss.xml`), parsed client-side or via a Cloudflare Worker.

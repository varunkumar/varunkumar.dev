import React from 'react';
import Nav from './components/Nav.jsx';
import AboutPage from './pages/AboutPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import WritingPage from './pages/WritingPage.jsx';
import { DARK, LIGHT, T } from './tokens.js';

const PAGES = {
  home: HomePage,
  writing: WritingPage,
  projects: ProjectsPage,
  about: AboutPage,
};
const VALID = new Set(Object.keys(PAGES));

function pageFromPath() {
  const seg = window.location.pathname.replace(/^\//, '') || 'home';
  return VALID.has(seg) ? seg : 'home';
}

export default function App() {
  const [active, setActivePage] = React.useState(pageFromPath);
  const [isDark, setIsDark] = React.useState(() => {
    try {
      return localStorage.getItem('vk_theme') !== 'light';
    } catch {
      return true;
    }
  });

  // Sync mutable T before render — all components read from T directly.
  Object.assign(T, isDark ? DARK : LIGHT);

  function setActive(page) {
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState({ page }, '', path);
    setActivePage(page);
  }

  // Handle browser back/forward
  React.useEffect(() => {
    const h = () => setActivePage(pageFromPath());
    window.addEventListener('popstate', h);
    return () => window.removeEventListener('popstate', h);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    Object.assign(T, next ? DARK : LIGHT);
    setIsDark(next);
    try {
      localStorage.setItem('vk_theme', next ? 'dark' : 'light');
    } catch {
      /* localStorage unavailable */
    }
  }

  React.useEffect(() => {
    document.body.style.background = T.bg;
    document.body.style.color = T.fg;
    document.body.style.transition = 'background 250ms, color 250ms';
  }, [isDark]);

  React.useEffect(() => {
    const el = document.getElementById('scroll-root');
    if (el) el.scrollTop = 0;
  }, [active]);

  const Page = PAGES[active] || HomePage;

  return (
    <div
      id="scroll-root"
      style={{
        height: '100vh',
        overflowY: 'auto',
        background: T.bg,
        transition: 'background 250ms',
      }}
    >
      <Nav
        active={active}
        setActive={setActive}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <Page setActive={setActive} isDark={isDark} />
    </div>
  );
}

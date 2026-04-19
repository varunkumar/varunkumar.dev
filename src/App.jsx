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

import React from 'react';
import { T, mono, sans } from '../tokens.js';
import Cursor from './Cursor.jsx';

const NAV_ITEMS = [
  { label: 'Home', page: 'home' },
  { label: 'Writing', page: 'writing' },
  { label: 'Projects', page: 'projects' },
  { label: 'Photography', href: 'https://aganadhiram.in' },
  { label: 'Talks', href: 'https://slides.varunkumar.dev' },
  { label: 'About', page: 'about' },
];

export default function Nav({ active, setActive, isDark, toggleTheme }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [narrow, setNarrow] = React.useState(() => window.innerWidth < 600);

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

  function go(page) {
    setActive(page);
    setMenuOpen(false);
  }

  const solidBg = isDark ? 'rgba(12,12,15,0.97)' : 'rgba(244,244,245,0.97)';

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: scrolled || menuOpen ? solidBg : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
          borderBottom: `1px solid ${scrolled || menuOpen ? T.border : 'transparent'}`,
          transition: 'background 280ms, border-color 280ms',
        }}
      >
        <button
          onClick={() => go('home')}
          aria-label="Go to home"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <span style={{ fontFamily: mono, fontSize: 15, color: T.gold }}>
            ~/
          </span>
          <span style={{ fontFamily: mono, fontSize: 15, color: T.fg }}>
            varunkumar
          </span>
          {active === 'home' && <Cursor />}
        </button>

        {narrow ? (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              style={{
                background: 'none',
                border: `1px solid ${T.border}`,
                borderRadius: 4,
                cursor: 'pointer',
                minWidth: 44,
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: mono,
                fontSize: 11,
                color: T.fgMute,
              }}
            >
              {isDark ? '○' : '●'}
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                minWidth: 44,
                minHeight: 44,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: 18,
                    height: 1.5,
                    background: T.fg,
                    borderRadius: 1,
                    transition: 'all 220ms cubic-bezier(0.4,0,0.2,1)',
                    transform: menuOpen
                      ? i === 0
                        ? 'translateY(5.5px) rotate(45deg)'
                        : i === 2
                          ? 'translateY(-5.5px) rotate(-45deg)'
                          : 'scaleX(0)'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {NAV_ITEMS.map(({ label, page, href }) =>
              page ? (
                <button
                  key={label}
                  onClick={() => go(page)}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: '5px 12px',
                    fontFamily: sans,
                    fontSize: 14,
                    color: active === page ? T.fg : T.fgSec,
                    fontWeight: active === page ? 500 : 400,
                    transition: 'color 150ms',
                  }}
                  onMouseEnter={(e) => {
                    if (active !== page) e.currentTarget.style.color = T.fg;
                  }}
                  onMouseLeave={(e) => {
                    if (active !== page) e.currentTarget.style.color = T.fgSec;
                  }}
                >
                  {label}
                </button>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'none',
                    borderRadius: 4,
                    padding: '5px 12px',
                    fontFamily: sans,
                    fontSize: 14,
                    color: T.fgSec,
                    fontWeight: 400,
                    transition: 'color 150ms',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = T.fg)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = T.fgSec)}
                >
                  {label}
                </a>
              )
            )}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              style={{
                background: 'none',
                border: `1px solid ${T.border}`,
                borderRadius: 4,
                cursor: 'pointer',
                minWidth: 44,
                minHeight: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 6,
                fontFamily: mono,
                fontSize: 11,
                color: T.fgMute,
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = T.fg;
                e.currentTarget.style.borderColor = T.borderLt;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = T.fgMute;
                e.currentTarget.style.borderColor = T.border;
              }}
            >
              {isDark ? '○' : '●'}
            </button>
          </div>
        )}
      </nav>

      {narrow && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 99,
            background: solidBg,
            backdropFilter: 'blur(16px)',
            borderBottom: `1px solid ${T.border}`,
            padding: menuOpen ? '8px 24px 16px' : '0 24px',
            maxHeight: menuOpen ? 360 : 0,
            overflow: 'hidden',
            transition:
              'max-height 280ms cubic-bezier(0.4,0,0.2,1), padding 280ms',
          }}
        >
          {NAV_ITEMS.map(({ label, page, href }) =>
            page ? (
              <button
                key={label}
                onClick={() => go(page)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '12px 0',
                  borderBottom: `1px solid ${T.border}`,
                  fontFamily: sans,
                  fontSize: 16,
                  color: active === page ? T.fg : T.fgSec,
                  fontWeight: active === page ? 500 : 400,
                }}
              >
                {label}
              </button>
            ) : (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '12px 0',
                  borderBottom: `1px solid ${T.border}`,
                  fontFamily: sans,
                  fontSize: 16,
                  color: T.fgSec,
                  fontWeight: 400,
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            )
          )}
        </div>
      )}
    </>
  );
}

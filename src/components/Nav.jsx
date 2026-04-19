import React from 'react';
import { T, mono, sans } from '../tokens.js';
import Cursor from './Cursor.jsx';

const LINKS = ['writing', 'projects', 'about'];

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

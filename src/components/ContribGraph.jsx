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

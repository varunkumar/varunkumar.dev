import React from 'react';
import { T, mono } from '../tokens.js';

const CURRENT_BUILD = import.meta.env.VITE_BUILD_TIME;
const POLL_MS = 5 * 60 * 1000;

export default function UpdateBanner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    async function check() {
      try {
        const res = await fetch('/version.json?t=' + Date.now());
        if (!res.ok) return;
        const { buildTime } = await res.json();
        if (buildTime && buildTime !== CURRENT_BUILD) setShow(true);
      } catch {
        /* network unavailable */
      }
    }

    const id = setInterval(check, POLL_MS);
    return () => clearInterval(id);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 8,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontFamily: mono,
        fontSize: 12,
        color: T.fg,
        boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: T.mono, fontSize: 8 }}>●</span>
      <span style={{ color: T.fgSec }}>new version available</span>
      <button
        onClick={() => window.location.reload()}
        style={{
          background: T.gold,
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          padding: '3px 10px',
          fontFamily: mono,
          fontSize: 11,
          color: '#fff',
          fontWeight: 500,
        }}
      >
        reload
      </button>
      <button
        onClick={() => setShow(false)}
        aria-label="Dismiss"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px 2px',
          fontFamily: mono,
          fontSize: 13,
          color: T.fgMute,
          lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  );
}

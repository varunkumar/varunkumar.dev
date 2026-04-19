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

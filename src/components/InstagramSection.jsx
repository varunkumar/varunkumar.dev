import React from 'react';
import { T, mono } from '../tokens.js';
import SectionLabel from './SectionLabel.jsx';
import { IG_PLACEHOLDERS } from '../data/instagram.js';

export default function InstagramSection() {
  const [hov, setHov] = React.useState(null);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
        }}
      >
        <SectionLabel>instagram · @varunkumar</SectionLabel>
        <a
          href="https://instagram.com/varunkumar"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: mono,
            fontSize: 10,
            color: T.mono,
            transition: 'color 150ms',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.gold)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.mono)}
        >
          view profile →
        </a>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 5,
        }}
      >
        {IG_PLACEHOLDERS.map((p, i) => (
          <a
            key={i}
            href="https://instagram.com/varunkumar"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              display: 'block',
              aspectRatio: '1 / 1',
              background: '#111',
              borderRadius: 4,
              border: `1px solid ${hov === i ? T.borderLt : T.border}`,
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 150ms, transform 200ms',
              transform: hov === i ? 'scale(1.015)' : 'scale(1)',
            }}
          >
            <img
              src={p.src}
              alt={p.caption}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(13,13,11,0.8) 0%, transparent 55%)',
                opacity: hov === i ? 1 : 0.5,
                transition: 'opacity 200ms',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: 9,
                right: 9,
                fontFamily: mono,
                fontSize: 9,
                color: T.fgSec,
                opacity: hov === i ? 1 : 0,
                transition: 'opacity 200ms',
                letterSpacing: '0.03em',
              }}
            >
              {p.caption}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

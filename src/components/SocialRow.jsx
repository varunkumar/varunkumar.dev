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

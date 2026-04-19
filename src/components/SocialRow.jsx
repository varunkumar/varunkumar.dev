import { T, mono } from '../tokens.js';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/varunkumar' },
  { label: 'Twitter', href: 'https://twitter.com/varunkumar' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/varunkumar-nagarajan' },
  { label: 'Instagram', href: 'https://instagram.com/varunkumar' },
  { label: 'YouTube', href: 'https://www.youtube.com/@varunkumarnagarajan' },
  { label: 'Talks', href: 'https://slides.varunkumar.dev' },
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
            fontFamily: mono,
            fontSize: 11,
            color: highlight ? T.gold : T.fgSec,
            padding: '5px 11px',
            borderRadius: 3,
            border: `1px solid ${T.border}`,
            transition: 'all 150ms',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = highlight ? T.goldHov : T.fg;
            e.currentTarget.style.borderColor = T.borderLt;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = highlight ? T.gold : T.fgSec;
            e.currentTarget.style.borderColor = T.border;
          }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

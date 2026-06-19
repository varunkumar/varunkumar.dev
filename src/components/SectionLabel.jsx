import { T, mono } from '../tokens.js';

export default function SectionLabel({ children }) {
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 12,
        color: T.fgMute,
        letterSpacing: '0.06em',
      }}
    >
      {'// '}
      {children}
    </span>
  );
}

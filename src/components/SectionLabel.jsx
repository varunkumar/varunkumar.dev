import { T, mono } from '../tokens.js';

export default function SectionLabel({ children }) {
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: 10,
        color: T.fgMute,
        letterSpacing: '0.08em',
      }}
    >
      {'// '}
      {children}
    </span>
  );
}

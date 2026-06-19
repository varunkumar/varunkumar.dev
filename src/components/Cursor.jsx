import React from 'react';
import { T } from '../tokens.js';

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Cursor() {
  const [on, setOn] = React.useState(true);
  React.useEffect(() => {
    if (reducedMotion()) return;
    const i = setInterval(() => setOn((p) => !p), 540);
    return () => clearInterval(i);
  }, []);
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 7,
        height: 13,
        background: on ? T.mono : 'transparent',
        borderRadius: 1,
        verticalAlign: 'middle',
        transition: reducedMotion() ? 'none' : 'background 80ms',
        marginLeft: 2,
      }}
    />
  );
}

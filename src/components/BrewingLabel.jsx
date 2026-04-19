import React from 'react';
import { T, mono } from '../tokens.js';

const VERBS = [
  'brewing', 'shipping', 'committing', 'pushing', 'merging',
  'compiling', 'deploying', 'refactoring', 'diffing', 'rebasing',
  'building', 'patching', 'reviewing', 'iterating', 'hacking',
];

export default function BrewingLabel() {
  const [idx, setIdx] = React.useState(0);
  const [vis, setVis] = React.useState(true);

  React.useEffect(() => {
    const t = setInterval(() => {
      setVis(false);
      setTimeout(() => { setIdx(i => (i + 1) % VERBS.length); setVis(true); }, 180);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, letterSpacing: '0.08em' }}>
      {'// '}
      <span style={{
        display: 'inline-block', minWidth: 100,
        opacity: vis ? 1 : 0,
        transition: 'opacity 160ms cubic-bezier(0.4,0,0.2,1)',
      }}>
        {VERBS[idx]}
      </span>
    </span>
  );
}

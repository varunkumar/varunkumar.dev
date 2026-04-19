import React from 'react';
import { T, mono } from '../tokens.js';

export default function Cursor() {
  const [on, setOn] = React.useState(true);
  React.useEffect(() => {
    const i = setInterval(() => setOn(p => !p), 540);
    return () => clearInterval(i);
  }, []);
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 13,
      background: on ? T.mono : 'transparent',
      borderRadius: 1, verticalAlign: 'middle',
      transition: 'background 80ms', marginLeft: 2,
    }} />
  );
}

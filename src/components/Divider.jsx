import React from 'react';
import { T } from '../tokens.js';

export default function Divider({ mt = 0, mb = 0 }) {
  return (
    <div
      style={{
        height: 1,
        background: T.border,
        marginTop: mt,
        marginBottom: mb,
      }}
    />
  );
}

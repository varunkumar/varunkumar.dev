import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import Divider from '../components/Divider.jsx';

const ABOUT_ITEMS = [
  { k: 'currently',  v: 'Engineering leadership at Arcesium India Private Limited' },
  { k: 'building',   v: 'Software and the teams that build software' },
  { k: 'shooting',   v: 'Canon R5 · 600mm f/4 · Mammals, birds, landscapes' },
  { k: 'location',   v: 'Chennai, India' },
  { k: 'contact',    v: 'varunkumar [dot] n [at] gmail [dot] com' },
];

export default function AboutPage() {
  return (
    <div className="page-pad" style={{ maxWidth: 620, margin: '0 auto', padding: '88px 32px 100px' }}>
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, marginBottom: 12 }}>// about</div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 48, color: T.fg, lineHeight: 1.1, marginBottom: 22 }}>
          Varunkumar Nagarajan
        </h1>
        <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.85, marginBottom: 18 }}>
          I've spent a decade building software and building the people who build software.
          Engineering leadership, to me, means creating the conditions for great work —
          systems, teams, and culture.
        </p>
        <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.85 }}>
          The other half of my life happens behind a camera, deep in forests, waiting.
          Wildlife photography demands the same qualities good engineering does — patience,
          precision, and the willingness to sit with uncertainty.
        </p>
      </div>
      <Divider />
      {ABOUT_ITEMS.map(({ k, v }) => (
        <div key={k} style={{
          display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16,
          padding: '14px 0', borderBottom: `1px solid ${T.border}`,
          fontFamily: mono, fontSize: 12,
        }}>
          <span style={{ color: T.mono }}>{k}</span>
          <span style={{ color: T.fg, lineHeight: 1.65 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

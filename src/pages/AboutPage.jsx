import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import Divider from '../components/Divider.jsx';

const ABOUT_ITEMS = [
  { k: 'currently',  v: 'Senior leadership at Arcesium India Private Limited' },
  { k: 'role',       v: 'Senior Vice President of Technology · Jul 2015 – present' },
  { k: 'before',     v: 'Project Leader at D. E. Shaw India Software · 2008 – 2015' },
  { k: 'interests',  v: 'Distributed systems · AI/ML · Cloud computing (AWS) · Web development' },
  { k: 'building',   v: 'Large-scale distributed systems, engineering teams, and innovation culture' },
  { k: 'shooting',   v: 'Nikon Z8 · 200-500mm f/5.6 · 70-200mm f/2.8 · Mammals, birds, landscapes' },
  { k: 'education',  v: 'PSG College of Technology — Integrated M.S. Software Engineering · Gold medalist · 9.86/10' },
  { k: 'location',   v: 'Chennai, India' },
  { k: 'contact',    v: 'varunkumar [dot] n [at] gmail [dot] com' },
];

export default function AboutPage() {
  return (
    <div className="page-pad" style={{ maxWidth: 660, margin: '0 auto', padding: '88px 32px 100px' }}>
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, marginBottom: 12 }}>// about</div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 48, color: T.fg, lineHeight: 1.1, marginBottom: 22 }}>
          Varunkumar Nagarajan
        </h1>
        <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.85, marginBottom: 18 }}>
          A seasoned software engineer with 17+ years of experience building large-scale distributed systems,
          and an engineering leader with 12+ years delivering results in the FinTech space. At Arcesium,
          I lead a cross-functional global team — responsible for tech architecture, roadmaps, hiring,
          and everything from SDLC to production cluster management.
        </p>
        <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.85, marginBottom: 18 }}>
          My technical interests span distributed systems, AI/ML in engineering workflows, cloud infrastructure,
          and web development. I've been driving AI adoption in the SDLC and organising hackathons and
          innovation forums since 2012. Winner of the Google Cloud Serverless Hackathon and multiple
          Arcesium hackathon grand prizes.
        </p>
        <p style={{ fontFamily: sans, fontSize: 15, color: T.fgSec, lineHeight: 1.85 }}>
          Outside of engineering, I shoot wildlife with a Nikon Z8. The patience required to photograph
          a bird in flight at 500mm is the same patience that makes a good engineering leader.
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

import React from 'react';
import { T, mono, sans, serif } from '../tokens.js';
import Cursor from '../components/Cursor.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import useGitHub from '../hooks/useGitHub.js';

export default function ProjectsPage() {
  const { repos, loading } = useGitHub();

  return (
    <div className="page-pad" style={{ maxWidth: 720, margin: '0 auto', padding: '88px 32px 100px' }}>
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: T.fgMute, marginBottom: 12 }}>// projects</div>
        <h1 style={{ fontFamily: serif, fontWeight: 300, fontSize: 48, color: T.fg, lineHeight: 1.1, marginBottom: 10 }}>
          Things I've built
        </h1>
        <p style={{ fontFamily: sans, fontSize: 14, color: T.fgSec, lineHeight: 1.7 }}>
          Side projects, experiments, tools. More at{' '}
          <a href="https://github.com/varunkumar" target="_blank" rel="noopener noreferrer" style={{ color: T.gold }}>github/varunkumar</a>.
        </p>
      </div>
      {loading
        ? <div style={{ fontFamily: mono, fontSize: 13, color: T.fgMute }}>fetching<Cursor /></div>
        : <div className="fade-up fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 7 }}>
            {repos.map(r => <ProjectCard key={r.id} repo={r} />)}
          </div>
      }
    </div>
  );
}

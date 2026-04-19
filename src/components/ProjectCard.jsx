import React from 'react';
import { T, mono, sans } from '../tokens.js';

function timeAgo(dateStr) {
  const months = Math.floor(
    (Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24 * 30)
  );
  if (months < 1) return 'this month';
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function ProjectCard({ repo }) {
  const [hov, setHov] = React.useState(false);

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        padding: '18px 20px',
        background: hov ? T.raised : 'transparent',
        border: `1px solid ${hov ? T.borderLt : T.border}`,
        borderRadius: 6,
        transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 12,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: 12,
            color: hov ? T.goldHov : T.gold,
            transition: 'color 150ms',
          }}
        >
          {repo.name}
        </span>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          {repo.stargazers_count > 0 && (
            <span style={{ fontFamily: mono, fontSize: 9, color: T.fgMute }}>
              ★ {repo.stargazers_count}
            </span>
          )}
          <span style={{ fontFamily: mono, fontSize: 9, color: T.fgMute }}>
            {timeAgo(repo.updated_at)}
          </span>
        </div>
      </div>
      <p
        style={{
          fontFamily: sans,
          fontSize: 13,
          color: T.fgSec,
          lineHeight: 1.65,
          marginBottom: 10,
        }}
      >
        {repo.description}
      </p>
      {repo.language && (
        <span
          style={{
            fontFamily: mono,
            fontSize: 9,
            color: T.fgMute,
            border: `1px solid ${T.border}`,
            borderRadius: 2,
            padding: '2px 7px',
            letterSpacing: '0.04em',
          }}
        >
          {repo.language}
        </span>
      )}
    </a>
  );
}

import React from 'react';
import Divider from '../components/Divider.jsx';
import usePosts from '../hooks/usePosts.js';
import { T, mono, sans, serif } from '../tokens.js';

function PostRow({ post }) {
  const [hov, setHov] = React.useState(false);
  return (
    <a
      href={post.url}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ display: 'block', padding: '18px 0', textDecoration: 'none' }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between', gap: 24 }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: serif,
              fontSize: 20,
              fontWeight: 400,
              lineHeight: 1.3,
              color: hov ? T.fg : T.fgSec,
              transition: 'color 150ms',
              marginBottom: 5,
            }}
          >
            {post.title}
          </div>
          <p
            style={{
              fontFamily: sans,
              fontSize: 13,
              color: T.fgMute,
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            {post.tags.map((t) => (
              <a
                key={t}
                href={`/writing/tags/${t}/`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  color: T.fgMute,
                  border: `1px solid ${T.border}`,
                  padding: '2px 7px',
                  borderRadius: 2,
                  textDecoration: 'none',
                }}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            color: T.fgMute,
            flexShrink: 0,
            textAlign: 'right',
            lineHeight: 1.9,
          }}
          title={post.rawDate}
        >
          {post.date}
        </div>
      </div>
    </a>
  );
}

export default function WritingPage() {
  const { posts } = usePosts();
  return (
    <div
      className="page-pad"
      style={{ maxWidth: 680, margin: '0 auto', padding: '88px 32px 100px' }}
    >
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 12,
            color: T.fgMute,
            marginBottom: 12,
          }}
        >
          {'// writing'}
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 300,
            fontSize: 48,
            color: T.fg,
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          Things I think about
        </h1>
        <p
          style={{
            fontFamily: sans,
            fontSize: 14,
            color: T.fgSec,
            lineHeight: 1.7,
          }}
        >
          Engineering, leadership, craft, and field reports from the forest.
        </p>
      </div>
      <Divider />
      {posts.map((p, i) => (
        <React.Fragment key={i}>
          <div className={`fade-up fade-up-${i + 2}`}>
            <PostRow post={p} />
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
}

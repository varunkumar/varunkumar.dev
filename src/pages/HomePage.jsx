import React from 'react';
import ContribGraph from '../components/ContribGraph.jsx';
import Cursor from '../components/Cursor.jsx';
import Divider from '../components/Divider.jsx';
import InstagramSection from '../components/InstagramSection.jsx';
import PhotoCTA from '../components/PhotoCTA.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import SocialRow from '../components/SocialRow.jsx';
import { POSTS } from '../data/posts.js';
import useGitHub from '../hooks/useGitHub.js';
import useTypewriter from '../hooks/useTypewriter.js';
import { T, mono, sans, serif } from '../tokens.js';

const BIO_TEXT = `Software engineer · Engineering leader · Hacker · Wildlife photographer.`;

function PostRow({ post }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: '18px 0', cursor: 'pointer' }}
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
              <span
                key={t}
                style={{
                  fontFamily: mono,
                  fontSize: 9,
                  color: T.fgMute,
                  border: `1px solid ${T.border}`,
                  padding: '2px 7px',
                  borderRadius: 2,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 9,
            color: T.fgMute,
            flexShrink: 0,
            textAlign: 'right',
            lineHeight: 1.9,
          }}
        >
          {post.date}
          <br />
          {post.mins}m read
        </div>
      </div>
    </div>
  );
}

function TypewriterBio() {
  const { displayed, done } = useTypewriter(BIO_TEXT, 18, 600);
  return (
    <p
      style={{
        fontFamily: sans,
        fontSize: 15,
        color: T.fgSec,
        lineHeight: 1.8,
        maxWidth: 500,
        marginBottom: 26,
        minHeight: '6em',
      }}
    >
      {displayed}
      {!done && (
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 14,
            background: T.fgMute,
            borderRadius: 1,
            verticalAlign: 'middle',
            marginLeft: 2,
          }}
        />
      )}
    </p>
  );
}

export default function HomePage({ setActive, isDark }) {
  const { repos, loading } = useGitHub();

  return (
    <div
      className="page-pad"
      style={{ maxWidth: 700, margin: '0 auto', padding: '88px 32px 100px' }}
    >
      {/* Hero */}
      <section className="fade-up fade-up-1" style={{ marginBottom: 60 }}>
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 300,
            fontSize: 'clamp(52px,8vw,80px)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: T.fg,
            marginBottom: 4,
          }}
        >
          Varunkumar
        </h1>
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(52px,8vw,80px)',
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: T.fgSec,
            marginBottom: 28,
          }}
        >
          Nagarajan
        </h1>
        <div
          style={{
            fontFamily: serif,
            fontStyle: 'italic',
            fontSize: 18,
            color: T.fgMute,
            marginBottom: 28,
            letterSpacing: '0.01em',
          }}
        >
          I am what I am.
        </div>
        <TypewriterBio />
        <SocialRow />
      </section>

      {/* Writing preview */}
      <section className="fade-up fade-up-2" style={{ marginBottom: 56 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <SectionLabel>recent writing</SectionLabel>
          <button
            onClick={() => setActive('writing')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: mono,
              fontSize: 10,
              color: T.gold,
              transition: 'color 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.goldHov)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.gold)}
          >
            view all →
          </button>
        </div>
        <Divider />
        {POSTS.map((p, i) => (
          <React.Fragment key={i}>
            <PostRow post={p} />
            <Divider />
          </React.Fragment>
        ))}
        <div
          style={{
            paddingTop: 12,
            fontFamily: mono,
            fontSize: 9,
            color: T.fgMute,
          }}
        >
          blog.varunkumar.dev
        </div>
      </section>

      {/* GitHub contributions */}
      <section className="fade-up fade-up-3" style={{ marginBottom: 56 }}>
        <ContribGraph isDark={isDark} />
      </section>

      {/* Projects */}
      <section className="fade-up fade-up-5" style={{ marginBottom: 56 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <SectionLabel>projects</SectionLabel>
          <a
            href="https://github.com/varunkumar"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: mono,
              fontSize: 10,
              color: T.gold,
              transition: 'color 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.goldHov)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.gold)}
          >
            github/varunkumar →
          </a>
        </div>
        {loading ? (
          <div style={{ fontFamily: mono, fontSize: 12, color: T.fgMute }}>
            fetching repos
            <Cursor />
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
              gap: 7,
            }}
          >
            {repos.map((r) => (
              <ProjectCard key={r.id} repo={r} />
            ))}
          </div>
        )}
      </section>

      {/* Instagram */}
      <section className="fade-up fade-up-6" style={{ marginBottom: 56 }}>
        <InstagramSection />
      </section>

      {/* Photography CTA */}
      <section style={{ marginBottom: 20 }}>
        <PhotoCTA />
      </section>

      {/* Talks */}
      <section style={{ marginBottom: 20 }}>
        <div
          style={{
            background: T.raised,
            border: `1px solid ${T.border}`,
            borderRadius: 6,
            padding: '24px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: serif,
                fontSize: 26,
                fontWeight: 300,
                color: T.fg,
                marginBottom: 6,
              }}
            >
              Talks &amp; Slides
            </div>
            <div
              style={{
                fontFamily: sans,
                fontSize: 13,
                color: T.fgSec,
                lineHeight: 1.7,
                maxWidth: 360,
                marginBottom: 14,
              }}
            >
              All my conference talks, workshop decks, and presentations in one
              place.
            </div>
            <a
              href="https://slides.varunkumar.dev"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: mono,
                fontSize: 11,
                color: T.gold,
                borderBottom: '1px solid rgba(212,137,10,0.3)',
                paddingBottom: 1,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.goldHov)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.gold)}
            >
              slides.varunkumar.dev →
            </a>
          </div>
        </div>
      </section>

      <footer
        style={{
          marginTop: 72,
          paddingTop: 24,
          borderTop: `1px solid ${T.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: mono,
          fontSize: 9,
          color: T.fgMute,
        }}
      >
        <span>© 2025 varunkumar nagarajan</span>
        <span>Chennai, India</span>
      </footer>
    </div>
  );
}

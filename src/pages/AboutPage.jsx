import Divider from '../components/Divider.jsx';
import { T, mono, sans, serif } from '../tokens.js';

const CAREER_YEARS = Math.floor(
  (Date.now() - new Date(2008, 5).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
);
const LEADER_YEARS = Math.floor(
  (Date.now() - new Date(2015, 6).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
);

const ABOUT_ITEMS = [
  { k: 'currently', v: 'Senior leadership at Arcesium India Private Limited' },
  { k: 'role', v: 'Senior Vice President of Technology' },
  {
    k: 'before',
    v: 'Started with D. E. Shaw India Software Private Limited in 2008',
  },
  {
    k: 'interests',
    v: 'Distributed systems · AI/ML · Cloud computing (AWS) · Web development',
  },
  {
    k: 'building',
    v: 'Large-scale distributed systems, engineering teams, and innovation culture',
  },
  {
    k: 'shooting',
    v: 'Nikon Z8 · 200-500mm f/5.6 · 70-200mm f/2.8 · Mammals, birds, landscapes and sometimes humans',
  },
  {
    k: 'education',
    v: 'PSG College of Technology — Integrated M.S. Software Engineering · Gold medalist · 9.86/10',
  },
  { k: 'location', v: 'Chennai, India' },
  { k: 'contact', v: 'varunkumar [dot] n [at] gmail [dot] com' },
];

export default function AboutPage() {
  return (
    <div
      className="page-pad"
      style={{ maxWidth: 660, margin: '0 auto', padding: '88px 32px 100px' }}
    >
      <div className="fade-up fade-up-1" style={{ marginBottom: 44 }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 10,
            color: T.fgMute,
            marginBottom: 12,
          }}
        >
          {'// me'}
        </div>
        <h1
          style={{
            fontFamily: serif,
            fontWeight: 300,
            fontSize: 48,
            color: T.fg,
            lineHeight: 1.1,
            marginBottom: 22,
          }}
        >
          Varunkumar Nagarajan
        </h1>
        <div
          style={{
            fontFamily: serif,
            fontStyle: 'italic',
            fontSize: 18,
            color: T.fgMute,
            marginBottom: 22,
            letterSpacing: '0.01em',
          }}
        >
          I am what I am.
        </div>
        <p
          style={{
            fontFamily: sans,
            fontSize: 15,
            color: T.fgSec,
            lineHeight: 1.85,
            marginBottom: 18,
          }}
        >
          A seasoned software engineer with {CAREER_YEARS}+ years of experience
          building large-scale distributed systems, and an engineering leader
          who has taken products from zero to one in the FinTech space.
        </p>
        <p
          style={{
            fontFamily: sans,
            fontSize: 15,
            color: T.fgSec,
            lineHeight: 1.85,
            marginBottom: 18,
          }}
        >
          My technical interests span distributed systems, applied AI, cloud
          infrastructure, and web development. I&apos;ve been organising
          hackathons and innovation forums at work since 2012. On the
          competitive side, I&apos;ve been a consistent winner at hackathons
          across companies, from Yahoo! Hack Days to the Google Cloud Serverless
          Hackathon and multiple Arcesium grand prizes.
        </p>
        <p
          style={{
            fontFamily: sans,
            fontSize: 15,
            color: T.fgSec,
            lineHeight: 1.85,
            marginBottom: 18,
          }}
        >
          More recently, I&apos;ve gone deep into the agentic AI wave. I run a
          personal multi-agent system called the{' '}
          <a
            href="https://slides.varunkumar.dev/hacking-habits/#slide20"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: T.gold,
              borderBottom: '1px solid rgba(212,137,10,0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.goldHov)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.gold)}
          >
            Snake Squad
          </a>
          : six specialized agents (Naga, Viper, Cobra, Boa, Krait, and Momba)
          that handle everything from architecture reviews and code reviews to
          school homework and daily feeds. Naga is Chief of Staff and keeps the
          rest of the squad on task.
        </p>
        <p
          style={{
            fontFamily: sans,
            fontSize: 15,
            color: T.fgSec,
            lineHeight: 1.85,
          }}
        >
          Outside of engineering, I shoot wildlife with a Nikon Z8. The patience
          required to photograph a bird in flight at 500mm is the same patience
          that makes a good engineering leader.
        </p>
      </div>
      <Divider />
      {ABOUT_ITEMS.map(({ k, v }) => (
        <div
          key={k}
          style={{
            display: 'grid',
            gridTemplateColumns: '110px 1fr',
            gap: 16,
            padding: '14px 0',
            borderBottom: `1px solid ${T.border}`,
            fontFamily: mono,
            fontSize: 12,
          }}
        >
          <span style={{ color: T.mono }}>{k}</span>
          <span style={{ color: T.fg, lineHeight: 1.65 }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

import React from 'react';
import { T, mono } from '../tokens.js';
import Cursor from './Cursor.jsx';
import BrewingLabel from './BrewingLabel.jsx';

/* ── pixel-art mascot ─────────────────────────────────────── */
const C = '#d4502a';
const _ = null;
const PX = 2;

// 7 rows × 8 cols → 14px tall, 16px wide
// prettier-ignore
const GRID = [
  [_,_,C,C,C,C,_,_],  // head
  [_,_,C,C,C,C,_,_],  // head
  [C,C,C,C,C,C,C,C],  // arms
  [_,_,C,C,C,C,_,_],  // body
  [_,_,C,C,C,C,_,_],  // waist
  [_,C,C,_,_,C,C,_],  // legs
  [_,C,C,_,_,C,C,_],  // feet
];

const W = GRID[0].length * PX; // 16
const H = GRID.length * PX;    // 14

const WALK_CSS = `
  @keyframes ccPos {
    0%   { left: 0; }
    100% { left: calc(100% - ${W}px); }
  }
  @keyframes ccFlip {
    0%,  49.9% { transform: scaleX(1);  }
    50%, 100%  { transform: scaleX(-1); }
  }
  @keyframes ccBob {
    0%, 100% { transform: translateY(0);    }
    50%      { transform: translateY(-2px); }
  }
  @keyframes ccLegA {
    0%, 100% { transform: translateY(0);    }
    50%      { transform: translateY(-3px); }
  }
  .cc-walk-track { display: none; }
  @media (min-width: 600px) { .cc-walk-track { display: block; } }
  .cc-static { display: none; }
  @media (max-width: 599px) { .cc-static { display: inline-flex; } }
`;

const WALK_DURATION = 5;

function WalkingMascot() {
  const legLCols = new Set([1, 2]);
  const legRCols = new Set([5, 6]);
  const armLCols = new Set([0, 1]);
  const armRCols = new Set([6, 7]);

  const pixels = GRID.map((row, ri) =>
    row.map((color, ci) => {
      if (!color) return null;
      const isLegL = ri >= 5 && legLCols.has(ci);
      const isLegR = ri >= 5 && legRCols.has(ci);
      const isArmL = ri === 2 && armLCols.has(ci);
      const isArmR = ri === 2 && armRCols.has(ci);
      let anim;
      if (isLegL || isArmR) anim = `ccLegA 0.35s ease-in-out infinite`;
      else if (isLegR || isArmL) anim = `ccLegA 0.35s ease-in-out infinite 0.175s`;
      return (
        <rect
          key={`${ri}-${ci}`}
          x={ci * PX} y={ri * PX}
          width={PX} height={PX}
          fill={color}
          style={anim ? { animation: anim } : undefined}
        />
      );
    })
  );

  return (
    <>
      <style>{WALK_CSS}</style>

      {/* Mobile: static mascot beside the label */}
      <span className="cc-static" style={{ alignItems: 'center', marginLeft: 8, flexShrink: 0 }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
          {GRID.map((row, ri) =>
            row.map((color, ci) =>
              color ? (
                <rect key={`s-${ri}-${ci}`} x={ci * PX} y={ri * PX} width={PX} height={PX} fill={color} />
              ) : null
            )
          )}
        </svg>
      </span>

      {/* Desktop: walk track — rendered inside the graph wrapper, mascot sits on the top border */}
      <div
        className="cc-walk-track"
        style={{
          position: 'absolute',
          top: 0,
          left: 18,
          right: 18,
          height: H,
          transform: `translateY(-${H}px)`,
        }}
      >
        {/* position layer */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: W,
          animation: `ccPos ${WALK_DURATION}s linear infinite alternate`,
        }}>
          {/* flip layer */}
          <div style={{
            animation: `ccFlip ${WALK_DURATION * 2}s linear infinite`,
            transformOrigin: `${W / 2}px ${H / 2}px`,
          }}>
            <svg
              width={W} height={H}
              viewBox={`0 0 ${W} ${H}`}
              style={{ display: 'block', animation: `ccBob 0.35s ease-in-out infinite` }}
            >
              {pixels}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── ContribGraph ─────────────────────────────────────────── */
export default function ContribGraph({ isDark }) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div style={{ marginBottom: 6 }}>
      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
      }}>
        <BrewingLabel />
        <a
          href="https://github.com/varunkumar"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: mono,
            fontSize: 10,
            color: T.gold,
            transition: 'color 150ms',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.goldHov)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.gold)}
        >
          github/varunkumar →
        </a>
      </div>

      {/* Graph container — mascot walks on top of its border */}
      <div style={{ position: 'relative' }}>
        <WalkingMascot />
        <div
          style={{
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 6,
            padding: '16px 18px',
            overflow: 'hidden',
            position: 'relative',
            minHeight: 96,
          }}
        >
          {!loaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: mono,
                fontSize: 11,
                color: T.fgMute,
              }}
            >
              loading
              <Cursor />
            </div>
          )}
          <img
            className={`contrib-img ${isDark ? 'dark' : 'light'}`}
            src="https://ghchart.rshah.org/22c55e/varunkumar"
            alt="GitHub contributions"
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? 'block' : 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

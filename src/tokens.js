export const DARK = {
  bg: '#0c0c0f',
  surface: '#18181b',
  raised: '#1f1f23',
  border: 'rgba(255,255,255,0.08)',
  borderLt: 'rgba(255,255,255,0.16)',
  fg: '#fafafa',
  fgSec: '#d4d4d8',
  fgMute: '#71717a',
  gold: '#36a7f5',
  goldHov: '#60bcff',
  mono: '#22c55e',
  monoDk: '#16a34a',
  isDark: true,
};

export const LIGHT = {
  bg: '#f4f4f5',
  surface: '#ffffff',
  raised: '#ffffff',
  border: 'rgba(0,0,0,0.08)',
  borderLt: 'rgba(0,0,0,0.16)',
  fg: '#18181b',
  fgSec: '#3f3f46',
  fgMute: '#71717a',
  gold: '#1a7ac4',
  goldHov: '#2d8fd8',
  mono: '#16a34a',
  monoDk: '#14532d',
  isDark: false,
};

// Mutable reference — App.jsx calls Object.assign(T, DARK|LIGHT) before re-render.
// All components read from T directly (no prop drilling, no context).
export const T = { ...DARK };

export const sans = "'DM Sans', sans-serif";
export const serif = "'Cormorant Garamond', serif";
export const mono = "'JetBrains Mono', monospace";

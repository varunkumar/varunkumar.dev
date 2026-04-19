export const DARK = {
  bg:      '#0d0d0b',
  surface: '#151512',
  raised:  '#1e1d18',
  border:  '#2a2820',
  borderLt:'#3a3830',
  fg:      '#e8e4dc',
  fgSec:   '#9a9288',
  fgMute:  '#555048',
  gold:    '#d4890a',
  goldHov: '#e8a020',
  mono:    '#6a9e68',
  monoDk:  '#3a6e38',
  isDark:  true,
};

export const LIGHT = {
  bg:      '#f5f2ec',
  surface: '#edeae3',
  raised:  '#e4e1d9',
  border:  '#d2cfc7',
  borderLt:'#b8b5ad',
  fg:      '#1a1814',
  fgSec:   '#4a4640',
  fgMute:  '#9a9690',
  gold:    '#a86a00',
  goldHov: '#c07800',
  mono:    '#2d7a2b',
  monoDk:  '#1a5a18',
  isDark:  false,
};

// Mutable reference — App.jsx calls Object.assign(T, DARK|LIGHT) before re-render.
// All components read from T directly (no prop drilling, no context).
export const T = { ...DARK };

export const sans  = "'DM Sans', sans-serif";
export const serif = "'Cormorant Garamond', serif";
export const mono  = "'JetBrains Mono', monospace";

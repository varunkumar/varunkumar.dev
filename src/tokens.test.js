import { describe, expect, it } from 'vitest';
import { DARK, LIGHT, T } from './tokens.js';

describe('theme tokens', () => {
  it('keeps DARK and LIGHT on the same key set', () => {
    expect(Object.keys(DARK).sort()).toEqual(Object.keys(LIGHT).sort());
  });

  it('marks palettes with opposite isDark flags', () => {
    expect(DARK.isDark).toBe(true);
    expect(LIGHT.isDark).toBe(false);
  });

  it('starts the mutable T reference as a copy of DARK', () => {
    expect(T).toEqual(DARK);
    expect(T).not.toBe(DARK);
  });
});

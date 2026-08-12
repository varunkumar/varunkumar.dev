import { describe, expect, it } from 'vitest';
import { pageFromPath } from './routing.js';

describe('pageFromPath', () => {
  it('maps the site root to home', () => {
    expect(pageFromPath('/')).toBe('home');
  });

  it('maps known first path segments to their pages', () => {
    expect(pageFromPath('/projects')).toBe('projects');
    expect(pageFromPath('/about')).toBe('about');
  });

  it('treats unknown paths as home', () => {
    expect(pageFromPath('/writing')).toBe('home');
    expect(pageFromPath('/writing/')).toBe('home');
    expect(pageFromPath('/not-a-page')).toBe('home');
  });
});

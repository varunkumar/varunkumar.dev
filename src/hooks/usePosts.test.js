import { describe, expect, it } from 'vitest';
import { formatDate } from './usePosts.js';

const NOW = Date.parse('2026-08-12T12:00:00Z');

describe('formatDate', () => {
  it('uses minutes, hours, and days for recent timestamps', () => {
    expect(formatDate('2026-08-12T11:40:00Z', NOW)).toBe('20 minutes ago');
    expect(formatDate('2026-08-12T09:00:00Z', NOW)).toBe('3 hours ago');
    expect(formatDate('2026-08-10T12:00:00Z', NOW)).toBe('2 days ago');
  });

  it('steps up to weeks, months, and years', () => {
    expect(formatDate('2026-07-29T12:00:00Z', NOW)).toBe('2 weeks ago');
    expect(formatDate('2026-06-12T12:00:00Z', NOW)).toBe('2 months ago');
    expect(formatDate('2024-08-12T12:00:00Z', NOW)).toBe('2 years ago');
  });
});

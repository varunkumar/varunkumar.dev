import { describe, expect, it } from 'vitest';
import { pickProjects, selectPinned } from './selectPinned.js';

const repos = [
  { name: 'zero', pushed_at: '2026-08-01T00:00:00Z' },
  { name: 'mascot-kit', pushed_at: '2026-08-10T00:00:00Z' },
  { name: 'other', pushed_at: '2026-07-01T00:00:00Z' },
];

describe('selectPinned', () => {
  it('keeps pinned order and drops names that are not in the payload', () => {
    expect(
      selectPinned(repos, ['zero', 'missing', 'mascot-kit']).map((r) => r.name)
    ).toEqual(['zero', 'mascot-kit']);
  });

  it('sorts by pushed_at when sortByActivity is set', () => {
    expect(
      selectPinned(repos, ['zero', 'mascot-kit'], {
        sortByActivity: true,
      }).map((r) => r.name)
    ).toEqual(['mascot-kit', 'zero']);
  });

  it('returns an empty list when GitHub returns a rate-limit object', () => {
    expect(
      selectPinned({ message: 'API rate limit exceeded' }, ['zero'])
    ).toEqual([]);
  });
});

describe('pickProjects', () => {
  const live = [
    {
      id: 1,
      name: 'zero',
      html_url: 'https://github.com/varunkumar/zero',
      description: 'live desc',
      language: 'TypeScript',
      stargazers_count: 4,
      pushed_at: '2026-08-12T00:00:00Z',
    },
  ];
  const snapshot = [
    {
      id: 1,
      name: 'zero',
      html_url: 'https://github.com/varunkumar/zero',
      description: 'stale desc',
      language: 'TypeScript',
      stargazers_count: 1,
      pushed_at: '2026-07-01T00:00:00Z',
    },
  ];

  it('prefers live GitHub data when pinned repos are present', () => {
    expect(pickProjects(live, snapshot, ['zero'])[0].description).toBe(
      'live desc'
    );
  });

  it('falls back to the build snapshot when live data is unusable', () => {
    expect(
      pickProjects({ message: 'API rate limit exceeded' }, snapshot, [
        'zero',
      ])[0].description
    ).toBe('stale desc');
    expect(pickProjects(null, snapshot, ['zero'])[0].description).toBe(
      'stale desc'
    );
  });
});

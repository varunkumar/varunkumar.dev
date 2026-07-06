import { useEffect, useState } from 'react';

// Curated list — only these repos appear on the site.
// Set to [] to fall back to auto-sort (stars + recency, top 6 non-fork repos with descriptions).
const PINNED = [
  'claude-sync',
  'lightroom-mcp',
  'parentsalarm-alert',
  'baby-track',
  'camlio',
  'bring-back-my-workspace',
  'google-input-tools',
  'pup-pad',
  'create-env-action',
  'gitlab-mr-mcp',
  'atlassian-mcp',
  'cloudfront-log-viewer',
  'pixdex',
  'terso',
  'arduino-game-controller',
  'tamil-wordle',
  'claudebox',
];

export default function useGitHub(
  username = 'varunkumar',
  { sortByActivity = false } = {}
) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { cache: 'no-store' }
    )
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then((data) => {
        let filtered;
        if (PINNED.length > 0) {
          filtered = PINNED.map((name) =>
            data.find((r) => r.name.toLowerCase() === name.toLowerCase())
          )
            .filter(Boolean)
            .sort((a, b) =>
              sortByActivity ? new Date(b.pushed_at) - new Date(a.pushed_at) : 0
            );
        } else {
          filtered = data
            .filter((r) => !r.fork && r.description)
            .sort(
              (a, b) =>
                b.stargazers_count - a.stargazers_count ||
                new Date(b.updated_at) - new Date(a.updated_at)
            )
            .slice(0, 6);
        }
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username, sortByActivity]);

  return { repos, loading };
}

import { useState, useEffect } from 'react';

// Curated list — only these repos appear on the site.
// Set to [] to fall back to auto-sort (stars + recency, top 6 non-fork repos with descriptions).
const PINNED = [
  'pixdex',
  'terso',
  'mcp-gitlab',
  'vscode-google-input-tools',
  'github-action-create-env-file',
  'aws-cloudfront-log-viewer',
];

export default function useGitHub(username = 'varunkumar') {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        let filtered;
        if (PINNED.length > 0) {
          filtered = PINNED
            .map(name => data.find(r => r.name === name))
            .filter(Boolean);
        } else {
          filtered = data
            .filter(r => !r.fork && r.description)
            .sort((a, b) =>
              (b.stargazers_count - a.stargazers_count) ||
              (new Date(b.updated_at) - new Date(a.updated_at))
            )
            .slice(0, 6);
        }
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return { repos, loading };
}

import { useState, useEffect } from 'react';

export default function useGitHub(username = 'varunkumar') {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        const filtered = data
          .filter(r => !r.fork && r.description)
          .sort((a, b) =>
            (b.stargazers_count - a.stargazers_count) ||
            (new Date(b.updated_at) - new Date(a.updated_at))
          )
          .slice(0, 6);
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  return { repos, loading };
}

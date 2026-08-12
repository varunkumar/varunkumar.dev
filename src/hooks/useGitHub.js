import { useEffect, useState } from 'react';
import { PINNED } from '../data/pinned.js';
import { pickProjects } from '../github/selectPinned.js';

const GITHUB_REPOS =
  'https://api.github.com/users/varunkumar/repos?sort=updated&per_page=100';

function readJson(url) {
  return fetch(url)
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null);
}

export default function useGitHub({ sortByActivity = false } = {}) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([readJson(GITHUB_REPOS), readJson('/projects.json')]).then(
      ([live, snapshot]) => {
        if (cancelled) return;
        setRepos(pickProjects(live, snapshot, PINNED, { sortByActivity }));
        setLoading(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, [sortByActivity]);

  return { repos, loading };
}

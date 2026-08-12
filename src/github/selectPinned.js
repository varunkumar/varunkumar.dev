export function selectPinned(repos, pinned, { sortByActivity = false } = {}) {
  if (!Array.isArray(repos)) return [];
  const filtered = pinned
    .map((name) =>
      repos.find((r) => r.name.toLowerCase() === name.toLowerCase())
    )
    .filter(Boolean);
  if (sortByActivity) {
    filtered.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
  }
  return filtered;
}

export function pickProjects(live, snapshot, pinned, options) {
  const fromLive = selectPinned(live, pinned, options);
  if (fromLive.length) return fromLive.map(slimRepo);
  return selectPinned(snapshot, pinned, options).map(slimRepo);
}

export function slimRepo(repo) {
  return {
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    pushed_at: repo.pushed_at,
  };
}

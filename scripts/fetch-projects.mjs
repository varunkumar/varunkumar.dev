import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PINNED } from '../src/data/pinned.js';
import { selectPinned, slimRepo } from '../src/github/selectPinned.js';

const DEST = path.resolve(process.cwd(), 'public/projects.json');
const USER = 'varunkumar';

function existingSnapshot() {
  try {
    return JSON.parse(fs.readFileSync(DEST, 'utf8'));
  } catch {
    return null;
  }
}

export async function fetchProjects() {
  const headers = { Accept: 'application/vnd.github+json' };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`GitHub ${res.status}`);
  }
  const data = await res.json();
  return selectPinned(data, PINNED).map(slimRepo);
}

export async function writeProjects() {
  try {
    const projects = await fetchProjects();
    fs.writeFileSync(DEST, JSON.stringify(projects, null, 2) + '\n');
    console.log(`Wrote ${projects.length} projects to public/projects.json`);
    return projects;
  } catch (err) {
    const fallback = existingSnapshot();
    if (Array.isArray(fallback) && fallback.length) {
      console.warn(
        `GitHub fetch failed (${err.message}); keeping existing public/projects.json`
      );
      return fallback;
    }
    throw err;
  }
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  writeProjects().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

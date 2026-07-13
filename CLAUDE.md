# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Design System

When the user updates the design at claude.ai/design and exports a handoff bundle, read `docs/design-handoff.md` for the exact steps.

Design token reference (colors, fonts) lives in `docs/design-system.md`. **Accent convention:** `gold`/`goldHov` tokens are blue, `mono` is green — don't assume the names match the rendered colors.

## Overview

Personal site for Varunkumar Nagarajan at `varunkumar.dev`. Built with React + Vite. Deployed to Cloudflare Pages — Vite builds `src/` to `dist/`, which Cloudflare Pages serves from the `main` branch.

Dev/build/lint commands: see `docs/development.md`.

## Architecture

Entry points, routing, theming, and the key-files map: see `docs/architecture.md`.

## Integrations

- **GitHub contributions:** Image from `https://ghchart.rshah.org/22c55e/varunkumar` — public, no auth. Fetched fresh on each page load.
- **GitHub projects:** Public API `https://api.github.com/users/varunkumar/repos?sort=updated&per_page=20` — no auth, 60 req/hr rate limit.
- **Instagram:** Placeholder grid until an Instagram Basic Display API OAuth token is connected. See `src/data/instagram.js` and `src/components/InstagramSection.jsx`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

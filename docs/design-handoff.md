# Design handoff workflow

The visual design lives at **[claude.ai/design — varunkumar.dev project](https://api.anthropic.com/v1/design/h/3EhV9wl8dNT84pSYAU9EuA?open_file=index.html)**.

When the user updates the design there and exports a handoff bundle:

1. Fetch that URL.
2. Decompress the `.tar.gz`.
3. Read `project/index.html` and `chats/chat1.md`.
4. Port the relevant changes into the React codebase.

## Why

The owner, 17 November: "Build your client" is OpenTodo's initiative for developers, and they want to see it on the site now. Everything a client needs is in the released docs (the REST API, the sync protocol, webhooks, MCP), but nothing gathers it for someone who wants to build one, and there is no place to show the clients people build.

## What Changes

- A page at `/build/`, "Build your own client", with:
  - three ways in: the REST API, the sync protocol, webhooks and MCP;
  - where to start: how a client signs in (an API token; there is no sign-in flow for other apps), the client guide and the OpenAPI description;
  - the clients to learn from: `ot`, the Obsidian plugin, the n8n nodes, the browser extension and the Home Assistant integration, each with what it uses and its source;
  - community clients, from a committed list (`src/data/community-clients.json`) that anyone can add to by pull request, each marked "Not vetted by OpenTodo". It says "None yet" while the list is empty.
- The guide and the OpenAPI description are on main but not in a release. They are linked on GitHub and labelled "On GitHub, not in a release yet"; the guide links its docs page once the pinned bundle has it.
- Under the hood ("Build on it"), Ecosystem and the footer's Learn group link the page.

## Capabilities

### Modified Capabilities

- `marketing-website`: a new requirement, "Build your own client page".

## Impact

- `src/pages/build.astro`, `src/data/community-clients.json` (empty), one line each in Under the hood, Ecosystem and the footer, a footer label in English and German, a line of CSS, a test.
- No dependency, no script, no call to GitHub at build time.

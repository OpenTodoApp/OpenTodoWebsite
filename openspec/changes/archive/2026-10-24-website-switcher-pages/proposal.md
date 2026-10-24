# Proposal

## Why

OpenTodo competes with Todoist, Things and Linear, but the website talks to the people who would run a server, not the people who would switch: "op log", "hybrid logical clock" and `curl` appear near the top of the home page. The competitors sell an outcome (clarity, calm, speed) and make switching feel safe. Our strongest proof, the live interactive demo in the hero, is buried under architecture. Visitors who arrive from "Todoist alternative" or "Things for Android" searches find no page that answers their question. This change rebuilds the site's message and adds the pages switchers look for.

## What Changes

- **Outcome-first home page:**
  - a hero that states the outcome ("clarity without the subscription")
  - the live demo kept as the centrepiece
  - an import strip ("Switch from Todoist, Things, TickTick or Linear")
  - the five differentiators: one server for the whole household, real offline, end-to-end encryption, your AI with your key, leave any time
  - real screenshots and the household angle
  - only a short teaser of how it works
- **Comparison pages:** `/vs/todoist`, `/vs/things` and `/vs/linear`, each with an honest feature table that includes what OpenTodo lacks, a "checked on" date, the cost difference in plain words, and a link to the matching switch guide. Text only, no competitor logos.
- **Audience pages:** `/self-host` takes today's technical content (sync demo, footprint, Docker, Coolify and the one-click installs). `/developers` takes the API, CLI, MCP, webhooks and specs.
- **Links to the switch guides.** The guides themselves are written in the app repository (`docs/switch/*.md`, app change `named-importers`) and arrive through the site bundle's docs. Comparison pages and the import strip link to them.
- **Professional visual baseline:**
  - icons from one line-icon set instead of emoji
  - the app's colour tokens and typeface
  - framed real screenshots in light and dark
  - every page works at phone width
- **Switch buttons follow the importers.** A "Switch from X" call to action appears only for apps whose import format is listed in the pinned bundle's feature manifest (app changes `named-importers` and `site-bundle`). Until then the strip links to the generic import guide.

## Out of scope

- The template gallery, method guides, toolkit, "what's new" pages and the content workflow. These belong to `website-content-hub`.
- The build platform, shared layout, content collections and checks. They come from `website-platform`, which this change builds on.
- Writing the switch guides (app repository).
- A hosted sign-up. The calls to action stay "Try the demo", "Self-host" and "Import".
- Any change to the app.

Advances no ROADMAP.md capability directly. It is the go-to-market half of the "replace commercial task apps" goal, alongside `named-importers`.

## Capabilities

### New Capabilities

- `marketing-website`: the public site's pages, message hierarchy, comparison honesty rules, calls to action, visual baseline, privacy and accessibility rules.

### Modified Capabilities

None.

## Impact

- **Website:** `src/pages/` (home rewritten, `vs/todoist`, `vs/things`, `vs/linear`, `self-host`, `developers`), `src/content/compare/` entries, components for comparison tables and framed screenshots.
- **Dependencies:** none beyond `website-platform`.
- **Coordination:** builds on `website-platform`. Switch buttons light up as the app's `named-importers` formats ship in a release bundle.

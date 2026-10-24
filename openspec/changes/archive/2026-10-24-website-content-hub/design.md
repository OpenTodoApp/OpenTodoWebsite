# Design

## Context

- **What this builds on.** `website-platform` provides Astro content collections, the bundle (docs, changelog, manifest, tokens), the layout and the checks. `website-switcher-pages` provides the screenshot frame component.
- **The importer.** The app accepts its own export format (`opentodo-export`, version 1) through Settings → Import and `POST /api/v1/import/preview` / `POST /api/v1/import`, recreating projects, sections, tasks, labels, reminders and views.
- **The container image.** The app publishes `ghcr.io/pixari/opentodo:<version>` per release.
- **Capacity.** The maintainer has little writing time but reviews a lot. Content is drafted by agents and approved in pull requests.

## Goals / Non-Goals

**Goals:**
- Every template and screenshot is generated from a definition in this repository and verified against the pinned release, so nothing silently rots.
- One review session every two weeks is enough to keep the site growing.

**Non-Goals:**
- Comments on articles, accounts, a newsletter service, or localisation.

## Decisions

### D1. Templates are defined once, generated twice
A template is a content entry `src/content/templates/<slug>.md`. Front matter holds the description, category and a compact tree (projects, sections, tasks with optional subtasks, labels, priority, recurrence, relative due offsets such as `+2d`). The body is the page's prose. A build script turns the tree into an `opentodo-export` v1 JSON file with deterministic ids (name-based UUIDs from the slug and path) and due dates relative to "today" at import, written as dates in the file at build time.

Alternative considered: hand-writing export JSON. Rejected because it's verbose, error-prone and breaks when the export format gains fields.

### D2. A CI job verifies templates and takes their screenshots
A GitHub Actions job starts `ghcr.io/pixari/opentodo:<pinned version>` as a service container with a fresh volume, then:
- creates the owner through the first-run API
- imports every generated template with the preview route and then the import route, failing on any `error` row
- opens each imported project in Playwright (the pinned Playwright Docker image, for stable fonts) and captures framed screenshots in light and dark

Screenshots are committed through a bot pull request when they change, and are never generated on the fly at deploy.

### D3. Guides, toolkit and essays as collections
Collections `guides`, `toolkit` and `essays`, each with required `lastReviewed`, `summary` and `sources[]` (docs paths of the pinned bundle). A remark plugin checks that sentences with capability claims carry a link. In practice, every link to `/docs/` is resolved against the bundle, and a lint flags paragraphs mentioning feature keywords without any docs link. Flagged paragraphs need either a link or an explicit `<!-- no-claim -->` marker, which is visible in review.

### D4. What's new and RSS
For each release in the bundle's `changelog.json`, a page `/whats-new/<version>` renders the sections, with screenshots when the release's shots differ. `@astrojs/rss` generates `/feed.xml` over guides, templates, essays and releases, newest first. The feed only includes releases present in the pinned bundle's changelog.

### D5. Voice guide, backlog and the drafting routine
- **`content/VOICE.md`:** tone (calm, concrete, honest), words to avoid, how to talk about competitors (factual, dated, gaps acknowledged), and claim rules.
- **`content/BACKLOG.md`:** an ordered list of next pieces, each with a working title, audience, the template it ships with and the docs it relies on.
- **Drafting routine:** an optional scheduled Claude Code routine runs every two weeks. It takes the top backlog item, drafts it following the voice guide, generates its template and screenshots through D1/D2 locally, runs the checks and opens a draft pull request with the preview link. The maintainer reviews and merges. Nothing auto-merges.

### D6. Previews for review
Every pull request deploys a preview, either a Coolify preview deployment or a static artefact. The PR description links it, so review happens on the rendered page.

## Risks / Trade-offs

- [Agent-written content sounds generic] → The voice guide, the maintainer's review, and a backlog of specific, useful pieces (each tied to a real template).
- [Templates drift from the importer] → D2 imports every template against the pinned release on each PR and bundle bump.
- [CI time] → The template job runs only when templates or the pinned version change (path filter), and takes a few minutes.
- [Page weight] → Static pages, responsive images, no extra scripts. The feed and pages add nothing to the app.

## Migration Plan

Additive: new collections and pages. Ship the launch set (about 10 templates, about 5 guides, the toolkit, two essays, and What's new for the pinned release), then turn on the routine. Rollback: remove pages. Nothing else depends on them.

## Open Questions

- Whether previews use Coolify preview deployments or a static artefact host. An operations choice that doesn't affect specs or tasks.

# Design

## Context

- **Builds on** `website-platform` (layout, checks, claim lint), `website-content-hub` (article collections, `ArticlePage`, `ArticleIndex`, templates), `website-switcher-pages` (comparisons, `switchLink`), `website-first-visit` (header groups, `/cost/`, `/about/`).
- **Research (todoist.com help centre, 15 October 2026):** four top-level areas, "Get started" with per-platform downloads, feature articles grouped by topic, troubleshooting as its own category with per-problem articles, an FAQ, and switch guides elsewhere on the site. The pattern that matters is task-based entry points written in the reader's words.
- **The pinned docs (0.3.0)** already contain every fact the new pages need: installing per platform, notifications per platform, sharing and invitations, import formats and columns, troubleshooting and FAQ, Docker, Coolify, backups, owner recovery. The new pages restate them for one task at a time and link each claim to its docs page, so nothing is said that the release does not do.
- **Specs:** `specs/website-help/spec.md`.

## Goals / Non-Goals

**Goals:**
- A visitor finds the answer to a task-shaped question within two clicks of any page.
- A Todoist, Things, TickTick or Linear user sees exactly how their tasks come across today, including what does not.
- Someone who has never run a server gets a path they can follow.
- Every page stays true at the next bundle pin: sources resolve, dates age out, figures come from the manifest.

**Non-Goals:**
- Replacing the docs. The docs stay the reference; the help layer points into them.
- Video.

## Decisions

### D1. Help landing, no scripts
`/help/` is one static page: three audience sections with anchors (`#use`, `#run`, `#build`) and a jump row at the top instead of tabs, so it works without JavaScript and every section is indexable. Each section is a list of "I want to…" lines linking a how-to, an install page, a guide or the docs. The docs search is linked, not embedded (it lives in the bundle's docs).

### D2. How-to collection
`src/content/howto/<slug>.md`, rendered at `/how-to/<slug>/`. Front matter extends the article schema with `group` (one of six, in `HOWTO_GROUPS`), `audience` (`user` or `operator`), `minutes`, an optional `shot` (a key of the bundle manifest, rendered with `ScreenshotFrame`; the page fails the build when the key is missing from the manifest) and `related` how-to slugs. The body follows one shape, enforced by review rather than code: a "What you need" list, numbered steps, and an "If it does not work" section. The claim lint runs on the body like on guides. The index groups by `group` in the fixed order.

### D3. Install pages from one data module
`src/lib/install.ts` holds the six platforms (iPhone and iPad, Android, Windows, Mac, Linux, ChromeOS) with their steps, the notification note, the share-sheet note and the "no install option" note, each with the docs anchor it comes from. `/install/[platform].astro` renders them; `/install/` lists them with the browser each needs. One module, so a change to the install docs is one edit. The pages are `.astro`, so the claim lint does not run on them; every line carries its docs link by construction.

### D4. Switch pages honest about today's importers
`src/content/switch/<app>.md`, rendered at `/switch/<app>/`. Front matter: `checkedOn` (180-day limit, like comparisons), `importFormat` (the named format the app change `named-importers` will ship), `terms` (the term map), `keeps` and `drops` (what comes across and what does not with the importers of the pinned release), `sources`. The page body gives the export steps for that app and the import steps in OpenTodo with the CSV columns the import reference documents. When `canImport(importFormat)` is true and the bundle's docs contain `/docs/switch/<app>/`, the page links that guide at the top as the one-step path; until then it says plainly that there is no one-step importer yet. `/switch/` carries the glossary (one table across the four apps) and the cards. The comparison pages link their switch page under the switch button, without changing the button (marketing-website spec).

### D5. FAQ as static content
`/faq/` is an `.astro` page with ten questions in `<details>` elements, open by default for reading without JavaScript (`open` attribute), each answer two or three sentences with a docs link. Questions: is it free, is there a hosted version, do I need a server to try it, can I use it alone, does my family need accounts, will reminders reach my iPhone, is there an app in the app stores, does it work offline, can I leave, what happens if the maintainer stops.

### D6. Toolkit pieces for first-time operators
Three entries in the existing `toolkit` collection: `your-first-server` (what a VPS is, the three homes for a server, the Coolify-first path, what maintenance means), `raspberry-pi` (arm64 image, bind mount ownership, memory, backups off the SD card) and `keeping-your-server-healthy` (update, back up, test a restore, check push, invite, move servers). All claims link to the Docker, Coolify and backups docs.

### D7. Navigation
Header: Features, Compare, What it costs, Learn, Self-host, Developers, Help, Docs (eight items, the tablet rule's maximum). Learn gains How-tos and Switch. Footer: Help, How-tos, Install, Switch, FAQ under Product. The 404 page offers Help.

## Effect on build and download
- Build: about 45 more static pages; the install pages are generated from one module and the how-tos from Markdown, so under ten seconds more.
- Download: text pages of 5 to 10 KB each; how-tos with a `shot` reuse images the tour already ships. No new script.

## Risks / Trade-offs
- Facts about other apps' export formats age. They carry `checkedOn` and the stale check, like comparisons, and the pages tell the reader to trust the import preview over the page.
- Two collections with similar shapes (guides, how-tos). Accepted: a how-to is one task with steps; a guide is a method. The index pages make the difference visible.

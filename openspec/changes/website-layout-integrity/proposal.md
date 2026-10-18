# Proposal

## Why

A review of the built site at v0.7.0 found rendering defects that make careful content look careless: checklists whose sentences split into ragged columns wherever they contain a link (home, cost, about), the logo touching the first navigation link ("OpenTodoFeatures"), a "I want to" prefix that wraps onto two lines about forty times on `/help/`, raw paths such as `/docs/sections-and-boards/` used as link text, cards left alone in a three-column grid, and facts copied onto pages they do not belong to. None of these is caught by today's checks, so each new page can bring them back. This is the first change of the polish series because every later change builds on a layout that renders as written.

## What Changes

- Checklist items (`.checks`) render their text and links as one flowing sentence beside the icon, at every width.
- The header keeps a visible gap between the brand and the first navigation link at every width from 768 px.
- Help entries show the task without a repeated "I want to" prefix on every line; the prefix appears once as the group's lead-in.
- Source lists ("Documentation this page relies on") show the docs page title, not its path.
- Card grids never leave a single card alone on its last row at the widest layout; a short group uses a layout that fits its count.
- The cost page hero shows cost facts (licence, accounts, who pays), not the server footprint copied from the self-host page; the footprint stays on `/self-host/`.
- The author bio in `authors.json` reads as a sentence where it is shown after the name (today it renders "…Pizzari, Builds OpenTodo in the open…").
- Corrections to wording slips found in the review (for example "`@me-ish`" in the Kanban guide).
- A browser check that fails on the first three defect classes (split checklist sentences, touching header items, a lone card in a grid row) and a build check that fails on path-shaped link text.

Out of scope: any redesign of sections, navigation or copy beyond the defects listed (those are `website-section-system`, `website-navigation-and-home` and `website-voice-and-releases`), and anything under `/docs/` (served as shipped; see the app change `docs-site-chrome`).

Pages affected: `/`, `/cost/` (and its translations), `/about/`, `/help/`, `/self-host/`, every guide, how-to, switch and template page with a source list, and every page with a card grid.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `website-platform`: "Website checks" gains layout integrity checks that run on every pull request.
- `marketing-website`: "What it costs page" shows cost facts in its hero instead of the server footprint.

Both capabilities are introduced by in-flight changes (`website-platform`, `website-first-visit`) that are implemented but not yet archived. Those changes must be archived before this one, so the MODIFIED deltas have a main spec to apply to.

## Impact

- `src/styles/site.css` (checklist, brand, grid rules), `src/components/SiteHeader.astro`, `src/pages/help.astro`, the source-list blocks in `ArticlePage.astro`, `switch/[slug].astro`, `how-to/[slug].astro`, `src/pages/cost.astro` and `src/pages/[lang]/cost.astro`, `src/content/authors.json`, `src/content/guides/kanban.md`.
- New Playwright spec `tests/layout.spec.ts`; a link-text rule in `scripts/checks/links.mjs` with a unit test.
- No new build dependency.

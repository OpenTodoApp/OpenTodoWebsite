# Design

## Context

- **Builds on** `website-platform` (collections, checks, layout), `website-content-hub` (templates, guides, toolkit, `ArticlePage`), `website-help-and-howtos` (how-tos, the `shot` front-matter pattern), `website-templates-and-methods` (tags, `TemplateGrid`), `website-seo` (social cards, sitemap, JSON-LD), `website-switcher-pages` (the feature tour in `src/lib/tour.ts`).
- **What exists:** every collection is validated by a plain-ESM schema in `src/content/schemas.mjs` with `docPath(docExists)` for documentation links and `freshDate` for review dates; `scripts/check-content.mjs` runs the claim lint over the collections it lists and knows the site's routes; `ScreenshotFrame` renders a manifest screenshot with its dark variant; `EndCta` closes every content page; `scripts/lib/og.mjs` names the section of a card from the first path segment; the header's product group holds Features, Compare and What it costs, and the widths test fails if any header link wraps between 768 and 1440 px.
- **The pinned bundle (v0.7.0)** has every docs page the six pages link (checked against `.bundle/docs/`), and the screenshots `dashboard`, `week`, `share`, `today`, `assistant` and `settings-backups`. It has no page about a focus list or a daily check, so the deep-work page is scoped to time blocks, the duration filter (`/docs/views/#narrow-a-list-by-duration`), display mode, reminders and the keyboard.
- **Specs:** `specs/website-use-cases/spec.md`.

## Goals / Non-Goals

**Goals:**
- A page per problem that a search engine can rank for the problem, that a visitor can act on in one reading, and that cannot drift from the pinned release.
- Reuse: no new component kind, no new style, no new dependency; the page is assembled from `ScreenshotFrame`, `TemplateGrid`, the `steps` list style and `EndCta`.

**Non-Goals:**
- A `HowTo` rich result, client-side anything, per-language use cases, a use case per template.

## Decisions

### D1. Front matter carries the structure; the body carries the problem
`useCaseSchema({ docExists, today })` in `schemas.mjs`:

| Field | Rule |
| --- | --- |
| `title`, `summary` | required; the summary is the card text and meta description |
| `problem` | required, at most 300 characters: the lede, in the visitor's words |
| `shot` | required; a key of the bundle manifest, checked by the page like a how-to's `shot` (the manifest is not available to the plain-ESM schema) |
| `shotAlt` | required text alternative |
| `steps` | 3 to 5 of `{ title, text, doc }`; `doc` is `docPath(docExists)` unless the entry is a draft |
| `templates`, `guides`, `howtos`, `toolkit` | ids, default `[]`, resolved with `getEntries` by the page, which throws naming the use case and the id |
| `tags` | the shared `CONTENT_TAGS`, so topic pages can collect use cases later |
| `lastReviewed` | `freshDate` with `USE_CASE_MAX_AGE_DAYS = 180` |
| `order`, `draft`, `waitsFor` | `waitsFor` required when `draft` is true (superRefine) |

The body is Markdown: the problem as the visitor would tell it, two to four short paragraphs, under the claim lint. Steps live in front matter rather than in the body so the build can count them and check each link; the body stays free prose where the lint is the only rule.

Alternative considered: steps in the body as a numbered list parsed by the lint. Rejected: the lint cannot tell a step from any other list, and the count rule would need a second parser.

### D2. One page, sections left out when empty
`src/pages/use-cases/[slug].astro` renders, in the spec's order: breadcrumb, `h1`, `problem` as the lede, a `cta-row` with the demo as the only primary button and "How it works" (an anchor to the steps) as secondary, the body prose, `ScreenshotFrame` (`eager`, since it is the first image), `ol.steps` where each step ends with its docs link, `TemplateGrid` under "Start from a template", a `grid-3` of cards under "Read more" (guides, how-tos, toolkit, in that order), "Documentation this page relies on" derived from the steps' links (unique, fragments stripped), the last-reviewed line, `EndCta`. Empty lists render no section. JSON-LD: `Article` and `BreadcrumbList`, the same shape as guides (website-seo "Structured data").

`src/pages/use-cases/index.astro` reuses `ArticleIndex` with the icon `lightbulb`, which the pinned bundle's sprite has (`target` does not exist in it; `Icon` would fail the build).

### D3. Drafts prepare pages for later releases
A draft has `draft: true` and `waitsFor: "..."` (a sentence naming the release or the feature). `getStaticPaths` and the index filter drafts; `check-content.mjs` skips draft files, and the schema skips `docExists` on steps for drafts, so a page can be written against documentation that is not released yet without failing the build. Everything else (shape, step count, date) still applies, so a draft does not rot silently: its `lastReviewed` still goes stale after 180 days.

### D4. Navigation: product group, gated by the widths test
`SiteHeader.astro` adds `{ href: '/use-cases/', label: 'Use cases', match: '/use-cases/' }` to `product` between Features and Compare, shown while `getCollection('useCases', (e) => !e.data.draft)` is not empty (the pattern Blog uses). The phone `<details>` menu lists it under Product with no change to its markup. `SiteFooter.astro` adds "Use cases" to the Product list after Compare. `tests/no-js.spec.ts` adds 'Use cases' to `MENU` when `dist/use-cases/index.html` exists.

Why the product group and not Learn: use cases are the first page many visitors will see; the Learn menu is for people who already know the product. The risk is header width: `tests/widths.spec.ts` fails if any header item wraps between 768 and 1440 px. If it does, the fallback is the first entry of the Learn menu, not a shorter label.

### D5. Internal links from the tour
`TourFeature` gains `useCase?: string`. `FeatureTour.astro` loads the published use cases once and throws (naming the feature and the slug) when a feature names a slug that is missing or a draft. The figure's meta line gets a second `link-arrow`, "See it used for …" with the use case's title, and the feature's `<li>` gets a visually-hidden link like the docs link, so a reader without JavaScript (who sees only the first figure) can still reach every use case from the list. Five features are mapped: Time blocking → `timeboxing-your-day`, Saved views and dashboards → `weekly-review`, Share projects with roles → `shared-household-list`, AI assistant, your key → `planning-with-your-own-ai`, Today → `deep-work-and-focus`. The Raspberry Pi page is linked from the Raspberry Pi mention in `/self-host/` and from the "Three ways in" card "Run it on your own server" on the home page.

### D6. Checks
- `scripts/check-content.mjs`: `'use-cases'` joins `COLLECTIONS` (folder `src/content/use-cases`, route `/use-cases/<slug>/`), `pages` gets `/use-cases/`, drafts are skipped (front matter `draft: true`).
- `scripts/lib/og.mjs`: `sectionOf` maps `use-cases` to "Use cases"; `scripts/test/og.test.mjs` asserts it.
- `scripts/test/schemas.test.mjs`: a valid use case passes; two steps fail with the count message; a 190-day date is stale naming the limit; a step with a docs page outside the bundle fails; the same step on a draft passes; a draft without `waitsFor` fails.
- The browser tests, the link check (which verifies fragments against the docs pages' ids), the emoji and script scans and the sitemap pick the new pages up through `sitePages()` and Astro's routes with no edit.

## Effect on build and download
- **Build:** seven more static pages (about one second of rendering) and seven social cards (about one second in `scripts/og.mjs`). No new image transforms: the six screenshots are rendered at the same widths as on the pages that already use them, so Astro's image cache serves the same files.
- **Download:** a use-case page is about 20 KB of HTML (6 KB compressed) plus one screenshot that visitors who came from the home page already have; the index is a page of cards. No new script, stylesheet or font. The header gains one link on every page (under 100 bytes).

## Risks / Trade-offs
- [Pages written for search read like search pages] → the voice guide applies in full: the problem in plain words, no superlatives, every claim a docs link; the maintainer reviews the rendered page before merging.
- [A 180-day freshness rule means twelve re-reviews a year across six pages] → the stale check names the page and the date; reviewing is reading the page against the pinned docs and updating one date, a few minutes each.
- [The deep-work page is thinner than the others while the release has no focus list] → it leans on three guides (Pomodoro, Eat the frog, Time blocking) and the duration filter; the page is extended, not rewritten, when a release documents more. If the maintainer prefers to wait, the entry is marked `draft: true` with `waitsFor` and the tour entry for Today is left out.
- ["Use cases" wraps the header at some width] → the widths test catches it; the fallback (D4) is the Learn menu.
- [Template and guide ids are strings, so a renamed guide breaks a use case] → `getEntries` throws at build naming the use case and the id, the same guard `ArticlePage` already uses for templates.

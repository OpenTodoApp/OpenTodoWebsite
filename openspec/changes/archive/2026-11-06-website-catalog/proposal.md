# Proposal

## Why

The owner asked that Features and Learn converge on one layout and one set of functions, with better information architecture, a search across them, and depth from overview to detail (PLAN-1.0 Track C). Features was one page of about 90 rows with an aside; Learn was a faceted library with a different row style; neither could be searched.

## What Changes

- One catalog layout for both: the title, one search box, a rail of sections (sticky beside the content; a sideways-scrolling row on phones), and rows of entries (title, one line, a property).
- Features: an overview with each group's first five features and "All N" to a new page per group (`/features/<group>/`); integrations, imports and "no tiers" as three lines at the end.
- Learn: the same overview per type, the fixes for common problems, and the type and topic pages on the same layout. The type and topic facets become the rail.
- Search over features, Learn entries and docs pages from a build-time index (`/search.json`, 72 KB, about 18 KB gzipped), fetched on first focus; `/` focuses it, Escape clears it. Hidden without JavaScript.
- Removed: `LearnLibrary.astro` and the old Features and Learn CSS.

Pages affected: `/features/`, new `/features/<group>/`, `/learn/`, `/learn/<type>/`, `/learn/topic/<slug>/`, new `/search.json`. Out of scope: article pages, the home page's feature summary. No new dependency: the search is about 60 lines of TypeScript bundled by Astro.

## Capabilities

### Modified Capabilities

- `marketing-website`: the Features page requirement.
- `website-content`: the Learn library and topic pages requirements, and a new catalog search requirement.

## Impact

New `src/components/catalog/` (Catalog, CatalogRows, CatalogSearch), `src/lib/catalog.ts`, `src/pages/features/[group].astro`, `src/pages/search.json.ts`, `scripts/test/catalog.test.mjs`; rewritten Features and Learn pages; `site.css`; tests `community.test.mjs`, `islands.spec.ts`.

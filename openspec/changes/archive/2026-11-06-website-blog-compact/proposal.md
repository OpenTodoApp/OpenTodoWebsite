# Proposal

## Why

The owner asked for a blog that is more compact and readable, less dispersive (PLAN-1.0 Track C). The index was a magazine: a large featured card and a three-column grid of cover cards, mostly for release notes. A post opened with a breadcrumb, the title, a large lede, a byline and a full-width cover, and ended with a grid of three more cover cards.

## What Changes

- The index and category pages list posts as rows: date, title, a two-line summary, category. No covers, no featured card; twenty posts a page instead of twelve. Categories become underlined tabs that scroll sideways on phones instead of wrapping.
- The index heading is "Blog", without a tagline.
- A post: category, date and reading time on one line above the title; a smaller lede; the cover inside the text column; a lighter "On this page"; related posts as rows.

Pages affected: `/blog/`, `/blog/page/<n>/`, `/blog/category/**`, every post. Out of scope: post content, feeds, the home page's latest posts. No new build dependency.

## Capabilities

### Modified Capabilities

- `website-blog`: the index, pagination and post page requirements.

## Impact

New `src/components/blog/PostRow.astro`; `BlogListing.astro`, `src/pages/blog/**`, `src/lib/blog-core.mjs` (page size), `src/styles/site.css`.

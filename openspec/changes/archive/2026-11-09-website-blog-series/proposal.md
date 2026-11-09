# Proposal

## Why

The blog starts a weekly series, "OpenTodo in practice": one way of working per post, done step by step in the real app. The blog has categories and tags but no series, so a reader who finds part 3 has no path to parts 2 and 4, and no page that lists them.

## What Changes

- A post may name a `series` (a key of `src/content/series.json`, which holds each series' title and summary once) and its `part` number. An unknown series, a series without a part, a part without a series, or a part number used twice in one series fails the build.
- A part shows "OpenTodo in practice · Part N" above its title, linking to its series page, and its previous and next links go to the neighbouring published parts instead of the neighbouring posts.
- `/blog/series/<id>/` lists the published parts in order under the series title and summary. A series without a published part has no page.
- `series` joins the reserved blog slugs.

Pages affected: every post of a series, the new series pages. Out of scope: the feeds (a part is a post like any other), the index and category pages, the home page, a series navigation in the blog's tabs. No new build dependency.

## Capabilities

### Modified Capabilities

- `website-blog`: checked post metadata (series and part); new requirements for the parts of a series (the label and the part links) and the series pages.

## Impact

New `src/content/series.json`, `src/pages/blog/series/[series].astro`, `scripts/test/series.test.mjs`; `src/content/schemas.mjs`, `src/content.config.ts`, `src/lib/blog-core.mjs`, `src/lib/blog.ts`, `src/pages/blog/[slug].astro`, `src/components/blog/PostRow.astro`, `scripts/check-content.mjs`, `src/styles/site.css`, README.

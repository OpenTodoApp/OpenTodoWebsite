# Tasks

- [x] 1.1 Add `src/content/series.json` with `in-practice`; `series` and `part` in `blogSchema`, `series` in `RESERVED_BLOG_SLUGS`; verify with `npm test` (schemas: unknown id, missing part, part without series, part 0, 1.5 and "2").
- [x] 1.2 Check part numbers across posts in `publishedPosts()`; verify with `npm test` (blog: a duplicate, drafts included, names both posts).
- [x] 1.3 The label above the title and the part links at the end of a post; `/blog/series/<id>/` with the parts in order; the content check knows the page; verify on a build with two posts marked as parts, at 360 and 1280 px in light and dark, with `npm run test:browser` over those pages.
- [x] 1.4 `scripts/test/series.test.mjs` over `dist/`: each label links a known series page, and a series page exists exactly for each series with a published part and lists them in order.
- [x] 1.5 Run `npm run build`, `npm run check`, `npm test`, `npm run check:dist`, `npm run test:browser` and `openspec validate --all --strict`.

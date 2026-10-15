# Tasks

- [x] 1.1 Add `@astrojs/sitemap` (pinned) with the docs as custom pages and `public/robots.txt` (D1). Verify `dist/sitemap-index.xml` exists after a build and the sitemap lists `/docs/getting-started/` and `/how-to/`.
- [x] 1.2 Add `scripts/lib/og.mjs` (helpers, unit-tested), `scripts/og.mjs` (renderer), the Inter files under `scripts/og/fonts/`, the build hook, and the per-page `og:image` in `Base.astro` (D2). Verify `dist/og/how-to/set-a-reminder.png` exists and shows the how-to's title, and a post with a cover keeps its cover as `og:image`.
- [x] 1.3 Add `JsonLd.astro` and the entities on the home, FAQ, how-to, article, blog and template pages (D3); refactor the FAQ to one data array. Verify each built page has exactly one `application/ld+json` block that parses, and `npm run check:dist` still passes the script check.
- [x] 1.4 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser`; review three cards. Verify all pass and `openspec validate --all --strict` passes.

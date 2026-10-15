# Design

## Context

- **Builds on** `website-platform` (layout, checks, the bundle's docs copied into `dist/docs/`), and the content changes that created the pages worth finding.
- **Constraints:** no third-party scripts (structured data must be inline), released facts only (structured data reads the bundle and the pages' own front matter), one look with the app (the cards use the app's typeface and colours).
- **Specs:** `specs/website-platform/spec.md`.

## Decisions

### D1. Sitemap with the docs listed explicitly
`@astrojs/sitemap` knows Astro's routes. The docs are copied from the bundle after the build, so the config lists them as `customPages` by walking the bundle's `docs/` folder at config time. The 404 page is filtered out. `robots.txt` names the index.

### D2. Social cards drawn after the build, in a child process
A card per page needs the page's final title and description, which are simplest to read from the built HTML; an `astro:build:done` hook therefore runs `scripts/og.mjs` over `dist/`. It runs as a separate process so `FONTCONFIG_FILE` is set before sharp loads: the process writes a private fontconfig pointing at `scripts/og/fonts/` (Inter Regular and SemiBold, SIL OFL, about 1.2 MB, build-only), and librsvg then renders Inter on any machine without a system font package. The layout decides the card URL from the path (`/og/<path>.png`, `/og/index.png` for the home), so the HTML and the renderer agree without a registry; the renderer skips pages whose `og:image` is not under `/og/`, which is how a post with a cover keeps its cover. Titles wrap to three lines; the card shows the brand mark, the section (from the first path segment), the title, two lines of description and the site line. Pure helpers (`wrap`, `ogPathFor`, `cardSvg`, `sectionOf`) are unit-tested.

### D3. Structured data from the page's own data
A `JsonLd` component emits one inline `application/ld+json` block (escaping `<` so a description cannot close the block). Each page passes schema.org objects built from what it already renders: the FAQ page's questions come from one array that renders both the `<details>` and the FAQPage entity; how-tos and articles use their title, summary and last-reviewed date; posts their dates, author and cover; templates a Dataset with the download as its distribution; the home page a WebSite and a SoftwareApplication with the version from the manifest. No ratings, prices or counts: the voice guide forbids invented numbers and currency, and `isAccessibleForFree: true` says what matters.

## Effect on build and download
- Build: the card renderer adds a few seconds (about 130 PNGs at compression level 9); the sitemap is instant.
- Download: a JSON-LD block of 0.3 to 1 KB per page; cards (30 to 60 KB) are fetched only by link previews.

## Risks / Trade-offs
- librsvg's text layout is simpler than a browser's: no hyphenation, approximate line widths. Accepted; the wrap is conservative and the card is a preview, not a page.
- Structured data types are a judgement (Dataset for a template, TechArticle for a how-to). They are valid schema.org and harmless if a search engine ignores them.

# Proposal

## Why

The site has good pages and no way for search engines and link previews to see them properly: no sitemap (the docs, served from the bundle, are invisible to crawlers that start from one), one generic social image for every page, and no structured data. A how-to shared in a chat shows the same card as the home page; a search result for the FAQ carries no questions. These are cheap, measurable fixes.

## What Changes

- **Sitemap.** `@astrojs/sitemap` writes `sitemap-index.xml` at build, with every Astro page and every docs page of the pinned bundle listed explicitly; `robots.txt` points at it.
- **A social preview card per page.** After the build, one 1200×630 PNG per page is drawn from that page's title and description with the app's typeface (Inter files kept in the repository, picked up through a private fontconfig so every machine renders the same card). Pages that already carry an image (a post's cover) keep it. The layout sets `og:image`, `og:image:alt` and `og:locale`.
- **Structured data (JSON-LD, inline).** WebSite and SoftwareApplication on the home page, FAQPage on the FAQ, TechArticle plus breadcrumbs on how-tos, Article plus breadcrumbs on guides and toolkit pieces, BlogPosting on posts, Dataset plus breadcrumbs on templates. All values come from the page's own data or the bundle.

## Out of scope

- Localised alternates (`hreflang`): the languages change adds them.
- Search Console or analytics changes, paid tooling, keyword work.
- Changing the docs' own `<head>` (they come from the bundle as shipped).

Pages affected: every page's `<head>`, plus the new `sitemap-index.xml`, `robots.txt` and `og/` images. New build dependency: `@astrojs/sitemap` (official, build-time only, no code shipped to visitors). `sharp` was already a dependency.

## Capabilities

### Modified Capabilities

- `website-platform`: the build also produces the sitemap and the social cards, and every page declares its structured data.

## Impact

- **Website:** `astro.config.mjs` (sitemap integration, social-card hook), `scripts/og.mjs` and `scripts/lib/og.mjs` (+ unit tests), `scripts/og/fonts/` (Inter Regular and SemiBold, SIL OFL), `public/robots.txt`, `src/layouts/Base.astro`, `src/components/JsonLd.astro`, the home, FAQ, how-to, article, blog and template pages.
- **Build:** about 130 PNGs rendered with sharp, a few seconds. **Download:** nothing new on the page itself beyond a JSON-LD block of under 1 KB; a card is fetched only by link previews.
- **Dependencies:** `@astrojs/sitemap` 3.7.4.

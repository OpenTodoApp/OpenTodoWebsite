# Design: site-polish

## Context

See proposal.md. Measured before the change on the built site served locally, Lighthouse 13 on an emulated phone: home 98 / 100 / 100 / 100 (performance, accessibility, best practices, SEO), features 100, blog 100, self-host 99. The live site answers with `X-Content-Type-Options` and `Referrer-Policy` only.

## Decisions

### D1. Titles

`Base.astro` leaves a title alone when it contains "OpenTodo", otherwise appends " · OpenTodo" as before. The social cards already strip the suffix (`scripts/og.mjs`), so they do not change. Titles stay unique, which `check:seo` enforces.

### D2. One graph per page

`Base.astro` writes one `application/ld+json` block with `@graph`: the page (`WebPage`, or `CollectionPage` / `AboutPage` through the `schemaType` prop) with its canonical URL, title, description, language, social image, `isPartOf` the WebSite (`/#website`) and `publisher` the Organization (`/#organization`), and the `BreadcrumbList` it already wrote, now referenced from the page's `breadcrumb`. The home page's WebSite node takes the same `@id`. Article, BlogPosting, Dataset and SoftwareApplication blocks stay where they are. Nothing is stated that the page does not show: no rating, no user count.

### D3. Checks

`check:seo` reads the built HTML, the docs included, for one `<h1>` and image `alt` attributes, and the site's own pages for structured data that parses. The docs come from the bundle and carry none.

### D4. Security headers, tested in the browser

The policy: `default-src 'self'`, scripts from the site and the analytics origin, images from the site, `data:` and `https:` (the docs show a Render button), connections to the site and the analytics origin, no objects, no foreign framing, forms to the site only. Scripts and styles keep `'unsafe-inline'`: the layout, the islands and the bundle's docs use inline scripts and `style` attributes, and hashing them would tie `nginx.conf` to every bundle. The policy therefore stops foreign scripts, frames and form targets, not an injected inline script; the site takes no input it renders.

`Strict-Transport-Security` is one year without `includeSubDomains`, since other hosts under the domain are not this repository's to decide for.

`scripts/serve.mjs` reads the fixed `add_header` lines of `nginx.conf` and sends them, so the browser checks run under the production policy. `tests/a11y.spec.ts` fails on any console error or page error, and answers the analytics script itself, so a check is not counted as a visit. A unit test holds the policy's script and connection origins equal to the script check's allow-list.

Alternative considered: a `<meta http-equiv>` policy in the layout. It cannot set `frame-ancestors`, and would not cover the docs.

### D5. Polish in CSS only

One block in `site.css`, using only existing tokens: `text-wrap: pretty` on paragraphs and list items, tabular figures in prose tables, `::selection` in the accent's soft pair, 120 ms colour transitions on links that already change colour on hover, a 3 px move of the arrow icon in buttons and arrow links, and `@view-transition { navigation: auto }` with a 140 ms cross-fade inside `prefers-reduced-motion: no-preference`. The existing reduced-motion rule already shortens every transition to 1 ms. No JavaScript.

### D6. Pictures in posts in several widths

`astro.config.mjs` sets `image.layout: 'constrained'` with the breakpoints 640, 960, 1280, 1920 and 2560, so a Markdown image gets a `srcset` and `sizes`. `responsiveStyles` stays off: `site.css` already sizes pictures in prose, and the rendered page is the same to the pixel grid (same page height, measured on a post). Components that build their own `<picture>` (`ScreenshotFrame`, `CoverImage`, `ShotPicture`) pass explicit widths and are unaffected: only the blog posts' HTML changes. On a phone the second picture of a post drops from 76 KB to about 20 KB.

`scripts/serve.mjs` also compresses text as nginx does, so Lighthouse run against the preview server measures what production sends.

## Effect on build time and download size

A cold build optimises about 200 more images (a few seconds; cached in CI like the rest) and `dist/` grows by 7 MB. A page's HTML grows by about 0.9 KB (0.3 KB compressed) for the graph and the Twitter tags; the stylesheet by 1.3 KB. The largest image of a page starts loading earlier.

## Measured after the change

Lighthouse 13, emulated phone, against `npm run serve`: home, features, blog, a post with a video, self-host, templates, learn and the German home page each 100 / 100 / 100 / 100. Desktop: home and the post 100 / 100 / 100 / 100. Largest Contentful Paint 0.9 to 1.9 s on the phone profile, layout shift 0, blocking time 0 ms.

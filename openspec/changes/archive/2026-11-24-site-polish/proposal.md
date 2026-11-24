## Why

An audit of the built site (235 pages, Lighthouse on the home, features, blog and self-host pages) found it fast and accessible already (98 to 100 on a phone), with these gaps:

- 137 pages carry no structured data at all: features, learn, blog lists, templates, hosting, every translated home page.
- No `twitter:title`, `twitter:description` or `twitter:image`, and no hint that search results may show the large preview image.
- A title that already names OpenTodo gets " · OpenTodo" again ("About OpenTodo · OpenTodo"); release post titles run to 100 characters. Older blog pages share a 31-character description.
- The page's largest image (the hero screenshot, a post's cover) is loaded eagerly but not prioritised. Pictures inside posts are served at 2560 px to every screen.
- The server sends no Content-Security-Policy, no Strict-Transport-Security, no frame or permissions policy.
- Nothing checks that a page has one `<h1>`, that every image has an `alt`, or that a page logs no error in the browser.
- Hover colours jump, and paragraphs can end on a single word.

## What Changes

- Every page carries one JSON-LD graph: a WebPage (a CollectionPage on lists, an AboutPage on About) tied to the WebSite and Organization the home page describes, and the page's BreadcrumbList inside it.
- Every page carries the Twitter title, description, image and site account, and `max-image-preview:large`.
- A title that names OpenTodo is not suffixed. Older blog pages say which page of how many they are.
- The eager image of a page gets `fetchpriority="high"`.
- Pictures inside posts come in five widths (`srcset`), so a phone no longer downloads the 2560 px capture. The press kit's previews state their width and height.
- `nginx.conf` sends a Content-Security-Policy (this site and the self-hosted analytics only), Strict-Transport-Security, X-Frame-Options, Cross-Origin-Opener-Policy and a Permissions-Policy. The preview server (`scripts/serve.mjs`) sends the same headers.
- `check:seo` also fails on a page without exactly one `<h1>`, an image without `alt`, and a site page without valid structured data. The browser checks fail on any console error, which includes anything the policy refuses.
- CSS only: `text-wrap: pretty` on running text, the accent as selection colour, eased hover colours, an arrow that moves 3 px on hover, and a 140 ms cross-fade between pages. All of it stops under `prefers-reduced-motion`.

Out of scope: the palette, the typeface, the type scale and every layout (they come from the bundle's tokens and stay as they are); splitting the one stylesheet (16 KB compressed, cached across pages); the docs pages, which the bundle ships.

## Capabilities

### Modified Capabilities

- `website-platform`: "Website checks", "Structured data" and "Search metadata" gain the items above.

### New Capabilities

None. `website-platform` gains two requirements: "Security headers" and "Quiet motion".

## Impact

- `src/layouts/Base.astro`, `src/pages/index.astro`, the list components (`BlogListing`, `ArticleIndex`, `Catalog`), `ScreenshotFrame`, `ShotPicture`, `CoverImage`, `src/pages/press-kit.astro`, `astro.config.mjs`, `src/styles/site.css`, `nginx.conf`, `scripts/serve.mjs`, `scripts/checks/seo.mjs`, `tests/a11y.spec.ts`.
- No new dependency. Each page grows by about 0.9 KB of HTML (0.3 KB compressed); the stylesheet by 1.3 KB. The build writes about 200 more image files (7 MB in `dist/`), cached between builds like the others.

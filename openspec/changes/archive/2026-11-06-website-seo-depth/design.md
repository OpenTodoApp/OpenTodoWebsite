# Design

## D1. Descriptions
Search results show about 160 characters. Summaries stay as written on the page; only the meta description is cut, at the last sentence end after 80 characters, else at the last word with an ellipsis.

## D2. Breadcrumbs
`Base` takes `crumbs` and emits one BreadcrumbList (home first). Pages that have a visible breadcrumb or a clear section pass it; nothing else changes on screen.

## D3. One check for the head
`scripts/checks/seo.mjs` reads the built HTML like the other checks, so CI fails on a missing title or description, a broken or one-way hreflang, a page missing from the sitemap, a duplicate title or a social card that is not built.

## D4. Heading order
An h3 straight under the h1 becomes an h2 with the h3's size (`h2.as-h3`): the outline is fixed without a visual change.

## D5. Ownership tags
Verification by DNS needs no change here; by tag, the token goes into `SITE.verification` and every page carries it.

## D6. The docs' card
The docs pages name `/assets/og.png`, which `public/` no longer has since the mark comes from the bundle. The social-card step copies the home page's card there after rendering.

## Build and download size
The check adds about a second to `check:dist`. Pages gain a few hundred bytes of JSON-LD.

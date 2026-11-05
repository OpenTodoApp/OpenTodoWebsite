# Design: brand-from-bundle

## Context

See proposal.md. The bundle (layout v1) has carried `brand/` since sidebar-v2: `mark.svg` (both symbols), `mark-mono.svg`, `mark-colour.svg` (the app icon as a standalone SVG with its rounded slate square), `wordmark.svg` and `icon-512.png`. The site reads the bundle through `scripts/lib/bundle.mjs` (`resolveBundle`). It already copies the bundle's docs into `dist/` with an Astro integration (`bundleDocs`), and it renders the social cards with `sharp` in `scripts/og.mjs`.

## Decisions

### D1. Served at the same paths

A `bundleBrand()` integration, beside `bundleDocs()`:
- writes `dist/assets/favicon.svg`, byte-identical to `brand/mark-colour.svg`;
- writes `dist/assets/apple-touch-icon.png`, rendered with `sharp` from that SVG with the square's `rx` removed, at 180 px;
- serves both from the bundle in `astro dev`.

The pages keep their paths (`/assets/favicon.svg`, `/assets/apple-touch-icon.png`), so `Base.astro`, `SiteHeader.astro` and `SiteFooter.astro` don't change, and nginx's `/assets/` cache rule still applies.

The integration refuses a build when `dist/assets/favicon.svg` already exists, which would mean a copy in `public/` came back.

Alternatives considered:
- Importing the SVG through Vite's `@bundle` alias into every page: it changes three components and fingerprints the favicon path, which would break the cache rule's predictability for no gain.
- `icon-512.png` as the touch icon: it has transparent rounded corners, which iOS shows as black.

### D2. The social card draws the bundle's mark

`cardSvg` takes the colour mark as an argument and nests it as an `<svg x y width="44" height="44" viewBox="0 0 64 64">` in place of the hand-drawn emerald square and tick. `scripts/og.mjs` reads it from the resolved bundle. The card's text and layout are unchanged.

### D3. Size and build time

The favicon goes from about 0.2 KB to about 0.6 KB (the bundle's file, licence note included), and the touch icon stays about the same size. Build time grows by one 180 px `sharp` render, a few milliseconds. Nothing is added to the pages' scripts or styles.

## Risks / Trade-offs

- [Until the next pin, the site shows v0.22.0's open-loop mark, not the tray] → This was accepted by the owner. It follows "Released facts only", and the next pin switches the mark with no further edit.
- [`sharp` (librsvg) must render the nested SVG on the cards] → A test renders a card and checks the mark's pixels.

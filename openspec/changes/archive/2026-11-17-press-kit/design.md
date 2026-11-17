# Design: press-kit

## Context

See proposal.md. The `bundleBrand()` integration (brand-from-bundle) already writes the favicon and the touch icon from the bundle's `brand/` folder. Pages read the bundle through `src/lib/bundle.ts`, and the link check (`check:links`) runs over `dist/`.

## Decisions

### D1. The bundle's brand folder at `/brand/`

`bundleBrand()` also copies the bundle's whole `brand/` folder to `dist/brand/` at build time, and serves `/brand/*` from the bundle in dev. The page links there. These are the release's own files, byte for byte, never committed to this repository.

### D2. One description of the assets, in one module

`scripts/lib/presskit.mjs` exports `pressKit(bundleDir)`, which returns the asset groups. Each group has a title, a use, and items; each item has a preview, the background it needs, and its files with their labels and sizes. It lists only files that exist in that bundle: the kit when `brand/kit/` is there, the four basic files otherwise. The page renders what it returns, and the test checks both shapes against fake bundles, plus that every link it produces names an existing file.

Alternative considered: a fixed list in the page. It would offer links to files an older bundle lacks.

### D3. Layout

The page reuses the site's `section`, `wrap`, `grid` and `card` classes. A card shows the preview on its own light or dark panel, then its use and the download links as plain anchors with `download`. Under 768 px the grid is one column. The page adds no scripts and a few lines of page-scoped CSS for the preview panels.

### D4. Size and build time

Copying `brand/` adds about 430 KB to `dist/` with a kit bundle, and about 30 KB with v0.22.0's. Visitors download only what they open: the page's previews are about 12 small PNGs and SVGs, about 150 KB, loaded lazily below the first screen. The extra build time is negligible.

## Risks / Trade-offs

- [Until the next app release, the page offers the previous mark (v0.22.0)] → It follows "Released facts only". The kit appears with the next pin, with no edit.

# Proposal

## Why

The website is one hand-written `index.html` (45 KB), a 35 KB stylesheet and a 24 KB script, plus a generated docs folder copied from the app. The plan adds comparison pages, switch paths, self-hosting and developer pages, and later templates and guides: dozens of pages. By hand that means copy-pasted headers, drifting styles, no image pipeline and no checked content. The maintainer wants a professional foundation. Also, since the site moved out of the app repository, its docs, screenshots, tokens and icons must come from the app's released site bundle rather than from files copied by hand.

## What Changes

- **A static site generator.** Astro builds the site to static files. JavaScript ships only for interactive parts (the live demo, the sync playground). The output is served by the same nginx container, so the Coolify deploy stays as it is.
- **The site bundle as the only source of app facts.** The build downloads and unpacks the app's `opentodo-site-bundle-<version>.tar.gz` for a pinned version, or uses a local directory for previews. It provides:
  - the docs site, served under `/docs/` as-is
  - screenshots
  - the colour tokens stylesheet and icon sprite
  - the changelog
  - the feature manifest (version and released import formats)
- **An interim bundle.** Until the app publishes real bundles (app change `site-bundle`), a script assembles a bundle-shaped folder from the files that are in this repository today, so work doesn't wait.
- **Shared layout:** header with navigation (Features, Compare, Self-host, Developers, Docs), footer (licences, GitHub, specs), light and dark following the visitor's preference, the app's typeface and colours, and icons from the sprite.
- **Typed content.** Content collections with checked front matter for comparisons, and later templates and guides, so a missing "checked on" date or source link fails the build.
- **Website checks in CI (GitHub Actions):** build, internal and docs link check, automated accessibility audit of every page in light and dark, a scan that rejects emoji used as icons, a check that no third-party script is loaded except the self-hosted analytics, and a no-JavaScript reading check.
- **The current home page carried over as it is**, inside the new layout, so the site keeps working until `website-switcher-pages` rewrites it.

## Out of scope

- New page content: the home rewrite, comparisons and audience pages (`website-switcher-pages`), and templates, guides and the content workflow (`website-content-hub`).
- Changes to the app or its docs generator. The docs are served exactly as the bundle ships them.
- Visual redesign beyond adopting the app's tokens, typeface and icons. A design pass comes with `website-switcher-pages`.

Affects every page of the site (layout, build, deploy) without changing what the home page says.

## Capabilities

### New Capabilities

- `website-platform`: how the site is built and deployed, where app facts come from (the site bundle), the shared layout and navigation, typed content, and the checks every page passes.

### Modified Capabilities

None (no specs exist in this repository yet).

## Impact

- **Repository:** new `package.json`, `astro.config.mjs`, `src/` (layouts, components, pages, content), `scripts/fetch-bundle.mjs` and `scripts/interim-bundle.mjs`. The current `index.html`, `styles.css` and `main.js` move into the Astro structure, `docs/` stops being committed (it comes from the bundle), and the `Dockerfile` gains a build stage.
- **Build dependencies:** Astro (static output) and a small set of check tools (an HTML link checker, axe-core with Playwright for CI). None ship to visitors.
- **Visitors:** pages get lighter. Interactive scripts load only where used, and images become responsive WebP/AVIF.
- **Deploy:** the same container and port. Coolify points at this repository with base directory `/`.

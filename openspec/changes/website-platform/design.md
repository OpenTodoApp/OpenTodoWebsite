# Design

## Context

- **Today's site.** Static files moved from the app repository, with history:
  - `index.html` (45 KB, all content), `styles.css` (35 KB), `main.js` (24 KB: hero demo app, keyboard shortcuts, sync playground, install tabs, feature tour)
  - `analytics.js` (custom events for the self-hosted Umami)
  - `assets/` (3 MB, mostly `assets/shots/*.webp`)
  - `docs/` (4.9 MB, the generated docs site)
- **Serving.** `nginx:1.27-alpine` with `nginx.conf` (cache headers per path, gzip, security headers, `try_files` for directory URLs). `Dockerfile` copies the files.
- **Third-party loads.** The page loads web fonts from Google Fonts (Bricolage Grotesque, Inter, JetBrains Mono) and the GitHub API for the star count.
- **The bundle.** The app will publish `opentodo-site-bundle-<version>.tar.gz` per release (layout v1: `manifest.json`, `docs/`, `shots/`, `tokens/tokens.css`, `icons/icons.svg` + `names.json`, `changelog.json`), plus a preview artefact from main (app change `site-bundle`). It doesn't exist yet.

## Goals / Non-Goals

**Goals:**
- Pages are components and content entries, never copy-pasted HTML.
- App facts arrive only through the bundle, so updating the site to a release is a one-line change.
- Visitors download less than today.

**Non-Goals:**
- Server-side rendering, a CMS, or any runtime service beyond nginx.
- Rewriting the home page's message (that's `website-switcher-pages`).

## Decisions

### D1. Astro with static output
Astro (current major, exact version pinned in `package.json` and the lockfile) with `output: 'static'`. Interactive parts are islands with plain TypeScript, no UI framework: the existing `main.js` behaviours split into `HeroDemo`, `SyncPlayground`, `InstallTabs` and `FeatureTour`, each loading only on pages that use them (`client:visible`). Built-in image handling produces responsive WebP and AVIF from the bundle's screenshots.

Alternatives considered:
- **Next.js:** a heavier runtime with a React tree on every page.
- **Eleventy or Hugo:** no component islands or typed content collections, so more hand-rolled glue.
- **Keep hand-written HTML:** doesn't scale to the planned pages.

### D2. Bundle acquisition
`scripts/fetch-bundle.mjs` runs before `astro build`. It reads `bundle.json`, which holds `{ "version": "v0.4.0" }` or `{ "preview": "<run id>" }`, downloads the release asset from `github.com/pixari/opentodo/releases`, verifies it against the release's `SHA256SUMS`, and unpacks it into `.bundle/` (git-ignored). `BUNDLE_DIR=/path` skips the download for local work.

- **Preview builds** set a `PREVIEW` flag that renders a banner on every page. The production Docker build refuses preview bundles (spec).
- **Interim, before the app ships bundles:** `scripts/interim-bundle.mjs` builds `.bundle/` from what this repository has today:
  - `docs/` → `docs/`, `assets/shots/` → `shots/`
  - `tokens.css` extracted once from the app's `web/src/index.css` and committed under `interim/`
  - the icon sprite generated once from the app's Lucide set and committed under `interim/`
  - a hand-written `manifest.json` marked `"interim": true`

The interim files are deleted when the first real bundle is pinned.

### D3. Layout, tokens, type and icons
- `src/layouts/Base.astro` holds the header, navigation (a `<details>` disclosure on phones, so it works without JS), footer, skip link, and light/dark through `prefers-color-scheme` using `tokens.css` from the bundle.
- Site styles are plain CSS with custom properties that reference the `--ot-*` tokens (no Tailwind, keeping the build small and the CSS readable).
- Icons come from the sprite through `<Icon name>`.
- Fonts are self-hosted: Inter, the app's typeface (bundled with the app), and any display face kept for headings, served from this site. This removes the Google Fonts request, consistent with "no third-party scripts" and the app's own privacy stance.

### D4. Typed content collections
Astro content collections with Zod schemas:
- **`compare`** (required: `competitor`, `checkedOn` date, rows with `sourceDoc` links for OpenTodo claims). Introduced here as a schema with no entries yet, so `website-switcher-pages` only adds content.
- **`templates` and `guides`:** added by `website-content-hub`.

A build-time check also verifies that every `sourceDoc` resolves to a page in the bundle's `docs/`.

### D5. The current home page, carried over
`index.html`'s body becomes `src/pages/index.astro` inside `Base.astro`, with its sections as components and its islands (D1), visually unchanged apart from the shared header and footer, self-hosted fonts and emoji replaced by sprite icons. `analytics.js` becomes a small module included by the layout. The Umami script tag keeps loading from the self-hosted origin.

### D6. Checks
In GitHub Actions on pull requests and main:
1. `astro check` and `astro build`
2. Link checking over `dist/` (internal and `/docs/`), with an HTML-only checker run offline against the built files
3. Playwright with axe-core on every page in light and dark at 360 px and 1280 px, failing on serious or critical issues and on horizontal scroll
4. A no-JS pass with JavaScript disabled, checking the main landmark text and navigation links
5. A scan of built HTML for emoji or symbol characters inside navigation, buttons, list markers and icon slots (the same character classes as the app's `ui-lint`)
6. A scan of built HTML for `<script src>` origins outside the site and the analytics origin

Checks 3 and 4 share one Playwright run.

### D7. Container
A multi-stage `Dockerfile`:
1. `node:22-alpine` runs `npm ci`, `fetch-bundle` and `astro build`.
2. `nginx:1.27-alpine` copies `dist/` and the existing `nginx.conf` (cache rules updated for Astro's hashed `/_astro/` assets, which can be immutable).

Same port 80 and health check. Coolify's base directory becomes `/`.

## Risks / Trade-offs

- [The bundle doesn't exist yet] → The interim bundle (D2) lets all website work proceed. Switching is a one-line `bundle.json` change plus deleting `interim/`.
- [Build dependencies grow] → Astro and check tools are build-time only. Visitors get less JS than today, because islands load per page.
- [Build time] → Astro builds this size of site in seconds. The Playwright checks take a few minutes in CI only. The Docker build adds `npm ci` (cached by layer).
- [Docs links break between bundle versions] → The link check runs against the pinned bundle, so a bad bump fails CI before deploy.
- [Size for visitors] → It goes down: no Google Fonts round trip, per-page islands instead of one 24 KB script everywhere, responsive images instead of 2160 px WebP for phones.

## Migration Plan

1. Build the Astro site alongside the old files on a branch, using the interim bundle.
2. Check it matches the current page visually.
3. Remove `index.html`, `styles.css`, `main.js` and the committed `docs/`.
4. Merge, then switch Coolify to this repository (base directory `/`).
5. When the app's first release with a bundle exists, pin it and delete `interim/`.

Rollback: revert the merge. The old static files are in history.

## Open Questions

- Whether to keep Bricolage Grotesque as the display face or use Inter throughout. A design-pass decision in `website-switcher-pages`, and either way self-hosted.

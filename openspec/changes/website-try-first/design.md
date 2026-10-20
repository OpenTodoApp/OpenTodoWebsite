# Design

## Context

- **What this builds on.** `website-platform` (the header in `src/components/SiteHeader.astro`, the `<details>` phone menu, the checks and browser tests), `website-switcher-pages` (the hero in `src/pages/index.astro`, `/self-host/` with `InstallTabs`), `website-first-visit` (the get-it block under the hero, with the demo card that already states the sandbox lifetime from `/docs/self-hosting/demo/`), `website-content-hub` (`EndCta.astro` on every content page), `website-languages` (the translated home pages read `src/i18n/*.mjs`, whose shapes a unit test compares), `website-trust-pages` (`/status/` describes the demo).
- **What the header does today.** `SiteHeader.astro` renders "Try the demo" as `a.btn.btn-primary.btn-small.header-cta`, which `site.css` hides below 768 px (line 101), shows from 768 px (line 126) and hides again from 768 to 1023 px (line 612, "every page offers the demo in its content"), and a second demo button inside the phone menu's `.menu-cta`. The star button joins only from 1360 px. `tests/widths.spec.ts` requires every visible header item on one line at 768, 1024, 1280, 1359, 1360 and 1440 px, and `tests/no-js.spec.ts` opens the phone menu at 360 px without JavaScript.
- **What the analytics already record.** `public/analytics.js` sends `cta-demo` for any link to `demo.open-todo.app` with `section` from `sectionOf()` (`nav` for the header, `hero`, `get-it`, `end-cta`) and `cta-docs` for a jump from a site page into `/docs/`. Nothing is recorded for seeing a link.
- **What the bundle knows about platforms.** The docs site in the bundle ships `docs/search.json` with `pages: [{ t: title, u: '/docs/<slug>/' }]` in the docs' own order (the app's `web/scripts/docs/build.mjs`). In the pinned release (v0.7.0) the admin section holds the guides `self-hosting/docker`, `coolify`, `unraid`, `truenas`, `easypanel`, `casaos`, `cosmos`, `dokploy`, `portainer`, `umbrel`, `runtipi`, `kubernetes`, `podman`, `caprover`, `fly`, `render`, `synology`, plus `demo`, `sso`, `outgoing-email` and `host-mode`, which are not platforms. `src/lib/bundle.ts` already exposes `manifest` (image, `facts.port`, `facts.dataDir`), `versionTag` and `docExists()`.
- **Constraints.** No new script (the site's rule of pages readable without JavaScript, and the third-party-script check); icons only from the sprite, no logos (honest comparisons rule, the emoji check); every statement about the app links a docs page of the pinned release (`scripts/check-content.mjs` for content, the link check for pages); British spelling and the voice guide's calm register.

## Goals / Non-Goals

**Goals:**
- A visitor on any page, at any width, can reach the demo in one tap and is told what it is before or as they tap.
- A self-hoster sees in the first screen whether their platform has a one-click install, and gets to the right guide in one click.
- The platform list cannot go stale: it is computed from the pinned bundle and checked by a test, so a pin to another release updates or shrinks it without a hand edit.

**Non-Goals:**
- Changing `InstallTabs` (the tabs stay for the commands), the get-it block, the Learn menu or the footer.
- A per-platform page on this site, a platform picker with questions (`/self-host/plan/` does that), or screenshots of the platforms.
- Any new event in `analytics.js`.

## Decisions

### D1. The header's demo link shows at every width, paid for by the wordmark
The existing `a.header-cta` becomes visible at every width: the rule hiding it below 768 px and the tablet override (768–1023 px) go. At 360 px the header then holds the brand, the demo button and the Menu summary; to keep it on one line the wordmark `OpenTodo` is hidden below 480 px and from 768 to 1023 px (the logo stays, the brand link gets `aria-label="OpenTodo, home"`), which frees about 90 px, more than the `btn-small` costs. From 1024 px nothing changes. The phone menu keeps its own demo button in `.menu-cta` so the panel stays a complete list of actions.

Alternatives: a text "Demo" nav link at tablet width (the nav at 768 px is already at `gap: 0`; a ninth item wraps), a shorter label on phones (a different visible name from the accessible name confuses screen reader users who see the screen), hiding Help or Docs at tablet width (both are spec'd navigation). The width test (`tests/widths.spec.ts`) gains 360, 390 and 480 px rows and measures the whole header, so a wrapping button fails the checks.

### D2. Honesty in two forms, from one sentence
One sentence, kept in `src/lib/site.ts` as `SITE.demoNote` next to `SITE.demo`: "A private sandbox with sample data, deleted after two hours without activity. Nothing to install, no account." It is restated from `/docs/self-hosting/demo/` of the pinned release, and the pull request that pins a release with a different lifetime changes it (the same discipline as the get-it card and `/status/`). The header's desktop link carries `aria-describedby` pointing at a `.visually-hidden` paragraph with that sentence, so assistive technology hears it without the header growing; the phone menu shows the sentence under its demo button as visible text with the link "How the demo works" to `/docs/self-hosting/demo/`, whose presence the link check verifies. The hero and `EndCta` print the same constant followed by the same link. Alternatives: a `title` attribute (unreachable on touch and by keyboard), a tooltip (needs script or hover), the sentence beside the desktop button (no room at 1024 px).

### D3. The platform list: a recorded order intersected with the bundle's docs index
`scripts/lib/platforms.mjs` (plain ESM, like `scripts/lib/bundle.mjs` and `src/i18n/index.mjs`, so `node --test` can load it) holds two tables and one function:
- `PLATFORMS`: `{ slug, name }` in the maintainer's order, where `slug` is the docs page under `/docs/self-hosting/` and `name` the visible text (proper nouns, so the same in every language).
- `NOT_PLATFORMS`: the self-hosting guides that are not platforms (`docker`, `demo`, `sso`, `outgoing-email`, `host-mode`).
- `platformsIn(pages)`: given the bundle's `search.json` pages, returns the `PLATFORMS` whose guide exists, in table order, each with its `href` and the docs title; and `unknownGuides(pages)`: self-hosting pages in neither table.

`src/lib/bundle.ts` gains `docsIndex()` (reads `docs/search.json` once at build) and `src/lib/platforms.ts` exports `platforms = platformsIn(docsIndex().pages)`. `scripts/test/platforms.test.mjs` checks the function against a fixture index (one platform missing, one unknown guide) and, when `.bundle/` is present, that `unknownGuides()` is empty for the pinned bundle, naming any guide it finds. The link check covers the hrefs. Alternative: reading the Markdown front matter's `order` from the app repository (the website only has the built docs); taking every self-hosting page automatically (the row would show "Single sign-on" and "Host mode" as platforms, and the docs titles "Running on …" are too long for a row).

**Assumption recorded for the maintainer: the order is by expected popularity among people who self-host at home or on a small server, not by the docs' order.** Proposed: Coolify, Unraid, Portainer, Synology, CasaOS, Umbrel, TrueNAS, Dokploy, Easypanel, Runtipi, Cosmos, CapRover, Kubernetes, Podman, Fly.io, Render. Reordering is a one-line change in the table; nothing else depends on the order. Docker is deliberately not in the row: it is the fallback command at its end.

### D4. One component, two sizes
`src/components/InstallRow.astro` takes `limit` (the hero passes 8; `/self-host/` passes none) and `heading` (the hero reads "Install in one click", from the dictionary on translated pages). It renders a short heading paragraph with an `id`, a `<ul>` with `aria-labelledby` of inline `<li><a>` items (`display: inline-flex; min-height: 32px; padding-inline: 0.5rem`, separated by the list's gap, not by characters, so a text rendering reads a list), then one `<li>` with `<code>docker run -d -p {port}:{port} -v opentodo-data:{dataDir} {image}</code>` built from `manifest.image`, `manifest.facts.port` (default 8080) and `manifest.facts.dataDir` (default `/data`), followed by "Docker guide" to `/docs/self-hosting/docker/`. When `limit` cuts the list, a last item "All {n} platforms" links `/self-host/#platforms`, the `id` of the new section on the self-hosting page. A closing `p.meta` says "Guides from the docs of OpenTodo {versionTag}", the row's source statement. No copy button: that needs script; `InstallTabs` on the same self-host page keeps its copy button for people with JavaScript, and `<code>` text selects and copies by hand. Alternatives: cards per platform (sixteen cards push the demo off the first screen), a `<select>` (needs script to navigate), icons per platform (logos are out; generic icons add nothing).

### D5. Hero and self-host page
Home hero (`index.astro`): the `cta-row` is unchanged (demo, install, import, in that order, which the switcher spec requires); under it a `p.hero-note` with `SITE.demoNote` and the link "How the demo works", then `<InstallRow limit={8} />`, then the existing two notes. The miniature stays in the second column; at 390 px the row adds about two lines before it, which the first-visit scenario (live demo reachable by scrolling once) still allows. `/self-host/`: a new `section#platforms` directly after the `page-head`, before `#install`, with `<InstallRow />`; the head's "Install it" button keeps pointing at `#install`, where the commands are.

### D6. Translated home pages
`src/pages/[lang]/index.astro` renders the same row with `heading={t.common.installRow}` and prints `t.common.demoNote` under its buttons. The five dictionaries each gain `common.installRow`, `common.demoNote`, `common.howDemoWorks` and `common.allPlatforms` (with `{n}`); the shape test in `scripts/test/i18n.test.mjs` fails if one is missing. Platform names and the Docker command are not translated.

### D7. Analytics unchanged
The header link already sends `cta-demo` with `section: "nav"`; the hero's with `hero`; `EndCta`'s with `end-cta`. Row links go to `/docs/…`, so `cta-docs` fires with the row's section and the docs path, which is enough to see which platforms people pick. `analytics.js` is not edited, so "measured as a click only" is true by construction, and the no-new-script rule holds.

### D8. `EndCta`
Below the `cta-row`, a `p.meta` with `SITE.demoNote` and the "How the demo works" link. The demo button is already first; the spec now says so.

## Effect on build and download
- Build: reading `search.json` once (about 100 KB, a few milliseconds) and one more unit test; no new image, page or dependency. Astro build time unchanged within noise.
- Download: the header gains one hidden paragraph and the menu one sentence (under 0.4 KB per page); the home and self-host pages gain the row (about 1.5 KB of HTML each for sixteen links; the hero's eight about 0.8 KB); `site.css` gains under 0.5 KB. No new script or font; the site's per-page JavaScript stays as it is.

## Risks / Trade-offs
- [A wordmark-less header on small phones reads as an unnamed logo] → the favicon is the app's icon, the brand link keeps its accessible name, and the home page's `h1` names OpenTodo in the first screen; from 480 px the wordmark is back.
- [Sixteen links in a hero crowd a phone screen] → the hero shows eight and links the rest; the self-host page shows all; `tests/widths.spec.ts` and the a11y run at 360 px catch overflow and target spacing.
- [The honesty sentence drifts from the docs] → one constant, printed in four places, and the pull request that pins a bundle checks `/docs/self-hosting/demo/` (the same practice `/status/` and the get-it card already follow); the link check fails if the page disappears.
- [A platform's guide moves or is renamed in a release] → it drops out of the row (no broken link) and the unit test names the new unknown guide, so the pin pull request updates the table.
- [`aria-describedby` on a link is read every time the link is reached] → the sentence is short; screen reader users can skip descriptions, and the alternative (no description) hides what the demo is.
- [Archive order] → the three deltas modify requirements that live in `website-switcher-pages`, `website-platform` and `website-content-hub`, none archived yet, so `openspec validate` notes that archiving this change needs those specs first. This change is archived after them (or in the same batch, after them).

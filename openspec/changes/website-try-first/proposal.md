# Proposal

## Why

People want to use the app before they read about it, and the site still makes them read first. The header's "Try the demo" button disappears below 1024 px (on a phone it is three taps away, inside the menu), nothing near it says what the demo is, and the only way to see where OpenTodo installs in one click is to scroll the self-host page to its tabs or to search the docs. The pinned release (`bundle.json`, v0.7.0) ships one-click templates and a guide for sixteen platforms, from Coolify and Unraid to Synology and Umbrel, which the site never lists. This change puts the two actions a first-time visitor wants, try it and install it, on the first screen of every page, with words and structure only: no new facts about the app, no new script.

## What Changes

- **A persistent "Try the demo" action in the header of every page**, at every width: on a phone it stands beside the menu button instead of inside the menu panel only; on tablets, where it is hidden today, it returns. It stays a plain link to the demo, honest about what the demo is: a visually hidden description for assistive technology, and in the phone menu a visible line saying that the demo is a private sandbox with sample data, deleted after two hours without activity, linking the demo documentation of the pinned release. Clicks keep being counted by the self-hosted analytics as the existing `cta-demo` click event, nothing else is recorded.
- **The home hero says what the demo is** in one line under its buttons (nothing to install, no account, a private sandbox that resets), and gains an **"Install in one click" row**: the most popular platforms as text links, each to that platform's guide in the docs of the pinned release, with the Docker command as the fallback and a link to the full list. The hero's buttons keep their order: the demo first, install second, import third.
- **The self-hosting page gets the full row** in its first screen: every platform with a guide in the pinned bundle, in an order the maintainer decides, then the Docker command. The platform list is derived from the bundle's docs index at build time, so a platform appears only when the pinned release has its guide, and the row says which release it describes.
- **The end-of-page calls to action** on content pages (guides, how-tos, templates, topics, switch and comparison pages, and every other page that ends with them) keep the demo as the first option and gain the same one-line honesty note with its docs link.
- **Translated home pages** (German, French, Italian, Spanish, Portuguese) get the same hero line and row through their dictionaries; the header's new text is English, like the rest of the header.

Pages and sections affected: the header on every page (and the phone menu), the hero of the home page and its translations, the first screen of `/self-host/`, and the closing calls to action of every page that ends with `EndCta`. No new page.

## Out of scope

- The demo itself: what the sandbox contains, how long it lives, its limits. The site only restates the demo documentation of the pinned release.
- App store listings, a desktop app, a hosted offering or any pricing. OpenTodo stays "not offered as a hosted service", as the get-it block says.
- Per-platform pages on this site (one page per server platform, with the steps restated). The row links the docs; a page per platform is its own content change.
- Changes to the get-it block, the cost page, the about page or the Learn menu from `website-first-visit`; this change builds on them. The get-it block's demo card already carries the sandbox lifetime; the hero line is a shorter version of it, one screen earlier.
- New analytics events. The existing click events (`cta-demo` with its section, `cta-docs` for jumps into the docs) already cover every new link.

This serves the site's purpose (win people who pay for a task app today; serve self-hosters second) the way `website-first-visit` does: it shortens the path from landing to using. `content/BACKLOG.md` lists content pieces only, so this is a structure change, not a content piece. No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `marketing-website`: the home page's "Outcome-first home page" requirement (from `website-switcher-pages`) gains the honesty line under the hero buttons and the install row; a new requirement "Install in one click row" covers the row on the home page and the self-hosting page, its source in the bundle and its order. `website-first-visit` already covers the get-it block below the hero; this change extends that capability one screen up and leaves the block as it is.
- `website-platform`: the "Shared layout and navigation" requirement gains the demo action in the header at every width, its honesty line in the phone menu, and the rule that it is measured as a click only.
- `website-content`: the "Content navigation" requirement's closing calls to action now name the demo as the first option, with its honesty note and docs link.

## Impact

- **Website:** `src/components/SiteHeader.astro` (the demo action at every width, the hidden description, the phone-menu line), `src/styles/site.css` (header widths, the row), a new `src/components/InstallRow.astro` and `src/lib/platforms.ts`, `src/lib/bundle.ts` (reading the bundle's docs index), `src/pages/index.astro`, `src/pages/[lang]/index.astro` and the five dictionaries in `src/i18n/`, `src/pages/self-host.astro`, `src/components/EndCta.astro`, the browser tests (`tests/no-js.spec.ts`, `tests/widths.spec.ts`) and a unit test for the platform list.
- **Visitors:** under 0.5 KB more HTML in every page's header, about 1.5 KB on the home and self-host pages for the row, under 0.5 KB of CSS; no new script, no image.
- **Dependencies:** none.

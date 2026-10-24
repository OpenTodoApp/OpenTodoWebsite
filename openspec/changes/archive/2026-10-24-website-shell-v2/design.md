# Design: website-shell-v2

## D1. Five destinations and one primary action
- **Links:**
  - Features, Learn, Compare, Docs, Blog;
  - the current one is marked with the grey selected surface (`website-precision-look` D4);
  - Learn is current on `/help/`, `/guides/`, `/how-to/`, `/toolkit/`, `/topics/`, `/templates/` and `/switch/`, the guidance pages it gathers.
- **Actions:**
  - "Get started" is the one primary button; "Try the demo" is secondary.
  - Between 768 and 1023 px only "Get started" shows, so everything fits on one line; every page also offers the demo in its content.
  - The star button keeps its 1360 px threshold.

## D2. Targets in `NAV`
- `src/lib/site.ts` exports `NAV = { features, learn, start }`.
- The header, footer and any page that links "Get started" read it.
- Later changes repoint the targets in one line each, and the link check proves every target exists in the build.

## D3. Phone menu
- One `<details class="nav-menu">`: the five links, then the two actions and the star.
- It opens by tap, Enter or Space without a script, as today.

## D4. Footer
- **Product:** Features, Get started, Install the app, Self-host, Moving from another app.
- **Learn:** Guides and how-tos, Templates, Docs, Developers, What's new.
- **Project:** About and trust, Compare, Blog (while posts exist), Demo status, Accessibility.
- **Community:** GitHub, Discord, Buy me a coffee, RSS feed.
- **Fine print:** the licences (App AGPL-3.0, website code MIT, words and images CC BY 4.0), Security, the app's and the website's specifications and source, the copyright and analytics sentence.
- The headings are visible `h2`s, as today, so the columns stay navigable by heading.

## D5. Tests
- `tests/no-js.spec.ts` checks the five links in the phone menu on every page, and that Learn opens the Learn page from the phone menu.
- The Learn-menu test goes away with the menu.
- `tests/widths.spec.ts` keeps checking that header items stay on one line at 768–1440 px.

## Effect on build time and download size
- No effect on build time.
- Every page's HTML gets about 2 kB smaller: the footer drops from about 40 links to 19, and the header loses the Learn panel.
- No new requests.

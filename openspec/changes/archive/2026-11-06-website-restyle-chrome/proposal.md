# Proposal

## Why

OpenTodo's 1.0 is "trust first", and the owner's brief for the website is less noise everywhere (PLAN-1.0 Track C). The header carries six links and three buttons, translated pages add a second bar of seven language names, and the footer has four groups of 22 links, three brand-coloured buttons, a seven-language list, a seven-link legal row and a paragraph of fine print. The same asks (demo, star, coffee, Discord, Support) appear in the header, the footer and the end of every page at once.

## What Changes

- Header: Features, Learn, Docs and Blog; then a language switch, a quiet "Star" link to GitHub and one primary action, Try the demo. Compare, the Support pill and the Get started button leave the header (Compare is removed by a later change; Get started and Support stay in the phone menu and the footer).
- Phone header: the logo, Try the demo and a menu button; the menu holds the four destinations, Get started, the star and the language switch.
- A language switch (`LangSwitch.astro`): one `<details>` disclosure showing the current language's code, listing this page in every language when it is translated and each language's home page otherwise. It replaces the language bar on translated pages and the language list in the footer.
- Footer: the brand line and the language switch, three groups (Product, Learn, Project), one Community row of text links with icons (Star on GitHub, Sponsor, Buy me a coffee, Discord, X, RSS), one line of version and licences. The coffee and Discord brand buttons leave the footer.
- A few lines of script close an open menu or language switch on Escape or a click elsewhere; both work without it.

Pages affected: the shared header and footer of every page in every language. Out of scope: the closing call to action of content pages (next change), page content, the docs site (built by the app repository). No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `marketing-website`: the navigation requirement (four destinations and one action).
- `website-platform`: the shared layout requirement (header and footer contents).
- `website-languages`: language discovery through a switch instead of a bar and a list.
- `website-community`: the Discord link in the footer becomes a text link in the Community row; the ways to the support page lose the header pill.

## Impact

`src/components/SiteHeader.astro`, `SiteFooter.astro`, new `LangSwitch.astro`, `src/layouts/Base.astro`, `src/styles/site.css`, tests `scripts/test/community.test.mjs`, `tests/no-js.spec.ts`, `tests/widths.spec.ts`.

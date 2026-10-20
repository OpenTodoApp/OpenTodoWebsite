# Design

## Context

`src/lib/site.ts` holds the facts that are about the project rather than a release (`appRepo`, `siteRepo`, `coffee`); `SiteFooter.astro` renders the same footer on every page including the translated `[lang]` pages, with English link text. `about.astro` and `help.astro` already link `${SITE.appRepo}/issues`. The checks (`npm run check:dist`) verify internal links, emoji and third-party scripts over `dist/`; external anchors are allowed and not fetched. Motivation: see proposal.md.

## Goals / Non-Goals

**Goals:**
- One constant, three mentions, zero bytes loaded from Discord.
- No change to the bundle pin or the content collections.

**Non-Goals:**
- Discord's widget or server-count badge (third-party request, forbidden by the platform rules).
- A new page about the community; the three mentions are enough until there is something to say.

## Decisions

- **D1. `SITE.discord = 'https://discord.gg/Jmj7WuRQ'` in `src/lib/site.ts`.** Alternative: read it from the bundle. Rejected: the bundle carries release facts and a new invite would otherwise wait for an app release.
- **D2. Footer: a "Community on Discord" item in the Project list, placed first**, before "About and trust", since it is the one item a visitor acts on. Text only, like every footer link (no icon, no brand mark; no Discord glyph exists in the bundle's icon set anyway).
- **D3. About: the "Questions and bug reports go to the issue tracker" list item becomes two sentences in one item**: questions and conversation on Discord, bug reports and ideas on the issue tracker, security by email. Keeps the list length and the `check` icon.
- **D4. Help: the "Something is wrong" lede gains "ask on Discord" before "open an issue"**, both as links; the fixes list is unchanged.
- **D5. Test: `scripts/test/checks.test.mjs` (or a new `footer.test.mjs`) builds nothing extra**: it loads `dist/index.html` and `dist/it/index.html` after the build the test job already runs and asserts the anchor and the absence of any `discord` address in `src`, `href` of `link`, `script` or `iframe`.

Build time: unchanged (no new page, no new asset). Download size: about 80 bytes per page of HTML.

## Risks / Trade-offs

- [The invite expires] → A permanent invite on the server; otherwise one constant to edit and the "Changed invite" scenario proves it propagates.
- [Translated pages show an English footer label] → Already true for every footer link (website-languages D4 translates page content, not the footer); a translated footer is that change's job, not this one.
- [Analytics counts outbound clicks] → The existing `/analytics.js` custom events are not extended; no event for the Discord link.

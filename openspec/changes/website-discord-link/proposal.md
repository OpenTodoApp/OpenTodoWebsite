# Proposal

## Why

OpenTodo has a Discord server (https://discord.gg/Jmj7WuRQ) where people can ask questions, compare set-ups and talk to the maintainer. The website today points only to the GitHub issue tracker for questions, in the footer's Project list, on the About page and on the Help page, so a visitor who wants to talk rather than file a report has nowhere to go.

## What Changes

- The footer's Project list, on every page and in every language, gets a "Community on Discord" link.
- The About page's "Who makes it" section names the Discord server next to the issue tracker as the place for questions.
- The Help page's "Something is wrong" lede offers Discord as a way to ask before opening an issue.
- The invite address joins the site-wide constants beside the repository and coffee addresses, so the footer, About and Help read one value.

Pages affected: the shared footer (every page), `/about/`, `/help/`. Out of scope: a Discord widget, member count or embed (a third-party script or request, which the site forbids), a link in the header navigation, a mention on the home page or in the blog, and the docs served from the bundle (the app repository's `discord-community` change adds the invite to the "Feedback and support" page, which this site picks up at the next bundle pin). No new build dependency.

## Capabilities

### New Capabilities

- `website-community`: where the site tells visitors they can talk to the project and other people who use it (today Discord and the issue tracker), and how that stays true.

### Modified Capabilities

None. The footer, About and Help requirements live in changes not yet archived (`website-platform`, `website-trust-pages`, `website-help-and-howtos`); this change adds a requirement about the community links on top of them instead of editing those deltas.

## Impact

- `src/lib/site.ts` (one constant), `src/components/SiteFooter.astro`, `src/pages/about.astro`, `src/pages/help.astro`.
- `scripts/test/*.test.mjs` gain a check that the built footer carries the invite on the home page and on a translated page.
- No dependency, no script, no image: a few hundred bytes of HTML per page.

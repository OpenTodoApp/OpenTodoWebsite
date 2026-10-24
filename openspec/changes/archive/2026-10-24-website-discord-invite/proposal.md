# Proposal

## Why

The Discord server is linked today only as text: one footer item, one sentence on About, one on Help. Visitors scanning a page do not notice it. The maintainer wants the community to be visible and to read as a warm invitation, with the button people recognise from other projects.

## What Changes

- A Discord button drawn by the site: Discord's blurple, its logo, white label, the same size and shape as the site's other buttons. Nothing is loaded from Discord.
- The home page, in every language, gets a "Come and say hello" section with a short invitation and the button, before the blog and the closing call to action.
- The closing call to action of every content page puts the button beside the coffee button, with one line inviting questions and ideas.
- The footer shows the button under the coffee button; the Project list keeps its text link.
- The About page ("Who makes it") and the Help page ("Something is wrong") show the button.

Pages affected: home (all languages), every page with the closing call to action, the shared footer, `/about/`, `/help/`. Out of scope: a Discord widget, member counts or presence (third-party requests), a header navigation item, a pop-up or banner. No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-community`: the footer requirement adds the button; the About and Help requirement adds the button; new requirements for the button itself and the home page section.

## Impact

- New `src/components/DiscordButton.astro`; `src/styles/site.css` (button colours); `src/pages/index.astro`, `src/pages/[lang]/index.astro`, `src/i18n/*.mjs` (section text in six languages); `src/components/EndCta.astro`, `src/components/SiteFooter.astro`, `src/pages/about.astro`, `src/pages/help.astro`.
- `scripts/test/community.test.mjs` extended.

# Proposal

## Why

OpenTodo is free and will stay free, and the maintainer pays for what it takes to run it. People who like it ask how they can help, and today the site only offers a coffee button. The maintainer wants one honest page that says what he promises, what it costs and how to help, in his own words, and wants it easy to find.

## What Changes

- A new English page `/support/` with the maintainer's approved text, unchanged: a hero with the two money buttons, the five promises as numbered cards, the costs as one table card (in euros: they are the project's own costs, not another app's prices), a callout with the buttons again, the ways to help without money as a light grid with the Discord button, and a personal sign-off.
- A GitHub Sponsors button drawn by the site (`SponsorButton.astro`), like the coffee and Discord buttons; the address is a new site-wide constant `SITE.sponsor`.
- A "Support" link in the main navigation, last, as a soft pink pill with a heart; also in the phone menu.
- The footer: "Support OpenTodo" in the Community list and, from 768 px wide, a "Support" link beside the coffee and Discord buttons.
- The closing call to action of content pages: a line "OpenTodo is free and always will be." with a link to `/support/`.
- About: a link to `/support/` in the licence section.
- The site defines the `--ot-mix-hue-*` amounts the bundle's hue tokens refer to (the app sets them in its own stylesheet), so the pink hue tokens resolve.

Pages affected: `/support/` (new), the shared header and footer, every page with the closing call to action, `/about/`. Out of scope: translations of `/support/` (the site translates only the home page), payment widgets or counts loaded from GitHub or Buy Me a Coffee, any change to the app. No new build dependency.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-community`: new requirements for the support page and for the links that lead to it.

## Impact

- New `src/pages/support.astro`, `src/components/SponsorButton.astro`; `src/lib/site.ts`; `src/components/SiteHeader.astro`, `SiteFooter.astro`, `EndCta.astro`; `src/pages/about.astro`; `src/styles/site.css`; `scripts/check-content.mjs` (knows the page); `scripts/test/community.test.mjs` extended.

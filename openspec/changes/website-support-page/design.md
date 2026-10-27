# Design

## Context

The site already draws two third-party brand buttons itself (`CoffeeButton.astro`, `DiscordButton.astro`) and loads nothing from those services. Only the home page is translated (`TRANSLATED_PAGES`); every other page is English and its footer offers each language's home page. The voice guide's "describe costs in words, never in currency" rule is about other apps' prices. Motivation: see proposal.md.

## Goals / Non-Goals

**Goals:** the maintainer's words exactly as approved; a warm page that reads well in light and dark from 360 px; easy to find from every page; no third-party request.

**Non-Goals:** translations; live sponsor counts or embeds; a donation form.

## Decisions

- **D1. Page layout.** `Base` layout. A hero (title, the first paragraph as the lede, Sponsor and coffee buttons) beside a card with the second, personal paragraph signed with a monogram "R" (there is no avatar in the site's author data); "What I promise" as an ordered list of five cards with Lucide icons from the bundle and a decorative counter; "What it costs" as a real `<table>` labelled by its heading, inside one card, the note about time set in muted italics; "If you'd like to help" as a pink callout with the buttons; the non-money list as a grid of light tiles with icons; the Discord button; a sign-off band. No closing call to action, which would link to the page itself. The emoji in the approved text stay as text; none is used as an icon or list marker, so the emoji check passes.
- **D2. `SponsorButton.astro`**, modelled on the coffee button: GitHub's light grey `#f6f8fa`, text `#24292f` (13:1), border `#d0d7de`, the Octicons heart in `#bf3989` (5.4:1), the same in both themes, the heart `aria-hidden`. The address is `SITE.sponsor`; every sponsor link reads it.
- **D3. Navigation pill.** "Support" is the last navigation item, with a filled heart icon from the bundle, coloured with the app's pink hue tokens (`--ot-hue-pink-soft` background, `--ot-hue-pink-text` text), which have light and dark values. The bundle's `tokens.css` mixes those colours by `--ot-mix-hue-*` amounts that the app defines in its own stylesheet; the site sets the same four values (14%, 68%, 22%, 78%) in `:root`. This also makes the existing violet cover panel of development posts resolve. No motion: hover and the current page add a 1 px inset ring. Between 768 and 899 px the navigation links get slightly less padding so the extra item fits.
- **D4. Currency.** The costs are shown in euros as the maintainer asked; they are the project's own costs, so the voice guide's rule does not apply. The content check lints Markdown collections only, so no exception is needed; `/support/` is added to its list of known pages so content can link to it.

Build time: unchanged. Download: one more HTML page (about 30 KB before compression); every page gains a few hundred bytes of markup and CSS for the navigation item and the footer link. No new request.

## Risks / Trade-offs

- [A sixth navigation item at tablet width] → slightly tighter link padding from 768 to 899 px; the browser tests check for sideways scroll.
- [Pink text on pink background] → the hue tokens are the app's tag colours, designed for AA; the axe check runs on every page in both themes.

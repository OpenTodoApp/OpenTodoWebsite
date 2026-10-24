# Proposal: website-precision-look

## Why

The app's 0.11 redesign ("Precision") made it flatter and quieter: hairlines instead of cards and shadows, grey for everything but state, tighter type. The website still has the look of the app before that, with soft cards, shadows, a green glow behind the hero, accent pills and fake browser chrome around screenshots. That is the first thing that makes the site "not represent the app any more". This change moves the site's foundation to the same language. It is the first step of the website redesign (`design-references/website-round2`), and the pages built later (shell, features, Learn, Get started, Compare, home) sit on it.

## What Changes

- **Surfaces:** the page background becomes the surface token. The canvas token marks bands (the alternating sections, the end band, the footer), as the app puts content on an inset surface over its canvas.
- **No decoration:** no shadows on cards, buttons or screenshots (only popovers keep one), no gradient behind the hero, and screenshots in a plain hairline frame without the fake browser bar.
- **Grey for everything but state:** the current navigation item, eyebrows and kickers are grey rather than accent pills. Accent stays for links, the primary button and success.
- **Type and shape:** a calmer type scale (650 weight headings, a 3.6 rem cap on h1), 8 px radius on buttons, 12 px on cards, and 40 px buttons (44 px on touch).
- **Reusable pieces for later pages:** row lists (`.rows`), group bars (`.group-bar`) and the eyebrow, all built from tokens.
- All colours still come only from the bundle's `--ot-*` tokens. With today's pin (v0.9.0) the palette is the old one; when the bundle moves to 0.11 the site takes the Precision palette with no edit here.

**Out of scope**
- Navigation, header and footer structure (`website-shell-v2`).
- Page content and information architecture (later changes).
- Any new screenshot or 0.11 fact.

**Pages affected:** every page, because the change is in `src/styles/site.css` only. No markup changes, except removing the fake browser bar's dots where `ScreenshotFrame` draws them.

**New build dependency:** none.

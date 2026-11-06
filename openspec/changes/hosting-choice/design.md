# Design: hosting-choice

## D1. One component, two pages

`RunChoice.astro` draws the choice as the `.ways` list the start page already uses, in two columns from 900 px and stacked below. Both options use `btn-secondary`, so neither reads as the default. On `/start/` its links point at the server list on the same page (`#server`); on `/install/` at `/start/#server`.

## D2. The disclosure is one constant

`PIKAPODS_NOTE` in `src/lib/hosting.ts` holds the maintainer's sentence and `SITE.pikapods` the address, so every place that offers PikaPods says the same thing. The test fails if a page that names PikaPods calls it recommended or the easiest way.

## D3. Facts about PikaPods

The site states only what is needed to choose (updates and HTTPS handled for you) and links PikaPods' own page for price and sizes, which PikaPods can change.

Build time: unchanged. Download size: a few hundred bytes of HTML on three pages, no script.

# Design: hosting-page

## D1. One page, one action

The page follows the site's bar: a headline, then three short blocks and the disclosure. The only primary button is "Run it on PikaPods", in the page head, so a phone visitor sees it without scrolling; every other link is text or a secondary button. The page reuses `.page-head`, `.checks`, `.steps` and `.ways`; site.css only gains a few lines for its layout.

## D2. Facts and where they come from

Price, billing, welcome credit, minimum size, updates, HTTPS, backups and the setup steps are PikaPods' own, read from https://www.pikapods.com/apps/opentodo on 2026-11-06. They live in `src/lib/hosting.ts` beside the disclosure (`PIKAPODS_FACTS`, with `checkedOn`), so one edit changes them when PikaPods does. The disclosure is the existing `PIKAPODS_NOTE`, unchanged. The backup point says PikaPods' server backups are not a per-pod restore, so people keep their own. Once the app's PikaPods guide is in the pinned bundle, the setup block links it.

## D3. Header

Hosting is the fifth entry in the header's list, after Blog, with `match: ['/hosting/']`, so desktop and phone menu stay one list. At 768 px the header still fits one line (checked by the existing tablet-width browser test and by eye). The header links `/hosting/`, never PikaPods, so the hosting-choice rule that the header does not link PikaPods still holds.

## D4. Language

`/hosting/` is English only, like `/start/`. The header's labels are not translated on any page (the home pages in other languages show Features, Learn, Docs and Blog in English), so Hosting is English too; translating one label of five would mix languages in one bar.

Build time: one more page and social card, well under a second. Download size: about 3 KB of HTML for `/hosting/`, a few bytes per page for the header link, one entry in `search.json`; no script.

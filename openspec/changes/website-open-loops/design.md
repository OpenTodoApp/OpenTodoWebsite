# Design

## Context

See proposal.md. From 0.8.0 the app's site bundle adds:

- `method.json` (schema 1): `{ schema, name, languages, tagline, moves, principles, places, rhythms, horizons }`; each term `{ id, name: {<lang>: text}, description: {<lang>: text} }`; moves also carry `route` (for example `/triage`) and `keys` (for example `"g p"`). Languages in 0.8.0: en, de, fr, es, it, pt. Generated from the app's own vocabulary and catalogs (`scripts/site-bundle.mjs`, `methodVocabulary`).
- the manifest fact `method`: the Open Loops features of that version (`vocabulary`, `modes`, `loop-home`, `next`, `waiting`, `project-walk`, `daily-check`, `monthly-look`).
- the method chapter of the docs under `docs/method/` (overview, catch, clarify, place, do, review, places, rhythms, horizons, set-up, coming-from-gtd) and its images, including the Loop home captures `docs/images/loop-light.webp` and `loop-dark.webp` (1500 × 950).

The site is pinned to 0.7.0, which has none of these. The section components, the navigation model (`src/lib/nav.ts`), the language dictionaries and the link check already exist.

## Goals / Non-Goals

**Goals:** a page that makes the method feel like a product (one strong visual: the loop), in the app's exact words, that goes live by itself when 0.8.0 is pinned.

**Non-Goals:** explaining every screen (the docs do that); a method guide in the guides collection; changing the app; touching the home page.

## Decisions

1. **The vocabulary is read, checked and typed in one place.** `scripts/lib/bundle.mjs` gains `readMethod(dir)`: it returns `null` when `method.json` is absent or the manifest's `method` fact lacks `vocabulary`, throws on an unknown `schema` or a missing move id (`catch`, `clarify`, `place`, `do`, `review`), and otherwise returns the vocabulary. `src/lib/bundle.ts` exports `method` (or `null`) and `term(t, lang)` (name and description in a language, English when a string is missing, which the app's own i18n check already prevents). *Alternative:* reading the file in each page; rejected because the "exists only with the method" rule must hold for pages, navigation and links alike.
2. **Pages that may not exist.** `src/pages/open-loops.astro` uses `getStaticPaths` returning one path when `method` is set and none otherwise; Astro then builds no page. `[lang]/open-loops.astro` returns one path per site language that `method.languages` lists. Every link to the page goes through `methodPage(lang)` in `src/lib/nav.ts`, which returns `null` without the method, so a link can never point at a page that was not built (and the link check would catch it if one did).
3. **The loop diagram: HTML on a circle, SVG only for the arrows.** `LoopDiagram.astro` renders an `<ol>` of five links placed on a circle with CSS (`cos()`/`sin()` of each move's angle times a radius in container units of the stage, from 560 px wide; pills in a row below that), an inline SVG behind them with five curved arrows drawn in `currentColor` with the tokens, and a centre panel. Text stays HTML, so it wraps, translates and scales with the user's font size; only the arrows are graphics. Each move is a link to its entry in the full list below, so without JavaScript it jumps there; the island script (about 0.5 kB, inlined by Astro on the Open Loops pages only) turns the links into a chooser: it marks the chosen move with `aria-current` and shows its detail in the centre, an `aria-live="polite"` region, and hides the full list. Below 560 px the detail sits under the moves. *Alternative:* the app's `open-loops.svg`; rejected because it is light-only with fixed colours and English text baked in.
4. **What the centre shows.** Description and keys come from the move. The "screen that serves it" is named only when the move's `route` is `/<id>` of a Place (Places carry no route of their own) or equals a rhythm's `route` (in 0.8.0: Catch → Inbox, Place → Waiting, Do → Next, Review → Weekly review; Clarify's `/triage` matches no term and shows none), so no name is invented.
5. **Sections.** Statement (head: tagline, one sentence on open loops, buttons to the demo and to `/docs/method/overview/`) → Showcase (the loop) → Catalogue (seven principles, plain numbered list, no cards) → Split (Places beside the Loop home capture, light and dark from `/docs/images/`) → Split alt (rhythms and horizons) → Statement (how prominent it is: Lists only, Companion, Open Loops first, linking `/docs/method/set-up/`) → Split (coming from GTD, linking `/docs/method/coming-from-gtd/` and the site's GTD guide) → Close. One Catalogue, so the composition rules hold; the page joins the composition check's list.
6. **The Loop home capture is used from the docs, not the screenshot list.** It is a bundle file the docs already ship; `ScreenshotFrame` gains a `docs` option that reads `docs/images/<name>-light.webp` and `-dark.webp` from the bundle through the same image pipeline, frame and crop as manifest screenshots. In a Split the 1500 px source is shown at about 560 px, so the frame uses the `crop` box `loop` (the sidebar arranged by the Places and the first tiles) to stay legible. *Alternative:* asking the app to add `loop` to its site screenshot list; worth doing later, not needed to ship.
7. **Words around the vocabulary.** English copy lives in the page; translations add a `method` block to each dictionary (head sentence, section headings and ledes, the three modes, the GTD paragraph). The modes' names are not in `method.json`; they are written as the docs of the pinned release write them and link there. The voice lint applies to the English copy.
7b. **Languages offered per page.** `alternatesFor()` takes the languages a page has (`pageLanguages()` in `src/lib/nav.ts` gives `/open-loops/` the vocabulary's languages), so the language switcher and `hreflang` links never point at a translation that was not built. The footer's Resources column stays at eight links by moving "Moving from another app" to the Product column.
8. **Links in.** The GTD guide, the weekly review template and the quiz result pages get a one-line "OpenTodo's own method" link rendered through `methodPage()`; Help gets an "use the Open Loops method" entry in "I use the app" and the Resources menu and footer get "Open Loops", all conditional.
9. **Testing without 0.8.0 pinned.** Unit tests run `readMethod` against `scripts/test/fixtures/method.json`, a copy of what the app's `methodVocabulary()` generates for 0.8.0 (refreshed by hand when the schema changes). Browser tests for the page are written against `sitePages()` and skip when `/open-loops/` is not built; a manual preview build with `BUNDLE_DIR` pointing at a locally generated 0.8.0 bundle (`make site-bundle` in the app) runs them before merge.

## Risks / Trade-offs

- [0.8.0 is published with a different vocabulary than the fixture] → the page reads the real file; only the fixture-based unit test could go stale, and the bundle-bump pull request's preview shows the real page.
- [The circle layout breaks with long translated move names] → names are one or two words in all six languages of 0.8.0; the layout falls back to the list below 640 px and the width check runs at 768 and 1280 for every language.
- [A visitor reads the page as a promise of GTD compatibility] → the copy says "inspired by GTD and simplified", as the docs do, and links the docs' "Coming from GTD".

## Effect on build and downloads

Build time: one more JSON read and six pages, under two seconds. Downloads: the Open Loops page adds the island script (under 1.5 kB) and the Loop home captures (about 44 kB each, one per colour scheme); no other page changes size beyond one link.

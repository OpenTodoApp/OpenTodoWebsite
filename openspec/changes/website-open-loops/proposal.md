# Proposal

## Why

OpenTodo 0.8.0 introduces **Open Loops**, a method of the app's own, inspired by GTD: five moves (catch, clarify, place, do, review), seven principles, seven Places a task can live, three rhythms and three horizons, with a Loop home and a setting for how prominent it is. It is the clearest answer the product has to "why this app and not just a list", and the site has nowhere to show it. The app already prepared for this: from 0.8.0 the site bundle carries `method.json`, the method's vocabulary in every shipped language "for the website's method page" (app spec site-bundle, "Method vocabulary in the bundle"), and a `method` fact in the manifest listing the Open Loops features of that version.

The site may only describe released features. 0.8.0 is in the app's changelog but not published yet, and the site is pinned to 0.7.0. So the page is built now, but appears only when the pinned bundle carries the method: it goes live, without further edits, in the pull request that pins 0.8.0.

## What Changes

- A new page at `/open-loops/` presenting the method, built from the section types (`website-section-system`):
  - a page head with the method's tagline from `method.json` and one sentence on what an open loop is;
  - **the loop**: the five moves drawn as a cycle (Catch → Clarify → Place → Do → Review → back to Catch), each move with its one-sentence description, the screen that serves it and its keyboard shortcut, all from `method.json`. With JavaScript, choosing a move on the cycle shows its detail in the centre; without, the same moves read as an ordered list under the drawing;
  - the seven principles; the seven Places beside a screenshot of the Loop home; the three rhythms and three horizons; how prominent the method is (Lists only, Companion, Open Loops first); and the way in for people coming from GTD;
  - every section links to its chapter of the method docs in the pinned release (`/docs/method/…`).
- The page in German, French, Italian, Spanish and Portuguese at `/<lang>/open-loops/`: the method's own words come from `method.json` in that language, so they always match the app; the surrounding sentences come from the site's dictionaries.
- Links to the page, present only while the page exists: the Resources menu and the footer, the Getting Things Done guide, the weekly review template, the method quiz's results, and Help's "I use the app" group.
- The page and every link to it are absent while the pinned bundle has no `method.json` or its manifest's `method` fact does not list `vocabulary`.

Out of scope: the 0.8.0 release post and the bundle bump itself (they come in the pull request that pins 0.8.0, as the blog rules require), changes to the home page (the method can join the features grid in a later change once released), any change to the app or its docs, and new screenshots in the app's site screenshot list (the page uses the Loop home images the docs already ship).

Pages affected: new `/open-loops/` and its five translations; the header's Resources menu and the footer on every page; `/guides/getting-things-done/`, `/templates/weekly-review/`, the quiz result pages and `/help/`.

## Capabilities

### New Capabilities
- `website-method`: the Open Loops page, its loop diagram, its translations, and the rule that it exists only for a bundle that ships the method.

### Modified Capabilities
- `marketing-website`: "Grouped navigation" adds Open Loops to the Resources menu while the page exists.
- `website-languages`: "Languages and translated pages" adds the Open Loops page to the translated pages while it exists.

Both modified capabilities come from implemented, unarchived changes (`website-navigation-and-home`, `website-languages`); archive those first. Apply after `website-navigation-and-home` and `website-section-system`.

## Impact

- `src/lib/bundle.ts` and `scripts/lib/bundle.mjs` (read and check `method.json`), `src/lib/nav.ts`, `src/i18n/*.mjs` and `src/i18n/index.mjs`, new `src/pages/open-loops.astro`, `src/pages/[lang]/open-loops.astro`, `src/components/LoopDiagram.astro` (an island with a small script), links in the guide, template, quiz and Help.
- Tests: unit tests against a `method.json` fixture taken from the app's generator; browser tests that run when the page is built.
- No new build dependency.

# Design

## Context

See proposal.md for why. The site is static Astro; colours come only from the pinned bundle's `tokens/tokens.css` (`src/styles/site.css` aliases `--ot-*` to `--text`, `--muted`, `--accent` …). The pinned release is v0.9.0, whose light muted tone measures 6.5:1 on the canvas and 6.8:1 on the surface, and whose white-on-emerald measures 5.5:1; every other text pair is above 7:1. The bundle's tokens carry no high-contrast blocks yet; the app change `accessibility-aaa` adds them to the bundle from its next release. The browser test (`tests/a11y.spec.ts`) already runs axe at A and AA on every page in light and dark at 360 and 1280 px and checks for sideways scroll; `tests/widths.spec.ts` and `tests/no-js.spec.ts` cover widths and the no-JavaScript pass. `scripts/check-content.mjs` is the claim lint. Controls are already at least 44 px tall; the header is sticky; `.narrow` is 46 rem (about 80 characters of body type); headings use `h1`–`h4`. The accessibility statement is hand-written prose.

## Goals / Non-Goals

**Goals:**
- The same promise and the same rule as the app, with a register the statement is rendered from, so the site never claims more than the checks prove.
- Honour "released facts only": the site measures the bundle it is pinned to and never copies token values.
- Extend the existing checks rather than adding tools.

**Non-Goals:**
- Re-colouring or re-spacing the pages beyond the prose rhythm.
- Checking the `/docs/` tree (the app audits it).
- A client-side contrast toggle: the system setting is the route, as on the app (which gives the preference to signed-in users).

## Decisions

**D1. One register, rendered into the statement.** `src/lib/a11y-exceptions.json`: `[{ id, criterion, where, pairs?: [{fg, bg}], measured?: {light, dark}, reason, route, endsWhen? }]`. `src/pages/accessibility.astro` maps the entries into its "Known exceptions" section and takes the target, the checks list and the bundle version from `src/lib/bundle.ts`; only "how to report" and the review date are page text. Initial entries: `muted-tone` (1.4.6, muted on canvas and surface, light 6.5 / 6.8, "the bundle's tone; ends when the pinned release measures 7:1"), `accent-label` (1.4.6, white on accent and accent-hover, 5.5 / 5.5, the brand emerald, route: the system's contrast setting once the bundle carries the override). Alternative: prose in the page — drifts, rejected.

**D2. Contrast check from the bundle.** `scripts/checks/contrast.mjs` parses the bundle's `tokens.css` (light block, dark block) with a small OKLCH-to-sRGB conversion (the bundle writes OKLCH literals and `color-mix` of tokens; the resolver handles literals and two-token mixes, as the app's does), takes a list of the pairs `site.css` uses (`src/lib/a11y-pairs.mjs`: text/strong/muted on bg/surface/sunken, accent-text on bg, white on accent and accent-hover, accent-soft-text on accent-soft, warning-soft-text on warning-soft), and applies the rule: unregistered below 7 fails, registered below 4.5 fails, registered at 7 in both themes fails as stale. A second pass scans `site.css` for `color:` declarations whose variable is a text alias and whose nearest `background` alias is not in the pair list, failing on an unlisted pair. Runs in `prebuild` after `fetch-bundle`. No dependency.

**D3. High contrast by media query.** The bundle's override block is selected by `[data-contrast="high"]`, and without JavaScript an attribute cannot follow a system setting. So the build transforms the bundle's own text: it reads the override blocks from `tokens.css` and emits them once more inside `@media (prefers-contrast: more)`, only when the blocks exist. This is a build-time transform of the pinned bundle, not a hand copy, so "released facts only" holds. The statement's "with" or "without the override" wording comes from the same existence check.

**D4. Hit areas.** Icon links and small controls get `min-width: 44px; min-height: 44px` where that changes nothing visible (the footer icons already sit on 44 px rows), and a `.hit` class with an `::after` inset to 44 px elsewhere (pagination numbers, language links, tag chips). The test in `tests/a11y.spec.ts` lists `a, button, input, select, textarea, summary, [tabindex]` per page, skips links whose parent is a paragraph or list item of prose, and for each calls `elementFromPoint` 22 px from the centre in four directions, failing on a miss. No exemption list: the site is small enough to fix every hit in this change.

**D5. Focus never obscured.** `html { scroll-padding-top: calc(var(--header-h) + 0.75rem) }` (the variable exists) and `scroll-padding-bottom` for the preview banner; the test tabs through every focusable element on each page, asserting containment and that `elementsFromPoint` at the corners and centre returns the element or a descendant on top.

**D6. Prose rhythm.** `.prose p, .prose li { line-height: 1.5; max-inline-size: 80ch; }`, `.prose p + p { margin-top: 1.5em × 1.5 }` (2.25 em), `text-align: start` on prose; `.lede` keeps its size but moves to line height 1.5. Body copy outside prose is unchanged. A stylesheet test reads the built CSS.

**D7. Trail.** `src/components/Trail.astro` takes the steps after Home (`[{ href, label }]`, outermost first, the current page not among them) and an optional `tail` for a group that has no page of its own (a template's category), and renders `<nav class="trail" aria-label="You are here"><ol>…</ol></nav>` with Home first and chevron separators drawn by CSS (the list order carries the meaning). It replaces the fifteen `p.breadcrumb` lines the templates had, and the blog listing adds it on category and later pages; top-level pages (depth one) have none. `tests/trail.spec.ts` checks every built page at depth two or more, without JavaScript, for the landmark with linked steps.

**D8. Prose check and build-time expansion.** A new check over `dist/` (`scripts/checks/prose.mjs`, run by `check:dist`, so components and Markdown are both covered): bare link text (the phrase list, case-insensitive), heading levels that skip, abbreviations (list in `src/lib/abbreviations.json`; the first visible use on a page must be inside `<abbr title>`, next to its expansion, or the page must contain the full phrase), and the long-sentence report (paragraphs and list items split into sentences, over 25 words reported with page and sentence, not failing). Rather than editing sixty pages by hand, and because many pages render words from the bundle (release notes, the help index), an Astro integration (`scripts/lib/abbr.mjs`, `astro:build:done`) rewrites every built English page once: the first prose use of each listed term becomes `<abbr title="…">` with the expansion in visually hidden text; a term that appears only in headings, links or buttons gets the `<abbr>` alone, so names stay what they read. Hidden text, code, existing abbreviations and translated pages (`/de/` … `/pt/`) are left alone. `src/components/Abbr.astro` remains for hand-written pages that want the expansion in a particular place.

**D9. AAA gate.** `withTags` gains `wcag2aaa`, `wcag21aaa`, `wcag22aaa`; `color-contrast-enhanced` nodes are filtered through the register by resolving the node's reported foreground and background colours against the registered pairs' resolved values for that scheme (ΔE under 2); everything else fails as today.

**Build time and download size.** Build time: the contrast check and the abbreviation lint add well under a second; the browser test grows by the AAA rules and the two passes, about a fifth longer. Downloads: the trail adds about 150 bytes per page, the prose rules and hit-area class about 400 bytes of CSS once, the high-contrast wrapper the size of the bundle's override block (about 1.5 KB) once the pinned release carries it; no script is added to any page.

## Risks / Trade-offs

- [The pinned bundle's muted tone keeps the site at 6.5:1 until a release] → Registered with an ending condition that the check enforces; the statement says so plainly. Using `--text` for ledes instead would change the look and is rejected by the premise.
- [axe cannot measure text over the hero's soft gradient] → Those nodes are "incomplete"; the token pairs cover them in `contrast.mjs`.
- [A trail on localized pages needs translated "Home" and section names] → The i18n strings already exist for navigation; the trail reuses them.
- [The abbreviation lint flags code samples and command names] → The lint skips `<code>`, `<pre>` and `<kbd>`.
- [The hit-area test is slow across every page and width] → It runs inside the existing per-page test, one pass per page, and stays in `test:browser`.

## Migration Plan

Ordinary pull request with a preview; the maintainer reviews the rendered statement and the trails. Nothing to migrate; the register can be edited in any later pull request.

## Open Questions

- Whether localized pages (`/[lang]/`) show the trail in the page's language or in English until the section names are translated; either satisfies the spec and the maintainer can choose on the preview.

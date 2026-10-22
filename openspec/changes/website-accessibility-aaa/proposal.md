# Proposal

## Why

The site promises WCAG 2.2 AA and checks it on every change. The app is moving to level AAA on one premise, **the look comes first** (app change `accessibility-aaa`): an AAA criterion is met by default wherever meeting it does not change how the page looks, and where it would, the page keeps its look, the criterion stays reachable through a presentation the visitor chooses or a system setting, and the exception is written down and measured. The website should make the same promise the same way, so that the first thing a visitor with low vision or a motor impairment meets is already what the app will give them.

## What Changes

- **A conformance rule and an exceptions register for the site.** A new `website-accessibility` capability states the target (WCAG 2.2 AAA in light and dark from 360 px, with and without JavaScript), the beauty rule, and a register of deliberate exceptions, one JSON file, each entry naming the criterion, where it applies, the measured value, why the page keeps its look and the route to the criterion. The accessibility statement at `/accessibility/` is rendered from the register, so the page can never claim more or less than the file.
- **Contrast measured from the bundle, not promised.** Colours come only from the pinned release's tokens, so the site cannot retune them. A build-time check measures every text and background pair the stylesheet uses from the bundle's `tokens.css`; a pair below 7:1 must be a register entry, and an entry whose pair now measures 7:1 (after a bundle bump that carries the app's retuned tokens) fails the build until it is removed. Today that registers the muted tone in light (6.5:1 on the canvas) with "until the pinned bundle's muted tone measures 7:1", and the white label on the emerald buttons (5.5:1) as the brand accent.
- **High contrast from the system setting.** When the visitor's system asks for more contrast, the site applies the bundle's high-contrast tokens (exported by the app from the next release; until the pinned bundle carries them, the stylesheet's rule applies nothing and the statement says so).
- **Pointer targets of 44 × 44 CSS px everywhere**, including icon links, pagination and footer links, through padding or an invisible hit area; the browser test measures every interactive element on every page.
- **Focus never obscured**: the sticky header gets scroll padding so a focused link is never under it; the browser test fails when a focused element is partly off-screen or covered.
- **Reading blocks**: prose at line height 1.5, paragraph spacing 1.5 times that, at most 80 characters per line, never justified.
- **Location, link purpose, headings**: a "You are here" trail on every page below the top level (guides, how-tos, blog posts, categories, templates, toolkit, switch and comparison pages, topics, install pages, localized pages), no bare "Learn more" or "here" links (the content lint refuses them), and a heading for every section.
- **Abbreviations and reading level**: the first use of a listed abbreviation on a page carries its expansion, checked by the content lint; `content/VOICE.md` asks for sentences of at most 25 words and the lint reports longer ones.
- **AAA in the automated gates**: the browser audit runs the AAA rule set; an enhanced-contrast finding passes only when it resolves to a registered pair.
- **The accessibility statement** says AAA, lists the register, the checks, what it does not cover, and keeps its review date.

Pages and sections affected: every page through the base layout and the stylesheet (header, trail, prose rhythm, hit areas), the content collections' templates (trail), `/accessibility/`, and the checks. Out of scope: media criteria (the site has no audio or video), pronunciation, a measured reading-level score, re-colouring anything (colours are the bundle's), the documentation under `/docs/` (produced and audited by the app project) and the demo instance.

New build dependency: none. axe-core already ships the AAA rules; contrast is measured with a small OKLCH-to-sRGB function in `scripts/checks/`.

## Capabilities

### New Capabilities
- `website-accessibility`: the site's conformance target and beauty rule, the exceptions register and the statement rendered from it, contrast measured from the bundle, pointer targets, focus never obscured, reading blocks, location trail, link purpose and headings, abbreviations and reading level, high contrast from the system, and the AAA automated gate.

### Modified Capabilities
- none (the AA requirement and the statement requirement live in pending changes `website-switcher-pages` and `website-trust-pages`; this capability supersedes their accessibility clauses and says so, so archiving in either order leaves one consistent set).

## Impact

- `src/layouts/Base.astro` (trail slot, scroll padding), `src/styles/site.css` (prose rhythm, hit areas, `prefers-contrast` rule), a new `src/components/Trail.astro`, `src/components/Abbr.astro`, the page and collection templates that render a trail, `src/pages/accessibility.astro` (rendered from the register), `src/lib/a11y-exceptions.json` (new), `scripts/checks/contrast.mjs` (new, from the bundle's tokens), `scripts/check-content.mjs` (bare links, abbreviations, long sentences), `tests/a11y.spec.ts` (AAA tags, register filter, target size, focus not obscured), `content/VOICE.md`, `README.md`.
- No new dependency; build time grows by the contrast check (milliseconds) and the browser test by the AAA rules and two extra passes (about a fifth more).

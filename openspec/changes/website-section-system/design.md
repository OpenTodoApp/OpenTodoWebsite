# Design

## Context

See proposal.md for motivation. Today each page writes its own `<section class="section">` with a `.section-head` (kicker, `h2`, lede) and a `.card` grid; `.card` is styled once in `src/styles/site.css:173` and used for features, paths, templates, posts and specs alike. Bundle screenshots are 2160 × 1350 WebP files listed by path in `manifest.json` (`screenshots`), with no focus metadata. `ScreenshotFrame.astro` always shows the whole screen inside a browser frame; at a 450 px slot the app's 13 px text renders at under 3 px.

## Goals / Non-Goals

**Goals:** a closed vocabulary of five section types that pages compose; legible screenshots; one recurring visual for the sync idea; blog cards that do not look like placeholders.

**Non-Goals:** new tokens, fonts or illustrations drawn by hand; a CMS; changing what each page says (later changes do that, using these types).

## Decisions

1. **Section types as Astro components with slots, not CSS modifiers.** `Showcase`, `Statement`, `Split`, `Catalogue` and `Close` each render their own `<section>` with a `data-section-type` attribute. Pages stop writing section markup. The attribute is what the composition check reads. *Alternative:* modifier classes on `.section`; rejected because nothing would stop a page from inventing a sixth layout.
2. **Cards only inside `Catalogue`.** `.card` styles are scoped under `[data-section-type="catalogue"]` (and the blog card component). A card used elsewhere renders unstyled, which the visual review catches immediately.
3. **Crops by focus box, kept in the site.** `src/lib/crops.ts` maps a screenshot name to a focus box in percentages (for example `assistant: { x: 62, y: 0, w: 38, h: 100 }` for the chat panel). `ShotPicture` renders the crop with `object-view-box` where supported and an `object-position` / `overflow: hidden` fallback, at the crop's natural pixel size capped to the slot. Boxes are relative, so a new release's screenshot of the same screen keeps working; if a screen's layout moves, the visual review of the bundle bump pull request shows it. *Alternative:* asking the app to ship focus metadata; deferred, it can replace the map later without changing pages.
4. **Signature sync visual from the demo's own markup.** `SyncPlayground` already renders two devices and a server as HTML that reads without JavaScript. A `static` prop renders the same markup without the controls and script; that is the illustration used on the home page and elsewhere. One source, so the static and interactive versions cannot drift.
5. **Typographic blog covers.** The card's image area renders the title in the display face at a size fitted to its length (three steps), on the category's tint token, which already exists for the category label. No image is generated; social cards (`og.mjs`) stay as they are.
6. **Coffee button out of `EndCta`.** `Close` has no coffee button; the footer and `/about/` keep it, restyled as a secondary button with the coffee icon from the sprite. The yellow brand colour is dropped: it is the only colour on the site not from the bundle tokens.
7. **Composition check.** `tests/layout.spec.ts` gains a rule over marketing pages: read `data-section-type` in order, fail on two adjacent `catalogue` or more than two, and fail on a kicker on a page with fewer than three sections. Screenshot width is checked on `Showcase` and `Split` images at 1280 px (≥ 640 px rendered, or the element is a crop).

## Risks / Trade-offs

- [Every marketing page changes markup at once, so a regression in one component shows everywhere] → land the components with one page converted first (`/self-host/`), then the rest in the same pull request once the preview is reviewed.
- [`object-view-box` is not in every browser] → the fallback crop is plain CSS; both are checked in the Playwright run.
- [Crops can hide context a visitor wants] → a Showcase links "See the full screen" to the uncropped image.

## Effect on build and downloads

Build time: unchanged within noise (no new image processing; crops are CSS on the existing responsive images). Downloads: larger product shots on the home and self-host pages are served from the existing responsive set, about 60–120 kB more per page at 1280 px in WebP or AVIF; blog cards lose their decorative gradients. No new JavaScript; the static sync illustration ships no script.

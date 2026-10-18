# Design

## Context

See proposal.md for motivation. Today each page writes its own `<section class="section">` with a `.section-head` (kicker, `h2`, lede) and a `.card` grid; `.card` is styled once in `src/styles/site.css:173` and used for features, paths, templates, posts and specs alike. Bundle screenshots are 2160 × 1350 WebP files listed by path in `manifest.json` (`screenshots`), with no focus metadata. `ScreenshotFrame.astro` always shows the whole screen inside a browser frame; at a 450 px slot the app's 13 px text renders at under 3 px.

## Goals / Non-Goals

**Goals:** a closed vocabulary of five section types that pages compose; legible screenshots; one recurring visual for the sync idea; blog cards that do not look like placeholders.

**Non-Goals:** new tokens, fonts or illustrations drawn by hand; a CMS; changing what each page says (later changes do that, using these types).

## Decisions

1. **Section types as Astro components with slots, not CSS modifiers.** `Showcase`, `Statement`, `Split`, `Catalogue` and `Close` each render their own `<section>` with a `data-section-type` attribute. Pages stop writing section markup. The attribute is what the composition check reads. *Alternative:* modifier classes on `.section`; rejected because nothing would stop a page from inventing a sixth layout.
2. **Cards only inside `Catalogue`, enforced by the check.** On marketing pages the composition check fails on any `.card` outside a Catalogue section; beside text a page uses a `.aside-note` instead. Content pages (guides, templates, how-tos) keep their cards, so `.card` itself stays styled everywhere. *Alternative:* scoping `.card` styles to Catalogue sections; rejected because it would unstyle the cards content pages rely on.
3. **Crops by focus box, kept in the site.** `src/lib/crops.ts` maps a screenshot name to a focus box in percentages (for example `assistant: { x: 62.5, y: 0, w: 37.5, h: 66 }` for the chat panel). `ScreenshotFrame` renders a crop as an `overflow: hidden` box with the crop's aspect ratio and the image scaled by `100 / w` and offset, which works in every browser, and requests image widths scaled by the same factor. Boxes are relative, so a new release's screenshot of the same screen keeps working; if a screen's layout moves, the visual review of the bundle bump pull request shows it. *Alternative:* asking the app to ship focus metadata; deferred, it can replace the map later without changing pages.
4. **Signature sync visual from the demo's own classes.** `SyncIllustration` draws the playground's two devices and server with the playground's own classes, at the end of a conflict both devices made offline, as static markup. It is a separate component rather than a `static` prop of `SyncPlayground`, because Astro bundles a component's script into every page that imports it, and the illustration must ship no script.
5. **Typographic blog covers.** The card's image area renders the title in the display face at a size fitted to its length (three steps), on the category's tint token, which already exists for the category label. No image is generated; social cards (`og.mjs`) stay as they are.
6. **Coffee button out of `EndCta`.** `Close` has no coffee button; the footer and `/about/` keep it, restyled as a secondary button with the coffee icon from the sprite. The yellow brand colour is dropped: it is the only colour on the site not from the bundle tokens.
7. **Composition check.** `tests/layout.spec.ts` gains a rule over marketing pages: read `data-section-type` in order, fail on two adjacent `catalogue` or more than two, and fail on a kicker on a page with fewer than three sections. Screenshot width is checked on `Showcase` and `Split` images at 1280 px (≥ 640 px rendered, or the element is a crop).

## Risks / Trade-offs

- [Every marketing page changes markup at once, so a regression in one component shows everywhere] → land the components with one page converted first (`/self-host/`), then the rest in the same pull request once the preview is reviewed.
- [Crops can hide context a visitor wants] → a Showcase links "See the full screen" to the uncropped image.

## Effect on build and downloads

Build time: unchanged within noise (no new image processing; crops are CSS on the existing responsive images). Downloads: larger product shots on the home and self-host pages are served from the existing responsive set, about 60–120 kB more per page at 1280 px in WebP or AVIF; blog cards lose their decorative gradients. No new JavaScript; the static sync illustration ships no script.

# Layout guide

How pages on the OpenTodo website are put together. `VOICE.md` says how the site sounds; this file says how it looks. Agents building pages follow it; the maintainer reviews against it, and `tests/layout.spec.ts` checks the rules it can.

## Five section types

Every section of a marketing page is one of these components in `src/components/sections/`. Pages do not write their own `<section>` markup.

| Type | What it holds | Use it for |
| --- | --- | --- |
| **Statement** | One claim, a lede, and at most one supporting fact (a facts list, a proof strip). | Page heads. A point that needs no picture. |
| **Split** | Text beside one image, one demo or one short list. | Explaining one idea with one piece of evidence. |
| **Showcase** | One large product screenshot, or the tour, at full content width. | Showing the product. At least one per product page. |
| **Catalogue** | A grid of cards, or a table or list of items. | Many parallel items: features, ways in, templates. The only type with cards. |
| **Close** | The closing call to action. | The end of every page. |

## Composition

- No two Catalogue sections next to each other, and no more than two on a page. If you have a third list, it is probably a Split with a plain list, or it belongs on another page.
- Cards appear only in Catalogue sections. Beside text, use a `.aside-note` (an accent rule, no shadow) instead.
- A kicker (the small label above a heading) only on pages with three sections or more. Do not use it on every section out of habit.
- Alternate the `alt` background so neighbouring sections are told apart, and let the content decide the type, not the other way round.

## Screenshots

- Screenshots come from the pinned bundle (`ScreenshotFrame shot="…"`), never from a hand-made capture.
- In a Showcase or Split, a screenshot is shown at least 640 px wide at a 1280 px page, or as a crop (`crop="assistant"`) of the part that matters. Crops are focus boxes in `src/lib/crops.ts`; a cropped shot links to the full screen.
- On a phone, a screenshot fills the content width.

## Recurring visuals

- Offline use and sync are shown with the two-device illustration (`SyncIllustration`), which links to the interactive demo on `/self-host/#sync`.
- Blog posts without a cover get a typographic cover (their title on the category's tint). A cover, when there is one, is a real screenshot or a simple illustration (see `VOICE.md`).

## Which pages are marketing pages

`/`, the translated home and cost pages, `/self-host/`, `/cost/`, `/developers/`, `/about/`, `/capture/` and each `/vs/<app>/` comparison. Content pages (guides, how-tos, templates, switch guides, the blog, the help pages) use their own article layouts and end with Close.

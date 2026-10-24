# Design: website-precision-look

## D1. Tokens stay the only colour source
`site.css` keeps mapping its local variables to `--ot-*` tokens.
- New mappings:
  - `--band: var(--ot-canvas)`;
  - `--sel: var(--ot-selected, var(--ot-sunken))`;
  - `--faint: var(--ot-faint)`;
  - `--line: var(--ot-border)`.
- `--ot-selected` exists from the 0.11 bundle on. The fallback keeps the 0.9 and 0.10 bundles working. Nothing is hard-coded.

## D2. Surface and bands
- `body` uses `--ot-surface`.
- `.section-alt`, `.end-cta` and the footer use `--band` with no border.
- The header is the surface with a hairline.
- This mirrors the app, where content sits on the surface and the canvas frames it.

## D3. No decoration
- `--shadow` becomes `none`. A new `--pop-shadow` is used only by the Learn menu panel and the phone menu, which float like the app's popovers.
- The hero gradient (`.hero::before`) is removed.
- `.frame-bar` (the fake window bar) is hidden, and the frame is a 1 px line with a 12 px radius.
- The phone frame keeps its device border, because it says "this is a phone".

## D4. Grey for everything but state
- `.nav-link[aria-current]` uses `--sel` with strong text.
- `.eyebrow` becomes small grey text with no pill.
- `.kicker` becomes grey.
- `.card-icon` becomes a 32 px grey square with the accent icon.

## D5. Type and shape
- h1 is `clamp(2.1rem, 1.4rem + 3vw, 3.6rem)` at weight 650; h2 is `clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem)` at 650; h3 is 1.0625 rem at 600.
- Body is 1rem / 1.6.
- Buttons are 40 px tall (44 px with `pointer: coarse`), weight 550, 8 px radius. Cards have a 12 px radius.

## D6. New building blocks
- `.rows`: hairline-separated rows with an icon, title, line and an optional property at the end.
- `.group-bar`: the app's filled group header.
- They are defined here so the following changes reuse them, and are unused until then.

## Effect on build time and download size
- No effect on build time.
- `site.css` grows by about 1.5 kB before compression (the new blocks) and loses the gradient and shadow rules.
- No new requests.

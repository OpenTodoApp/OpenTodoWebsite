# Tasks

## 1. Foundation

- [x] 1.1 Map `--band`, `--sel`, `--faint` and `--line` to the bundle's tokens, make `body` use the surface token and the bands use `--band` (D1, D2). Verify with `grep -nE '#[0-9a-fA-F]{3,6}' src/styles/site.css` that no new raw colour was added (only the existing coffee and Discord brand colours remain), and by building against the pinned bundle.
- [x] 1.2 Remove shadows and the hero gradient, hide the frame bar, and add `--pop-shadow` for the menus (D3). Verify in the built home page at 1280 px in light and dark that no card or screenshot casts a shadow and the Learn menu still does.
- [x] 1.3 Grey state for navigation, eyebrow, kicker and card icons; the new type scale, button and card shape (D4, D5). Verify `npm run test:browser` passes, including axe colour contrast in light and dark at 360 and 1280 px.

## 2. Building blocks

- [x] 2.1 Add `.rows` and `.group-bar` (D6). Verify `npm run check` passes and the classes are present in `dist/_astro/*.css` after the build.

## 3. Checks

- [x] 3.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture before and after screenshots of the home page and a comparison page at 1280 px in light and dark. Verify all pass.

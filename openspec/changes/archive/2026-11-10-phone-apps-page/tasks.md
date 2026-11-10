# Tasks

## 1. The page

- [x] 1.1 Add the `apps` strings to every dictionary and a unit test that every language has the English shape. Verify `npm test` passes.
- [x] 1.2 Add `AppsPage.astro`, `/apps/` and `/[lang]/apps/`, and `/apps/` to `TRANSLATED_PAGES`. Verify `npm run build` and `npm run check:dist` pass and `/de/apps/` carries hreflang alternates.

## 2. The links

- [x] 2.1 Point the home hero badge (every language), the iPhone and iPad notice and the install index at the page; link it from the footer. Verify no built page outside `/apps/` links `apps.apple.com`.

## 3. Checks

- [x] 3.1 View `/apps/` at 1280 and 390 px in light and dark; verify the badge leads to the App Store, the greyed buttons are not focusable, and `npm run test:browser` passes. Run `openspec validate --all --strict`.

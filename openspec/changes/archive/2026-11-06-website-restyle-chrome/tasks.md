# Tasks

## 1. Chrome

- [x] 1.1 Add `src/components/LangSwitch.astro` (D2) and use it in the header and footer; remove the language bar from `src/layouts/Base.astro`; verify the built `/it/` has no `.lang-bar` and its switch links `/`.
- [x] 1.2 Rewrite `src/components/SiteHeader.astro` (D1) and `SiteFooter.astro` (D3, D4) and their CSS; verify `tests/widths.spec.ts` keeps every header item on one line at 768, 1024, 1280 and 1440 px.
- [x] 1.3 Update `scripts/test/community.test.mjs` and `tests/no-js.spec.ts` (menu items, footer groups, the language switch without JavaScript); verify `npm test` and `npm run test:browser` pass.

## 2. Checks

- [x] 2.1 Run `npm run check`, `npm run build`, `npm run check:dist`, `npm test` and `npm run test:browser`; look at the header and footer at 390 and 1280 px in light and dark.

# Tasks

## 1. Page

- [x] 1.1 Rewrite `src/pages/index.astro` in five parts with the community section and the latest posts (D1, D2). Verify the built page has the briefing headline, the Today screenshot from the bundle, 54 features in six groups with v0.11.0, and the links of every row resolve (`npm run check:dist`).
- [x] 1.2 Add the home styles and the phone rules (D3). Verify at 390 px that the page is under 5,000 px, the feature groups open without JavaScript, and nothing scrolls sideways at 360 px (`npm run test:browser`).
- [x] 1.3 Remove `HeroDemo`, `FeatureTour`, `ImportStrip`, `src/lib/tour.ts` and the strip list in `src/lib/switch.ts`, and their tests; assert in `islands.spec.ts` that the home page loads no module script. Verify `npm run check` and `npm run test:browser` pass.

## 2. Checks

- [x] 2.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture the home page before and after at 1280 px (light and dark) and 390 px. Verify all pass.

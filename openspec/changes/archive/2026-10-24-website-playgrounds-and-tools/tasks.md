# Tasks

- [x] 1.1 Build `QuickAddPlayground` (D1) with its no-JS table and an island test for the documented examples. Verify the two scenarios of the spec in the browser test.
- [x] 1.2 Build `FilterPlayground` (D2) with the sample list rendered at build time and an island test. Verify `overdue & no project` leaves one task and `@call &` shows the error line.
- [x] 1.3 Build `ServerPlanner` (D3) and `/self-host/plan/`, with an island test that changes the domain, the reach, a feature and the home. Verify the compose text follows each change and the no-JS page shows the default file.
- [x] 1.4 Build `/playground/`, add the links (home, self-host, cost, help, footer, first-server toolkit) and the routes in `scripts/check-content.mjs`. Verify `npm run check:dist` and the islands-only-where-used test pass.
- [x] 1.5 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist`, `npm run test:browser`. Verify all pass and `openspec validate --all --strict` passes.

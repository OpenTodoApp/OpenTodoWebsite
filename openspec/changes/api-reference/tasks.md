## 1. Reference

- [x] 1.1 `src/lib/openapi.ts` reads the bundle's description into groups, routes, fields and schemas; returns null without one. Verify `npm run build` with and without a bundle that has it.
- [x] 1.2 The index, group and schema pages, and the "Under the hood" link only when the reference exists. Verify the built pages at 360 px without JavaScript.
- [x] 1.3 A test checks the built reference when present, and that nothing is built or linked without it. Verify `npm test`.

## 2. Checks

- [x] 2.1 `npm run check`, `npm run check:dist`, `openspec validate --all --strict`. Verify all pass against the pinned bundle and against a preview bundle from app main.
- [ ] 2.2 Ships with the release pin of the first release whose bundle carries `api/openapi.json`. Verify the reference builds from the pinned bundle before merging.

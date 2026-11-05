# Tasks

- [x] 1.1 Delete `src/pages/vs/`, `src/content/compare/`, `CompareTable.astro`, `src/lib/faq.ts`, the `compare` collection and schema and their unit tests; verify `npm run build` produces no `dist/vs/`.
- [x] 1.2 Add the redirects (D1) and repoint `/cost` and `/faq`; verify `npm run check:redirects` passes.
- [x] 1.3 Rewrite content links to `/vs/`, the switch guides' comparison button, AGENTS.md, README.md and `openspec/config.yaml`; verify `grep -rn "/vs/" src` finds nothing and `npm run check:links` passes.
- [x] 1.4 Run `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`.

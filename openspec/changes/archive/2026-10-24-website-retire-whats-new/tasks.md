# Tasks

## 1. Remove and redirect

- [x] 1.1 Remove `src/pages/whats-new/`; add `releaseUrl` and `RELEASES_URL`; point the footer, About, status, the post notice and template, the content pieces and the home page's structured data at the post or the release notes (D1). Verify `npm run check:dist` finds no broken link and `node scripts/check-content.mjs` passes.
- [x] 1.2 Link releases in the feed to their post or their release notes. Verify `dist/feed.xml` links 0.9.0 to `/blog/opentodo-0-9-0/` and 0.10.1 to its GitHub release.
- [x] 1.3 Add the redirects (D2) and let the redirect check skip other sites, with a unit test. Verify `npm test` passes, `npm run check:redirects` passes and `nginx -t` accepts the file.

## 2. Checks

- [x] 2.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist` and `npm run test:browser`; capture the old `/whats-new/` and the new footer. Verify all pass.

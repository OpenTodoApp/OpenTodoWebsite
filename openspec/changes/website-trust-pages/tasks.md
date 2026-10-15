# Tasks

- [x] 1.1 Build `/capture/` (D1) and link it from the footer, the help page, the install pages and the home page. Verify every docs anchor resolves (`npm run check:dist`) and the page reads at 360 px without JavaScript.
- [x] 1.2 Build `/accessibility/` (D2) with the review date and the issue links, linked from the footer. Verify the page passes the accessibility audit itself in light and dark.
- [x] 1.3 Build `/status/` (D3), linked from the footer, with the health endpoint link and no script. Verify the page has no `<script>` beyond the site's own and reads at 360 px.
- [x] 1.4 Register the routes in `scripts/check-content.mjs`; run `npm run check`, `npm run build`, `npm run check:dist`, `npm run test:browser`. Verify all pass and `openspec validate --all --strict` passes.

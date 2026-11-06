// The pages the per-page browser checks visit (ci-fast-checks D1): BROWSER_PAGES=all
// for every page (main, the nightly run, `npm run test:browser:full`), "sample" for one
// page per template and every home page (the default, pull requests), or "list" with
// BROWSER_PAGES_FILE (a content-only pull request's changed pages). The docs come
// from the bundle and are checked by the app.
import { browserPages } from '../scripts/lib/pages.mjs';

export function sitePages(): string[] {
  return browserPages(process.env);
}

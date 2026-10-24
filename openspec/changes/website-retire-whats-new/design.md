# Design: website-retire-whats-new

## D1. Where a release lives now
- **Post first:** a release with a published post in the Releases category links to the post (the feed, the redirect).
- **Release notes otherwise:** everything else links to `https://github.com/pixari/opentodo/releases/tag/v<version>`. The app publishes the same changelog section there as the bundle's `changelog.json`, so nothing is lost.
- **Helpers:** `releaseUrl()` and `RELEASES_URL` live in `src/lib/site.ts`.

## D2. Redirects
- **Exact redirects:** the index and the versions that have posts. Exact `location =` blocks take precedence over the version regex, so the posts win.
- **One regex for the rest**, with `# e.g.` samples.
- **External targets** aren't part of the build, so the redirect check skips them; a unit test covers that.

## Effect on build time and download size
- 16 fewer pages.
- No change to any other page's size.

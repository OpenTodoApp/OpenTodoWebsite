# Design

## D1. One page from the bundle
`releases` from `src/lib/bundle.ts` already normalises `changelog.json` (released versions only, newest first); the page renders it with the existing inline Markdown renderer, which turns links to `docs/*.md` into site docs links. Anchors drop the dots (`v0-22-0`) so they read well in URLs.

## D2. Scannable
31 releases with up to 40 items each would be a very long page. Only the newest is open; the others show their summary (one paragraph) and a disclosure with the count of changes.

## Build and download size
One more page (about 400 KB of HTML today, mostly the changes in closed disclosures; gzip about 90 KB). No script.

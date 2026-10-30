# Design

## D1. One constant
`SITE.x = 'https://x.com/opentodoapp'` in `src/lib/site.ts`, beside `discord`: a fact about the project, not about a release, so it stays out of the bundle. The footer and About read it; the community test reads it from the source like the other constants.

## D2. Text links only
The footer item is a plain anchor labelled "X" in the Community list after Discord; the About page adds one sentence to the second paragraph of "Who makes it" with the account as a link. No button, no logo, no script: a built page makes no request to an X address, which keeps the no-third-party rule and the link check (offline, external links are not fetched) as they are.

## D3. Build time and download size
Unchanged in practice: one list item in the footer of every page and one sentence on About, a few dozen bytes of HTML each. No new asset.

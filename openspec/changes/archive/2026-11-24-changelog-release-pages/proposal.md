## Why

`/changelog/` scored 85 for performance on a phone (Lighthouse 13, live site), the one page of the site under 98. It carried the full list of changes of all 42 releases, 41 of them in closed disclosures: 715 KB of HTML. Chrome lays out the content of closed disclosures shortly after load anyway (its page content extraction), 22,000 boxes in one task of about 140 ms on a fast machine, four times that on a phone. No style change moved it; only less content does.

The longest API reference page scored 97: balancing the wrap of its 119 headings and hundreds of short table lines cost about 40% of its layout.

## What Changes

- Every release with changes gets a page of its own, `/changelog/v<major>-<minor>-<patch>/`, with its date, summary, GitHub link and every change, and links to the release before and after.
- `/changelog/` keeps every release, anchor, date, summary and GitHub link. The newest release's changes stay open on it; each older release links "All N changes in <version>" to its page instead of holding them in a disclosure. The page drops from 715 KB to about 130 KB.
- API operation blocks are exempt from `text-wrap: balance` and `pretty`.

Out of scope: the anchors (`/changelog/#v0-22-0` still lands on the release, so release posts and the feed are unchanged), the wording of any entry, the docs.

## Capabilities

### Modified Capabilities

- `website-content`: "Changelog page" describes the release pages.

## Impact

- `src/pages/changelog.astro`, `src/pages/changelog/[version].astro`, `src/components/ReleaseChanges.astro`, `src/lib/changelog.ts`, `src/styles/site.css`, `scripts/test/changelog.test.mjs`.
- No dependency. 41 more pages and social cards per build (about 2 s). A visitor to `/changelog/` downloads 130 KB of HTML instead of 715 KB.

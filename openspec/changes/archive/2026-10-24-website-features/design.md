# Design: website-features

## D1. One list, gated by the bundle
- `features.ts` holds 54 entries of `{ name, line, doc, since? }` in six groups.
- `featureGroups()` drops entries whose `since` is newer than `manifest.version`. It throws when a shipped entry's `doc` isn't a page of the bundle's docs. A typo or a renamed docs page fails the build, while a feature of a later release simply waits for its pin.
- With the v0.9.0 pin the page lists 43 features, with v0.10.1 50, and with 0.11 54.
- The lines restate each docs page's summary, so they stay true to the release that ships the page.

## D2. Page layout
- **Desktop:**
  - a page head with the count and version;
  - a jump list of the groups;
  - from 1024 px, a sticky aside ("No tiers", and the integrations in one sentence) beside the list.
- **Groups:** each is headed by the app's filled group bar (`website-precision-look` D6) with its icon and count.
- **Rows:**
  - each row is the name, its line and "Docs →";
  - below 768 px the line moves under the name;
  - each Docs link has a visually hidden "Docs: {name}" so screen readers hear what it opens.
- Plain HTML, so it reads without JavaScript.

## D3. Imports and integrations from the bundle
- Import apps map the manifest's format ids to names, so an importer added in a release appears with the pin.
- Integration names show only while their docs page exists in the bundle.

## Effect on build time and download size
- One more page; the build time change is unmeasurable.
- The page is about 25 kB of HTML. It loads no script and no image.

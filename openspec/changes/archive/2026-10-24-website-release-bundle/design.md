# Design

## Context

`src/lib/bundle.ts` types the manifest after the interim bundle (`shots` map, `tag`, `releasedAt`, `image`, `darkVariants`, `exportFormat`) and the changelog as `{ releases: [{ summary, sections: [{ title, items }] }] }`. The app's published bundle (`scripts/site-bundle.mjs` in the app) writes manifest schema 1 (`version` "v0.3.1-rc.1", `date`, `commit`, `screenshots: ["shots/x.webp"]`, `facts`) and a changelog list `[{ version, date, intro, sections: { "Added": [...] } }]` that starts with "Unreleased".

## Decisions

### D1. One conversion, at the edge
`normalizeManifest` and `normalizeChangelog` in `scripts/lib/bundle.mjs` turn either format into the interim shapes the pages already use, so no page changes. Detection is by field: `screenshots` (app) or `shots` (interim); a list changelog (app) or `{ releases }` (interim).

### D2. Derived, not invented
- `version` without the `v`; `tag` with it; `releasedAt` from `date`.
- `shots`: `{ name: { file } }` from the file names; Astro reads image sizes from the files.
- `darkVariants`: `{ name: "name-dark" }` when both files exist (`mobile-dark` alone stays a shot of its own).
- `image`: `ghcr.io/pixari/opentodo:<version>`, the app's published image name for that release.
- `facts.imageMB` from `dockerImageMB` when measured; `exportFormat` from the facts when present.
Facts the bundle does not carry are absent, never filled in.

### D3. Interim stays readable until the pin moves
The interim pin keeps building unchanged; deleting `interim/` is task 2.1 after `v0.4.0` exists.

### Effect on build and download size
None measurable.

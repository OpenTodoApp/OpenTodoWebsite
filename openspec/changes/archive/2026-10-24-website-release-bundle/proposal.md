# Proposal

## Why

The app now attaches `opentodo-site-bundle-<version>.tar.gz` to every release (app change `site-bundle`), but the website cannot build from it: the website was written against its own interim bundle, and the app's manifest and changelog use different field names (`screenshots` instead of `shots`, `date` instead of `releasedAt`, a list changelog with `intro` and section objects instead of `releases` with `summary` and section lists). Pinning a release fails with `missing manifest.json "shots"`. Until the website reads the published format it keeps showing hand-assembled interim facts, which the "released facts only" rule is meant to end.

## What Changes

- The website reads the app's bundle layout v1 as published: manifest schema 1 (`version` with its `v`, `date`, `screenshots`, `facts`) and the list `changelog.json`, converted in one place into the shapes the pages already use. The interim format keeps working until `interim/` is deleted.
- Screenshot names come from the file names; a `<name>-dark` file next to `<name>` is its dark variant. The release tag, date and image name come from the version.
- Facts the bundle does not carry are left out instead of invented: the self-host page shows the measured server binary size when no image size is measured, and no idle-memory figure.
- "Unreleased" entries in a bundle's changelog are never shown.
- Once the app releases `v0.4.0`, `bundle.json` pins it and `interim/` with `scripts/interim-bundle.mjs` is deleted (a separate pull request after the release).

## Out of scope

- Changing the app's bundle format (the app's own change `site-bundle-server-facts` adds the server facts the self-host page uses).
- New pages or content.

## Capabilities

### New Capabilities

- `website-bundle`: how the website reads the app's released site bundle.

### Modified Capabilities

None.

## Impact

- `scripts/lib/bundle.mjs` (layout check and the conversion), `src/lib/bundle.ts`, `src/pages/self-host.astro`; tests in `scripts/test/fetch-bundle.test.mjs`.
- No new dependency; build output unchanged for the interim bundle.

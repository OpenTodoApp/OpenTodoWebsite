# website-bundle Specification

## Purpose
How the website reads the app's released site bundle, so that every fact it shows about the app comes from the release it describes.

## Requirements

### Requirement: Reads the published bundle layout
The site SHALL build from the app's site bundle as published with each release (layout v1, manifest schema 1, the list changelog), converted in one place into the data the pages use. Screenshot names and dark variants (`<name>-dark` next to `<name>`) SHALL come from the file names, and the tag and image name from the version. Unreleased changelog entries SHALL NOT be shown, and a missing required file or field SHALL fail the build naming it.

#### Scenario: Pinning a released bundle
- **WHEN** `bundle.json` pins `v0.3.1-rc.1` and the site is built
- **THEN** the build succeeds and the footer, install commands and "What's new" pages show `v0.3.1-rc.1` and its changelog

#### Scenario: Unreleased entries
- **WHEN** the pinned bundle's changelog starts with an "Unreleased" entry
- **THEN** no page shows it

#### Scenario: Incomplete bundle
- **WHEN** a bundle's manifest has no `screenshots` (and no interim `shots`)
- **THEN** the build fails with a message naming the missing field

### Requirement: Facts shown only when the bundle carries them
The site SHALL show a fact about the app (image or binary size, memory, platforms, port, data folder, database, licence, export format) only when the pinned bundle's manifest carries it, and SHALL leave it out otherwise, at 360 px and without JavaScript like every other page content.

#### Scenario: No measured image size
- **WHEN** the manifest has `binaryMB` but no image size
- **THEN** the self-host page shows the server binary size and no container image size

#### Scenario: No memory figure
- **WHEN** the manifest has no idle-memory fact
- **THEN** the self-host page shows no memory figure

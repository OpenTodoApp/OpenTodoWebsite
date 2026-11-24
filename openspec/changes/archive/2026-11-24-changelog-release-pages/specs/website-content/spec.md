## MODIFIED Requirements

### Requirement: Changelog page
The site SHALL have a page at `/changelog/` listing every released version in the pinned bundle's changelog (the app's CHANGELOG.md, carried as `changelog.json`), newest first, each as a section with the id `v<major>-<minor>-<patch>`, its version as a heading linking that anchor, its date, its summary and a link to the release on GitHub. The newest release's sections (upgrade notes, security, added, changed, fixed) SHALL be shown open on it with every item. Every release with changes SHALL also have a page of its own at `/changelog/v<major>-<minor>-<patch>/` with its date, summary, GitHub link and every item of every section, linking the release before and after it; on `/changelog/` each older release SHALL link that page, naming the number of changes, instead of carrying them. From 900 px wide a list of versions SHALL stay beside the releases; below that a closed disclosure SHALL offer the same jumps. Nothing on these pages SHALL be written by hand: a new pin changes them with no edit in this repository. The footer's Product group SHALL link `/changelog/` as "Changelog", and a release post SHALL link its version's anchor.

#### Scenario: A new release is pinned
- **WHEN** `bundle.json` moves to a release whose changelog has a new version and the site is rebuilt
- **THEN** `/changelog/` shows that version first, open, with its date and summary, `/changelog/#v<version>` lands on it, and the release before it now links its own page

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/changelog/` at 360 px wide with JavaScript disabled
- **THEN** the jump list opens, every version link reaches its section, an older release's link opens the page with all its changes, and neither page scrolls sideways

#### Scenario: From a release post
- **WHEN** a visitor reads the 0.22.0 release post
- **THEN** its release notice links `/changelog/#v0-22-0`

#### Scenario: Every change is still on the site
- **WHEN** the site is built
- **THEN** each release's page holds as many items as the bundle's changelog has for that version, and `/changelog/` stays under 250 KB

# Spec Delta

## MODIFIED Requirements

### Requirement: What's new and feed
The site SHALL offer an RSS feed listing new guides, templates, essays, posts and every release of the pinned bundle's changelog, each release linking its release post when one is published and the app's release notes otherwise. Release notes SHALL NOT be republished as one page per release; they are gathered on the changelog page; the old "What's new" addresses SHALL redirect to the release post or the release notes. Neither the feed nor the posts SHALL describe features that are not in a released version.

#### Scenario: New release
- **WHEN** the pinned bundle moves to a new release
- **THEN** the feed lists it, linking its release post once that is published and its release notes until then

## ADDED Requirements

### Requirement: Changelog page
The site SHALL have a page at `/changelog/` listing every released version in the pinned bundle's changelog (the app's CHANGELOG.md, carried as `changelog.json`), newest first, each as a section with the id `v<major>-<minor>-<patch>`, its version as a heading linking that anchor, its date, its summary, a link to the release on GitHub, and its sections (upgrade notes, security, added, changed, fixed) with every item. The newest release's changes SHALL be shown open; older releases SHALL show their summary with their changes in a disclosure that opens without JavaScript. From 900 px wide a list of versions SHALL stay beside the releases; below that a closed disclosure SHALL offer the same jumps. Nothing on the page SHALL be written by hand: a new pin changes it with no edit in this repository. The footer's Product group SHALL link it as "Changelog", and a release post SHALL link its version's anchor.

#### Scenario: A new release is pinned
- **WHEN** `bundle.json` moves to a release whose changelog has a new version and the site is rebuilt
- **THEN** `/changelog/` shows that version first, open, with its date and summary, and `/changelog/#v<version>` lands on it

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/changelog/` at 360 px wide with JavaScript disabled
- **THEN** the jump list opens, every version link reaches its section, an older release's changes open, and the page does not scroll sideways

#### Scenario: From a release post
- **WHEN** a visitor reads the 0.22.0 release post
- **THEN** its release notice links `/changelog/#v0-22-0`

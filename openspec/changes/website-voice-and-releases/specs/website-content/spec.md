## MODIFIED Requirements

### Requirement: What's new and feed
The site SHALL publish a "What's new" page per release from the bundle's changelog, and SHALL offer an RSS feed listing new guides, templates, essays and releases. Neither SHALL describe features that are not in a released version.

The release list at `/whats-new/` SHALL show, for each release newest first, its version, its date, one summary sentence taken from the changelog's intro for that release, and the number of entries in each changelog section, and SHALL mark a release that has upgrade notes. Versions with a pre-release suffix SHALL be listed separately after the releases, under "Pre-releases". The per-release page SHALL show the full intro and every changelog section as a grouped list. All of it SHALL come from the pinned bundle's changelog and read fully at 360 px wide without JavaScript.

#### Scenario: New release
- **WHEN** the pinned bundle moves to a new release
- **THEN** a "What's new" page for that release appears and the feed lists it

#### Scenario: A large release at a glance
- **WHEN** a visitor opens `/whats-new/` with 0.7.0 pinned
- **THEN** the 0.7.0 entry shows 18 October 2026, the first sentence of its intro, the count of each section (for example 30 security entries and 59 fixes) and an upgrade-notes mark, and links to `/whats-new/0.7.0/`, where every entry is listed under its section

#### Scenario: Release candidate
- **WHEN** the changelog contains 0.3.1-rc.1
- **THEN** it is not shown among the releases and appears under "Pre-releases" at the end of the list

### Requirement: Reviewed, sourced and fresh content
Every published piece SHALL be approved by the maintainer through a pull request before it goes live, and SHALL carry a last-reviewed date. Content drafted by an agent SHALL follow the repository's voice guide. A piece whose last-reviewed date is older than one year at build time SHALL be reported as stale by the checks. The content check SHALL fail on any word or phrase that the voice guide lists to avoid, in published content and page copy, naming the file and the line; a quotation SHALL be exempt only when marked as one.

#### Scenario: Agent draft
- **WHEN** a scheduled agent drafts a new guide
- **THEN** it opens a pull request with a rendered preview, and the guide is not published until the maintainer merges it

#### Scenario: Stale guide
- **WHEN** a guide's last-reviewed date is 13 months old at build time
- **THEN** the checks report it as stale and name it

#### Scenario: A word to avoid
- **WHEN** a page's copy says "The table below is honest in both directions"
- **THEN** the content check fails and names the file and line, because "honest" is in the voice guide's list to avoid

#### Scenario: The list lives in the guide
- **WHEN** the maintainer adds a phrase to the words to avoid in `content/VOICE.md`
- **THEN** the next build checks it, without any change to the check script

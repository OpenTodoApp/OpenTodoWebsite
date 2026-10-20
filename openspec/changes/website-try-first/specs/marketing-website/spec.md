# Spec Delta

## MODIFIED Requirements

### Requirement: Outcome-first home page
The home page SHALL open with the outcome for people who use a task app, not with implementation details. Above the first screenful it SHALL show a headline, a one-sentence promise and calls to action in this order: try the demo (the primary action), self-host and import, with the live demo of the app directly below. Under the calls to action it SHALL say in one line that the demo needs no account and nothing to install and is a private sandbox with sample data that is deleted after a period without activity, as the demo documentation of the pinned release states it, linking that page; and it SHALL show the install-in-one-click row. Architecture terms SHALL NOT appear above the fold. The hero SHALL read and link without JavaScript at 360 px wide, the row wrapping onto further lines rather than scrolling sideways.

#### Scenario: A visitor who uses another task app lands on the home page
- **WHEN** a visitor opens the home page on a 390 px wide phone
- **THEN** the first screenful shows the headline, the promise, the demo as the first call to action, the demo line and the install row, and the live demo is reachable by scrolling once, without any mention of op logs, clocks or SQLite

#### Scenario: Demo line follows the docs
- **WHEN** a new bundle is pinned whose demo documentation states a different idle lifetime
- **THEN** the hero's demo line is changed in the same pull request, and its link leads to the demo documentation of the pinned release (the link check fails if that page is absent)

#### Scenario: Translated home pages
- **WHEN** a visitor opens the German, French, Italian, Spanish or Portuguese home page
- **THEN** the demo line and the row's heading are in that language, from its dictionary, and the platform names and links are the same as on the English page

## ADDED Requirements

### Requirement: Install in one click row
The home hero and the first screen of the self-hosting page SHALL show an "Install in one click" row: server platforms as text links without logos to their guides in the pinned release's docs, in the order the maintainer records, then the Docker command as the fallback with a link to the Docker guide. The hero SHALL show the first platforms and link the full row on the self-hosting page, which SHALL show every platform. Both rows SHALL read and wrap at 360 px without JavaScript.

#### Scenario: Hero shows the head of the list
- **WHEN** a visitor reads the home hero at 1280 px wide
- **THEN** the row shows the first platforms in the recorded order, each a link to its guide, and ends with a link to the full row on the self-hosting page that names how many platforms there are

#### Scenario: Self-hosting page shows every platform
- **WHEN** a visitor opens the self-hosting page
- **THEN** the first screen shows every platform that has a guide in the pinned docs, in the recorded order, then the Docker command

#### Scenario: Docker is the fallback, not a platform
- **WHEN** a visitor runs none of the listed platforms
- **THEN** the end of the row shows the one-line `docker run` command built from the bundle manifest's image, port and data directory, and links the Docker guide of the pinned release

#### Scenario: Phone width without JavaScript
- **WHEN** a visitor at 360 px wide with JavaScript disabled reads the home hero or the self-hosting page
- **THEN** every platform name is a working link, the row wraps onto several lines, the page does not scroll sideways, and the Docker command can be selected and copied by hand

#### Scenario: Text only
- **WHEN** the rows are scanned by the emoji and icon check
- **THEN** the platform names are plain text links with no logo, image or symbol

### Requirement: Install row follows the pinned bundle
The platforms in the install rows SHALL be derived at build time from the docs index of the pinned bundle: a platform appears only when that release's docs carry its guide, and each row SHALL say which release it describes. A self-hosting guide in the bundle that the recorded list does not name SHALL fail the unit tests, so a new guide is added deliberately.

#### Scenario: Platform list follows the bundle
- **WHEN** a bundle is pinned whose docs have no guide for one of the listed platforms
- **THEN** that platform is absent from both rows without any edit in this repository, and no link in the rows is broken

#### Scenario: A new guide ships
- **WHEN** a bundle is pinned whose docs carry a self-hosting guide that the list does not know
- **THEN** the unit tests fail and name the guide, so the maintainer adds it to the list at the place of their choice

#### Scenario: Release named
- **WHEN** a visitor reads either row
- **THEN** a line says the guides are those of the pinned release, naming its version from the bundle manifest

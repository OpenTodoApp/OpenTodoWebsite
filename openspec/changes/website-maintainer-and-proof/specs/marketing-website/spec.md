## MODIFIED Requirements

### Requirement: About and trust page
The site SHALL have a page at `/about/` that says who maintains OpenTodo, when it was first and last released, what the licence means in plain language, where the security policy and the specifications are, how long the demo keeps a sandbox, what this website collects, and how to leave with one's data. The page SHALL open with a note from the maintainer in the first person, with their name and, when the authors file provides one, their photo. The facts shown beside the headline SHALL be durable ones from the bundle manifest (the licence, the number of published specifications, the number of documentation pages and the number of import formats), each linking to where it can be checked; the first and latest release SHALL be stated further down with a link to the release list. Maintainer details, note and photo SHALL come from the authors file, figures from the bundle manifest and release dates from the bundle's changelog; a figure the bundle does not carry SHALL be left out, never estimated. The page SHALL be in the footer and SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Release history follows the bundle
- **WHEN** a bundle with a newer release is pinned
- **THEN** the about page names the newer release and its date without any edit in this repository

#### Scenario: App statements are sourced
- **WHEN** the about page states what the app does, for example that data can be exported
- **THEN** the statement links to the documentation page of the pinned release

#### Scenario: Security policy one click away
- **WHEN** a visitor on the about page wants to report a vulnerability
- **THEN** a link leads to the app's security policy

#### Scenario: Durable facts first
- **WHEN** a visitor opens `/about/` with 0.7.0 pinned
- **THEN** the facts beside the headline read AGPL-3.0, 78 specifications, 115 documentation pages and 10 import formats, each a link, and no release date appears beside the headline

#### Scenario: A figure the bundle lacks
- **WHEN** a pinned bundle's manifest has no `specCount`
- **THEN** the about page and every proof strip omit that figure and the build passes

#### Scenario: Maintainer note on a phone without JavaScript
- **WHEN** a visitor opens `/about/` at 360 px wide with JavaScript disabled
- **THEN** the maintainer's note, name and photo (with its alternative text) are shown first and the page does not scroll sideways

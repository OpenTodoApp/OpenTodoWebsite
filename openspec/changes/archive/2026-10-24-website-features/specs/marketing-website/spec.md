## ADDED Requirements

### Requirement: Features page
The site SHALL have a features page at `/features/` that lists every feature of the pinned release in named groups, plus the apps it imports from, each feature with a one-line description and a link to its documentation page in the pinned bundle. The header's Features link SHALL open this page. The page SHALL read without JavaScript and at 360 px wide, with each description under its feature's name.

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/features/` at 360 px wide with JavaScript disabled
- **THEN** every group, feature, description and Docs link is shown and works, and the page does not scroll sideways

### Requirement: Feature list follows the pinned release
The feature list SHALL come from one data module whose entries name their documentation page and the first release that has it. Entries newer than the pinned release SHALL be left out, a shipped entry whose documentation page is missing from the bundle SHALL fail the build, and the import apps SHALL come from the bundle manifest's import formats.

#### Scenario: A feature from a later release
- **WHEN** the site is built against a bundle older than a feature's first release
- **THEN** the features page does not list it, and the count in the page head leaves it out

#### Scenario: A docs page is renamed
- **WHEN** a listed feature's documentation page no longer exists in the pinned bundle
- **THEN** the build fails naming the feature and the missing page

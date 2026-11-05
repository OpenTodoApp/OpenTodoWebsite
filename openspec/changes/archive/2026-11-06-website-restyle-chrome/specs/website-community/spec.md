# Spec Delta

## MODIFIED Requirements

### Requirement: Community link on every page
Every page, in every language, SHALL link to the OpenTodo Discord server from the footer's Community row, as a text link with an icon that names Discord. The link SHALL be a plain anchor that loads nothing from Discord until followed: no script, image, frame or request to a Discord address appears in any built page. The address SHALL be defined once in the site-wide constants (not in the app bundle, since it is a fact about the project, not about a release) so that a changed invite is one edit that updates every page. The footer SHALL read at 360 px wide and without JavaScript, the links reachable by keyboard with a visible focus state, in light and dark.

#### Scenario: Footer on the home page
- **WHEN** a visitor opens `/` at 360 px wide with JavaScript disabled
- **THEN** the footer's Community row contains "Discord" pointing at the invite address, and the page requests nothing from a Discord address

#### Scenario: Footer on a translated page
- **WHEN** a visitor opens the Italian home page
- **THEN** the same Discord link is present in the footer

#### Scenario: Changed invite
- **WHEN** the invite address in the site-wide constants is changed and the site is rebuilt
- **THEN** every Discord link and button on every page carries the new address and the link check passes

### Requirement: Ways to the support page
Every page SHALL link to `/support/` from the footer's Project group, and the footer's Community row SHALL link the GitHub repository (Star on GitHub), GitHub Sponsors, Buy me a coffee and Discord as plain text links. The header SHALL carry no support pill or button. The closing call to action shared by content pages SHALL say that OpenTodo is free and always will be and link to `/support/`, and the About page's licence section SHALL link to it. The footer SHALL fit without sideways scrolling from 360 px.

#### Scenario: Navigation on a phone
- **WHEN** a visitor opens any page at 360 px wide without JavaScript and opens the footer's Project group
- **THEN** it lists "Support OpenTodo", leading to `/support/`, and the Community row shows the star, sponsor, coffee and Discord links

#### Scenario: End of a guide
- **WHEN** a visitor reaches the end of a guide
- **THEN** the closing call to action links to `/support/`

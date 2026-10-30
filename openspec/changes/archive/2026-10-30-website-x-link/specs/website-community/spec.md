# Spec Delta

## ADDED Requirements

### Requirement: X account link
Every page, in every language, SHALL link to the OpenTodo account on X from the footer's Community list, as a text item named "X" after the Discord item. The About page's "Who makes it" section SHALL name the account as the place to follow releases and work in progress in short form, as a link. Both SHALL be plain anchors that load nothing from X until followed: no script, image, frame or request to an X address appears in any built page. The address SHALL be defined once in the site-wide constants (not in the app bundle, since it is a fact about the project, not about a release) so that a changed handle is one edit that updates every page. The links SHALL read at 360 px wide and without JavaScript, reachable by keyboard with a visible focus state, in light and dark.

#### Scenario: Footer on the home page
- **WHEN** a visitor opens `/` at 360 px wide with JavaScript disabled
- **THEN** the footer's Community list contains "X" after "Discord", pointing at the account, and the page requests nothing from an X address

#### Scenario: Footer on a translated page
- **WHEN** a visitor opens the Italian home page
- **THEN** the same X link is present in the footer

#### Scenario: About page
- **WHEN** a visitor reads "Who makes it" on `/about/`
- **THEN** a sentence links to the X account for releases and work in progress

#### Scenario: Changed handle
- **WHEN** the address in the site-wide constants is changed and the site is rebuilt
- **THEN** every X link on every page carries the new address and the link check passes

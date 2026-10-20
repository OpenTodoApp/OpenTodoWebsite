# Spec Delta

## Purpose

How the website points visitors to the places where they can talk to the project and to other people who use OpenTodo: the community chat and the issue tracker.

## ADDED Requirements

### Requirement: Community link on every page
Every page, in every language, SHALL link to the OpenTodo Discord server from the footer's Project list, with a text label that names Discord. The link SHALL be a plain anchor that loads nothing from Discord until it is followed: no script, image, frame or request to a Discord address appears in any built page. The address SHALL be defined once in the site-wide constants (not in the app bundle, since it is a fact about the project, not about a release) so that a changed invite is one edit that updates every page. The footer SHALL read at 360 px wide and without JavaScript, the link reachable by keyboard with a visible focus state, in light and dark.

#### Scenario: Footer on the home page
- **WHEN** a visitor opens `/` at 360 px wide with JavaScript disabled
- **THEN** the footer's Project list contains "Community on Discord" pointing at the invite address, and the page requests nothing from a Discord address

#### Scenario: Footer on a translated page
- **WHEN** a visitor opens the Italian home page
- **THEN** the same Discord link is present in the footer

#### Scenario: Changed invite
- **WHEN** the invite address in the site-wide constants is changed and the site is rebuilt
- **THEN** the footer, the About page and the Help page all carry the new address and the link check passes

### Requirement: Where to ask a question
The About page's "Who makes it" section SHALL name the Discord server as the place for questions and conversation, and the issue tracker as the place for bug reports and ideas, each as a link. The Help page's "Something is wrong" section SHALL offer the Discord server as a way to ask before opening an issue, as a link in its introduction. Both pages SHALL keep these statements true by reading the same site-wide constants as the footer, and both SHALL read at 360 px wide without JavaScript.

#### Scenario: About page
- **WHEN** a visitor reads "Who makes it" on `/about/`
- **THEN** one list item links to the Discord server for questions and one links to the issue tracker for bug reports, and security reports are still directed to email

#### Scenario: Help page
- **WHEN** a visitor reads "Something is wrong" on `/help/` without JavaScript
- **THEN** its introduction links to the Discord server and to the issue tracker, in that order

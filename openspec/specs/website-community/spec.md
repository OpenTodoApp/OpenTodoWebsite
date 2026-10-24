# website-community Specification

## Purpose
How the website points visitors to the places where they can talk to the project and to other people who use OpenTodo: the community chat and the issue tracker.

## Requirements

### Requirement: Community link on every page
Every page, in every language, SHALL link to the OpenTodo Discord server from the footer, both as a text item in the Project list that names Discord and as the Discord button under the coffee button. The links SHALL be plain anchors that load nothing from Discord until followed: no script, image, frame or request to a Discord address appears in any built page. The address SHALL be defined once in the site-wide constants (not in the app bundle, since it is a fact about the project, not about a release) so that a changed invite is one edit that updates every page. The footer SHALL read at 360 px wide and without JavaScript, the links reachable by keyboard with a visible focus state, in light and dark.

#### Scenario: Footer on the home page
- **WHEN** a visitor opens `/` at 360 px wide with JavaScript disabled
- **THEN** the footer's Project list contains "Community on Discord" and the footer shows the Discord button, both pointing at the invite address, and the page requests nothing from a Discord address

#### Scenario: Footer on a translated page
- **WHEN** a visitor opens the Italian home page
- **THEN** the same Discord link and button are present in the footer

#### Scenario: Changed invite
- **WHEN** the invite address in the site-wide constants is changed and the site is rebuilt
- **THEN** every Discord link and button on every page carries the new address and the link check passes

### Requirement: Where to ask a question
The About page's "Who makes it" section SHALL name the Discord server as the place for questions and conversation, and the issue tracker as the place for bug reports and ideas, each as a link, and SHALL show the Discord button. The Learn page's "Something is wrong" section (which took over the Help page's) SHALL offer the Discord server as a way to ask before opening an issue, as a link in its introduction and as the Discord button. Both pages SHALL read the same site-wide constants as the footer and SHALL read at 360 px wide without JavaScript.

#### Scenario: About page
- **WHEN** a visitor reads "Who makes it" on `/about/`
- **THEN** one list item links to the Discord server for questions and one links to the issue tracker for bug reports, security reports are still directed to email, and the Discord button is shown

#### Scenario: Help page
- **WHEN** a visitor reads "Something is wrong" on `/learn/` (the old `/help/` redirects there) without JavaScript
- **THEN** its introduction links to the Discord server and to the issue tracker, in that order, and the Discord button follows it

### Requirement: Discord button
The site SHALL draw one Discord button used everywhere it invites people to the server: Discord's blurple background (#5865F2, darker on hover), white text and Discord's logo as an inline mark, in both light and dark themes, with a label that invites ("Join us on Discord" in English, translated on translated pages). The logo SHALL be part of the page, not fetched, and hidden from assistive technology; the label alone names the link. The label SHALL meet WCAG 2.2 AA contrast against the background, and the button SHALL show the site's visible focus ring and fit without sideways scrolling at 360 px wide.

#### Scenario: Recognisable and accessible
- **WHEN** a visitor tabs to a Discord button in dark mode at 360 px wide
- **THEN** it shows the blurple background with the logo and "Join us on Discord", a visible focus ring, and the accessibility check of the page passes

### Requirement: Community invitation on the home page and at the end of content pages
The home page in every language SHALL have a community section, placed after the self-hosting section and before the blog and the closing call to action, that invites visitors to join the Discord server in a friendly, first-person-plural voice (what they will find there: questions answered, set-ups shared, ideas heard by the maintainer) and shows the Discord button. The closing call to action shared by content pages SHALL show the Discord button beside the coffee button with one line inviting questions and ideas. Both SHALL read at 360 px wide without JavaScript, and their text SHALL make no claim about the app that needs a docs link.

#### Scenario: English home page
- **WHEN** a visitor scrolls the home page past "How it works"
- **THEN** a section titled "Come and say hello." invites them to the Discord server and shows the Discord button

#### Scenario: German home page
- **WHEN** a visitor opens the German home page
- **THEN** the same section appears with German text and a German button label

#### Scenario: End of a guide
- **WHEN** a visitor reaches the end of a guide
- **THEN** the closing call to action shows the Discord button beside the coffee button

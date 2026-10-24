## MODIFIED Requirements

### Requirement: Where to ask a question
The About page's "Who makes it" section SHALL name the Discord server as the place for questions and conversation, and the issue tracker as the place for bug reports and ideas, each as a link, and SHALL show the Discord button. The Learn page's "Something is wrong" section (which took over the Help page's) SHALL offer the Discord server as a way to ask before opening an issue, as a link in its introduction and as the Discord button. Both pages SHALL read the same site-wide constants as the footer and SHALL read at 360 px wide without JavaScript.

#### Scenario: About page
- **WHEN** a visitor reads "Who makes it" on `/about/`
- **THEN** one list item links to the Discord server for questions and one links to the issue tracker for bug reports, security reports are still directed to email, and the Discord button is shown

#### Scenario: Help page
- **WHEN** a visitor reads "Something is wrong" on `/learn/` (the old `/help/` redirects there) without JavaScript
- **THEN** its introduction links to the Discord server and to the issue tracker, in that order, and the Discord button follows it

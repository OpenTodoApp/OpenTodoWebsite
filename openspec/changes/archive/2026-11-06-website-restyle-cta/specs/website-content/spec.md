# Spec Delta

## MODIFIED Requirements

### Requirement: Content navigation
Every page SHALL reach the templates and the guidance content through the Learn link in the main navigation and through the footer's Learn group, once at least one entry of each is published. Every content page except the legal and accessibility pages SHALL end with one next step: a short title and one action chosen for the page (try the demo, get started, install with Docker, import, read the source, or follow the blog), never more than one button. At 360 px wide and without JavaScript these links SHALL work as on a laptop.

#### Scenario: Navigation appears with content
- **WHEN** the first template and the first guide are published
- **THEN** every page's footer shows Templates and Guides and how-tos, the Learn page links both, and both work at 360 px without JavaScript

#### Scenario: End of a guide
- **WHEN** a visitor reaches the end of a guide at 360 px wide without JavaScript
- **THEN** the page ends with one title and one link, Try the demo, which works

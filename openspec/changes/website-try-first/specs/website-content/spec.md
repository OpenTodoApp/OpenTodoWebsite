# Spec Delta

## MODIFIED Requirements

### Requirement: Content navigation
The main navigation SHALL offer Templates and Guides once at least one entry of each is published, alongside the existing navigation, and every content page SHALL end with calls to try the demo, self-host and import, the demo first. Under those calls the page SHALL say in one line that the demo is a private sandbox with sample data, deleted after a period without activity, as the demo documentation of the pinned release states it, and SHALL link that page. The closing calls SHALL read and link without JavaScript at 360 px wide.

#### Scenario: Navigation appears with content
- **WHEN** the first template and the first guide are published
- **THEN** every page's navigation shows Templates and Guides, and works at 360 px without JavaScript

#### Scenario: Demo first at the end of a guide
- **WHEN** a visitor reaches the end of a guide, a how-to, a template, a topic, a switch page or a comparison on a 360 px wide phone without JavaScript
- **THEN** the first of the closing calls to action is the demo, followed by self-host and import, with the demo line and its link to the demo documentation under them, all working as plain links

#### Scenario: Demo line follows the docs
- **WHEN** a new bundle is pinned whose demo documentation states a different idle lifetime
- **THEN** the closing calls' sentence is changed in the same pull request, and the link check fails if the demo documentation page is absent from the pinned docs

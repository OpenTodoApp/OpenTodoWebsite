# Spec Delta

## MODIFIED Requirements

### Requirement: Five-destination navigation
From 768 px wide, the header SHALL show Features, Learn, Docs and Blog on one line, then the language switch, a "Star" link to the app repository and one primary action, Try the demo. Below 768 px the header SHALL show the logo, Try the demo and a menu button whose panel opens without JavaScript, by keyboard and pointer, and shows the same destinations, Get started, Star on GitHub and the language switch. The guidance content (guides, how-tos, toolkit, templates, switch pages and topics) SHALL be reached through the Learn page and the footer rather than a menu in the header.

#### Scenario: Learn without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Learn with the keyboard
- **THEN** the Learn page opens and links the guides, how-tos, toolkit and templates

#### Scenario: Blog follows the content
- **WHEN** no post is published
- **THEN** the header and the phone menu list no Blog link, as the blog specification requires

#### Scenario: Phone menu
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** it shows Features, Learn, Docs and Blog, then Get started and Star on GitHub, and each works, while Try the demo stays visible in the bar

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways

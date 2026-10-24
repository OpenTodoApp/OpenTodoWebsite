## REMOVED Requirements

### Requirement: Grouped navigation
**Reason**: The header no longer groups guidance links in a Learn menu; Learn is one page (website-shell-v2).
**Migration**: Replaced by "Five-destination navigation" below; the guidance pages are reached through the Learn page and the footer.

## ADDED Requirements

### Requirement: Five-destination navigation
From 768 px wide, the header SHALL show Features, Learn, Compare, Docs and Blog on one line, followed by the Get started action, and from 1024 px also the Try the demo action. Below 768 px the phone menu SHALL show the same links and both actions in one panel that opens without JavaScript, by keyboard and pointer. The guidance content (guides, how-tos, toolkit, templates, switch pages and topics) SHALL be reached through the Learn page and the footer rather than a menu in the header.

#### Scenario: Learn without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Learn with the keyboard
- **THEN** the Learn page opens and links the guides, how-tos, toolkit and templates

#### Scenario: Blog follows the content
- **WHEN** no post is published
- **THEN** the header and the phone menu list no Blog link, as the blog specification requires

#### Scenario: Phone menu
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** it shows Features, Learn, Compare, Docs and Blog, then Try the demo and Get started, and each works

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways

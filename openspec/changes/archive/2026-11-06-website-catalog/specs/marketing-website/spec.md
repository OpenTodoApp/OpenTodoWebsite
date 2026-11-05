# Spec Delta

## MODIFIED Requirements

### Requirement: Features page
The site SHALL have a features overview at `/features/` and one page per group at `/features/<group>/`, on the catalog layout Learn shares. The overview SHALL show each group's first five features with the group's count and a link to its page, then the integrations, the apps it imports from and that nothing costs extra; a group's page SHALL list all its features. Every feature SHALL have a one-line description and link its documentation page in the pinned bundle. The header's Features link SHALL open this page. The page SHALL read without JavaScript and at 360 px wide, with each description under its feature's name.

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/features/` at 360 px wide with JavaScript disabled
- **THEN** every group, its first features and the link to the group's page are shown and work, the rail reaches every group, and the page does not scroll sideways

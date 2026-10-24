## MODIFIED Requirements

### Requirement: Shared layout and navigation
Every page SHALL share one header with navigation to Features, Learn, Compare, Docs and the Blog (while a post is published), a secondary "Try the demo" and a primary "Get started" action, and one footer of four short link groups (Product, Learn, Project, Community) with licence, source and specification links in its fine print. Each navigation target SHALL be defined once in the site constants, and the link check SHALL prove that every target exists in the build. The layout SHALL follow the visitor's light or dark preference, use the colour tokens, typeface and icon set from the bundle, and collapse the navigation into a menu below 768 px that works without JavaScript.

#### Scenario: Phone navigation without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens the menu
- **THEN** the navigation links are shown and work

#### Scenario: Colours match the app
- **WHEN** the bundle's accent token changes in a new release and the site is rebuilt
- **THEN** buttons and links on the site use the new value without any edit in this repository

#### Scenario: Header on a laptop
- **WHEN** a visitor opens any page at 1280 px wide with JavaScript disabled
- **THEN** the header shows Features, Learn, Compare, Docs and Blog on one line with Try the demo and Get started, and each link opens its page

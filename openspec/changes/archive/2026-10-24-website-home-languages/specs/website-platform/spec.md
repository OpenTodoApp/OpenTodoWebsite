## MODIFIED Requirements

### Requirement: Shared layout and navigation
Every page SHALL share one header (Features, Learn, Compare, Docs, the Blog while a post exists, Try the demo and the primary Get started) and one footer of four link groups with licence, source and specification links. Targets SHALL be defined once in the site constants and checked by the link check. The layout SHALL follow the visitor's colour preference, use the bundle's tokens, typeface and icons, and collapse into a menu below 768 px that works without JavaScript. Below 768 px the footer SHALL be compact: the four link groups as disclosures that open by keyboard and pointer without JavaScript to the same links as the wider footer, the languages and licence links visible, and every link at least 24 px tall.

#### Scenario: Phone navigation without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens the menu
- **THEN** the navigation links are shown and work

#### Scenario: Colours match the app
- **WHEN** the bundle's accent token changes in a new release and the site is rebuilt
- **THEN** buttons and links on the site use the new value without any edit in this repository

#### Scenario: Header on a laptop
- **WHEN** a visitor opens any page at 1280 px wide with JavaScript disabled
- **THEN** the header shows Features, Learn, Compare, Docs and Blog on one line with Try the demo and Get started, and each link opens its page

#### Scenario: Footer on a phone
- **WHEN** a visitor opens the home page at 390 px wide without JavaScript
- **THEN** the footer is at most 600 px tall, and opening its four groups shows every link of the wider footer

# Spec Delta

## MODIFIED Requirements

### Requirement: Shared layout and navigation
Every page SHALL share one header with navigation to Features, Compare, Self-host, Developers and Docs and a "Try the demo" link to the public demo that is visible at every width, outside the phone menu, and one footer with licence, source and specification links. The demo link SHALL carry a description for assistive technology saying that the demo is a private sandbox with sample data that is deleted after a period without activity; the phone menu SHALL show that sentence visibly under its own demo link, with a link to the demo documentation of the pinned release. The layout SHALL follow the visitor's light or dark preference, use the colour tokens, typeface and icon set from the bundle, and collapse the navigation into a menu below 768 px that works without JavaScript. Clicks on the header's demo link SHALL be counted by the self-hosted analytics as a click event only; no other event SHALL be added for it.

#### Scenario: Phone navigation without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens the menu
- **THEN** the navigation links are shown and work

#### Scenario: Colours match the app
- **WHEN** the bundle's accent token changes in a new release and the site is rebuilt
- **THEN** buttons and links on the site use the new value without any edit in this repository

#### Scenario: Demo link on a phone without JavaScript
- **WHEN** a visitor on a 360 px wide screen with JavaScript disabled opens any page
- **THEN** a "Try the demo" link is visible in the header without opening the menu, and the header stays on one line without sideways scrolling

#### Scenario: Demo link on a tablet
- **WHEN** the header is shown at 768 px or 1024 px wide
- **THEN** the "Try the demo" link is visible and every header item stays on one line

#### Scenario: Honest about the demo
- **WHEN** a screen reader user reaches the header's demo link, or a visitor opens the phone menu
- **THEN** they are told that the demo is a private sandbox with sample data that is deleted after two hours without activity, and the phone menu links the demo documentation of the pinned release

#### Scenario: Demo lifetime follows the docs
- **WHEN** a new bundle is pinned whose demo documentation states a different idle lifetime
- **THEN** the header's sentence is changed in the same pull request, and the link check fails if the demo documentation page is absent from the pinned docs

#### Scenario: Measured as a click only
- **WHEN** a visitor clicks the header's demo link with JavaScript enabled
- **THEN** the self-hosted analytics records one click event naming the header as its section and nothing typed or personal, and no event is recorded for merely seeing the link

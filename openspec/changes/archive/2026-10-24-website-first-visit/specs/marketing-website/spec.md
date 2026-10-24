# Spec Delta

## Purpose

Adds what a first-time visitor needs to decide: the paths to get OpenTodo, what it costs in words, who makes it, and one Learn menu for the guidance content.

## ADDED Requirements

### Requirement: Paths to get OpenTodo on the home page
Directly below the hero, the home page SHALL show the three ways to get OpenTodo: trying the demo, joining a server someone else runs with an invitation link, and running one's own server. It SHALL state that OpenTodo is not offered as a hosted service. Each path SHALL link to the page or documentation of the pinned release that continues it. The block SHALL read and link without JavaScript at 360 px wide.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor reads the block on a 360 px wide phone without JavaScript
- **THEN** the second path tells them to open the invitation link they were sent and links to the documentation for installing the app from the browser

#### Scenario: Demo lifetime from the docs
- **WHEN** the demo card states how long a sandbox lives
- **THEN** the statement matches the demo documentation of the pinned release and links to it

#### Scenario: No hosted sign-up is implied
- **WHEN** a visitor looks for a "sign up" or "start for free" path
- **THEN** the block says OpenTodo is not offered as a hosted service and offers the demo instead

### Requirement: What it costs page
The site SHALL have a page at `/cost/` that explains the cost of using OpenTodo in words and without currency: the free licence named by the bundle manifest, the server footprint from the bundle manifest, who installs and updates, and how this compares with a plan per person. Every statement about the app SHALL link to its documentation page of the pinned release. The page SHALL be in the main navigation and SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Figures follow the release
- **WHEN** a new bundle is pinned with a different image size or idle memory
- **THEN** the cost page shows the new figures without any edit in this repository

#### Scenario: No prices
- **WHEN** the page is scanned for currency symbols or amounts
- **THEN** none are found; costs are described in words

### Requirement: About and trust page
The site SHALL have a page at `/about/` that says who maintains OpenTodo, when it was first and last released, what the licence means in plain words, where the security policy and the specifications are, how long the demo keeps a sandbox, what this website collects, and how to leave with one's data. Maintainer details SHALL come from the authors file and release dates from the bundle's changelog. The page SHALL be in the footer and SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Release history follows the bundle
- **WHEN** a bundle with a newer release is pinned
- **THEN** the about page names the newer release and its date without any edit in this repository

#### Scenario: App statements are sourced
- **WHEN** the about page states what the app does, for example that data can be exported
- **THEN** the statement links to the documentation page of the pinned release

#### Scenario: Security policy one click away
- **WHEN** a visitor on the about page wants to report a vulnerability
- **THEN** a link leads to the app's security policy

### Requirement: Grouped navigation
From 768 px wide, the header SHALL show Features, Compare, What it costs, a Learn menu, Self-host, Developers and Docs on one line. The Learn menu SHALL list Guides, Templates, Toolkit, Blog and What's new and SHALL open and close without JavaScript, by keyboard and pointer. Below 768 px the phone menu SHALL show the same links in two groups, Product and Learn, in one panel that opens without JavaScript.

#### Scenario: Learn menu without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Learn with the keyboard
- **THEN** the links Guides, Templates, Toolkit, Blog and What's new are shown and work

#### Scenario: Learn follows the content
- **WHEN** no guide or template is published, or no post is published
- **THEN** the Learn menu is absent, or respectively lists no Blog link, as the content and blog specifications require

#### Scenario: Phone menu groups
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** the Product group shows Features, Compare, What it costs, Self-host, Developers and Docs, and the Learn group shows Guides, Templates, Toolkit, Blog and What's new

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways

### Requirement: Hero demo reads cleanly without styles
The counts in the hero demo's sidebar SHALL NOT be marked up as emphasis, so a text-only rendering or a screen reader reads "Inbox 3", not emphasised text.

#### Scenario: Text rendering
- **WHEN** the home page is rendered as plain text
- **THEN** the sidebar reads "Inbox 3" and "Today 4" without emphasis markers

# Spec Delta

## Purpose

Defines what the public OpenTodo website must say and do to win people who use commercial task apps today: an outcome-first home page, honest comparisons, switch paths, audience pages for self-hosters and developers, and a consistent, accessible, privacy-respecting presentation.

## ADDED Requirements

### Requirement: Outcome-first home page
The home page SHALL open with the outcome for people who use a task app, not with implementation details. Above the first screenful it SHALL show a headline, a one-sentence promise, the live demo of the app, and calls to action to try the demo, self-host and import. Below, it SHALL present the differentiators (one server for a whole household, full offline use, optional end-to-end encryption, assistants with the user's own model key, leaving at any time), real screenshots and a short teaser that links to the self-hosting page. Architecture terms SHALL NOT appear above the fold.

#### Scenario: A Todoist user lands on the home page
- **WHEN** a visitor opens the home page on a 390 px wide phone
- **THEN** the first screenful shows the headline, the promise and the calls to action, and the live demo is reachable by scrolling once, without any mention of op logs, clocks or SQLite

#### Scenario: Technical detail is one click away
- **WHEN** a visitor wants to know how sync works
- **THEN** a link from the home page leads to the self-hosting page with the interactive sync demo

### Requirement: Honest comparison pages
The site SHALL have one comparison page each for Todoist, Things and Linear. Each SHALL contain:
- a feature table with rows where the competitor is ahead, not only rows where OpenTodo is ahead
- the date the comparison was last checked
- the cost difference stated in words without exact prices that can go stale
- a link to the matching switch guide

Competitor names SHALL appear as text only, without their logos or visual identity. Every claim about OpenTodo SHALL link to the documentation page that supports it.

#### Scenario: A gap is shown
- **WHEN** a visitor reads the Things comparison
- **THEN** the table shows that Things has native Apple Watch and widget support and OpenTodo does not

#### Scenario: Stale comparison
- **WHEN** a comparison page's "checked on" date is older than six months at build time
- **THEN** the website check reports the page as stale

### Requirement: Switch calls to action follow the importers
A "Switch from <app>" call to action SHALL appear only for apps whose named import format is released in the version the site describes, and SHALL lead to that app's switch guide. For other apps the site SHALL link to the general import guide instead and SHALL NOT promise a one-step switch.

#### Scenario: Importer not yet released
- **WHEN** the site is built while the Linear import format is not in the released version
- **THEN** the Linear comparison links to the general import guide and shows no "Switch from Linear" button

### Requirement: Audience pages
The site SHALL have a self-hosting page with the sync demo, footprint, container, Coolify and one-click install instructions, and a developers page with the API, command-line client, MCP, webhooks and open specifications. Both SHALL be linked from the main navigation of every page.

#### Scenario: Navigation
- **WHEN** a visitor is on any comparison page
- **THEN** the main navigation offers Features, Compare, Self-host, Developers and Docs

### Requirement: Consistent visual language
Every page SHALL use the app's colour palette and typeface, icons from one line-icon set, and real screenshots of the app shown in a consistent frame, in light and dark. Emoji and Unicode symbols SHALL NOT be used as icons. Every page SHALL follow the visitor's light or dark preference.

#### Scenario: No emoji icons
- **WHEN** the website check scans the built pages
- **THEN** it reports any emoji or symbol used as an icon in navigation, feature lists or buttons

#### Scenario: Dark preference
- **WHEN** a visitor whose system prefers dark opens a comparison page
- **THEN** the page and its screenshots are shown in their dark variants

### Requirement: Fast, private and accessible pages
Every page SHALL work without JavaScript for reading and navigation, SHALL load no third-party scripts other than the site's self-hosted analytics, and SHALL meet WCAG 2.2 AA in light and dark at widths from 360 px, without horizontal scrolling.

#### Scenario: Reading without scripts
- **WHEN** a visitor opens the Todoist comparison with JavaScript disabled
- **THEN** the full text, table and links are readable and work

#### Scenario: Accessibility check
- **WHEN** the website check runs an automated accessibility audit on every page in light and dark
- **THEN** it fails on any serious or critical violation

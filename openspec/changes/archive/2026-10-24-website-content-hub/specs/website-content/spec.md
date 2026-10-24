# Spec Delta

## Purpose

Defines the content around the product (template gallery, method guides, toolkit, essays, what's new and the feed) and the rules that keep every published piece useful, truthful and reviewed, so the site earns trust and search traffic without a content team.

## ADDED Requirements

### Requirement: Template gallery
The site SHALL offer a gallery of ready-made templates. Each SHALL have a page with a description, a real screenshot in light and dark, and a downloadable file that the pinned release's importer accepts as-is. The page SHALL say how to import the file. Every template file SHALL be imported into a server of the pinned release by the website checks, and a template that fails to import SHALL fail the build.

#### Scenario: Use a template today
- **WHEN** a visitor downloads the "Weekly review" template and imports it in Settings → Import
- **THEN** the projects, sections and tasks shown on the template page are created in their account

#### Scenario: Template broken by a release
- **WHEN** the pinned release changes and a template no longer imports cleanly
- **THEN** the website checks fail and name the template and the import error

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens a template page on a 360 px screen with JavaScript disabled
- **THEN** the description, screenshot, import steps and download link work

### Requirement: Guides, toolkit and essays
The site SHALL offer method guides (for example GTD, weekly review, time blocking, prioritising with filters), a toolkit for setting up OpenTodo for a household and for a small team, and a few essays on owning your data. Each guide SHALL link the templates and documentation pages it uses, and every statement about what OpenTodo can do SHALL link to a documentation page of the pinned release.

#### Scenario: Guide links its template
- **WHEN** a visitor reads the weekly review guide
- **THEN** it links the "Weekly review" template and the documentation of the filters it uses

#### Scenario: Claim without a source
- **WHEN** a guide states a product capability without a link to the documentation
- **THEN** the content check fails and names the guide and the sentence's line

### Requirement: What's new and feed
The site SHALL publish a "What's new" page per release from the bundle's changelog, and SHALL offer an RSS feed listing new guides, templates, essays and releases. Neither SHALL describe features that are not in a released version.

#### Scenario: New release
- **WHEN** the pinned bundle moves to a new release
- **THEN** a "What's new" page for that release appears and the feed lists it

### Requirement: Content navigation
The main navigation SHALL offer Templates and Guides once at least one entry of each is published, alongside the existing navigation, and every content page SHALL end with calls to try the demo, self-host and import.

#### Scenario: Navigation appears with content
- **WHEN** the first template and the first guide are published
- **THEN** every page's navigation shows Templates and Guides, and works at 360 px without JavaScript

### Requirement: Reviewed, sourced and fresh content
Every published piece SHALL be approved by the maintainer through a pull request before it goes live, and SHALL carry a last-reviewed date. Content drafted by an agent SHALL follow the repository's voice guide. A piece whose last-reviewed date is older than one year at build time SHALL be reported as stale by the checks.

#### Scenario: Agent draft
- **WHEN** a scheduled agent drafts a new guide
- **THEN** it opens a pull request with a rendered preview, and the guide is not published until the maintainer merges it

#### Scenario: Stale guide
- **WHEN** a guide's last-reviewed date is 13 months old at build time
- **THEN** the checks report it as stale and name it

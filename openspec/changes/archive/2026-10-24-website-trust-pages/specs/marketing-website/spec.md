# Spec Delta

## Purpose

Adds the pages that back the site's promises: how to capture a page into the app, what the site commits to on accessibility, and how the demo behaves.

## ADDED Requirements

### Requirement: Capture landing page
The site SHALL have a page at `/capture/` presenting the share sheet, the browser extension and the bookmarklet as described in the capture documentation of the pinned release, with the install steps for the extension, the share sheet's support by platform, and its privacy facts, every statement linked to that documentation. It SHALL be linked from the footer, the help page and the install pages, and SHALL read at 360 px wide without JavaScript.

#### Scenario: Extension not in the stores
- **WHEN** a visitor looks for the extension in a browser store
- **THEN** the page says it installs unpacked from a release download and links the releases

#### Scenario: Safari share sheet
- **WHEN** a visitor on an iPhone reads the platform list
- **THEN** it says Safari offers no share target for web apps and points to the bookmarklet

### Requirement: Accessibility statement
The site SHALL have a page at `/accessibility/` stating the target (WCAG 2.2 AA in light and dark from 360 px, with and without JavaScript), how it is checked on every change, what the statement does not cover (the documentation served from the bundle and the app itself), known limitations, a review date and how to report a problem. It SHALL be linked from the footer of every page.

#### Scenario: Reporting a problem
- **WHEN** a visitor cannot use a page
- **THEN** the statement gives a reporting channel and says what to include

#### Scenario: Docs excluded honestly
- **WHEN** a visitor asks whether the docs are covered
- **THEN** the statement says they come from the app project and are outside this site's audit

### Requirement: Demo status page
The site SHALL have a page at `/status/` describing the demo as the demo documentation of the pinned release does (sandbox lifetime, the nightly reset, what is switched off, isolation), linking the demo's health endpoint as the live check, and telling an expired sandbox apart from an outage. The page SHALL make no request on the visitor's behalf.

#### Scenario: Expired sandbox
- **WHEN** a visitor sees "Your demo sandbox has expired"
- **THEN** the status page says it is the time limit or the nightly reset, not an outage, and what to do

#### Scenario: Version differs
- **WHEN** the demo runs a version other than the one the site describes
- **THEN** the page says the health endpoint names the demo's version and which version the site describes

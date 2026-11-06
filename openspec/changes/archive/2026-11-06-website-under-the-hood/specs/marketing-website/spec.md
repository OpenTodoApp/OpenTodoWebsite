# Spec Delta

## MODIFIED Requirements

### Requirement: Audience pages
The site SHALL have a self-hosting page with the sync demo, footprint, container, Coolify and one-click install instructions, and a technical entry point, "Under the hood" at `/under-the-hood/`, with groups of link rows: how it works (architecture, sync protocol, offline and sync, shared contracts), building on it (the API, the command line, MCP, webhooks, CalDAV), what it promises (stability, performance budgets, the roadmap, the changelog), security (the Security page, end-to-end encryption) and releases and source (verifying the image, downloads and Android app, the repository, the open specifications). Every row SHALL link the pinned docs or the repository, read at 360 px wide without JavaScript, and add nothing to the home page. Both SHALL be linked from the footer of every page.

#### Scenario: Navigation
- **WHEN** a visitor is on any page
- **THEN** the footer links Self-host and Under the hood

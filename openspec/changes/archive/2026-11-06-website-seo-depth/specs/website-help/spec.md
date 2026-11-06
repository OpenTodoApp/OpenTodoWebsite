# Spec Delta

## MODIFIED Requirements

### Requirement: Switch pages per app
The site SHALL have an index at `/switch/` with a glossary of the other apps' words, and one page per app (at least Todoist, Things, TickTick, Linear and Microsoft To Do) with the export steps, the import path of the pinned release, what comes across and what does not, a term map and a first-week checklist. Its title SHALL name it as an open-source alternative to the app ("Open-source Todoist alternative") and its description SHALL say that OpenTodo is free, open source and self-hosted before the page's summary; its heading stays "Moving from <app>". It SHALL carry a BreadcrumbList. Facts about the other app SHALL carry a "checked on" date no older than 180 days at build time. A page SHALL NOT promise a one-step import unless the app's import format is in the pinned bundle's manifest.

#### Scenario: Named importer released
- **WHEN** the pinned bundle's manifest lists the app's import format and its docs contain the app's switch guide
- **THEN** the switch page links that guide as the one-step path

#### Scenario: No named importer yet
- **WHEN** the pinned bundle's manifest does not list the app's import format
- **THEN** the switch page says there is no one-step importer in this release and describes the CSV or JSON path

#### Scenario: Stale switch page
- **WHEN** a switch page's "checked on" date is older than 180 days at build time
- **THEN** the build reports it as stale

#### Scenario: Honest about losses
- **WHEN** the importers of the pinned release drop something the other app has (for example comments)
- **THEN** the page lists it under what does not come across

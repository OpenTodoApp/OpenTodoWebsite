# Spec Delta

## Purpose

Lets a visitor try quick add and filters in the browser and lets a future operator get the file to run their server, all from documented behaviour.

## ADDED Requirements

### Requirement: Quick-add playground
The site SHALL offer a quick-add playground that shows, for a typed line, the chips the app would show and the title it would save, following the quick add reference of the pinned release. It SHALL say it is a miniature in English and link the reference and the demo. Without JavaScript it SHALL show a table of examples.

#### Scenario: A full line
- **WHEN** a visitor types `Call Sam tomorrow at 3pm #work @call p2 +45m`
- **THEN** chips for the date and time, the project, the label, the priority and the estimate appear and the title reads "Call Sam"

#### Scenario: Quoted text
- **WHEN** a visitor types `Watch "Next Friday" tomorrow`
- **THEN** only the date chip appears and the title reads "Watch Next Friday"

### Requirement: Filter playground
The site SHALL offer a filter playground that applies a typed query to a sample list of tasks following the filter language of the pinned release, showing completed tasks only when the query names them and keeping the previous results on a query it cannot read. Without JavaScript it SHALL show the sample list.

#### Scenario: Overdue in the Inbox
- **WHEN** a visitor types `overdue & no project`
- **THEN** only the sample tasks that are overdue and have no project remain, with a count

#### Scenario: Unfinished query
- **WHEN** a visitor types `@call &`
- **THEN** an error line says the query cannot be read yet and the previous results stay

### Requirement: Server planner
The site SHALL offer a planner that, from a few answers about the server, produces a checklist with a documentation link per step, a `docker-compose.yml` using only variables documented for the pinned release and its image line, and a reverse-proxy snippet when needed. It SHALL quote the documented footprint as its "is it enough" answer, SHALL store or send nothing, and SHALL show the most common setup without JavaScript.

#### Scenario: Grammar coverage
- **WHEN** a visitor types `(@call | @errand) & due <= 7 days` or `##Work & !completed`
- **THEN** brackets, `|`, `!`, `##` and the date comparison are applied as the reference describes

#### Scenario: Cloudflare in front
- **WHEN** a visitor chooses Cloudflare's proxy
- **THEN** the compose file sets the trusted proxies to `cloudflare` and the checklist explains why

#### Scenario: Raspberry Pi
- **WHEN** a visitor chooses a Raspberry Pi
- **THEN** the compose file mounts a bind-mounted data folder and the first step is the ownership command from the documentation

#### Scenario: Secrets never real
- **WHEN** single sign-on or email to task is chosen
- **THEN** the generated values for secrets are placeholders and the page recommends file-based secrets

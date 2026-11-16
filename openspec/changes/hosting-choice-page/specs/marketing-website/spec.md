## MODIFIED Requirements

### Requirement: Hosting page
The site SHALL have an English page at `/hosting/` titled "Where to run OpenTodo", with a title and meta description, listed in the sitemap and the search index Features and Learn share. Under the title it SHALL say in at most three short lines which option suits whom, each line linking its option. It SHALL then show the options side by side from 768 px wide and one below the other below that, in the order of how much a person looks after themselves, least first, and SHALL say that this is the order: each hosting company on the site-wide list of hosts, then the person's own server. Every option SHALL show the same facts in the same order: cost and how it is billed, what setup takes, updates, backups, HTTPS and an own domain, and how to leave with the data. Each SHALL have one button of the same weight and its setup steps; the own server's button SHALL link `/self-host/`, and the option SHALL also link `/install/`. A host's facts SHALL be that host's own, read from its pages on the day, kept with the date they were checked in one site constant per host, and shown with that date; a host's guide in the app's docs SHALL be linked once it is in the pinned bundle. The page SHALL show the disclosure "These links support the project, which receives a share when they're used." exactly once, and nothing else about the arrangement. It SHALL NOT call any option recommended, best or the easiest, compare prices, or show a logo. It SHALL read and link without JavaScript at 360 px wide, in light and dark.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor on a 360 px wide phone without JavaScript opens `/hosting/`
- **THEN** they see "Where to run OpenTodo", the lines on which option suits whom, then PikaPods, Railway and their own server one below the other, each with the six facts and one button, and the page does not scroll sideways

#### Scenario: The same facts in the same order
- **WHEN** a visitor compares two options on `/hosting/`
- **THEN** both show cost and billing, setup, updates, backups, HTTPS and an own domain, and leaving with the data, in that order, and each host's facts carry the date they were checked

#### Scenario: The arrangement is stated
- **WHEN** a visitor reads `/hosting/`
- **THEN** the sentence that these links support the project, which receives a share when they're used, appears exactly once

#### Scenario: Own server instead
- **WHEN** a visitor would rather run OpenTodo themselves
- **THEN** the own server option links `/self-host/` and `/install/`, which cover Docker, Raspberry Pi, NAS and server app stores

#### Scenario: A host is added to the list
- **WHEN** the owner adds a hosting company to the site-wide list with its facts and the site is rebuilt
- **THEN** `/hosting/` shows it as one more option with the same facts, button and steps, and the disclosure still appears once

## REMOVED Requirements

### Requirement: Managed hosting line
**Reason**: The hosting page now presents every listed host as an option of its own, with the disclosure once, so a line naming them at the end repeats the page.
**Migration**: The site-wide list of hosts and its rule (a company is listed when it shares revenue with the project or sponsors it, and on no other ground) stay in `src/lib/hosting.ts`; the hosting page reads it.

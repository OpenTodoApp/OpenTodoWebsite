# Spec Delta

## ADDED Requirements

### Requirement: The web app leads the apps page
`/apps/` SHALL first present the installable web app as the recommended way on phones and computers while the native apps are not ready: that it is the full app, installed from the browser, works offline, syncs and updates itself, the install step for iPhone and iPad, Android and computers, push reminders only as the pinned docs describe them, and a link to `/install/`. The store apps SHALL follow it.

#### Scenario: Order
- **WHEN** a visitor opens `/apps/`
- **THEN** the web app section comes before the App Store badge

### Requirement: Ecosystem page
The site SHALL have a page at `/ecosystem/` listing the ways to install OpenTodo on a server or NAS, the apps, and the plugins and integrations, each with one line, its status and a link to its docs page in the pinned release. A store that has not listed OpenTodo SHALL NOT be shown as available. The footer SHALL link it.

#### Scenario: Waiting store
- **WHEN** a visitor reads the Umbrel row
- **THEN** it says the package is submitted and in review, and links the Umbrel guide

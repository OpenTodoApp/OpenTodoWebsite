# Spec Delta

## ADDED Requirements

### Requirement: Security and trust page
The site SHALL have a page at `/security/`, linked as "Security" from the footer's Project group on every page and from About's security section, with four groups of link rows: how to report a vulnerability privately (GitHub's private reporting, per the app's security policy); what protects the data (the security policy, account security, end-to-end encryption and its threat model, no telemetry with the map provider named); how to check what you run (image and download verification, Android app verification, the source); and what is being written for 1.0 (the threat model, how changes are verified, an independent review), marked as not yet published until the app repository publishes them under `docs/security/`, at which point the rows SHALL link them. Every statement SHALL link the document that backs it. The page SHALL read at 360 px wide without JavaScript, in light and dark.

#### Scenario: Before the threat model is published
- **WHEN** the pinned bundle has no `docs/security/` pages
- **THEN** the "Being written for 1.0" rows carry no link and a note names the work in review

#### Scenario: Verifying an image
- **WHEN** a visitor follows "Verify the image and downloads"
- **THEN** the Docker guide opens at its verification section

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/security/` at 360 px wide with JavaScript disabled
- **THEN** every group and link is readable and works, and the page does not scroll sideways

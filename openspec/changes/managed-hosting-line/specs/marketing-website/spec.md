## ADDED Requirements

### Requirement: Managed hosting line
The hosting page SHALL end, below the block for people who prefer their own server, with one line headed "Managed hosting". The line SHALL name every listed hosting company as a text link, followed by the sentence "These links support the project, which receives a share when they're used." The hosting companies SHALL come from one site-wide list, with the rule for being on it written beside the list: a company is listed when it shares revenue with the project or sponsors it, and on no other ground. The list SHALL hold PikaPods (revenue share) and Railway (template kickback), and another company only when the owner adds it. The line SHALL show no deploy button, no logo and no ranking, and SHALL be absent while the list is empty. It SHALL read and link without JavaScript at 360 px wide.

#### Scenario: The line on the hosting page
- **WHEN** a visitor reaches the end of `/hosting/` on a 360 px wide phone without JavaScript
- **THEN** below "Prefer your own server?" they see "Managed hosting" with links to PikaPods and Railway and the sentence that the links support the project, which receives a share when they're used

#### Scenario: A second host
- **WHEN** the owner adds a hosting company that shares revenue to the site-wide list and the site is rebuilt
- **THEN** the line names both companies as links, with the same single sentence

## MODIFIED Requirements

### Requirement: Structured data
Pages SHALL carry inline schema.org JSON-LD built from their own data: the home page a WebSite and a SoftwareApplication with the bundle's version, the Compare page a FAQPage with its questions and answers, how-tos, guides, toolkit pieces and posts an article entity with author and dates, templates a Dataset with the download. No third-party script SHALL be loaded for it, and no rating, price or user count SHALL be stated.

#### Scenario: FAQ questions follow the page
- **WHEN** a question is added to the questions on the Compare page
- **THEN** the FAQPage entity lists it without a second edit

#### Scenario: Still no third-party scripts
- **WHEN** the website checks scan the built pages
- **THEN** the structured data blocks have no `src` and the script check passes

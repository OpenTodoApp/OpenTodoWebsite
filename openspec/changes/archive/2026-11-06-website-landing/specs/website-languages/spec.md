# Spec Delta

## MODIFIED Requirements

### Requirement: Translated home page
The site SHALL be English with a translated home page in German, French, Italian, Spanish, Portuguese and Simplified Chinese, at most ten languages in all. A translated home page SHALL live under its language's prefix, SHALL render the same sections in the same order as the English home page from the same component, and SHALL state the same facts as the English page, drawn from the bundle where the English page draws them. Its strings SHALL have the same shape as the English home page's strings, enforced by the unit test. Links without a translated target SHALL lead to the English pages. It SHALL read at 360 px wide without JavaScript.

#### Scenario: A language is added
- **WHEN** a dictionary for a seventh language is added with every string of the German one
- **THEN** its home page is built without any other change, and the unit test fails if a string is missing

#### Scenario: The English home page gains a string
- **WHEN** a string is added to the English home page's strings and not to the Italian ones
- **THEN** the unit test fails naming Italian and the path of the string

#### Scenario: Same story in every language
- **WHEN** a visitor opens `/it/` on a 390 px wide phone without JavaScript
- **THEN** the page shows the headline, the two actions and the product stage with the Today screenshot and its briefing sentence, then your day, everything included with the pinned release's feature groups and counts, yours for good with AI on your terms, the three ways in, the community invitation and the end band, in that order

#### Scenario: Old translated addresses
- **WHEN** a visitor opens `/de/cost/` or `/fr/faq/`
- **THEN** the server redirects to the server plan or to Learn

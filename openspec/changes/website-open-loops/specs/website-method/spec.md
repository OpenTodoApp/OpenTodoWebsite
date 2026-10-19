## Purpose

Present Open Loops, the app's own method for everything on your mind, on a page of its own: the five moves as a loop, the principles, the Places, the rhythms and the horizons, in the app's own words and only for a release that ships the method.

## ADDED Requirements

### Requirement: Open Loops page
The site SHALL have a page at `/open-loops/` that presents the Open Loops method: its tagline; what an open loop is; the five moves in their order with each move's description, its keyboard shortcut and, where the vocabulary names it, the Place or rhythm whose screen serves it; the seven principles; the seven Places with a screenshot of the Loop home in light and dark; the three rhythms and the three horizons; how prominent the method is in the app; and the way in for people who know GTD. Every name and description of a move, principle, Place, rhythm or horizon SHALL come from the pinned bundle's `method.json`, so the page uses the same words as the app of that version. Each section SHALL link to its chapter of the method documentation in the pinned release. The page SHALL be built from the site's section types, read fully at 360 px wide without JavaScript, and meet the site's accessibility checks in light and dark.

#### Scenario: The app's own words
- **WHEN** the pinned bundle's `method.json` names the move `place` "Place" with the description "Give every item one home: a project, a date, Waiting or Someday."
- **THEN** the page shows exactly that name and description for the third move

#### Scenario: A renamed term in a new release
- **WHEN** a newer bundle is pinned whose `method.json` changes the English description of `clarify`
- **THEN** the page shows the new description without any edit in this repository

#### Scenario: Sources in the docs
- **WHEN** the link check reads the built page
- **THEN** every section links to a page under `/docs/method/` that exists in the pinned bundle, and the check fails otherwise

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/open-loops/` at 360 px wide with JavaScript disabled
- **THEN** the five moves read in order with their descriptions and shortcuts, every section and link is shown, and the page does not scroll sideways

### Requirement: The loop diagram
The page SHALL draw the five moves as a cycle in which each move leads to the next and Review leads back to Catch, drawn with the site's colour tokens in light and dark. Each move on the cycle SHALL be reachable by keyboard and pointer; choosing one SHALL show its description, its keyboard shortcut and the Place or rhythm that serves it (when there is one) in the centre of the cycle and mark it as chosen, with Catch chosen first. Without JavaScript the diagram SHALL show the cycle and the five moves SHALL also read as an ordered list with every detail visible. The script SHALL ship only on the Open Loops pages.

#### Scenario: Choosing a move by keyboard
- **WHEN** a visitor tabs to Clarify on the cycle and presses Enter
- **THEN** the centre shows Clarify's description and its shortcut, Clarify is marked as chosen, and a screen reader announces the change

#### Scenario: Dark preference
- **WHEN** a visitor whose system prefers dark opens the page
- **THEN** the cycle, its arrows and its labels use the dark tokens and pass the contrast check

#### Scenario: No script elsewhere
- **WHEN** the scripts check reads the home page
- **THEN** it loads no script of the loop diagram

### Requirement: Shown only for a release that ships the method
The Open Loops page, its translations and every link to them SHALL exist only when the pinned bundle carries `method.json` and its manifest's `method` fact lists `vocabulary`. Otherwise the pages SHALL NOT be built and no page SHALL link to them. A `method.json` whose schema version the site does not know, or that lacks a move, SHALL fail the build with a message naming the field.

#### Scenario: Pinned to 0.7.0
- **WHEN** the site is built against the 0.7.0 bundle, which has no `method.json`
- **THEN** `/open-loops/` is not built, the Resources menu and the footer do not offer it, and every check passes

#### Scenario: Pinned to 0.8.0
- **WHEN** the pull request that pins the 0.8.0 bundle is built
- **THEN** `/open-loops/` and its translations are built, the Resources menu, the footer, the GTD guide, the weekly review template, the quiz results and Help link to it, and no other file in this repository changes for it

#### Scenario: An unexpected vocabulary
- **WHEN** a bundle's `method.json` has schema version 2, or no move with the id `review`
- **THEN** the build fails and names `method.json` and the field

# Proposal: website-article-layout

## Why

Guides, toolkit pieces and how-tos are the pages people read longest, and each type has its own layout today. None shows where the page sits in its list, and the docs a page relies on are a list of raw paths at the bottom. The accepted redesign opens an article the way the app opens a task, with:
- a bar with the breadcrumb and "n of m" with previous and next;
- the title beside a task ring;
- a facts column beside the text.

## What Changes

- **A shared `ArticleLayout` component** used by guides (`/guides/<slug>/`), toolkit pieces (`/toolkit/<slug>/`) and how-tos (`/how-to/<slug>/`):
  - **Bar:** the breadcrumb (Learn › Methods, Start here or How-tos), then "Method 3 of 10" (or Setup, or How-to) with previous and next links, in the order of the Learn library.
  - **Main column:** the title with a task ring, the summary, an optional screenshot (how-tos), then the content.
  - **Facts column:**
    - On this page (the h2 headings);
    - About this (reading time or minutes, topic or group, who it's for, the review date);
    - In the docs (the pages it relies on, by their docs titles, not paths);
    - Next (two entries);
    - Try it in the demo.
  - From 1024 px the facts column is sticky beside the text. Below that it follows the text.
- **Related sections fold into the facts column:** the "Documentation this page relies on" and "More in …" sections now live there. Guides and toolkit pieces keep "Templates for this" after the article.
- **Structured data:** the BreadcrumbList on these pages goes through Learn, and `mainEntityOfPage` uses the page's own address. Until now it was built from the section link, which moved with `website-learn`.

**Out of scope**
- Blog posts, switch pages and template pages (their own layouts).
- Any content change.

**Pages affected:** every guide, toolkit piece and how-to (39 pages).

**New build dependency:** none.

# Content backlog

The next pieces, top first. Each names its audience, the template it ships with and the docs it relies on. The drafting routine takes the top item that has no open pull request.

| # | Working title | Kind | Audience | Template | Docs it relies on |
| --- | --- | --- | --- | --- | --- |
| 1 | Moving from Todoist without losing anything | guide | Todoist users | (none) | /docs/import/, /docs/import-export/ |
| 2 | A shared shopping list that actually works | guide | households | Meal planning | /docs/sharing/, /docs/install-app/ |
| 3 | Planning a wedding as a couple | template + guide | households | Wedding (new) | /docs/sharing/, /docs/sections-and-boards/ |
| 4 | Getting your inbox to zero with email to task | guide | professionals | GTD setup | /docs/email/, /docs/capture/ |
| 6 | Sprint-free planning for a team of five | guide | small teams | Product launch | /docs/sections-and-boards/, /docs/views/ |
| 7 | Using your own AI model with your tasks | guide | privacy-minded | (none) | /docs/ai-and-agents/, /docs/assistant/ |
| 8 | Renovation project | template | households | Renovation (new) | /docs/tasks-and-projects/, /docs/reminders/ |
| 9 | What local-first means for you | blog (Ownership) | everyone | (none) | /docs/offline-and-sync/ |
| 10 | Freelancer client tracker | template | freelancers | Client projects (new) | /docs/labels-and-filters/, /docs/time-blocking/ |
| 11 | Packing list you reuse every trip | template (Everyone, list) | everyone | Packing list (new) | /docs/tasks-and-projects/, /docs/import-export/ |
| 12 | Job search tracker | template (Professionals, board) | professionals | Job search (new) | /docs/sections-and-boards/, /docs/reminders/ |
| 13 | Exam revision, four weeks out | template (Students, calendar) | students | Exam revision (new) | /docs/time-blocking/, /docs/recurrence/ |
| 14 | Onboarding a new hire | template (Teams, board) | small teams | Onboarding (new) | /docs/sharing/, /docs/sections-and-boards/ |
| 15 | Content calendar for a small team | template (Teams, calendar) | small teams | Content calendar (new) | /docs/time-blocking/, /docs/recurrence/ |

When a piece ships, remove its row in the same pull request. New templates need their screenshots captured against the pinned app image (`npm run templates:check -- --shots`), so they ship from an environment that can run it.

## Blog

Blog posts are planned in the private repository `OpenTodoApp/social` (`blog/PLAN.md`), together with the social channels; the next post there is the next one to draft. Posts still ship from here as draft pull requests (`src/content/blog/<slug>/index.md`, `draft: true`), and release posts follow every release as before.

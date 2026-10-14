# Voice guide

How the OpenTodo website sounds. Agents drafting content follow it; the maintainer reviews against it.

## Who we write for
People who use a commercial task app today and wonder whether there is something calmer, cheaper or more their own. Second, the person in a household or small team who would run the server. Write for the first, and give the second a link.

## Tone
- **Calm.** No hype, no exclamation marks, no "revolutionary", "game-changing", "supercharge", "seamless", "effortless", "blazing".
- **Concrete.** Say what happens: "the next occurrence appears when you complete it", not "smart recurring tasks".
- **Short.** One idea per paragraph. Prefer the simple word.
- **Outcome first.** Lead with what a person gets (clarity, calm, ownership, no subscription). Implementation details (op log, clocks, SQLite) belong on `/self-host` and `/developers` only.
- **British spelling**, as in the app (organise, colour, licence for the noun).

## Claims
- Every statement about what OpenTodo can do links to the documentation page of the pinned release that supports it. The content check fails otherwise; mark a paragraph `<!-- no-claim -->` only when it truly claims nothing.
- Only released features. If it is on the roadmap, it does not exist yet.
- No invented numbers, testimonials, user counts or quotes.
- Prices change: describe costs in words ("a monthly plan per person"), never in currency.

## Other apps
- Name them in text only, to identify them. No logos, no look-alike visuals.
- Be fair: say what they do well, and list where they are ahead. A comparison without its gaps is not published.
- Date every comparison (`checkedOn`) and check it again within six months.
- Never mock other apps or the people who use them. Many readers like their current app.

## Words we use
| Use | Avoid |
| --- | --- |
| task, project, section, label | todo item, list item, tag (except when quoting another app) |
| your server | the cloud, our servers |
| install the app (from the browser) | download from the app store |
| share a project | collaborate, synergy |
| import, export | migrate (except in upgrade notes) |

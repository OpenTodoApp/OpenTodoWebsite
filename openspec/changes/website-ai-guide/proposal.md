# Proposal: website-ai-guide

## Why

The redesign puts AI on the home page as a line about control ("AI on your terms"), and the user asked for that line to lead to a page that explains it. The facts are spread over seven docs pages: the assistant, its setup, its privacy, review and undo, MCP, the Claude Code plugin, and the limits every AI option shares. Visitors who care about control want them in one place, in plain words.

## What Changes

- **A new toolkit guide, `/toolkit/ai-on-your-terms/` (Learn → Start here).** In plain words, it says:
  - AI is off until the owner and the person say yes;
  - you choose the model, local ones included;
  - the assistant proposes a set of changes you review, apply and undo;
  - your own AI tools work over MCP and the Claude Code plugin with an agent token and the same limits;
  - with end-to-end encryption, the in-app assistant isn't available, and MCP reports encrypted items.
  - Every paragraph links its docs page of the pinned release (claim lint).
- **An illustration of the change-set card**, drawn in HTML after the app's review card with its own wording ("Proposed changes", "2 of 3 selected", "Nothing changes until you apply", "Apply 2 changes", "Discard"). It is labelled as an illustration, because the bundle has no screenshot of a proposal.
- **The Features page's aside links the guide.** The home page links it from its "AI on your terms" line (`website-home-v2`).

**Out of scope:** the docs themselves, which come from the bundle and can't link back to this site.

**Pages affected:**
- the new guide, which also appears in the Learn library, Start here and the Owning your data topic;
- `/features/`.

**New build dependency:** none.

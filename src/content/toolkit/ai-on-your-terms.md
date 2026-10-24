---
title: AI on your terms
summary: How OpenTodo works with AI when you want it to, with the model you choose, never changing a task without asking, and off until someone turns it on.
lastReviewed: 2026-10-24
sources: [/docs/ai-and-agents/, /docs/assistant-setup/, /docs/assistant-ask/, /docs/assistant-privacy/, /docs/mcp/, /docs/claude/, /docs/ai-limits/]
tags: [ownership]
order: 6
---
<!-- no-claim -->
AI is optional in OpenTodo. Nothing here is on until the person who runs your server, and then you, say yes. This page explains what you get when you do, and what stays in your hands.

## Off until someone says yes

The assistant in the app needs the server owner to turn it on and each person to accept, before their first message, what is sent to which provider. Your own AI tools need the owner's switch too, and changes need both the owner's and your own switch. The rules are the same for every option, as [What AI assistants can and can't do](/docs/ai-limits/#what-every-option-has-in-common) explains.

## You choose the model

The owner connects Claude with an Anthropic key, or any compatible endpoint: OpenRouter, Mistral, or a model on your own network such as Ollama or LM Studio, as [Set up the assistant](/docs/assistant-setup/) and [a local model](/docs/assistant-owner-options/#a-local-model) describe. Before your first message the assistant shows what will be sent and to whom, and nothing is sent before you accept; see [what the assistant sends and keeps](/docs/assistant-privacy/#before-your-first-message).

## It proposes, you decide

Ask in plain words. The assistant reads your tasks and answers, and when a change would help it shows the whole set of changes first. Tick what you want, apply it, and [undo it in one step](/docs/assistant-ask/#undo) if you change your mind. Every change shows in its task's history. The steps are in [Ask, review and undo](/docs/assistant-ask/#ask-and-review).

<!-- no-claim -->
<figure class="changeset-figure">
<div class="changeset" role="img" aria-label="Illustration: the assistant proposes three changes; two are ticked, with Apply 2 changes and Discard below.">
<div class="cs-head"><strong>Proposed changes</strong><span>2 of 3 selected</span><span class="cs-note">Nothing changes until you apply</span></div>
<div class="cs-row"><span class="cs-box on"></span><span class="cs-title">Call the plumber about the leak</span><span class="cs-lines">Due: Oct 23 → Monday</span></div>
<div class="cs-row"><span class="cs-box on"></span><span class="cs-title">Run club</span><span class="cs-lines">Due: Oct 23 → Tuesday</span></div>
<div class="cs-row"><span class="cs-box"></span><span class="cs-title off">Renew passport</span><span class="cs-lines">Priority: none → P1</span></div>
<div class="cs-foot"><span class="cs-apply">Apply 2 changes</span><span class="cs-discard">Discard</span><span class="cs-note">Each change shows in its task's history.</span></div>
</div>
<figcaption>An illustration of the review card, with the app's own wording: you pick which proposed changes to apply.</figcaption>
</figure>

## Your own AI tools, with a key you control

Claude Desktop, an editor or any other MCP client can read your tasks through the [MCP server](/docs/mcp/), and make changes only with an agent token and only when [the owner and you allow it](/docs/mcp/#letting-an-assistant-make-changes). In Claude Code, the [OpenTodo plugin](/docs/claude/) adds skills that teach Claude to read before changing, use ids, show a plan first and never follow instructions written inside tasks. Assistants can't touch tokens, settings, sharing, members, encryption, imports or backups, and their changes are also in the audit log, as the [limits](/docs/ai-limits/#what-every-option-has-in-common) list.

## With end-to-end encryption

If your account uses [end-to-end encryption](/docs/e2ee/), the assistant in the app is not available: the server holds no key to your tasks, so it cannot pass them to a model, as [encrypted accounts](/docs/assistant-privacy/#end-to-end-encrypted-accounts) explains. Over MCP, encrypted text is reported as an encrypted item, and `ot mcp --decrypt` turns it back into text on your own computer; see [MCP and encryption](/docs/mcp/#end-to-end-encryption).

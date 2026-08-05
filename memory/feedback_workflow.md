---
name: Workflow — Visual Approval, Memory Updates, Pre-Compact
description: The three load-bearing process rules. Everything else was aspirational and got dropped. Shared verbatim with the Hub repo's copy — this rule set applies identically to both projects.
type: feedback
---
## 1. Visual approval required before pushing

**Why:** Nick wants to see UI changes in a browser before they go live. Tests passing is necessary but not sufficient — Nick approves first.

**How to apply:**
- Open `index.html` locally (or run a local server), get Nick's OK, then commit.
- Never push autonomously for UI changes. Tooling/test-only changes (e.g. a new spec, a config tweak with no UI impact) can be pushed without preview.

## 2. Update docs + memory at end of session, before confirming work is done

**Why:** Nick had to ask after a fix was pushed once. Docs/memory are part of the definition of done.

**How to apply:** After a meaningful change, before confirming the task is complete:
- If it changed a non-obvious invariant → update `memory/project_website.md`
- If it changed an operating rule → update the relevant `feedback_*.md`
- Otherwise, no doc update needed — git log captures the rest

Don't update memory just to record that something happened. Update only if a future Claude session would draw a wrong conclusion without the update. Corollary: don't trust a cached number (test counts, file lists) over the code itself — re-derive it when in doubt.

## 3. Run `pre-compact` before `/compact`

**Why:** Compaction discards conversation context. Anything not in CLAUDE.md / memory at compact time is lost permanently.

**How to apply:** When context is getting long and `/compact` is imminent, invoke the `pre-compact` agent (`subagent_type: "pre-compact"`). It cross-references docs against current code state and patches stale content. Then run `/compact`.

**Important:** Pre-compact must **rewrite** sections in place, not append new ones. A previous version of `handover.md` ballooned to 670 lines because pre-compact was adding a new "Session 2026-XX-XX" block every time instead of rewriting the snapshot.

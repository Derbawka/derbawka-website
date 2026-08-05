---
name: Handover — Derbawka Website
description: Living snapshot of the Website project. OVERWRITE this at end of every session — do not append. Append-only journals are what made a previous version balloon to 670 lines.
type: project
---
# Handover — Derbawka Website

> **Operating rule:** This file is a *snapshot*, not a journal. At end of session, **rewrite the sections in place** with current values. Do not add a new "Session 2026-XX-XX" block — those belong in `git log`.

## Current State

- **Deployed:** `e9e6748` on 2026-04-27 (GitHub Pages auto-deploys from `main`) · 0 open issues
- **Tests:** 22 pass (24 declared, 2 viewport-conditional skips by design — `npm test` from repo root)
- **2026-08-05:** Repo migrated off a work laptop onto portable storage ahead of Nick leaving his employer. This `memory/` folder (and the equivalent one in the Hub repo) was materialized from what had previously been machine-local Claude Code memory at `~/.claude/projects/.../memory/`, specifically so full project context survives the move to a new computer. If you're reading this after that move: the old machine's global `~/.claude/agents/` also held 4 shared subagents (`uiux-designer`, `test-runner`, `security-auditor`, `pre-compact`) — copies now live in this repo's `.claude/agents/` and the Hub repo's, so no manual copy step should be needed. See `reference_agents.md`.

## Active Work

(none)

## Known Issues

(none currently tracked for the Website)

## Future Ideas (no owner, no deadline)

- Parallax engine — all 4 SVG layers are `data-speed="0"` while `.hero-text` is `0.4`. Either restore historical speeds or delete `js/parallax.js` + `.parallax-layer` CSS rules. Needs design call.

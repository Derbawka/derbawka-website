---
name: Reference — Custom Claude Agents
description: All 8 subagents available across the Derbawka projects — 4 shared with the Hub repo, 4 Hub-local. Triggers, invocation, and where each definition file actually lives.
type: reference
---
Definitions used to live only in a machine-global `~/.claude/agents/` folder, which does **not** travel when a repo is copied to a new computer. As of 2026-08-05, the 4 agents below were copied into `.claude/agents/` in **both** this repo and the Hub repo, so each project is self-contained. If you ever see fewer than 4 agents available in a session here, check whether `.claude/agents/` actually has them — if not, copy from the Hub repo's `.claude/agents/`.

## Shared agents (`.claude/agents/` in this repo, also in the Hub repo's)

### `uiux-designer`
Research-first UI/UX review. Reads industry sources (css-tricks, NNGroup, Linear/Vercel/Stripe blogs), reads source files, returns specific actionable recommendations. **Never writes code.**

**Invoke when:** designing a new page, a new top-level section, or a significant layout overhaul. Not for color tweaks, button labels, or copy changes.

### `test-runner`
Runs Playwright tests for either project, parses output, returns a structured pass/fail report. **Never edits files or proposes fixes.**

**Hub prerequisite:** dev server must be running (`cd server && npm run dev` from the Hub repo).

### `security-auditor`
Adversarial OWASP audit. Researches recent CVEs, reads source code statically, scans git history for leaked secrets. Returns prioritized findings, and updates `memory/security_status.md` with the current posture. **Never modifies files or exploits anything.**

**Invoke when:** the change touches form handling, CSP headers, or third-party scripts (Formspree, Cloudflare RUM). Not for CSS or copy changes.

### `pre-compact`
Pre-compaction knowledge sync. Reads `memory/*.md` and project docs, cross-references against actual code state, patches stale content in place, returns a sync report.

**Operating rule:** rewrite sections in place; never append. A previous version was appending session blocks to `handover.md`, which caused 670-line bloat that was later removed.

**Invoke when:** context is getting long and `/compact` is imminent.

```
Agent → subagent_type: "pre-compact"
Prompt: "Sync all docs and memory before I compact. Here's what changed this session: [brief summary]"
```

## Hub-local agents (live only in the Hub repo's `.claude/agents/`)

Not needed for Website work, but documented here so nobody wonders where they went:

- **`db-query-reviewer`** — reviews new/modified SQL in the Hub's service layer
- **`migration-validator`** — validates new Turso/SQLite migration files
- **`api-contract-linter`** — checks Hub route/frontend contract drift
- **`changelog-writer`** — generates the Hub's session changelog

See the Hub repo's `memory/reference_agents.md` for full descriptions.

---

## External agents (not for these projects)

`ServiceNow-Architect-Planner-*` and `mason` may be present in `~/.claude/agents/` on some machines for separate professional ServiceNow work. Do not invoke for Hub or Website tasks.

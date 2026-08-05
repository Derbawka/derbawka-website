---
name: feedback_visual_preview
description: When asking Nick to visually approve a change, always have the page ready to view before prompting — never ask Nick to do it himself.
type: feedback
---

Always get the local environment ready and navigate to the relevant page BEFORE prompting Nick to visually review a change.

**Why:** Nick expects the environment to be ready when he's asked to look at something — prompting for visual approval without a live view in front of him is friction he doesn't want.

**How to apply:** After implementing any UI change:
1. Open `index.html` locally, or use Playwright MCP (`mcp__playwright__browser_navigate` + `mcp__playwright__browser_take_screenshot`) to open the relevant page
2. Show Nick the screenshot in the same message that asks for approval
Do not say "please open the browser and check X" — have it ready first.

**Screenshot paths:** use an absolute path for the `filename` param if invoking Playwright MCP from an agent that might not be anchored in this repo's root (e.g. a cross-project agent invoked from the Hub session). Historically, when both projects shared one Claude Code session anchored here, relative Hub screenshot filenames landed in this repo by mistake and had to be cleaned up (discovered 2026-03-28). Each project now runs its own session, so this is a lower-probability failure mode, but the absolute-path habit remains the safer default.

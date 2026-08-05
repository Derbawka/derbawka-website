# Memory Index — Derbawka Website

Portable, git-tracked copy of project memory. Lives in-repo (not in `~/.claude/projects/.../memory/`) specifically so it survives a repo copy to a new machine. See `handover.md` for how/when this was set up.

**Companion project:** Derbawka Hub lives as a sibling folder (default: `../derbawka-hub`, same parent directory). It has its own `memory/` folder — read that repo's `handover.md` for its state. A few files below (`user_nick.md`, `reference_links.md`, `feedback_workflow.md`) are intentionally duplicated in both repos so each is self-contained.

| File | Type | Purpose |
|---|---|---|
| [handover.md](handover.md) | project | **Start here.** Current deployed commit + open issues + future ideas. Snapshot, not journal — overwrite in place. |
| [project_website.md](project_website.md) | project | Website invariants — aesthetic decisions, FOUT/font preload requirement, Formspree limit, Cloudflare Transform Rules. |
| [security_status.md](security_status.md) | project | Website security posture + accepted risks. Hub's section lives in the Hub repo's copy. |
| [user_nick.md](user_nick.md) | user | Owner profile — Nick approves changes before push, prefers vanilla/dependency-free, references aesthetic via mood. |
| [feedback_workflow.md](feedback_workflow.md) | feedback | Three load-bearing process rules: visual approval before push, update memory at end of session, run pre-compact before `/compact`. |
| [feedback_visual_preview.md](feedback_visual_preview.md) | feedback | Spin up local env + screenshot before asking for approval — have it ready, don't ask Nick to do it himself. |
| [reference_links.md](reference_links.md) | reference | Live sites, repos, third-party services (Cloudflare, Formspree, Resend, Turso, UptimeRobot). |
| [reference_agents.md](reference_agents.md) | reference | All 8 available subagents (4 shared with Hub + 4 Hub-local), with invocation triggers + where each one's definition file lives. |

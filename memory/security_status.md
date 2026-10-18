---
name: Security Status — Derbawka Website
description: Current security posture for derbawka.com. Snapshot, not changelog — past round-by-round commit recaps belong in `git log`. Hub's posture lives in the Hub repo's copy of this file.
type: project
---
# Security Status — Website (last audit: 2026-10-18 — dev dependencies reviewed; site code unchanged since Round 10)

**Companion file:** the Hub repo has its own `memory/security_status.md` covering hub.derbawka.com in full (auth, RBAC, dependency CVE watch list). Each repo's copy is authoritative for its own project.

No findings as of Round 10. Round 9 hardenings remain:
- `<meta>` CSP fallback in `index.html` (defense-in-depth)
- `_replyto` empty hidden field removed from contact form
- `.gitignore` patterns: `*recovery_code*`, `*2FA*.txt`
- `Permissions-Policy` header includes `camera=(), microphone=(), geolocation=(), payment=(), usb=()` (Cloudflare Transform Rule)

## Accepted risks

- `style-src unsafe-inline` — 69 inline `animation-delay` SVG star attributes
- Formspree endpoint `xpqyroyw` publicly visible — accepted for personal site at 50/month
- `nick@derbawka.com` in 12 prior commits in public history — noreply email active for future commits (git `user.email` is `267784401+Derbawka@users.noreply.github.com`, set globally + locally)

## Dev dependencies (2026-10-18)

`npm audit` flagged dev-only packages; nothing here ships to GitHub Pages (the site is static HTML/CSS/JS with no build step):
- `brace-expansion` — bumped via `npm audit fix` (lockfile only).
- `serve@14` → `compression <1.8.2` — GHSA-vc2v-76pw-4v95 (DoS via memory leak on premature response close). `serve` is only the local static server Playwright starts for tests. npm's only fix is a breaking downgrade to `serve@10`. **Accepted.** Revisit if `serve` releases a fixed major.

## Local-machine hygiene (not a code finding — process note)

When this repo was copied off Nick's former work laptop (2026-08-05), a plaintext Hub account password was found to have leaked into `~/.claude/settings.local.json` and Claude Code's own session logs on that machine (both outside this repo, never committed to git — `.claude/settings.local.json` is gitignored here). Noted for continuity; not a Website code issue. Full detail in the Hub repo's copy of this file.

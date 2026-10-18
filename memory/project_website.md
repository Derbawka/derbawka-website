---
name: project_website
description: Derbawka.com — invariants and quirks not visible in code. Aesthetic decisions, third-party gotchas, and operating constraints.
type: project
---
# Derbawka.com — Invariants

Static personal website on GitHub Pages. Plain HTML/CSS/JS — no framework, no build step. Vanilla and dependency-free is the design choice; do not add a framework.

## Aesthetic

"Into the Neon" — inspired by Randall King's album cover. Four stacked SVG parallax layers (sky → mountains → cacti → ground) with amber/rose neon glow.

Color references and exact hex values live in `css/style.css`. SVG layer markup is inline in `index.html`. Read those for current values rather than caching here.

## Responsive Cacti

Two `<g>` groups in the SVG hero, swapped via CSS media query at **767px**:
- `.cactus-desktop` — left x=260, right x=1180 (wide cinematic spread)
- `.cactus-mobile` — left x=580, right x=840 (flanking center)
Both share the `neonCactus` SVG filter.

## Fonts (load-bearing)

- `fonts/BebasNeue-Regular.woff2` (13 KB) — headings + buttons
- `fonts/Inter-Latin.woff2` (47 KB, variable weight) — body, labels, subtitle

**Self-hosted.** No Google Fonts CDN dependency. `@font-face` declarations at the top of `css/style.css`.

**Preload tags in `<head>`** (`<link rel="preload" as="font" crossorigin>`) eliminate FOUT — do not remove.

**Bebas Neue fallback stack:** `'Bebas Neue', 'Impact', 'Arial Narrow', sans-serif` (3 occurrences). Was previously `cursive` — caused jarring FOUT with a script font. Don't revert.

## Contact Form (Formspree)

- Form ID: `xpqyroyw` — endpoint `https://formspree.io/f/xpqyroyw`
- **Free tier limit: 50 submissions/month.** Don't exceed.
- Honeypot field `_gotcha` — Formspree silently drops bot submissions
- `pageshow` + `e.persisted` reset in `parallax.js` — clears the form on back-navigation. Must stay.

## CSP (Cloudflare Transform Rule, manual)

Set in the Cloudflare dashboard, NOT in code:
```
default-src 'none';
script-src 'self' https://static.cloudflareinsights.com;
style-src 'self' 'unsafe-inline';
font-src 'self';
img-src 'self' data:;
connect-src 'self' https://static.cloudflareinsights.com;
form-action https://formspree.io;
frame-ancestors 'none';
base-uri 'self';
```
- `style-src 'unsafe-inline'` is accepted risk — 69 inline `animation-delay` SVG star attributes
- `cloudflareinsights.com` allowlisted for Web Analytics RUM
- Mirror `<meta>` CSP in `index.html` is defense-in-depth if Cloudflare is bypassed (frame-ancestors omitted from meta — header-only directive)
- **This Transform Rule is dashboard-only config, not in this repo.** If Cloudflare is ever re-pointed at a different account or the zone is recreated, this CSP must be re-entered manually — nothing in git will restore it.

## Hosting + DNS

- GitHub Pages auto-deploys from `main`
- `CNAME` file at repo root must contain exactly `derbawka.com`
- DNS: GoDaddy → Cloudflare nameservers (proxied)
- `hub` CNAME → `derbawka-hub.onrender.com` (also proxied)

## Testing

22 Playwright tests pass — 24 declared (12 test functions × 2 browser projects: `chromium-desktop` 1440px, `chromium-mobile` 390px), 2 skip at runtime via `test.skip()` viewport guards in `hero.spec.ts` (each cactus-visibility test only runs on its matching viewport). `npm test` from repo root. `playwright.config.ts` auto-starts `npx serve . -p 3333`.

## New-machine setup checklist

Last done 2026-10-18 on Nick's personal Windows 11 PC (Node v24.19, npm 11.17). Previously a Mac (Node v24.14). All tooling is cross-platform Node.

1. `node -v` / `npm -v` — v24.x works. `gh auth status` → Derbawka account.
2. Git identity: `git config user.email 267784401+Derbawka@users.noreply.github.com`.
3. `npm install` at repo root.
4. `npx playwright install chromium`.
5. Recreate `.git/hooks/pre-push` (git hooks are not cloned) — see CLAUDE.md → "New Machine?". `chmod +x` it.
6. Verify: `npm test` → 22 passed, 2 skipped (viewport-conditional). Playwright auto-starts `npx serve . -p 3333 -s`.
7. Confirm `.claude/agents/` has 4 files (the shared agents — see `reference_agents.md`).
8. The Cloudflare CSP Transform Rule (above) and DNS setup are dashboard-only — verify they still exist under whatever Cloudflare account owns the `derbawka.com` zone.
9. Windows note: `core.autocrlf=true` makes working-tree files CRLF while the repo stays LF; "LF will be replaced by CRLF" warnings are harmless.
10. Dev-dependency audit: `serve@14` depends on `compression <1.8.2` (GHSA-vc2v-76pw-4v95). `serve` only runs locally for Playwright and is never deployed — accepted; see `security_status.md`.

## Source-of-Truth Pointers

- SVG layer markup, IDs, filter definitions → `index.html`
- Color hex values, layout breakpoints, animation specs → `css/style.css`
- Parallax scroll engine + bfcache reset → `js/parallax.js`
- Test specs → `tests/hero.spec.ts`, `tests/contact.spec.ts`
- Live site URL, repo, third-party services → `reference_links.md`

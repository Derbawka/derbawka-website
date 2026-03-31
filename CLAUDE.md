# Claude Code Instructions — Derbawka.com

## Pre-Implementation Review Gates (MANDATORY)

Before writing any code for a new feature or significant change:

1. **`security-auditor`** — required before any change touching form handling, CSP headers, or third-party scripts
2. **`uiux-designer`** — required before any visual design change or new section

---

## Docs & Memory (MANDATORY — part of definition of done)

After every change — update docs and memory before confirming work is done:

| What changed | What to update |
|---|---|
| CSS/JS change | `README.md` if a pattern changed |
| New section or feature | `README.md` → Features; `memory/project_website.md` |
| Security change | `README.md` → Security Hardening |
| Test count change | `README.md` + `memory/project_website.md` |
| End of session | `memory/handover.md` — update current state, recent changes, known issues, next priorities |

---

## Testing Discipline (MANDATORY)

- **22 Playwright tests** — `npm test` from repo root
- Tests cover: page load, hero render, parallax, contact form, responsive layout, cactus swap
- Run before every commit
- Pre-push hook enforces this

---

## Deployment Workflow

```bash
# Preview locally
open index.html

# Deploy
git add index.html css/style.css js/parallax.js
git commit -m "description"
git push
# GitHub Pages auto-deploys in ~1 minute
```

Never push without Nick's visual approval of changes.

---

## Project Structure

```
├── index.html        — All markup + inline SVG hero layers
├── css/style.css     — Styles, parallax sizing, responsive cacti, animations
├── js/parallax.js    — RAF-based scroll engine + bfcache form reset
├── fonts/            — Self-hosted woff2 (Bebas Neue, Inter)
└── tests/            — Playwright e2e tests
```

---

## Key Frontend Patterns

### SVG Layer Stack (back → front)
1. `#layer-sky` — gradient, stars, amber glow, moon
2. `#layer-mountains` — silhouetted ridge, rose/amber rim light
3. `#layer-cacti` — saguaro pair + desert ground
4. `#layer-ground` — foreground floor, rocks, amber light pools

### Responsive Cacti
Two `<g>` groups: `.cactus-desktop` (≥768px) and `.cactus-mobile` (≤767px). CSS media query at 767px swaps them. Both use `neonCactus` SVG filter.

### Fonts
Self-hosted in `fonts/` — `BebasNeue-Regular.woff2` and `Inter-Latin.woff2`. No CDN dependency.

### Contact Form
Formspree `xpqyroyw` — 50 submissions/month limit. Honeypot field `_gotcha` prevents spam.
Form resets on back-navigation via `pageshow` + `e.persisted` check in `parallax.js`.

---

## Known Quirks

- Formspree free tier: 50 submissions/month — do not exceed
- `pageshow` bfcache reset: must stay in parallax.js (not removable)
- Cloudflare security headers set via Transform Rule — not in code, not in repo
- CSP set via Cloudflare Transform Rule "Security Headers - CSP" (added 2026-03-20); allows `static.cloudflareinsights.com` for Cloudflare Web Analytics RUM
- `style-src 'unsafe-inline'` accepted in CSP — 69 inline `animation-delay` SVG star attributes make strict removal impractical; inline styles cannot execute scripts
- GitHub Pages CNAME file at repo root must contain exactly `derbawka.com`
- GitHub noreply email enabled (2026-03-20) — git `user.email` is `267784401+Derbawka@users.noreply.github.com` (set globally + locally on both repos); 12 prior commits already expose nick@derbawka.com in public history
- Font preloads in `index.html` (added 2026-03-28 — commit 6630c5a): `<link rel="preload" as="font" crossorigin>` for both woff2 files must remain; they eliminate FOUT. Do not remove.
- Bebas Neue fallback is `'Impact', 'Arial Narrow', sans-serif` (changed from `cursive` in commit 6630c5a, 3 occurrences in `style.css`). The `cursive` fallback caused jarring FOUT with a script font; Impact/Arial Narrow are condensed and visually close.

# Claude Code Instructions — Derbawka.com

## Operating Rules

**Visual approval before push.** GitHub Pages auto-deploys; there's no rollback button. Open `index.html` locally, get Nick's OK, then commit. Details in `memory/feedback_workflow.md`.

**Run pre-push tests.** `npm test` from repo root — 22 Playwright runs (12 functions × 2 browser projects, minus 2 viewport-skipped). Pre-push hook enforces this.

**Pre-implementation agent gates** (same shape as Hub):
- `security-auditor` — invoke when touching form handling, CSP headers, third-party scripts (Formspree, Cloudflare RUM)
- `uiux-designer` — invoke when designing a new section or significant visual change
- Neither triggers on copy tweaks, color adjustments, or bug fixes within existing layout

---

## Deploy

```bash
# Preview locally
open index.html

# Run tests
npm test

# Push (GitHub Pages auto-deploys in ~1 minute)
git add <files>
git commit -m "description"
git push
```

---

## Project Layout

```
├── index.html        — markup + inline SVG hero layers
├── css/style.css     — all styles
├── js/parallax.js    — RAF-based scroll engine + bfcache form reset
├── fonts/            — self-hosted woff2 (Bebas Neue, Inter)
├── tests/            — Playwright e2e specs
└── CNAME             — must contain exactly `derbawka.com`
```

---

## Known Quirks

- **Formspree free tier — 50 submissions/month.** Honeypot field `_gotcha` blocks bots.
- **`pageshow` bfcache reset in `parallax.js`** must stay — resets the contact form on back-navigation.
- **Cloudflare security headers + CSP set via Transform Rules** (dashboard, not in code/repo). Allows `static.cloudflareinsights.com` for Cloudflare Web Analytics RUM.
- **`style-src 'unsafe-inline'` accepted** in CSP — 69 inline `animation-delay` SVG star attributes make strict removal impractical; inline styles can't execute scripts.
- **Font preloads in `index.html`** (`<link rel="preload" as="font" crossorigin>` for both woff2 files) eliminate FOUT — do not remove.
- **Bebas Neue fallback is `'Impact', 'Arial Narrow', sans-serif`** (3 occurrences in `style.css`). Was previously `cursive` — caused a jarring FOUT with a script font. Don't revert.
- **GitHub noreply email enabled** — git `user.email` is `267784401+Derbawka@users.noreply.github.com` (set globally + locally). 12 prior commits already expose `nick@derbawka.com` in public history.

---

## Source-of-Truth Pointers

- Project details (color palette, SVG layer breakdown, responsive cacti) → `memory/project_website.md`
- Recent commits → `git log`
- Test specs → `tests/hero.spec.ts`, `tests/contact.spec.ts`

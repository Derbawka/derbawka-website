# Derbawka.com — Personal Website

Static personal website for **derbawka.com** — cinematic Arizona desert night hero inspired by Randall King's *Into the Neon* album aesthetic, with parallax scrolling and a contact form.

**Live site:** https://derbawka.com
**GitHub repo:** https://github.com/Derbawka/derbawka-website

---

## Project Structure

```
├── index.html        — All markup + inline SVG art layers
├── css/style.css     — Styles, parallax sizing, animations, responsive cacti, form
├── js/parallax.js    — RAF-based scroll parallax engine + bfcache form reset
└── README.md         — This file
```

---

## Hero Scene — "Into the Neon" Aesthetic

The hero is built from four stacked SVG layers, each parallaxing at a different speed.

### Layer Stack (back → front)

| Layer | ID | z-index | Contents |
|---|---|---|---|
| Sky | `#layer-sky` | 1 | Gradient, stars (twinkle animations), amber horizon glow, gold moon |
| Mountains | `#layer-mountains` | 2 | Silhouetted ridge with rose/amber rim-light strokes |
| Cacti | `#layer-cacti` | 3 | Saguaro pair + desert ground plane + rocks |
| Ground | `#layer-ground` | 4 | Foreground desert floor + rocks + amber neon light pools |

### Color Palette

| Element | Color |
|---|---|
| Sky top | `#040405` (near-black) |
| Sky mid | `#0d0418` (deep dark purple) |
| Sky horizon | `#2d0e05` (deep warm amber-black) |
| Horizon glow | Radial: `#f59e0b` → `#c2410c` → `#7c2d12` → transparent |
| Moon | `#fbbf24` (warm amber-gold) |
| Moon glow | `rgba(251,191,36,0.2)` |
| Mountains | `#0a0010` (near-black) |
| Mountain rim light | `#9f1239` + `#c2410c` stroke, low opacity |
| Cactus body | `#2d6a35` with `neonCactus` glow filter |
| Ground | `#3d2510` → `#1a0f06` |
| Amber light pools | `#92400e` ellipses, opacity 0.25–0.32 |
| Page background | `#040405` |
| Star tints | White + ~10 warm pink `#fda4af` or ice blue `#bae6fd` |

### Fonts

- **Bebas Neue** — hero title, contact heading, submit button
- **Inter 300** — subtitle, form labels, footer

---

## Responsive Cacti (CSS Art Direction)

Two `<g>` groups inside `#layer-cacti` — toggled via a CSS media query at **767px**:

| Class | Visible on | Left cactus center | Right cactus center |
|---|---|---|---|
| `.cactus-desktop` | ≥768px | x=260 | x=1180 |
| `.cactus-mobile` | ≤767px | x=580 | x=840 |

```css
.cactus-mobile  { display: none; }

@media (max-width: 767px) {
  .cactus-desktop { display: none; }
  .cactus-mobile  { display: block; }
}
```

Both groups use the `neonCactus` SVG filter (soft green glow via `feGaussianBlur`).

### Verification
- **Desktop (≥768px):** Cacti spread to far left and right edges; warm amber horizon glow; gold moon
- **Mobile (≤767px):** Both cacti visible flanking center of screen
- **DevTools:** Toggle viewport at 767px to see cacti swap compositions

---

## Contact Form

Uses [Formspree](https://formspree.io) — no backend needed.

- **Form ID:** `xpqyroyw`
- **Endpoint:** `https://formspree.io/f/xpqyroyw`
- Free tier: **50 submissions/month**
- Fields auto-reset on back-navigation via `pageshow` + `e.persisted` in `parallax.js`

---

## Local Preview

No build step required. Open `index.html` directly in any modern browser:

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html   # Linux
```

---

## GitHub + GitHub Pages Deploy

```bash
git add index.html css/style.css js/parallax.js README.md
git commit -m "Your message"
git push
```

GitHub Pages auto-deploys from `main` branch root. Live within ~1 minute.

- Repo Settings → Pages → Source: **Deploy from branch** → `main` / `/ (root)`

---

## Security Hardening (2026-03-14 + 2026-03-20 + 2026-03-28)

### CSP (2026-03-20)
Content Security Policy added via Cloudflare Transform Rule "Security Headers - CSP":
`default-src 'none'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' https://static.cloudflareinsights.com; form-action https://formspree.io; frame-ancestors 'none'; base-uri 'self';`

`style-src 'unsafe-inline'` is accepted risk — 69 inline `animation-delay` style attributes on SVG stars make strict removal impractical.

### Cloudflare Web Analytics (2026-03-20)
RUM re-enabled. Beacon domain `static.cloudflareinsights.com` whitelisted in CSP `script-src` and `connect-src`.

### GitHub noreply email (2026-03-20)
GitHub noreply email enabled — future commits no longer expose nick@derbawka.com. (12 prior commits already public; cannot be scrubbed without destructive history rewrite.)

### Self-hosted fonts
Google Fonts CDN dependency removed. Font files in `fonts/`:
- `fonts/BebasNeue-Regular.woff2`
- `fonts/Inter-Latin.woff2` (variable weight 300–400)

`<link rel="preload" as="font" crossorigin>` tags added for both files in `index.html` `<head>` (commit 6630c5a, 2026-03-28) — eliminates FOUT.

`font-family` fallback for Bebas Neue updated to `'Impact', 'Arial Narrow', sans-serif` (was `cursive`) — ensures condensed visual match before font loads (3 occurrences in `css/style.css`).

### Formspree honeypot
`<input type="text" name="_gotcha" style="display:none">` in the contact form. Formspree drops any submission with this field filled.

### Cloudflare
Nameservers on GoDaddy point to Cloudflare (`amos.ns.cloudflare.com`, `bingo.ns.cloudflare.com`). Both `derbawka.com` and `hub.derbawka.com` are proxied.

Security headers delivered via Cloudflare Transform Rule:
| Header | Value |
|--------|-------|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |

Always Use HTTPS: enabled in Cloudflare.

### Round 9 (2026-03-28 — commit 91778c4)
- **`<meta>` CSP fallback** added to `index.html` `<head>` (defence-in-depth; `frame-ancestors` omitted — header-only directive)
- **`_replyto` hidden field removed** from contact form
- **`.gitignore`** updated with `*recovery_code*` and `*2FA*.txt` patterns
- **`Permissions-Policy`** expanded in Cloudflare Transform Rule to include `payment=()` and `usb=()`

---

## Custom Domain (derbawka.com via GoDaddy)

### CNAME file
Repo root contains a `CNAME` file with:
```
derbawka.com
```

### GoDaddy DNS — A Records

| Type | Name | Value              | TTL  |
|------|------|--------------------|------|
| A    | @    | 185.199.108.153    | 1 hr |
| A    | @    | 185.199.109.153    | 1 hr |
| A    | @    | 185.199.110.153    | 1 hr |
| A    | @    | 185.199.111.153    | 1 hr |
| CNAME | www | derbawka.github.io. | 1 hr |

### GitHub Pages
- Repo Settings → Pages → Custom domain → `derbawka.com` → Save
- **Enforce HTTPS** enabled

---

## Tech Stack

| Concern | Solution |
|---------|----------|
| Markup | Semantic HTML5 |
| Styles | Vanilla CSS (no framework) |
| Animation | CSS keyframes + `requestAnimationFrame` |
| Parallax | Custom lightweight JS (~85 lines) |
| Fonts | Self-hosted woff2 — Bebas Neue + Inter (no CDN) |
| Contact form | Formspree (no backend) |
| Hosting | GitHub Pages |
| Domain | GoDaddy → Cloudflare → GitHub Pages |
| CDN / Security | Cloudflare free tier (security headers, HTTPS enforcement) |

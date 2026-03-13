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
| Fonts | Google Fonts — Bebas Neue + Inter |
| Contact form | Formspree (no backend) |
| Hosting | GitHub Pages |
| Domain | GoDaddy → GitHub Pages DNS |

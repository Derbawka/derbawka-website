# Derbawka.com — Personal Website

Static personal website with a cinematic Arizona desert night hero, parallax scrolling, and a contact form routing to nick@derbawka.com.

---

## Project Structure

```
├── index.html        — All markup + inline SVG art layers
├── css/style.css     — Styles, parallax sizing, animations, form
├── js/parallax.js    — RAF-based scroll parallax engine
└── README.md         — This file
```

---

## Local Preview

No build step or server required. Open `index.html` directly in any modern browser:

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html   # Linux
```

**What to verify:**
- Scroll slowly — sky barely moves, mountains drift, cacti scroll at mid speed, ground moves fastest
- "DERBAWKA" text stays fixed relative to the viewport while scrolling
- Scroll hint arrow disappears after first scroll
- Resize the window — headline scales fluidly with `clamp()`

---

## Formspree

The contact form uses [Formspree](https://formspree.io) — no backend or server needed.

- **Form ID:** `xpqyroyw`
- **Endpoint:** `https://formspree.io/f/xpqyroyw`
- Already configured in `index.html`. Free tier: **50 submissions/month**.

---

## GitHub + GitHub Pages Deploy

```bash
git init
git add index.html css/style.css js/parallax.js README.md
git commit -m "Initial commit: Derbawka personal website"
gh repo create derbawka/derbawka-website --public --source=. --remote=origin --push
```

Then in the GitHub repo:
- Settings → Pages → Source: **Deploy from branch** → Branch: `main` / `/ (root)` → Save

The site will be live at `https://derbawka.github.io/derbawka-website` within a minute or two.

---

## Custom Domain (derbawka.com via GoDaddy)

After GitHub Pages is live:

### 1. Add CNAME file to repo
Create a file named `CNAME` (no extension) in the repo root containing only:
```
derbawka.com
```

### 2. GoDaddy DNS — A Records
In GoDaddy DNS Management, delete any existing A records for `@`, then add four A records:

| Type | Name | Value              | TTL  |
|------|------|--------------------|------|
| A    | @    | 185.199.108.153    | 1 hr |
| A    | @    | 185.199.109.153    | 1 hr |
| A    | @    | 185.199.110.153    | 1 hr |
| A    | @    | 185.199.111.153    | 1 hr |

Also add a CNAME for `www`:

| Type  | Name | Value                        | TTL  |
|-------|------|------------------------------|------|
| CNAME | www  | derbawka.github.io.          | 1 hr |

### 3. GitHub Pages custom domain
- Repo Settings → Pages → Custom domain → enter `derbawka.com` → Save
- Check **Enforce HTTPS** once the certificate provisions (may take up to 24 hrs)

DNS propagation typically takes 1–48 hours.

---

## Tech Stack

| Concern | Solution |
|---------|----------|
| Markup | Semantic HTML5 |
| Styles | Vanilla CSS (no framework) |
| Animation | CSS keyframes + `requestAnimationFrame` |
| Parallax | Custom lightweight JS (~60 lines) |
| Fonts | Google Fonts — Bebas Neue + Inter |
| Contact form | Formspree (no backend) |
| Hosting | GitHub Pages |
| Domain | GoDaddy → GitHub Pages DNS |

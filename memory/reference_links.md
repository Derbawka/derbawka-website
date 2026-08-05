---
name: Reference — Key Links
description: Live sites, repos, and third-party service links for both derbawka.com and hub.derbawka.com. Shared verbatim with the Hub repo's copy.
type: reference
---

## Derbawka Website (derbawka.com)

- **Live site:** https://derbawka.com
- **GitHub repo:** https://github.com/Derbawka/derbawka-website (public)
- **Hosting:** GitHub Pages — auto-deploys from `main` branch
- **DNS:** GoDaddy → Cloudflare nameservers

## Derbawka Hub (hub.derbawka.com)

- **Live site:** https://hub.derbawka.com
- **GitHub repo:** https://github.com/Derbawka/derbawka-hub (private)
- **Hosting:** Render.com — https://derbawka-hub.onrender.com
- **DNS:** GoDaddy CNAME `hub` → `derbawka-hub.onrender.com` (proxied through Cloudflare)

## Third-Party Services

- **Cloudflare:** derbawka.com zone — manages DNS proxy, security headers, CSP Transform Rules for derbawka.com only
- **Formspree:** https://formspree.io — form ID `xpqyroyw`, 50 submissions/month free tier
- **Resend:** email delivery for hub — hub@derbawka.com sender, nick@derbawka.com admin
- **Turso:** cloud SQLite DB for hub — credentials in the Hub repo's `server/.env`
- **UptimeRobot:** monitors hub.derbawka.com every 5 min to prevent Render free tier sleep

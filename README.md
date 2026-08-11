# Caitlyn Sherman — Personal Site

A single-page, mobile-first personal site / digital business card. Plain HTML, CSS,
and JavaScript — **no build step, no dependencies, no framework.** It loads in well
under a second and works offline once cached.

Designed to sit behind a QR code on a business card: scan → land → connect.

## Design — "Aurora"

A committed **dark** theme with an animated gradient (aurora) backdrop, gradient name,
and frosted-glass cards. The look itself is meant to double as a front-end skills demo.

## Features

- **Hero** with a circular headshot (gradient ring), one-tap Email / LinkedIn / GitHub /
  Résumé, and a **"Save my contact"** button that generates a `.vcf` vCard so people can
  add you to their phone instantly. (If `headshot.jpg` is absent, the avatar auto-hides.)
- **Projects as interactive cards** — a subtle pointer-tracking 3D tilt + glare on
  desktop, and a tap-to-expand "Details" panel with extra info on every device.
- **About**, **Projects** (4 cards), and **Skills** sections.
- **Accessible**: semantic HTML, skip link, keyboard-navigable, visible focus rings,
  `aria-expanded` on the card toggles, and full respect for `prefers-reduced-motion`
  (the aurora animation and 3D tilt turn off). Content still shows if JS is disabled.
- **Fast**: system fonts (zero web-font downloads), inline SVG icons, one CSS file and
  one small JS file. No trackers, no libraries.
- **SEO + social**: title, description, Open Graph, and Twitter Card tags.

## Files

```
index.html                     Markup + meta tags
styles.css                     All styling (the "Aurora" theme)
script.js                      vCard download, card expand/tilt, scroll reveals
favicon.svg                    "CS" gradient monogram icon
Caitlyn-Sherman-Resume.docx    Linked by the "Download résumé" button
```

## Preview locally

Just open `index.html` in a browser. Or run a tiny local server (nicer for testing):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy (pick one — all free)

### Option A — Netlify (drag & drop, fastest)
1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page. It's live in seconds at a `*.netlify.app` URL.

### Option B — GitHub Pages
1. Create a repo (e.g. `caitlyn-site`) and push these files to it:
   ```bash
   git init
   git add .
   git commit -m "Personal site"
   git branch -M main
   git remote add origin https://github.com/cassieeeeeeeee/caitlyn-site.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → `main` / `root` → Save.**
3. Your site publishes at `https://cassieeeeeeeee.github.io/caitlyn-site/`.

### Option C — Vercel
1. Install once: `npm i -g vercel`
2. From this folder, run `vercel` and follow the prompts (accept the defaults —
   it auto-detects a static site).

## Point a custom domain at it

Buy a domain (Namecheap, Cloudflare, Porkbun, etc.), then:

- **Netlify:** Site → *Domain management* → *Add a domain* → enter your domain →
  follow the DNS records it shows (usually an `A` record to Netlify's IP and/or a
  `CNAME` for `www`). HTTPS is automatic.
- **GitHub Pages:** Repo → *Settings → Pages → Custom domain* → enter your domain →
  Save. At your registrar, add a `CNAME` record for `www` pointing to
  `cassieeeeeeeee.github.io`, and (for the apex/root domain) four `A` records to
  GitHub's Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
  `185.199.111.153`. Then tick **Enforce HTTPS**.
- **Vercel:** Project → *Settings → Domains* → add your domain → follow the DNS
  instructions.

DNS changes can take a few minutes to a few hours to propagate.

## Before you go live — quick checklist

- [ ] Add your photo as `headshot.jpg` in this folder (a square crop ~600×600 works
      best). The hero avatar appears automatically once the file exists.
- [ ] In `index.html`, replace the three `https://your-domain.com/` placeholders
      (the `og:url`, `og:image`, and `canonical` tags) with your real domain.
- [ ] (Optional) Add a **1200×630** `og-image.png` to this folder for a rich link
      preview when the URL is shared. Without it the link still works — just no image.
- [ ] (Optional) Export your résumé as **PDF**, drop it in this folder, and update the
      `#resume-link` href in `index.html` to point at it (PDF opens more reliably on
      phones than `.docx`).

## Generate the QR code

Once deployed, paste your final URL into any QR generator (e.g. qr-code-generator.com
or the QR feature built into many browsers) and put it on your card. Test it by
scanning with your own phone first.

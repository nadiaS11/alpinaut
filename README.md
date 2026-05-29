# Alpinaut

Marketing landing page for **Alpinaut** — a weekly newsletter for developers about building fast websites with **Astro + Alpine.js** instead of heavy React / Next.js setups.

The page is itself the pitch: **zero React / Vue / Svelte**, near-zero client JS, no webfonts, no bitmap images. The only client-side JavaScript is Alpine.

🌐 **Live:** [alpinaut.netlify.app](https://alpinaut.netlify.app/)

---

## Stack

- [Astro](https://astro.build) 5.x — static output
- [Alpine.js](https://alpinejs.dev) via [`@astrojs/alpinejs`](https://docs.astro.build/en/guides/integrations-guide/alpinejs/) — used only for the signup form's progressive-enhancement layer
- [Tailwind CSS](https://tailwindcss.com) v4 via the official Vite plugin
- [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — generates `sitemap-index.xml` at build
- TypeScript (strict)

---

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → ./dist
npm run preview  # serve the built static site locally
```

---

## Configure email signup (Buttondown)

The signup form is a **native HTML form** that POSTs directly to Buttondown — so it works with **JavaScript disabled** as a baseline. Alpine adds inline loading / success / error states when JS is available, and gracefully falls back to the native POST if anything blocks the fetch.

Set your Buttondown username in **one place**:

**Option A — env var (recommended for deploys)**

Create a `.env` file locally and set the same var in Netlify:

```
PUBLIC_BUTTONDOWN_USERNAME=your-buttondown-username
```

**Option B — edit the fallback string**

`src/components/SignupForm.astro`:

```ts
const PUBLIC_BUTTONDOWN_USERNAME =
  import.meta.env.PUBLIC_BUTTONDOWN_USERNAME ?? 'your-buttondown-username';
```

> Until this is set, the form will POST to a Buttondown URL with the placeholder username and 404.

---

## Deploy to Netlify

This repo is set up to deploy to **https://alpinaut.netlify.app/**.

1. Push the repo to GitHub.
2. In Netlify: **Add new site → Import from Git → pick the repo.**
3. Netlify auto-detects Astro. Confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Under **Site settings → Environment variables**, add:
   - `PUBLIC_BUTTONDOWN_USERNAME` = your Buttondown username
5. Trigger a deploy. That's it — no SSR adapter, no edge functions, nothing else needed.

If you ever move off Netlify, the same `dist/` works on **Vercel**, **Cloudflare Pages**, or any static host. Just update `site` in `astro.config.mjs` and the sitemap URL in `public/robots.txt`.

---

## SEO assets

| Asset | Path | Notes |
|---|---|---|
| Favicon | `public/alpinaut-icon.svg` | The squircle orbit mark — used as `icon` + `apple-touch-icon`. |
| OG image | `public/og.svg` | 1200×630 hand-authored SVG matching the brand theme (dark squircle, teal orbit, wordmark, tagline). Used for Twitter/X, LinkedIn, Discord, Slack previews. |
| Wordmark | `public/alpinaut-wordmark.svg` | Used in the nav (and anywhere else you want the lockup). |
| Sitemap | auto-generated at build → `dist/sitemap-index.xml` | Powered by `@astrojs/sitemap`. |
| robots.txt | `public/robots.txt` | Points crawlers at the sitemap. |

> **OG image note:** Most modern platforms (X, LinkedIn, Discord, Slack, iMessage) render SVG OG images correctly. **Facebook still does not** — if you need Facebook previews, export `og.svg` to `og.png` at 1200×630 (any vector tool will do it; e.g. `rsvg-convert -w 1200 og.svg > og.png`) and update the `og:image` reference in `src/layouts/Layout.astro`.

---

## File tree

```
alpinaut/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
├── public/
│   ├── alpinaut-icon.svg       # squircle mark — favicon + footer
│   ├── alpinaut-wordmark.svg   # "alpinaut." lockup — nav
│   ├── og.svg                  # 1200×630 social preview
│   ├── robots.txt
│   └── favicon.svg             # legacy/unused — safe to delete
└── src/
    ├── env.d.ts
    ├── styles/global.css
    ├── layouts/Layout.astro
    ├── pages/index.astro
    └── components/
        ├── Nav.astro           # available, not currently mounted in index.astro
        ├── Hero.astro
        ├── Why.astro
        ├── Weekly.astro
        ├── SocialProof.astro
        ├── FAQ.astro
        ├── SignupForm.astro
        ├── CTASignup.astro
        └── Footer.astro        # available, not currently mounted in index.astro
```

---

## Quality bar

- **No webfonts.** System font stack — zero render-blocking font CSS, zero FOUT/FOIT.
- **No bitmap images.** Starfield is pure CSS radial-gradients; mountain ridges are CSS `clip-path` polygons; favicon and OG image are SVG.
- **FAQ uses native `<details>`** instead of an Alpine accordion — leaner, fully keyboard-accessible, works without JS.
- **Total client JS:** ~46 KB raw / ~17 KB gzipped — and that's all Alpine. There is zero framework JS.
- **Accessibility:** semantic landmarks, skip-to-signup link, ARIA labels/live regions, focus-visible rings, color contrast tuned for the dark palette.
- **Honors `prefers-reduced-motion`** — the only animations (a couple of twinkling stars, the submit button hover) are CSS and respect the media query.

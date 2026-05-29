# Alpinaut

Marketing landing page for **Alpinaut**, a weekly newsletter about building fast websites with **Astro + Alpine.js** instead of heavy React/Next.js setups.

The page is itself the pitch: built with Astro + Alpine, **zero React / Vue / Svelte**, near-zero client JS, no webfonts, no images beyond an SVG favicon.

## Stack

- [Astro](https://astro.build) 5.x — static output
- [Alpine.js](https://alpinejs.dev) via [`@astrojs/alpinejs`](https://docs.astro.build/en/guides/integrations-guide/alpinejs/) — used only for the mobile nav toggle and the optional progressive-enhancement on the signup form
- [Tailwind CSS](https://tailwindcss.com) v4 via the official Vite plugin
- TypeScript (strict)

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → ./dist
npm run preview  # serve the built static site locally
```

## Wire up email signup (Buttondown)

The signup form ships as a **native HTML form** that POSTs to Buttondown — so it works with **JavaScript disabled** as a baseline. Alpine adds inline loading / success / error states on top when JS is available, and gracefully falls back to the native POST if anything blocks the fetch.

Set your Buttondown username in **one place**:

`src/components/SignupForm.astro`:

```ts
const PUBLIC_BUTTONDOWN_USERNAME =
  import.meta.env.PUBLIC_BUTTONDOWN_USERNAME ?? 'your-buttondown-username';
```

Either edit the fallback string directly, or create a `.env` file:

```
PUBLIC_BUTTONDOWN_USERNAME=your-buttondown-username
```

> The original brief mentions a "beehiiv config" in the deliverables section — the implementation uses **Buttondown** as the body of the brief specified. If you'd rather use beehiiv, swap the form `action` (and the hidden field for `embed`) in `SignupForm.astro` for beehiiv's embed endpoint; everything else stays the same.

## Deploy

Static output, so any static host works:

- **Netlify** — drag-and-drop the `dist/` folder, or connect the repo and use `npm run build` / publish dir `dist`.
- **Vercel** — `vercel --prod`. Framework preset: Astro.
- **Cloudflare Pages** — build command `npm run build`, output `dist`.

No SSR adapter, no edge functions, no environment beyond `PUBLIC_BUTTONDOWN_USERNAME`.

## File tree

```
alpinaut/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md
├── public/
│   └── favicon.svg
└── src/
    ├── env.d.ts
    ├── styles/
    │   └── global.css
    ├── layouts/
    │   └── Layout.astro
    ├── pages/
    │   └── index.astro
    └── components/
        ├── Nav.astro
        ├── Hero.astro
        ├── Why.astro
        ├── Weekly.astro
        ├── SocialProof.astro
        ├── FAQ.astro
        ├── SignupForm.astro
        ├── CTASignup.astro
        └── Footer.astro
```

## Notes on the quality bar

- **No webfonts.** System font stack — zero render-blocking font CSS, zero FOUT/FOIT.
- **No bitmap images.** Starfield is CSS radial-gradients; mountain ridges are CSS `clip-path` polygons; favicon is SVG.
- **FAQ uses native `<details>`** instead of an Alpine accordion — leaner, fully keyboard-navigable, works without JS.
- **Alpine is loaded once** by the Astro integration and reused by both the nav toggle and the signup form.
- Honors `prefers-reduced-motion` — the only animations (a couple of twinkling stars, the submit button hover) are CSS and respect the media query.

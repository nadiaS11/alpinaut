import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from '@tailwindcss/vite';

// Static site — no SSR adapter needed. Output is plain HTML/CSS + a tiny
// Alpine bundle, which is the whole point of this project.
export default defineConfig({
  site: "https://alpinaut.netlify.app/",
  output: "static",
  integrations: [alpinejs()],
  vite: {
    plugins: [tailwindcss()],
  },
  // No site URL set — fill this in before deploying if you want canonical/sitemap.
});

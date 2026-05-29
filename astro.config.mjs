import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static site — no SSR adapter needed. Output is plain HTML/CSS + a tiny
// Alpine bundle, which is the whole point of this project.
export default defineConfig({
  site: 'https://alpinaut.netlify.app/',
  output: 'static',
  integrations: [
    alpinejs(),
    sitemap(), // → /sitemap-index.xml + /sitemap-0.xml at build time
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

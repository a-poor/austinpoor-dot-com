import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";


import solidJs from "@astrojs/solid-js";


export default defineConfig({
  output: "hybrid",
  site: "https://austinpoor.com/",
  prefetch: true,
  integrations: [tailwind(), sitemap(), solidJs()],
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  },
});
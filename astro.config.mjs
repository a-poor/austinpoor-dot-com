import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";


export default defineConfig({
  output: "hybrid",
  site: "https://austinpoor.com/",
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap(),
  ],
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
  },
});

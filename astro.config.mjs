import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bereanbible.college',
  output: 'static',

  image: {
    // Use sharp for image processing (auto-compresses to WebP)
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },

  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    }
  }
});

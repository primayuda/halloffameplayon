import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Project site on GitHub Pages: https://primayuda.github.io/halloffameplayon/
export default defineConfig({
  site: 'https://primayuda.github.io',
  base: '/halloffameplayon',
  integrations: [react()],
  output: 'static',
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://attendsalon-r.com',
  output: 'static',
  integrations: [tailwind()],
});

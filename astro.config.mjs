// @ts-check
import { defineConfig } from 'astro/config';

const usePoll = process.env.ASTRO_DEV_POLL === '1';

export default defineConfig({
  site: 'https://attendsalon-r.com',
  output: 'static',
  server: {
    host: true,
    port: 4321,
    strictPort: false,
  },
  vite: {
    server: {
      ...(usePoll
        ? { watch: { usePolling: true, interval: 300 } }
        : {}),
    },
  },
});

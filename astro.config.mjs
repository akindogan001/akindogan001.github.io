// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://akindogan001.github.io';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      // Kök (/) sadece dil yönlendirmesi yapar; sitemap'e girmez.
      filter: (page) => page !== `${SITE}/` && !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr' } },
    }),
  ],
});

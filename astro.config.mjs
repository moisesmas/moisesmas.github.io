// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://moisesmas.com',
  integrations: [
    starlight({
      title: 'Docencia ciclos formativos',
      defaultLocale: 'root',
      // «es-ES» y no «es»: con «es», el servidor de desarrollo trata los segmentos /es/ como prefijo de idioma (404).
      locales: { root: { label: 'Español', lang: 'es-ES' } },
    }),
  ],
});

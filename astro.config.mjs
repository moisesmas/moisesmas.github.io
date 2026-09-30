// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import { temasMenu } from './src/config/modulos';

export default defineConfig({
  site: 'https://moisesmas.com',
  integrations: [
    starlight({
      title: 'Docencia ciclos formativos',
      defaultLocale: 'root',
      // «es-ES» y no «es»: con «es», el servidor de desarrollo trata los segmentos /es/ como prefijo de idioma (404).
      locales: { root: { label: 'Español', lang: 'es-ES' } },
      // /docencia/ no pertenece a ningún módulo.
      plugins: [starlightSidebarTopics(temasMenu(), { exclude: ['/docencia'] })],
    }),
  ],
});

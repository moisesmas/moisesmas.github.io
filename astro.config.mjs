// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from 'starlight-sidebar-topics';
import starlightLinksValidator from 'starlight-links-validator';
import archivosContenido from './src/lib/archivos-contenido';
import { temasMenu } from './src/config/modulos';
import { traduccionExiste } from './src/lib/enlaces';

const DOCS = fileURLToPath(new URL('./src/content/docs', import.meta.url));

export default defineConfig({
  site: 'https://moisesmas.com',
  integrations: [
    // Antes que Starlight: los archivos deben estar copiados cuando valida los enlaces.
    archivosContenido(),
    starlight({
      title: 'Docencia ciclos formativos',
      defaultLocale: 'root',
      // «es-ES» y no «es»: con «es», el servidor de desarrollo trata los segmentos /es/ como prefijo de idioma (404).
      locales: { root: { label: 'Español', lang: 'es-ES' } },
      routeMiddleware: './src/middleware/idiomas.ts',
      components: {
        PageTitle: './src/components/PageTitle.astro',
        MarkdownContent: './src/components/MarkdownContent.astro',
      },
      plugins: [
        starlightLinksValidator({ exclude: ({ link }) => traduccionExiste(DOCS, link) }),
        // /docencia/ no pertenece a ningún módulo.
        starlightSidebarTopics(temasMenu(), { exclude: ['/docencia'] }),
      ],
    }),
  ],
});

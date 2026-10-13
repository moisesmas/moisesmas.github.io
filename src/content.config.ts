import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsSchema } from '@astrojs/starlight/schema';
import { generarId } from './lib/ids';
import { CARPETA, idPagina } from './lib/diapositivas';

const DOCS = './src/content/docs';

export const collections = {
  // El mismo patrón que docsLoader() de Starlight, sin las carpetas de diapositivas.
  docs: defineCollection({
    loader: glob({
      base: DOCS,
      pattern: ['**/[^_]*.{markdown,mdown,mkdn,mkd,mdwn,md,mdx}', `!**/${CARPETA}/**`],
      generateId: generarId,
    }),
    schema: docsSchema(),
  }),
  // <unidad>/diapositivas/<página>.md → id de la página.
  diapositivas: defineCollection({
    loader: glob({ base: DOCS, pattern: `**/${CARPETA}/[^_]*.md`, generateId: ({ entry }) => idPagina(entry) }),
    schema: z.object({ title: z.string().optional(), subtitle: z.string().optional() }),
  }),
};

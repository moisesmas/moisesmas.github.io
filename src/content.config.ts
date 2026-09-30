import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { generarId } from './lib/ids';

export const collections = {
  docs: defineCollection({ loader: docsLoader({ generateId: generarId }), schema: docsSchema() }),
};

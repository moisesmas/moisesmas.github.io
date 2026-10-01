import type { AstroIntegration } from 'astro';
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { MODULOS } from '../config/modulos';
import { buscarPendientes, informe } from './pendientes';

/** Al compilar, avisa de traducciones, laboratorios y nombres pendientes. No bloquea la publicación. */
export default function informePendientes(): AstroIntegration {
  let docs = '';
  return {
    name: 'informe-pendientes',
    hooks: {
      'astro:config:setup': ({ config }) => {
        docs = fileURLToPath(new URL('./src/content/docs', config.root));
      },
      'astro:build:done': ({ logger }) => {
        const p = buscarPendientes(docs, MODULOS);
        const total = p.traducciones.length + p.laboratorios.length + p.nombres.length;
        if (total === 0) logger.info('Nada pendiente');
        else for (const linea of informe(p).split('\n').filter((l) => l.startsWith('#') || l.startsWith('-'))) logger.warn(linea);
        if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, informe(p));
      },
    },
  };
}

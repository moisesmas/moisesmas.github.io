import { globSync } from 'node:fs';
import { moduloDeId, type CodigoIdioma } from '../../src/config/modulos';

const RAIZ = 'src/content/docs/';

/** Todos los laboratorios de la web, con el idioma original de su módulo. */
export const LABORATORIOS: { archivo: string; relativo: string; nombre: string; original: CodigoIdioma }[] = globSync(
  `${RAIZ}**/laboratorios/*/index.html`,
)
  .sort()
  .map((archivo) => {
    const relativo = archivo.slice(RAIZ.length);
    return {
      archivo,
      relativo,
      nombre: relativo.split('/').at(-2) ?? '',
      original: moduloDeId(relativo)?.idioma ?? 'es',
    };
  });

import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * starlight-links-validator no reconoce los ids …/es (trampa 3). Para no perder
 * la validación, un enlace a una traducción se excluye solo si el archivo existe.
 */
export function traduccionExiste(docs: string, enlace: string): boolean {
  const ruta = enlace.split(/[?#]/)[0];
  const m = ruta.match(/^\/(.+)\/es\/?$/);
  if (!m) return false;
  return existsSync(path.join(docs, `${m[1]}.es.md`)) || existsSync(path.join(docs, m[1], 'index.es.md'));
}

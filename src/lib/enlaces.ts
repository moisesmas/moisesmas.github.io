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

/**
 * starlight-links-validator solo da por buenos los enlaces a archivos (comprueba isFile) y un laboratorio se enlaza
 * por su carpeta (…/laboratorios/<nombre>/). Un enlace a una carpeta se excluye solo si en ella hay un index.html
 * junto a las páginas del contenido; si falta, el validador lo marca como roto.
 */
export function carpetaConIndiceExiste(docs: string, enlace: string): boolean {
  const ruta = enlace.split(/[?#]/)[0];
  if (!ruta.startsWith('/') || !ruta.endsWith('/')) return false;
  let carpeta: string;
  try {
    carpeta = path.resolve(docs, `.${decodeURIComponent(ruta)}`);
  } catch {
    return false;
  }
  return carpeta.startsWith(docs + path.sep) && existsSync(path.join(carpeta, 'index.html'));
}

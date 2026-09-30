import { slug } from 'github-slugger';

/**
 * Id (y dirección) de cada página. Igual que el de Starlight, salvo que
 * `nombre.es.md` se publica en `…/nombre/es/` en vez de `…/nombrees/`.
 */
export function generarId({ entry, data }: { entry: string; data: Record<string, unknown> }): string {
  if (data.slug) return String(data.slug);
  let ruta = entry.replace(/\.(md|mdx)$/i, '');
  let traduccion = false;
  if (ruta.endsWith('.es')) {
    traduccion = true;
    ruta = ruta.slice(0, -3);
  }
  const segmentos = ruta.split('/').map((s) => slug(s));
  if (segmentos.at(-1) === 'index') segmentos.pop();
  if (traduccion) segmentos.push('es');
  return segmentos.join('/');
}

import { statSync } from 'node:fs';
import path from 'node:path';
import { atributo, escapar, fallo, html, textoDe, type Manejador } from './comun';

const TIPOS: Record<string, string> = {
  pdf: 'PDF', doc: 'Word', docx: 'Word', odt: 'Documento', ppt: 'PowerPoint', pptx: 'PowerPoint',
  odp: 'Presentación', xls: 'Excel', xlsx: 'Excel', ods: 'Hoja de cálculo', zip: 'ZIP', '7z': '7-Zip',
  txt: 'Texto', csv: 'CSV',
};

export function tipoArchivo(nombre: string): string {
  const ext = path.extname(nombre).slice(1).toLowerCase();
  return TIPOS[ext] ?? ext.toUpperCase();
}

export function formatearTamano(bytes: number): string {
  const numero = (n: number, decimales: number) =>
    new Intl.NumberFormat('es-ES', { maximumFractionDigits: decimales }).format(n);
  if (bytes < 1024 * 1024) return `${numero(Math.max(1, Math.round(bytes / 1024)), 0)} KB`;
  return `${numero(bytes / (1024 * 1024), 1)} MB`;
}

/** ::descarga[Título]{src="archivo.pdf"} — el archivo va en la misma carpeta que la página. */
export const descarga: Manejador = (nodo, archivo) => {
  const src = atributo(nodo, 'src');
  if (!src) fallo('descarga', archivo, 'Falta el atributo src, por ejemplo ::descarga[Práctica 3]{src="p3.pdf"}');
  if (/[\\/]/.test(src)) fallo('descarga', archivo, `src debe ser un archivo de la misma carpeta: «${src}»`);
  let bytes = 0;
  try {
    bytes = statSync(path.join(archivo.dir, src)).size;
  } catch {
    fallo('descarga', archivo, `No existe «${src}» en la carpeta de la página`);
  }
  const titulo = textoDe(nodo.children) || src;
  const href = archivo.hrefDir + encodeURIComponent(src);
  return html(
    `<a class="bloque-descarga not-content" href="${escapar(href)}">` +
      `<span class="bloque-descarga__icono" aria-hidden="true">⤓</span>` +
      `<span class="bloque-descarga__texto"><strong>${escapar(titulo)}</strong>` +
      `<span class="bloque-descarga__meta">${escapar(tipoArchivo(src))} · ${formatearTamano(bytes)}</span></span></a>`,
  );
};

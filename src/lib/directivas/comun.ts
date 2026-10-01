import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { MdastContent } from 'satteri';
import { moduloDeId, type Modulo } from '../../config/modulos';
import { generarId } from '../ids';
import { esTraduccion } from '../idiomas';

export interface NodoDirectiva {
  name: string;
  attributes?: Record<string, string | null | undefined> | null;
  children: unknown[];
}

/** La página Markdown que se está procesando. */
export interface ArchivoMd {
  ruta: string;
  /** Carpeta src/content/docs absoluta. */
  docs: string;
  /** Ruta relativa a docs, con barras «/». */
  relativo: string;
  id: string;
  /** Carpeta absoluta de la página (donde están sus descargas y laboratorios). */
  dir: string;
  /** URL pública de esa carpeta, con barra final. */
  hrefDir: string;
  traduccion: boolean;
  modulo: Modulo | undefined;
}

export type Manejador = (nodo: NodoDirectiva, archivo: ArchivoMd) => MdastContent | undefined;

const MARCA = `${path.sep}src${path.sep}content${path.sep}docs${path.sep}`;

export function archivoMd(fileURL: URL | undefined): ArchivoMd | undefined {
  if (!fileURL) return undefined;
  const ruta = fileURLToPath(fileURL);
  const i = ruta.indexOf(MARCA);
  if (i === -1) return undefined;
  const docs = ruta.slice(0, i + MARCA.length - 1);
  const relativo = path.relative(docs, ruta).split(path.sep).join('/');
  const id = generarId({ entry: relativo, data: {} });
  const dirRelativo = path.posix.dirname(relativo);
  return {
    ruta,
    docs,
    relativo,
    id,
    dir: path.dirname(ruta),
    hrefDir: dirRelativo === '.' ? '/' : `/${dirRelativo}/`,
    traduccion: esTraduccion(id),
    modulo: moduloDeId(id),
  };
}

export function escapar(texto: string): string {
  return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Texto plano de la etiqueta [..] de una directiva. */
export function textoDe(nodos: unknown[]): string {
  return nodos
    .map((n) => {
      const nodo = n as { value?: string; children?: unknown[] };
      return nodo.value ?? (nodo.children ? textoDe(nodo.children) : '');
    })
    .join('');
}

export function atributo(nodo: NodoDirectiva, nombre: string): string | undefined {
  const valor = nodo.attributes?.[nombre];
  return valor == null || valor === '' ? undefined : valor;
}

export function html(valor: string): MdastContent {
  return { type: 'html', value: valor } as MdastContent;
}

export function fallo(directiva: string, archivo: ArchivoMd, mensaje: string): never {
  throw new Error(`[::${directiva}] ${mensaje} (en src/content/docs/${archivo.relativo})`);
}

import { readdirSync } from 'node:fs';
import type { CodigoIdioma } from '../config/modulos';
import { generarId } from './ids';
import { esTraduccion } from './idiomas';

/** Carpeta de cada unidad donde viven las diapositivas de sus páginas. */
export const CARPETA = 'diapositivas';

/** Páginas de una unidad que no son de teoría (no llevan presentación). */
export const NO_TEORIA = ['index', 'actividades', 'planificacion'];

/** ¿Es `<unidad>/diapositivas/<pagina>.md`? (ruta relativa a src/content/docs, con «/»). */
export function esDeDiapositivas(relativo: string): boolean {
  return relativo.split('/').at(-2) === CARPETA;
}

/** Id de la página de apuntes a la que corresponde un archivo de diapositivas. */
export function idPagina(relativo: string): string {
  if (!esDeDiapositivas(relativo)) throw new Error(`No es un archivo de diapositivas: ${relativo}`);
  const partes = relativo.split('/');
  partes.splice(-2, 1);
  return generarId({ entry: partes.join('/'), data: {} });
}

export function hrefPresentacion(idPagina: string): string {
  return `/${idPagina}/presentacion/`;
}

/** Id de la portada de la unidad de una página (en el mismo idioma). */
export function idUnidad(idPagina: string): string {
  const traduccion = esTraduccion(idPagina);
  const base = traduccion ? idPagina.slice(0, -3) : idPagina;
  const unidad = base.split('/').slice(0, -1).join('/');
  return traduccion ? `${unidad}/es` : unidad;
}

/** HTML de todas las diapositivas → una cadena por diapositiva (el separador es <hr>). */
export function trocear(html: string): string[] {
  return html
    .split(/<hr\s*\/?>/i)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Quita los enlaces de ancla que Starlight añade a los títulos: en una presentación sobran y el # es de reveal.js. */
export function quitarAnclas(html: string): string {
  return html.replace(/<a class="sl-anchor-link"[^>]*>[\s\S]*?<\/a>/g, '');
}

const VALLA = /^\s*(`{3,}|~{3,})/;

/** Recorre las líneas indicando si cada una está dentro de un bloque de código. */
function* lineasConCodigo(md: string): Generator<{ linea: string; codigo: boolean; valla: boolean }> {
  let valla: string | null = null;
  for (const linea of md.split(/\r?\n/)) {
    const m = linea.match(VALLA);
    if (m && !valla) {
      valla = m[1];
      yield { linea, codigo: false, valla: true };
    } else if (m && valla && m[1][0] === valla[0] && m[1].length >= valla.length) {
      valla = null;
      yield { linea, codigo: false, valla: true };
    } else {
      yield { linea, codigo: valla !== null, valla: false };
    }
  }
}

/** Markdown de cada diapositiva y avisos de separadores mal puestos. */
export function analizar(md: string): { diapositivas: string[]; avisos: string[] } {
  const frontmatter = md.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0] ?? '';
  const desplazamiento = frontmatter ? frontmatter.split(/\r?\n/).length - (frontmatter.endsWith('\n') ? 1 : 0) : 0;
  const cuerpo = md.slice(frontmatter.length);
  const trozos: string[][] = [[]];
  const avisos: string[] = [];
  let anterior = '';
  let n = 0;
  for (const { linea, codigo, valla } of lineasConCodigo(cuerpo)) {
    n++;
    if (!codigo && !valla && /^---\s*$/.test(linea)) {
      if (anterior.trim() === '') {
        trozos.push([]);
        anterior = linea;
        continue;
      }
      avisos.push(`Línea ${n + desplazamiento}: deja una línea en blanco antes de «---» (si no, Markdown lo convierte en un título)`);
    }
    trozos.at(-1)!.push(linea);
    anterior = linea;
  }
  return { diapositivas: trozos.map((t) => t.join('\n').trim()).filter(Boolean), avisos };
}

/** Número de elementos de la lista de primer nivel más larga. */
export function listaMasLarga(md: string): number {
  let maximo = 0;
  let actual = 0;
  for (const { linea, codigo } of lineasConCodigo(md)) {
    if (codigo) continue;
    if (/^(?:[-*+]|\d+[.)])\s/.test(linea)) actual++;
    else if (linea.trim() !== '' && !/^\s/.test(linea)) actual = 0;
    maximo = Math.max(maximo, actual);
  }
  return maximo;
}

/** Número de líneas del bloque de código más largo. */
export function codigoMasLargo(md: string): number {
  let maximo = 0;
  let actual = 0;
  for (const { codigo, valla } of lineasConCodigo(md)) {
    if (codigo) actual++;
    if (valla) {
      maximo = Math.max(maximo, actual);
      actual = 0;
    }
  }
  return Math.max(maximo, actual);
}

/** Páginas de teoría de una carpeta de unidad (nombre sin extensión) y si tienen traducción. */
export function paginasDeTeoria(dirUnidad: string): { nombre: string; traduccion: boolean }[] {
  const archivos = new Set(readdirSync(dirUnidad));
  return [...archivos]
    .filter((a) => a.endsWith('.md') && !a.endsWith('.es.md'))
    .map((a) => a.slice(0, -3))
    .filter((nombre) => !NO_TEORIA.includes(nombre))
    .sort()
    .map((nombre) => ({ nombre, traduccion: archivos.has(`${nombre}.es.md`) }));
}

export interface TextosPresentacion {
  presentar: string;
  volver: string;
  pdf: string;
  tema: string;
  laboratorio: string;
  abrirLab: string;
  pizarra: string;
  puntero: string;
  lapiz: string;
  borrar: string;
  color: string;
  grosor: string;
}

/** Textos de interfaz de la presentación, en el idioma del contenido. */
export const TEXTOS_PRESENTACION: Record<CodigoIdioma, TextosPresentacion> = {
  es: {
    presentar: 'Presentar',
    volver: 'Volver a los apuntes',
    pdf: 'Guardar como PDF',
    tema: 'Tema claro u oscuro',
    laboratorio: 'Laboratorio',
    abrirLab: 'Abrir laboratorio',
    pizarra: 'Pizarra',
    puntero: 'Puntero (P)',
    lapiz: 'Lápiz (L)',
    borrar: 'Borrar (C)',
    color: 'Color',
    grosor: 'Grosor',
  },
  en: {
    presentar: 'Present',
    volver: 'Back to the notes',
    pdf: 'Save as PDF',
    tema: 'Light or dark theme',
    laboratorio: 'Lab',
    abrirLab: 'Open the lab',
    pizarra: 'Whiteboard',
    puntero: 'Pointer (P)',
    lapiz: 'Pen (L)',
    borrar: 'Clear (C)',
    color: 'Colour',
    grosor: 'Thickness',
  },
  'ca-valencia': {
    presentar: 'Presentar',
    volver: 'Tornar als apunts',
    pdf: 'Guardar com a PDF',
    tema: 'Tema clar o fosc',
    laboratorio: 'Laboratori',
    abrirLab: 'Obrir el laboratori',
    pizarra: 'Pissarra',
    puntero: 'Punter (P)',
    lapiz: 'Llapis (L)',
    borrar: 'Esborrar (C)',
    color: 'Color',
    grosor: 'Gruix',
  },
};

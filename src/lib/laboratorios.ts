import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export interface FichaLaboratorio {
  titulo: string;
  descripcion: string;
  etiquetas: string[];
}

export interface LaboratorioModulo {
  unidad: string;
  nombre: string;
  archivo: string;
}

const ENTIDADES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'" };

function decodificar(texto: string): string {
  return texto.replace(/&(amp|lt|gt|quot|#39|apos);/g, (_, e: string) => ENTIDADES[e]);
}

function atributoHtml(etiqueta: string, nombre: string): string | undefined {
  const m = etiqueta.match(new RegExp(`\\s${nombre}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return m ? decodificar(m[1] ?? m[2]) : undefined;
}

function metas(html: string): Map<string, string> {
  const resultado = new Map<string, string>();
  for (const [etiqueta] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const nombre = atributoHtml(etiqueta, 'name');
    const contenido = atributoHtml(etiqueta, 'content');
    if (nombre && contenido !== undefined) resultado.set(nombre.toLowerCase(), contenido);
  }
  return resultado;
}

/** Título, descripción y etiquetas de un laboratorio, en su idioma original o en castellano. */
export function leerFicha(html: string, castellano: boolean): FichaLaboratorio {
  const m = metas(html);
  const tituloOriginal = decodificar(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '');
  const elegir = (claveEs: string, original: string | undefined) => (castellano && m.get(claveEs)) || original || '';
  return {
    titulo: elegir('lab:titulo:es', tituloOriginal),
    descripcion: elegir('lab:descripcion:es', m.get('description')),
    etiquetas: elegir('lab:etiquetas:es', m.get('keywords'))
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean),
  };
}

function subcarpetas(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

/** Todos los laboratorios de un módulo: <unidad>/laboratorios/<nombre>/index.html. */
export function listarLaboratorios(dirModulo: string): LaboratorioModulo[] {
  return subcarpetas(dirModulo).flatMap((unidad) => {
    const dirLabs = path.join(dirModulo, unidad, 'laboratorios');
    if (!existsSync(dirLabs)) return [];
    return subcarpetas(dirLabs)
      .map((nombre) => ({ unidad, nombre, archivo: path.join(dirLabs, nombre, 'index.html') }))
      .filter((l) => existsSync(l.archivo));
  });
}

/** `title` del frontmatter de una página Markdown. */
export function tituloPagina(archivoMd: string): string | undefined {
  if (!existsSync(archivoMd)) return undefined;
  const frontmatter = readFileSync(archivoMd, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  const titulo = frontmatter?.match(/^title:\s*(.+)$/m)?.[1].trim();
  return titulo?.replace(/^(['"])(.*)\1$/, '$2');
}

/** Claves data-t sin traducción en lab-textos (faltan) y traducciones que nadie usa (sobran). */
export function comprobarTextos(html: string): { faltan: string[]; sobran: string[] } {
  const usadas = new Set<string>();
  for (const [, clave] of html.matchAll(/\sdata-t(?:-html)?="([^"]+)"/g)) usadas.add(clave);
  for (const [, pares] of html.matchAll(/\sdata-t-attr="([^"]+)"/g)) {
    for (const par of pares.split(';')) {
      const clave = par.split(':')[1]?.trim();
      if (clave) usadas.add(clave);
    }
  }
  const json = html.match(/<script type="application\/json" id="lab-textos">([\s\S]*?)<\/script>/)?.[1];
  const definidas = new Set(Object.keys(json ? (JSON.parse(json).es ?? {}) : {}));
  return {
    faltan: [...usadas].filter((c) => !definidas.has(c)).sort(),
    sobran: [...definidas].filter((c) => !usadas.has(c)).sort(),
  };
}

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Modulo } from '../config/modulos';

export interface Pendientes {
  traducciones: string[];
  laboratorios: string[];
  nombres: string[];
}

function* recorrer(dir: string, base = dir): Generator<string> {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) yield* recorrer(ruta, base);
    else yield path.relative(base, ruta).split(path.sep).join('/');
  }
}

/**
 * Solo minúsculas sin acentos, números y guiones (sin espacios ni guiones bajos):
 * así la dirección publicada coincide con la carpeta. github-slugger no sirve aquí,
 * porque conserva acentos y guiones bajos.
 */
function nombreValido(segmento: string): boolean {
  const base = segmento.replace(/(\.es)?\.[^.]+$/, '');
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(base);
}

export function buscarPendientes(docs: string, modulos: Modulo[]): Pendientes {
  const pendientes: Pendientes = { traducciones: [], laboratorios: [], nombres: [] };
  const conTraduccion = modulos.filter((m) => m.idioma !== 'es').map((m) => `${m.ruta}/`);
  for (const relativo of recorrer(docs)) {
    if (relativo.split('/').some((s) => !nombreValido(s))) pendientes.nombres.push(relativo);
    if (!conTraduccion.some((r) => relativo.startsWith(r))) continue;
    if (relativo.endsWith('.md') && !relativo.endsWith('.es.md')) {
      if (!existsSync(path.join(docs, relativo.replace(/\.md$/, '.es.md')))) pendientes.traducciones.push(relativo);
    } else if (/\/laboratorios\/[^/]+\/index\.html$/.test(relativo)) {
      const html = readFileSync(path.join(docs, relativo), 'utf8');
      if (!html.includes('id="lab-textos"') || !html.includes('name="lab:titulo:es"')) pendientes.laboratorios.push(relativo);
    }
  }
  return pendientes;
}

export function informe(p: Pendientes): string {
  const secciones = [
    ['Páginas sin versión en castellano', p.traducciones],
    ['Laboratorios sin versión en castellano', p.laboratorios],
    ['Nombres de archivo no válidos', p.nombres],
  ] as const;
  const conDatos = secciones.filter(([, lista]) => lista.length > 0);
  if (conDatos.length === 0) return '## Pendientes de la web\n\n✅ Nada pendiente.\n';
  return (
    '## Pendientes de la web\n\n' +
    conDatos.map(([titulo, lista]) => `### ${titulo} (${lista.length})\n\n${lista.map((r) => `- \`${r}\``).join('\n')}\n`).join('\n')
  );
}

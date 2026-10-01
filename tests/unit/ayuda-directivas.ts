import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { markdownToHtml } from 'satteri';
import { directivas } from '../../src/lib/directivas';

/** Crea …/src/content/docs temporal con los archivos dados y devuelve su ruta. */
export function crearDocs(archivos: Record<string, string>): string {
  const docs = path.join(realpathSync(mkdtempSync(path.join(tmpdir(), 'web-'))), 'src', 'content', 'docs');
  for (const [ruta, contenido] of Object.entries(archivos)) {
    const destino = path.join(docs, ruta);
    mkdirSync(path.dirname(destino), { recursive: true });
    writeFileSync(destino, contenido);
  }
  return docs;
}

/** Convierte Markdown como si estuviera en docs/<relativo>, con nuestras directivas. */
export function convertir(docs: string, relativo: string, md: string): string {
  return markdownToHtml(md, {
    mdastPlugins: [directivas],
    features: { directive: true },
    fileURL: pathToFileURL(path.join(docs, relativo)),
  }).html;
}

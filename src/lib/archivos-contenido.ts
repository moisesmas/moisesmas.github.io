import type { AstroIntegration } from 'astro';
import { createReadStream } from 'node:fs';
import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PAGINA = /\.(md|mdx)$/i;

const TIPOS: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
  '.txt': 'text/plain; charset=utf-8',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
};

/** Archivo de contenido (no página) que corresponde a una URL, o null. */
export async function resolverArchivo(raiz: string, url: string): Promise<string | null> {
  const limpia = decodeURIComponent(url.split(/[?#]/)[0]);
  let destino = path.join(raiz, limpia);
  if (!destino.startsWith(raiz + path.sep)) return null;
  if (limpia.endsWith('/')) destino = path.join(destino, 'index.html');
  if (PAGINA.test(destino)) return null;
  try {
    return (await stat(destino)).isFile() ? destino : null;
  } catch {
    return null;
  }
}

async function* recorrer(dir: string): AsyncGenerator<string> {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const ruta = path.join(dir, e.name);
    if (e.isDirectory()) yield* recorrer(ruta);
    else if (!PAGINA.test(e.name)) yield ruta;
  }
}

/** Copia a la salida, en la misma ruta, todo lo que no es una página. Devuelve cuántos archivos. */
export async function copiarArchivos(raiz: string, salida: string): Promise<number> {
  let n = 0;
  for await (const origen of recorrer(raiz)) {
    const destino = path.join(salida, path.relative(raiz, origen));
    await mkdir(path.dirname(destino), { recursive: true });
    await cp(origen, destino);
    n++;
  }
  return n;
}

/**
 * Descargas y laboratorios viven junto a las páginas en src/content/docs.
 * Esta integración los sirve en desarrollo y los copia al compilar.
 * Debe ir antes que Starlight en `integrations` para que el validador de enlaces los encuentre.
 */
export default function archivosContenido(): AstroIntegration {
  let raiz = '';
  return {
    name: 'archivos-contenido',
    hooks: {
      'astro:config:setup': ({ config }) => {
        raiz = fileURLToPath(new URL('./src/content/docs', config.root));
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const archivo = await resolverArchivo(raiz, req.url ?? '/');
          if (!archivo) return next();
          res.setHeader('Content-Type', TIPOS[path.extname(archivo).toLowerCase()] ?? 'application/octet-stream');
          createReadStream(archivo).pipe(res);
        });
      },
      'astro:build:done': async ({ dir, logger }) => {
        const n = await copiarArchivos(raiz, fileURLToPath(dir));
        logger.info(`${n} archivos de contenido copiados (descargas y laboratorios)`);
      },
    },
  };
}

import { existsSync, readFileSync } from 'node:fs';

const DIST = new URL('../../dist/', import.meta.url);

export function leer(ruta: string): string {
  return readFileSync(new URL(ruta, DIST), 'utf8');
}

export function existe(ruta: string): boolean {
  return existsSync(new URL(ruta, DIST));
}

/** Enlaces del conmutador de idioma: [{ href, texto, actual }]. */
export function conmutador(html: string): { href: string; texto: string; actual: boolean }[] {
  const nav = html.match(/<nav class="conmutador-idioma[^"]*"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  if (!nav) return [];
  return [...nav.matchAll(/<a ([^>]*)>([^<]*)<\/a>/g)].map(([, attrs, texto]) => ({
    href: attrs.match(/href="([^"]*)"/)?.[1] ?? '',
    texto: texto.trim(),
    actual: /aria-current="page"/.test(attrs),
  }));
}

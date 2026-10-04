import type { StarlightRouteData } from '@astrojs/starlight/route-data';
import type { CodigoIdioma, Modulo } from '../config/modulos';

type Entrada = StarlightRouteData['sidebar'][number];
type Enlace = Extract<Entrada, { type: 'link' }>;

export interface EstadoIdioma {
  original: CodigoIdioma;
  actual: CodigoIdioma;
  hrefOriginal: string;
  hrefCastellano: string;
}

const HREF_TRADUCCION = /\/es\/$/;

export function esTraduccion(id: string): boolean {
  return id.endsWith('/es');
}

export function idOriginal(id: string): string {
  return esTraduccion(id) ? id.slice(0, -3) : id;
}

export function idTraduccion(id: string): string {
  return `${idOriginal(id)}/es`;
}

export function hrefDeId(id: string): string {
  return `/${id}/`;
}

function idDeHref(href: string): string {
  return href.replace(/^\/|\/$/g, '');
}

export function idiomaContenido(id: string, modulo: Modulo | undefined): CodigoIdioma {
  if (esTraduccion(id)) return 'es';
  return modulo?.idioma ?? 'es';
}

/** Datos del conmutador, o undefined si la página no tiene pareja en el otro idioma. */
export function estadoIdioma(
  id: string,
  modulo: Modulo | undefined,
  existe: (id: string) => boolean,
): EstadoIdioma | undefined {
  if (!modulo || modulo.idioma === 'es') return undefined;
  const original = idOriginal(id);
  const traduccion = idTraduccion(id);
  if (!existe(original) || !existe(traduccion)) return undefined;
  return {
    original: modulo.idioma,
    actual: esTraduccion(id) ? 'es' : modulo.idioma,
    hrefOriginal: hrefDeId(original),
    hrefCastellano: hrefDeId(traduccion),
  };
}

/**
 * Menú tal como lo ve el alumno: sin las versiones en castellano, con el
 * original de la página actual marcado y cada carpeta etiquetada con el
 * título de su index (Starlight usaría el nombre de la carpeta).
 */
export function limpiarMenu(entradas: Entrada[], idActual: string): Entrada[] {
  const hrefActual = hrefDeId(idOriginal(idActual));
  return entradas
    .filter((e) => !(e.type === 'link' && HREF_TRADUCCION.test(e.href)))
    .map((e): Entrada => {
      if (e.type === 'link') return { ...e, isCurrent: e.href === hrefActual };
      const hijos = limpiarMenu(e.entries, idActual);
      const indice = hijos.find((h) => h.type === 'link' && h.href.endsWith(`/${e.label}/`));
      if (!indice) return { ...e, entries: hijos };
      return {
        ...e,
        label: indice.label,
        entries: hijos.map((h) => (h === indice ? { ...h, label: 'Presentación' } : h)),
      };
    });
}

function aplanar(entradas: Entrada[]): Enlace[] {
  return entradas.flatMap((e) => (e.type === 'group' ? aplanar(e.entries) : [e]));
}

/**
 * Anterior/siguiente sobre el menú ya limpio. En una traducción, los vecinos
 * apuntan a su versión en castellano si existe (se mantiene el idioma al pasar página).
 * Todos los vecinos llevan el título de su página: la etiqueta «Presentación» del
 * menú es solo del menú y no debe aparecer aquí; si no hay título, se usa la del menú.
 */
export function paginacion(
  menu: Entrada[],
  idActual: string,
  titulo: (id: string) => string | undefined,
): { prev: Enlace | undefined; next: Enlace | undefined } {
  const enlaces = aplanar(menu);
  const i = enlaces.findIndex((e) => e.href === hrefDeId(idOriginal(idActual)));
  if (i === -1) return { prev: undefined, next: undefined };
  const vecino = (e: Enlace | undefined): Enlace | undefined => {
    if (!e) return undefined;
    const original = idDeHref(e.href);
    if (esTraduccion(idActual)) {
      const traduccion = idTraduccion(original);
      const t = titulo(traduccion);
      if (t !== undefined) return { ...e, href: hrefDeId(traduccion), label: t };
    }
    return { ...e, label: titulo(original) ?? e.label };
  };
  return { prev: vecino(enlaces[i - 1]), next: vecino(enlaces[i + 1]) };
}

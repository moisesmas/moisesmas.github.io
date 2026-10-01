import { describe, expect, it } from 'vitest';
import { MODULOS } from '../../src/config/modulos';
import { estadoIdioma, idiomaContenido, limpiarMenu, paginacion } from '../../src/lib/idiomas';

const SOM = MODULOS.find((m) => m.id === 'som')!;
const PI = MODULOS.find((m) => m.id === 'proyecto-intermodular')!;
const U = 'docencia/smr/som/ud01-introduccion';

const enlace = (href: string, label = href) => ({ type: 'link' as const, label, href, isCurrent: false, badge: undefined, attrs: {} });
const grupo = (label: string, entries: any[]) => ({ type: 'group' as const, label, entries, collapsed: false, badge: undefined });

const MENU: any[] = [
  enlace('/docencia/smr/som/', 'Single-User Operating Systems'),
  enlace('/docencia/smr/som/es/', 'Sistemas Operativos Monopuesto'),
  grupo('ud01-introduccion', [
    enlace(`/${U}/`, 'Unit 1'),
    enlace(`/${U}/es/`, 'Unidad 1'),
    enlace(`/${U}/01-teoria/`, 'Theory'),
    enlace(`/${U}/01-teoria/es/`, 'Teoría'),
    enlace(`/${U}/02-practicas/`, 'Practice'),
  ]),
];
const IDS = new Set(['docencia/smr/som', 'docencia/smr/som/es', U, `${U}/es`, `${U}/01-teoria`, `${U}/01-teoria/es`, `${U}/02-practicas`]);
const TITULOS = new Map([
  ['docencia/smr/som', 'Single-User Operating Systems'],
  ['docencia/smr/som/es', 'Sistemas Operativos Monopuesto'],
  [U, 'Unit 1'],
  [`${U}/es`, 'Unidad 1'],
  [`${U}/01-teoria`, 'Theory'],
  [`${U}/01-teoria/es`, 'Teoría'],
  [`${U}/02-practicas`, 'Practice'],
]);
const existe = (id: string) => IDS.has(id);
const titulo = (id: string) => TITULOS.get(id);
const hrefs = (entradas: any[]): string[] => entradas.flatMap((e) => (e.type === 'group' ? hrefs(e.entries) : [e.href]));

describe('limpiarMenu', () => {
  it('quita las versiones en castellano', () => {
    expect(hrefs(limpiarMenu(MENU, `${U}/01-teoria`))).toEqual([
      '/docencia/smr/som/', `/${U}/`, `/${U}/01-teoria/`, `/${U}/02-practicas/`,
    ]);
  });
  it('en una traducción marca como actual su original', () => {
    const menu = limpiarMenu(MENU, `${U}/01-teoria/es`);
    const actual = (menu[1] as any).entries.find((e: any) => e.isCurrent);
    expect(actual.href).toBe(`/${U}/01-teoria/`);
  });
  it('etiqueta el grupo con el título de su index y renombra ese enlace', () => {
    const g = limpiarMenu(MENU, `${U}/01-teoria`)[1] as any;
    expect(g.label).toBe('Unit 1');
    expect(g.entries[0].label).toBe('Presentación');
  });
});

describe('paginacion', () => {
  it('en el original, vecinos originales', () => {
    const p = paginacion(limpiarMenu(MENU, `${U}/01-teoria`), `${U}/01-teoria`, titulo);
    expect(p.prev?.href).toBe(`/${U}/`);
    expect(p.next?.href).toBe(`/${U}/02-practicas/`);
  });
  it('en la traducción, vecinos en castellano si existen y original si no', () => {
    const p = paginacion(limpiarMenu(MENU, `${U}/01-teoria/es`), `${U}/01-teoria/es`, titulo);
    expect(p.prev?.href).toBe(`/${U}/es/`);
    expect(p.prev?.label).toBe('Unidad 1');
    expect(p.next?.href).toBe(`/${U}/02-practicas/`);
    expect(p.next?.label).toBe('Practice');
  });
  it('página que no está en el menú: sin paginación', () => {
    expect(paginacion(limpiarMenu(MENU, 'docencia'), 'docencia', titulo)).toEqual({ prev: undefined, next: undefined });
  });
});

describe('estadoIdioma', () => {
  it('original con traducción', () => {
    expect(estadoIdioma(`${U}/01-teoria`, SOM, existe)).toEqual({
      original: 'en', actual: 'en', hrefOriginal: `/${U}/01-teoria/`, hrefCastellano: `/${U}/01-teoria/es/`,
    });
  });
  it('en la traducción, el idioma actual es castellano', () => {
    expect(estadoIdioma(`${U}/01-teoria/es`, SOM, existe)?.actual).toBe('es');
  });
  it('sin traducción no hay conmutador', () => {
    expect(estadoIdioma(`${U}/02-practicas`, SOM, existe)).toBeUndefined();
  });
  it('módulo en castellano: sin conmutador', () => {
    expect(estadoIdioma('docencia/smr/proyecto-intermodular', PI, () => true)).toBeUndefined();
  });
  it('fuera de módulo: sin conmutador', () => {
    expect(estadoIdioma('docencia', undefined, () => true)).toBeUndefined();
  });
});

describe('idiomaContenido', () => {
  it('original del módulo, castellano en traducciones y fuera de módulos', () => {
    expect(idiomaContenido(`${U}/01-teoria`, SOM)).toBe('en');
    expect(idiomaContenido(`${U}/01-teoria/es`, SOM)).toBe('es');
    expect(idiomaContenido('docencia', undefined)).toBe('es');
  });
});

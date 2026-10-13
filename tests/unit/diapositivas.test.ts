import { existsSync, globSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { UNIDADES_SIN_DIAPOSITIVAS } from '../../src/config/diapositivas';
import { MODULOS } from '../../src/config/modulos';
import { analizar, CARPETA, codigoMasLargo, listaMasLarga, paginasDeTeoria } from '../../src/lib/diapositivas';

const DOCS = 'src/content/docs';
const MAX_VINETAS = 8;
const MAX_CODIGO = 15;

const carpetas = MODULOS.flatMap((m) =>
  readdirSync(path.join(DOCS, m.ruta), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => `${m.ruta}/${e.name}`),
).sort();
const unidades = carpetas.filter((c) => /^ud\d\d-/.test(path.basename(c)));

// Copia congelada de la lista temporal tal como nació (2026-10-14): la lista solo puede encoger.
const LISTA_INICIAL = [
  'docencia/smr/som/ud01-introduccion',
  'docencia/smr/som/ud02-virtualizacion',
  'docencia/smr/som/ud03-funciones-sistema-operativo',
  'docencia/dam/sistemas-informaticos/ud01-hardware',
  'docencia/dam/sistemas-informaticos/ud02-instalacion-sistemas-operativos',
  'docencia/dam/sistemas-informaticos/ud03-automatizacion-scripting',
  'docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos',
  'docencia/smr/proyecto-intermodular/ud01-sector-productivo',
  'docencia/smr/proyecto-intermodular/ud02-diseno-proyecto',
];

function faltanEn(unidad: string): string[] {
  return paginasDeTeoria(path.join(DOCS, unidad)).flatMap(({ nombre, traduccion }) =>
    [`${nombre}.md`, ...(traduccion ? [`${nombre}.es.md`] : [])].filter((a) => !existsSync(path.join(DOCS, unidad, CARPETA, a))),
  );
}
const archivos = globSync(`${DOCS}/**/${CARPETA}/*.md`).sort();

describe('norma: toda página de teoría tiene su presentación', () => {
  for (const unidad of unidades.filter((u) => !UNIDADES_SIN_DIAPOSITIVAS.includes(u))) {
    it(unidad, () => {
      expect(faltanEn(unidad), `Faltan en ${unidad}/${CARPETA}/ (ver docs/guia-diapositivas.md)`).toEqual([]);
    });
  }
  it('la lista temporal solo nombra unidades que existen', () => {
    expect(UNIDADES_SIN_DIAPOSITIVAS.filter((u) => !unidades.includes(u))).toEqual([]);
  });
  it('la lista temporal solo encoge: no admite unidades nuevas (el material nuevo lleva sus diapositivas)', () => {
    expect(UNIDADES_SIN_DIAPOSITIVAS.filter((u) => !LISTA_INICIAL.includes(u))).toEqual([]);
  });
  it('ninguna unidad de la lista está ya completa (si lo está, quítala de src/config/diapositivas.ts)', () => {
    expect(UNIDADES_SIN_DIAPOSITIVAS.filter((u) => faltanEn(u).length === 0)).toEqual([]);
  });
  it('toda carpeta de un módulo es una unidad «udNN-…» (si no, la norma no la vería)', () => {
    expect(carpetas.filter((c) => !unidades.includes(c))).toEqual([]);
  });
});

for (const archivo of archivos) {
  const relativo = archivo.slice(DOCS.length + 1);
  const dirUnidad = path.dirname(path.dirname(archivo));
  const nombre = path.basename(archivo);
  const traduccion = nombre.endsWith('.es.md');
  const md = readFileSync(archivo, 'utf8');
  const { diapositivas, avisos } = analizar(md);

  describe(relativo, () => {
    it('tiene su página de apuntes', () => {
      expect(existsSync(path.join(dirUnidad, nombre))).toBe(true);
    });
    it('separadores bien puestos', () => {
      expect(avisos).toEqual([]);
    });
    if (!traduccion && existsSync(path.join(dirUnidad, nombre.replace(/\.md$/, '.es.md')))) {
      it('tiene traducción con el mismo número de diapositivas', () => {
        const otra = path.join(path.dirname(archivo), nombre.replace(/\.md$/, '.es.md'));
        expect(existsSync(otra), 'la página tiene versión en castellano: falta la presentación .es.md').toBe(true);
        expect(analizar(readFileSync(otra, 'utf8')).diapositivas.length).toBe(diapositivas.length);
      });
    }
    if (traduccion) {
      it('existe la presentación original', () => {
        expect(existsSync(archivo.replace(/\.es\.md$/, '.md'))).toBe(true);
      });
    }
    it('las imágenes existen y son de la web', () => {
      const malas = [...md.matchAll(/!\[[^\]]*\]\(\s*([^)\s]+)/g)]
        .map((m) => m[1])
        .filter((src) =>
          /^(?:https?:)?\/\//.test(src)
            ? true
            : !existsSync(src.startsWith('/') ? path.join('public', src) : path.resolve(path.dirname(archivo), src)),
        );
      expect(malas).toEqual([]);
    });
    it('los laboratorios y sus pestañas existen', () => {
      const malos = [...md.matchAll(/::laboratorio(?:\[[^\]]*\])?\{([^}]*)\}/g)].flatMap(([, attrs]) => {
        const src = attrs.match(/src="([^"]+)"/)?.[1] ?? '';
        const pestana = attrs.match(/pestana="([^"]+)"/)?.[1];
        const indice = path.join(dirUnidad, 'laboratorios', src, 'index.html');
        if (!existsSync(indice)) return [`laboratorio «${src}»`];
        if (pestana && !readFileSync(indice, 'utf8').includes(`data-tab="${pestana}"`)) return [`pestaña «${pestana}» de «${src}»`];
        return [];
      });
      expect(malos).toEqual([]);
    });
    it(`ninguna lista de más de ${MAX_VINETAS} viñetas ni código de más de ${MAX_CODIGO} líneas`, () => {
      const excesos = diapositivas.flatMap((d, i) => [
        ...(listaMasLarga(d) > MAX_VINETAS ? [`diapositiva ${i + 1}: ${listaMasLarga(d)} viñetas`] : []),
        ...(codigoMasLargo(d) > MAX_CODIGO ? [`diapositiva ${i + 1}: ${codigoMasLargo(d)} líneas de código`] : []),
      ]);
      expect(excesos).toEqual([]);
    });
  });
}

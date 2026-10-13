import { describe, expect, it } from 'vitest';
import {
  analizar,
  codigoMasLargo,
  esDeDiapositivas,
  hrefPresentacion,
  idPagina,
  idUnidad,
  listaMasLarga,
  paginasDeTeoria,
  TEXTOS_PRESENTACION,
  trocear,
} from '../../src/lib/diapositivas';
import { crearDocs } from './ayuda-directivas';

const U = 'docencia/smr/som/ud02-virtualizacion';

describe('ids y direcciones', () => {
  it('reconoce los archivos de diapositivas', () => {
    expect(esDeDiapositivas(`${U}/diapositivas/02-hypervisors.md`)).toBe(true);
    expect(esDeDiapositivas(`${U}/02-hypervisors.md`)).toBe(false);
    expect(esDeDiapositivas(`${U}/diapositivas/extra/x.md`)).toBe(false);
  });
  it('id de la página: original y traducción', () => {
    expect(idPagina(`${U}/diapositivas/02-hypervisors.md`)).toBe(`${U}/02-hypervisors`);
    expect(idPagina(`${U}/diapositivas/02-hypervisors.es.md`)).toBe(`${U}/02-hypervisors/es`);
  });
  it('un archivo que no es de diapositivas: error', () => {
    expect(() => idPagina(`${U}/02-hypervisors.md`)).toThrow(/No es un archivo de diapositivas/);
  });
  it('dirección de la presentación', () => {
    expect(hrefPresentacion(`${U}/02-hypervisors`)).toBe(`/${U}/02-hypervisors/presentacion/`);
    expect(hrefPresentacion(`${U}/02-hypervisors/es`)).toBe(`/${U}/02-hypervisors/es/presentacion/`);
  });
  it('id de la unidad de una página', () => {
    expect(idUnidad(`${U}/02-hypervisors`)).toBe(U);
    expect(idUnidad(`${U}/02-hypervisors/es`)).toBe(`${U}/es`);
  });
});

describe('trocear', () => {
  it('parte por <hr> en todas sus formas y descarta trozos vacíos', () => {
    expect(trocear('<h2>A</h2>\n<hr>\n<p>B</p><hr/><hr />\n<p>C</p>\n<hr>')).toEqual(['<h2>A</h2>', '<p>B</p>', '<p>C</p>']);
  });
  it('sin <hr>, una sola diapositiva', () => {
    expect(trocear('<p>Solo</p>')).toEqual(['<p>Solo</p>']);
  });
});

describe('analizar', () => {
  const md = ['---', 'title: X', '---', '', '## Uno', '', 'Texto', '', '---', '', '## Dos'].join('\n');
  it('separa por --- y quita el frontmatter', () => {
    expect(analizar(md)).toEqual({ diapositivas: ['## Uno\n\nTexto', '## Dos'], avisos: [] });
  });
  it('no corta dentro de un bloque de código', () => {
    const conCodigo = ['## A', '', '```yaml', '---', 'a: 1', '```', '', '---', '', '## B'].join('\n');
    expect(analizar(conCodigo).diapositivas).toHaveLength(2);
  });
  it('avisa del --- pegado a una línea de texto (sería un título)', () => {
    const r = analizar(['## A', 'Texto', '---', '', '## B'].join('\n'));
    expect(r.avisos).toEqual(['Línea 3: deja una línea en blanco antes de «---» (si no, Markdown lo convierte en un título)']);
  });
  it('los números de línea cuentan el frontmatter', () => {
    const r = analizar(['---', 'title: X', '---', 'Texto', '---'].join('\n'));
    expect(r.avisos[0]).toMatch(/^Línea 5:/);
  });
});

describe('límites', () => {
  it('lista más larga (elementos de primer nivel seguidos)', () => {
    expect(listaMasLarga(['- a', '- b', '  - b1', '- c', '', 'Texto', '1. x', '2. y'].join('\n'))).toBe(3);
    expect(listaMasLarga('Sin listas')).toBe(0);
  });
  it('bloque de código más largo (líneas de dentro)', () => {
    expect(codigoMasLargo(['```bash', 'a', 'b', 'c', '```', '~~~', 'd', '~~~'].join('\n'))).toBe(3);
  });
});

describe('páginas de teoría', () => {
  const docs = crearDocs({
    [`${U}/index.md`]: '',
    [`${U}/index.es.md`]: '',
    [`${U}/actividades.md`]: '',
    [`${U}/planificacion.md`]: '',
    [`${U}/01-what-is-virtualization.md`]: '',
    [`${U}/01-what-is-virtualization.es.md`]: '',
    [`${U}/02-hypervisors.md`]: '',
    [`${U}/hypervisor-types.svg`]: '',
    [`${U}/diapositivas/02-hypervisors.md`]: '',
  });
  it('solo las de teoría, con su traducción si existe', () => {
    expect(paginasDeTeoria(`${docs}/${U}`)).toEqual([
      { nombre: '01-what-is-virtualization', traduccion: true },
      { nombre: '02-hypervisors', traduccion: false },
    ]);
  });
});

describe('textos de interfaz', () => {
  it('los tres idiomas tienen los mismos textos, ninguno vacío', () => {
    const claves = Object.keys(TEXTOS_PRESENTACION.es).sort();
    for (const textos of Object.values(TEXTOS_PRESENTACION)) {
      expect(Object.keys(textos).sort()).toEqual(claves);
      expect(Object.values(textos).every((t) => t.trim() !== '')).toBe(true);
    }
  });
});

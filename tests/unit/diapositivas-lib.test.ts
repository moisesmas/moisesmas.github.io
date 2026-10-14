import { describe, expect, it } from 'vitest';
import {
  analizar,
  codigoMasLargo,
  esDeDiapositivas,
  hrefPresentacion,
  idPagina,
  idUnidad,
  listaMasLarga,
  maquetar,
  paginasDeTeoria,
  quitarAnclas,
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

describe('quitarAnclas', () => {
  it('quita los enlaces de ancla que Starlight añade a los títulos (en una presentación sobran y rompen el #)', () => {
    const html =
      '<div class="sl-heading-wrapper level-h2"><h2 id="a">A</h2><a class="sl-anchor-link" href="#a"><span aria-hidden="true" class="sl-anchor-icon"><svg><path d="m1"/></svg></span><span class="sr-only">Sección titulada «A»</span></a></div><p><a href="/x/">enlace</a></p>';
    expect(quitarAnclas(html)).toBe('<div class="sl-heading-wrapper level-h2"><h2 id="a">A</h2></div><p><a href="/x/">enlace</a></p>');
  });
});

describe('maquetar', () => {
  it('separa el título (arriba) del cuerpo (que se centra en el espacio que queda)', () => {
    expect(maquetar('<div class="sl-heading-wrapper level-h2"><h2 id="a">A</h2></div>\n<ul><li>x</li></ul>')).toBe(
      '<div class="diapositiva"><div class="diapositiva__titulo"><div class="sl-heading-wrapper level-h2"><h2 id="a">A</h2></div></div><div class="diapositiva__cuerpo"><ul><li>x</li></ul></div></div>',
    );
  });
  it('también con un h2 sin envoltorio', () => {
    expect(maquetar('<h2>A</h2><p>x</p>')).toBe(
      '<div class="diapositiva"><div class="diapositiva__titulo"><h2>A</h2></div><div class="diapositiva__cuerpo"><p>x</p></div></div>',
    );
  });
  it('sin título, todo es cuerpo', () => {
    expect(maquetar('<p>x</p>')).toBe('<div class="diapositiva"><div class="diapositiva__cuerpo"><p>x</p></div></div>');
  });
  it('un h2 que no va al principio es parte del cuerpo', () => {
    expect(maquetar('<p>x</p><h2>B</h2>')).toBe('<div class="diapositiva"><div class="diapositiva__cuerpo"><p>x</p><h2>B</h2></div></div>');
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
    [`${U}/actividades-agil.md`]: '',
    [`${U}/actividades-agil.es.md`]: '',
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

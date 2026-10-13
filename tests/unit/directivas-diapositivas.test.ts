import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { describe, expect, it } from 'vitest';
import { archivoMd } from '../../src/lib/directivas/comun';
import { convertir, crearDocs } from './ayuda-directivas';

const U = 'docencia/smr/som/ud02-virtualizacion';
const LAB =
  '<!doctype html><html lang="en"><head><title>Virtualization Playground</title>' +
  '<meta name="description" content="Play with hypervisors">' +
  '<meta name="lab:titulo:es" content="Laboratorio de virtualización">' +
  '<meta name="lab:descripcion:es" content="Juega con hipervisores"></head>' +
  '<body><button data-tab="stack">Stack</button><button data-tab="vtx">VT-x</button></body></html>';
const docs = crearDocs({
  [`${U}/02-hypervisors.md`]: '---\ntitle: "2. Hypervisors"\n---\n',
  [`${U}/laboratorios/virtualizacion/index.html`]: LAB,
});
const D = `${U}/diapositivas/02-hypervisors.md`;
const DES = `${U}/diapositivas/02-hypervisors.es.md`;

describe('archivoMd en diapositivas', () => {
  it('usa el id y la carpeta de la página', () => {
    const a = archivoMd(pathToFileURL(path.join(docs, DES)))!;
    expect(a.diapositivas).toBe(true);
    expect(a.id).toBe(`${U}/02-hypervisors/es`);
    expect(a.traduccion).toBe(true);
    expect(a.hrefDir).toBe(`/${U}/`);
    expect(a.dir).toBe(path.join(docs, U));
  });
  it('en una página normal no cambia nada', () => {
    const a = archivoMd(pathToFileURL(path.join(docs, `${U}/02-hypervisors.md`)))!;
    expect(a.diapositivas).toBe(false);
    expect(a.id).toBe(`${U}/02-hypervisors`);
    expect(a.hrefDir).toBe(`/${U}/`);
  });
});

describe(':::pasos', () => {
  it('cada elemento de una lista aparece por pasos', () => {
    const html = convertir(docs, D, ':::pasos\n- Uno\n- Dos\n:::');
    expect(html).toContain('class="pasos"');
    expect(html.match(/<li class="fragment">/g)).toHaveLength(2);
  });
  it('los demás bloques aparecen enteros, uno a uno', () => {
    const html = convertir(docs, D, ':::pasos\nPrimero\n\nSegundo\n:::');
    expect(html.match(/<div class="fragment">/g)).toHaveLength(2);
  });
  it('fuera de las diapositivas: error', () => {
    expect(() => convertir(docs, `${U}/02-hypervisors.md`, ':::pasos\n- Uno\n:::')).toThrow(
      /\[::pasos\] Solo se puede usar en las diapositivas/,
    );
  });
});

describe('::::columnas', () => {
  it('primer bloque a la izquierda y el resto a la derecha', () => {
    const html = convertir(docs, D, '::::columnas\nIzquierda\n\nDerecha 1\n\nDerecha 2\n::::');
    expect(html).toMatch(
      /<div class="columnas"><div class="columnas__izquierda"><p>Izquierda<\/p><\/div><div class="columnas__derecha"><p>Derecha 1<\/p>\s*<p>Derecha 2<\/p><\/div><\/div>/,
    );
  });
  it('con :::pasos dentro', () => {
    const html = convertir(docs, D, '::::columnas\nImagen\n\n:::pasos\n- a\n- b\n:::\n::::');
    expect(html).toContain('class="columnas__derecha"><div class="pasos">');
    expect(html.match(/<li class="fragment">/g)).toHaveLength(2);
  });
  it('con un solo bloque: error', () => {
    expect(() => convertir(docs, D, '::::columnas\nSolo\n::::')).toThrow(/\[::columnas\] Necesita al menos dos bloques/);
  });
  it('fuera de las diapositivas: error', () => {
    expect(() => convertir(docs, `${U}/02-hypervisors.md`, '::::columnas\nA\n\nB\n::::')).toThrow(
      /Solo se puede usar en las diapositivas/,
    );
  });
});

describe('::laboratorio', () => {
  it('tarjeta en el idioma original, que abre la pestaña en otra ventana', () => {
    const html = convertir(docs, D, '::laboratorio{src="virtualizacion" pestana="stack"}');
    expect(html).toContain(`href="/${U}/laboratorios/virtualizacion/#stack"`);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Virtualization Playground');
    expect(html).toContain('Open the lab');
  });
  it('en la traducción: castellano, ?lang=es y textos en castellano', () => {
    const html = convertir(docs, DES, '::laboratorio{src="virtualizacion" pestana="vtx"}');
    expect(html).toContain(`href="/${U}/laboratorios/virtualizacion/?lang=es#vtx"`);
    expect(html).toContain('Laboratorio de virtualización');
    expect(html).toContain('Abrir laboratorio');
  });
  it('la etiqueta dice a qué pestaña lleva (para distinguir varias tarjetas del mismo laboratorio)', () => {
    const html = convertir(docs, D, '::laboratorio[Hypervisor stack builder]{src="virtualizacion" pestana="stack"}');
    expect(html).toContain('<span class="diapositiva-laboratorio__pestana">Hypervisor stack builder</span>');
  });
  it('sin etiqueta, sin línea de pestaña', () => {
    expect(convertir(docs, D, '::laboratorio{src="virtualizacion" pestana="stack"}')).not.toContain('diapositiva-laboratorio__pestana');
  });
  it('sin pestaña: sin #', () => {
    expect(convertir(docs, D, '::laboratorio{src="virtualizacion"}')).toContain(`href="/${U}/laboratorios/virtualizacion/"`);
  });
  it('laboratorio inexistente: error', () => {
    expect(() => convertir(docs, D, '::laboratorio{src="nada"}')).toThrow(/\[::laboratorio\] No existe laboratorios\/nada\/index\.html/);
  });
  it('pestaña inexistente: error', () => {
    expect(() => convertir(docs, D, '::laboratorio{src="virtualizacion" pestana="nada"}')).toThrow(/no tiene la pestaña «nada»/);
  });
  it('fuera de las diapositivas: error', () => {
    expect(() => convertir(docs, `${U}/02-hypervisors.md`, '::laboratorio{src="virtualizacion"}')).toThrow(
      /Solo se puede usar en las diapositivas/,
    );
  });
});

describe('directivas de siempre en las diapositivas', () => {
  it('::artefacto resuelve el laboratorio desde la carpeta de la unidad', () => {
    expect(convertir(docs, D, '::artefacto{src="virtualizacion"}')).toContain(`href="/${U}/laboratorios/virtualizacion/"`);
  });
});

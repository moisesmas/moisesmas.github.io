import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { comprobarTextos, leerFicha, listarLaboratorios, tituloPagina } from '../../src/lib/laboratorios';
import { convertir, crearDocs } from './ayuda-directivas';

const LAB = `<!doctype html><html lang="en" data-lab="bits" data-idioma-original="en"><head>
<title>Bit Lab</title>
<meta content="Number systems &amp; units" name="description">
<meta name="keywords" content="binary, hex">
<meta name="lab:titulo:es" content="Laboratorio de Bits">
<meta name="lab:descripcion:es" content="Sistemas de numeración">
<meta name="lab:etiquetas:es" content="binario, hexadecimal">
<script type="application/json" id="lab-textos">{"es":{"titulo":"Laboratorio de Bits","comprobar":"Comprobar"}}</script>
</head><body><h1 data-t="titulo">Bit Lab</h1><button data-t-attr="aria-label:comprobar">Check</button></body></html>`;

const M = 'docencia/smr/som';
const docs = crearDocs({
  [`${M}/index.md`]: '---\ntitle: Single-User OS\n---\n',
  [`${M}/index.es.md`]: '---\ntitle: SOM\n---\n',
  [`${M}/ud01-introduccion/index.md`]: '---\ntitle: "Unit 1 · Intro"\n---\n',
  [`${M}/ud01-introduccion/index.es.md`]: '---\ntitle: Unidad 1 · Intro\n---\n',
  [`${M}/ud01-introduccion/laboratorios/bits/index.html`]: LAB,
  [`${M}/ud02-otra/index.md`]: '---\ntitle: Unit 2\n---\n',
});

describe('leerFicha', () => {
  it('original', () => {
    expect(leerFicha(LAB, false)).toEqual({ titulo: 'Bit Lab', descripcion: 'Number systems & units', etiquetas: ['binary', 'hex'] });
  });
  it('castellano', () => {
    expect(leerFicha(LAB, true)).toEqual({ titulo: 'Laboratorio de Bits', descripcion: 'Sistemas de numeración', etiquetas: ['binario', 'hexadecimal'] });
  });
  it('sin metadatos en castellano usa los originales', () => {
    expect(leerFicha('<title>Solo</title>', true).titulo).toBe('Solo');
  });
});

describe('listarLaboratorios y tituloPagina', () => {
  it('lista los laboratorios por unidad', () => {
    expect(listarLaboratorios(path.join(docs, M)).map((l) => `${l.unidad}/${l.nombre}`)).toEqual(['ud01-introduccion/bits']);
  });
  it('lee el título del frontmatter (con o sin comillas)', () => {
    expect(tituloPagina(path.join(docs, M, 'ud01-introduccion/index.md'))).toBe('Unit 1 · Intro');
    expect(tituloPagina(path.join(docs, M, 'no-existe.md'))).toBeUndefined();
  });
});

describe('comprobarTextos', () => {
  it('sin fallos', () => {
    expect(comprobarTextos(LAB)).toEqual({ faltan: [], sobran: [] });
  });
  it('detecta claves sin traducir y traducciones sin uso', () => {
    const roto = LAB.replace('"comprobar":"Comprobar"', '"otra":"Otra"');
    expect(comprobarTextos(roto)).toEqual({ faltan: ['comprobar'], sobran: ['otra'] });
  });
});

describe('::artefacto', () => {
  it('tarjeta de lanzamiento en el idioma original', () => {
    const html = convertir(docs, `${M}/ud01-introduccion/index.md`, '::artefacto{src="bits"}');
    expect(html).toContain(`href="/${M}/ud01-introduccion/laboratorios/bits/"`);
    expect(html).toContain('Bit Lab');
    expect(html).toContain('Abrir laboratorio');
  });
  it('desde la traducción abre el laboratorio en castellano', () => {
    const html = convertir(docs, `${M}/ud01-introduccion/index.es.md`, '::artefacto{src="bits"}');
    expect(html).toContain(`href="/${M}/ud01-introduccion/laboratorios/bits/?lang=es"`);
    expect(html).toContain('Laboratorio de Bits');
  });
  it('modo incrustado', () => {
    const html = convertir(docs, `${M}/ud01-introduccion/index.md`, '::artefacto{src="bits" modo="incrustado" alto="600"}');
    expect(html).toMatch(/<iframe src="[^"]*laboratorios\/bits\/" title="Bit Lab" loading="lazy" style="height:600px"/);
    expect(html).toContain('Abrir a pantalla completa');
  });
  it('laboratorio inexistente: error', () => {
    expect(() => convertir(docs, `${M}/ud01-introduccion/index.md`, '::artefacto{src="nada"}')).toThrow(/\[::artefacto\] No existe/);
  });
});

describe('::laboratorios', () => {
  it('portada del módulo: agrupados por unidad con su título', () => {
    const html = convertir(docs, `${M}/index.md`, '::laboratorios');
    expect(html).toContain('<h3>Unit 1 · Intro</h3>');
    expect(html).toContain(`href="/${M}/ud01-introduccion/laboratorios/bits/"`);
    expect(html).not.toContain('Unit 2');
  });
  it('portada en castellano: títulos y enlaces en castellano', () => {
    const html = convertir(docs, `${M}/index.es.md`, '::laboratorios');
    expect(html).toContain('<h3>Unidad 1 · Intro</h3>');
    expect(html).toContain('?lang=es');
  });
  it('fuera de un módulo: error', () => {
    expect(() => convertir(docs, 'docencia/index.md', '::laboratorios')).toThrow(/\[::laboratorios\]/);
  });
});

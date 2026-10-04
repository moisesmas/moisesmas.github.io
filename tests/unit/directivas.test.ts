import { describe, expect, it } from 'vitest';
import { formatearTamano, tipoArchivo } from '../../src/lib/directivas/descarga';
import { convertir, crearDocs } from './ayuda-directivas';

const U = 'docencia/smr/som/ud01-introduccion';
const docs = crearDocs({
  [`${U}/p3-instalacion.pdf`]: 'x'.repeat(1_536_000),
  [`${U}/notas.txt`]: 'hola',
});

describe('utilidades de descarga', () => {
  it('tipo de archivo legible', () => {
    expect(tipoArchivo('a.pdf')).toBe('PDF');
    expect(tipoArchivo('a.DOCX')).toBe('Word');
    expect(tipoArchivo('a.iso')).toBe('ISO');
  });
  it('tamaño en formato español', () => {
    expect(formatearTamano(1_536_000)).toBe('1,5 MB');
    expect(formatearTamano(4)).toBe('1 KB');
    expect(formatearTamano(20_480)).toBe('20 KB');
  });
});

describe('::descarga', () => {
  it('tarjeta con enlace, título, tipo y tamaño', () => {
    const html = convertir(docs, `${U}/index.md`, '::descarga[Práctica 3]{src="p3-instalacion.pdf"}');
    expect(html).toContain(`href="/${U}/p3-instalacion.pdf"`);
    expect(html).toContain('<strong>Práctica 3</strong>');
    expect(html).toContain('PDF · 1,5 MB');
    expect(html).toContain('class="bloque-descarga not-content"');
  });
  it('sin etiqueta usa el nombre del archivo', () => {
    expect(convertir(docs, `${U}/index.md`, '::descarga{src="notas.txt"}')).toContain('<strong>notas.txt</strong>');
  });
  it('funciona igual desde la traducción', () => {
    expect(convertir(docs, `${U}/index.es.md`, '::descarga{src="notas.txt"}')).toContain(`href="/${U}/notas.txt"`);
  });
  it('archivo inexistente: error claro con la página', () => {
    expect(() => convertir(docs, `${U}/index.md`, '::descarga{src="nada.pdf"}')).toThrow(
      /\[::descarga\] No existe «nada\.pdf».*ud01-introduccion\/index\.md/,
    );
  });
  it('sin src: error', () => {
    expect(() => convertir(docs, `${U}/index.md`, '::descarga[Algo]')).toThrow(/Falta el atributo src/);
  });
});

describe('::video', () => {
  it('no carga nada de YouTube hasta pulsar', () => {
    const html = convertir(docs, `${U}/index.md`, '::video[Instalar Ubuntu]{youtube="dQw4w9WgXcQ"}');
    expect(html).toContain('data-video-youtube="dQw4w9WgXcQ"');
    expect(html).toContain('Instalar Ubuntu');
    expect(html).not.toMatch(/<iframe|youtube\.com|ytimg/);
  });
  it('identificador no válido: error', () => {
    expect(() => convertir(docs, `${U}/index.md`, '::video{youtube="corto"}')).toThrow(/\[::video\]/);
  });
  it('el aviso es texto de la interfaz (lang="es"); el botón lleva el título del vídeo, sin idioma propio', () => {
    const html = convertir(docs, `${U}/index.md`, '::video[Installing Ubuntu]{youtube="dQw4w9WgXcQ"}');
    expect(html).toContain('<p class="bloque-video__aviso" lang="es">Al reproducirlo, el vídeo se cargará desde YouTube.</p>');
    expect(html).not.toMatch(/<button[^>]*lang=/);
    expect(html).not.toMatch(/<div class="bloque-video[^>]*lang=/);
  });
});

describe(':::aules', () => {
  it('caja con el contenido y el enlace al curso del módulo', () => {
    const html = convertir(docs, `${U}/index.md`, ':::aules\nLa **solución** está en Aules.\n:::');
    expect(html).toContain('class="bloque-aules"');
    expect(html).toContain('<strong>solución</strong>');
    expect(html).toContain('href="https://aules.edu.gva.es/"');
  });
  it('fuera de un módulo: error', () => {
    expect(() => convertir(docs, 'docencia/index.md', ':::aules\nx\n:::')).toThrow(/\[::aules\]/);
  });
  it('el título y el enlace son texto de la interfaz (lang="es"); el contenido de la caja conserva el idioma de la página', () => {
    const html = convertir(docs, `${U}/index.md`, ':::aules\nThe **solution** is in Aules.\n:::');
    expect(html).toContain('<p class="bloque-aules__titulo" lang="es">');
    expect(html).toContain('<p class="bloque-aules__enlace" lang="es">');
    expect(html).not.toMatch(/<aside[^>]*lang=/);
    expect(html).not.toMatch(/class="bloque-aules__contenido"[^>]*lang=/);
  });
});

describe('::modulos', () => {
  it('una tarjeta por módulo con curso, ciclo e idiomas', () => {
    const html = convertir(docs, 'docencia/index.md', '::modulos');
    expect(html.match(/class="tarjeta-modulo"/g)).toHaveLength(3);
    expect(html).toContain('href="/docencia/smr/som/"');
    expect(html).toContain('English · Castellano');
    expect(html).toContain('Valencià · Castellano');
  });
});

describe('convivencia', () => {
  it('no toca directivas ajenas ni texto con < y {', () => {
    const html = convertir(docs, `${U}/index.md`, 'Si 3 < 4 entonces {x}\n\n::desconocida{a=1}');
    expect(html).toContain('3 &lt; 4 entonces {x}');
  });
});

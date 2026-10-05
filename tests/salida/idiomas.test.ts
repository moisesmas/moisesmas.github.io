import { describe, expect, it } from 'vitest';
import { conmutador, leer } from './leer';

const U = '/docencia/smr/som/ud01-introduccion/';

describe('conmutador de idioma', () => {
  it('en el original, English activo', () => {
    expect(conmutador(leer('docencia/smr/som/ud01-introduccion/index.html'))).toEqual([
      { href: U, texto: 'English', actual: true },
      { href: `${U}es/`, texto: 'Castellano', actual: false },
    ]);
  });
  it('en la traducción, Castellano activo', () => {
    expect(conmutador(leer('docencia/smr/som/ud01-introduccion/es/index.html'))).toEqual([
      { href: U, texto: 'English', actual: false },
      { href: `${U}es/`, texto: 'Castellano', actual: true },
    ]);
  });
  it('Sistemas Informáticos usa Valencià', () => {
    const enlaces = conmutador(leer('docencia/dam/sistemas-informaticos/index.html'));
    expect(enlaces.map((e) => e.texto)).toEqual(['Valencià', 'Castellano']);
  });
  it('Proyecto Intermodular no tiene conmutador', () => {
    expect(conmutador(leer('docencia/smr/proyecto-intermodular/index.html'))).toEqual([]);
  });
});

describe('idioma del contenido', () => {
  it('marca el contenido con su idioma real', () => {
    expect(leer('docencia/smr/som/ud01-introduccion/index.html')).toMatch(/<div lang="en"/);
    expect(leer('docencia/smr/som/ud01-introduccion/es/index.html')).toMatch(/<div lang="es"/);
    expect(leer('docencia/dam/sistemas-informaticos/index.html')).toMatch(/<div lang="ca-valencia"/);
  });
  it('la interfaz sigue en castellano', () => {
    expect(leer('docencia/smr/som/index.html')).toMatch(/<html lang="es-ES"/);
  });
  it('el título de la página (h1) también va dentro del contenedor con el idioma del contenido', () => {
    expect(leer('docencia/smr/som/ud01-introduccion/index.html')).toMatch(/<div lang="en"[^>]*>\s*<h1/);
    expect(leer('docencia/smr/som/ud01-introduccion/es/index.html')).toMatch(/<div lang="es"[^>]*>\s*<h1/);
    expect(leer('docencia/dam/sistemas-informaticos/index.html')).toMatch(/<div lang="ca-valencia"[^>]*>\s*<h1/);
  });
  it('el conmutador de idioma queda fuera de ese contenedor', () => {
    expect(leer('docencia/smr/som/ud01-introduccion/index.html')).toMatch(
      /<div lang="en"[^>]*>\s*<h1[^>]*>[^<]*<\/h1>\s*<\/div>\s*<nav class="conmutador-idioma/,
    );
  });
});

/** Enlace «anterior» o «siguiente» de la paginación, con su texto. */
function vecino(html: string, rel: 'prev' | 'next'): string {
  return html.match(new RegExp(`<a href="[^"]*" rel="${rel}".*?</a>`, 's'))?.[0] ?? '';
}

describe('paginación en el original', () => {
  it('«siguiente» hacia la portada de una unidad muestra el título de la unidad, no «Presentación»', () => {
    const som = vecino(leer('docencia/smr/som/index.html'), 'next');
    expect(som).toContain('Unit 1 · Introduction to computer systems');
    expect(som).not.toContain('Presentación');
    const si = vecino(leer('docencia/dam/sistemas-informaticos/index.html'), 'next');
    expect(si).toContain('Unitat 1 ·');
    expect(si).not.toContain('Presentación');
  });
  it('el menú lateral sigue llamando «Presentación» a la portada de la unidad', () => {
    expect(leer('docencia/smr/som/index.html')).toMatch(
      /<a href="\/docencia\/smr\/som\/ud01-introduccion\/"[^>]*><span[^>]*>Presentación<\/span><\/a>/,
    );
  });
});

describe('paginación en castellano', () => {
  it('desde la portada del módulo en castellano, «siguiente» va a la unidad en castellano', () => {
    expect(leer('docencia/smr/som/es/index.html')).toMatch(new RegExp(`<a href="${U}es/" rel="next"`));
  });
});

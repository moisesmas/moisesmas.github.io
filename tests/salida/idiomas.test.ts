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
});

describe('paginación en castellano', () => {
  it('desde la portada del módulo en castellano, «siguiente» va a la unidad en castellano', () => {
    expect(leer('docencia/smr/som/es/index.html')).toMatch(new RegExp(`<a href="${U}es/" rel="next"`));
  });
});

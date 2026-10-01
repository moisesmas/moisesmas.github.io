import { describe, expect, it } from 'vitest';
import { existe, leer } from './leer';

const U = 'docencia/smr/som/ud01-introduccion/';

describe('Laboratorio de Bits publicado', () => {
  it('se copia a su tema', () => {
    expect(existe(`${U}laboratorios/numeracion/index.html`)).toBe(true);
  });
  it('la unidad enlaza al laboratorio en el idioma de la página', () => {
    expect(leer(`${U}index.html`)).toContain(`href="/${U}laboratorios/numeracion/"`);
    expect(leer(`${U}es/index.html`)).toContain(`href="/${U}laboratorios/numeracion/?lang=es"`);
  });
  it('la portada del módulo lo lista en «Laboratorios del módulo»', () => {
    expect(leer('docencia/smr/som/index.html')).toContain('Bit Lab');
    expect(leer('docencia/smr/som/es/index.html')).toContain('Laboratorio de Bits');
  });
  it('los recursos comunes están publicados', () => {
    expect(existe('comun/lab.js')).toBe(true);
    expect(existe('comun/fuentes.css')).toBe(true);
  });
});

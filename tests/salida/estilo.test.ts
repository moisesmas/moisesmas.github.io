import { describe, expect, it } from 'vitest';
import { leer } from './leer';

describe('identidad de Docencia', () => {
  const html = leer('docencia/smr/som/index.html');
  it('carga las fuentes autoalojadas y el favicon común', () => {
    expect(html).toContain('href="/comun/fuentes.css"');
    expect(html).toContain('/comun/favicon.svg');
  });
  it('sin peticiones a terceros en la página', () => {
    expect(html).not.toMatch(/fonts\.googleapis|googletagmanager|youtube\.com\/embed/);
  });
  it('pie con la nota de privacidad', () => {
    expect(html).toContain('no usa cookies');
  });
});

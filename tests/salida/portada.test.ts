import { describe, expect, it } from 'vitest';
import { leer } from './leer';

describe('portada personal', () => {
  const html = leer('index.html');
  it('es una página propia, no de Starlight', () => {
    expect(html).not.toContain('sl-markdown-content');
    expect(html).toMatch(/<html lang="es"/);
  });
  it('presenta y enlaza a Docencia', () => {
    expect(html).toContain('Moisés Mas');
    expect(html).toContain('href="/docencia/"');
  });
  it('sin fuentes de la identidad de Docencia ni terceros', () => {
    expect(html).not.toMatch(/fuentes\.css|googleapis/);
  });
  it('nota de privacidad', () => {
    expect(html).toContain('no usa cookies');
  });
});

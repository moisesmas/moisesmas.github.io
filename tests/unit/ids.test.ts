import { describe, expect, it } from 'vitest';
import { generarId } from '../../src/lib/ids';

const id = (entry: string, data: Record<string, unknown> = {}) => generarId({ entry, data });

describe('generarId', () => {
  it('página original', () => {
    expect(id('docencia/smr/som/ud01-introduccion/01-teoria.md')).toBe('docencia/smr/som/ud01-introduccion/01-teoria');
  });
  it('traducción al castellano', () => {
    expect(id('docencia/smr/som/ud01-introduccion/01-teoria.es.md')).toBe('docencia/smr/som/ud01-introduccion/01-teoria/es');
  });
  it('index original', () => {
    expect(id('docencia/smr/som/index.md')).toBe('docencia/smr/som');
  });
  it('index traducido', () => {
    expect(id('docencia/smr/som/index.es.md')).toBe('docencia/smr/som/es');
  });
  it('respeta un slug explícito', () => {
    expect(id('docencia/x.md', { slug: 'otra/ruta' })).toBe('otra/ruta');
  });
  it('normaliza mayúsculas y espacios como Starlight', () => {
    expect(id('docencia/UD 01/Tema A.md')).toBe('docencia/ud-01/tema-a');
  });
});

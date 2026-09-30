import { describe, expect, it } from 'vitest';
import { MODULOS, moduloDeId, temasMenu } from '../../src/config/modulos';

describe('moduloDeId', () => {
  it('encuentra el módulo de una página interior', () => {
    expect(moduloDeId('docencia/smr/som/ud01-introduccion/01-teoria')?.id).toBe('som');
  });
  it('encuentra el módulo de su portada y de su traducción', () => {
    expect(moduloDeId('docencia/smr/som')?.id).toBe('som');
    expect(moduloDeId('docencia/smr/som/es')?.id).toBe('som');
  });
  it('no confunde prefijos parecidos', () => {
    expect(moduloDeId('docencia/smr/somx/pagina')).toBeUndefined();
  });
  it('páginas fuera de módulos', () => {
    expect(moduloDeId('docencia')).toBeUndefined();
  });
});

describe('temasMenu', () => {
  it('un tema por módulo con su carpeta autogenerada', () => {
    const temas = temasMenu();
    expect(temas).toHaveLength(MODULOS.length);
    expect(temas[0]).toEqual({
      id: 'som',
      label: 'Sistemas Operativos Monopuesto',
      link: '/docencia/smr/som/',
      items: [{ autogenerate: { directory: 'docencia/smr/som' } }],
    });
  });
});

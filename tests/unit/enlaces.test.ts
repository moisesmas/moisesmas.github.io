import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { carpetaConIndiceExiste, traduccionExiste } from '../../src/lib/enlaces';

const docs = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-')));
mkdirSync(path.join(docs, 'docencia/smr/som/ud01'), { recursive: true });
writeFileSync(path.join(docs, 'docencia/smr/som/ud01/01-teoria.es.md'), '');
writeFileSync(path.join(docs, 'docencia/smr/som/ud01/index.es.md'), '');
mkdirSync(path.join(docs, 'docencia/smr/som/ud01/laboratorios/bits'), { recursive: true });
writeFileSync(path.join(docs, 'docencia/smr/som/ud01/laboratorios/bits/index.html'), '');
mkdirSync(path.join(docs, 'docencia/smr/som/ud01/laboratorios/vacio'), { recursive: true });

describe('traduccionExiste', () => {
  it('página traducida', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/01-teoria/es/')).toBe(true);
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/01-teoria/es/#apartado')).toBe(true);
  });
  it('index traducido', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/es/')).toBe(true);
  });
  it('traducción inexistente: no se excluye (el validador lo marcará)', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/02-practicas/es/')).toBe(false);
  });
  it('enlaces que no son traducciones: no se excluyen', () => {
    expect(traduccionExiste(docs, '/docencia/smr/som/ud01/01-teoria/')).toBe(false);
  });
});

describe('carpetaConIndiceExiste', () => {
  it('carpeta con index.html (laboratorio), con o sin idioma y ancla', () => {
    expect(carpetaConIndiceExiste(docs, '/docencia/smr/som/ud01/laboratorios/bits/')).toBe(true);
    expect(carpetaConIndiceExiste(docs, '/docencia/smr/som/ud01/laboratorios/bits/?lang=es')).toBe(true);
    expect(carpetaConIndiceExiste(docs, '/docencia/smr/som/ud01/laboratorios/bits/#bits')).toBe(true);
  });
  it('carpeta sin index.html o inexistente: no se excluye (el validador lo marcará)', () => {
    expect(carpetaConIndiceExiste(docs, '/docencia/smr/som/ud01/laboratorios/vacio/')).toBe(false);
    expect(carpetaConIndiceExiste(docs, '/docencia/smr/som/ud01/laboratorios/otro/')).toBe(false);
  });
  it('enlaces que no son una carpeta, o que salen del contenido: no se excluyen', () => {
    expect(carpetaConIndiceExiste(docs, '/docencia/smr/som/ud01/laboratorios/bits/index.html')).toBe(false);
    expect(carpetaConIndiceExiste(docs, '/')).toBe(false);
    expect(carpetaConIndiceExiste(docs, '/../')).toBe(false);
    expect(carpetaConIndiceExiste(docs, 'laboratorios/bits/')).toBe(false);
    expect(carpetaConIndiceExiste(docs, '/%E0%A4%A/')).toBe(false);
  });
});

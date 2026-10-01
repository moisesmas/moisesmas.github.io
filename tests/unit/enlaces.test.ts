import { mkdirSync, mkdtempSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { traduccionExiste } from '../../src/lib/enlaces';

const docs = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-')));
mkdirSync(path.join(docs, 'docencia/smr/som/ud01'), { recursive: true });
writeFileSync(path.join(docs, 'docencia/smr/som/ud01/01-teoria.es.md'), '');
writeFileSync(path.join(docs, 'docencia/smr/som/ud01/index.es.md'), '');

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

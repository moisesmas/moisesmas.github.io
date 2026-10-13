// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { COLORES, crearPizarra, GROSORES } from '../../src/scripts/pizarra';

function puntero(tipo: string, objetivo: EventTarget, x: number, y: number) {
  objetivo.dispatchEvent(new PointerEvent(tipo, { clientX: x, clientY: y, pointerId: 1, bubbles: true }));
}

describe('pizarra', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('crea el lienzo y el puntero, sin modo activo', () => {
    const p = crearPizarra(document.body);
    expect(p.modo).toBe('nada');
    expect(document.querySelector('canvas.pizarra-lienzo')?.getAttribute('data-modo')).toBe('nada');
    expect(document.querySelector('.pizarra-puntero')).not.toBeNull();
  });

  it('alternar activa y desactiva cada modo', () => {
    const p = crearPizarra(document.body);
    p.alternar('lapiz');
    expect(p.modo).toBe('lapiz');
    expect(document.documentElement.dataset.pizarra).toBe('lapiz');
    p.alternar('puntero');
    expect(p.modo).toBe('puntero');
    p.alternar('puntero');
    expect(p.modo).toBe('nada');
  });

  it('con el lápiz, arrastrar dibuja un trazo con el color y el grosor elegidos', () => {
    const p = crearPizarra(document.body);
    const lienzo = document.querySelector('canvas')!;
    p.color(COLORES[1]);
    p.grosor(GROSORES[1]);
    p.fijarModo('lapiz');
    puntero('pointerdown', lienzo, 10, 20);
    puntero('pointermove', lienzo, 30, 40);
    puntero('pointerup', lienzo, 30, 40);
    puntero('pointermove', lienzo, 99, 99); // ya no dibuja
    expect(p.trazos).toEqual([{ color: COLORES[1], grosor: GROSORES[1], puntos: [[10, 20], [30, 40]] }]);
  });

  it('sin el lápiz no dibuja', () => {
    const p = crearPizarra(document.body);
    const lienzo = document.querySelector('canvas')!;
    puntero('pointerdown', lienzo, 10, 20);
    puntero('pointermove', lienzo, 30, 40);
    expect(p.trazos).toEqual([]);
  });

  it('borrar quita todos los trazos', () => {
    const p = crearPizarra(document.body);
    const lienzo = document.querySelector('canvas')!;
    p.fijarModo('lapiz');
    puntero('pointerdown', lienzo, 1, 1);
    puntero('pointerup', lienzo, 1, 1);
    p.borrar();
    expect(p.trazos).toEqual([]);
  });

  it('el puntero sigue al ratón solo en modo puntero', () => {
    const p = crearPizarra(document.body);
    const punto = document.querySelector<HTMLElement>('.pizarra-puntero')!;
    puntero('pointermove', document, 5, 5);
    expect(punto.hasAttribute('data-visible')).toBe(false);
    p.fijarModo('puntero');
    puntero('pointermove', document, 120, 80);
    expect(punto.hasAttribute('data-visible')).toBe(true);
    expect(punto.style.left).toBe('120px');
    expect(punto.style.top).toBe('80px');
  });
});

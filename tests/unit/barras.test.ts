// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ocultarSinActividad } from '../../src/scripts/barras';

describe('barras que se ocultan', () => {
  let barra: HTMLElement;
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '<nav data-barra></nav>';
    barra = document.querySelector('nav')!;
  });
  afterEach(() => vi.useRealTimers());

  it('se ven al empezar y se ocultan tras el tiempo indicado', () => {
    ocultarSinActividad([barra], 3000);
    expect(barra.classList.contains('oculta')).toBe(false);
    vi.advanceTimersByTime(3000);
    expect(barra.classList.contains('oculta')).toBe(true);
  });
  it('mover el ratón las vuelve a mostrar', () => {
    ocultarSinActividad([barra], 3000);
    vi.advanceTimersByTime(3000);
    document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true }));
    expect(barra.classList.contains('oculta')).toBe(false);
  });
  it('un toque en pantalla táctil (sin movimiento previo) también las muestra', () => {
    ocultarSinActividad([barra], 3000);
    vi.advanceTimersByTime(3000);
    document.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    expect(barra.classList.contains('oculta')).toBe(false);
  });
});

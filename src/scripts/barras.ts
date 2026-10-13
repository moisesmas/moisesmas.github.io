/**
 * Las barras de la presentación se ocultan tras `ms` sin actividad. Vuelven al mover el ratón
 * y también al tocar la pantalla (en una pantalla táctil no hay movimiento previo al toque).
 */
export function ocultarSinActividad(barras: Iterable<Element>, ms: number): void {
  const lista = [...barras];
  let temporizador: ReturnType<typeof setTimeout> | undefined;
  function mostrar(): void {
    for (const b of lista) b.classList.remove('oculta');
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      for (const b of lista) b.classList.add('oculta');
    }, ms);
  }
  document.addEventListener('pointermove', mostrar);
  document.addEventListener('pointerdown', mostrar, true);
  mostrar();
}

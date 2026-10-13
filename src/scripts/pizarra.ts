/** Puntero y dibujo a mano alzada sobre la presentación (ratón, dedo o lápiz). Sin dependencias. */
export type Modo = 'nada' | 'puntero' | 'lapiz';
export const COLORES = ['#e0212f', '#1f5bd8', '#1a8a3a'] as const;
export const GROSORES = [4, 10] as const;

export interface Trazo {
  color: string;
  grosor: number;
  puntos: [number, number][];
}

export interface Pizarra {
  readonly modo: Modo;
  readonly trazos: readonly Trazo[];
  alternar(m: 'puntero' | 'lapiz'): void;
  fijarModo(m: Modo): void;
  color(c: string): void;
  grosor(g: number): void;
  borrar(): void;
}

export function crearPizarra(contenedor: HTMLElement): Pizarra {
  const lienzo = document.createElement('canvas');
  lienzo.className = 'pizarra-lienzo';
  lienzo.dataset.modo = 'nada';
  const punto = document.createElement('div');
  punto.className = 'pizarra-puntero';
  contenedor.append(lienzo, punto);
  // Sin canvas 2D (happy-dom en las pruebas) la pizarra guarda los trazos pero no pinta.
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = lienzo.getContext('2d');
  } catch {}

  let modo: Modo = 'nada';
  let color: string = COLORES[0];
  let grosor: number = GROSORES[0];
  const trazos: Trazo[] = [];
  let actual: Trazo | null = null;

  function redibujar(): void {
    const c = ctx;
    if (!c) return;
    const r = window.devicePixelRatio || 1;
    c.setTransform(r, 0, 0, r, 0, 0);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    c.lineCap = 'round';
    c.lineJoin = 'round';
    for (const t of trazos) {
      c.strokeStyle = t.color;
      c.lineWidth = t.grosor;
      c.beginPath();
      t.puntos.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.stroke();
    }
  }

  function ajustar(): void {
    const r = window.devicePixelRatio || 1;
    lienzo.width = Math.round(window.innerWidth * r);
    lienzo.height = Math.round(window.innerHeight * r);
    redibujar();
  }

  lienzo.addEventListener('pointerdown', (e) => {
    if (modo !== 'lapiz') return;
    actual = { color, grosor, puntos: [[e.clientX, e.clientY]] };
    trazos.push(actual);
    lienzo.setPointerCapture?.(e.pointerId);
    e.preventDefault();
  });
  lienzo.addEventListener('pointermove', (e) => {
    if (!actual) return;
    actual.puntos.push([e.clientX, e.clientY]);
    redibujar();
  });
  const terminar = () => {
    actual = null;
  };
  lienzo.addEventListener('pointerup', terminar);
  lienzo.addEventListener('pointercancel', terminar);

  document.addEventListener('pointermove', (e) => {
    if (modo !== 'puntero') return;
    punto.style.left = `${e.clientX}px`;
    punto.style.top = `${e.clientY}px`;
  });

  window.addEventListener('resize', ajustar);
  ajustar();

  function fijarModo(m: Modo): void {
    modo = m;
    actual = null;
    lienzo.dataset.modo = m;
    punto.toggleAttribute('data-visible', m === 'puntero');
    document.documentElement.dataset.pizarra = m;
  }

  return {
    get modo() {
      return modo;
    },
    get trazos() {
      return trazos;
    },
    alternar: (m) => fijarModo(modo === m ? 'nada' : m),
    fijarModo,
    color: (c) => {
      color = c;
    },
    grosor: (g) => {
      grosor = g;
    },
    borrar: () => {
      trazos.length = 0;
      actual = null;
      redibujar();
    },
  };
}

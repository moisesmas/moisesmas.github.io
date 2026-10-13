import Reveal from 'reveal.js';
import 'reveal.js/reveal.css';
import { ocultarSinActividad } from './barras';
import { crearPizarra } from './pizarra';

const CLAVE_TEMA = 'presentacion-tema';
const raiz = document.documentElement;
export const imprimir = new URLSearchParams(location.search).has('pdf');
const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function alternarTema(): void {
  const nuevo = raiz.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
  raiz.dataset.tema = nuevo;
  try {
    localStorage.setItem(CLAVE_TEMA, nuevo);
  } catch {}
}

export const atajos: Record<number, (e: KeyboardEvent) => void> = {
  68: alternarTema, // D
};

export const pizarra = crearPizarra(document.body);
atajos[80] = () => pizarra.alternar('puntero'); // P (sustituye «anterior» de reveal.js; siguen las flechas y RePág)
atajos[76] = () => pizarra.alternar('lapiz'); // L
atajos[67] = () => pizarra.borrar(); // C

export const presentacion = new Reveal({
  hash: true,
  width: 1280,
  height: 720,
  margin: 0.06,
  center: false,
  controls: true,
  progress: true,
  slideNumber: 'c/t',
  transition: sinMovimiento ? 'none' : 'fade',
  backgroundTransition: 'none',
  view: imprimir ? 'print' : null,
  pdfSeparateFragments: false,
  keyboard: atajos,
});

presentacion.initialize().then(() => {
  if (imprimir) setTimeout(() => window.print(), 800);
});

document.querySelector('[data-tema-boton]')?.addEventListener('click', alternarTema);

// Al cambiar de idioma se conserva la diapositiva (va en el #).
for (const enlace of document.querySelectorAll<HTMLAnchorElement>('[data-con-diapositiva]')) {
  enlace.addEventListener('click', () => {
    enlace.href = enlace.href.split('#')[0] + location.hash;
  });
}

presentacion.on('slidechanged', () => pizarra.borrar());

function marcar(selector: string, activo: Element | null): void {
  for (const b of document.querySelectorAll(selector)) b.setAttribute('aria-pressed', String(b === activo));
}
function marcarModo(): void {
  for (const b of document.querySelectorAll('[data-pizarra="puntero"], [data-pizarra="lapiz"]')) {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-pizarra') === pizarra.modo));
  }
}
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-pizarra]')) {
  b.addEventListener('click', () => {
    const accion = b.dataset.pizarra;
    if (accion === 'borrar') pizarra.borrar();
    else if (accion === 'puntero' || accion === 'lapiz') pizarra.alternar(accion);
    marcarModo();
  });
}
document.addEventListener('keyup', marcarModo);
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-color]')) {
  b.addEventListener('click', () => {
    pizarra.color(b.dataset.color!);
    marcar('[data-color]', b);
  });
}
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-grosor]')) {
  b.addEventListener('click', () => {
    pizarra.grosor(Number(b.dataset.grosor));
    marcar('[data-grosor]', b);
  });
}

ocultarSinActividad(document.querySelectorAll('[data-barra]'), 3000);

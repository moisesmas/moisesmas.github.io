import Reveal from 'reveal.js';
import 'reveal.js/reveal.css';

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

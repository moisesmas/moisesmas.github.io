import { ETIQUETA_IDIOMA, MODULOS, type Modulo } from '../../config/modulos';
import { escapar, html, type Manejador } from './comun';

function tarjeta(m: Modulo): string {
  const idiomas = m.idioma === 'es' ? 'Castellano' : `${ETIQUETA_IDIOMA[m.idioma]} · Castellano`;
  return (
    `<a class="tarjeta-modulo" href="/${m.ruta}/">` +
    `<span class="tarjeta-modulo__ciclo">${escapar(`${m.curso} · ${m.ciclo}`)}</span>` +
    `<strong class="tarjeta-modulo__nombre">${escapar(m.nombre)}</strong>` +
    `<span class="tarjeta-modulo__idioma">${escapar(idiomas)}</span></a>`
  );
}

/** ::modulos — tarjetas de todos los módulos (portada de Docencia). */
export const modulos: Manejador = () =>
  html(`<div class="tarjetas-modulos not-content">${MODULOS.map(tarjeta).join('')}</div>`);

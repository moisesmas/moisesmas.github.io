import { readFileSync } from 'node:fs';
import path from 'node:path';
import { leerFicha, listarLaboratorios, tituloPagina } from '../laboratorios';
import { hrefLaboratorio, tarjetaLaboratorio } from './artefacto';
import { escapar, fallo, html, type Manejador } from './comun';

/** ::laboratorios — todos los laboratorios del módulo, agrupados por unidad (portada del módulo). */
export const laboratorios: Manejador = (_nodo, archivo) => {
  const modulo = archivo.modulo;
  if (!modulo) fallo('laboratorios', archivo, 'Solo se puede usar en la portada de un módulo');
  const dirModulo = path.join(archivo.docs, modulo.ruta);
  const labs = listarLaboratorios(dirModulo);
  if (labs.length === 0) {
    return html('<p class="laboratorios-modulo__vacio">Todavía no hay laboratorios en este módulo.</p>');
  }
  const unidades = [...new Set(labs.map((l) => l.unidad))];
  const secciones = unidades.map((unidad) => {
    const indice = path.join(dirModulo, unidad, archivo.traduccion ? 'index.es.md' : 'index.md');
    const titulo = tituloPagina(indice) ?? tituloPagina(path.join(dirModulo, unidad, 'index.md')) ?? unidad;
    const tarjetas = labs
      .filter((l) => l.unidad === unidad)
      .map((l) =>
        tarjetaLaboratorio(
          leerFicha(readFileSync(l.archivo, 'utf8'), archivo.traduccion),
          hrefLaboratorio(`/${modulo.ruta}/${unidad}/`, l.nombre, archivo.traduccion),
        ),
      )
      .join('');
    return `<section class="laboratorios-modulo__unidad"><h3>${escapar(titulo)}</h3><div class="laboratorios-modulo__tarjetas">${tarjetas}</div></section>`;
  });
  return html(`<div class="laboratorios-modulo not-content">${secciones.join('')}</div>`);
};

import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { getCollection } from 'astro:content';
import { moduloDeId } from '../config/modulos';
import { estadoIdioma, idiomaContenido, limpiarMenu, paginacion } from '../lib/idiomas';

// Se ejecuta después del de starlight-sidebar-topics (orden «pre»), que ya ha
// reducido el menú al del módulo actual.
export const onRequest = defineRouteMiddleware(async (context) => {
  const ids = new Set((await getCollection('docs')).map((e) => e.id));
  const existe = (id: string) => ids.has(id);
  const ruta = context.locals.starlightRoute;
  const modulo = moduloDeId(ruta.id);

  ruta.siteTitleHref = '/docencia/';
  context.locals.idiomaContenido = idiomaContenido(ruta.id, modulo);
  context.locals.conmutador = estadoIdioma(ruta.id, modulo, existe);

  if (!ruta.hasSidebar) return;
  ruta.sidebar = limpiarMenu(ruta.sidebar, ruta.id);
  const { prev, next } = paginacion(ruta.sidebar, ruta.id, existe);
  ruta.pagination.prev = prev;
  ruta.pagination.next = next;
});

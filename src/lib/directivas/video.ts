import { atributo, escapar, fallo, html, textoDe, type Manejador } from './comun';

/** ::video[Título]{youtube="ID"} — no se conecta con YouTube hasta pulsar (public/comun/video.js). */
export const video: Manejador = (nodo, archivo) => {
  const id = atributo(nodo, 'youtube');
  if (!id || !/^[\w-]{11}$/.test(id)) {
    fallo('video', archivo, `El atributo youtube debe ser el identificador de 11 caracteres del vídeo: «${id ?? ''}»`);
  }
  const titulo = textoDe(nodo.children) || 'Vídeo';
  return html(
    `<div class="bloque-video not-content" data-video-youtube="${id}" data-titulo="${escapar(titulo)}">` +
      `<button type="button" class="bloque-video__reproducir"><span aria-hidden="true">▶</span> ${escapar(titulo)}</button>` +
      `<p class="bloque-video__aviso">Al reproducirlo, el vídeo se cargará desde YouTube.</p></div>`,
  );
};

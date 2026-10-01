// Carga el vídeo de YouTube (modo sin cookies) solo cuando el alumno pulsa «reproducir».
document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('.bloque-video__reproducir');
  if (!boton) return;
  const caja = boton.closest('[data-video-youtube]');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${caja.dataset.videoYoutube}?autoplay=1`;
  iframe.title = caja.dataset.titulo || 'Vídeo';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  caja.replaceChildren(iframe);
});

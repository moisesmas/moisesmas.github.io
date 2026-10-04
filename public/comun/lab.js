/*
 * Kit común de laboratorios · moisesmas.com
 *
 * Cada laboratorio lo carga en su <head>, antes de sus propios scripts:
 *   <script src="/comun/lab.js"></script>
 *
 * Contrato del laboratorio:
 *   <html lang="en" data-lab="numeracion" data-idioma-original="en">
 *   - Texto original en el HTML. Traducción al castellano en
 *       <script type="application/json" id="lab-textos">{"es": {"clave": "texto"}}</script>
 *     referenciada con data-t="clave" (texto de un elemento sin hijos),
 *     data-t-html="clave" (HTML interior) o data-t-attr="aria-label:clave;title:otra".
 *   - Textos generados desde JavaScript: Lab.t({ en: '…', es: '…' }).
 *   - Controles: data-lab-idioma="en|ca-valencia|es", data-lab-volver, data-lab-zoom="+|-".
 *   - Memoria local: Lab.leer(clave) / Lab.guardar(clave, valor).
 */
(function (global) {
  'use strict';

  var ETIQUETAS = { en: 'English', 'ca-valencia': 'Valencià', es: 'Castellano' };
  var ZOOM = { minimo: 12, maximo: 24, paso: 2, inicial: 16 };

  function idiomaDesdeUrl(search, original) {
    return new URLSearchParams(search).get('lang') === 'es' ? 'es' : original;
  }

  function urlConIdioma(href, idioma, original) {
    var url = new URL(href);
    if (idioma === original) url.searchParams.delete('lang');
    else url.searchParams.set('lang', idioma);
    return url.toString();
  }

  /*
   * «atras» solo si se llegó desde OTRA página de esta web y hay adónde volver.
   * Tras cambiar de idioma (location.replace) el referrer es el propio laboratorio,
   * y en una pestaña nueva abierta desde Aules el historial tiene una sola página:
   * en ambos casos history.back() no lleva a la unidad, así que se usa su página.
   */
  function destinoVolver(referrer, origen, ruta, historial, paginaTema) {
    try {
      if (referrer) {
        var anterior = new URL(referrer);
        if (anterior.origin === origen && anterior.pathname !== ruta && historial > 1) return 'atras';
      }
    } catch (e) {
      /* referrer no válido: se usa la página del tema */
    }
    return paginaTema;
  }

  function leerLocal(clave) {
    try { return global.localStorage.getItem(clave); } catch (e) { return null; }
  }

  function guardarLocal(clave, valor) {
    try { global.localStorage.setItem(clave, String(valor)); } catch (e) { /* sin almacenamiento */ }
  }

  var doc = global.document;
  var raiz = doc.documentElement;
  var original = raiz.getAttribute('data-idioma-original') || 'es';
  var nombre = raiz.getAttribute('data-lab') || 'lab';
  var idioma = idiomaDesdeUrl(global.location.search, original);
  var zoom = Number(leerLocal('lab:zoom')) || ZOOM.inicial;

  raiz.setAttribute('data-idioma', idioma);
  raiz.setAttribute('lang', idioma);
  raiz.style.fontSize = zoom + 'px';
  if (idioma !== original) {
    // Oculta el texto original hasta traducir, para que no parpadee.
    raiz.setAttribute('data-traduciendo', '');
    var estilo = doc.createElement('style');
    estilo.textContent = 'html[data-traduciendo] body{visibility:hidden}';
    (doc.head || raiz).appendChild(estilo);
  }

  function traducir(diccionario) {
    function texto(clave) {
      if (Object.prototype.hasOwnProperty.call(diccionario, clave)) return diccionario[clave];
      global.console.warn('[lab] Falta la traducción de «' + clave + '»');
      return null;
    }
    doc.querySelectorAll('[data-t]').forEach(function (el) {
      var t = texto(el.getAttribute('data-t'));
      if (t !== null) el.textContent = t;
    });
    doc.querySelectorAll('[data-t-html]').forEach(function (el) {
      var t = texto(el.getAttribute('data-t-html'));
      if (t !== null) el.innerHTML = t;
    });
    doc.querySelectorAll('[data-t-attr]').forEach(function (el) {
      el.getAttribute('data-t-attr').split(';').forEach(function (par) {
        var partes = par.split(':');
        var atributo = (partes[0] || '').trim();
        var clave = (partes[1] || '').trim();
        if (!atributo || !clave) return;
        var t = texto(clave);
        if (t !== null) el.setAttribute(atributo, t);
      });
    });
    var titulo = doc.querySelector('meta[name="lab:titulo:es"]');
    if (titulo) doc.title = titulo.getAttribute('content');
  }

  function conectar() {
    if (idioma !== original) {
      var bloque = doc.getElementById('lab-textos');
      var diccionario = {};
      try {
        diccionario = JSON.parse(bloque ? bloque.textContent : '{}')[idioma] || {};
      } catch (e) {
        global.console.error('[lab] #lab-textos no es JSON válido');
      }
      traducir(diccionario);
      raiz.removeAttribute('data-traduciendo');
    }

    doc.querySelectorAll('[data-lab-idioma]').forEach(function (boton) {
      var destino = boton.getAttribute('data-lab-idioma');
      if (!boton.textContent.trim()) boton.textContent = ETIQUETAS[destino] || destino;
      boton.setAttribute('lang', destino);
      boton.setAttribute('aria-pressed', destino === idioma ? 'true' : 'false');
      boton.addEventListener('click', function () {
        if (destino !== idioma) global.location.replace(urlConIdioma(global.location.href, destino, original));
      });
    });

    doc.querySelectorAll('[data-lab-volver]').forEach(function (enlace) {
      if (Lab.enIframe) {
        enlace.hidden = true;
        return;
      }
      var paginaTema = new URL('../../' + (idioma !== original ? 'es/' : ''), global.location.href).toString();
      enlace.setAttribute('href', paginaTema);
      enlace.addEventListener('click', function (evento) {
        if (destinoVolver(doc.referrer, global.location.origin, global.location.pathname, global.history.length, paginaTema) === 'atras') {
          evento.preventDefault();
          global.history.back();
        }
      });
    });

    doc.querySelectorAll('[data-lab-zoom]').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var paso = boton.getAttribute('data-lab-zoom') === '+' ? ZOOM.paso : -ZOOM.paso;
        zoom = Math.min(ZOOM.maximo, Math.max(ZOOM.minimo, zoom + paso));
        raiz.style.fontSize = zoom + 'px';
        guardarLocal('lab:zoom', zoom);
      });
    });
  }

  var Lab = {
    idioma: idioma,
    original: original,
    nombre: nombre,
    enIframe: global.self !== global.top,
    t: function (textos) {
      return textos[idioma] != null ? textos[idioma] : textos[original];
    },
    leer: function (clave) {
      return leerLocal('lab:' + nombre + ':' + clave);
    },
    guardar: function (clave, valor) {
      guardarLocal('lab:' + nombre + ':' + clave, valor);
    },
    _internos: { idiomaDesdeUrl: idiomaDesdeUrl, urlConIdioma: urlConIdioma, destinoVolver: destinoVolver, conectar: conectar },
  };
  global.Lab = Lab;

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', conectar);
  else conectar();
})(window);

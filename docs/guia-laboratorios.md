# Guía para crear laboratorios

Un **laboratorio** es una página HTML interactiva y autónoma (un solo archivo `index.html`) que acompaña a un tema: una pestaña por concepto clave, simuladores y, al final, una pestaña de práctica con corrección inmediata que hace de autoevaluación. Esta guía es para quien escriba laboratorios nuevos, sea una persona o un agente. Si sigues el esqueleto y las reglas, las dos pruebas automáticas pasan a la primera.

**Laboratorio de referencia:** `src/content/docs/docencia/smr/som/ud01-introduccion/laboratorios/numeracion/index.html` (Laboratorio de Bits). Si todavía no existe en tu copia del repositorio, el esqueleto del apartado 3 es el patrón.

El contrato completo del kit común está en el comentario de cabecera de `public/comun/lab.js`. Esta guía lo resume y añade lo que comprueban las pruebas.

## Receta rápida

1. Copia el esqueleto del apartado 3 a `…/<unidad>/laboratorios/<nombre>/index.html` y cambia `mi-laboratorio` por el nombre de la carpeta.
2. Escribe el texto en el idioma original del módulo, las traducciones al castellano en `#lab-textos` y el texto generado con JavaScript con `Lab.t` (apartado 5).
3. Una pestaña por concepto clave y, al final, la de práctica con corrección (apartado 6).
4. Usa los colores y las fuentes de la identidad visual (apartado 8).
5. Ejecuta las pruebas de laboratorios hasta que pasen, después `npm test` y `npm run build`, y revisa el resultado en el navegador (apartado 10).

## 1. Dónde va

```
src/content/docs/docencia/<ciclo>/<módulo>/<unidad>/laboratorios/<nombre>/index.html
```

| Módulo | Carpeta del módulo | Idioma original |
|---|---|---|
| Sistemas Operativos Monopuesto (SOM) | `docencia/smr/som` | `en` (inglés) |
| Sistemas Informáticos | `docencia/dam/sistemas-informaticos` | `ca-valencia` (valenciano) |
| Proyecto Intermodular | `docencia/smr/proyecto-intermodular` | `es` (solo castellano) |

- El idioma original lo fija el módulo (`src/config/modulos.ts`) y las pruebas lo deducen de la ruta. Un laboratorio de SOM o de Sistemas Informáticos es bilingüe (original más castellano); uno de Proyecto Intermodular solo existe en castellano. Un laboratorio que no esté dentro de la carpeta de un módulo se evalúa como solo castellano.
- `<nombre>`: minúsculas, números y guiones, corto (`bios-uefi`). Es a la vez el nombre de la carpeta, el valor de `data-lab` y el `src` de `::artefacto`. No puede repetirse en ningún otro laboratorio de la web, porque la memoria local se guarda por nombre.
- Se publica en `/docencia/<ciclo>/<módulo>/<unidad>/laboratorios/<nombre>/`. Con `?lang=es` se abre en castellano y con `#<id-de-pestaña>` en una pestaña concreta (un enlace desde Aules puede apuntar a una pestaña).
- Un único `index.html` con CSS y JavaScript en línea. Las pruebas solo leen ese archivo y el navegador simulado no carga archivos JavaScript externos, así que el código que pusieras fuera no se probaría. Tamaño orientativo: 150 KB como máximo.
- No hay que registrar el laboratorio en ninguna prueba ni lista: las pruebas encuentran solas todos los `…/laboratorios/*/index.html`. No modifiques las pruebas para que pase tu laboratorio; si una regla te parece equivocada, dilo en tu informe.

## 2. Qué exigen las pruebas

Dos pruebas recorren todos los laboratorios de la web: la de **contrato** (`tests/unit/laboratorios-contrato.test.ts`, lee el HTML) y la de **humo** (`tests/unit/laboratorios-humo.test.ts`, lo abre en un navegador simulado). Los informes titulan cada comprobación con el nombre del laboratorio: `contrato de <nombre>` y `humo de <nombre>`.

| Prueba | Qué se exige |
|---|---|
| Contrato (toda la web) | Cada carpeta de laboratorio se llama con minúsculas, números y guiones (es lo único que acepta `::artefacto`) y ningún nombre se repite. |
| Contrato | `<html lang="…" data-lab="…" data-idioma-original="…">` en una sola línea y con los atributos en ese orden. `lang` e `data-idioma-original` valen el idioma original del módulo; `data-lab` vale el nombre de la carpeta. |
| Contrato | `<script src="/comun/lab.js"></script>` es el primer `<script` del archivo, incluso antes del diccionario `#lab-textos`. |
| Contrato | Lleva `href="/comun/fuentes.css"`. En todo el archivo, comentarios y textos incluidos, no aparece `../../assets`, `localStorage`, `<canvas` ni ninguna dirección `http://` o `https://` (solo se admite `http://www.w3.org/`, el espacio de nombres de SVG). |
| Contrato | Controles del kit: `data-lab-volver`, `data-lab-zoom="+"` y `data-lab-zoom="-"`. Los bilingües, además, `data-lab-idioma="<original>"` y `data-lab-idioma="es"`. |
| Contrato | Pestañas: el archivo contiene `role="tablist"`, `role="tabpanel"` y al menos tres veces `role="tab"`. |
| Contrato (solo bilingües) | Toda clave usada en `data-t`, `data-t-html` o `data-t-attr` está en `#lab-textos`, y toda clave de `#lab-textos` se usa en algún sitio: no faltan ni sobran. |
| Contrato | Ficha: `<title>`, `<meta name="description">` y `<meta name="keywords">` con contenido. En los bilingües, además, el título en castellano (`lab:titulo:es`) tiene que ser distinto del original. |
| Humo | El laboratorio se abre, el kit se ejecuta y se pulsan todas sus pestañas (`role="tab"`) sin que salte ninguna excepción de JavaScript y sin que la consola contenga la palabra `Error`. |
| Humo (solo bilingües) | Lo mismo con `?lang=es`, y además sin avisos `[lab] Falta la traducción…` (el kit los lanza cuando una clave no está en el diccionario). |

El navegador simulado imita el ciclo de carga de un navegador real: el kit y el código del laboratorio se ejecutan al leer la página, el kit traduce y conecta los controles al terminar de cargar (`DOMContentLoaded`) y los temporizadores van acortados (un `setTimeout` de más de 50 ms se dispara a los 50 ms y un `setInterval` se ejecuta como mucho 4 veces). La propia prueba de humo lleva una autocomprobación con un laboratorio roto a propósito, para asegurar que sigue detectando errores.

Además, una promesa rechazada sin capturar (un `Promise.reject(…)` o una función `async` que falla) hace fallar toda la ejecución de Vitest: aparece como «Unhandled Rejection» y no queda ligada a una prueba concreta.

La prueba de humo **no ejecuta tus simuladores ni tus ejercicios**: solo abre la página y pulsa las pestañas. Todo lo demás hay que probarlo a mano (apartado 10).

## 3. Esqueleto mínimo

Copia este archivo a `…/laboratorios/<nombre>/index.html` y cambia `mi-laboratorio` por el nombre de la carpeta. Está escrito para SOM (original en inglés); el apartado 4 explica qué cambia en los otros módulos. Pasa las dos pruebas tal cual. Tiene tres pestañas de concepto y la de práctica; un laboratorio real lleva entre cinco y ocho de concepto.

```html
<!doctype html>
<html lang="en" data-lab="mi-laboratorio" data-idioma-original="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script src="/comun/lab.js"></script>
<title>Sample lab</title>
<meta name="description" content="Template lab with three concept tabs and a practice tab. Replace this with one sentence about what the lab teaches.">
<meta name="keywords" content="sample, template">
<meta name="lab:titulo:es" content="Laboratorio de ejemplo">
<meta name="lab:descripcion:es" content="Laboratorio de plantilla con tres pestañas de concepto y una de práctica. Sustituye este texto por una frase sobre lo que enseña el laboratorio.">
<meta name="lab:etiquetas:es" content="ejemplo, plantilla">
<link rel="icon" href="/comun/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/comun/fuentes.css">
<style>
:root{
  color-scheme:light dark;
  --bg:#f2f4ef;--surface:#ffffff;--surface2:#e9ede6;--ink:#16201b;--muted:#56655d;--line:#d3dbd4;
  --accent:#b86e00;--accent-soft:#fbeed8;--pcb:#1f5244;
  --f-display:"Chakra Petch",system-ui,sans-serif;
  --f-body:"Atkinson Hyperlegible",system-ui,-apple-system,"Segoe UI",sans-serif;
  --f-mono:"JetBrains Mono",ui-monospace,Menlo,Consolas,monospace;
}
@media (prefers-color-scheme:dark){:root{
  --bg:#0e1411;--surface:#161f1b;--surface2:#1d2823;--ink:#e4ebe6;--muted:#95a69d;--line:#2b3832;
  --accent:#f3aa3c;--accent-soft:#33260f;--pcb:#1a463a;
}}
*{box-sizing:border-box}
[hidden]{display:none!important}
body{margin:0;background:var(--bg);color:var(--ink);font:1rem/1.55 var(--f-body)}
h1,h2{font-family:var(--f-display);line-height:1.2;margin:0 0 .5rem}
h1{font-size:1.25rem}
h2{font-size:1.5rem}
code{font-family:var(--f-mono)}
button,input{font:inherit;color:inherit}
button{border:1px solid var(--muted);background:var(--surface);border-radius:.4rem;padding:.35rem .8rem;cursor:pointer}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.cabecera{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem 1rem;padding:.6rem 1rem;background:var(--pcb);color:#fff}
.cabecera h1{flex:1 1 12rem;margin:0}
.cabecera a{color:#fff}
.cabecera button{background:transparent;border-color:#fff;color:#fff}
.cabecera [aria-pressed="true"]{background:#fff;color:var(--pcb)}
main{max-width:60rem;margin:0 auto;padding:1rem}
.pestanas{display:flex;gap:.25rem;overflow-x:auto;border-bottom:1px solid var(--muted)}
[role="tab"]{display:flex;gap:.5rem;align-items:baseline;white-space:nowrap;border:0;border-bottom:3px solid transparent;border-radius:.4rem .4rem 0 0;background:var(--surface2);font:600 1rem var(--f-display)}
[role="tab"][aria-selected="true"]{background:var(--accent-soft);border-bottom-color:var(--accent)}
.n{font:600 .8rem var(--f-mono);color:var(--muted)}
[role="tabpanel"]{background:var(--surface);border:1px solid var(--line);border-top:0;padding:1rem 1.25rem}
.bits{display:flex;flex-wrap:wrap;gap:.4rem;margin:.75rem 0}
.bits button{width:2.75rem;height:3.25rem;font:700 1.25rem var(--f-mono)}
.bits [aria-pressed="true"]{background:var(--accent-soft);border:2px solid var(--accent)}
.fila{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem}
.primario{background:var(--pcb);border-color:var(--pcb);color:#fff}
input{width:7rem;border:1px solid var(--muted);border-radius:.4rem;padding:.35rem .6rem;background:var(--surface)}
.correccion{margin:.75rem 0;padding:.4rem .75rem;border-left:4px solid var(--accent);background:var(--surface2)}
.correccion:empty{display:none}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
</style>
<script type="application/json" id="lab-textos">
{
  "es": {
    "volver-aria": "Volver a la unidad",
    "volver": "Unidad",
    "titulo": "Laboratorio de ejemplo",
    "zoom-aria": "Tamaño del texto",
    "zoom-menos": "Reducir texto",
    "zoom-mas": "Aumentar texto",
    "idioma-aria": "Idioma",
    "pestanas-aria": "Secciones del laboratorio",
    "tab-bit": "El bit",
    "tab-byte": "El byte",
    "tab-unidades": "Unidades",
    "tab-practica": "Práctica",
    "bit-titulo": "El bit",
    "bit-texto": "Un <b>bit</b> es la unidad mínima de información: vale <code>0</code> o <code>1</code>.",
    "byte-titulo": "El byte",
    "byte-texto": "Pulsa un bit para cambiarlo entre 0 y 1.",
    "uni-titulo": "Unidades",
    "uni-texto": "Ocho bits forman un <b>byte</b>. <code>1 KiB</code> son 1024 bytes.",
    "pra-titulo": "Práctica",
    "pra-etiqueta": "Tu respuesta",
    "pra-comprobar": "Comprobar",
    "pra-otro": "Otro ejercicio",
    "pra-aciertos": "Aciertos"
  }
}
</script>
</head>
<body>
<header class="cabecera">
  <a href="../../" data-lab-volver data-t-attr="aria-label:volver-aria" aria-label="Back to the unit">← <span data-t="volver">Unit</span></a>
  <h1 data-t="titulo">Sample lab</h1>
  <div role="group" data-t-attr="aria-label:zoom-aria" aria-label="Text size">
    <button type="button" data-lab-zoom="-" data-t-attr="aria-label:zoom-menos" aria-label="Smaller text">A−</button>
    <button type="button" data-lab-zoom="+" data-t-attr="aria-label:zoom-mas" aria-label="Larger text">A+</button>
  </div>
  <div role="group" data-t-attr="aria-label:idioma-aria" aria-label="Language">
    <button type="button" data-lab-idioma="en"></button>
    <button type="button" data-lab-idioma="es"></button>
  </div>
</header>
<main>
  <div class="pestanas" role="tablist" data-t-attr="aria-label:pestanas-aria" aria-label="Lab sections">
    <button type="button" role="tab" id="tab-bit" data-tab="bit" aria-controls="panel-bit" aria-selected="true"><span class="n">1</span><span data-t="tab-bit">The bit</span></button>
    <button type="button" role="tab" id="tab-byte" data-tab="byte" aria-controls="panel-byte" aria-selected="false" tabindex="-1"><span class="n">2</span><span data-t="tab-byte">The byte</span></button>
    <button type="button" role="tab" id="tab-unidades" data-tab="unidades" aria-controls="panel-unidades" aria-selected="false" tabindex="-1"><span class="n">3</span><span data-t="tab-unidades">Units</span></button>
    <button type="button" role="tab" id="tab-practica" data-tab="practica" aria-controls="panel-practica" aria-selected="false" tabindex="-1"><span class="n">4</span><span data-t="tab-practica">Practice</span></button>
  </div>

  <section role="tabpanel" id="panel-bit" aria-labelledby="tab-bit" tabindex="0">
    <h2 data-t="bit-titulo">The bit</h2>
    <p data-t-html="bit-texto">A <b>bit</b> is the smallest unit of information: it is either <code>0</code> or <code>1</code>.</p>
  </section>

  <section role="tabpanel" id="panel-byte" aria-labelledby="tab-byte" tabindex="0" hidden>
    <h2 data-t="byte-titulo">The byte</h2>
    <p data-t="byte-texto">Press a bit to switch it between 0 and 1.</p>
    <div class="bits" id="bits"></div>
    <p id="valor" role="status"></p>
  </section>

  <section role="tabpanel" id="panel-unidades" aria-labelledby="tab-unidades" tabindex="0" hidden>
    <h2 data-t="uni-titulo">Units</h2>
    <p data-t-html="uni-texto">Eight bits make one <b>byte</b>. <code>1 KiB</code> is 1024 bytes.</p>
  </section>

  <section role="tabpanel" id="panel-practica" aria-labelledby="tab-practica" tabindex="0" hidden>
    <h2 data-t="pra-titulo">Practice</h2>
    <p id="enunciado"></p>
    <form class="fila" id="formulario" autocomplete="off">
      <label for="respuesta" data-t="pra-etiqueta">Your answer</label>
      <input id="respuesta" type="number" inputmode="numeric" required>
      <button type="submit" class="primario" data-t="pra-comprobar">Check</button>
      <button type="button" id="otro" data-t="pra-otro">New exercise</button>
    </form>
    <p class="correccion" id="correccion" role="status"></p>
    <p><span data-t="pra-aciertos">Correct answers</span>: <b id="aciertos">0</b></p>
  </section>
</main>

<script>
// Pestañas (patrón WAI-ARIA): clic, flechas, Inicio/Fin, enlace directo con #id y memoria con Lab.guardar.
const pestanas = [...document.querySelectorAll('[role="tab"]')];
function mostrar(id) {
  const activa = pestanas.find((p) => p.dataset.tab === id) ?? pestanas[0];
  for (const p of pestanas) {
    const es = p === activa;
    p.setAttribute('aria-selected', String(es));
    p.tabIndex = es ? 0 : -1;
    document.getElementById(p.getAttribute('aria-controls')).hidden = !es;
  }
  activa.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  return activa;
}
function elegir(id, enfocar) {
  const activa = mostrar(id);
  Lab.guardar('pestana', activa.dataset.tab);
  history.replaceState(null, '', '#' + activa.dataset.tab);
  if (enfocar) activa.focus();
}
pestanas.forEach((p) => p.addEventListener('click', () => elegir(p.dataset.tab)));
document.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
  const i = pestanas.indexOf(document.activeElement);
  const destino = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: pestanas.length - 1 }[e.key];
  if (i < 0 || destino === undefined) return;
  e.preventDefault();
  elegir(pestanas[(destino + pestanas.length) % pestanas.length].dataset.tab, true);
});
window.addEventListener('hashchange', () => mostrar(location.hash.slice(1)));
mostrar(location.hash.slice(1) || Lab.leer('pestana'));

// Pestaña «El byte»: ocho interruptores. Todo texto generado con JavaScript pasa por Lab.t.
const bits = Array(8).fill(0);
const valor = document.getElementById('valor');
function pintarValor() {
  const n = parseInt(bits.join(''), 2);
  valor.textContent = Lab.t({ en: `Binary ${bits.join('')} is decimal ${n}.`, es: `El binario ${bits.join('')} es el decimal ${n}.` });
}
bits.forEach((_, i) => {
  const potencia = 7 - i;
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.textContent = '0';
  boton.setAttribute('aria-pressed', 'false');
  boton.setAttribute('aria-label', Lab.t({ en: `Bit ${potencia}, value ${2 ** potencia}`, es: `Bit ${potencia}, valor ${2 ** potencia}` }));
  boton.addEventListener('click', () => {
    bits[i] ^= 1;
    boton.textContent = String(bits[i]);
    boton.setAttribute('aria-pressed', String(bits[i] === 1));
    pintarValor();
  });
  document.getElementById('bits').append(boton);
});
pintarValor();

// Pestaña «Práctica»: ejercicio generado, corrección inmediata con explicación y marcador recordado con Lab.guardar.
const enunciado = document.getElementById('enunciado');
const respuesta = document.getElementById('respuesta');
const correccion = document.getElementById('correccion');
const marcador = document.getElementById('aciertos');
let esperada = 0;
let aciertos = Number(Lab.leer('aciertos')) || 0;
marcador.textContent = String(aciertos);
function nuevoEjercicio() {
  esperada = 1 + Math.floor(Math.random() * 15);
  const binario = esperada.toString(2).padStart(4, '0');
  enunciado.textContent = Lab.t({ en: `Convert the binary number ${binario} to decimal.`, es: `Convierte a decimal el número binario ${binario}.` });
  respuesta.value = '';
  correccion.textContent = '';
}
document.getElementById('formulario').addEventListener('submit', (e) => {
  e.preventDefault();
  if (Number(respuesta.value) === esperada) {
    aciertos++;
    Lab.guardar('aciertos', aciertos);
    marcador.textContent = String(aciertos);
    correccion.textContent = Lab.t({ en: 'Correct!', es: '¡Correcto!' });
  } else {
    correccion.textContent = Lab.t({
      en: `Not quite: the answer is ${esperada}. Add the values of the bits that are 1: 8, 4, 2, 1.`,
      es: `Casi: la respuesta es ${esperada}. Suma el valor de los bits que valen 1: 8, 4, 2, 1.`,
    });
  }
});
document.getElementById('otro').addEventListener('click', nuevoEjercicio);
nuevoEjercicio();
</script>
</body>
</html>
```

## 4. Qué cambia según el módulo

Se ha comprobado que las tres variantes pasan las dos pruebas.

| | SOM | Sistemas Informáticos | Proyecto Intermodular |
|---|---|---|---|
| `<html …>` | `lang="en"` y `data-idioma-original="en"` | `lang="ca-valencia"` y `data-idioma-original="ca-valencia"` | `lang="es"` y `data-idioma-original="es"` |
| Texto del HTML, `<title>`, `description` y `keywords` | inglés | valenciano | castellano |
| Botones de idioma | `data-lab-idioma="en"` y `data-lab-idioma="es"` | `data-lab-idioma="ca-valencia"` y `data-lab-idioma="es"` | ninguno: quita el grupo «Language» |
| Diccionario `#lab-textos` y `data-t*` | sí, con el castellano | sí, con el castellano | no se usan |
| Metadatos `lab:*:es` | sí | sí | no |
| Texto generado con JavaScript | `Lab.t({ en: '…', es: '…' })` | `Lab.t({ 'ca-valencia': '…', es: '…' })` | texto normal |

En `Lab.t`, la clave del idioma original es el mismo código que `data-idioma-original`; si falta el texto del idioma activo, devuelve el del original. En todos los módulos siguen siendo obligatorios `data-lab-volver`, `data-lab-zoom`, las pestañas y la ficha (`<title>`, `description`, `keywords`).

## 5. Textos y traducciones

El HTML lleva el texto en el idioma original y las traducciones al castellano viven en el diccionario `#lab-textos`. Cuando la URL lleva `?lang=es`, el kit sustituye los textos marcados al terminar de cargar la página.

| Marca | Cuándo | Ejemplo |
|---|---|---|
| `data-t="clave"` | El elemento solo contiene texto, **sin elementos hijos**. | `<h2 data-t="bit-titulo">The bit</h2>` |
| `data-t-html="clave"` | El texto lleva marcado (`<b>`, `<i>`, `<code>`, `<sup>`, `<kbd>`, `<br>`). La traducción es el HTML interior. | `<p data-t-html="bit-texto">A <b>bit</b> is…</p>` |
| `data-t-attr="atributo:clave;otro:clave2"` | Atributos: `aria-label`, `title`, `placeholder`, `alt`… | `<button data-t-attr="aria-label:zoom-mas" aria-label="Larger text">` |
| `Lab.t({ en: '…', es: '…' })` | Todo texto que genera JavaScript: enunciados, mensajes de acierto o error, etiquetas y `aria-label` creados con código. | `Lab.t({ en: 'Correct!', es: '¡Correcto!' })` |

Reglas:

- **`data-t` solo en elementos sin hijos.** El kit hace `textContent = traducción`, lo que borra cualquier elemento hijo. Si dentro hay un número, un icono u otro elemento, envuelve el texto en su propio `<span data-t="clave">` (como en las pestañas del esqueleto). Las pruebas no detectan este error: en castellano desaparecerían los hijos.
- **Sin `data-t*` dentro de un `data-t-html`:** el kit sustituye todo el contenido y esa marca se perdería. Tampoco generes elementos con `data-t*` desde JavaScript: el kit solo traduce al terminar de cargar.
- **No leas texto del DOM para reutilizarlo.** El script del laboratorio se ejecuta antes de que el kit traduzca, así que verías el idioma original. Genera el texto con `Lab.t`.
- Claves cortas, en kebab-case, en castellano y descriptivas (`tab-bits`, `btn-comprobar`), sin `:` ni `;`. Una clave puede usarse en varios sitios.
- El diccionario es JSON válido (comillas dobles, sin coma final) con la clave `"es"`. Debe abrirse exactamente con `<script type="application/json" id="lab-textos">`, en ese orden de atributos: así lo busca `comprobarTextos`. Dentro de un valor, las comillas dobles se escriben `\"`; en el HTML interior es más cómodo usar comillas simples.
- Todas las claves del diccionario se usan y todas las que se usan están en el diccionario (la prueba de contrato da la lista de las que `faltan` y las que `sobran`).
- No se traducen los números, las fórmulas, los valores en binario o hexadecimal, las órdenes de terminal, los nombres de archivo ni las siglas (BIOS, UEFI, SATA, RAM…).
- Ficha: `<title>`, `description` y `keywords` en el idioma original; `lab:titulo:es`, `lab:descripcion:es` y `lab:etiquetas:es` en castellano. Las pruebas solo exigen que el título en castellano sea distinto del original, pero pon los tres: si falta uno, la tarjeta en castellano mostrará el texto del idioma original.

API del kit disponible en el código del laboratorio:

| API | Para qué |
|---|---|
| `Lab.t({ … })` | Texto del idioma activo (véase el apartado 4 para las claves). |
| `Lab.idioma`, `Lab.original` | Idioma activo (`en`, `ca-valencia` o `es`) y original del laboratorio. |
| `Lab.nombre` | El valor de `data-lab`. |
| `Lab.enIframe` | `true` si el laboratorio está incrustado en una página. |
| `Lab.leer(clave)`, `Lab.guardar(clave, valor)` | Memoria local propia del laboratorio. Los valores son texto; `leer` devuelve `null` si no hay nada. |

`Lab._internos` es privado del kit: no lo uses.

## 6. Pestañas, memoria y práctica

- **Pestañas (patrón WAI-ARIA).** Un contenedor `role="tablist"` con `aria-label`; cada pestaña es un `<button role="tab">` con `id`, `data-tab`, `aria-controls`, `aria-selected` y `tabindex="-1"` (salvo la activa); cada panel es un `role="tabpanel"` con `id`, `aria-labelledby` y `hidden` (salvo el activo). El código del esqueleto resuelve clic, flechas, Inicio y Fin, y mantiene visible la pestaña activa en pantallas estrechas. Para este comportamiento accesible (flechas, `aria-controls`, `tabindex` itinerante) el patrón es el esqueleto del apartado 3, no el laboratorio de referencia `numeracion`: ninguno de los dos laboratorios existentes lo implementa por completo.
- **`data-tab`** es el identificador de la pestaña: minúsculas y guiones, igual en todos los idiomas. Es lo que va detrás de `#` en la URL (`…/<nombre>/#byte`), de modo que Aules puede enlazar a una pestaña y el cambio de idioma la conserva.
- **Memoria.** `Lab.guardar('pestana', id)` al cambiar de pestaña y `Lab.leer('pestana')` al abrir (el hash de la URL manda sobre la memoria). Usa también `Lab.guardar` para el marcador de la práctica. El tamaño de letra lo recuerda el kit.
- **Contenido.** Entre cinco y ocho pestañas de concepto (una por concepto clave), con simuladores en lugar de texto largo, y al final la pestaña de práctica (`data-tab="practica"`).
- **Pestaña de práctica.** Ejercicios generados al azar o de un banco, comprobación inmediata, explicación de la respuesta correcta (no solo «incorrecto»), botón para otro ejercicio y marcador. Hace de test de autoevaluación. La corrección se anuncia con texto y `role="status"`, nunca solo con un color.

## 7. Reglas

1. **Sin `<canvas>`.** La prueba de humo usa happy-dom, que no lo dibuja. Para dibujar usa HTML, CSS y SVG en línea.
2. **Sin peticiones a terceros.** Ninguna dirección `http://` o `https://` en el archivo (ni en comentarios ni en textos), ni CDN, ni Google Fonts, ni analíticas, ni `fetch`, `XMLHttpRequest`, `WebSocket` o `window.claude`. Las fuentes llegan de `/comun/fuentes.css`. Imágenes: SVG en línea. Para mostrar una dirección como texto, escribe los dos puntos como `&#58;` en el HTML (`http&#58;//localhost:8080`) o parte la cadena en JavaScript (`'http:' + '//localhost:8080'`).
3. **Sin `localStorage`** (la prueba rechaza hasta la palabra): usa `Lab.leer` y `Lab.guardar`. Tampoco `sessionStorage`, `indexedDB` ni cookies.
4. **Un solo `index.html`**, con CSS y JavaScript en línea y como máximo unos 150 KB. Pon el JavaScript al final de `<body>` o en un `DOMContentLoaded`, y el kit siempre el primero de `<head>`.
5. **Medidas en `rem` o `em`.** El zoom (A− y A+) cambia el `font-size` de `<html>` entre 12 y 24 px (16 px de partida): no lo fijes en tu CSS y todo lo demás escalará.
6. **Textos:** `data-t` solo en elementos sin hijos, `data-t-html` si el texto lleva marcado y `Lab.t` para lo generado con JavaScript (apartado 5).
7. **Accesible:** manejable con teclado, foco visible, `aria-label` en los botones que solo llevan un símbolo, texto además de color y respeto de `prefers-reduced-motion`.
8. **Claro, oscuro, móvil y proyector.** Variables CSS con `prefers-color-scheme`, diseño que funcione a 375 px de ancho y con el zoom al máximo. La fila de controles (volver, zoom e idioma) debe poder partirse en móvil: `flex-wrap:wrap` en su contenedor, como en `.cabecera` del esqueleto.
9. **Consola limpia.** Sin mensajes de depuración: la prueba de humo falla si aparece la palabra `Error`.
10. **Pantalla completa o incrustado.** La unidad puede mostrarlo en un `<iframe>` (`modo="incrustado"`); en ese caso el kit oculta el enlace `data-lab-volver`. No supongas que ocupa toda la pantalla.

## 8. Identidad visual

Paleta verde placa y ámbar, en claro y en oscuro. Define las variables en `:root` y redefínelas en `@media (prefers-color-scheme: dark)`, como en el esqueleto.

| Variable | Claro | Oscuro | Uso recomendado |
|---|---|---|---|
| `--bg` | `#f2f4ef` | `#0e1411` | Fondo de la página |
| `--surface` | `#ffffff` | `#161f1b` | Paneles, tarjetas y campos |
| `--surface2` | `#e9ede6` | `#1d2823` | Superficies secundarias: pestañas inactivas, avisos, cabeceras de tabla |
| `--ink` | `#16201b` | `#e4ebe6` | Texto principal |
| `--muted` | `#56655d` | `#95a69d` | Texto secundario y bordes de controles |
| `--line` | `#d3dbd4` | `#2b3832` | Separadores y bordes decorativos |
| `--accent` | `#b86e00` | `#f3aa3c` | Ámbar: lo seleccionado, resaltados y anillo de foco |
| `--accent-soft` | `#fbeed8` | `#33260f` | Fondo de lo resaltado o seleccionado |
| `--pcb` | `#1f5244` | `#1a463a` | Verde placa: cabecera y botones primarios, con texto blanco |

| Variable | Fuente | Uso | Pesos disponibles |
|---|---|---|---|
| `--f-display` | Chakra Petch | Títulos, pestañas, números grandes | 500, 600 y 700 |
| `--f-body` | Atkinson Hyperlegible | Texto corrido | 400, 700 y 400 en cursiva |
| `--f-mono` | JetBrains Mono | Binario, hexadecimal, código y órdenes | 400, 600 y 700 |

Cada variable de fuente lleva las del sistema como respaldo (véase el esqueleto). Solo existen esos pesos en `/comun/fuentes.css`; no pidas otros.

Contraste (calculado con la fórmula de WCAG):

- `--ink` y `--muted` dan al menos 5:1 sobre `--bg`, `--surface`, `--surface2` y `--accent-soft`, en claro y en oscuro: sirven para cualquier texto.
- `--accent` como color de texto da solo entre 3,4:1 y 4,0:1 en claro: úsalo en texto grande o en negrita, iconos, subrayados y bordes, no en texto pequeño. En oscuro supera 7,4:1.
- `--pcb` solo como **fondo** con texto blanco (8,9:1 en claro y 10,6:1 en oscuro). En oscuro casi no se distingue de los fondos de la página (entre 1,4:1 y 1,8:1): nunca como color de texto ni de borde.
- No pongas texto pequeño sobre un relleno sólido de `--accent` (en oscuro, `--ink` sobre `--accent` da 1,6:1). Para resaltar usa `--accent-soft` con borde `--accent` y texto `--ink`, como en el esqueleto.
- Los bordes de botones y campos, en `--muted` (más de 6:1 sobre `--surface`). `--line` (1,4:1) es solo decorativo.

## 9. Enlazarlo desde la unidad

En la página de la unidad (`index.md` y, en SOM y Sistemas Informáticos, también `index.es.md`), en la misma carpeta que `laboratorios/`:

```md
::artefacto{src="mi-laboratorio"}
```

- Muestra una tarjeta con el título, la descripción y las etiquetas del laboratorio. Desde la página en castellano enlaza `?lang=es` y usa los metadatos `lab:*:es`.
- Otro título para la tarjeta: `::artefacto[Texto de la tarjeta]{src="mi-laboratorio"}`.
- Incrustado en la página: `::artefacto{src="mi-laboratorio" modo="incrustado" alto="600"}` (el alto va entre 200 y 2000 píxeles).
- `src` es el nombre de la carpeta. Si no existe `laboratorios/<src>/index.html` junto a la página, `npm run build` falla.
- La portada del módulo lleva `::laboratorios`, que lista sola todos los laboratorios del módulo agrupados por unidad: no hace falta añadirlos a mano.

## 10. Verificar

```bash
# 1. Las dos pruebas de laboratorios (rápidas: ejecútalas enteras tras cada cambio)
npx vitest run tests/unit/laboratorios-contrato.test.ts tests/unit/laboratorios-humo.test.ts

# Solo un laboratorio (el filtro busca en «contrato de <nombre> …» y «humo de <nombre> …»)
npx vitest run tests/unit/laboratorios-contrato.test.ts tests/unit/laboratorios-humo.test.ts -t "de <nombre> "

# 2. Todas las pruebas unitarias
npm test

# 3. Compilar (valida ::artefacto y los enlaces) y probar la salida
npm run build
npm run verificar

# 4. Verlo en el navegador
npx astro dev --port 4321
# → http://localhost:4321/docencia/<ciclo>/<módulo>/<unidad>/laboratorios/<nombre>/   (y con ?lang=es)
```

Revisión en el navegador, en el idioma original y con `?lang=es`:

- No queda texto sin traducir y no hay errores en la consola del navegador.
- Todas las pestañas se abren con el ratón, con las flechas, Inicio y Fin, y con `#<pestaña>` en la URL. Al recargar vuelve a la pestaña en la que estabas, y al cambiar de idioma conserva la pestaña.
- Simuladores y práctica: cada botón hace lo que dice, el ejercicio corrige bien (acierto y fallo) y explica el fallo.
- Modo claro y oscuro, 375 px de ancho y zoom A+ al máximo: sin texto cortado ni solapado, sin desplazamiento horizontal de la página.
- Con el teclado se llega a todos los controles y el foco se ve.

**Lo que las pruebas no ven** (compruébalo tú o lo detectará la revisión):

- Que tus cálculos, simuladores y ejercicios sean correctos: solo se carga la página y se pulsan las pestañas.
- `data-t` en un elemento con hijos, traducciones mal escritas y texto que se quedó sin marcar en el idioma original (la prueba mira las claves, no los textos).
- `console.error('…')` sin la palabra `Error` en el texto, JavaScript en archivos externos (no se cargan), CSS (no se aplica), diseño en móvil, contraste y teclado.
- Direcciones que no empiezan por `http://` o `https://` (como `//servidor/archivo.js`) y las llamadas a `fetch`, `window.claude` y similares.
- Que existan `lab:descripcion:es` y `lab:etiquetas:es`: si faltan, la tarjeta en castellano muestra los del idioma original.
- Que haya de verdad tres o más pestañas: la prueba cuenta las apariciones de `role="tab"` en el archivo, también las del CSS y el JavaScript.

## 11. Errores frecuentes

| Qué falla | Causa habitual | Solución |
|---|---|---|
| `declara nombre e idioma original` | Atributos de `<html>` en otro orden o en varias líneas; `data-lab` distinto del nombre de la carpeta; idioma distinto del del módulo; laboratorio fuera de la carpeta de un módulo (se espera `es`). | Usa exactamente la línea `<html lang="…" data-lab="…" data-idioma-original="…">` y comprueba la ruta. |
| `carga el kit antes que cualquier otro script` | Hay otro `<script` antes del kit, por ejemplo el diccionario. | El kit es el primer `<script` del archivo. |
| `usa los recursos comunes y nada externo` | Falta `fuentes.css`; aparece `localStorage`, `<canvas`, `../../assets` o una dirección `http(s)://` (incluso en un comentario o un texto). | Quítalo o reescríbelo (apartado 7). Si es una dirección, el mensaje la enseña. |
| `tiene los controles del kit` | Falta `data-lab-volver`, `data-lab-zoom="+"`, `data-lab-zoom="-"` o, en bilingües, un botón `data-lab-idioma`. | Copia la cabecera del esqueleto. |
| `todas las claves traducidas y ninguna sobrante` | `faltan` (clave usada sin traducción), `sobran` (traducción que nadie usa) o el diccionario no se abre con `<script type="application/json" id="lab-textos">` (entonces faltan todas). | Corrige las claves que lista el mensaje. |
| `ficha completa` | Falta `description` o `keywords`, o el título en castellano falta o es igual al original. | Completa los metadatos. |
| Humo: `… is not defined`, `Cannot read properties of null` | Excepción de JavaScript al cargar o al pulsar una pestaña. | Léela y corrige el código; una función que no existe o un `getElementById` que no encuentra el elemento son lo más común. |
| Humo: `[lab] Falta la traducción de «clave»` | Una clave de `data-t*` no está en `#lab-textos`. | Añádela al diccionario. |
| Humo: la consola contiene `Error` | Mensajes de depuración o un error que el código escribe en la consola. | Quita las trazas. |
| `Unhandled Rejection` | Una promesa rechazada o una función `async` que falla sin capturar. | Captura el error o corrige la causa. |
| `cada carpeta de laboratorio tiene un nombre válido` | La carpeta tiene mayúsculas, guiones bajos o espacios. | Renómbrala con minúsculas, números y guiones. |
| `no hay dos laboratorios con el mismo nombre` | Dos carpetas de laboratorio con el mismo nombre en unidades o módulos distintos. | Cambia el nombre de una (y su `data-lab`). |

## Referencias

- Contrato del kit: comentario de cabecera de `public/comun/lab.js`.
- Pruebas: `tests/unit/laboratorios-contrato.test.ts`, `tests/unit/laboratorios-humo.test.ts` y el descubrimiento de laboratorios en `tests/unit/laboratorios-web.ts`.
- Lectura de la ficha y de las claves de traducción: `src/lib/laboratorios.ts` (`leerFicha`, `comprobarTextos`).
- Módulos e idiomas originales: `src/config/modulos.ts`.
- Diseño de los laboratorios: apartado 6 de `docs/superpowers/specs/2026-10-01-materiales-primer-trimestre-design.md`.

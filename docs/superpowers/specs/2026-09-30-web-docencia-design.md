# Web moisesmas.com — sección «Docencia ciclos formativos»

**Fecha:** 2026-09-30 · **Estado:** diseño aprobado por partes; pendiente de revisión del documento completo

## 1. Objetivo

Publicar en `moisesmas.com` los materiales de los módulos que imparto (teoría, descargas, vídeos y laboratorios interactivos hechos con Claude), gestionados como archivos en un repositorio de GitHub, sin CMS ni servidor propio. La raíz del dominio es una web personal; «Docencia ciclos formativos» es una sección dentro de ella.

## 2. Alcance

**Dentro**
- Portada personal mínima en la raíz.
- Sección Docencia con tres módulos del curso 2026-27:

  | Ciclo | Curso | Módulo | Idioma original | Carpeta |
  |---|---|---|---|---|
  | CFGM SMR | 1º | Sistemas Operativos Monopuesto (SOM) | inglés (`en`) | `docencia/smr/som/` |
  | CFGS DAM semipresencial | 1º | Sistemas Informáticos | valenciano (`ca-valencia`) | `docencia/dam/sistemas-informaticos/` |
  | CFGM SMR | 2º | Proyecto Intermodular | castellano (`es`) | `docencia/smr/proyecto-intermodular/` |

- Versión en castellano de todo el contenido de SOM y Sistemas Informáticos, con conmutador de idioma.
- Integración de los dos laboratorios existentes: **Laboratorio de Bits** (→ SOM) y **Anatomía de la Placa Base** (→ Sistemas Informáticos).
- Publicación en GitHub Pages con dominio propio y HTTPS.

**Fuera (por ahora)**
- Otras secciones de la web personal: se añaden cuando haya contenido; no se crean secciones vacías.
- Material reservado (soluciones, exámenes, bancos GIFT): vive en Aules, nunca en la web.
- Analítica, comentarios, cuentas de usuario.
- Traducción de la interfaz de la web (menús, botones): siempre en castellano.

## 3. Decisiones tomadas

| Tema | Decisión | Motivo |
|---|---|---|
| Generador | Astro + Starlight | Pensado para documentación: menú lateral, buscador (Pagefind), modo oscuro, accesible; admite una portada propia fuera de la plantilla. |
| Formato de contenido | Markdown `.md` (no MDX) | En MDX un `<` o `{` en el texto rompe la compilación; en apuntes de informática es constante. |
| Visibilidad | Web pública; lo reservado, en Aules (Teams como alternativa para archivos grandes) | GitHub Pages gratuito exige repositorio público y no tiene control de acceso. |
| Flujo de edición | Mixto: cambios grandes con Claude Code en el Mac; retoques desde github.com | Archivos simples, cabecera mínima. |
| Estética | Docencia y laboratorios con la identidad de los artefactos; portada personal neutra | Coherencia entre apuntes y laboratorios. |
| Histórico | Solo está online el curso vigente; al acabar el curso, etiqueta git `curso-AAAA-AA` | Permite recuperar o comparar cualquier curso sin infraestructura extra. |

## 4. Estructura y direcciones

```
moisesmas.com/                                   Portada personal (página Astro propia, estilo neutro)
moisesmas.com/docencia/                          «Docencia ciclos formativos»: tarjeta por módulo
moisesmas.com/docencia/smr/som/                  Portada del módulo
moisesmas.com/docencia/smr/som/ud01-…/           Unidad (índice)
moisesmas.com/docencia/smr/som/ud01-…/01-…/      Página de la unidad (original)
moisesmas.com/docencia/smr/som/ud01-…/01-…/es/   La misma página en castellano
moisesmas.com/docencia/smr/som/laboratorios/numeracion/   Laboratorio (dirección fija)
```

- Las direcciones van en castellano en toda la web y no incluyen el curso (1º/2º); el curso figura en la tarjeta del módulo.
- **Menú lateral por módulo**: al estar en un módulo solo se ven sus unidades (complemento `starlight-sidebar-topics`).
- **Portada de módulo**: presentación, evaluación, temporalización, enlace al curso de Aules y lista de unidades.
- **Unidad = carpeta.** El menú se genera a partir de las carpetas; el orden, por el prefijo numérico.

```
src/content/docs/docencia/smr/som/
  index.md
  ud01-introduccion/
    index.md                      presentación y objetivos
    01-sistemas-operativos.md     teoría (original, inglés)
    01-sistemas-operativos.es.md  teoría (castellano)
    practicas.md / practicas.es.md
    recursos.md  / recursos.es.md  descargas, vídeos, enlaces
    imagenes…                     junto al .md que las usa
```

Todos los módulos (incluido Proyecto Intermodular) se organizan por temas o unidades con esta misma estructura.

## 5. Idiomas

- **Configuración por módulo**: cada módulo declara una vez su idioma original (`en`, `ca-valencia` o `es`) y el enlace a su curso de Aules. Las páginas no llevan campo de idioma.
- **Archivos pareados**: `nombre.md` (original) y `nombre.es.md` (castellano). El segundo se publica en `…/nombre/es/` (id generado con `docsLoader({ generateId })`); `index.es.md` se publica en `…/carpeta/es/`. Aplica también a las portadas de módulo y de unidad.
- **Conmutador** junto al título: `English | Castellano` en SOM, `Valencià | Castellano` en Sistemas Informáticos. No aparece en módulos con original en castellano ni en páginas sin pareja.
- **Comportamiento**:
  - Desde el menú lateral siempre se abre el original. Las versiones `.es` no aparecen en el menú.
  - «Página siguiente/anterior» mantiene el idioma: en una página `.es` enlaza a las versiones `.es` vecinas (o al original si la vecina no tiene traducción).
  - No se guarda la preferencia entre visitas.
- **Accesibilidad y buscador**: el `<html lang>` sigue siendo `es` (interfaz en castellano, índice de búsqueda único); el contenido se envuelve en un contenedor con su `lang` real. El buscador encuentra ambas versiones.
- **Traducciones pendientes**: en cada compilación se genera la lista de páginas y laboratorios sin versión en castellano (en el resumen de GitHub Actions). No bloquea la publicación.

## 6. Bloques especiales en Markdown

Se implementan como directivas (`remark-directive`), con la misma sintaxis que las cajas de aviso de Starlight.

| Bloque | Sintaxis | Resultado |
|---|---|---|
| Laboratorio | `::artefacto[Laboratorio de Bits]{src="numeracion"}` | Tarjeta de lanzamiento (título, descripción, etiquetas, «Abrir laboratorio») que abre el laboratorio a pantalla completa en el idioma de la página. Opción `modo="incrustado"` para widgets pequeños (iframe). |
| Descarga | `::descarga[Práctica 3]{src="p3-instalacion.pdf"}` | Tarjeta con icono, tipo y tamaño. |
| Vídeo | `::video{youtube="ID"}` | YouTube `nocookie`: no carga nada de YouTube hasta pulsar «play». |
| Reservado | `:::aules` … `:::` | Caja 🔒 con enlace al curso de Aules del módulo. |

Si un bloque está mal escrito (falta `src`, el archivo no existe), la compilación falla con un mensaje claro que indica archivo y línea. La web publicada no se ve afectada.

## 7. Laboratorios (artefactos)

- **Alojamiento**: dentro del repositorio, servidos por GitHub Pages bajo `moisesmas.com`. claude.ai solo es el taller; los alumnos no necesitan cuenta de Claude.
- **Ubicación**: `public/docencia/<ciclo>/<módulo>/laboratorios/<nombre>/index.html`. Dirección fija, independiente de la unidad, apta para enlazar desde Aules (incluidas las pestañas: `…/numeracion/#kib`).
- **Recursos compartidos** (fuentes woff2, favicon): una sola copia en `public/comun/`, usada por los laboratorios y por la sección Docencia.
- **Contrato de cada laboratorio**:
  1. HTML autónomo: sin peticiones a terceros ni funciones exclusivas de claude.ai (antes de integrar uno nuevo se comprueba).
  2. Idioma: original por defecto; `?lang=es` muestra castellano. Conmutador propio dentro del laboratorio (por si se abre directamente desde Aules), que actualiza el parámetro sin perder el `#pestaña`.
  3. Botón «← Volver»: si se llegó desde la web, vuelve atrás; si no, lleva a la portada del módulo.
  4. Almacenamiento local solo funcional: `lab:zoom` compartido entre laboratorios; `lab:<nombre>:pestaña` propio de cada uno.
- **Trabajo sobre los dos existentes**: traducir (Bits → original en inglés; Placa Base → original en valenciano; castellano actual como alternativa), ajustar rutas `../../assets/`, sustituir «← Recursos» y las claves `lab-tab`/`lab-zoom`. El catálogo antiguo (`index.html` de `recursos-aula`) se descarta.

## 8. Descargas, imágenes y material reservado

- **Descargas**: en la misma carpeta que el `.md` de su unidad (una unidad = una carpeta con todo lo suyo). `src` es relativo a esa carpeta. Una pequeña integración de Astro copia a la salida, en la misma ruta, los archivos de `src/content/docs/` que no son páginas ni imágenes, y los sirve también en la vista previa local. Límite práctico de unos 50 MB por archivo; ISO, máquinas virtuales e instaladores, en Teams/OneDrive, enlazados.
- **Imágenes**: junto al `.md`; Astro las optimiza.
- **Carpeta `privado/`**: ignorada por git (`.gitignore`). Para soluciones y exámenes generados junto a los enunciados; se suben a Aules a mano. Motivo: el repositorio es público y su historial también.

## 9. Identidad visual

- **Docencia + laboratorios**: paleta verde placa (`#1f5244`) + ámbar (`#b86e00` claro / `#f3aa3c` oscuro), fondos `#f2f4ef` / `#0e1411`. Títulos en Chakra Petch, texto en Atkinson Hyperlegible, código en JetBrains Mono. Todas autoalojadas (OFL 1.1). Modo claro y oscuro.
- **Portada personal**: página Astro propia, tipografía de sistema y paleta neutra; comparte solo el pie (nota de privacidad).

## 10. Privacidad

Sin cookies, sin analítica y sin recursos de terceros (salvo YouTube tras pulsar «play»), así que no hace falta aviso de cookies. El pie de página lo indica. Los commits usan el correo anónimo de GitHub (`87723198+moisesmas@users.noreply.github.com`).

## 11. Publicación

- **Repositorio**: `github.com/moisesmas/moisesmas.com`, público, rama `main`.
- **Compilación y despliegue**: GitHub Actions con la acción oficial de Astro → GitHub Pages. Cada cambio en `main` publica en 1-2 minutos. Si la compilación falla, sigue publicada la versión anterior y GitHub avisa por correo.
- **Comprobaciones en cada compilación**: enlaces internos rotos (`starlight-links-validator`), bloques especiales mal formados y resumen de traducciones pendientes.
- **Dominio** (`moisesmas.com`, DNS en DonDominio, ahora en aparcamiento y sin correo):
  1. Verificar el dominio en la cuenta de GitHub (registro TXT `_github-pages-challenge-moisesmas`).
  2. En DonDominio: desactivar el aparcamiento; registros A `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; AAAA `2606:50c0:8000::153`, `8001::153`, `8002::153`, `8003::153`; CNAME `www` → `moisesmas.github.io`.
  3. En GitHub Pages: dominio personalizado `moisesmas.com` + «Enforce HTTPS».
  Los cambios de DNS los hace el titular en el panel de DonDominio, con guía paso a paso.
- **Herramientas en el Mac**: git y Node 22 (ya instalados); `gh` vía Homebrew. El titular inicia sesión en GitHub (`gh auth login`, autorizando en el navegador).

## 12. Flujo de trabajo

- **Con Claude Code**: pedir el cambio → vista previa local (`npm run dev`) → revisión → commit y push → publicación automática.
- **Desde github.com**: editar el `.md` en el navegador → «Commit changes» → publicación automática.
- **Traducciones**: se redacta el original (o el castellano) y Claude genera la otra versión para revisión.
- **Fin de curso**: `git tag curso-2026-27` y push de la etiqueta.

## 13. Verificación

- La compilación local (`npm run build`) termina sin errores ni enlaces rotos.
- Revisión en navegador (escritorio y móvil, modo claro y oscuro) de: portada, Docencia, portada de módulo, página con conmutador (ida y vuelta, siguiente/anterior en castellano), cada bloque especial y los dos laboratorios en ambos idiomas, incluido el «Volver» y los enlaces con `#pestaña`.
- Tras el despliegue: `https://moisesmas.com` con candado, `www` redirige, y los laboratorios se abren directamente desde una URL (simulando el enlace desde Aules).

## 14. Fases

- **A. Web base** (este documento): proyecto Astro, estructura, idiomas, bloques, estética, integración de los dos laboratorios, contenido de muestra mínimo por módulo.
- **B. Despliegue**: repositorio, GitHub Actions, dominio y HTTPS.
- **C. Materiales**: plantillas de unidad y generación de contenidos reales, módulo a módulo. Tendrá su propio ciclo de diseño.

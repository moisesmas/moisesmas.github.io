## Qué aprenderás

:::pasos
- Por qué el software tiene un **propietario**: derechos de autor y licencias
- El **software libre** y sus **cuatro libertades**
- Licencias **propietarias**, **gratuitas**, **copyleft** y **permisivas**
- Qué **puedes hacer** con cada tipo
- Cómo **encontrar y respetar** una licencia
:::

---

## El software está protegido por derechos de autor

:::pasos
- El software es una **obra creativa**, como un libro o una canción
- En España y la UE, el autor tiene los **derechos exclusivos**
- Copiar, distribuir y modificar: **solo con permiso**
:::

---

## Una licencia es un contrato

Una **licencia de software** te da permiso para usar un programa, con condiciones:

:::pasos
- **Quién** puede usarlo: una persona, una empresa, solo uso no comercial
- **En cuántos** dispositivos o para cuántos usuarios
- **Durante cuánto tiempo**: para siempre, suscripción, prueba
- Si puedes ver, modificar, copiar o vender el **código fuente**
:::

---

## La piratería tiene costes reales

:::caution[La piratería tiene costes reales]
Usar un programa de pago sin licencia es **infracción de derechos de autor**: multas, reclamaciones y, en casos graves, sanciones penales.

Los programas «crackeados» además difunden **malware** y no reciben actualizaciones oficiales.

Un técnico es **responsable** de las licencias de los equipos que gestiona.
:::

---

## Software libre: cuatro libertades

| Libertad | Significado |
|---|---|
| **0** | Ejecutar el programa con **cualquier fin** |
| **1** | **Estudiar** cómo funciona y **cambiarlo** (requiere el código fuente) |
| **2** | **Redistribuir** copias |
| **3** | Distribuir tus versiones **modificadas** |

---

## Libre significa libertad, no precio

:::pasos
- El software libre **se puede vender**
- Un programa que no cuesta nada **no es necesariamente** software libre
- La **FSF** define el software libre; la **OSI**, el código abierto
- Otro punto de vista, objetivos parecidos: la mayoría de licencias sirven para ambos
- Se escribe **FOSS**: software libre y de código abierto
:::

---

## Familias de licencias

![Un árbol. Las licencias de software se dividen en software propietario con EULA, software gratuito pero cerrado (freeware, shareware, freemium) y código abierto (copyleft como la GPL y permisivas como MIT, BSD y Apache). Una barra recuerda que gratuito no es lo mismo que software libre.](../licence-families-es.svg)

---

## Software propietario

:::pasos
- El propietario **conserva los derechos**
- Recibes el **derecho de uso** con un **EULA** (contrato de licencia de usuario final)
- Sin código fuente, **sin modificar**, sin redistribuir
- Ejemplos: **Windows, Microsoft Office, Adobe Photoshop**
:::

---

## Modelos de licencia propietaria

| Modelo | Cómo funciona |
|---|---|
| **OEM** | Preinstalada en un equipo nuevo; ligada a él |
| **Retail** | Se compra aparte; un dispositivo cada vez |
| **Volumen** | Un solo acuerdo para muchas instalaciones |
| **Suscripción** | Se paga cada mes o año para seguir usándola |

Lee siempre el **EULA**: las reglas dependen del producto.

---

## Freeware, shareware y freemium

:::pasos
- **Freeware**: gratuito, código **cerrado**; puede limitar el uso («no comercial»)
- **Shareware / prueba**: tiempo o funciones limitados, luego **pagas**
- **Freemium**: versión básica gratuita, funciones avanzadas **de pago**
- Ninguno es software libre: **sin código fuente**
:::

---

## Copyleft o permisiva

| | Copyleft | Permisiva |
|---|---|---|
| Idea | La libertad debe **conservarse** | Puedes hacer **casi todo** |
| Condición | **Misma licencia** y código fuente | Mantener el aviso y el texto de la licencia |
| Licencias | GNU **GPL** | **MIT, BSD, Apache 2.0** |
| Ejemplos | Núcleo Linux, GIMP, WordPress, Blender | FreeBSD, Apache HTTP Server, Node.js |

---

## Licencias intermedias

:::pasos
- **MPL** (Mozilla Firefox, LibreOffice)
- Hay que compartir los cambios hechos en los **archivos licenciados**
- Se pueden **mezclar** con otro código
:::

---

## Creative Commons es para contenido, no para software

:::note[Creative Commons es para contenido, no para software]
Para textos, imágenes, música y vídeos. Cuatro condiciones: **BY** (nombrar al autor), **NC** (no comercial), **SA** (misma licencia), **ND** (sin obras derivadas).

Para software, usa una licencia pensada para código: **GPL** o **MIT**.
:::

---

## ¿Qué puedo hacer con cada licencia?

| Tipo de licencia | Leer y modificar el código | Compartir copias | Compartir tus cambios |
|---|---|---|---|
| **Propietaria (EULA)** | No | No | No aplica |
| **Freeware** | No | Solo si el autor lo permite | No aplica |
| **Shareware / prueba** | No | A menudo sí, sin cambios | No aplica |
| **Copyleft (GPL)** | Sí | Sí | **Sí**, con la misma licencia |
| **Permisiva (MIT, BSD, Apache)** | Sí | Sí | **No**, mantén el aviso |

---

## Tres errores frecuentes

:::pasos
1. **«Gratuito» no es «software libre»**: el freeware no da libertades
2. **«Código abierto» no es «no comercial»**: las empresas venden soporte y alojamiento
3. **«Lo descargué, así que puedo usarlo»**: comprueba las condiciones de uso
:::

---

## Antes de instalar un programa: cinco preguntas

:::pasos
1. **¿Quién es el autor?** Descarga de la fuente oficial
2. **¿Dónde está el texto de la licencia?**
3. **¿Qué permite?** Uso, dispositivos, usuarios, duración
4. **¿Necesito un registro?** Lleva un **inventario de licencias**
5. **¿Hay una alternativa libre?**
:::

---

## Dónde encontrar el texto de la licencia

:::pasos
- En el **instalador**
- En el menú **Acerca de** o **Ayuda**
- En un archivo `LICENSE` o `COPYING`
- Debian y Ubuntu: `/usr/share/doc/<paquete>/copyright`
- Alternativas: **LibreOffice**, **GIMP**, **Linux**; compara compatibilidad, soporte y formación
:::

---

## Pruébalo

::laboratorio[Detective de licencias]{src="explorador-del-sistema" pestana="licences"}

---

## Resumen

- El software está protegido por **derechos de autor**; la **licencia** dice qué puedes hacer
- **Software libre**: cuatro libertades; libre significa **libertad**, no precio
- **Propietaria**, **gratuita**, **copyleft**, **permisiva**
- **Copyleft** mantiene la misma licencia; **permisiva** solo pide el aviso
- Lee la licencia y lleva un **inventario**

[Actividades de la unidad →](/docencia/smr/som/ud01-introduccion/actividades/es/)

---

## Créditos

Estas diapositivas resumen los apuntes del curso de SOM de Moisés Mas Rocamora, Daniel Álvarez Santamaría y Jana Taboada León, con licencia **CC BY-NC-SA 4.0**. Se comparten con la misma licencia.

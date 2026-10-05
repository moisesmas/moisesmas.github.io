---
title: "4. Licencias de software"
description: "Software libre y software propietario, los principales tipos de licencia, qué permite cada una y cómo encontrar y respetar la licencia de un programa."
---

Cada vez que pulsas «Acepto» durante una instalación, aceptas un contrato. Un técnico debe saber qué permiten esos contratos, porque instalar software sin la licencia adecuada puede costarle mucho dinero a una empresa y meterte a ti en problemas. En esta página aprenderás los principales tipos de licencia de software y cómo elegirlas y respetarlas.

:::tip[Cómo usar esta página]
1. Lee los apartados 1 a 5 (unos 35 minutos).
2. Practica con la pestaña **Detective de licencias** del laboratorio [Explorador del sistema](/docencia/smr/som/ud01-introduccion/laboratorios/explorador-del-sistema/?lang=es#licences).
3. Responde a las preguntas del final y haz la [actividad 7](/docencia/smr/som/ud01-introduccion/actividades/es/).
:::

## 1. Derechos de autor y licencias

El software es una obra creativa y está protegido por los **derechos de autor**, igual que un libro o una canción. En España y en la Unión Europea, el autor tiene por defecto los derechos exclusivos de copiar, distribuir y modificar el programa. Nadie más puede hacerlo sin permiso.

Una **licencia de software** es el contrato en el que el titular te da permiso para usar el programa bajo ciertas condiciones. La licencia puede decir:

- quién puede usar el programa (una persona, una empresa, solo uso no comercial);
- en cuántos dispositivos o para cuántos usuarios;
- durante cuánto tiempo (para siempre, una suscripción, una prueba);
- si puedes ver el código fuente, modificarlo, copiarlo o venderlo.

Para usar un programa legalmente debes aceptar y cumplir su licencia. El texto de la licencia es la única fuente fiable: palabras como «libre» o «abierto» pueden significar cosas distintas.

:::caution[La piratería tiene costes reales]
Usar una copia de un programa de pago sin licencia es una **infracción de los derechos de autor** (piratería). Puede acarrear multas y reclamaciones para las empresas y, en casos graves, sanciones penales. Además, los programas «crackeados» son una vía habitual de propagación de malware y no reciben actualizaciones oficiales. Como futuro técnico serás responsable de las licencias de los equipos que administres.
:::

## 2. Software libre y código abierto

La idea de **software libre** la definió la Free Software Foundation (FSF). Un programa es software libre si sus usuarios tienen cuatro libertades básicas:

| Libertad | Significado |
|---|---|
| **Libertad 0** | Ejecutar el programa para cualquier propósito. |
| **Libertad 1** | Estudiar cómo funciona el programa y cambiarlo. Para esto hace falta acceso al **código fuente**. |
| **Libertad 2** | Redistribuir copias, para ayudar a otras personas. |
| **Libertad 3** | Distribuir copias de tus versiones modificadas a otros. |

*Libre* significa *libertad*, no *precio*. El software libre se puede vender, y un programa que no cuesta nada no es necesariamente software libre.

La **Open Source Initiative** (OSI) publica la Definición de Código Abierto. Tiene objetivos parecidos pero otro punto de vista: destaca los beneficios prácticos de un modelo de desarrollo abierto (calidad, seguridad, colaboración). En la práctica, la mayoría de las licencias son aceptadas por ambos movimientos, por eso se suele escribir **FOSS** (*free and open-source software*, software libre y de código abierto).

## 3. Tipos de licencia

### 3.1 Software propietario

El titular conserva los derechos. Tú compras o recibes el **derecho de uso** del programa bajo un **EULA** (*End-User Licence Agreement*, contrato de licencia de usuario final). No puedes ver el código fuente, modificarlo ni redistribuirlo. Ejemplos: Windows, Microsoft Office, Adobe Photoshop.

Las licencias propietarias vienen en varios modelos:

| Modelo | Cómo funciona |
|---|---|
| **OEM** | Viene preinstalada con un ordenador nuevo y está ligada a ese ordenador. |
| **Retail** (en caja o descarga) | Se compra aparte; normalmente se puede pasar a otro ordenador, pero se usa en un dispositivo a la vez. |
| **Por volumen** | Para empresas y centros educativos: un acuerdo para muchas instalaciones. |
| **Suscripción** | Pagas cada mes o cada año para seguir usándolo (Microsoft 365, Adobe Creative Cloud). |

Las reglas exactas dependen del producto y del contrato. Lee siempre el EULA.

### 3.2 Freeware, shareware y freemium

- **Freeware:** gratuito, pero con el código fuente cerrado y sin permiso para cambiarlo ni venderlo. El autor puede añadir condiciones, por ejemplo «solo uso personal y no comercial». Ejemplos: Adobe Acrobat Reader, IrfanView (gratuito para uso no comercial).
- **Shareware / prueba:** puedes probarlo durante un tiempo limitado o con funciones limitadas y después tienes que pagar. Ejemplo: WinRAR, que pide una licencia al terminar el periodo de prueba.
- **Freemium:** una versión básica gratuita y funciones avanzadas de pago. Muchas aplicaciones móviles funcionan así.

Ninguno de estos es software libre en el sentido de la FSF, porque no tienes acceso al código fuente.

### 3.3 Licencias de código abierto: copyleft y permisivas

Te dan las libertades del software libre. Se diferencian en lo que pasa con tus cambios:

| | **Copyleft** | **Permisiva** |
|---|---|---|
| Idea | Hay que preservar la libertad. Si distribuyes un programa modificado o derivado, debes hacerlo bajo la **misma licencia** y entregar el código fuente. | Puedes hacer casi cualquier cosa, incluso incluir el código en un producto de código cerrado. |
| Condición principal | Misma licencia, código fuente disponible | Mantener el aviso de derechos de autor y el texto de la licencia |
| Licencias típicas | GNU **GPL** | **MIT**, **BSD**, **Apache 2.0** |
| Ejemplos | Núcleo Linux (GPL v2), GIMP, WordPress, Blender | FreeBSD, Apache HTTP Server, Node.js |

Otras licencias están a medio camino. Por ejemplo, Mozilla Firefox y LibreOffice usan la MPL, que pide compartir los cambios hechos en los archivos con esa licencia pero permite mezclarlos con otro código.

:::note[Creative Commons es para contenidos, no para software]
Las licencias **Creative Commons** se usan para textos, imágenes, música y vídeos. Combinan cuatro condiciones: **BY** (atribución: nombrar al autor), **NC** (solo uso no comercial), **SA** (compartir igual: tus obras derivadas usan la misma licencia) y **ND** (sin obras derivadas). Por ejemplo, los apuntes del curso en los que se basa esta unidad usan **CC BY-NC-SA 4.0**. Para software es mejor una licencia pensada para código, como la GPL o la MIT.
:::

## 4. ¿Qué puedo hacer con cada licencia?

| Tipo de licencia | Usarlo | Leer el código fuente | Modificarlo | Compartir copias | Venderlo | ¿Debes compartir tus cambios? |
|---|---|---|---|---|---|---|
| **Propietaria (EULA)** | Sí, según el EULA | No | No | No | No | No procede |
| **Freeware** | Sí, gratis | No | No | Solo si el autor lo permite | No | No procede |
| **Shareware / prueba** | Sí, por tiempo limitado o con funciones limitadas | No | No | A menudo sí, sin cambios | No | No procede |
| **Código abierto copyleft (GPL)** | Sí | Sí | Sí | Sí | Sí | **Sí**, bajo la misma licencia |
| **Código abierto permisiva (MIT, BSD, Apache)** | Sí | Sí | Sí | Sí | Sí | **No**, pero mantén el aviso |

Tres errores frecuentes:

1. **«Gratis» no es «software libre».** El freeware no cuesta nada pero no te da ninguna de las cuatro libertades.
2. **«Código abierto» no es «no comercial».** Hay empresas que venden soporte, alojamiento y versiones certificadas de software de código abierto, y algunas lo usan en productos de pago.
3. **«Lo he descargado, así que puedo usarlo».** Comprueba las condiciones de uso: algunos programas gratuitos lo son solo para estudiantes o para uso no comercial.

## 5. Cómo averiguar y respetar una licencia

Hazte estas preguntas antes de instalar un programa para un cliente o un centro educativo:

1. **¿Quién es el autor o el titular?** Descarga desde la web oficial o el repositorio oficial.
2. **¿Dónde está el texto de la licencia?** Mira en el instalador, en el menú *Acerca de* o *Ayuda*, en un archivo llamado `LICENSE` o `COPYING` en la carpeta del programa o en su repositorio. En Debian y Ubuntu, el archivo `/usr/share/doc/<paquete>/copyright` enumera las licencias de cada paquete instalado.
3. **¿Qué permite?** Revisa el tipo de uso (personal, comercial, educativo), el número de dispositivos y de usuarios, y la duración.
4. **¿Necesito llevar un registro?** En una empresa, mantén un **inventario de licencias**: qué programa está instalado en qué ordenador, con qué licencia y hasta cuándo. Las auditorías son frecuentes.
5. **¿Hay una alternativa libre?** Para muchas tareas existe una buena opción de código abierto: LibreOffice en lugar de una suite ofimática de pago, GIMP en lugar de un editor de fotos, Linux en lugar de un SO de pago. Compara no solo el precio, sino también la compatibilidad, el soporte y la formación.

## Comprueba lo aprendido

1. ¿Cuáles son las cuatro libertades del software libre?

   <details>
   <summary>Respuesta</summary>

   Libertad 0: ejecutar el programa para cualquier propósito. Libertad 1: estudiar cómo funciona y cambiarlo. Libertad 2: redistribuir copias. Libertad 3: distribuir tus versiones modificadas.

   </details>

2. ¿Un programa gratuito es siempre software libre? Pon un ejemplo.

   <details>
   <summary>Respuesta</summary>

   No. El freeware, como Adobe Acrobat Reader, no cuesta nada, pero su código fuente está cerrado y no puedes modificarlo ni redistribuirlo, así que no es software libre.

   </details>

3. Un desarrollador quiere incluir una biblioteca con licencia MIT en un producto comercial de código cerrado. ¿Está permitido? ¿Y si la biblioteca usara la GPL?

   <details>
   <summary>Respuesta</summary>

   Con la licencia MIT está permitido, siempre que el desarrollador mantenga el aviso de derechos de autor y el texto de la licencia. Con la GPL (copyleft), si el desarrollador distribuye el producto, toda la obra derivada tendría que distribuirse bajo la GPL con su código fuente, así que no es compatible con un producto de código cerrado.

   </details>

4. ¿Qué significa **SA** en CC BY-NC-SA?

   <details>
   <summary>Respuesta</summary>

   *Share-alike* (compartir igual): si adaptas la obra, debes compartir tu versión bajo la misma licencia.

   </details>

5. Un centro educativo quiere poner el mismo programa de diseño de pago en 30 ordenadores. Ha comprado una licencia retail. ¿Qué debe hacer el técnico?

   <details>
   <summary>Respuesta</summary>

   No instalarlo en todos: una licencia retail suele permitir un solo dispositivo. El centro necesita 30 licencias o una licencia por volumen o educativa, o puede elegir una alternativa con una licencia libre adecuada. El técnico debe leer el EULA y anotar las licencias en un inventario.

   </details>

## Glosario

| English | Castellano |
|---|---|
| copyright | derechos de autor (propiedad intelectual) |
| licence | licencia |
| EULA (End-User Licence Agreement) | contrato de licencia de usuario final |
| proprietary software | software propietario |
| free software | software libre |
| open source | código abierto |
| source code | código fuente |
| freeware | software gratuito (freeware) |
| shareware / trial | software de prueba (shareware) |
| copyleft | copyleft |
| permissive licence | licencia permisiva |
| subscription | suscripción |
| piracy | piratería |
| attribution | atribución, reconocimiento |
| licence inventory | inventario de licencias |

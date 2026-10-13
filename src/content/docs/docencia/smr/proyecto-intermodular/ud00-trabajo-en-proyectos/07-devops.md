---
title: "1.3.3 DevOps"
description: "Qué es DevOps: la cultura que une desarrollo y operaciones, la integración y la entrega continuas, el pipeline, la automatización, la infraestructura como código y la monitorización, con un ejemplo para Byte Alacant."
---

Un equipo programa durante semanas una mejora del portal de incidencias. Cuando por fin la entrega a quien administra los servidores, nada funciona: las versiones de las bibliotecas no coinciden, la configuración es distinta y nadie sabe de quién es el fallo. «En mi ordenador funcionaba», dice el desarrollador. «Pues aquí no», responde el administrador. **DevOps** es la respuesta a este problema clásico: que quien construye el software y quien lo mantiene funcionando trabajen como un solo equipo, con herramientas que automaticen el camino entre el código y el usuario.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** 40 minutos de lectura y 20 de práctica.

1. Lee las secciones 1 y 2 para entender la idea y la cultura.
2. Lee las secciones 3 y 4 (integración, entrega y pipeline) y recorre la pestaña «DevOps» del [laboratorio](/docencia/smr/proyecto-intermodular/ud00-trabajo-en-proyectos/laboratorios/agil-en-practica/#devops), provocando fallos en distintos pasos.
3. Lee las secciones 5 y 6 y responde a las preguntas.
:::

## 1. Qué es DevOps

**DevOps** es la unión de *Development* (desarrollo) y *Operations* (operaciones: instalar, configurar, vigilar y mantener los sistemas). No es un cargo ni una herramienta que se compra: es un conjunto de **cultura, prácticas y automatización** cuyo objetivo es entregar cambios al usuario con rapidez **y** con fiabilidad.

Tradicionalmente los dos grupos tenían objetivos enfrentados:

| Grupo | Lo que busca | Consecuencia |
|---|---|---|
| **Desarrollo** | Cambiar cosas y entregar novedades | Quiere desplegar a menudo |
| **Operaciones** | Que todo siga funcionando, sin sorpresas | Prefiere no tocar nada |

El resultado era una «pared» entre ambos. DevOps derriba la pared: el equipo es responsable **de extremo a extremo**, desde que se escribe una línea de código hasta que funciona en producción y se comprueba que lo hace bien. Una frase muy repetida lo resume: *«you build it, you run it»* (quien lo construye, lo mantiene en marcha).

### Relación con lo ágil

La metodología ágil mejora cómo se **construye** el producto en ciclos cortos; DevOps hace posible **entregar** esos ciclos cortos sin sufrir. Si cada dos semanas hay que hacer un despliegue manual de una noche entera, la agilidad se rompe en la entrega. Por eso los dos enfoques se complementan.

## 2. Cultura y valores

Se suele resumir la cultura DevOps con la sigla **CALMS**:

| Letra | Significa | Qué implica |
|---|---|---|
| **C** | *Culture* (cultura) | Colaboración, confianza y responsabilidad compartida; los fallos se analizan sin buscar culpables |
| **A** | *Automation* (automatización) | Todo lo repetitivo (compilar, probar, desplegar) lo hace una máquina |
| **L** | *Lean* (lean/ajustado) | Trabajar en lotes pequeños, eliminar esperas y desperdicio |
| **M** | *Measurement* (medición) | Decidir con datos, no con intuiciones |
| **S** | *Sharing* (compartir) | Compartir conocimiento, herramientas y lecciones aprendidas |

Dos hábitos culturales especialmente valiosos:

- **Cambios pequeños y frecuentes.** Desplegar un cambio pequeño cada día es *menos* arriesgado que desplegar cien cambios juntos cada seis meses: si algo falla, sabes cuál fue la causa.
- **Análisis sin culpables.** Cuando algo se rompe en producción, el equipo se pregunta *qué falló en el proceso* y cómo evitarlo, no *quién se equivocó*. Si la gente teme ser señalada, esconderá los problemas.

## 3. Integración continua y entrega continua

Estas dos prácticas son el corazón técnico de DevOps. Se abrevian **CI/CD**.

### 3.1 Integración continua (CI)

Cada persona del equipo trabaja en su copia del código y la **integra con la del resto con mucha frecuencia** (varias veces al día). Cada vez que se sube un cambio, un sistema automático:

1. descarga el código,
2. lo **compila o construye** (si hace falta),
3. ejecuta las **pruebas automáticas**,
4. avisa al equipo si algo falla.

Así los errores de integración se descubren en minutos, no semanas después. La regla de oro: **si la construcción falla, arreglarla es la prioridad del equipo.** Para que funcione, el código se guarda en un repositorio (véase 2.2 Control de versiones con Git).

### 3.2 Entrega continua y despliegue continuo

Con el código integrado y probado, se da el siguiente paso: dejarlo siempre **listo para ser publicado**.

| Práctica | Qué hace | Quién da la orden final |
|---|---|---|
| **Entrega continua** (*Continuous Delivery*) | Cada cambio que pasa todas las pruebas queda **listo** para publicar en producción | Una persona, pulsando un botón (aprobación manual) |
| **Despliegue continuo** (*Continuous Deployment*) | Cada cambio que pasa todas las pruebas se **publica automáticamente** en producción | Nadie: es totalmente automático |

Los términos se confunden mucho porque ambos se abrevian CD. La diferencia es sencilla: en la entrega continua *se podría* publicar en cualquier momento; en el despliegue continuo *se publica* solo.

## 4. El pipeline

Un **pipeline** (tubería o cadena) es la secuencia automática de pasos que recorre un cambio desde que se sube el código hasta que llega al usuario. Si un paso falla, el pipeline **se detiene** y avisa: el cambio malo no avanza.

Un pipeline típico para el portal de incidencias de *Reparaciones Byte Alacant* (empresa ficticia):

| Paso | Qué hace | Si falla… |
|---|---|---|
| 1. **Código** | Una persona sube un cambio al repositorio | — |
| 2. **Construcción** | Se compila o se empaqueta la aplicación | El código no se puede construir: se rechaza |
| 3. **Pruebas unitarias** | Se comprueba cada función por separado | Hay un fallo lógico: se rechaza |
| 4. **Análisis de calidad** | Se revisa el estilo, errores comunes y dependencias con vulnerabilidades conocidas | Hay riesgos de calidad o seguridad: se rechaza |
| 5. **Despliegue en pruebas** | Se instala en un entorno que imita la producción | La instalación no funciona: se rechaza |
| 6. **Pruebas de integración** | Se prueba el conjunto (formulario, base de datos, avisos) | Algo no encaja con el resto: se rechaza |
| 7. **Aprobación** (solo en entrega continua) | Alguien revisa y da luz verde | Se puede dejar esperando |
| 8. **Despliegue en producción** | Se publica para los usuarios reales | Se puede volver atrás (*rollback*) |
| 9. **Monitorización** | Se vigila que todo funcione con datos reales | Si hay problemas, alertas y vuelta atrás |

Observa que **cada paso es una puerta**: cuanto antes se descubre el problema, más barato es corregirlo. A esta idea se le llama a veces *shift left* («mover a la izquierda»): llevar las pruebas lo más pronto posible.

### Entornos

Un cambio no va directo a producción. Suele pasar por entornos cada vez más parecidos al real:

| Entorno | Para qué sirve |
|---|---|
| **Desarrollo** | El ordenador de cada persona o un entorno compartido para probar ideas |
| **Pruebas / preproducción** | Una copia lo más parecida posible a la producción para probar el conjunto |
| **Producción** | Lo que usan los clientes de verdad |

### Cuando algo sale mal en producción

Ninguna prueba detecta todo. Por eso existen dos redes de seguridad:

- **Rollback:** volver rápidamente a la versión anterior que funcionaba.
- **Despliegues graduales:** primero se publica para un grupo pequeño de usuarios y solo si todo va bien se extiende a todos.

## 5. Otras prácticas DevOps

### 5.1 Automatización de pruebas

Probar a mano cada cambio es lento y se olvida algo. Las **pruebas automáticas** (unitarias, de integración, de extremo a extremo) se ejecutan en el pipeline. Una prueba automática es un pequeño programa que comprueba que otro programa se comporta como debe. Las pruebas son lo que da confianza para cambiar cosas.

### 5.2 Infraestructura como código

En lugar de configurar los servidores a mano con clics, se describe la infraestructura (máquinas, redes, programas instalados) en **archivos de texto** que se guardan en el repositorio. Ventajas: es repetible, se puede revisar como el código, deja historial y permite recrear un servidor idéntico en minutos. No hace falta aprender ahora ninguna herramienta concreta; basta con la idea.

### 5.3 Control de versiones de todo

No solo el código: también la configuración, los *scripts* de despliegue y la documentación se versionan. Un mismo repositorio permite saber *qué cambió, quién y cuándo*. Las versiones publicadas se numeran con un criterio claro (véase 1.3.4 Versionado semántico).

### 5.4 Monitorización y retroalimentación

Publicar no es el final: hay que **observar** el sistema. La monitorización recoge datos como:

- **Disponibilidad:** ¿el portal responde?
- **Rendimiento:** ¿tarda más de lo normal en abrir una incidencia?
- **Errores:** ¿cuántos fallos por hora?
- **Uso:** ¿qué funciones se utilizan de verdad?

Con alertas automáticas, el equipo se entera de un problema antes que el cliente. Y los datos de uso alimentan el Product Backlog: es el bucle de mejora continua de lo ágil.

### 5.5 Seguridad integrada

A veces se habla de **DevSecOps**: incorporar la seguridad al pipeline desde el principio (análisis de dependencias, revisión de configuraciones, gestión segura de contraseñas y secretos), en lugar de revisarla al final.

## 6. Medir si va bien

Cuatro medidas muy utilizadas para valorar el rendimiento de un equipo de entrega son:

| Métrica | Qué mide |
|---|---|
| **Frecuencia de despliegue** | Cada cuánto se publican cambios |
| **Plazo de entrega de un cambio** | Desde que se sube el código hasta que está en producción |
| **Porcentaje de cambios fallidos** | Qué parte de los despliegues provoca un problema |
| **Tiempo de recuperación** | Cuánto se tarda en restaurar el servicio tras un fallo |

Las dos primeras miden la **velocidad**; las dos últimas, la **estabilidad**. DevOps busca mejorar ambas a la vez, no sacrificar una por la otra. (Estas métricas proceden de la investigación llamada DORA, que se actualiza con el tiempo; lo importante aquí es la idea.)

:::note[Las interfaces cambian]
Hay muchos productos para ejecutar pipelines y vigilar sistemas, y todos evolucionan rápido. En este curso no hace falta dominar ninguno: basta con entender el flujo. Si usas alguno, consulta su ayuda oficial.
:::

## Comprueba lo aprendido

1. ¿Qué diferencia hay entre entrega continua y despliegue continuo?

   <details>
   <summary>Respuesta</summary>

   En la entrega continua cada cambio que pasa las pruebas queda listo para publicar y una persona aprueba la publicación. En el despliegue continuo se publica automáticamente sin intervención humana.
   </details>

2. Un cambio falla en las pruebas unitarias. ¿Qué hace el pipeline con los pasos siguientes?

   <details>
   <summary>Respuesta</summary>

   Se detiene: no ejecuta los pasos siguientes y avisa al equipo. El cambio no avanza hacia producción.
   </details>

3. ¿Por qué es menos arriesgado desplegar un cambio pequeño cada día que cien cambios cada seis meses?

   <details>
   <summary>Respuesta</summary>

   Porque si algo falla, la causa está en un cambio pequeño y es fácil de localizar y deshacer; con cien cambios juntos hay muchas posibles causas.
   </details>

4. ¿Qué es un rollback?

   <details>
   <summary>Respuesta</summary>

   Volver a la versión anterior que funcionaba cuando una publicación nueva produce problemas.
   </details>

5. Da dos ventajas de describir la infraestructura como código en un repositorio.

   <details>
   <summary>Respuesta</summary>

   Es repetible (se puede recrear un servidor igual), se puede revisar y tiene historial de cambios; también reduce errores manuales.
   </details>

## Glosario

| Término | Definición |
|---|---|
| **DevOps** | Cultura y prácticas que unen desarrollo y operaciones para entregar software con rapidez y fiabilidad. |
| **CI (integración continua)** | Integrar y probar automáticamente el código del equipo con mucha frecuencia. |
| **CD** | Siglas de entrega continua o de despliegue continuo, según el contexto. |
| **Pipeline** | Secuencia automática de pasos desde el código hasta la producción. |
| **Entorno** | Lugar donde se ejecuta la aplicación: desarrollo, pruebas o producción. |
| **Producción** | Entorno que usan los usuarios reales. |
| **Rollback** | Vuelta a la versión anterior tras un fallo. |
| **Infraestructura como código** | Descripción de servidores y redes en archivos versionables. |
| **Monitorización** | Observación continua de la disponibilidad, rendimiento y errores. |
| **DevSecOps** | Integración de la seguridad en todo el ciclo DevOps. |

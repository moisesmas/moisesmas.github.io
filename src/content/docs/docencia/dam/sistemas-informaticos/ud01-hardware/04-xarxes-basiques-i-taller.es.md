---
title: "4. Redes básicas y taller"
description: "Tipos de redes, topologías, medios, switch y router, mapas físicos y lógicos, seguridad y prevención de riesgos en el taller, periféricos y guion de la práctica presencial."
---

Esta página prepara la sesión presencial: tocarás hardware real, así que conviene llegar con las nociones de red claras y, sobre todo, sabiendo cómo trabajar con seguridad. Las redes se tratan a fondo en la unidad 5; aquí tienes la base para entender la práctica y los mapas de una instalación.

:::tip[Cómo trabajar esta página]
**Tiempo orientativo:** unos 75 minutos de lectura antes de la presencial.

1. Lee las secciones 1 a 6 (redes) y la sección 9 (el guion de la práctica).
2. **La sección 7 (seguridad en el taller) es lectura obligatoria antes de tocar ningún equipo.**
3. Haz la actividad 7 (mapas de una red). La actividad 8 es la ficha que completarás durante la presencial.
4. Lleva ropa cómoda y recógete el pelo si lo llevas largo.
:::

## 1. Qué es una red

Una red informática es un conjunto de dispositivos (ordenadores, servidores, impresoras, móviles…) conectados entre sí por cables o señales inalámbricas para compartir información y recursos: archivos, impresoras, una conexión a Internet o la potencia de cálculo de otros equipos.

## 2. Tipos de redes según su alcance

| Tipo | Alcance | Ejemplo |
|---|---|---|
| PAN (*Personal Area Network*) | Unos pocos metros | El móvil con los auriculares por Bluetooth |
| LAN (*Local Area Network*) | Un edificio o varios cercanos | La red del instituto o la de una casa |
| MAN (*Metropolitan Area Network*) | Una ciudad | Red municipal que conecta varios centros |
| WAN (*Wide Area Network*) | Grandes distancias, incluso entre países | Internet, la WAN más grande que existe |

## 3. Topologías

La **topología** es la manera en que se organizan las conexiones entre los dispositivos. Afecta al coste de instalación, a la facilidad para encontrar averías y a la **tolerancia a fallos** (qué pasa con el resto si falla un cable o un equipo).

![Las cuatro topologías de red: bus (un cable compartido), estrella (cada equipo al switch central), anillo (cada equipo con dos vecinos) y malla (cada equipo con todos los demás).](./topologies-es.svg)

| Topología | Cómo se conecta | Ventaja | Inconveniente |
|---|---|---|---|
| Bus | Todos los equipos comparten un único cable | Muy económica, poco cableado | Si falla el cable central, cae toda la red |
| Estrella | Todos los equipos a un dispositivo central (switch) | Un fallo en un cable solo afecta a ese equipo | Si falla el switch, cae toda la red |
| Anillo | Cada equipo con los dos vecinos, en círculo | Reparto equitativo del tráfico | Un punto roto puede interrumpir el anillo |
| Malla | Cada equipo con varios (o todos) los demás | Máxima redundancia | Cara y compleja |

Casi todas las redes locales actuales (la del instituto incluida) son en **estrella**, con uno o varios switches: una avería afecta a un solo puesto de trabajo. El bus (cable coaxial compartido) y el anillo pertenecen a redes antiguas. Una malla completa de *n* equipos necesita **n × (n − 1) ÷ 2 enlaces**: 8 equipos, 28 cables; 20 equipos, 190. Por eso solo se usa de forma parcial, por ejemplo entre los switches principales.

## 4. Medios de transmisión y conectores

| Medio | Conector | Velocidad típica | Uso habitual |
|---|---|---|---|
| Par trenzado (UTP) | RJ45 | 1 Gb/s (hasta 10 Gb/s en categorías avanzadas) | Redes LAN cableadas: el más habitual |
| Fibra óptica | SC, LC | Varios Gb/s a gran distancia | Troncales, centros de datos, largas distancias |
| Wi-Fi | Ondas de radio, sin conector | Desde cientos de Mb/s a varios Gb/s, según el estándar | Movilidad y comodidad; menos estable que el cable |

- El cable UTP admite como máximo **100 m** por tramo. Las categorías (5e, 6, 6A…) indican la velocidad que soporta; la 6A llega a los 10 Gb/s en los 100 m.
- El conector que llamamos RJ45 es técnicamente un 8P8C.
- La fibra transmite **luz**, no electricidad: llega más lejos y no sufre interferencias eléctricas. La **monomodo** sirve para largas distancias y la **multimodo** para distancias cortas.

## 5. Dispositivos básicos

- **Switch (conmutador):** conecta equipos de una misma red local. Un *hub*, más antiguo, repetía todo el tráfico a todos los puertos; el switch aprende qué equipo hay en cada puerto y envía el tráfico solo al destinatario, de modo que la red es más eficiente y más segura.
- **Router (enrutador):** conecta redes distintas y decide por dónde debe pasar cada paquete (por ejemplo, para salir de la red de un aula hacia Internet). El «router» que tienes en casa es, en realidad, router, switch y punto de acceso Wi-Fi en un solo aparato.

## 6. Mapas físicos y lógicos

Documentar una red es imprescindible para cualquier administrador, y se hace con dos mapas complementarios:

- El **mapa físico** muestra la disposición real: en qué armario está cada switch, por qué canaleta pasa cada cable, en qué sala está cada toma. Es el que necesitas para **localizar una avería**.
- El **mapa lógico** muestra cómo circula la información, independientemente de dónde esté cada equipo: qué direcciones IP tiene, a qué redes pertenece, qué camino sigue el tráfico. Es el que necesitas para **entender o depurar el funcionamiento**.

![Mapa físico y mapa lógico de un pequeño despacho: el físico muestra el armario con el switch y el router, las tomas del aula y del despacho y los cables; el lógico muestra una sola red 192.168.1.0 con la IP de cada equipo.](./mapa-fisic-i-logic-es.svg)

Un mismo edificio puede tener un cableado físico muy sencillo (todo en estrella hacia un armario) y, encima de él, una organización lógica compleja (redes distintas para profesorado, alumnado y administración, compartiendo los mismos cables).

## 7. El taller: seguridad y prevención de riesgos

La **Ley 31/1995 de Prevención de Riesgos Laborales** obliga a evaluar los riesgos del puesto de trabajo y a prevenirlos; y el **Real Decreto 488/1997** fija las condiciones mínimas para quien trabaja con pantallas. En el taller se resume en tres ideas: evitar el riesgo, protegerse y saber qué hacer si pasa algo.

### 7.1 Antes de abrir un equipo

1. Apágalo y **desenchufa el cable de corriente**: apagado no es lo mismo que desconectado (la placa conserva tensión de reserva).
2. Con el equipo desenchufado, pulsa unos segundos el botón de encendido para descargar la electricidad residual.
3. Espera a que se enfríe: el disipador y algunos chips pueden estar muy calientes.
4. Trabaja en una superficie limpia, ordenada y bien iluminada, y guarda los tornillos en un recipiente.
5. Quítate pulseras, anillos y cadenas.
6. **No abras nunca una fuente de alimentación** ni toques sus componentes internos.

### 7.2 Descargas electrostáticas (ESD)

La electricidad estática que acumula tu cuerpo (al caminar, al rozar ropa sintética) se puede descargar sobre un componente. Tú no notas la descarga por debajo de unos 3.000 V, pero un chip puede dañarse con mucho menos, **sin que se note**: la pieza puede funcionar a medias o fallar semanas después.

- Usa una **pulsera antiestática** conectada a una parte metálica sin pintar del chasis o a tierra. Si no tienes, toca con frecuencia una parte metálica sin pintar.
- Coge tarjetas y módulos **por los bordes**, sin tocar contactos ni chips.
- Guarda las piezas en **bolsas antiestáticas**, nunca sobre plástico común ni sobre moqueta.
- Evita trabajar sobre moqueta o con ropa de lana o sintética.

### 7.3 Otros riesgos

- **Cortes y heridas:** bordes del chasis, pines, soldaduras.
- **Cargas:** al levantar un equipo o un monitor, flexiona las rodillas y no arquees la espalda; pide ayuda si pesa.
- **Cables:** recógelos para que nadie tropiece y desconéctalos tirando del conector, no del cable.
- **Líquidos** lejos de los equipos. Lávate las manos después de manipular pasta térmica o productos de limpieza y lee las etiquetas.
- **Pilas y baterías de litio:** no las perfores ni las expongas al calor; una batería hinchada debe retirarse.
- **Fuego:** conoce dónde están el extintor y la salida de emergencia; en un equipo eléctrico no se usa nunca agua.
- **Residuos:** los aparatos electrónicos y las pilas no van a la basura, sino a un punto de recogida autorizado.

### 7.4 Ergonomía en el uso habitual

Trabajar horas delante del ordenador también es un riesgo (fatiga visual, espalda, muñecas). Coloca la pantalla a la altura de los ojos y a unos 50-70 cm, apoya la espalda, apoya los pies en el suelo, evita los reflejos y haz pausas cortas y regulares.

## 8. Periféricos: clasificar, instalar y configurar

Un **periférico** es un dispositivo que se conecta al equipo para introducir datos, recibir resultados o ampliarlo.

| Tipo | Ejemplos | Conexiones habituales |
|---|---|---|
| Entrada | Teclado, ratón, escáner, micrófono, cámara web | USB, Bluetooth, *jack* |
| Salida | Monitor, impresora, altavoces, proyector | HDMI, DisplayPort, USB, red, *jack* |
| Entrada y salida | Pantalla táctil, disco externo, tarjeta de red | USB, Thunderbolt, RJ45 |

- **USB:** el 2.0 llega a 480 Mb/s; los USB 3.x, de 5 a 20 Gb/s según la versión; USB4 y Thunderbolt, hasta 40 Gb/s o más. **Un conector USB-C no garantiza velocidad ni vídeo:** depende del puerto y del cable.
- **Monitores:** IPS (buenos colores y ángulos de visión), VA (mucho contraste), TN (rápido y barato, peores ángulos). En OLED cada píxel emite luz (negro perfecto, riesgo de *burn-in*); QLED es un LCD con puntos cuánticos, no OLED.
- **Impresoras:** láser (tóner; rápida y barata por página) y de inyección de tinta (buena para color y foto).

Pasos para instalar uno:

1. **Conéctalo.** Los USB se pueden enchufar con el equipo encendido (*hot-plug*).
2. El sistema lo detecta y carga un **controlador** (*driver*), el software que le explica cómo comunicarse con el dispositivo. A menudo es automático (*plug and play*).
3. **Comprueba que se ha reconocido** (órdenes a continuación).
4. Si hace falta, instala el controlador del fabricante, descargado de su web oficial.
5. **Configúralo:** resolución y frecuencia de refresco del monitor, impresora predeterminada y página de prueba, distribución del teclado…
6. **Prueba que funciona.**

```bash
lsusb               # dispositivos USB conectados
lspci               # tarjetas y controladoras PCI/PCIe
lsblk               # discos y particiones
sudo dmesg | tail   # mensajes del núcleo al enchufar un dispositivo
```

```powershell
Get-PnpDevice -PresentOnly | Where-Object Status -ne 'OK'   # dispositivos con problemas
```

En Windows también tienes el **Administrador de dispositivos** (`devmgmt.msc`), donde un dispositivo con problemas aparece marcado.

## 9. La práctica presencial

Se hace por parejas, sobre un equipo real o con el simulador que se indique en Aules. Repasa antes la sección 7.

1. **Identificación de componentes:** localiza y nombra en un ordenador real (o desmontado) la placa base, la CPU, los módulos de RAM, la unidad de almacenamiento y la fuente de alimentación.
2. **Manipulación guiada**, con supervisión del profesor: desmonta y vuelve a montar un módulo de RAM y una unidad de almacenamiento. Comprueba la fijación de cada conector: el encaje de las muescas de la RAM, los tornillos del SSD o HDD y los cables SATA de datos y de alimentación.
3. **Conectores de red:** identifica un cable de par trenzado, crimpa (o al menos observa cómo se crimpa) un conector RJ45 y compáralo con un tramo de fibra óptica, si lo hay.
4. **Ficha de reconocimiento:** completa la ficha de componentes (actividad 8) y entrégala en Aules antes de terminar la clase.

## Comprueba lo aprendido

1. ¿Cuántos cables necesitas para una malla completa de 8 equipos? ¿Y para una estrella?

   <details>
   <summary>Respuesta</summary>

   Malla: 8 × 7 ÷ 2 = **28 enlaces**. Estrella: **8 cables**, uno por equipo hasta el switch.

   </details>

2. Si el switch central de una red en estrella falla, ¿qué pasa? ¿Cómo se reduciría el riesgo?

   <details>
   <summary>Respuesta</summary>

   Cae toda la red que depende de ese switch. Se reduce con un switch de repuesto listo o con enlaces redundantes entre switches.

   </details>

3. Un PC del aula 2 no tiene red y sospechas del cable. ¿Qué mapa necesitas? ¿Y si quieres saber a qué red pertenece el PC?

   <details>
   <summary>Respuesta</summary>

   Para encontrar el cable, el **mapa físico**. Para saber la red y la IP, el **mapa lógico**.

   </details>

4. Cita tres medidas para evitar una descarga electrostática al tocar la placa base.

   <details>
   <summary>Respuesta</summary>

   Pulsera antiestática (o tocar con frecuencia una parte metálica sin pintar del chasis), coger las piezas por los bordes sin tocar contactos ni chips, y guardarlas en bolsas antiestáticas lejos de moquetas y plásticos.

   </details>

5. ¿Por qué no se debe abrir nunca una fuente de alimentación, ni cuando está desenchufada?

   <details>
   <summary>Respuesta</summary>

   Porque los condensadores pueden mantener una carga eléctrica peligrosa durante mucho tiempo después de desconectarla.

   </details>

## Glosario

| Valencià | Castellano |
|---|---|
| xarxa d'àrea local (LAN) | red de área local (LAN) |
| topologia | topología |
| commutador (*switch*) | conmutador (switch) |
| encaminador (*router*) | router (enrutador) |
| cablejat | cableado |
| armari de comunicacions | armario de comunicaciones |
| descàrrega electrostàtica (ESD) | descarga electrostática (ESD) |
| prevenció de riscos laborals | prevención de riesgos laborales |
| polsera antiestàtica | pulsera antiestática |
| perifèric | periférico |
| controlador (*driver*) | controlador (driver) |
| crimpar un connector | crimpar (engarzar) un conector |

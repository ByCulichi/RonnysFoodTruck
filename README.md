# Ronny’s Food Truck

Rediseño importado desde [ByCulichi/RonnysPage, PR #2](https://github.com/ByCulichi/RonnysPage/pull/2), commit `d990872dfc0fecb37fe31077c45422a54bd7d394` (incluido en el historial). Conserva a Ronny, el carrito rojo y la familia, los personajes distribuidos por las secciones, los filtros del menú y el diseño adaptable oscuro, rojo y dorado.

La prioridad de la página es el food truck, la comida y Ronny. El menú aparece antes que la sección complementaria de personajes, outfits e historia.

## Halloween activo

La portada actual muestra a Ronny con sombrero de hechicero y capa junto al food truck rojo decorado con calabazas, telarañas y murciélagos. Es la imagen principal al cargar la página (`public/images/seasons/ronny-halloween-foreground.png`); no requiere abrir el selector. No hay selector de looks: los personajes aparecen directamente en menú, promoción, historia, ubicación y contacto. Se conserva el acceso directo al menú ; los productos y precios se transcriben de las fotos de la carta del propietario. La fuente local Creepster incluye su licencia en `public/fonts/`.

## Identidad nocturna

La portada toma como referencia el cartel compartido por el propietario: Ronny en caricatura plana de color café/caramelo, ojos grandes, orejas rosas, lengua de lado y pañuelo rojo; carrito rojo, guirnaldas cálidas y letras grandes con contorno crema. Las ilustraciones anteriores se conservan como archivos; la campaña activa usa `public/images/hero/ronny-halloween-truck.png`, el icono `public/images/brand/ronny-flat-logo.png` y personajes individuales transparentes en menú, promoción, historia y contacto. Ronny es enojón, valiente, leal, protector, defensor y divertido; le encantan las gusgerías. El horario confirmado es viernes, sábado y domingo de 7 p. m. a 12 a. m. La fuente local Lilita One se distribuye con su licencia SIL OFL en `public/fonts/` y no requiere solicitudes a Google Fonts.

## Desarrollo y validación

Requiere Node.js 22 y npm. npm y `package-lock.json` son la fuente de dependencias; no uses el antiguo lockfile de pnpm.

```sh
npm ci --legacy-peer-deps
npm run typecheck
npm audit
npm run build
npm run dev
```

Para comprobar el resultado de producción: `npm start`. La opción `legacy-peer-deps` también está guardada en `.npmrc` por la incompatibilidad declarada de Vaul con React 19. TypeScript se comprueba además durante la compilación. No hay una configuración de ESLint instalada; `npm run lint` heredado no forma parte de las comprobaciones verificadas.

Se actualizó Next a 15.5.28 y se fijó PostCSS 8.5.30 dentro de Next mediante `overrides` para resolver las alertas de auditoría sin migrar a Next 16. Repetir auditoría antes de cada despliegue.

## Preview en Vercel

Importar **ByCulichi/RonnysFoodTruck** mediante la integración GitHub de Vercel, con permiso sobre este repositorio. Usar raíz del proyecto, framework Next.js y Node.js 22. `vercel.json` define instalación y compilación. Los PRs y ramas de trabajo deben generar deployments **Preview**; no reasignar dominios ni promover a producción sin autorización.

Para desplegar desde este entorno se necesita acceso a `api.vercel.com` y autenticación Vercel autorizada para el equipo/proyecto. Si el proyecto ya existe, vincularlo; no crear duplicados a ciegas. La URL navegable debe obtenerse de un deployment terminado y comprobarse por HTTP. Un build local o una captura no equivale a una preview publicada.

## Contacto directo

La sección «¿Platicamos algo rico?» y el formulario se retiraron por indicación del propietario. El contacto público usa los enlaces oficiales de WhatsApp y teléfono; no se solicitan credenciales ni se envían correos durante pruebas.

El footer de Halloween «Aquí sigue el antojo» usa contenido HTML real: ilustración aprobada de la dueña y Ronny a la izquierda, navegación «Explora» al centro y marca a la derecha. «Síguenos» reúne cinco logos neón centrados: Google, WhatsApp, Instagram, Facebook y TikTok. Abren los destinos confirmados del negocio con clic o Enter, sin previews. Los tres enlaces sociales oficiales proporcionados por el propietario se centralizan en `business.socials`; X se retiró. El dúo aprobado permanece intacto y `#contacto` apunta al footer.

## Próximos cambios

Crear una rama desde `main`, implementar y validar el cambio, subirla y abrir un PR completo con resumen, pruebas y pendientes. No fusionar automáticamente. Mantener intactas las ilustraciones `public/images/hero/ronny-family-truck.png` y `public/images/archive/ronny/ronny-outfits.png` salvo petición explícita.

## Menú y datos de contacto

El menú compacto tiene cuatro categorías (Dulces, Salados, Bebidas frías y Bebidas calientes), sin buscador y con una sola ficha activa. Los productos se eligen con miniaturas de foto y precio inicial, cuatro por página; la ficha conserva foto, descripción, variantes y todos sus precios visibles. Las flechas permiten recorrer los productos de la categoría sin apilar tarjetas. Ronny aparece fuera de la ficha y cambia automáticamente de atuendo al elegir categoría, según la preferencia del propietario; no hay selector manual de outfits. Los iconos de portada abren su producto y la categoría correspondiente.

Los datos proporcionados por el propietario están centralizados en `lib/business.ts`: New York, Ecatepec de Morelos, 55330, Estado de México; teléfono 56 5390 1358; viernes, sábado y domingo de 7 p. m. a 12 a. m., cerrado de lunes a jueves. Los enlaces permiten buscar la dirección en Maps, llamar o abrir WhatsApp; no se envían mensajes automáticamente.

## Google Maps y opiniones

La ficha oficial proporcionada por el propietario es https://maps.app.goo.gl/7YXxNfNkTWyo46yR8. El mapa integrado usa la dirección confirmada. Las opiniones se consultan directamente mediante enlaces a la ficha de Google.

Por indicación del propietario, no se usan APIs de reseñas/redes, no se hacen consultas automáticas y no se solicitan claves. Se retiró la integración de Places API y su endpoint. El footer conserva cinco enlaces directos a los canales confirmados, incluidos los perfiles oficiales de Instagram, Facebook y TikTok del propietario. No se muestran previews, se consultan APIs ni se inventan cifras.

## Identidad de Ronny

Su color de marca es café/caramelo por la última corrección del propietario, con orejas rosas, ojos grandes y lengua de lado. Esa identidad se mantiene en el logo y todas las ilustraciones activas. El cierre de la página muestra a Ronny con disfraz de unicornio junto a su ama pelirroja, de piel clara, con disfraz de conejito, ambos en caricatura plana y con transparencia real. Dos personajes adicionales lo muestran con su playerita roja Adidas y lamiéndose la nariz. La ilustración con su abuelo queda pendiente hasta recibir referencia, por indicación del propietario.

El encabezado usa tipografía de Halloween, Ronny visible, navegación con sección activa y acceso destacado al menú. El footer repite su cara y reúne todos los canales en un solo bloque, sin perfiles ni cifras inventados.

### Bienvenida cinematográfica de Roo

`components/roo-welcome.tsx` utiliza el Roo hechicero completo aprobado (`ronny-bruja-natural.png`), sin editar el archivo. La misma imagen entra de cuerpo completo, saluda con un pequeño «¡Guau!» visual y viaja hasta la cabecera mientras una máscara recoge el cuerpo hasta dejar la cabeza, sombrero, orejas y pañuelo. Esa misma imagen queda en la navegación: no hay clones ni intercambio de personajes. Usa FLIP con Web Animations API nativa, sin GSAP ni Framer Motion. La caja del logo conserva sus 76 px (60 px en móvil), por lo que la bienvenida no cambia el diseño. El navegador anima transformaciones, opacidad y la máscara sin trabajo JavaScript por fotograma. `app/page.tsx` integra este componente solo en la marca del encabezado; la carta, filtros, temporadas y promociones no cambian.

La configuración `rooWelcomeMotion`, al principio del componente, permite ajustar:

| Valor | Efecto | Inicial |
| --- | --- | --- |
| `duration` | Duración objetivo en milisegundos; subirla ralentiza toda la secuencia | `3100` |
| `maxSize` | Alto máximo del cuerpo completo, en píxeles; la descarga optimizada se adapta también | `520` |
| `viewportWidth` / `viewportHeight` | Límites del tamaño según el ancho y alto disponibles | `.76` / `.64` |
| `centerY` | Altura inicial de su centro como fracción de pantalla | `.40` |
| `entranceLift` / `entranceTilt` | Desplazamiento vertical inicial y giro, en píxeles/grados | `32` / `-7` |
| `flightTilt` / `flightCurve` | Inclinación máxima y curvatura del viaje | `-8` / `.22` |
| `flightStart` | Fracción de la secuencia en que empieza el viaje; mantener entre `.40` y `.65` | `.49` |
| `imageTimeout` | Tiempo máximo de espera del recurso antes de omitir la bienvenida | `850` |

`components/roo-welcome.css` define exclusivamente el fondo violeta/dorado, los aros, destellos y texto del saludo. Las coordenadas finales no se configuran: se obtienen de `getBoundingClientRect()` de la caja real del logo. Al redimensionar o girar el dispositivo se conserva la pose visible y se recalcula el trayecto restante, sin reiniciar la bienvenida ni saltar a una nueva pose. En una carga fría se acorta ligeramente la secuencia para compensar la espera de la imagen.

La bienvenida se ejecuta en cada documento nuevo o refresh; no vuelve al cambiar de sección ni al remontar la página mediante navegación cliente. Respeta `prefers-reduced-motion` desde CSS y JavaScript. No bloquea el cuerpo ni cambia el foco: tocar, usar teclado o empezar a desplazarse permite entrar inmediatamente. Al ocultar la pestaña, fallar la animación o tardar demasiado el recurso, se revela la página. Sin JavaScript, el contenido aparece directamente; hay además una salida CSS acotada por si la hidratación no llega a ejecutarse. Todos los listeners, observadores y efectos de la bienvenida se liberan al terminar.


## Carta y fotografías

`lib/menu.ts` centraliza 28 productos con sus variantes y precios, transcritos de las tres fotos de la carta de `ronnys.zip`: 8 dulces, 11 salados y 9 bebidas. Los productos antes agrupados como «Papas y extras», «Cafecito» o «Fruta con crema» aparecen por su nombre para encontrarlos directamente. Las cartas originales se conservan en `public/images/menu/cartas/carta-{dulces,salados,bebidas}.jpg` como referencia ampliable. `components/menu-carta.tsx` muestra ahora una carta digital legible: cuatro categorías, nombres y precios en filas, variantes visibles y cuatro productos por página. Un lector permite ampliar el texto del 100 al 175 % y alternar a las tres fotos originales, también con zoom y enlace al archivo. Se cierra con botón, Escape o fondo; contiene el foco y lo devuelve sin mover el scroll. Se actualizan, entre otros, papas locas a $40, francesas a $45, nachos a $50 y salchipulpos a $60; se incorporan hamburguesas desde $75, hot dogs desde $20, banderillas saladas $55 y dulces $45, alitas desde $85 y bebidas de la carta.

Las 13 fotos de comida del ZIP se conservan sin retoque en `public/images/menu/` y se usan en tarjetas y selectores de fotos: tres crepas, dos malteadas, dos hamburguesas, tres frutas con crema, waffle, hotcakes y salchipulpos. Las imágenes verticales se adaptan con CSS. Por petición explícita del propietario, los productos sin foto usan 19 imágenes generadas en `public/images/menu/generated/`, separadas de las fotos reales y con la etiqueta visible «Imagen ilustrativa» en la ficha y la ampliación. No representan fotos reales del negocio. Todos los productos tienen imagen; las variantes y precios siguen la carta sin añadir ofertas. `menuPhotoUrl` resuelve las extensiones JPG/PNG. Next Image sirve miniaturas y fotos en tamaños adaptables y WebP mediante el optimizador integrado, sin claves o APIs externas. La foto real del truck también se conserva como recurso. No se modifican las cartas originales ni se publican las referencias antiguas de personajes como si fueran platillos.


## Legibilidad para clientes

El menú muestra una ficha crema activa con texto oscuro y acentos rojos. En escritorio la foto queda junto a las variantes; en celular va arriba. Los nombres, precios y variantes se leen directamente en la ficha, sin desplegables. Se conservan todos los productos, fotos y precios de `lib/menu.ts`.

Las fotografías se pueden ampliar en un diálogo con navegación entre imágenes, cierre por botón, Escape o fondo, foco nativo y bloqueo del desplazamiento de la página mientras está abierto. Las cuatro opciones principales permanecen visibles al recorrer el menú; los botones eligen productos y las flechas cambian la ficha activa. La navegación superior usa rótulos e iconos más legibles y un acceso al menú destacado en celular. Ronny se reduce en portada y encabezado para dar más presencia al truck.


## Imágenes y distribución móvil

Las imágenes están ordenadas en `public/images/`: `brand/` para logos, `hero/` para portadas, `ronny/` para personajes, `menu/` con subcarpetas de platillos y cartas, y `archive/` para recursos anteriores. El cambio de carpetas conserva el contenido de los archivos y actualiza todas sus referencias. Los personajes se mantienen dentro de su espacio de diseño, con transparencia y sin marcos.

Los Ronnys de apoyo se reparten entre menú, promoción, domicilio, historia y ubicación; el del menú cambia con su categoría. La historia familiar y los momentos cotidianos se reúnen en una sola sección. El unicornio con su ama sigue en el footer. Los iconos tipo emoji de portada abren el producto correspondiente y conservan sus nombres accesibles.

`business.deliveryWhatsappUrl` prepara una consulta sobre cobertura, costo y disponibilidad. La página no promete zonas, tiempos ni tarifas y no envía el mensaje automáticamente. Por petición del propietario, en celular se retira la barra inferior fija de menú/domicilio y su espacio reservado. Los accesos superiores y las opciones de la página se conservan.

El teléfono actual procede de la captura de WhatsApp Business: +52 56 5390 1358. Se usa `https://wa.me/525653901358` (sin el antiguo prefijo móvil 1) y `tel:+525653901358` en todos los accesos. La captura contiene horarios distintos; se conserva el horario confirmado expresamente por el propietario hasta una nueva confirmación.

## Ronny’s por temporadas

`#temporadas`, después de menú y domicilio, presenta Halloween actual, Día de Muertos en noviembre y Navidad en diciembre como adelantos. Las tres ilustraciones independientes `public/images/seasons/ronny-{halloween,muertos,christmas}-foreground.png` acercan al truck rojo y a Roo para distinguirlos en tarjetas pequeñas. Halloween usa noche oscura, noviembre naranja/cempasúchil y diciembre azul con nieve. Los encabezados 4:3 y el color de cada tarjeta refuerzan esa separación; se conserva el carrusel táctil móvil sin apilar las tres temporadas.

El panel de Navidad usa rojo tinto, acentos crema/dorados y conserva intactos el truck, Roo, nieve, escena azul y pantalla de película de su ilustración. Navidad añade solo seis copos CSS con transform/opacity, sin video ni temporizadores. Un observador detiene la animación fuera de vista; también se detiene al ocultar la pestaña y desaparece con movimiento reducido. Las imágenes se sirven optimizadas mediante Next Image. Los originales y la portada principal permanecen intactos; no hay cambio automático de campaña, fechas de lanzamiento ni ofertas nuevas.

## Menú compacto e interacción de Ronny

`components/interactive-menu.tsx` reúne la navegación por categoría mediante logos y la ficha de producto. `components/interactive-menu.css` contiene sus estilos. Solo se monta una `MenuCard`; no se recortan precios ni se eliminan productos de `lib/menu.ts`. Las fotos de producto se muestran completas y más grandes, sin botón de ampliación ni visor emergente. Las originales se conservan intactas. Las consultas de WhatsApp son borradores que el cliente envía por su cuenta.

Ronny usa cuatro disfraces completos en `public/images/ronny/halloween/`, registrados en `lib/ronny-costumes.ts`: bruja con túnica, capa, botas y escoba para Dulces; fantasma con sábana de cuerpo completo para Bebidas; diablito con traje rojo, alas y cola para Salados; zombi con ropa de parches y botas para los snacks salados. Se conserva su cara café/caramelo reconocible. En escritorio acompaña el menú a un lado; en celular se integra antes de los productos sin tapar controles. El mismo diablito acompaña domicilio y el zombi cuida sus gusgerías en la historia. No hay rotación por tiempo ni selector manual de disfraces. La composición se inspira en la captura de culichi.lat proporcionada por el propietario; el entorno bloqueó su apertura con `Tunnel connection failed: 403 Forbidden`.

## Personajes aprobados e icono del navegador

Las ilustraciones de Ronny con playerita deportiva roja y cobija, lamiéndose la nariz, y del dúo unicornio/conejito quedan fijas por indicación del propietario. Sus PNG se conservan byte por byte; los disfraces nuevos usan archivos separados. La ilustración con el abuelo sigue pendiente de referencia.

Los metadatos de `app/layout.tsx` usan `/images/brand/ronny-flat-logo.png` como icono de pestaña, acceso directo e icono Apple. Se reutiliza la cara aprobada sin modificarla ni pedir servicios externos.

## Menú de Halloween

La sección usa las fuentes locales Creepster y Lilita One, fondo violeta nocturno, acentos calabaza, telarañas y murciélagos decorativos sin bloquear controles. El movimiento se desactiva con `prefers-reduced-motion`. El resto de las secciones mantiene la ambientación nocturna; Navidad sigue siendo solo un adelanto.

Las categorías muestran como máximo cuatro miniaturas con fotografía, nombre y precio por página, con botones anterior/siguiente y contador. La ficha seleccionada conserva variantes y precios visibles. Así se recorren los 28 productos sin apilar 28 tarjetas ni esconder la carta digital; las cuatro categorías permiten recorrer todo el catálogo.

## Escena del footer

`components/site-footer.tsx` y `components/site-footer.css` construyen el footer como contenido real y adaptable, no como una captura pegada. Los enlaces de «Explora» llevan a las secciones existentes de inicio, menú, ubicación, temporadas e historia. Los iconos de navegación son SVG decorativos y los logos sociales conservan nombres accesibles y abren su destino directamente, sin previews.

Las dos ilustraciones de `public/images/scenes/`, reservadas al footer, contienen únicamente escenario: árboles, telarañas, calabazas y luces. No incluyen letras, logos ni personajes. Una panorámica para escritorio y otra vertical para móvil mantienen la decoración alrededor del contenido. `<picture>` con `getImageProps` de Next sirve una sola versión optimizada por pantalla. El degradado superior se funde con el fondo violeta de la página. La ilustración aprobada de Ronny con su dueña permanece separada, transparente e intacta.

## Ubicación con ambiente de Halloween

`components/visit-section.tsx` y su CSS reúnen «¡Visítanos!», horarios, teléfono, dirección, mapa y foto real del truck en un único panel. Todos los datos y destinos proceden de `lib/business.ts`. «Cómo llegar», «Ver reseñas» y «Dejar reseña» abren directamente Google con destinos derivados de la ficha oficial; no se publican reseñas automáticamente ni se repiten tarjetas explicativas. El horario y el teléfono tienen mayor jerarquía tipográfica. El mapa es ancho en celular y la foto real, más grande, conserva el acceso para ampliarla. El Ronny aprobado de la nariz acompaña el título, sin editar su imagen. No se usan APIs de reseñas/redes ni se solicitan claves.

La marca y el cierre del footer usan Creepster, también en el copyright y el enlace «Un antojo más». La cara de Ronny del encabezado aumenta a 76 px en escritorio y 60 px en celular, manteniendo los controles y la altura del encabezado.

El dúo aprobado se integra al escenario con sombra de contacto, luz cálida y hierba por delante de los pies (`FooterFamilyGround`). En celular, una loma de césped continúa hasta el borde de la escena, sin una base flotante. El PNG de los personajes no se edita ni se regenera. El footer no añade animación continua.

El escenario completo se adapta al ancho y alto del footer, sin el recorte de `object-fit: cover`. La composición usa el espacio disponible bajo el encabezado en escritorio (con límites para pantallas muy bajas o muy altas); en celular conserva el flujo natural y los controles táctiles. Las luces de la ilustración se muestran directamente, sin una segunda guirnalda encima. Por la última petición del propietario, se retiraron las previews sociales y sus controladores de estado y foco. Pasar el ratón o enfocar un logo solo lo ilumina; clic o Enter abre su enlace.

## Promo y poses del menú

`#domicilio` reúne la oferta de viernes y el pedido a domicilio en un único panel con fondo y contorno compartidos. `FridayPromo` conserva «2 malteadas por $100», el Ronny deportivo aprobado y su consulta propia de disponibilidad; el diablito acompaña el acceso «Pedir a domicilio». En escritorio aparecen lado a lado; en móvil comparten un panel compacto con una división interior. Las imágenes originales se conservan y se sirven optimizadas. Los enlaces de WhatsApp preparan consultas separadas, sin enviar mensajes ni prometer cobertura, envío gratuito o entrega de la oferta sin confirmación.

Dulces y Salados usan nuevas poses en archivos transparentes separados, registrados en `lib/ronny-costumes.ts`: bruja con waffle y escoba, y diablito con hamburguesa. Las versiones actuales `*-natural.png` usan poses de pie y expresión tranquila. Se conservan los disfraces completos, la cara y el color café de Ronny; los PNG anteriores no se eliminan. Las versiones anteriores de fantasma y zombi se conservan como recursos; la última campaña usa sus versiones con más carácter.

El fondo de ubicación se diferencia del footer con `VisitNightScenery`: siluetas urbanas, faroles, luna y murciélagos en SVG sobre degradados violetas y azul noche. Es una decoración ilustrativa y no representa calles, coordenadas o un lugar nuevo. No reutiliza las ilustraciones del bosque y calabazas del footer ni solicita imágenes externas.

## Ambiente de Halloween entre secciones

`HalloweenMarketScene` une menú, carta, promoción, domicilio, temporadas e historia con noche violeta, luna, telarañas, calabazas iluminadas, niebla, murciélagos y pequeñas brasas. Son SVG y degradados locales, sin descargar imágenes nuevas ni consultar servicios. Las capas decorativas no interceptan clics ni alteran el flujo. El botón «Pausar movimiento» detiene el movimiento, `prefers-reduced-motion` lo desactiva, y un observador pausa las animaciones cuando la región sale de pantalla. Navidad conserva su aviso de próxima temporada. El mapa urbano y el bosque del footer siguen siendo escenarios separados.

Por la última petición del propietario, el dúo del footer va a la izquierda y el mensaje a la derecha, también en celular. Se refleja solo el escenario y el terreno para conservar el apoyo sobre el césped; el PNG aprobado y sus proporciones permanecen intactos. Los logos son enlaces nativos: admiten clic, Enter y apertura en otra pestaña, sin previews al pasar el ratón/enfocar y sin saltos de altura o scroll.

## Ronny y sus cuatro opciones

El menú ofrece Dulces (8), Salados (11), Bebidas frías (5) y Bebidas calientes (4). `lib/menu-categories.ts` organiza los mismos 28 productos: americano, capuchinos y moka en calientes; malteadas, frappés e ICE en frías. Los precios, variantes y fotos de `lib/menu.ts` permanecen intactos. Los cuatro botones neón alrededor de Ronny y la barra compacta seleccionan la misma categoría; la barra muestra solo sus cuatro logos grandes, con colores propios, halo neón y marca de selección, sin buscador ni contadores dentro de los botones.

Ronny cambia automáticamente de disfraz completo: bruja de pie con escoba en Dulces, diablito con ambas patas apoyadas en Salados, fantasma con malteada en Frías y vampiro barista preparando café en Calientes. Los snacks salados conservan al zombi. `RonnyOutfitStage` sirve imágenes optimizadas con transparencia, conserva el traje anterior hasta cargar el nuevo y muestra una transición entre ambos. No hay selector manual de vestuario ni rotación por tiempo. El movimiento reducido elimina la transición. La composición adapta los cuatro controles y el personaje a teléfono, sin marcos; el catálogo mantiene una ficha activa y cuatro miniaturas por página. El atuendo nuevo se guarda aparte, sin modificar personajes aprobados ni PNG anteriores.

### Carta legible, Ronny con carácter y feria nocturna

La carta deja de mostrar tres fotografías diminutas dentro de recuadros. Se compone como texto HTML desde `lib/menu.ts`, sin cambiar productos ni precios; nombres, variantes y precios se pueden ampliar de verdad. Las categorías se sincronizan con el menú de fotos. «Ver foto» y «Sus snacks favoritos» seleccionan el producto y su categoría para mostrar la ficha correcta. La sección larga de historia se sustituye por una presentación breve de Ronny junto a la carta, conservando `#historia`.

Los cinco disfraces usan nuevas versiones individuales `ronny-*-caracter.png`, con cejas y miradas más firmes. Los atuendos, poses, color café y lengua se conservan; los archivos anteriores y los tres personajes aprobados basados en fotos permanecen sin cambios. Domicilio y temporadas comparten una nueva feria nocturna en SVG local: faroles de calabaza, fachadas torcidas, estrellas y luces cálidas sobre violeta. El movimiento general mantiene pausa, reducción de movimiento y suspensión fuera de pantalla.

La navegación «Explora» usa nuevas ilustraciones SVG: calabaza que enciende, waffle con destello, marcador, murciélago y patita. Responden a ratón y foco con animaciones breves, sin bucles permanentes y respetando movimiento reducido. El cierre separa «Aquí sigue» en crema de «el antojo» en naranja y destaca la segunda línea del slogan. La marca del footer usa únicamente la cabeza de Ronny de diablito, más grande (88 px en escritorio, 64/54 px en móvil), en `public/images/brand/ronny-devil-head-caracter.png`, con cejas firmes y gesto travieso como los disfraces aprobados, transparencia real y Next Image. La versión anterior se conserva en `ronny-devil-head.png`. Se conserva el logo original para encabezado y favicon.

Por la última corrección del propietario, el menú no tiene buscador: la barra deja solo los cuatro logos de categoría, más grandes y visibles también en móvil. Los botones alrededor de Ronny también aumentan su icono. Los cinco disfraces con expresión firme se conservan intactos, y la cabeza de diablito del footer recupera ese mismo carácter en un recurso separado. Los accesos de portada y carta siguen sincronizando categoría y producto sin desmontar las capas de Ronny.

## Dominio propio

El dominio del propietario es `ronnys.online`, administrado en GoDaddy. `app/layout.tsx` define su URL canónica. La conexión se hace en el proyecto existente `deshortys-projects/ronnys-food-truck` de Vercel, usando `www.ronnys.online` como principal y redirección 308 de `ronnys.online` al principal, tal como muestra la configuración de Vercel del propietario. Copiar en la zona DNS de GoDaddy los valores A/CNAME/TXT que indique ese proyecto; no fijar IP o CNAME genéricos ni modificar registros de correo. Esperar a que Vercel muestre configuración válida y certificado HTTPS. La configuración del código no sustituye dar de alta los dominios ni el cambio de DNS.

La captura de configuración de Vercel del propietario indica estos registros para GoDaddy: A `@` → `216.198.79.1`; CNAME `www` → `f2dcc3bd6a37e9c5.vercel-dns-017.com`. Cambiar únicamente los registros web correspondientes y comprobar «Valid Configuration» y HTTPS al propagarse.

## Fondo del menú y redes oficiales

`MenuNightScenery` llena los laterales del menú con puestos de feria, faroles de calabaza, guirnalda cálida, destellos y suelo ilustrativo. Son SVG y CSS locales, sin descargas ni animaciones nuevas. La decoración se atenúa cerca del contenido y en móvil; no intercepta controles ni altera la carta. La atmósfera compartida conserva pausa, suspensión fuera de pantalla y movimiento reducido.

Instagram apunta a `ronnystruck04`, TikTok a `ronnystruck1` y Facebook al enlace compartido por el propietario (`https://www.facebook.com/share/1Lgf44svSs/`). Se retiran los parámetros de seguimiento de Instagram y TikTok y se conserva el enlace de Facebook sin inventar otro perfil. X queda fuera por ahora. La fila se adapta a cinco logos sin previews. La pestaña del navegador muestra únicamente «Ronny’s Food Truck».

Los controles alrededor de Ronny ahora muestran únicamente iconos grandes de comida con neón del color de la categoría y señal de selección. Los nombres siguen disponibles para lectores de pantalla y como tooltip. Se retira por ahora la descripción pequeña bajo la frase de Ronny. La cabecera muestra una nueva cabeza de Halloween con sombrero de hechicero en `public/images/brand/ronny-wizard-head.png`; el logo original, el favicon y los personajes aprobados permanecen como recursos independientes.

## La carta, como en el truck

«Abrir carta» muestra primero las tres fotografías originales, completas y sin retoques, en un lector de hojas con pestañas Dulces/Salados/Bebidas, anterior/siguiente, navegación con flechas cuando está al 100% y zoom de 100% a 250%. En móvil se puede desplazar la hoja ampliada. «Texto grande» conserva la lectura accesible y ampliable desde el catálogo verificado. La carta inline muestra las mismas fotografías originales completas, servidas sin transformar, con pestañas y navegación entre las tres hojas; no recrea ni redibuja el diseño físico. El catálogo conserva sus 28 productos y precios. Escape cierra y devuelve el foco al botón que abrió el lector.

## Últimos ajustes de lectura y continuidad

La ficha activa ocupa menos espacio, con foto y separaciones más compactas y precios legibles. Por petición del propietario se retiran las etiquetas visibles de imagen ilustrativa, conservando los metadatos `generated` y los textos alternativos veraces del catálogo. Las imágenes originales y generadas siguen en sus carpetas independientes.

Los círculos de categoría alrededor de Ronny flotan en recorridos suaves y con fases distintas. El movimiento se pausa al interactuar, con el control general, fuera de pantalla o con la pestaña oculta; `prefers-reduced-motion` lo elimina. Los filtros y nombres accesibles se conservan. Contacto destaca el teléfono con letra clara y elimina la fila duplicada de WhatsApp; footer y pedidos mantienen su enlace. Se retiran las pequeñas leyendas de temporadas, carta y bienvenida señaladas por el propietario.

Menú, feria, temporadas y ubicación comparten el fondo de `HalloweenMarketScene`. Los ambientes locales son capas transparentes con degradados y máscaras amplias, sin líneas divisorias entre secciones; el final se funde con la base del footer. Se conservan los puestos, calabazas, ciudad y bosque, sin modificar sus personajes ni bloquear controles.

## Carta digital y lectura móvil

Por la aclaración más reciente del propietario, `TruckMenuSheet` reconstruye en HTML el diseño de las tres cartas del truck: títulos rojos inclinados, letra negra, papel crema, marcos discontinuos, líneas de puntos, ilustraciones, sellos y franjas de cuadros. Las fuentes locales Shrikhand y Poppins se incluyen con sus licencias; los precios se leen del catálogo existente. El lector abre el diseño digital, no una fotografía, y conserva hojas, zoom de texto, alternativa «Texto grande», teclado, Escape y retorno de foco. Las fotografías originales permanecen intactas en el repositorio como referencias.

Las fichas con un precio único muestran nombre y precio solo en la cabecera. Se eliminan las descripciones repetitivas y la segunda fila de precio; los sabores útiles y las variantes con sus precios se conservan. En móvil, las miniaturas se recorren horizontalmente con el gesto nativo, sin bloquear el scroll vertical; la selección solo desplaza su fila. Las burbujas de Ronny quedan más separadas de su cuerpo. Se elimina la barra de categorías duplicada en móvil y se compactan portada, carta, domicilio, temporadas y ubicación, conservando controles táctiles y todos los accesos.

La secuencia de temporadas es Halloween actual, Día de Muertos en noviembre y después Navidad. El nuevo Ronny catrín se sirve con Next Image desde un PNG transparente independiente, sin modificar personajes aprobados. El adelanto no anuncia productos, precios ni ofertas nuevos y no cambia automáticamente la campaña actual.

## Carta completa, portada y temporadas

`MenuBook` presenta una portada HTML de Ronny’s en rojo vino y dorado con el sello ilustrado, comida y un lomo. Abierto, conserva dos caras juntas: la carta a la derecha y el reverso de la hoja girada sobre la pila izquierda. La ilustración izquierda corresponde a la carta visible a la derecha: Dulces con la bruja y el waffle, Snacks con el zombi y las papas, Bebidas con el vampiro barista y el café. Después de Bebidas, el libro se pliega y queda cerrado con la contraportada vino/dorado «Food Truck». No hay hoja adicional con el sello. Tocar esa contraportada lo vuelve a abrir en Bebidas.

La hoja móvil usa el mismo reverso que queda visible al terminar el giro. El papel se dobla desde la esquina mediante dos caras HTML completas y un pliegue diagonal; no se divide en franjas ni se repite su contenido seis veces. La luz y la sombra acompañan el doblez. Las cubiertas permanecen rígidas y se levantan alrededor del lomo. La escala y las dimensiones de las tablas permanecen estables, sin estirar la encuadernación al abrir o cerrar. Hay espacio alrededor para ver la esquina levantada sin recortes. Al retroceder, vuelve desde la izquierda y descubre la hoja anterior; la parte izquierda permanece visible mientras se lee. La portada impresa «Toca para abrir» levanta su cubierta directamente en la página; no abre un visor, modal ni presentación. El mismo libro mantiene el estado y pasa sus hojas sin remontarse. Se retiran «Abrir carta» y la fila externa de flechas, contador y abrir/cerrar. Tocar la hoja derecha avanza y la izquierda retrocede; una esquina doblada sugiere la interacción, sin controles visibles añadidos. El teclado y el arrastre siguen disponibles. Se retiran las pestañas superiores Portada/Dulces/Snacks/Bebidas tanto inline como en el lector. El gesto horizontal con mouse o dedo controla el avance del pliegue; al soltar, termina suavemente. El desplazamiento vertical se conserva, y con zoom activo el desplazamiento sigue siendo nativo. El encuadre acompaña la cubierta al abrir/cerrar, y el movimiento reducido retira estas transiciones.

Las tres cartas siguen siendo HTML seleccionable con los mismos productos, variantes y precios, en hojas de 596 × 850 px. El libro cerrado ocupa 628 px de ancho de origen y abierto 1224 px; `ResizeObserver` lo ajusta completo al ancho y al alto disponibles, sin scroll inicial. El zoom del diseño llega a 400% y enfoca la cara de lectura; ambas caras permanecen disponibles con desplazamiento nativo. «Texto grande» conserva su lectura adaptable hasta 200%. Las utilidades aparecen debajo del libro al abrirlo: zoom y «Texto grande» con selector de categoría, también dentro de la página. No se bloquea el cuerpo, no se atrapa Tab ni se salta el scroll al cambiar de hoja; las flechas actúan solo al enfocar el libro y Escape lo cierra.

Las escenas tienen poses, perspectivas, paletas y ambientes distintos: `ronny-halloween-fair.png` muestra a Ronny con varita junto a un caldero y una feria encantada; `ronny-muertos-ofrenda.png`, al catrín con bastón en un patio de arcos turquesa y una ofrenda al atardecer; `ronny-christmas-posada.png`, a Santa Ronny saludando desde el truck en una posada con piñata y nochebuenas. Halloween elimina la franja blanca de la frente por petición del propietario y se usa también en la portada principal, sin recortar a Ronny en móvil. Halloween sigue siendo la campaña actual; no se cambian fechas automáticamente ni se inventan ofertas.

Los dibujos de comida y el sello están en `public/images/menu/illustrations/`, se sirven con Next Image y mantienen la apariencia de las cartas físicas. Las fotografías originales, las escenas anteriores y los personajes aprobados se conservan intactos como recursos.

## Presentación móvil y tablet

El contenido y las acciones del escritorio se conservan en pantallas pequeñas. Las miniaturas del menú forman una sola fila táctil hasta 900 px; Ronny mantiene los cuatro filtros y la selección conserva su posición vertical. Se compactan la cabecera del menú, la portada inline de la carta, la promoción, domicilio y ubicación; el lector de la carta conserva portada, hojas completas, animación y ampliación. El botón de pausa tiene espacio propio junto al acceso a la carta.

Hasta 1000 px, las mismas tarjetas de temporada se recorren en una fila con desplazamiento nativo, ajuste al inicio de cada tarjeta y flechas de 44 px. Las tres escenas y sus enlaces siguen accesibles; el movimiento reducido elimina el desplazamiento animado. El visor no mueve verticalmente la página al navegar y se actualiza al cambiar la orientación.

La navegación desplegable ocupa el alto disponible, bloquea el desplazamiento de fondo y contiene el foco entre sus enlaces y el botón de cierre. Escape devuelve el foco sin saltar la página; cambiar a escritorio cierra el panel y libera el desplazamiento. La barra inferior se oculta mientras el panel está abierto para no tapar sus enlaces. El diseño ancho conserva sus tres tarjetas de temporada y la distribución habitual.

### Mini animación dentro del truck

`TruckCinema` conserva la pantalla pequeña en la pared interior de la ventana del truck y la ilustración de Halloween intacta. Las coordenadas del lienzo original se adaptan al recorte de `object-fit` y a cada pantalla mediante `ResizeObserver`. No añade altura ni scroll a la portada.

Por elección explícita del propietario, la pantalla muestra una mini animación local inspirada en la película, sin reproductor, video, sonido, iframe, botones ni diálogo. `MoviePreviewArt` dibuja viñetas SVG originales para Viernes 13 (lago y máscara), Coco (guitarra, puente y cempasúchil) y Una Navidad con Mickey (ambiente victoriano, Scrooge y un espíritu). Los títulos quedan centralizados en `lib/truck-cinema.ts`. Son ilustraciones animadas, no fragmentos ni publicaciones oficiales de las películas. Halloween permanece activa; las otras viñetas quedan preparadas para cambiar la campaña de forma explícita.

El movimiento usa únicamente transformaciones y opacidad de unos pocos grupos SVG; no descarga imágenes, videos ni scripts de terceros. Empieza tras la portada y se suspende fuera de vista, con pestaña oculta, o con movimiento reducido. La viñeta estática permanece visible. El libro solo utiliza `requestAnimationFrame` durante un giro, cancela el bucle al terminar o desmontarse, y actualiza el pliegue sin volver a renderizar React en cada fotograma. No se añaden dependencias.

### Controles estables y caras de la portada

El encabezado omite «Precios en MXN» y se retira el botón de pausa. Los filtros y Ronny permanecen en su sección, sin seguir el scroll; sus círculos conservan neón y selección, con posiciones estables. Los cinco enlaces sociales siguen anclados al footer. La decoración conserva movimiento reducido y suspensión fuera de vista/pestaña oculta. Durante el giro de la cubierta se ocultan explícitamente las caras que miran hacia atrás, evitando que aparezca una ilustración o texto espejado por el aplanado 3D del navegador.

### Libro cerrado por ambos lados

`MenuBook` distingue la portada, las tres aperturas de categoría y la contraportada cerrada (`back`). La última cubierta gira con su tabla derecha sobre el lomo y centra el libro cerrado hacia el lado izquierdo; al volver, descubre directamente Bebidas. La tabla y el contenido derechos se ocultan en reposo para no dejar una hoja vacía ni desbordamiento. La carta vive por completo en la página: portada, hojas y contraportada conservan su estado; zoom y «Texto grande» son opciones inline. No hay lector modal ni bloqueo de desplazamiento. Se retira el enlace «Sus snacks favoritos».

La carta inline es un poco más grande en escritorio, con más altura disponible y una columna de apoyo más estrecha. En móvil aprovecha 20 px adicionales dentro del ancho de pantalla, manteniendo ambas caras, el gesto vertical nativo y las hojas completas al 100%.

La portada principal usa ahora la misma escena de Halloween con Roo y el truck en primer plano (`truckArtwork.halloween.src`). Se retiran los cuatro accesos de comida del encabezado; los filtros permanecen en el menú. `TruckCinema` también aparece en los tres camiones de temporadas, con coordenadas propias de sus ilustraciones 1448×1086 y encuadre calculado según `object-fit: cover/contain`. Cada pantalla mantiene su viñeta SVG de película correspondiente, automática, local y suspendida fuera de vista/pestaña oculta/movimiento reducido.

El panel de promoción prioriza el lado izquierdo: más ancho, Roo deportivo mayor y precio destacado. El acceso de WhatsApp y la consulta de cobertura/costo/disponibilidad del domicilio permanecen disponibles.

Por elección del propietario, la última mejora del catálogo es visual: una sola selección de categorías alrededor de Roo y un encabezado más claro para «Fotos y precios». Roo conserva sus cambios automáticos de disfraz. El catálogo y las hojas del libro mantienen sus navegaciones independientes.

Se retiró `@react-email/render`, que no se utiliza: el código de correo existente entrega HTML directamente a Resend. Esto elimina la cadena de dependencias `html-to-text`/`deepmerge` sin cambiar el contacto ni activar envíos.

Último ajuste de fotos y carta: cuatro productos por página, miniaturas mayores y foto activa más alta. `MenuPhoto` llena cada recuadro con proporciones originales y encuadre centrado, sin franjas vacías. Seis capturas JPG traen barras negras integradas: `frame` en `lib/menu.ts` registra su área fotográfica 720×960 desde y=320 dentro del original 720×1600; una ventana CSS muestra solo esa área sin modificar los archivos. Fotos y ficha comparten la misma presentación. Se retiran «Ampliar foto» y el acceso superior «Carta del truck». La carta sigue abriéndose directamente desde su portada. El Roo acompañante usa la misma tabla de disfraces que las hojas: bruja/Dulces, zombi/Snacks y vampiro/Bebidas, con transición sin parpadeos y movimiento reducido. El catálogo de fotos mantiene su navegación independiente del libro.

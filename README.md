# Ronny’s Food Truck

Rediseño importado desde [ByCulichi/RonnysPage, PR #2](https://github.com/ByCulichi/RonnysPage/pull/2), commit `d990872dfc0fecb37fe31077c45422a54bd7d394` (incluido en el historial). Conserva a Ronny, el carrito rojo y la familia, los personajes distribuidos por las secciones, los filtros del menú y el diseño adaptable oscuro, rojo y dorado.

La prioridad de la página es el food truck, la comida y Ronny. El menú aparece antes que la sección complementaria de personajes, outfits e historia.

## Halloween activo

La portada actual muestra a Ronny con sombrero de hechicero y capa junto al food truck rojo decorado con calabazas, telarañas y murciélagos. Es la imagen principal al cargar la página (`public/images/hero/ronny-halloween-truck.png`); no requiere abrir el selector. No hay selector de looks: los personajes aparecen directamente en menú, promoción, historia, ubicación y contacto. Se conserva el acceso directo al menú ; los productos y precios se transcriben de las fotos de la carta del propietario. La fuente local Creepster incluye su licencia en `public/fonts/`.

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

El menú compacto tiene cuatro categorías (Dulces, Salados, Bebidas frías y Bebidas calientes), sin buscador y con una sola ficha activa. Los productos se eligen con miniaturas de foto y precio inicial, seis por página; la ficha conserva foto, descripción, variantes y todos sus precios visibles. Las flechas permiten recorrer los productos de la categoría sin apilar tarjetas. Ronny aparece fuera de la ficha y cambia automáticamente de atuendo al elegir categoría, según la preferencia del propietario; no hay selector manual de outfits. Los iconos de portada abren su producto y la categoría correspondiente.

Los datos proporcionados por el propietario están centralizados en `lib/business.ts`: New York, Ecatepec de Morelos, 55330, Estado de México; teléfono 56 5390 1358; viernes, sábado y domingo de 7 p. m. a 12 a. m., cerrado de lunes a jueves. Los enlaces permiten buscar la dirección en Maps, llamar o abrir WhatsApp; no se envían mensajes automáticamente.

## Google Maps y opiniones

La ficha oficial proporcionada por el propietario es https://maps.app.goo.gl/7YXxNfNkTWyo46yR8. El mapa integrado usa la dirección confirmada. Las opiniones se consultan directamente mediante enlaces a la ficha de Google.

Por indicación del propietario, no se usan APIs de reseñas/redes, no se hacen consultas automáticas y no se solicitan claves. Se retiró la integración de Places API y su endpoint. El footer conserva cinco enlaces directos a los canales confirmados, incluidos los perfiles oficiales de Instagram, Facebook y TikTok del propietario. No se muestran previews, se consultan APIs ni se inventan cifras.

## Identidad de Ronny

Su color de marca es café/caramelo por la última corrección del propietario, con orejas rosas, ojos grandes y lengua de lado. Esa identidad se mantiene en el logo y todas las ilustraciones activas. El cierre de la página muestra a Ronny con disfraz de unicornio junto a su ama pelirroja, de piel clara, con disfraz de conejito, ambos en caricatura plana y con transparencia real. Dos personajes adicionales lo muestran con su playerita roja Adidas y lamiéndose la nariz. La ilustración con su abuelo queda pendiente hasta recibir referencia, por indicación del propietario.

El encabezado usa tipografía de Halloween, Ronny visible, navegación con sección activa y acceso destacado al menú. El footer repite su cara y reúne todos los canales en un solo bloque, sin perfiles ni cifras inventados.


## Carta y fotografías

`lib/menu.ts` centraliza 28 productos con sus variantes y precios, transcritos de las tres fotos de la carta de `ronnys.zip`: 8 dulces, 11 salados y 9 bebidas. Los productos antes agrupados como «Papas y extras», «Cafecito» o «Fruta con crema» aparecen por su nombre para encontrarlos directamente. Las cartas originales se conservan en `public/images/menu/cartas/carta-{dulces,salados,bebidas}.jpg` como referencia ampliable. `components/menu-carta.tsx` muestra ahora una carta digital legible: cuatro categorías, nombres y precios en filas, variantes visibles y cuatro productos por página. Un lector permite ampliar el texto del 100 al 175 % y alternar a las tres fotos originales, también con zoom y enlace al archivo. Se cierra con botón, Escape o fondo; contiene el foco y lo devuelve sin mover el scroll. Se actualizan, entre otros, papas locas a $40, francesas a $45, nachos a $50 y salchipulpos a $60; se incorporan hamburguesas desde $75, hot dogs desde $20, banderillas saladas $55 y dulces $45, alitas desde $85 y bebidas de la carta.

Las 13 fotos de comida del ZIP se conservan sin retoque en `public/images/menu/` y se usan en tarjetas y selectores de fotos: tres crepas, dos malteadas, dos hamburguesas, tres frutas con crema, waffle, hotcakes y salchipulpos. Las imágenes verticales se adaptan con CSS. Por petición explícita del propietario, los productos sin foto usan 19 imágenes generadas en `public/images/menu/generated/`, separadas de las fotos reales y con la etiqueta visible «Imagen ilustrativa» en la ficha y la ampliación. No representan fotos reales del negocio. Todos los productos tienen imagen; las variantes y precios siguen la carta sin añadir ofertas. `menuPhotoUrl` resuelve las extensiones JPG/PNG. Next Image sirve miniaturas y fotos en tamaños adaptables y WebP mediante el optimizador integrado, sin claves o APIs externas. La foto real del truck también se conserva como recurso. No se modifican las cartas originales ni se publican las referencias antiguas de personajes como si fueran platillos.


## Legibilidad para clientes

El menú muestra una ficha crema activa con texto oscuro y acentos rojos. En escritorio la foto queda junto a las variantes; en celular va arriba. Los nombres, precios y variantes se leen directamente en la ficha, sin desplegables. Se conservan todos los productos, fotos y precios de `lib/menu.ts`.

Las fotografías se pueden ampliar en un diálogo con navegación entre imágenes, cierre por botón, Escape o fondo, foco nativo y bloqueo del desplazamiento de la página mientras está abierto. Las cuatro opciones principales permanecen visibles al recorrer el menú; los botones eligen productos y las flechas cambian la ficha activa. La navegación superior usa rótulos e iconos más legibles y un acceso al menú destacado en celular. Ronny se reduce en portada y encabezado para dar más presencia al truck.


## Imágenes y distribución móvil

Las imágenes están ordenadas en `public/images/`: `brand/` para logos, `hero/` para portadas, `ronny/` para personajes, `menu/` con subcarpetas de platillos y cartas, y `archive/` para recursos anteriores. El cambio de carpetas conserva el contenido de los archivos y actualiza todas sus referencias. Los personajes se mantienen dentro de su espacio de diseño, con transparencia y sin marcos.

Los Ronnys de apoyo se reparten entre menú, promoción, domicilio, historia y ubicación; el del menú cambia con su categoría. La historia familiar y los momentos cotidianos se reúnen en una sola sección. El unicornio con su ama sigue en el footer. Los iconos tipo emoji de portada abren el producto correspondiente y conservan sus nombres accesibles.

`business.deliveryWhatsappUrl` prepara una consulta sobre cobertura, costo y disponibilidad. La página no promete zonas, tiempos ni tarifas y no envía el mensaje automáticamente. En celular una barra inferior ofrece acceso a menú y domicilio, respeta el área segura y deja espacio al final para no tapar contenido.

El teléfono actual procede de la captura de WhatsApp Business: +52 56 5390 1358. Se usa `https://wa.me/525653901358` (sin el antiguo prefijo móvil 1) y `tel:+525653901358` en todos los accesos. La captura contiene horarios distintos; se conserva el horario confirmado expresamente por el propietario hasta una nueva confirmación.

## Ronny’s por temporadas

`#temporadas`, después de menú y domicilio, presenta Halloween como campaña actual y Navidad como próxima. El adelanto navideño usa `public/images/seasons/ronny-christmas.png`: Ronny café de Santa con malteada y hot dog, ilustrado a partir de la referencia del propietario y con transparencia real. No hay cambio automático de campaña, fecha de lanzamiento ni ofertas de Navidad inventadas. «Temporadas» aparece en navegación de escritorio y móvil; se conserva Halloween en portada. Las dos campañas llevan al menú existente.

## Menú compacto e interacción de Ronny

`components/interactive-menu.tsx` reúne la navegación por categoría mediante logos y la ficha de producto. `components/interactive-menu.css` contiene sus estilos. Solo se monta una `MenuCard`; no se recortan precios ni se eliminan productos de `lib/menu.ts`. Se mantienen las fotografías originales y su ampliación accesible con Escape, foco contenido y retorno al botón. Las consultas de WhatsApp son borradores que el cliente envía por su cuenta.

Ronny usa cuatro disfraces completos en `public/images/ronny/halloween/`, registrados en `lib/ronny-costumes.ts`: bruja con túnica, capa, botas y escoba para Dulces; fantasma con sábana de cuerpo completo para Bebidas; diablito con traje rojo, alas y cola para Salados; zombi con ropa de parches y botas para los snacks salados. Se conserva su cara café/caramelo reconocible. En escritorio acompaña el menú a un lado; en celular se integra antes de los productos sin tapar controles. El mismo diablito acompaña domicilio y el zombi cuida sus gusgerías en la historia. No hay rotación por tiempo ni selector manual de disfraces. La composición se inspira en la captura de culichi.lat proporcionada por el propietario; el entorno bloqueó su apertura con `Tunnel connection failed: 403 Forbidden`.

## Personajes aprobados e icono del navegador

Las ilustraciones de Ronny con playerita deportiva roja y cobija, lamiéndose la nariz, y del dúo unicornio/conejito quedan fijas por indicación del propietario. Sus PNG se conservan byte por byte; los disfraces nuevos usan archivos separados. La ilustración con el abuelo sigue pendiente de referencia.

Los metadatos de `app/layout.tsx` usan `/images/brand/ronny-flat-logo.png` como icono de pestaña, acceso directo e icono Apple. Se reutiliza la cara aprobada sin modificarla ni pedir servicios externos.

## Menú de Halloween

La sección usa las fuentes locales Creepster y Lilita One, fondo violeta nocturno, acentos calabaza, telarañas y murciélagos decorativos sin bloquear controles. El movimiento se desactiva con `prefers-reduced-motion`. El resto de las secciones mantiene la ambientación nocturna; Navidad sigue siendo solo un adelanto.

Las categorías muestran como máximo seis miniaturas con fotografía, nombre y precio por página, con botones anterior/siguiente y contador. La ficha seleccionada conserva variantes y precios visibles. Así se recorren los 28 productos sin apilar 28 tarjetas ni esconder la carta digital; las cuatro categorías permiten recorrer todo el catálogo.

## Escena del footer

`components/site-footer.tsx` y `components/site-footer.css` construyen el footer como contenido real y adaptable, no como una captura pegada. Los enlaces de «Explora» llevan a las secciones existentes de inicio, menú, ubicación, temporadas e historia. Los iconos de navegación son SVG decorativos y los logos sociales conservan nombres accesibles y abren su destino directamente, sin previews.

Las dos ilustraciones de `public/images/scenes/`, reservadas al footer, contienen únicamente escenario: árboles, telarañas, calabazas y luces. No incluyen letras, logos ni personajes. Una panorámica para escritorio y otra vertical para móvil mantienen la decoración alrededor del contenido. `<picture>` con `getImageProps` de Next sirve una sola versión optimizada por pantalla. El degradado superior se funde con el fondo violeta de la página. La ilustración aprobada de Ronny con su dueña permanece separada, transparente e intacta.

## Ubicación con ambiente de Halloween

`components/visit-section.tsx` y su CSS reúnen contacto, mapa y foto real del truck siguiendo la nueva referencia visual. El teléfono, WhatsApp, dirección y horario proceden de `lib/business.ts`; no se copia el email del mockup. La foto real original del truck se conserva sin editar y se encuadra con CSS; puede abrirse completa. En celular, el mapa ocupa el ancho disponible y la foto se vuelve compacta. El Ronny aprobado de la nariz aparece fuera de las tarjetas.

Las opiniones usan tres accesos a la ficha real: consultar experiencias, compartir la visita y ver las fotos. No se publican como reales los testimonios, nombres, estrellas ni cantidades del mockup. Se conserva la decisión del propietario de no usar APIs de reseñas o redes ni solicitar claves.

La marca y el cierre del footer usan Creepster, también en el copyright y el enlace «Un antojo más». La cara de Ronny del encabezado aumenta a 76 px en escritorio y 60 px en celular, manteniendo los controles y la altura del encabezado.

El dúo aprobado se integra al escenario con sombra de contacto, luz cálida y hierba por delante de los pies (`FooterFamilyGround`). En celular, una loma de césped continúa hasta el borde de la escena, sin una base flotante. El PNG de los personajes no se edita ni se regenera. El footer no añade animación continua.

El escenario completo se adapta al ancho y alto del footer, sin el recorte de `object-fit: cover`. La composición usa el espacio disponible bajo el encabezado en escritorio (con límites para pantallas muy bajas o muy altas); en celular conserva el flujo natural y los controles táctiles. Las luces de la ilustración se muestran directamente, sin una segunda guirnalda encima. Por la última petición del propietario, se retiraron las previews sociales y sus controladores de estado y foco. Pasar el ratón o enfocar un logo solo lo ilumina; clic o Enter abre su enlace.

## Promo y poses del menú

`FridayPromo` presenta la oferta existente de viernes como «2 malteadas por $100», con el Ronny deportivo aprobado más grande, tipografía de marca y un cupón claro con enlace para consultar disponibilidad por WhatsApp. La imagen original no se edita y el mensaje no se envía automáticamente.

Dulces y Salados usan nuevas poses en archivos transparentes separados, registrados en `lib/ronny-costumes.ts`: bruja con waffle y escoba, y diablito con hamburguesa. Las versiones actuales `*-natural.png` usan poses de pie y expresión tranquila. Se conservan los disfraces completos, la cara y el color café de Ronny; los PNG anteriores no se eliminan. Las versiones anteriores de fantasma y zombi se conservan como recursos; la última campaña usa sus versiones con más carácter.

El fondo de ubicación se diferencia del footer con `VisitNightScenery`: siluetas urbanas, faroles, luna y murciélagos en SVG sobre degradados violetas y azul noche. Es una decoración ilustrativa y no representa calles, coordenadas o un lugar nuevo. No reutiliza las ilustraciones del bosque y calabazas del footer ni solicita imágenes externas.

## Ambiente de Halloween entre secciones

`HalloweenMarketScene` une menú, carta, promoción, domicilio, temporadas e historia con noche violeta, luna, telarañas, calabazas iluminadas, niebla, murciélagos y pequeñas brasas. Son SVG y degradados locales, sin descargar imágenes nuevas ni consultar servicios. Las capas decorativas no interceptan clics ni alteran el flujo. El botón «Pausar movimiento» detiene el movimiento, `prefers-reduced-motion` lo desactiva, y un observador pausa las animaciones cuando la región sale de pantalla. Navidad conserva su aviso de próxima temporada. El mapa urbano y el bosque del footer siguen siendo escenarios separados.

Por la última petición del propietario, el dúo del footer va a la izquierda y el mensaje a la derecha, también en celular. Se refleja solo el escenario y el terreno para conservar el apoyo sobre el césped; el PNG aprobado y sus proporciones permanecen intactos. Los logos son enlaces nativos: admiten clic, Enter y apertura en otra pestaña, sin previews al pasar el ratón/enfocar y sin saltos de altura o scroll.

## Ronny y sus cuatro opciones

El menú ofrece Dulces (8), Salados (11), Bebidas frías (5) y Bebidas calientes (4). `lib/menu-categories.ts` organiza los mismos 28 productos: americano, capuchinos y moka en calientes; malteadas, frappés e ICE en frías. Los precios, variantes y fotos de `lib/menu.ts` permanecen intactos. Los cuatro botones neón alrededor de Ronny y la barra compacta seleccionan la misma categoría; la barra muestra solo sus cuatro logos grandes, con colores propios, halo neón y marca de selección, sin buscador ni contadores dentro de los botones.

Ronny cambia automáticamente de disfraz completo: bruja de pie con escoba en Dulces, diablito con ambas patas apoyadas en Salados, fantasma con malteada en Frías y vampiro barista preparando café en Calientes. Los snacks salados conservan al zombi. `RonnyOutfitStage` sirve imágenes optimizadas con transparencia, conserva el traje anterior hasta cargar el nuevo y muestra una transición entre ambos. No hay selector manual de vestuario ni rotación por tiempo. El movimiento reducido elimina la transición. La composición adapta los cuatro controles y el personaje a teléfono, sin marcos; el catálogo mantiene una ficha activa y seis miniaturas por página. El atuendo nuevo se guarda aparte, sin modificar personajes aprobados ni PNG anteriores.

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

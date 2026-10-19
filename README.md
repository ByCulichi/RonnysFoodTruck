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

El footer de Halloween «Aquí sigue el antojo» sigue la composición de la referencia del propietario con contenido HTML real: marca y título naranja a la izquierda, navegación «Explora» al centro, ilustración aprobada de la dueña y Ronny a la derecha y «Síguenos» abajo. La imagen aprobada se conserva sin cambios ni recuadro. La composición se reorganiza para celular. La fila repetida de dirección, teléfono y horarios se retiró del footer; los datos siguen en ubicación y en las previews de Google y WhatsApp. Google, WhatsApp, Instagram, Facebook, TikTok y X aparecen juntos como logos neón centrados. Al activar uno aparece una franja de preview discreta, sin tarjeta permanente ni fotografía duplicada del truck. Se puede cerrar con botón o Escape, con retorno de foco. Google y WhatsApp tienen enlaces confirmados; las otras redes indican «Enlace oficial pendiente». El enlace `#contacto` lleva al footer.

## Próximos cambios

Crear una rama desde `main`, implementar y validar el cambio, subirla y abrir un PR completo con resumen, pruebas y pendientes. No fusionar automáticamente. Mantener intactas las ilustraciones `public/images/hero/ronny-family-truck.png` y `public/images/archive/ronny/ronny-outfits.png` salvo petición explícita.

## Menú y datos de contacto

El menú compacto tiene tres categorías (Dulces, Salados y Bebidas), búsqueda global por nombre e ingredientes sin distinguir acentos y una sola ficha activa. Los productos se eligen con miniaturas de foto y precio inicial, seis por página; la ficha conserva foto, descripción, variantes y todos sus precios visibles. Las flechas permiten recorrer los productos de la categoría sin apilar tarjetas. Ronny aparece fuera de la ficha y cambia automáticamente de atuendo al elegir categoría, según la preferencia del propietario; no hay selector manual de outfits. Los iconos de portada abren su producto y limpian una búsqueda anterior.

Los datos proporcionados por el propietario están centralizados en `lib/business.ts`: New York, Ecatepec de Morelos, 55330, Estado de México; teléfono 56 5390 1358; viernes, sábado y domingo de 7 p. m. a 12 a. m., cerrado de lunes a jueves. Los enlaces permiten buscar la dirección en Maps, llamar o abrir WhatsApp; no se envían mensajes automáticamente.

## Google Maps y opiniones

La ficha oficial proporcionada por el propietario es https://maps.app.goo.gl/7YXxNfNkTWyo46yR8. El mapa integrado usa la dirección confirmada. Las opiniones se consultan directamente mediante enlaces a la ficha de Google.

Por indicación del propietario, no se usan APIs de reseñas/redes, no se hacen consultas automáticas y no se solicitan claves. Se retiró la integración de Places API y su endpoint. Los perfiles sociales, seguidores y previews de publicaciones reales quedan pendientes de sus enlaces oficiales; el footer ofrece previews locales de contacto y ficha, sin consultas automáticas; no se inventan cifras.

## Identidad de Ronny

Su color de marca es café/caramelo por la última corrección del propietario, con orejas rosas, ojos grandes y lengua de lado. Esa identidad se mantiene en el logo y todas las ilustraciones activas. El cierre de la página muestra a Ronny con disfraz de unicornio junto a su ama pelirroja, de piel clara, con disfraz de conejito, ambos en caricatura plana y con transparencia real. Dos personajes adicionales lo muestran con su playerita roja Adidas y lamiéndose la nariz. La ilustración con su abuelo queda pendiente hasta recibir referencia, por indicación del propietario.

El encabezado usa tipografía de Halloween, Ronny visible, navegación con sección activa y acceso destacado al menú. El footer repite su cara y reúne todos los canales en un solo bloque, sin perfiles ni cifras inventados.


## Carta y fotografías

`lib/menu.ts` centraliza 28 productos con sus variantes y precios, transcritos de las tres fotos de la carta de `ronnys.zip`: 8 dulces, 11 salados y 9 bebidas. Los productos antes agrupados como «Papas y extras», «Cafecito» o «Fruta con crema» aparecen por su nombre para encontrarlos directamente. Las cartas originales se conservan en `public/images/menu/cartas/carta-{dulces,salados,bebidas}.jpg` y sus tres imágenes permanecen visibles bajo el menú, sin desplegable. `components/menu-carta.tsx` permite ampliarlas, recorrerlas, abrir el archivo original y cerrar con botón, Escape o fondo, con foco contenido y retorno al botón de origen. Se actualizan, entre otros, papas locas a $40, francesas a $45, nachos a $50 y salchipulpos a $60; se incorporan hamburguesas desde $75, hot dogs desde $20, banderillas saladas $55 y dulces $45, alitas desde $85 y bebidas de la carta.

Las 13 fotos de comida del ZIP se conservan sin retoque en `public/images/menu/` y se usan en tarjetas y selectores de fotos: tres crepas, dos malteadas, dos hamburguesas, tres frutas con crema, waffle, hotcakes y salchipulpos. Las imágenes verticales se adaptan con CSS. Por petición explícita del propietario, los productos sin foto usan 19 imágenes generadas en `public/images/menu/generated/`, separadas de las fotos reales y con la etiqueta visible «Imagen ilustrativa» en la ficha y la ampliación. No representan fotos reales del negocio. Todos los productos tienen imagen; las variantes y precios siguen la carta sin añadir ofertas. `menuPhotoUrl` resuelve las extensiones JPG/PNG. Next Image sirve miniaturas y fotos en tamaños adaptables y WebP mediante el optimizador integrado, sin claves o APIs externas. La foto real del truck también se conserva como recurso. No se modifican las cartas originales ni se publican las referencias antiguas de personajes como si fueran platillos.


## Legibilidad para clientes

El menú muestra una ficha crema activa con texto oscuro y acentos rojos. En escritorio la foto queda junto a las variantes; en celular va arriba. Los nombres, precios y variantes se leen directamente en la ficha, sin desplegables. Se conservan todos los productos, fotos y precios de `lib/menu.ts`.

Las fotografías se pueden ampliar en un diálogo con navegación entre imágenes, cierre por botón, Escape o fondo, foco nativo y bloqueo del desplazamiento de la página mientras está abierto. Las tres categorías principales permanecen visibles al recorrer el menú; los botones eligen productos y las flechas cambian la ficha activa. La navegación superior usa rótulos e iconos más legibles y un acceso al menú destacado en celular. Ronny se reduce en portada y encabezado para dar más presencia al truck.


## Imágenes y distribución móvil

Las imágenes están ordenadas en `public/images/`: `brand/` para logos, `hero/` para portadas, `ronny/` para personajes, `menu/` con subcarpetas de platillos y cartas, y `archive/` para recursos anteriores. El cambio de carpetas conserva el contenido de los archivos y actualiza todas sus referencias. Los personajes se mantienen dentro de su espacio de diseño, con transparencia y sin marcos.

Los Ronnys de apoyo se reparten entre menú, promoción, domicilio, historia y ubicación; el del menú cambia con su categoría. La historia familiar y los momentos cotidianos se reúnen en una sola sección. El unicornio con su ama sigue en el footer. Los iconos tipo emoji de portada abren el producto correspondiente y conservan sus nombres accesibles.

`business.deliveryWhatsappUrl` prepara una consulta sobre cobertura, costo y disponibilidad. La página no promete zonas, tiempos ni tarifas y no envía el mensaje automáticamente. En celular una barra inferior ofrece acceso a menú y domicilio, respeta el área segura y deja espacio al final para no tapar contenido.

El teléfono actual procede de la captura de WhatsApp Business: +52 56 5390 1358. Se usa `https://wa.me/525653901358` (sin el antiguo prefijo móvil 1) y `tel:+525653901358` en todos los accesos. La captura contiene horarios distintos; se conserva el horario confirmado expresamente por el propietario hasta una nueva confirmación.

## Ronny’s por temporadas

`#temporadas`, después de menú y domicilio, presenta Halloween como campaña actual y Navidad como próxima. El adelanto navideño usa `public/images/seasons/ronny-christmas.png`: Ronny café de Santa con malteada y hot dog, ilustrado a partir de la referencia del propietario y con transparencia real. No hay cambio automático de campaña, fecha de lanzamiento ni ofertas de Navidad inventadas. «Temporadas» aparece en navegación de escritorio y móvil; se conserva Halloween en portada. Las dos campañas llevan al menú existente.

## Menú compacto e interacción de Ronny

`components/interactive-menu.tsx` reúne la navegación por categoría, búsqueda global y ficha de producto. `components/interactive-menu.css` contiene sus estilos. Solo se monta una `MenuCard`; no se recortan precios ni se eliminan productos de `lib/menu.ts`. Se mantienen las fotografías originales y su ampliación accesible con Escape, foco contenido y retorno al botón. Las consultas de WhatsApp son borradores que el cliente envía por su cuenta.

Ronny usa cuatro disfraces completos en `public/images/ronny/halloween/`, registrados en `lib/ronny-costumes.ts`: bruja con túnica, capa, botas y escoba para Dulces; fantasma con sábana de cuerpo completo para Bebidas; diablito con traje rojo, alas y cola para Salados; zombi con ropa de parches y botas para los snacks salados. Se conserva su cara café/caramelo reconocible. En escritorio acompaña el menú a un lado; en celular se integra antes de los productos sin tapar controles. El mismo diablito acompaña domicilio y el zombi cuida sus gusgerías en la historia. No hay rotación por tiempo ni selector manual de disfraces. La composición se inspira en la captura de culichi.lat proporcionada por el propietario; el entorno bloqueó su apertura con `Tunnel connection failed: 403 Forbidden`.

## Personajes aprobados e icono del navegador

Las ilustraciones de Ronny con playerita deportiva roja y cobija, lamiéndose la nariz, y del dúo unicornio/conejito quedan fijas por indicación del propietario. Sus PNG se conservan byte por byte; los disfraces nuevos usan archivos separados. La ilustración con el abuelo sigue pendiente de referencia.

Los metadatos de `app/layout.tsx` usan `/images/brand/ronny-flat-logo.png` como icono de pestaña, acceso directo e icono Apple. Se reutiliza la cara aprobada sin modificarla ni pedir servicios externos.

## Menú de Halloween

La sección usa las fuentes locales Creepster y Lilita One, fondo violeta nocturno, acentos calabaza, telarañas y murciélagos decorativos sin bloquear controles. El movimiento se desactiva con `prefers-reduced-motion`. El resto de las secciones mantiene la ambientación nocturna; Navidad sigue siendo solo un adelanto.

Las categorías muestran como máximo seis miniaturas con fotografía, nombre y precio por página, con botones anterior/siguiente y contador. La ficha seleccionada conserva variantes y precios visibles. Así se recorren los 28 productos sin apilar 28 tarjetas ni esconder la carta original; la búsqueda abarca todo el catálogo.

## Escena del footer

`components/site-footer.tsx` y `components/site-footer.css` construyen el footer como contenido real y adaptable, no como una captura pegada. Los enlaces de «Explora» llevan a las secciones existentes de inicio, menú, ubicación, temporadas e historia. Los iconos de navegación son SVG decorativos y los logos sociales conservan nombres accesibles y sus previews locales.

Las dos ilustraciones de `public/images/scenes/`, reservadas al footer, contienen únicamente escenario: árboles, telarañas, calabazas y luces. No incluyen letras, logos ni personajes. Una panorámica para escritorio y otra vertical para móvil mantienen la decoración alrededor del contenido. `<picture>` con `getImageProps` de Next sirve una sola versión optimizada por pantalla. El degradado superior se funde con el fondo violeta de la página. La ilustración aprobada de Ronny con su dueña permanece separada, transparente e intacta.

## Ubicación con ambiente de Halloween

`components/visit-section.tsx` y su CSS reúnen contacto, mapa y foto real del truck siguiendo la nueva referencia visual. El teléfono, WhatsApp, dirección y horario proceden de `lib/business.ts`; no se copia el email del mockup. La foto real original del truck se conserva sin editar y se encuadra con CSS; puede abrirse completa. En celular, el mapa ocupa el ancho disponible y la foto se vuelve compacta. El Ronny aprobado de la nariz aparece fuera de las tarjetas.

Las opiniones usan tres accesos a la ficha real: consultar experiencias, compartir la visita y ver las fotos. No se publican como reales los testimonios, nombres, estrellas ni cantidades del mockup. Se conserva la decisión del propietario de no usar APIs de reseñas o redes ni solicitar claves.

La marca y el cierre del footer usan Creepster, también en el copyright y el enlace «Un antojo más». La cara de Ronny del encabezado aumenta a 76 px en escritorio y 60 px en celular, manteniendo los controles y la altura del encabezado.

El dúo aprobado se integra al escenario con sombra de contacto, luz cálida y hierba por delante de los pies (`FooterFamilyGround`). En celular, una loma de césped continúa hasta el borde de la escena, sin una base flotante. El PNG de los personajes no se edita ni se regenera. No se añade animación continua.

El escenario completo se adapta al ancho y alto del footer, sin el recorte de `object-fit: cover`. La composición usa el espacio disponible bajo el encabezado en escritorio (con límites para pantallas muy bajas o muy altas); en celular conserva el flujo natural y los controles táctiles. Las luces de la ilustración se muestran directamente, sin una segunda guirnalda encima. Las previews sociales flotan sobre el contenido: abrirlas, cambiarlas o cerrarlas no cambia la altura, el fondo ni el desplazamiento de la página. El cierre devuelve el foco al logo sin desplazar la pantalla.

## Promo y poses del menú

`FridayPromo` presenta la oferta existente de viernes como «2 malteadas por $100», con el Ronny deportivo aprobado más grande, tipografía de marca y un cupón claro con enlace para consultar disponibilidad por WhatsApp. La imagen original no se edita y el mensaje no se envía automáticamente.

Dulces y Salados usan nuevas poses en archivos transparentes separados, registrados en `lib/ronny-costumes.ts`: bruja sentada y volando en su escoba con waffle, y diablito inclinado que sirve una hamburguesa con ambas patas. Se conservan los disfraces completos, la cara y el color café de Ronny; los PNG anteriores no se eliminan. Fantasma y zombi mantienen sus imágenes.

El fondo de ubicación se diferencia del footer con `VisitNightScenery`: siluetas urbanas, faroles, luna y murciélagos en SVG sobre degradados violetas y azul noche. Es una decoración ilustrativa y no representa calles, coordenadas o un lugar nuevo. No reutiliza las ilustraciones del bosque y calabazas del footer ni solicita imágenes externas.

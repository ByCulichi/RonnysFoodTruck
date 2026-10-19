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

El footer «Más de Ronny’s» reúne Google, WhatsApp, Instagram, Facebook, TikTok y X en un solo grupo. Google y WhatsApp tienen enlaces confirmados; los demás muestran una vista previa con «Enlace oficial pendiente» hasta recibir sus perfiles oficiales. Los seis logos son grandes, centrados, con efecto neón y sin etiquetas visibles; se seleccionan por ratón, teclado o toque para ver una vista previa local y los accesos confirmados. Ronny de unicornio con su ama de conejito ocupa el footer, sin recuadro; el anfitrión de Halloween acompaña el acceso a domicilio. El enlace `#contacto` lleva al footer.

## Próximos cambios

Crear una rama desde `main`, implementar y validar el cambio, subirla y abrir un PR completo con resumen, pruebas y pendientes. No fusionar automáticamente. Mantener intactas las ilustraciones `public/images/hero/ronny-family-truck.png` y `public/images/archive/ronny/ronny-outfits.png` salvo petición explícita.

## Menú y datos de contacto

El menú compacto tiene tres categorías (Dulces, Salados y Bebidas), búsqueda global por nombre e ingredientes sin distinguir acentos y una sola ficha activa. Los productos se eligen con botones que muestran su precio inicial; la ficha conserva foto, descripción, variantes y todos sus precios visibles. Las flechas permiten recorrer los productos de la categoría sin apilar tarjetas. Ronny aparece fuera de la ficha y cambia automáticamente de atuendo al elegir categoría, según la preferencia del propietario; no hay selector manual de outfits. Los iconos de portada abren su producto y limpian una búsqueda anterior.

Los datos proporcionados por el propietario están centralizados en `lib/business.ts`: New York, Ecatepec de Morelos, 55330, Estado de México; teléfono 56 5390 1358; viernes, sábado y domingo de 7 p. m. a 12 a. m., cerrado de lunes a jueves. Los enlaces permiten buscar la dirección en Maps, llamar o abrir WhatsApp; no se envían mensajes automáticamente.

## Google Maps y opiniones

La ficha oficial proporcionada por el propietario es https://maps.app.goo.gl/7YXxNfNkTWyo46yR8. El mapa integrado usa la dirección confirmada. Las opiniones se consultan directamente mediante enlaces a la ficha de Google.

Por indicación del propietario, no se usan APIs de reseñas/redes, no se hacen consultas automáticas y no se solicitan claves. Se retiró la integración de Places API y su endpoint. Los perfiles sociales, seguidores y previews de publicaciones reales quedan pendientes de sus enlaces oficiales; el footer ofrece previews locales de contacto y ficha, sin consultas automáticas; no se inventan cifras.

## Identidad de Ronny

Su color de marca es café/caramelo por la última corrección del propietario, con orejas rosas, ojos grandes y lengua de lado. Esa identidad se mantiene en el logo y todas las ilustraciones activas. El cierre de la página muestra a Ronny con disfraz de unicornio junto a su ama pelirroja, de piel clara, con disfraz de conejito, ambos en caricatura plana y con transparencia real. Dos personajes adicionales lo muestran con su playerita roja Adidas y lamiéndose la nariz. La ilustración con su abuelo queda pendiente hasta recibir referencia, por indicación del propietario.

El encabezado usa tipografía de Halloween, Ronny visible, navegación con sección activa y acceso destacado al menú. El footer repite su cara y reúne todos los canales en un solo bloque, sin perfiles ni cifras inventados.


## Carta y fotos reales

`lib/menu.ts` centraliza 16 familias de antojos con sus variantes y precios, transcritos de las tres fotos de la carta de `ronnys.zip`. Las cartas originales se conservan en `public/images/menu/cartas/carta-{dulces,salados,bebidas}.jpg` y se pueden consultar desde el menú. Se actualizan, entre otros, papas locas a $40, francesas a $45, nachos a $50 y salchipulpos a $60; se incorporan hamburguesas desde $75, hot dogs desde $20, banderillas saladas $55 y dulces $45, alitas desde $85 y bebidas de la carta.

Las 13 fotos de comida del ZIP se conservan sin retoque en `public/images/menu/` y se usan en tarjetas y selectores de fotos: tres crepas, dos malteadas, dos hamburguesas, tres frutas con crema, waffle, hotcakes y salchipulpos. Las imágenes verticales se adaptan con CSS. Los productos sin foto usan iconos ilustrados, no fotografías ficticias. El menú añade tipos de antojo ilustrados, letra local Lilita One y opciones con todos los precios visibles. La foto real del truck también se conserva como recurso. No se modifican las cartas originales ni se publican las referencias antiguas de personajes como si fueran platillos.


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

Ronny usa tres PNG individuales en `public/images/ronny/menu/`: dulces (repostero con waffle), salados (anfitrión con hot dog), bebidas (malteadero). Se generaron a partir de las ilustraciones existentes para mantener identidad café/caramelo y Halloween, con alpha real, sin fondos ni marco alrededor del personaje. En escritorio acompaña el menú a un lado; en celular se integra de forma compacta antes de los productos y nunca tapa los controles. La composición se inspira en la captura de culichi.lat proporcionada por el propietario; el entorno bloqueó la apertura de la web con `Tunnel connection failed: 403 Forbidden`, por lo que no se afirma haber probado su interacción en vivo.

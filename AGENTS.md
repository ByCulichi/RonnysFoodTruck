# Ronny’s Food Truck

- Usar el checkout existente; cada tarea cloud ya está aislada. No crear worktrees salvo petición explícita.
- Mantener a Ronny junto al carrito rojo y la familia, la paleta oscura con rojo y dorado, los personajes distribuidos y los filtros adaptables del menú.
- Ronny usa el estilo de caricatura plana de la referencia del propietario: café/caramelo como la última referencia del propietario, ojos grandes, orejas rosas, lengua de lado y pañuelo rojo. Mantener esa identidad en portada, icono y atuendos; no convertirlo a 3D ni cambiar las marcas faciales respecto a la referencia de cada campaña.
- No inventar teléfonos, direcciones, horarios ni credenciales.
- Nunca enviar correos reales durante pruebas. Mantener el contacto desactivado en previews.
- Usar Node 22 y npm: `npm ci --legacy-peer-deps`, `npm run typecheck`, `npm audit`, `npm run build`.
- Para cambios posteriores a la importación inicial: trabajar en una rama y entregar un PR completo con resumen, validaciones y pendientes. No fusionarlo automáticamente.
- Solo desplegar previews salvo autorización explícita de producción. No cambiar dominios de producción sin consultar.
- Si faltan permisos, reportar el código HTTP y el mensaje exacto sin credenciales. No presentar un build local o una captura como preview navegable.

- Personalidad de Ronny: enojón, valiente, leal, protector y defensor de su familia; divertido y fan de las gusgerías. Mantener estos rasgos en textos y personajes. Incluir atuendos de temporada en el mismo estilo plano.

- Prioridad de la página: el food truck, la comida y Ronny. La portada y el menú deben ocupar el primer plano; personajes, outfits e historia familiar son secciones complementarias después del menú.

- Durante la campaña actual de Halloween, el personaje principal de la portada es Ronny con sombrero de hechicero y capa; debe verse al abrir la página, sin usar el selector. No hay selector de looks: distribuir personajes visibles por las secciones. Mantener food truck y comida en primer plano.

- No incluir «Elige mi look» ni botones para cambiar personajes. Los Ronnys se ven directamente en portada, menú, promoción, historia, ubicación y contacto.

- Por la última elección del propietario, Ronny usa disfraces COMPLETOS de Halloween, no solo gorros: bruja en Dulces, fantasma en Bebidas frías, vampiro barista en Bebidas calientes, diablito en Salados y zombi para los snacks salados. La elección es automática por categoría/producto, sin selector manual. Usar `lib/ronny-costumes.ts` y los PNG transparentes de `public/images/ronny/halloween/`, fuera de las tarjetas.

- Datos confirmados del negocio: `lib/business.ts`. Dirección New York, Ecatepec de Morelos, 55330, Estado de México; teléfono 56 5390 1358; viernes a domingo 19:00–00:00, lunes a jueves cerrado. No agregar número de inmueble o coordenadas sin que el propietario los proporcione.

- Todos los Ronnys de apoyo deben usar archivos individuales con transparencia real, sin sprites recortados, fondos rectangulares, bordes o tarjetas.
- Ficha oficial de Google: https://maps.app.goo.gl/7YXxNfNkTWyo46yR8. Redes sociales, seguidores y previews pendientes de los enlaces oficiales por indicación del propietario. No inventar reseñas, calificaciones, perfiles ni cantidades.

- Por indicación del propietario, no usar APIs de reseñas/redes ni pedir claves o credenciales. Mantener mapa y enlaces oficiales sin integración de Places API.
- Ronny conserva el color café/caramelo por la última corrección del propietario. Su ama pelirroja de piel clara con disfraz de conejito y Ronny de unicornio van al footer, con transparencia real y sin recuadros.

- El footer de Halloween recrea la composición de la última referencia del propietario: imagen aprobada de la dueña con Ronny a la izquierda, navegación real «Explora» al centro, marca y título naranja «Aquí sigue el antojo» a la derecha y los seis logos neón bajo «Síguenos», centrados. Adaptar las columnas para celular. Por la última petición del propietario, no repetir en el footer la fila de dirección, teléfono y horarios: esos datos permanecen en ubicación y en las previews locales de los logos. El contenido debe ser HTML real sobre decoración nueva e independiente, nunca pegar la captura del propietario como footer. Las previews son una franja discreta que aparece solo al activar un logo; no restaurar la tarjeta grande permanente de WhatsApp ni separar canales en tarjetas. No restaurar el formulario «¿Platicamos algo rico?». El diablito acompaña domicilio y el zombi, la presentación breve junto a la carta; el dúo unicornio/conejito se conserva en el footer; `#contacto` apunta allí.

- El menú usa las fotos reales y los precios de las tres cartas de ronnys.zip, transcritos en `lib/menu.ts`. No inventar precios. El propietario autorizó crear imágenes para los productos sin foto: conservar las 13 fotos reales del ZIP y las tres cartas sin retoques; guardar los recursos generados por separado y marcarlos como «Imagen ilustrativa», sin presentarlos como fotos reales del negocio.
- Añadir a Ronny con playerita deportiva roja y su gesto de lamerse la nariz; la ilustración con su abuelo queda pendiente por indicación del propietario hasta tener referencia.

- Priorizar la lectura del cliente: menú compacto por Dulces/Salados/Bebidas frías/Bebidas calientes y una sola ficha de producto activa, con foto, precios y variantes visibles sin desplegables. No volver a apilar todas las fichas en celular. Mantener búsqueda global, ampliación de fotos accesible y accesos de portada a la categoría correcta. Ronny acompaña la portada con menor tamaño y el truck conserva protagonismo.

- Las imágenes se organizan bajo `public/images/`: brand, hero, ronny, menu por categoría y archive para recursos anteriores. Actualizar rutas al moverlas y conservar los bytes originales.
- Los Ronnys de apoyo se reparten por función: personaje automático por categoría en menú, playerita roja en promoción, diablito en domicilio, zombi en historia y nariz en ubicación. La historia se resume junto a la carta, sin sección extensa independiente ni agrupación de varios personajes allí. El dúo unicornio/conejito permanece al final.
- La portada usa cuatro iconos tipo emoji con nombres accesibles y enlaces al filtro correspondiente. Domicilio se consulta por WhatsApp, sin inventar cobertura, costos o tiempos ni enviar mensajes durante pruebas. Mantener accesos móviles a menú y domicilio sin tapar contenido.

- WhatsApp actualizado por el propietario: +52 56 5390 1358, `https://wa.me/525653901358`. Mantener el mismo número en llamadas, domicilio y la preview de WhatsApp del footer. Los logos del footer son grandes, centrados, estilo neón y sin etiquetas visibles, con nombres accesibles y previews locales al tocar, pasar el ratón o activar con teclado. Perfiles sociales oficiales siguen pendientes; no inventar publicaciones, enlaces o seguidores.

- «Ronny’s por temporadas» (`#temporadas`) reúne la campaña actual de Halloween y el adelanto de Navidad. El Ronny de Santa es café/caramelo, mantiene su identidad y usa transparencia real sin recuadro individual. Navidad debe seguir como «Próxima temporada», sin cambiar automáticamente la portada, inventar fechas ni ofertas.

- Personajes aprobados por el propietario, basados en sus fotos: `ronny-red-sports.png`, `ronny-nose-lick.png` y `ronny-unicorn-owner-bunny.png`. Conservar definitivamente sus imágenes, ropa, poses y colores. No regenerarlos al cambiar disfraces de campaña. La imagen con el abuelo sigue pendiente.
- El icono de la pestaña del navegador usa la cara aprobada de Ronny en `public/images/brand/ronny-flat-logo.png`, configurada en los metadatos de `app/layout.tsx`.

- Menú de Halloween: 28 productos por nombre con sus variantes y precios de las tres cartas, miniaturas con foto, seis productos por página y una sola ficha activa. Mantener búsqueda global y los disfraces automáticos de Ronny. Por la última petición del propietario, la carta se compone con texto HTML grande desde el mismo catálogo, sin fotos pequeñas dentro de tarjetas. Mostrar cuatro productos por página y ampliación digital de texto; conservar las tres fotos originales accesibles en el visor con zoom, teclado y retorno de foco.
- Las 19 imágenes nuevas de apoyo se guardan en `public/images/menu/generated/`, claramente marcadas como ilustrativas. Usar `menuPhotoUrl` para resolver fotos originales JPG y generadas PNG. Servir tamaños adaptables con Next Image y optimización activa para no descargar originales grandes en las miniaturas.

- Fondos decorativos nuevos del footer en `public/images/scenes/`: versión panorámica y versión vertical móvil, sin textos, logos ni personajes. `<picture>` y `getImageProps` eligen una sola imagen optimizada según pantalla. Mantener el degradado superior para integrar el footer con el fondo violeta de la página.

- Ubicación sigue la referencia de Halloween con contacto a la izquierda y panel «¡Visítanos!» con mapa y foto real del truck (`public/images/hero/food-truck.jpg`) a la derecha; en celular, mapa ancho y foto compacta. Ronny de la nariz acompaña fuera de la tarjeta. Las tarjetas de opiniones llevan a Google: no copiar emails, puntuaciones, cantidades, autores ni testimonios del mockup como si fueran datos confirmados.

- Marca Ronny’s y cierre del footer usan tipografía de Halloween legible, incluido el copyright y el enlace al menú. La cara del encabezado debe ser más grande (76 px en escritorio y 60 px en celular), sin aumentar la altura del encabezado ni tapar los controles.
- Integrar a Ronny y su dueña con el escenario mediante suelo, sombra, luz cálida, calabaza y hojas en capas decorativas; conservar intacto el PNG aprobado, sin recuadros. Las luces del footer son decoración independiente, adaptada al tamaño de pantalla.

- Por la última corrección del propietario, Dulces usa a la bruja sentada y volando en su escoba (`ronny-bruja-flying.png`) y Salados al diablito que ofrece una hamburguesa con ambas patas (`ronny-diablito-serving.png`), en poses distintas. Conservar los PNG anteriores como recursos y mantener la selección automática.
- La promoción de viernes usa `FridayPromo`, con el Ronny aprobado de playerita roja más grande y oferta clara «2 malteadas por $100». Conservar precio y día; el acceso de WhatsApp solo prepara una consulta, sin enviar mensajes.

- Por la última corrección del propietario, el escenario del mapa debe ser distinto del footer: ubicación usa noche urbana violeta con faroles, luna y murciélagos (`VisitNightScenery`), sin repetir el bosque o las calabazas grandes del footer. Es decoración ilustrativa, no un plano o una dirección nueva. Mantener el mapa y la foto real.

- El footer debe mostrar la composición completa a zoom normal en escritorio, usando el alto disponible bajo el encabezado. No volver a recortar el escenario con `cover` ni añadir una segunda guirnalda sobre las luces de la ilustración. En móvil, mantener lectura y controles sin exigir zoom. Las previews sociales son flotantes y no deben cambiar la altura del footer, reescalar el fondo ni saltar el scroll; restaurar foco con `preventScroll`. El dúo aprobado se apoya sobre césped y sombra: en móvil, el terreno continúa hasta el borde del escenario, sin una plataforma flotante.

- Por la última petición del propietario, los seis logos sociales son enlaces nativos y abren su destino con un clic o Enter; la preview local aparece al pasar el ratón o enfocar, sin interceptar la navegación. Google y WhatsApp apuntan al negocio. Mientras faltan los perfiles oficiales, Instagram, Facebook, TikTok y X abren su plataforma general y la preview lo aclara; no inventar perfiles de Ronny’s.
- Menú, carta, promoción, domicilio, temporadas e historia comparten `HalloweenMarketScene`: fondo local de Halloween con luna, telarañas, calabazas, niebla, murciélagos y brasas; movimiento suave con pausa, respeto a `prefers-reduced-motion` y suspensión fuera de pantalla. Mantener legibilidad, clics y carta visible. El escenario y terreno del footer se reflejan para sostener al dúo a la izquierda, conservando intacto su PNG.

- Ronny del menú tiene cuatro opciones neón interactivas a su alrededor, inspiradas en la referencia de culichi.lat: Dulces, Salados, Bebidas frías y Bebidas calientes. Los botones filtran alimentos y cambian el atuendo automáticamente; no añadir un selector manual de ropa. `lib/menu-categories.ts` separa las bebidas existentes: Café es caliente; malteadas, frappés e ICE son fríos. No cambiar los 28 productos ni sus precios.
- `RonnyOutfitStage` mantiene el atuendo anterior hasta que el siguiente está cargado y hace una transición suave entre imágenes optimizadas, sin marco. Respetar movimiento reducido. `ronny-vampiro-barista.png` es el disfraz completo para calientes; conservar los anteriores y los tres personajes de fotos aprobados. Mantener seis miniaturas por página, búsqueda global y carta siempre visible.

- Última corrección del propietario: los cinco disfraces usan expresiones más firmes y traviesas en los archivos separados `ronny-{bruja,diablito,zombi,fantasma,vampiro}-caracter.png`. Conservar colores, poses, ropa y archivos anteriores; no tocar los tres personajes aprobados basados en fotos.
- La historia extensa se elimina como sección independiente: `#historia` es ahora una breve presentación de Ronny junto a la carta, con el zombi y un enlace a sus snacks. La carta usa los mismos 28 productos/precios; el lector permite ampliar texto o las fotos originales.
- Domicilio y temporadas incorporan un escenario local adicional de feria nocturna, con faroles de calabaza, fachadas torcidas y luz violeta/cálida. Mantenerlo decorativo y sin bloquear los controles; las animaciones compartidas conservan pausa y movimiento reducido.

- Última petición del propietario para el footer: retirar todas las previews sociales; los seis logos conservan enlaces nativos, sin panel al pasar el ratón, enfocar o tocar. «Explora» usa nuevos iconos SVG con patita y calabaza que se ilumina, movimientos breves al interactuar y respeto a movimiento reducido. El cierre tiene mejor jerarquía y lectura. La marca del footer muestra solo la cabeza de Ronny de diablito, más grande, usando `public/images/brand/ronny-devil-head.png`; conservar cara café/caramelo, orejas rosas y pañuelo rojo. El logo original del encabezado y favicon, y el dúo aprobado de la izquierda, permanecen intactos.

- Última corrección del propietario: conservar las caras enojonas, firmes y traviesas de los cinco disfraces aprobados y usar el mismo gesto en la cabeza de diablito del footer (`public/images/brand/ronny-devil-head-caracter.png`), manteniendo sus colores y orejas. Retirar el buscador del menú: la barra deja solo los cuatro logos de categoría, grandes, llamativos y con nombres accesibles, sin contadores ni etiquetas visibles. Mantener los controles alrededor de Ronny, también más visibles, la selección automática del disfraz, las 28 opciones y precios, la paginación, la ficha única y la carta. Conservar las mejoras de fluidez y no volver a montar el menú al usar accesos de portada/carta.

- El propietario confirmó que posee `ronnys.online` en GoDaddy y autorizó conectarlo al proyecto existente de Vercel. Usarlo como dominio principal y URL canónica; `www.ronnys.online` debe redirigir al principal. No crear otro proyecto ni modificar registros de correo. Los valores DNS se toman del proyecto de Vercel, sin inventarlos. La autorización de conexión del dominio no implica fusionar PRs automáticamente.

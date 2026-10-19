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

- Por la última elección del propietario, Ronny usa disfraces COMPLETOS de Halloween, no solo gorros: bruja en Dulces, fantasma en Bebidas, diablito en Salados y zombi para los snacks salados. La elección es automática por categoría/producto, sin selector manual. Usar `lib/ronny-costumes.ts` y los cuatro PNG transparentes de `public/images/ronny/halloween/`, fuera de las tarjetas.

- Datos confirmados del negocio: `lib/business.ts`. Dirección New York, Ecatepec de Morelos, 55330, Estado de México; teléfono 56 5390 1358; viernes a domingo 19:00–00:00, lunes a jueves cerrado. No agregar número de inmueble o coordenadas sin que el propietario los proporcione.

- Todos los Ronnys de apoyo deben usar archivos individuales con transparencia real, sin sprites recortados, fondos rectangulares, bordes o tarjetas.
- Ficha oficial de Google: https://maps.app.goo.gl/7YXxNfNkTWyo46yR8. Redes sociales, seguidores y previews pendientes de los enlaces oficiales por indicación del propietario. No inventar reseñas, calificaciones, perfiles ni cantidades.

- Por indicación del propietario, no usar APIs de reseñas/redes ni pedir claves o credenciales. Mantener mapa y enlaces oficiales sin integración de Places API.
- Ronny conserva el color café/caramelo por la última corrección del propietario. Su ama pelirroja de piel clara con disfraz de conejito y Ronny de unicornio van al footer, con transparencia real y sin recuadros.

- El footer «Aquí sigue el antojo» reúne contacto, horarios, la dueña con Ronny y los seis logos neón en un grupo centrado. Las previews son una franja discreta que aparece solo al activar un logo; no restaurar la tarjeta grande permanente de WhatsApp ni separar canales en tarjetas. No restaurar el formulario «¿Platicamos algo rico?». El diablito acompaña domicilio y el zombi, la historia; el dúo unicornio/conejito se conserva en el footer; `#contacto` apunta allí.

- El menú usa las fotos reales y los precios de las tres cartas de ronnys.zip, transcritos en `lib/menu.ts`. No inventar precios ni fotografías de productos. Los iconos ilustrados representan categorías sin foto disponible.
- Añadir a Ronny con playerita deportiva roja y su gesto de lamerse la nariz; la ilustración con su abuelo queda pendiente por indicación del propietario hasta tener referencia.

- Priorizar la lectura del cliente: menú compacto por Dulces/Salados/Bebidas y una sola ficha de producto activa, con foto, precios y variantes visibles sin desplegables. No volver a apilar todas las fichas en celular. Mantener búsqueda global, ampliación de fotos accesible y accesos de portada a la categoría correcta. Ronny acompaña la portada con menor tamaño y el truck conserva protagonismo.

- Las imágenes se organizan bajo `public/images/`: brand, hero, ronny, menu por categoría y archive para recursos anteriores. Actualizar rutas al moverlas y conservar los bytes originales.
- Los Ronnys de apoyo se reparten por función: personaje automático por categoría en menú, playerita roja en promoción, diablito en domicilio, zombi en historia y nariz en ubicación. La historia y los momentos cotidianos forman una sola sección; no volver a agrupar varios personajes allí. El dúo unicornio/conejito permanece al final.
- La portada usa cuatro iconos tipo emoji con nombres accesibles y enlaces al filtro correspondiente. Domicilio se consulta por WhatsApp, sin inventar cobertura, costos o tiempos ni enviar mensajes durante pruebas. Mantener accesos móviles a menú y domicilio sin tapar contenido.

- WhatsApp actualizado por el propietario: +52 56 5390 1358, `https://wa.me/525653901358`. Mantener el mismo número en llamadas, domicilio y footer. Los logos del footer son grandes, centrados, estilo neón y sin etiquetas visibles, con nombres accesibles y previews locales al tocar, pasar el ratón o activar con teclado. Perfiles sociales oficiales siguen pendientes; no inventar publicaciones, enlaces o seguidores.

- «Ronny’s por temporadas» (`#temporadas`) reúne la campaña actual de Halloween y el adelanto de Navidad. El Ronny de Santa es café/caramelo, mantiene su identidad y usa transparencia real sin recuadro individual. Navidad debe seguir como «Próxima temporada», sin cambiar automáticamente la portada, inventar fechas ni ofertas.

- Personajes aprobados por el propietario, basados en sus fotos: `ronny-red-sports.png`, `ronny-nose-lick.png` y `ronny-unicorn-owner-bunny.png`. Conservar definitivamente sus imágenes, ropa, poses y colores. No regenerarlos al cambiar disfraces de campaña. La imagen con el abuelo sigue pendiente.
- El icono de la pestaña del navegador usa la cara aprobada de Ronny en `public/images/brand/ronny-flat-logo.png`, configurada en los metadatos de `app/layout.tsx`.

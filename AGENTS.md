# Ronny’s Food Truck

- Usar el checkout existente; cada tarea cloud ya está aislada. No crear worktrees salvo petición explícita.
- Mantener a Ronny junto al carrito rojo y la familia, la paleta oscura con rojo y dorado, los personajes distribuidos y los filtros adaptables del menú.
- Ronny usa el estilo de caricatura plana de la referencia del propietario: crema claro o marfil (su color natural), ojos grandes, orejas rosas, lengua de lado y pañuelo rojo. Mantener esa identidad en portada, icono y atuendos; no convertirlo a 3D ni cambiar las marcas faciales respecto a la referencia de cada campaña.
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

- El Ronny junto al menú prepara una malteada con outfit de Halloween y fondo transparente, sin recuadro, borde ni tarjeta; su pose se integra visualmente con el contenido.

- Datos confirmados del negocio: `lib/business.ts`. Dirección New York, Ecatepec de Morelos, 55330, Estado de México; teléfono 56 5234 6248; viernes a domingo 19:00–00:00, lunes a jueves cerrado. No agregar número de inmueble o coordenadas sin que el propietario los proporcione.

- Todos los Ronnys de apoyo deben usar archivos individuales con transparencia real, sin sprites recortados, fondos rectangulares, bordes o tarjetas.
- Ficha oficial de Google: https://maps.app.goo.gl/7YXxNfNkTWyo46yR8. Redes sociales, seguidores y previews pendientes de los enlaces oficiales por indicación del propietario. No inventar reseñas, calificaciones, perfiles ni cantidades.

- Por indicación del propietario, no usar APIs de reseñas/redes ni pedir claves o credenciales. Mantener mapa y enlaces oficiales sin integración de Places API.
- Ronny es crema claro, no café ni caramelo. Añadir a su ama pelirroja de piel clara con disfraz de conejito y a Ronny con disfraz de unicornio en la historia, con transparencia real y sin recuadros.

- El footer «Más de Ronny’s» reúne Google, WhatsApp y todas las redes en un mismo grupo. No separar Google/WhatsApp en tarjetas. No restaurar la sección ni el formulario «¿Platicamos algo rico?». Conservar su Ronny anfitrión de Halloween sin marco en el footer; `#contacto` apunta allí.

# Ronny’s Food Truck

- Usar el checkout existente; cada tarea cloud ya está aislada. No crear worktrees salvo petición explícita.
- Mantener a Ronny junto al carrito rojo y la familia, la paleta oscura con rojo y dorado, los tres atuendos y los filtros adaptables del menú.
- No inventar teléfonos, direcciones, horarios ni credenciales.
- Nunca enviar correos reales durante pruebas. Mantener el contacto desactivado en previews.
- Usar Node 22 y npm: `npm ci --legacy-peer-deps`, `npm run typecheck`, `npm audit`, `npm run build`.
- Para cambios posteriores a la importación inicial: trabajar en una rama y entregar un PR completo con resumen, validaciones y pendientes. No fusionarlo automáticamente.
- Solo desplegar previews salvo autorización explícita de producción. No cambiar dominios de producción sin consultar.
- Si faltan permisos, reportar el código HTTP y el mensaje exacto sin credenciales. No presentar un build local o una captura como preview navegable.

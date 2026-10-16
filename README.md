# Ronny’s Food Truck

Rediseño importado desde [ByCulichi/RonnysPage, PR #2](https://github.com/ByCulichi/RonnysPage/pull/2), commit `d990872dfc0fecb37fe31077c45422a54bd7d394` (incluido en el historial). Conserva a Ronny, el carrito rojo y la familia, los seis atuendos seleccionables, los filtros del menú y el diseño adaptable oscuro, rojo y dorado.

## Identidad nocturna

La portada toma como referencia el cartel compartido por el propietario: Ronny en caricatura plana de color café, ojos grandes, orejas rosas, lengua de lado y pañuelo rojo; carrito rojo, guirnaldas cálidas y letras grandes con contorno crema. La nueva ilustración está en `public/ronny-night-truck.png`; las ilustraciones originales se conservan como archivos. La página utiliza el mismo Ronny plano en la portada, el icono (`public/ronny-flat-logo.png`) y seis atuendos: chef, malteadero, anfitrión (`public/ronny-flat-outfits.png`), enojón, guardián y hechicero (`public/ronny-personalities.png`). Ronny es enojón, valiente, leal, protector, defensor y divertido; le encantan las gusgerías. El horario confirmado es viernes, sábado y domingo de 7 p. m. a 12 a. m. La fuente local Lilita One se distribuye con su licencia SIL OFL en `public/fonts/` y no requiere solicitudes a Google Fonts.

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

## Contacto: pendiente de configuración

El formulario está **desactivado por defecto**, y también en cualquier deployment con `VERCEL_ENV=preview`. No utiliza destinatarios de ejemplo y no envía correos durante las pruebas.

En Vercel, configurar únicamente para producción cuando se haya aprobado su activación:

- `RESEND_API_KEY`: clave de Resend, guardar como secreto.
- `CONTACT_EMAIL_FROM`: remitente con dominio verificado en Resend.
- `CONTACT_EMAIL_TO`: destinatario real aprobado por el propietario.
- `CONTACT_EMAIL_ENABLED=true`: activar solo después de configurar lo anterior.

`.env.example` documenta los nombres sin credenciales. No incluir secretos en Git, capturas o mensajes. El contacto no está listo para uso real hasta completar esta configuración. No se han agregado teléfonos, direcciones ni horarios; la zona mencionada procede del proyecto original y el sitio pide confirmar punto y horario.

## Próximos cambios

Crear una rama desde `main`, implementar y validar el cambio, subirla y abrir un PR completo con resumen, pruebas y pendientes. No fusionar automáticamente. Mantener intactas las ilustraciones `public/ronny-family-truck.png` y `public/ronny-outfits.png` salvo petición explícita.

# Axel Coracero — Portafolio

[![CI y GitHub Pages](https://github.com/coracer0/presentasion/actions/workflows/ci-cd-main.yml/badge.svg)](https://github.com/coracer0/presentasion/actions/workflows/ci-cd-main.yml)

Portafolio público de Axel Coracero, centrado en negocios locales y software con trato humano. Incluye 70 ideas clasificadas y seis demostraciones interactivas con **datos ficticios**. Las ideas y demos no representan proyectos entregados a clientes.

## Requisitos e instalación

- Node.js 24 o una versión LTS compatible con Vite 8.
- `npm ci`
- `npm run dev`

Abrir la URL local mostrada por Vite. Las páginas disponibles son `/`, `/card.html`, `/print-card.html`, `/overlay.html` y los seis casos de `/casos/`.

## Comandos

| Comando                | Función                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run typecheck`    | Revisa tipos TypeScript.                                          |
| `npm run lint`         | Revisa ESLint estricto.                                           |
| `npm run format:check` | Verifica Prettier.                                                |
| `npm test`             | Prueba lógica de demos, URL del overlay y contenido del catálogo. |
| `npm run build`        | Genera `dist/` para GitHub Pages.                                 |
| `npm run preview`      | Revisa el build local.                                            |

## Qué hacen las demos

- **Podcast y directos:** cambia escenas, rótulos y color. Copia la URL resultante y agrégala como _Browser Source_ en OBS con lienzo 1920 × 1080. El fondo de `/overlay.html` es transparente. Cambiar el diseño desde esta página no controla OBS en tiempo real; actualiza la URL de la fuente para aplicar otra configuración.
- **Reservas:** elige un horario, confírmalo y comprueba que quede ocupado dentro de esa sesión local. No se conecta a WhatsApp ni a un calendario.
- **Monitor de precios:** ajusta un umbral y simula una baja para visualizar una alerta. No consulta tiendas.
- **Restaurante:** agrega platillos y confirma un resumen de pedido. No cobra ni envía órdenes.
- **Mensajes:** explora respuestas a preguntas habituales y la opción de pedir atención humana. No se conecta a WhatsApp.
- **Cotizaciones:** calcula un presupuesto ficticio para una imprenta y revisa su desglose. No genera una oferta comercial.

Las 40 fichas de scripts incluyen problema, disparador, entrada de ejemplo, proceso, salida, integraciones posibles y límites. El contenido está en `src/data/`; la lógica pura de las demos está en `src/lib/`.

## Casos y experiencia

Cada demo tiene una página HTML compartible con problema, público, aporte, decisión de diseño, límites y una forma de medir el resultado: [reservas](https://coracer0.github.io/presentasion/casos/reservas.html), [pedidos](https://coracer0.github.io/presentasion/casos/pedidos.html), [precios](https://coracer0.github.io/presentasion/casos/precios.html), [directos](https://coracer0.github.io/presentasion/casos/directos.html), [mensajes](https://coracer0.github.io/presentasion/casos/mensajes.html) y [cotizaciones](https://coracer0.github.io/presentasion/casos/cotizaciones.html). Los resultados descritos son de simulación; no se presentan cifras ni clientes inventados.

La portada permite recorrer ejemplos según la necesidad del visitante. La biblioteca muestra ocho ideas al inicio y permite explorar las 70. La búsqueda ignora acentos. Las demos se cargan cuando se abren y un error en una demo queda aislado. El menú móvil, los diálogos y el enlace para saltar al contenido se pueden usar con teclado. Las animaciones breves respetan `prefers-reduced-motion`.

## Publicación

El proyecto mantiene la ruta pública `https://coracer0.github.io/presentasion/`. Vite usa `base: '/presentasion/'`. El workflow `ci-cd-main.yml` instala desde el lockfile, comprueba formato, lint, tipos, pruebas y build, y publica `dist/` en GitHub Pages después de un push a `main`. GitHub Pages ya usa **GitHub Actions** como origen del despliegue.

## Contenido y privacidad

Las personas, marcas, precios y horarios de los prototipos son ficticios. La experiencia profesional privada de Axel se describe sin compartir código, capturas ni datos de terceros. Los datos introducidos en las demos se mantienen en el navegador; el overlay codifica texto visible en su URL, por lo que no se deben incluir secretos ni datos de clientes.

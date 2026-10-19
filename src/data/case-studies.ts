import type { DemoId } from "./portfolio.types";
import type { CaseStudy } from "./case-studies.types";

export const caseStudies: Record<DemoId, CaseStudy> = {
  appointments: {
    id: "appointments",
    slug: "reservas",
    title: "Reservas sin mensajes de ida y vuelta",
    summary: "Un cliente elige horario y recibe una confirmación clara.",
    problem:
      "Coordinar horarios por mensajes consume tiempo y puede duplicar citas.",
    audience:
      "Negocios que atienden con agenda y personas que reservan una cita.",
    tryHere: "Elige uno de tres horarios y confirma una reserva de muestra.",
    decision: "Un horario confirmado deja de ofrecerse durante esta sesión.",
    limit: "No se conecta a WhatsApp ni a un calendario real.",
    realWorld:
      "Definir disponibilidad, cancelaciones, permisos y mensajes de confirmación.",
    measure:
      "Tiempo para reservar y porcentaje de citas que requieren ayuda humana.",
  },
  restaurant: {
    id: "restaurant",
    slug: "pedidos",
    title: "Del menú a un pedido claro",
    summary: "Una página cálida con platos, carrito y resumen de muestra.",
    problem:
      "Un menú difícil de recorrer hace que pedir requiera llamadas o mensajes extra.",
    audience:
      "Restaurantes y clientes que quieren elegir antes de contactar al negocio.",
    tryHere: "Agrega platillos al carrito y confirma un resumen ficticio.",
    decision: "El precio y el total se mantienen visibles mientras se elige.",
    limit: "No cobra, no comprueba inventario y no envía pedidos.",
    realWorld:
      "Conectar horarios, disponibilidad, pagos y recepción de órdenes.",
    measure:
      "Pedidos iniciados, pedidos completados y dudas antes de confirmar.",
  },
  prices: {
    id: "prices",
    slug: "precios",
    title: "Avisos cuando un precio cambia",
    summary: "Configura cuánto debe bajar un producto para mostrar una alerta.",
    problem:
      "Revisar precios a mano consume tiempo y hace fácil pasar por alto un cambio.",
    audience: "Equipos que siguen productos o referencias de precio.",
    tryHere:
      "Elige una baja mínima y simula un cambio con productos ficticios.",
    decision:
      "La alerta explica el producto, la diferencia y la regla que se cumplió.",
    limit: "No consulta comercios ni envía notificaciones.",
    realWorld:
      "Elegir fuentes permitidas, frecuencia, historial y canal de avisos.",
    measure:
      "Alertas útiles frente a alertas descartadas y tiempo de revisión.",
  },
  podcast: {
    id: "podcast",
    slug: "directos",
    title: "Gráficos para podcast y directos",
    summary: "Personaliza una escena y llévala a una transmisión de muestra.",
    problem:
      "Preparar rótulos para cada episodio lleva tiempo y rompe la identidad visual.",
    audience: "Productoras, creadores y equipos que transmiten en vivo.",
    tryHere: "Cambia escena, nombres y color; copia una URL para OBS.",
    decision:
      "Una misma configuración genera una vista previa y una fuente de navegador 16:9.",
    limit:
      "La URL no controla una transmisión en tiempo real; hay que actualizar la fuente.",
    realWorld:
      "Adaptar marca, escenas, resolución y operación del equipo de producción.",
    measure:
      "Tiempo para preparar un episodio y errores de rótulos detectados antes de salir al aire.",
  },
};

export function getCaseUrl(id: DemoId): string {
  return `${import.meta.env.BASE_URL}casos/${caseStudies[id].slug}.html`;
}

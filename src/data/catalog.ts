import rawCatalog from "./catalog.json";
import { automationExamples } from "./examples";
import type { PortfolioItem } from "./portfolio.types";

const landingDescriptions: Record<string, string> = {
  "landing-1":
    "Una presentación de producto centrada en el beneficio principal y la descarga.",
  "landing-2":
    "Un menú visual que permite explorar platillos y comenzar un pedido.",
  "landing-3":
    "Una propuesta editorial para explicar un recurso y captar interés.",
  "landing-4":
    "Una página de curso que muestra temario, docente y siguiente paso.",
  "landing-5":
    "Una presencia local clara para conocer servicios y solicitar cita.",
  "landing-6":
    "Una página previa al lanzamiento con fecha y registro opcional.",
  "landing-7":
    "Una ficha inmobiliaria con fotografía protagonista y datos esenciales.",
  "landing-8": "Una página de evento que ordena fecha, programa y ponentes.",
  "landing-9": "Una presentación personal para un profesional independiente.",
  "landing-10":
    "Una exploración visual de tono tecnológico para un portafolio.",
};

const systemDescriptions: Record<string, string> = {
  "system-1":
    "Flujo propuesto para solicitar una factura desde un ticket válido, sujeto a integración fiscal autorizada.",
  "system-2":
    "Catálogo, carrito y seguimiento de pedidos para un restaurante con entregas propias.",
  "system-3":
    "Registro de entradas y salidas de inventario con avisos al alcanzar existencias mínimas.",
  "system-4":
    "Portal interno para solicitudes de vacaciones, documentos y registro de asistencia.",
  "system-5":
    "Agenda y expedientes para consultorio, sujeto a requisitos de privacidad y operación clínica.",
  "system-6":
    "Panel que reúne ventas por sucursal, productos y periodos para apoyar decisiones.",
  "system-7":
    "Espacio para publicar cursos, seguir avances y administrar inscripciones.",
  "system-8": "Control de membresías, acceso y rutinas para un gimnasio.",
  "system-9":
    "Bitácora de vehículos, conductores, mantenimiento y consumo de combustible.",
  "system-10":
    "Consulta de disponibilidad y solicitud de reserva para un hospedaje.",
  "system-11":
    "Registro de horas y generación de un desglose revisable antes de facturar.",
  "system-12":
    "Mercado de varios vendedores con catálogo, pedidos y reglas de comisión configurables.",
  "system-13":
    "Bandeja compartida para clasificar y dar seguimiento a solicitudes de soporte.",
  "system-14":
    "Administración de planes y vencimientos con opción de integrar cobros recurrentes.",
  "system-15":
    "Registro de asistencia móvil con permisos claros y política de privacidad para ubicación.",
  "system-16":
    "Concepto de votación con controles de identidad, auditoría y secreto que exigiría revisión especializada.",
  "system-17":
    "Configurador de productos que calcula un presupuesto y genera un documento revisable.",
  "system-18":
    "Sala de ofertas con temporizador y reglas explícitas para adjudicar una subasta.",
  "system-19":
    "Herramienta de seguimiento nutricional para profesionales; las recomendaciones requieren revisión clínica.",
  "system-20":
    "CRM inmobiliario para ordenar contactos, visitas y etapas de negociación.",
};

export const catalog: readonly PortfolioItem[] = (
  rawCatalog as PortfolioItem[]
).map((item) => ({
  ...item,
  title: item.id === "automation-6" ? "Monitor de competencia" : item.title,
  summary:
    item.kind === "automation"
      ? automationExamples[item.id].problem
      : item.kind === "landing"
        ? landingDescriptions[item.id]
        : systemDescriptions[item.id],
}));

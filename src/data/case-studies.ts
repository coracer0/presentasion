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
    contribution:
      "Diseñé un recorrido corto para elegir, confirmar y reconocer un horario ocupado.",
    ability:
      "Convertir una tarea repetitiva en pasos claros y prevenir errores antes de confirmar.",
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
    contribution:
      "Diseñé y construí una experiencia que permite explorar, elegir y revisar un pedido.",
    ability:
      "Unir diseño visual con una compra fácil de entender, también en móvil.",
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
    contribution:
      "Construí una regla de aviso que muestra por qué se activó y deja ajustar el umbral.",
    ability:
      "Hacer comprensibles las reglas de una tarea automática y sus resultados.",
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
    tryHere:
      "Cambia escena, nombres y color; copia un enlace para usarlo en OBS.",
    decision:
      "Una misma configuración genera una vista previa y una fuente de navegador 16:9.",
    contribution:
      "Diseñé controles para personalizar la escena y comprobar el resultado antes de usarlo.",
    ability:
      "Crear herramientas visuales que ahorran preparación sin quitar control al usuario.",
    limit:
      "La URL no controla una transmisión en tiempo real; hay que actualizar la fuente.",
    realWorld:
      "Adaptar marca, escenas, resolución y operación del equipo de producción.",
    measure:
      "Tiempo para preparar un episodio y errores de rótulos detectados antes de salir al aire.",
  },
  messages: {
    id: "messages",
    slug: "mensajes",
    title: "Respuestas claras para preguntas repetidas",
    summary: "Prueba un asistente de mensajes para un local ficticio.",
    problem:
      "Responder horario, ubicación y entregas una y otra vez quita tiempo al equipo.",
    audience:
      "Negocios locales que reciben muchas preguntas parecidas por chat.",
    tryHere:
      "Elige una pregunta y mira la respuesta; también puedes pedir ayuda humana.",
    decision:
      "Las opciones son visibles y siempre existe una salida para hablar con una persona.",
    contribution:
      "Preparé una conversación breve que responde lo frecuente sin encerrar al cliente en el bot.",
    ability: "Diseñar conversaciones útiles, cercanas y con límites claros.",
    limit:
      "Es una simulación; no está conectada a WhatsApp ni recibe mensajes reales.",
    realWorld:
      "Definir respuestas aprobadas, horarios reales, canal de atención y aviso de privacidad.",
    measure:
      "Preguntas resueltas y conversaciones que necesitan intervención humana.",
  },
  quotes: {
    id: "quotes",
    slug: "cotizaciones",
    title: "Una cotización fácil de revisar",
    summary: "Calcula un presupuesto ficticio para una imprenta local.",
    problem:
      "Calcular precios a mano retrasa la respuesta y puede provocar errores.",
    audience:
      "Pequeños negocios que preparan presupuestos con reglas repetidas.",
    tryHere:
      "Elige producto, cantidad y prioridad para ver un presupuesto de muestra.",
    decision:
      "El resultado separa producto, cantidad y recargo para que el total se entienda.",
    contribution:
      "Construí un cálculo sencillo y una vista que explica cada parte del precio.",
    ability:
      "Traducir reglas de negocio en cálculos revisables y fáciles de usar.",
    limit: "Los precios son ficticios; no genera una oferta ni envía datos.",
    realWorld:
      "Validar tarifas, impuestos, existencias, vigencia y aprobación del negocio.",
    measure:
      "Tiempo de cotización y correcciones necesarias antes de enviarla.",
  },
  campaign: {
    id: "campaign",
    slug: "campanas",
    title: "Una campaña que empieza por una idea clara",
    summary:
      "Cambia el objetivo y el formato de un anuncio para un local ficticio.",
    problem:
      "Publicar sin una meta clara hace difícil elegir el mensaje y saber si funcionó.",
    audience:
      "Negocios locales que quieren darse a conocer o recibir más consultas.",
    tryHere:
      "Cambia entre mensajes o reconocimiento y mira la pieza en publicación e historia.",
    decision:
      "Cada objetivo tiene un texto, una invitación y una forma de medir distinta.",
    contribution:
      "Diseñé el concepto, la imagen de ejemplo, los textos y el recorrido para revisar la campaña antes de publicarla.",
    ability:
      "Unir criterio de marketing, diseño visual y una experiencia fácil de revisar con el cliente.",
    limit:
      "Es una campaña ficticia: no publica anuncios, no usa cuentas reales ni muestra resultados de clientes.",
    realWorld:
      "Confirmar oferta, público, presupuesto, derechos de imágenes, permisos de cuenta y forma de medir.",
    measure:
      "Conversaciones y pedidos si se busca contacto; alcance y visitas al perfil si se busca reconocimiento.",
  },
};

export function getCaseUrl(id: DemoId): string {
  return `${import.meta.env.BASE_URL}casos/${caseStudies[id].slug}.html`;
}

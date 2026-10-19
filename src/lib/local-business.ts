import type {
  MessageReply,
  MessageTopic,
  PrintProduct,
  PrintQuote,
} from "./demos.types";

export const messageTopics: readonly { id: MessageTopic; label: string }[] = [
  { id: "hours", label: "¿A qué hora abren?" },
  { id: "location", label: "¿Dónde están?" },
  { id: "delivery", label: "¿Hacen entregas?" },
  { id: "human", label: "Ver atención humana (demo)" },
];

export const messageReplies: Record<MessageTopic, MessageReply> = {
  hours: {
    title: "Horario",
    body: "En este ejemplo abrimos de lunes a sábado, de 9:00 a 18:00.",
    followUp: "¿Te ayudo con otra pregunta?",
  },
  location: {
    title: "Ubicación",
    body: "Este local es ficticio. En un negocio real mostraríamos su dirección y un enlace al mapa.",
    followUp: "¿Quieres saber algo más?",
  },
  delivery: {
    title: "Entregas",
    body: "En este ejemplo hay entregas en la zona. Un negocio real confirmaría cobertura y costo antes de prometerla.",
    followUp: "¿Te ayudo con otra pregunta?",
  },
  human: {
    title: "Así pedirías atención personal",
    body: "En esta demo nadie recibe el mensaje. En un negocio real, esta opción avisaría al equipo y mostraría cuándo puede responder.",
    followUp: "Es solo un ejemplo de cómo funcionaría.",
  },
};

export const printProducts: readonly PrintProduct[] = [
  {
    id: "flyers",
    name: "Volantes",
    setupPriceCents: 12000,
    unitPriceCents: 200,
  },
  {
    id: "cards",
    name: "Tarjetas",
    setupPriceCents: 18000,
    unitPriceCents: 150,
  },
  {
    id: "labels",
    name: "Etiquetas",
    setupPriceCents: 15000,
    unitPriceCents: 100,
  },
];

const MIN_QUANTITY = 25;
const MAX_QUANTITY = 1000;
const PERCENT_BASE = 100;
const URGENT_PERCENT = 20;

export function createPrintQuote(
  productId: string,
  quantity: number,
  urgent: boolean,
): PrintQuote | null {
  const product = printProducts.find((candidate) => candidate.id === productId);
  if (
    !product ||
    !Number.isInteger(quantity) ||
    quantity < MIN_QUANTITY ||
    quantity > MAX_QUANTITY
  ) {
    return null;
  }
  const subtotalCents =
    product.setupPriceCents + product.unitPriceCents * quantity;
  return {
    product,
    quantity,
    urgent,
    totalCents: urgent
      ? Math.round(
          (subtotalCents * (PERCENT_BASE + URGENT_PERCENT)) / PERCENT_BASE,
        )
      : subtotalCents,
  };
}

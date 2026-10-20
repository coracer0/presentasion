import type {
  CampaignConcept,
  CampaignFormat,
  CampaignGoal,
} from "./campaign.types";

const concepts: Record<
  CampaignGoal,
  Omit<CampaignConcept, "goal" | "format">
> = {
  messages: {
    headline: "Tu próxima pausa sabe a brasa.",
    subline: "Algo rico te espera en Casa Brasa.",
    callToAction: "Escríbenos",
    caption:
      "¿Se te antojó? Cuéntanos qué buscas y te compartimos las opciones de hoy. Casa Brasa es un negocio ficticio de esta demo.",
    measure: "Conversaciones iniciadas y preguntas que terminan en pedido.",
    reason:
      "Una invitación concreta facilita que la persona pregunte antes de decidir.",
  },
  awareness: {
    headline: "Un lugar para comer con ganas.",
    subline: "Descubre Casa Brasa cerca de ti.",
    callToAction: "Conócenos",
    caption:
      "Una mesa, buena comida y tiempo para disfrutar. Así se presentaría Casa Brasa, un negocio ficticio creado para esta demo.",
    measure: "Alcance local, visitas al perfil y consultas sobre el local.",
    reason:
      "Primero mostramos el ambiente y la propuesta para que más personas reconozcan el negocio.",
  },
};

export function getCampaignConcept(
  goal: CampaignGoal,
  format: CampaignFormat,
): CampaignConcept {
  return { goal, format, ...concepts[goal] };
}

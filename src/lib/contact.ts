const WHATSAPP_NUMBER = "524181774447";

export function getWhatsAppUrl(subject?: string): string {
  const context = subject ? `Me llamó la atención ${subject}. ` : "";
  const message = `Hola Axel, vi tu portafolio. ${context}Mi negocio o proyecto es... Me gustaría resolver... Y me gustaría empezar...`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_NUMBER = "524181774447";

export function getWhatsAppUrl(subject?: string): string {
  const message = subject
    ? `Hola Axel, vi tu portafolio y quiero platicar sobre ${subject}.`
    : "Hola Axel, vi tu portafolio y quiero contarte una idea. ¿Podemos platicar?";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

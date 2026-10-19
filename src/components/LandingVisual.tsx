const landingLabels: Record<string, readonly [string, string, string]> = {
  "landing-1": [
    "NOVA / APP",
    "Tu día, en orden.",
    "Productividad que se siente simple.",
  ],
  "landing-2": [
    "CASA BRASA",
    "El sabor nos reúne.",
    "Menú de temporada · Cocina de barrio",
  ],
  "landing-3": [
    "GUÍA GRATUITA",
    "Ideas que venden.",
    "Una lectura breve para empezar mejor.",
  ],
  "landing-4": [
    "ATELIER / ACADEMY",
    "Aprende haciendo.",
    "Un nuevo taller para crear sin límites.",
  ],
  "landing-5": [
    "CLÍNICA LUMA",
    "Cuidarte se siente bien.",
    "Atención cercana para cada etapa.",
  ],
  "landing-6": [
    "PRÓXIMAMENTE",
    "Algo nuevo está por llegar.",
    "Construimos una forma distinta de conectar.",
  ],
  "landing-7": [
    "CASA / UNO",
    "Espacio para vivir mejor.",
    "Arquitectura, luz y calma.",
  ],
  "landing-8": [
    "FORO / 2026",
    "Nos vemos en vivo.",
    "Ideas, encuentros y nuevas historias.",
  ],
  "landing-9": [
    "ESTUDIO / ALEX",
    "Tu siguiente gran idea.",
    "Acompañamiento creativo a tu medida.",
  ],
  "landing-10": [
    "SYSTEM / ONLINE",
    "Create the future_",
    "Diseño y código en movimiento.",
  ],
};

export function LandingVisual({
  id,
  large = false,
}: {
  id: string;
  large?: boolean;
}) {
  const [eyebrow, heading, subheading] =
    landingLabels[id] ?? landingLabels["landing-1"];
  return (
    <div
      className={`landing-visual ${id} ${large ? "large" : ""}`}
      aria-label={`Vista visual de ${heading}`}
    >
      <div className="landing-art-shape" />
      <span>{eyebrow}</span>
      <strong>{heading}</strong>
      <small>{subheading}</small>
      <i aria-hidden="true">↗</i>
    </div>
  );
}

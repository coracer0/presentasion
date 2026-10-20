import { ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "../lib/contact";

const offers = [
  {
    number: "01 / PÁGINAS Y HERRAMIENTAS",
    title: "Algo útil para tu negocio.",
    summary:
      "Una página para mostrar lo que haces o una herramienta para quitarte tareas repetidas.",
    examples: [
      "Diseño y textos claros para tu caso",
      "Una versión para revisar también en celular",
      "Pruebas y ajustes acordados antes de entregarla",
    ],
    contact: "una página o herramienta para mi negocio",
    action: "Hablemos de tu página o idea",
    theme: "build",
  },
  {
    number: "02 / CAMPAÑAS Y REDES",
    title: "Que te conozcan por lo que haces.",
    summary:
      "Publicidad y publicaciones con una meta clara: que más personas te descubran o te escriban.",
    examples: [
      "Objetivo y público definidos contigo",
      "Piezas y textos para las publicaciones acordadas",
      "Revisión de consultas y resultados disponibles",
    ],
    contact: "una campaña o mis redes sociales",
    action: "Hablemos de tu campaña",
    theme: "market",
  },
] as const;

export function OfferOverview() {
  return (
    <section
      id="servicios"
      className="section-shell offers-section"
      tabIndex={-1}
    >
      <div className="offers-heading">
        <div>
          <span className="eyebrow">QUÉ PODEMOS HACER JUNTOS</span>
          <h2>
            Empecemos por lo que <em>sí necesitas.</em>
          </h2>
        </div>
        <p>
          Primero platicamos de lo que necesitas. Después te propongo qué haría,
          cuánto costaría y cuándo lo revisaríamos. Dejamos los acuerdos por
          escrito para que todo esté claro.
        </p>
      </div>
      <div className="offers-grid">
        {offers.map((offer) => (
          <article
            className={`offer-card offer-${offer.theme}`}
            key={offer.theme}
          >
            <div className="offer-card-top">
              <span>{offer.number}</span>
              <ArrowUpRight size={30} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3>{offer.title}</h3>
            <p>{offer.summary}</p>
            <span className="offer-includes">SEGÚN LO QUE ACORDEMOS</span>
            <ul>
              {offer.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
            <a
              href={getWhatsAppUrl(offer.contact)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {offer.action} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <p className="offers-support">
        ¿Todavía no sabes qué pedir?{" "}
        <a href="#tipos-de-web">Mira 15 páginas y herramientas web ↗</a>
      </p>
      <p className="offers-support">
        ¿Lo que necesitas es ayuda con una compu, un programa o un dispositivo?{" "}
        <a href="#soporte">También puedo ayudarte con eso ↗</a>
      </p>
    </section>
  );
}

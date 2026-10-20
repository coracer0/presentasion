import { ArrowUpRight, Download, Lightbulb, MonitorCog } from "lucide-react";
import { getWhatsAppUrl } from "../lib/contact";

const services = [
  {
    title: "Computadoras",
    detail:
      "Diagnóstico, reparación y puesta a punto para que vuelvas a trabajar o jugar con tranquilidad.",
    Icon: MonitorCog,
  },
  {
    title: "Programas",
    detail:
      "Instalación, configuración y ayuda para empezar a usar las herramientas que necesitas.",
    Icon: Download,
  },
  {
    title: "Hogar inteligente",
    detail:
      "Focos y otros dispositivos compatibles, más rutinas con Alexa para simplificar tu día.",
    Icon: Lightbulb,
  },
] as const;

export function TechServices() {
  return (
    <section
      id="soporte"
      className="section-shell tech-services-section"
      tabIndex={-1}
    >
      <div className="section-intro">
        <div>
          <span className="eyebrow">05 / SOPORTE TECNOLÓGICO</span>
          <h2>
            También te ayudo con
            <br />
            <em>tu tecnología diaria.</em>
          </h2>
        </div>
        <p>
          Además de crear páginas y sistemas, puedo ayudarte con una compu que
          falla, un programa que necesitas o dispositivos que quieres conectar.
          Revisamos tu caso antes de acordar el trabajo.
        </p>
      </div>
      <div className="tech-services-grid">
        {services.map(({ title, detail, Icon }) => (
          <article className="tech-service-card" key={title}>
            <Icon size={29} strokeWidth={1.8} aria-hidden="true" />
            <span className="tech-service-spark" aria-hidden="true">
              ↗
            </span>
            <h3>{title}</h3>
            <p>{detail}</p>
          </article>
        ))}
      </div>
      <div className="tech-services-next">
        <span>¿Algo de esto te está dando lata?</span>
        <a
          href={getWhatsAppUrl("tu servicio de soporte tecnológico")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cuéntame por WhatsApp <ArrowUpRight size={17} />
        </a>
      </div>
    </section>
  );
}

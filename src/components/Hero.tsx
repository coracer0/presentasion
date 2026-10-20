import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "../lib/contact";
import { HeroStory } from "./HeroStory";

export function Hero() {
  return (
    <section id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="eyebrow-line" /> HERRAMIENTAS DIGITALES PARA TU
          NEGOCIO
        </span>
        <h1>
          Páginas y herramientas para que tu negocio <em>trabaje mejor.</em>
        </h1>
        <p>
          Soy Axel. Diseño sitios y herramientas para negocios locales: una
          página para mostrar lo que haces, respuestas para las preguntas de
          siempre o un sistema que ordene tu trabajo. Prueba seis demos con
          datos ficticios.
        </p>
        <div className="hero-actions">
          <a
            className="button button-light"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escríbeme por WhatsApp <ArrowUpRight size={18} />
          </a>
          <a className="button button-outline" href="#trabajos">
            Conocer las demos <ArrowDownRight size={18} />
          </a>
        </div>
        <div className="hero-routes" aria-label="Explorar según tu caso">
          <a href="#trabajos">Tengo un negocio ↗</a>
          <a href="#agencias">Colaboro en una agencia ↗</a>
        </div>
        <div className="hero-bottom">
          <img
            src={`${import.meta.env.BASE_URL}profile.webp`}
            width="48"
            height="48"
            alt="Retrato de Axel Coracero"
          />
          <span>
            Axel Coracero
            <br />
            <small>Desarrollo independiente · México</small>
          </span>
          <span className="hero-status">
            <i /> Disponible para conversar
          </span>
        </div>
      </div>
      <HeroStory />
    </section>
  );
}

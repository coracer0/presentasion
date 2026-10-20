import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "../lib/contact";
import { HeroStory } from "./HeroStory";

export function Hero() {
  return (
    <section id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="eyebrow-line" /> PÁGINAS, CAMPAÑAS Y HERRAMIENTAS
        </span>
        <h1>
          Páginas, campañas y herramientas para que tu negocio{" "}
          <em>trabaje mejor.</em>
        </h1>
        <p>
          Soy Axel. Creo páginas, planeo campañas y manejo redes sociales para
          negocios locales. También hago herramientas para quitarte tareas
          repetidas. Prueba siete demos con datos ficticios.
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
          <a href="#servicios">Tengo un negocio ↗</a>
          <a href="#marketing">Quiero promocionarme ↗</a>
          <a href="#agencias">Colaboro en una agencia ↗</a>
          <a href="#soporte">Necesito ayuda técnica ↗</a>
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

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
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
          Tu negocio puede funcionar con <em>menos trabajo repetitivo.</em>
        </h1>
        <p>
          Creo páginas y herramientas para organizar reservas, pedidos y tareas
          del día a día. Prueba cuatro demos hechas por mí con datos ficticios y
          cuéntame qué necesitas resolver.
        </p>
        <div className="hero-actions">
          <a className="button button-light" href="#trabajos">
            Ver las demos <ArrowDownRight size={18} />
          </a>
          <a
            className="button button-outline"
            href="https://wa.me/524181774447"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cuéntame tu idea <ArrowUpRight size={18} />
          </a>
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

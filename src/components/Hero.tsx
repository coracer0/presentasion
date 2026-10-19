import { ArrowDownRight, ArrowUpRight, MoveUpRight } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="hero section-shell">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="eyebrow-line" /> INGENIERÍA CREATIVA PARA NEGOCIOS
        </span>
        <h1>
          Software que convierte procesos en <em>progreso.</em>
        </h1>
        <p>
          Diseño experiencias web, automatizaciones y herramientas que hacen más
          fácil vender, operar y comunicar una idea. Aquí puedes probar cómo
          trabajo.
        </p>
        <div className="hero-actions">
          <a className="button button-light" href="#trabajos">
            Explorar las demos <ArrowDownRight size={18} />
          </a>
          <a
            className="button button-outline"
            href="https://wa.me/524181774447"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cuéntame tu proyecto <ArrowUpRight size={18} />
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
      <div
        className="hero-composition"
        aria-label="Muestra visual de software y diseño"
      >
        <div className="hero-grid" />
        <div className="hero-label">
          <MoveUpRight size={15} /> SOLUCIONES CON INTENCIÓN
        </div>
        <div className="hero-screen">
          <div className="screen-head">
            <span>
              <i />
              <i />
              <i />
            </span>
            <small>axel / studio</small>
            <span>↗</span>
          </div>
          <div className="screen-body">
            <div className="screen-sidebar">
              <span>01</span>
              <span>02</span>
              <span>03</span>
            </div>
            <div className="screen-content">
              <small>DISEÑADO PARA EL MUNDO REAL</small>
              <strong>
                Del reto a la
                <br />
                <em>experiencia.</em>
              </strong>
              <div className="screen-rule" />
              <span>ESTRATEGIA / SISTEMAS / INTERACCIÓN</span>
            </div>
          </div>
        </div>
        <div className="hero-float-card">
          <span>ENFOQUE</span>
          <strong>
            Una idea clara.
            <br />
            Una solución usable.
          </strong>
          <i>↗</i>
        </div>
        <div className="hero-index">AC — 2026</div>
      </div>
    </section>
  );
}

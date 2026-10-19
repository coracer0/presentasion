import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a
        className="brand"
        href="#inicio"
        aria-label="Axel Coracero, ir al inicio"
      >
        <span className="brand-mark">
          A<span>.</span>
        </span>
        <span>
          AXEL CORACERO<small>SOFTWARE & EXPERIENCIAS</small>
        </span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#trabajos">Demos</a>
        <a href="#catalogo">Explora</a>
        <a href="#proceso">Proceso</a>
      </nav>
      <a
        className="header-contact"
        href="https://wa.me/524181774447"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hablemos <ArrowUpRight size={16} />
      </a>
    </header>
  );
}

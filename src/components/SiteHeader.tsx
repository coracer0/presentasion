import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = (targetId: string) => {
    setMenuOpen(false);
    queueMicrotask(() => document.getElementById(targetId)?.focus());
  };
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

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
          AXEL CORACERO<small>SOFTWARE CON TRATO HUMANO</small>
        </span>
      </a>
      <nav aria-label="Navegación principal">
        <a href="#sobre-mi">Sobre mí</a>
        <a href="#trabajos">Demos</a>
        <a href="#proceso">Cómo trabajo</a>
        <a href="#catalogo">Más ideas</a>
      </nav>
      <a
        className="header-contact"
        href="https://wa.me/524181774447"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hablemos <ArrowUpRight size={16} />
      </a>
      <button
        className="menu-toggle"
        ref={menuButton}
        type="button"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${menuOpen ? "is-open" : ""}`}
        aria-label="Navegación móvil"
        inert={!menuOpen}
      >
        <a href="#sobre-mi" onClick={() => closeMenu("sobre-mi")}>
          Sobre mí
        </a>
        <a href="#trabajos" onClick={() => closeMenu("trabajos")}>
          Probar demos
        </a>
        <a href="#catalogo" onClick={() => closeMenu("catalogo")}>
          Explorar ideas
        </a>
        <a href="#proceso" onClick={() => closeMenu("proceso")}>
          Cómo trabajo
        </a>
        <a href="#contacto" onClick={() => closeMenu("contacto")}>
          Contacto
        </a>
      </nav>
    </header>
  );
}

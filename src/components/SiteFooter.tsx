import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="section-shell">
        <span className="eyebrow">05 / SIGUIENTE PASO</span>
        <div className="footer-main">
          <h2>
            ¿Construimos algo
            <br />
            <em>que valga la pena?</em>
          </h2>
          <p>
            Cuéntame qué quieres resolver. Podemos empezar con una idea, una
            demo o un proceso que hoy te quita demasiado tiempo.
          </p>
        </div>
        <div className="footer-actions">
          <a
            className="button button-light"
            href="https://wa.me/524181774447"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} /> Escribir por WhatsApp{" "}
            <ArrowUpRight size={18} />
          </a>
          <a
            className="button button-outline"
            href="mailto:ax.coracero@gmail.com"
          >
            <Mail size={18} /> Enviar un correo <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <a className="brand" href="#inicio">
            <span className="brand-mark">
              A<span>.</span>
            </span>
            <span>
              AXEL CORACERO<small>SOFTWARE & EXPERIENCIAS</small>
            </span>
          </a>
          <div>
            <a href={`${import.meta.env.BASE_URL}card.html`}>Tarjeta digital</a>
            <a href={`${import.meta.env.BASE_URL}print-card.html`}>
              Tarjeta para imprimir
            </a>
          </div>
          <span>© 2026 Axel Coracero</span>
        </div>
      </div>
    </footer>
  );
}

import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "../lib/contact";

export function SiteFooter() {
  return (
    <footer id="contacto" className="site-footer" tabIndex={-1}>
      <div className="section-shell">
        <span className="eyebrow">07 / SIGUIENTE PASO</span>
        <div className="footer-main">
          <h2>
            ¿Qué te gustaría mejorar
            <br />
            <em>en tu negocio?</em>
          </h2>
          <p>
            Cuéntame qué te quita tiempo o qué te gustaría ofrecer de otra
            forma. Podemos empezar con una conversación breve.
          </p>
        </div>
        <div className="footer-actions">
          <a
            className="button button-light"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} /> Escribir por WhatsApp{" "}
            <ArrowUpRight size={18} />
          </a>
          <a className="footer-email" href="mailto:ax.coracero@gmail.com">
            <Mail size={18} /> ¿No usas WhatsApp? Envíame un correo
          </a>
        </div>
        <div className="footer-bottom">
          <a className="brand" href="#inicio">
            <span>
              Axel Coracero<small>PÁGINAS · CAMPAÑAS · HERRAMIENTAS</small>
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

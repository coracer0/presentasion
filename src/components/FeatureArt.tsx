import type { DemoId } from "../data/portfolio.types";
import { OverlayGraphics } from "./Scene";
import { defaultOverlay } from "../lib/overlay";

export function FeatureArt({ id }: { id: DemoId }) {
  if (id === "podcast")
    return (
      <div className="feature-art art-podcast">
        <OverlayGraphics config={defaultOverlay} />
      </div>
    );
  if (id === "appointments")
    return (
      <div className="feature-art art-chat">
        <div className="mini-chat">
          <span>AC · ASISTENTE</span>
          <p>¡Hola! ¿Agendamos una llamada?</p>
          <div>Martes · 11:30</div>
          <p className="reply">Tu cita está confirmada ✓</p>
        </div>
      </div>
    );
  if (id === "prices")
    return (
      <div className="feature-art art-prices">
        <div className="mini-chart">
          <span>MONITOR / ACTIVO</span>
          <div className="chart-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <strong>
            − $170 <small>↓ precio detectado</small>
          </strong>
        </div>
      </div>
    );
  if (id === "messages")
    return (
      <div className="feature-art art-messages">
        <div className="mini-message-phone">
          <span>CAFÉ BARRIO · AYUDA</span>
          <p>¿A qué hora abren?</p>
          <strong>De lunes a sábado, de 9:00 a 18:00.</strong>
          <small>Siempre puedes hablar con alguien ↗</small>
        </div>
      </div>
    );
  if (id === "quotes")
    return (
      <div className="feature-art art-quotes">
        <div className="mini-quote-sheet">
          <span>IMPRENTA LOMA / EJEMPLO</span>
          <strong>Tu precio, paso a paso.</strong>
          <div>
            <span>100 volantes</span>
            <span>$320</span>
          </div>
          <small>Preparación + cantidad = total claro</small>
        </div>
      </div>
    );
  return (
    <div className="feature-art art-food">
      <div className="food-orb" />
      <span>CASA BRASA</span>
      <strong>
        Un menú que
        <br />
        abre el apetito.
      </strong>
      <small>Explora · Selecciona · Confirma</small>
    </div>
  );
}

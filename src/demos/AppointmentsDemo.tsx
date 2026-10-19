import { useState } from "react";
import { CalendarCheck, RotateCcw } from "lucide-react";
import { appointmentSlots, reserveSlot } from "../lib/demos";

export function AppointmentsDemo() {
  const [booked, setBooked] = useState<readonly string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const confirmed = booked.includes(selected);

  function confirm() {
    if (!selected || booked.includes(selected)) return;
    setBooked((current) => reserveSlot(current, selected));
  }

  return (
    <div className="demo-layout appointment-layout">
      <div className="demo-controls">
        <p className="demo-kicker">02 / FLUJO CONVERSACIONAL</p>
        <h3>Una cita, sin mensajes de ida y vuelta.</h3>
        <p className="demo-hint">
          Simulación local: el cliente elige un horario, confirma y el cupo se
          bloquea en esta sesión. No se envía nada a WhatsApp ni a un
          calendario.
        </p>
        <div className="demo-actions">
          <button
            className="action-quiet"
            type="button"
            onClick={() => {
              setBooked([]);
              setSelected("");
            }}
          >
            <RotateCcw size={16} /> Reiniciar demo
          </button>
        </div>
        <div className="demo-side-note">
          <CalendarCheck size={22} />
          <span>
            En un producto real se conectaría a disponibilidad, calendario y
            mensajería oficial, con confirmación y manejo de cancelaciones.
          </span>
        </div>
      </div>
      <div className="chat-shell">
        <div className="chat-header">
          <span className="chat-avatar">AC</span>
          <div>
            <strong>Asistente de citas</strong>
            <small>Simulación · negocio ficticio</small>
          </div>
          <span className="online-dot" />
        </div>
        <div className="chat-body">
          <div className="bubble incoming">
            ¡Hola! Puedo ayudarte a reservar una llamada de descubrimiento de 30
            minutos. ¿Qué horario prefieres?
          </div>
          <div className="slot-list">
            {appointmentSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                disabled={booked.includes(slot)}
                aria-pressed={selected === slot}
                onClick={() => setSelected(slot)}
              >
                {slot}
                {booked.includes(slot) ? " · ocupado" : ""}
              </button>
            ))}
          </div>
          {selected && (
            <div className="bubble outgoing">Me funciona a las {selected}.</div>
          )}
          {confirmed && (
            <div className="bubble incoming success">
              ¡Listo! Cita de ejemplo confirmada para las {selected}. Ese
              horario ya no está disponible.
            </div>
          )}
        </div>
        <div className="chat-footer">
          <button
            className="action-primary"
            type="button"
            disabled={!selected || confirmed}
            onClick={confirm}
          >
            Confirmar horario
          </button>
          <span>
            {booked.length}{" "}
            {booked.length === 1 ? "cita reservada" : "citas reservadas"}
            en esta demo
          </span>
        </div>
      </div>
    </div>
  );
}

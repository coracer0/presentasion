import { useState } from "react";
import { RotateCcw } from "lucide-react";
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
        <p className="demo-kicker">RESERVA PASO A PASO</p>
        <h3>Elige un horario.</h3>
        <p className="demo-hint">
          Elige un horario y confirma. Usamos datos de muestra; nada se envía
          fuera de esta página.
        </p>
      </div>
      <div className="chat-shell">
        <div className="chat-header">
          <span className="chat-avatar">AC</span>
          <div>
            <strong>Asistente de citas</strong>
            <small>Simulación · negocio ficticio</small>
          </div>
          <span className="online-dot" />
          <button
            className="chat-reset"
            type="button"
            aria-label="Reiniciar demo"
            onClick={() => {
              setBooked([]);
              setSelected("");
            }}
          >
            <RotateCcw size={17} />
          </button>
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
            <div className="bubble incoming success" role="status">
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
            {booked.length === 1 ? "cita reservada" : "citas reservadas"} en
            esta demo
          </span>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import type { StoryId, StoryScene } from "./hero-story.types";

const stories: Record<StoryId, StoryScene> = {
  appointments: {
    label: "Reservas",
    before: ["¿Hay horario mañana?", "Déjame revisar y te aviso…"],
    result: "Martes · 11:30",
    detail: "Reserva de muestra confirmada",
  },
  orders: {
    label: "Pedidos",
    before: ["¿Qué hay en el menú?", "¿Cuánto sería en total?"],
    result: "2 productos · $285",
    detail: "Pedido de muestra resumido",
  },
  prices: {
    label: "Precios",
    before: ["Revisar cada producto", "¿Cambió el precio hoy?"],
    result: "−$170 detectados",
    detail: "Alerta de muestra preparada",
  },
};

export function HeroStory() {
  const [selected, setSelected] = useState<StoryId>("appointments");
  const [run, setRun] = useState(0);
  const story = stories[selected];

  return (
    <div className="hero-composition hero-story">
      <div className="hero-story-top">
        <span>DEL PROBLEMA A UNA ACCIÓN CLARA</span>
        <button type="button" onClick={() => setRun((value) => value + 1)}>
          <RotateCcw size={15} /> Repetir
        </button>
      </div>
      <div className="story-tabs" aria-label="Ver ejemplos de transformación">
        {(Object.keys(stories) as StoryId[]).map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={selected === id}
            onClick={() => {
              setSelected(id);
              setRun((value) => value + 1);
            }}
          >
            {stories[id].label}
          </button>
        ))}
      </div>
      <div className="story-stage" key={`${selected}-${run}`}>
        <div className="story-before" aria-label="Antes: mensajes dispersos">
          <small>ANTES / TRABAJO MANUAL</small>
          {story.before.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
        <div className="story-arrow" aria-hidden="true">
          <ArrowRight size={22} />
        </div>
        <div className="story-after" role="status">
          <small>DESPUÉS / EJEMPLO FICTICIO</small>
          <strong>{story.result}</strong>
          <span>{story.detail}</span>
          <i aria-hidden="true">✓</i>
        </div>
      </div>
      <p className="hero-story-footnote">
        Tres problemas cotidianos, tres formas de empezar a resolverlos.
      </p>
    </div>
  );
}

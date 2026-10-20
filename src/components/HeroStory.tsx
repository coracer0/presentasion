import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type {
  StoryId,
  StoryPanelProps,
  StoryScene,
  StoryTabsProps,
} from "./hero-story.types";

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

const storyTiming = {
  messageGap: 0.18,
  connector: 0.35,
  result: 0.55,
} as const;

function StoryTabs({ selected, onSelect }: StoryTabsProps) {
  return (
    <div className="story-tabs" aria-label="Ver ejemplos de transformación">
      {(Object.keys(stories) as StoryId[]).map((id) => (
        <button
          key={id}
          type="button"
          aria-pressed={selected === id}
          onClick={() => onSelect(id)}
        >
          {stories[id].label}
        </button>
      ))}
    </div>
  );
}

function BeforePanel({ story, reduceMotion }: StoryPanelProps) {
  return (
    <motion.div
      className="story-before"
      aria-label="Antes: trabajo manual"
      initial={false}
      animate={reduceMotion ? undefined : { x: [0, -3, 0] }}
      transition={{ duration: 0.55 }}
    >
      <small>ANTES / TRABAJO MANUAL</small>
      {story.before.map((message, index) => (
        <motion.p
          key={message}
          initial={false}
          animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
          transition={{
            duration: 0.45,
            delay: index * storyTiming.messageGap,
          }}
        >
          {message}
        </motion.p>
      ))}
    </motion.div>
  );
}

function AfterPanel({ story, reduceMotion }: StoryPanelProps) {
  return (
    <motion.div
      className="story-after"
      role="status"
      initial={false}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.025, 1],
              borderColor: ["#98cbb2", "#42a67b", "#98cbb2"],
            }
      }
      transition={{
        duration: 0.7,
        delay: storyTiming.result,
      }}
    >
      <small>DESPUÉS / EJEMPLO FICTICIO</small>
      <strong>{story.result}</strong>
      <span>{story.detail}</span>
      <motion.i
        aria-hidden="true"
        initial={false}
        animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
        transition={{
          duration: 0.45,
          delay: storyTiming.result + 0.2,
        }}
      >
        ✓
      </motion.i>
    </motion.div>
  );
}

function StoryStage({ story, reduceMotion }: StoryPanelProps) {
  return (
    <div className="story-stage">
      <BeforePanel story={story} reduceMotion={reduceMotion} />
      <motion.div
        className="story-arrow"
        aria-hidden="true"
        initial={false}
        animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
        transition={{
          duration: 0.35,
          delay: reduceMotion ? 0 : storyTiming.connector,
        }}
      >
        <ArrowRight size={22} />
      </motion.div>
      <AfterPanel story={story} reduceMotion={reduceMotion} />
    </div>
  );
}

export function HeroStory() {
  const [selected, setSelected] = useState<StoryId>("appointments");
  const [run, setRun] = useState(0);
  const reduceMotion = useReducedMotion() === true;
  const story = stories[selected];

  function selectStory(id: StoryId) {
    setSelected(id);
    setRun((value) => value + 1);
  }

  return (
    <div className="hero-composition hero-story">
      <div className="hero-story-top">
        <span>DEL PROBLEMA A UNA ACCIÓN CLARA</span>
        <button type="button" onClick={() => setRun((value) => value + 1)}>
          <RotateCcw size={15} /> Repetir
        </button>
      </div>
      <StoryTabs selected={selected} onSelect={selectStory} />
      <StoryStage
        key={`${selected}-${run}`}
        story={story}
        reduceMotion={reduceMotion}
      />
      <p className="hero-story-footnote">
        Tres problemas cotidianos, tres formas de empezar a resolverlos.
      </p>
    </div>
  );
}

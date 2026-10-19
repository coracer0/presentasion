import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FeatureArt } from "./FeatureArt";
import { caseStudies, getCaseUrl } from "../data/case-studies";
import type { DemoId } from "../data/portfolio.types";
import type { FeaturedProps } from "./site.types";
import type { NeedId, NeedOption } from "./featured.types";

const featured: readonly DemoId[] = [
  "appointments",
  "restaurant",
  "messages",
  "quotes",
  "prices",
  "podcast",
];
const needs: readonly NeedOption[] = [
  { id: "all", label: "Ver las seis", demos: featured },
  { id: "sell", label: "Quiero vender más", demos: ["restaurant", "quotes"] },
  {
    id: "save",
    label: "Quiero ahorrar tiempo",
    demos: ["appointments", "messages", "prices"],
  },
  {
    id: "care",
    label: "Quiero atender mejor",
    demos: ["appointments", "messages"],
  },
  {
    id: "launch",
    label: "Quiero lanzar una idea",
    demos: ["podcast", "restaurant", "quotes"],
  },
];

export function Featured({ onOpen }: FeaturedProps) {
  const [need, setNeed] = useState<NeedId>("all");
  const reduceMotion = useReducedMotion();
  const visible = needs.find((option) => option.id === need)?.demos ?? featured;

  return (
    <section
      id="trabajos"
      className="section-shell featured-section"
      tabIndex={-1}
    >
      <div className="section-intro">
        <div>
          <span className="eyebrow">02 / EJEMPLOS QUE PUEDES PROBAR</span>
          <h2>
            ¿Qué te gustaría
            <br />
            <em>mejorar primero?</em>
          </h2>
        </div>
        <p>
          Elige lo que hoy te preocupa y prueba ejemplos relacionados. Son
          demostraciones originales con datos ficticios.
        </p>
      </div>
      <div className="need-paths" aria-label="Filtrar ejemplos por necesidad">
        {needs.map((option) => (
          <button
            type="button"
            key={option.id}
            aria-pressed={need === option.id}
            onClick={() => setNeed(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="feature-grid" aria-live="polite">
        {visible.map((id, index) => (
          <motion.article
            className={`feature-card feature-${id}`}
            key={id}
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.16 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <button
              className="feature-open"
              type="button"
              onClick={() => onOpen(id)}
              aria-label={`Probar demo: ${caseStudies[id].title}`}
            >
              <FeatureArt id={id} />
              <div className="feature-card-copy">
                <div>
                  <span>DEMO / DATOS FICTICIOS</span>
                  <ArrowUpRight size={20} />
                </div>
                <h3>{caseStudies[id].title}</h3>
                <p>{caseStudies[id].summary}</p>
                <strong>
                  Probar demo <span>↗</span>
                </strong>
              </div>
            </button>
            <a className="feature-case-link" href={getCaseUrl(id)}>
              Leer cómo lo diseñé <ArrowUpRight size={16} />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

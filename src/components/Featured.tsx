import { ArrowUpRight } from "lucide-react";
import { FeatureArt } from "./FeatureArt";
import type { DemoId } from "../data/portfolio.types";
import type { FeaturedProps } from "./site.types";

const featured: readonly {
  id: DemoId;
  number: string;
  type: string;
  title: string;
  description: string;
}[] = [
  {
    id: "podcast",
    number: "01",
    type: "DISEÑO PARA DIRECTOS",
    title: "Escenas para podcast y video en vivo",
    description: "Personaliza rótulos y escenas; obtén un overlay para OBS.",
  },
  {
    id: "appointments",
    number: "02",
    type: "AUTOMATIZACIÓN",
    title: "Asistente de reservas",
    description:
      "Prueba un flujo conversacional que confirma horarios disponibles.",
  },
  {
    id: "prices",
    number: "03",
    type: "MONITOREO",
    title: "Alertas de precios",
    description: "Ajusta el umbral y observa cuándo se prepara una alerta.",
  },
  {
    id: "restaurant",
    number: "04",
    type: "EXPERIENCIA WEB",
    title: "Menú con pedido guiado",
    description: "Explora una landing de restaurante con carrito de muestra.",
  },
];

export function Featured({ onOpen }: FeaturedProps) {
  return (
    <section id="trabajos" className="section-shell featured-section">
      <div className="section-intro">
        <div>
          <span className="eyebrow">01 / TRABAJO EN ACCIÓN</span>
          <h2>
            Menos promesas.
            <br />
            <em>Más cosas que probar.</em>
          </h2>
        </div>
        <p>
          Son prototipos interactivos con datos ficticios: una forma concreta de
          conversar sobre lo que podríamos construir para tu negocio.
        </p>
      </div>
      <div className="feature-grid">
        {featured.map((project) => (
          <button
            className={`feature-card feature-${project.id}`}
            type="button"
            key={project.id}
            onClick={() => onOpen(project.id)}
            aria-label={`Abrir demo: ${project.title}`}
          >
            <FeatureArt id={project.id} />
            <div className="feature-card-copy">
              <div>
                <span>
                  {project.number} / {project.type}
                </span>
                <ArrowUpRight size={20} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <strong>
                Probar demo <span>↗</span>
              </strong>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

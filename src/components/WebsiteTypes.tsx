import { useState } from "react";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { websiteTypeGroups, websiteTypes } from "../data/website-types";
import type { WebsiteTypeCardProps } from "../data/website-types.types";
import { getWhatsAppUrl } from "../lib/contact";

const featuredTypes = websiteTypes.filter((item) => item.featured);

function WebsiteTypeCard({ item, headingLevel }: WebsiteTypeCardProps) {
  const Heading = headingLevel === 3 ? "h3" : "h4";

  return (
    <article className="website-type-card">
      <div className="website-type-card-top">
        <span>
          {websiteTypeGroups.find((group) => group.id === item.group)?.title}
        </span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </div>
      <Heading>{item.name}</Heading>
      <p>{item.description}</p>
      <div className="website-type-card-actions">
        <a
          href={getWhatsAppUrl(`la idea «${item.name}»`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar esta idea: ${item.name} por WhatsApp`}
        >
          Consultar esta idea <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        {item.demoId ? (
          <a href={`${import.meta.env.BASE_URL}?demo=${item.demoId}#trabajos`}>
            Probar demo ficticia
          </a>
        ) : (
          <span>Posibilidad para tu proyecto</span>
        )}
      </div>
    </article>
  );
}

export function WebsiteTypes() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="tipos-de-web"
      className="section-shell website-types-section"
      tabIndex={-1}
    >
      <div className="section-intro">
        <div>
          <span className="eyebrow">06 / IDEAS PARA TU WEB</span>
          <h2>¿Qué necesitas crear?</h2>
        </div>
        <p>Desde una página sencilla hasta una herramienta para tu negocio</p>
      </div>

      <div className="website-types-starter">
        <div className="website-types-heading">
          <h3>Seis ideas para empezar</h3>
          <span>
            Elige entre páginas y herramientas web la que más se parezca a tu
            idea.
          </span>
        </div>
        <div className="website-types-grid">
          {featuredTypes.map((item) => (
            <WebsiteTypeCard key={item.id} item={item} headingLevel={4} />
          ))}
        </div>
      </div>

      <div id="website-types-more" hidden={!expanded}>
        {websiteTypeGroups.map((group) => (
          <div className="website-types-group" key={group.id}>
            <h3>{group.title}</h3>
            <div className="website-types-grid">
              {websiteTypes
                .filter((item) => item.group === group.id && !item.featured)
                .map((item) => (
                  <WebsiteTypeCard key={item.id} item={item} headingLevel={4} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="website-types-toggle"
        type="button"
        aria-expanded={expanded}
        aria-controls="website-types-more"
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Mostrar menos" : "Ver los 15 tipos"}
        <ChevronDown size={20} aria-hidden="true" />
      </button>

      <div className="website-types-bottom">
        <p className="website-types-addons">
          <Sparkles size={20} aria-hidden="true" />
          <span>
            <strong>También se pueden añadir:</strong> animaciones o un carrusel
            si ayudan a presentar mejor tu contenido.
          </span>
        </p>
        <p className="website-types-pricing">
          El precio depende del contenido y las funciones que necesites. El
          desarrollo se paga una vez; el mantenimiento mensual es opcional.
          Dominio y alojamiento se detallan en la propuesta.
        </p>
      </div>
    </section>
  );
}

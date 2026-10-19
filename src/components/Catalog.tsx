import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { catalog } from "../data/catalog";
import { LandingVisual } from "./LandingVisual";
import type { PortfolioKind } from "../data/portfolio.types";
import type { CatalogProps } from "./site.types";

type Filter = "all" | PortfolioKind;
const filters: readonly { id: Filter; label: string }[] = [
  { id: "all", label: "Todo (70)" },
  { id: "automation", label: "Scripts (40)" },
  { id: "system", label: "Sistemas (20)" },
  { id: "landing", label: "Landings (10)" },
];
const kindLabel: Record<PortfolioKind, string> = {
  automation: "SCRIPT EXPLICADO",
  system: "CONCEPTO DE SISTEMA",
  landing: "EXPLORACIÓN VISUAL",
};

export function Catalog({ onOpen }: CatalogProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const matches = useMemo(
    () =>
      catalog.filter(
        (item) =>
          (filter === "all" || item.kind === filter) &&
          `${item.title} ${item.summary}`
            .toLocaleLowerCase("es-MX")
            .includes(query.toLocaleLowerCase("es-MX").trim()),
      ),
    [filter, query],
  );
  const visible = showAll ? matches : matches.slice(0, 12);

  return (
    <section id="catalogo" className="section-shell catalog-section">
      <div className="section-intro">
        <div>
          <span className="eyebrow">02 / BIBLIOTECA DE POSIBILIDADES</span>
          <h2>
            Explora lo que
            <br />
            <em>podemos construir.</em>
          </h2>
        </div>
        <p>
          Las fichas son ideas y demostraciones, no proyectos publicados de
          clientes. Los 40 scripts incluyen un ejemplo de entrada, proceso y
          resultado.
        </p>
      </div>
      <div className="catalog-toolbar">
        <div className="filter-row" aria-label="Filtrar catálogo">
          {filters.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={filter === option.id}
              onClick={() => {
                setFilter(option.id);
                setShowAll(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
        <label className="search-box">
          <Search size={18} />
          <span className="sr-only">Buscar en el catálogo</span>
          <input
            type="search"
            placeholder="Buscar una idea..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowAll(false);
            }}
          />
        </label>
      </div>
      <p className="catalog-count">
        {matches.length} {matches.length === 1 ? "resultado" : "resultados"} ·
        Selecciona una ficha para ver más
      </p>
      <div className="catalog-grid">
        {visible.map((item) => (
          <button
            className={`catalog-card catalog-${item.kind}`}
            key={item.id}
            type="button"
            onClick={() => onOpen(item)}
          >
            {item.kind === "landing" && <LandingVisual id={item.id} />}
            <span className="catalog-card-top">
              {kindLabel[item.kind]} <ArrowUpRight size={17} />
            </span>
            <strong>{item.title}</strong>
            <p>{item.summary}</p>
            <span className="catalog-card-link">
              {item.kind === "automation"
                ? "Ver cómo funcionaría"
                : "Explorar concepto"}{" "}
              <span>↗</span>
            </span>
          </button>
        ))}
      </div>
      {matches.length === 0 && (
        <div className="catalog-empty">
          <strong>No encontramos esa idea.</strong>
          <p>Prueba otro término o cambia la categoría.</p>
        </div>
      )}
      {!showAll && matches.length > 12 && (
        <button
          className="show-more"
          type="button"
          onClick={() => setShowAll(true)}
        >
          Mostrar los {matches.length} resultados <ArrowUpRight size={17} />
        </button>
      )}
    </section>
  );
}

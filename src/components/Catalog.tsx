import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { catalog, featuredCatalog } from "../data/catalog";
import { LandingVisual } from "./LandingVisual";
import { normalizeSearch } from "../lib/search";
import type { PortfolioKind } from "../data/portfolio.types";
import type { CatalogProps } from "./site.types";

type Filter = "all" | PortfolioKind;
const filters: readonly { id: Filter; label: string }[] = [
  { id: "all", label: "Todas las ideas" },
  { id: "automation", label: "Automatizar tareas" },
  { id: "system", label: "Sistemas a medida" },
  { id: "landing", label: "Páginas para vender" },
];
const kindLabel: Record<PortfolioKind, string> = {
  automation: "TAREA AUTOMATIZABLE",
  system: "CONCEPTO DE SISTEMA",
  landing: "PÁGINA DE MUESTRA",
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
          normalizeSearch(`${item.title} ${item.summary}`).includes(
            normalizeSearch(query),
          ),
      ),
    [filter, query],
  );
  const visible = showAll
    ? matches
    : filter === "all" && query.trim() === ""
      ? featuredCatalog
      : matches.slice(0, 8);

  return (
    <section
      id="catalogo"
      className="section-shell catalog-section"
      tabIndex={-1}
    >
      <div className="section-intro">
        <div>
          <span className="eyebrow">02 / MÁS IDEAS</span>
          <h2>
            Ideas para
            <br />
            <em>tu siguiente paso.</em>
          </h2>
        </div>
        <p>
          Aquí hay ocho ideas para empezar. Si buscas algo específico, explora
          la biblioteca completa: 40 tareas automatizables, 20 sistemas y 10
          propuestas de páginas. Son conceptos, no proyectos de clientes.
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
      {!showAll && matches.length > 8 && (
        <button
          className="show-more"
          type="button"
          onClick={() => setShowAll(true)}
        >
          Explorar las {matches.length} ideas <ArrowUpRight size={17} />
        </button>
      )}
    </section>
  );
}

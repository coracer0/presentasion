import { describe, expect, it } from "vitest";
import { catalog } from "../data/catalog";
import { normalizeSearch } from "./search";

describe("búsqueda del catálogo", () => {
  it("encuentra el mismo contenido con y sin acentos", () => {
    const search = (query: string) =>
      catalog.filter((item) =>
        normalizeSearch(`${item.title} ${item.summary}`).includes(
          normalizeSearch(query),
        ),
      );

    expect(search("clinica")).toEqual(search("clínica"));
    expect(search("clinica").length).toBeGreaterThan(0);
  });
});

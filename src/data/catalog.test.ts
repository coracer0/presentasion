import { describe, expect, it } from "vitest";
import { catalog } from "./catalog";
import { automationExamples } from "./examples";

describe("catálogo público", () => {
  it("presenta todas las capacidades con ejemplos completos para los scripts", () => {
    expect(catalog.filter((item) => item.kind === "automation")).toHaveLength(
      40,
    );
    expect(catalog.filter((item) => item.kind === "system")).toHaveLength(20);
    expect(catalog.filter((item) => item.kind === "landing")).toHaveLength(10);
    expect(catalog.every((item) => item.summary.length > 20)).toBe(true);
    for (const item of catalog.filter((entry) => entry.kind === "automation")) {
      const example = automationExamples[item.id];
      expect(
        [
          example.problem,
          example.trigger,
          example.input,
          example.output,
          example.integrations,
          example.limits,
        ].every(Boolean),
      ).toBe(true);
      expect(example.steps.length).toBeGreaterThan(1);
    }
  });
});

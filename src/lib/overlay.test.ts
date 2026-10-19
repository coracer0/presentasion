import { describe, expect, it } from "vitest";
import {
  createOverlayUrl,
  defaultOverlay,
  parseOverlayConfig,
} from "./overlay";

describe("URL pública del overlay", () => {
  it("conserva parámetros válidos para OBS", () => {
    const url = createOverlayUrl(
      { ...defaultOverlay, scene: "intro", host: "Áxel" },
      "https://coracer0.github.io/presentasion/",
    );
    expect(url).toContain("/presentasion/overlay.html?");
    expect(parseOverlayConfig(new URL(url).search).host).toBe("Áxel");
    expect(parseOverlayConfig(new URL(url).search).scene).toBe("intro");
  });

  it("descarta escenas y colores inválidos y acota texto", () => {
    const result = parseOverlayConfig(
      "?scene=delete&accent=red&title=" + "x".repeat(80),
    );
    expect(result.scene).toBe(defaultOverlay.scene);
    expect(result.accent).toBe(defaultOverlay.accent);
    expect(result.title).toHaveLength(48);
  });
});

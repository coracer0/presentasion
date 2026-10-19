import type { OverlayConfig, Scene } from "./overlay.types";

export const defaultOverlay: OverlayConfig = {
  scene: "interview",
  host: "Alex Rivera",
  guest: "Marina López",
  title: "Detrás de la imagen",
  accent: "#8da8ff",
};

const scenes: readonly Scene[] = ["intro", "interview", "break", "callout"];
const cleanText = (
  value: string | null,
  fallback: string,
  maxLength: number,
): string => {
  const cleaned = Array.from(value ?? "")
    .filter(
      (character) =>
        character.charCodeAt(0) > 31 && character.charCodeAt(0) !== 127,
    )
    .join("")
    .trim()
    .slice(0, maxLength);
  return cleaned || fallback;
};

export function parseOverlayConfig(search: string): OverlayConfig {
  const params = new URLSearchParams(search);
  const requestedScene = params.get("scene");
  const scene =
    scenes.find((item) => item === requestedScene) ?? defaultOverlay.scene;
  const requestedAccent = params.get("accent");

  return {
    scene,
    host: cleanText(params.get("host"), defaultOverlay.host, 28),
    guest: cleanText(params.get("guest"), defaultOverlay.guest, 28),
    title: cleanText(params.get("title"), defaultOverlay.title, 48),
    accent:
      requestedAccent && /^#[0-9a-fA-F]{6}$/.test(requestedAccent)
        ? requestedAccent
        : defaultOverlay.accent,
  };
}

export function createOverlayUrl(
  config: OverlayConfig,
  baseUrl: string,
): string {
  const url = new URL("overlay.html", baseUrl);
  url.search = new URLSearchParams({
    scene: config.scene,
    host: config.host,
    guest: config.guest,
    title: config.title,
    accent: config.accent,
  }).toString();
  return url.toString();
}

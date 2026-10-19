import type { OverlayConfig } from "../lib/overlay.types";

export interface SceneProps {
  config: OverlayConfig;
  mode?: "preview" | "overlay";
}

export type Scene = "intro" | "interview" | "break" | "callout";

export interface OverlayConfig {
  scene: Scene;
  host: string;
  guest: string;
  title: string;
  accent: string;
}

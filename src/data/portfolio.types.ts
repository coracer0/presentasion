export type PortfolioKind = "automation" | "system" | "landing";

export interface PortfolioItem {
  id: string;
  kind: PortfolioKind;
  title: string;
  summary: string;
}

export interface AutomationExample {
  problem: string;
  trigger: string;
  input: string;
  steps: readonly string[];
  output: string;
  integrations: string;
  limits: string;
}

export type DemoId = "podcast" | "appointments" | "prices" | "restaurant";

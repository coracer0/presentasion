import type { DemoId } from "./portfolio.types";

export interface CaseStudy {
  id: DemoId;
  slug: string;
  title: string;
  summary: string;
  problem: string;
  audience: string;
  tryHere: string;
  decision: string;
  limit: string;
  realWorld: string;
  measure: string;
}

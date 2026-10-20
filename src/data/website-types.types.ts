import type { DemoId } from "./portfolio.types";

export type WebsiteTypeGroup = "showcase" | "commerce" | "operations";

export interface WebsiteType {
  id: string;
  name: string;
  description: string;
  group: WebsiteTypeGroup;
  featured: boolean;
  demoId?: DemoId;
}

export interface WebsiteTypeCardProps {
  item: WebsiteType;
  headingLevel: 3 | 4;
}

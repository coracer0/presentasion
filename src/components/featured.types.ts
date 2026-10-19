import type { DemoId } from "../data/portfolio.types";

export type NeedId = "all" | "sell" | "save" | "care" | "launch";

export interface NeedOption {
  id: NeedId;
  label: string;
  demos: readonly DemoId[];
}

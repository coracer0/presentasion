import type { RefObject } from "react";
import type { DemoId, PortfolioItem } from "../data/portfolio.types";

export interface FeaturedProps {
  onOpen: (id: DemoId) => void;
}

export interface CatalogProps {
  onOpen: (item: PortfolioItem) => void;
}

export interface DetailDialogProps {
  demo: DemoId | null;
  item: PortfolioItem | null;
  onClose: () => void;
  returnFocus: RefObject<HTMLElement | null>;
}

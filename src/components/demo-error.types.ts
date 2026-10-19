import type { ReactNode } from "react";

export interface DemoErrorProps {
  children: ReactNode;
}

export interface DemoErrorState {
  failed: boolean;
}

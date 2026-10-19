import type { DemoId } from "../data/portfolio.types";

const demoIds: readonly DemoId[] = [
  "appointments",
  "restaurant",
  "prices",
  "podcast",
];

export function readDemoFromUrl(search: string): DemoId | null {
  const requested = new URLSearchParams(search).get("demo");
  return demoIds.find((id) => id === requested) ?? null;
}

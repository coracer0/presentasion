export type StoryId = "appointments" | "orders" | "prices";

export interface StoryScene {
  label: string;
  before: readonly [string, string];
  result: string;
  detail: string;
}

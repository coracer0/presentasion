export type StoryId = "appointments" | "orders" | "prices";

export interface StoryScene {
  label: string;
  before: readonly [string, string];
  result: string;
  detail: string;
}

export interface StoryPanelProps {
  story: StoryScene;
  reduceMotion: boolean;
}

export interface StoryTabsProps {
  selected: StoryId;
  onSelect: (id: StoryId) => void;
}

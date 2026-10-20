export type CampaignGoal = "messages" | "awareness";
export type CampaignFormat = "post" | "story";

export interface CampaignConcept {
  goal: CampaignGoal;
  format: CampaignFormat;
  headline: string;
  subline: string;
  callToAction: string;
  caption: string;
  measure: string;
  reason: string;
}

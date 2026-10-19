export interface MenuItem {
  id: string;
  name: string;
  price: number;
  note: string;
}

export interface PriceSample {
  id: string;
  name: string;
  previous: number;
  current: number;
}

export type Cart = Readonly<Record<string, number>>;

export type MessageTopic = "hours" | "location" | "delivery" | "human";

export interface MessageReply {
  title: string;
  body: string;
  followUp: string;
}

export interface PrintProduct {
  id: "flyers" | "cards" | "labels";
  name: string;
  setupPriceCents: number;
  unitPriceCents: number;
}

export interface PrintQuote {
  product: PrintProduct;
  quantity: number;
  urgent: boolean;
  totalCents: number;
}

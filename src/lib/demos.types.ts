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

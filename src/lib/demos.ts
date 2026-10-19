import type { Cart, MenuItem, PriceSample } from "./demos.types";

export const appointmentSlots = ["10:00", "11:30", "16:00"] as const;
export const menuItems: readonly MenuItem[] = [
  {
    id: "burger",
    name: "Burger de la casa",
    price: 169,
    note: "Pan artesanal · papas",
  },
  {
    id: "pizza",
    name: "Pizza del horno",
    price: 229,
    note: "Masa madre · albahaca",
  },
  {
    id: "salad",
    name: "Bowl fresco",
    price: 145,
    note: "Vegetales · aderezo cítrico",
  },
];
export const initialPrices: readonly PriceSample[] = [
  { id: "camera", name: "Cámara mirrorless", previous: 1290, current: 1290 },
  { id: "light", name: "Panel LED", previous: 890, current: 890 },
  { id: "mic", name: "Micrófono USB", previous: 490, current: 490 },
];

export function reserveSlot(
  booked: readonly string[],
  slot: string,
): readonly string[] {
  if (
    !appointmentSlots.some((available) => available === slot) ||
    booked.includes(slot)
  )
    return booked;
  return [...booked, slot];
}

export function priceDrop(sample: PriceSample): number {
  return Math.max(0, sample.previous - sample.current);
}

export function shouldAlert(sample: PriceSample, threshold: number): boolean {
  return (
    Number.isFinite(threshold) &&
    threshold > 0 &&
    priceDrop(sample) >= threshold
  );
}

export function addToCart(cart: Cart, id: string): Cart {
  if (!menuItems.some((item) => item.id === id)) return cart;
  return { ...cart, [id]: (cart[id] ?? 0) + 1 };
}

export function cartTotal(cart: Cart): number {
  return menuItems.reduce(
    (total, item) => total + item.price * (cart[item.id] ?? 0),
    0,
  );
}

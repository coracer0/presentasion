import { describe, expect, it } from "vitest";
import { addToCart, cartTotal, reserveSlot, shouldAlert } from "./demos";

describe("demostraciones locales", () => {
  it("evita reservar dos veces el mismo horario", () => {
    const first = reserveSlot([], "10:00");
    expect(reserveSlot(first, "10:00")).toEqual(["10:00"]);
    expect(reserveSlot(first, "08:00")).toEqual(["10:00"]);
  });

  it("solo prepara alertas cuando la baja supera el umbral", () => {
    const sample = {
      id: "camera",
      name: "Cámara",
      previous: 1290,
      current: 1120,
    };
    expect(shouldAlert(sample, 100)).toBe(true);
    expect(shouldAlert(sample, 200)).toBe(false);
    expect(shouldAlert(sample, 0)).toBe(false);
  });

  it("calcula el total del carrito sin mutar el estado anterior", () => {
    const empty = {};
    const cart = addToCart(addToCart(empty, "burger"), "pizza");
    expect(cartTotal(cart)).toBe(398);
    expect(empty).toEqual({});
    expect(addToCart(cart, "unknown")).toBe(cart);
  });
});

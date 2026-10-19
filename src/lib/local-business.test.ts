import { describe, expect, it } from "vitest";
import { createPrintQuote, messageReplies } from "./local-business";

describe("cotización de ejemplo", () => {
  it("explica el total y el recargo urgente", () => {
    expect(createPrintQuote("flyers", 100, false)?.totalCents).toBe(32000);
    expect(createPrintQuote("flyers", 100, true)?.totalCents).toBe(38400);
    expect(createPrintQuote("cards", 25, false)?.totalCents).toBe(21750);
  });

  it("rechaza cantidades fuera del rango y productos desconocidos", () => {
    expect(createPrintQuote("flyers", 0, false)).toBeNull();
    expect(createPrintQuote("flyers", 1001, false)).toBeNull();
    expect(createPrintQuote("flyers", 25.5, false)).toBeNull();
    expect(createPrintQuote("other", 100, false)).toBeNull();
  });
});

describe("asistente de mensajes", () => {
  it("permite pedir una persona en lugar de continuar con el bot", () => {
    expect(messageReplies.human.title).toBe("Atención personal");
    expect(messageReplies.human.body).toContain("pasaríamos la conversación");
  });
});

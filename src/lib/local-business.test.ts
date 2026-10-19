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
  it("explica la atención humana sin prometer un aviso real", () => {
    expect(messageReplies.human.title).toBe("Así pedirías atención personal");
    expect(messageReplies.human.body).toContain("nadie recibe el mensaje");
  });
});

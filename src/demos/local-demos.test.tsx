import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MessagesDemo } from "./MessagesDemo";
import { QuotesDemo } from "./QuotesDemo";

afterEach(cleanup);

describe("demos para negocios locales", () => {
  it("responde una duda y permite pedir atención humana", () => {
    render(<MessagesDemo />);
    fireEvent.click(screen.getByRole("button", { name: "¿A qué hora abren?" }));
    expect(screen.getByText("Horario")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Prefiero hablar con alguien" }),
    );
    expect(screen.getByText("Atención personal")).toBeTruthy();
  });

  it("muestra un presupuesto desglosado sin enviar datos", () => {
    render(<QuotesDemo />);
    fireEvent.click(
      screen.getByRole("button", { name: "Calcular presupuesto" }),
    );
    expect(screen.getByText("Total de muestra")).toBeTruthy();
    expect(screen.getByText("$200.00")).toBeTruthy();
    expect(screen.getByText("$320.00")).toBeTruthy();
    expect(
      screen.getByText(
        "Faltaría confirmar materiales, impuestos, entrega y vigencia con el negocio.",
      ),
    ).toBeTruthy();
  });

  it("explica cuando la cantidad no es válida", () => {
    render(<QuotesDemo />);
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "0" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calcular presupuesto" }),
    );
    expect(screen.getByRole("alert").textContent).toContain("entre 25 y 1000");
  });

  it("muestra centavos sin alterar el total", () => {
    render(<QuotesDemo />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "cards" },
    });
    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "25" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Calcular presupuesto" }),
    );
    expect(screen.getByText("$37.50")).toBeTruthy();
    expect(screen.getByText("$217.50")).toBeTruthy();
  });
});

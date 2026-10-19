import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { DemoErrorBoundary } from "./DemoErrorBoundary";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

it("mantiene disponible una salida cuando falla una demo", () => {
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  const BrokenDemo = () => {
    throw new Error("demo de prueba");
  };

  render(
    <DemoErrorBoundary>
      <BrokenDemo />
    </DemoErrorBoundary>,
  );
  expect(screen.getByRole("alert").textContent).toContain(
    "No pudimos abrir esta demo",
  );
  expect(
    screen.getByRole("button", { name: "Recargar y reintentar" }),
  ).toBeTruthy();
});

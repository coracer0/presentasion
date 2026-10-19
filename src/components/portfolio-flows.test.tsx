import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SiteHeader } from "./SiteHeader";
import { Featured } from "./Featured";
import { Catalog } from "./Catalog";
import { DetailDialog } from "./DetailDialog";

afterEach(cleanup);
beforeAll(() => {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
});
afterAll(() => vi.unstubAllGlobals());

describe("recorridos del portafolio", () => {
  it("abre y cierra la navegación móvil", () => {
    render(<SiteHeader />);
    const open = screen.getByRole("button", { name: "Abrir menú" });
    fireEvent.click(open);
    expect(
      screen
        .getByRole("button", { name: "Cerrar menú" })
        .getAttribute("aria-expanded"),
    ).toBe("true");
    fireEvent.click(screen.getByRole("link", { name: "Explorar ideas" }));
    expect(
      screen
        .getByRole("button", { name: "Abrir menú" })
        .getAttribute("aria-expanded"),
    ).toBe("false");
  });

  it("muestra ejemplos relacionados con la necesidad elegida", () => {
    render(<Featured onOpen={() => undefined} />);
    fireEvent.click(
      screen.getByRole("button", { name: "Quiero ahorrar tiempo" }),
    );
    expect(
      screen.getAllByRole("button", { name: /Probar demo:/ }),
    ).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: /Reservas sin mensajes/ }),
    ).toBeTruthy();
  });

  it("encuentra clínica aunque se escriba sin acento", () => {
    render(<Catalog onOpen={() => undefined} />);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "clinica" },
    });
    expect(screen.getByText("Gestión de Consultorios Médicos")).toBeTruthy();
  });

  it("destaca distintos tipos de idea antes de abrir la biblioteca", () => {
    render(<Catalog onOpen={() => undefined} />);
    expect(document.querySelectorAll(".catalog-card")).toHaveLength(8);
    expect(
      document.querySelectorAll(".catalog-automation").length,
    ).toBeGreaterThan(0);
    expect(document.querySelectorAll(".catalog-system").length).toBeGreaterThan(
      0,
    );
    expect(
      document.querySelectorAll(".catalog-landing").length,
    ).toBeGreaterThan(0);
  });

  it("abre una demo y permite cerrarla con Escape", () => {
    const onClose = vi.fn();
    render(
      <DetailDialog
        demo="appointments"
        item={null}
        onClose={onClose}
        returnFocus={{ current: null }}
      />,
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });
});

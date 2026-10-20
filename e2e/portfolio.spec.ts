import { expect, test, type Locator } from "@playwright/test";

const demos = [
  "appointments",
  "restaurant",
  "messages",
  "quotes",
  "prices",
  "podcast",
] as const;
const casePaths = [
  "reservas",
  "pedidos",
  "mensajes",
  "cotizaciones",
  "precios",
  "directos",
] as const;

const demoActions = {
  appointments: async (dialog: Locator) => {
    await dialog.getByRole("button", { name: "10:00" }).click();
    await dialog.getByRole("button", { name: "Confirmar horario" }).click();
    await expect(dialog.getByRole("status").last()).toContainText("confirmada");
    await dialog.getByRole("button", { name: "Reiniciar demo" }).click();
    await expect(
      dialog.getByText("0 citas reservadas en esta demo"),
    ).toBeVisible();
  },
  restaurant: async (dialog: Locator) => {
    await dialog
      .getByRole("button", { name: "Agregar Burger de la casa" })
      .click();
    await dialog
      .getByRole("button", { name: "Ver resumen del pedido" })
      .click();
    await expect(dialog.getByText(/Resumen de muestra:/)).toContainText(
      "Burger de la casa",
    );
    await dialog.getByRole("button", { name: "Reiniciar demo" }).click();
    await expect(dialog.getByText("0 productos")).toBeVisible();
  },
  messages: async (dialog: Locator) => {
    await dialog
      .getByRole("button", { name: "Ver atención humana (demo)" })
      .click();
    await expect(
      dialog.getByText("En esta demo nadie recibe el mensaje."),
    ).toBeVisible();
    await dialog
      .getByRole("button", { name: "Reiniciar conversación" })
      .click();
    await expect(
      dialog.getByText("En esta demo nadie recibe el mensaje."),
    ).toHaveCount(0);
  },
  quotes: async (dialog: Locator) => {
    await dialog.getByRole("button", { name: "Calcular presupuesto" }).click();
    await expect(dialog.getByText("Total de muestra")).toBeVisible();
    await dialog.getByRole("spinbutton").fill("0");
    await dialog.getByRole("button", { name: "Calcular presupuesto" }).click();
    await expect(dialog.getByRole("alert")).toContainText("entre 25 y 1000");
  },
  prices: async (dialog: Locator) => {
    await dialog.getByRole("button", { name: "Simular baja" }).click();
    await expect(dialog.getByText("Alerta preparada")).toBeVisible();
    await dialog.getByRole("button", { name: "Reiniciar" }).click();
    await expect(dialog.getByText("Sin alertas por ahora")).toBeVisible();
  },
  podcast: async (dialog: Locator) => {
    await dialog.getByRole("button", { name: "Apertura" }).click();
    await expect(
      dialog.getByRole("button", { name: "Apertura" }),
    ).toHaveAttribute("aria-pressed", "true");
    await dialog.getByRole("button", { name: "Reiniciar" }).click();
    await expect(
      dialog.getByRole("button", { name: "Entrevista" }),
    ).toHaveAttribute("aria-pressed", "true");
  },
};

test("la portada explica el servicio y deja ver la historia completa", async ({
  page,
}) => {
  await page.goto("/presentasion/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Páginas y herramientas",
  );
  await expect(page.getByText("Reserva de muestra confirmada")).toBeVisible();
  const contact = page.getByRole("link", { name: /Escríbeme por WhatsApp/ });
  await expect(contact).toHaveAttribute("href", /wa\.me\/524181774447\?text=/);
  await page.getByRole("link", { name: /Colaboro en una agencia/ }).click();
  await page
    .getByRole("button", { name: "Ver ejemplos para agencias" })
    .click();
  await expect(page.getByRole("button", { name: /Probar demo:/ })).toHaveCount(
    3,
  );
});

test("el soporte tecnológico y la tarjeta muestran los servicios nuevos", async ({
  page,
}) => {
  await page.goto("/presentasion/");
  await page.getByRole("link", { name: /Necesito ayuda técnica/ }).click();
  const support = page.locator("#soporte");
  for (const service of ["Computadoras", "Programas", "Hogar inteligente"]) {
    await expect(support.getByRole("heading", { name: service })).toBeVisible();
  }
  await expect(
    support.getByRole("link", { name: /Cuéntame por WhatsApp/ }),
  ).toHaveAttribute("href", /wa\.me\/524181774447\?text=/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    ),
  ).toBe(false);

  await page.goto("/presentasion/print-card.html");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Osmar Axel Coracero Godínez",
  );
  await expect(page.getByText("Hogar inteligente")).toBeVisible();
  await expect(page.getByText(/Alexa/)).toHaveCount(0);
  await expect(
    page.getByRole("img", { name: /Código QR que abre el portafolio/ }),
  ).toBeVisible();
});

test("los seis casos llevan a un contacto con contexto", async ({ page }) => {
  for (const path of casePaths) {
    await page.goto(`/presentasion/casos/${path}.html`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const contact = page.getByRole("link", {
      name: /Escríbeme por WhatsApp/,
    });
    await expect(contact).toHaveAttribute(
      "href",
      new RegExp(`caso%20de%20${path}`),
    );
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
  }
});

for (const demo of demos) {
  test(`la demo ${demo} funciona y cabe en pantalla`, async ({ page }) => {
    await page.goto(`/presentasion/?demo=${demo}`);
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await demoActions[demo](dialog);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
    await expect(
      dialog.getByRole("link", { name: /Escríbeme por WhatsApp/ }),
    ).toHaveAttribute("href", /text=/);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });
}

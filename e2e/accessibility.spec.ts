import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("la portada no tiene infracciones automáticas de WCAG AA", async ({
  page,
}) => {
  await page.goto("/presentasion/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  const failures = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    targets: violation.nodes.map((node) => node.target).slice(0, 3),
  }));
  expect(failures).toEqual([]);
});

test("las demos no tienen infracciones automáticas de WCAG AA", async ({
  page,
}) => {
  const failures: string[] = [];
  for (const demo of [
    "appointments",
    "restaurant",
    "messages",
    "quotes",
    "prices",
    "podcast",
  ]) {
    await page.goto(`/presentasion/?demo=${demo}`);
    await expect(page.getByRole("dialog")).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    failures.push(
      ...results.violations.map(
        (violation) =>
          `${demo}: ${violation.id} (${violation.nodes
            .map((node) => node.target.join(" "))
            .slice(0, 2)
            .join(", ")})`,
      ),
    );
  }
  expect(failures).toEqual([]);
});

test("los casos no tienen infracciones automáticas de WCAG AA", async ({
  page,
}) => {
  const failures: string[] = [];
  for (const path of [
    "reservas",
    "pedidos",
    "mensajes",
    "cotizaciones",
    "precios",
    "directos",
  ]) {
    await page.goto(`/presentasion/casos/${path}.html`);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    failures.push(
      ...results.violations.map(
        (violation) =>
          `${path}: ${violation.id} (${violation.nodes
            .map((node) => node.target.join(" "))
            .slice(0, 2)
            .join(", ")})`,
      ),
    );
  }
  expect(failures).toEqual([]);
});

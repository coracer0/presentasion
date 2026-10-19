import { readFileSync, writeFileSync } from "node:fs";

const source = readFileSync(
  new URL("../archive/legacy-index.html", import.meta.url),
  "utf8",
);
const sections = [
  ["automation", 'id="bots"', 'id="web"'],
  ["system", 'id="web"', 'id="landing"'],
  ["landing", 'id="landing"', "</main>"],
];
const clean = (value) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const catalog = sections.flatMap(([kind, start, end]) => {
  const block = source.slice(
    source.indexOf(start),
    source.indexOf(end, source.indexOf(start)),
  );
  const items = [
    ...block.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/g),
  ];
  return items.map((match, index) => ({
    id: `${kind}-${index + 1}`,
    kind,
    title: clean(match[1]).replace(/^\d+\.\s*/, ""),
    summary: clean(match[2]),
  }));
});

const counts = Object.groupBy(catalog, ({ kind }) => kind);
if (
  counts.automation?.length !== 40 ||
  counts.system?.length !== 20 ||
  counts.landing?.length !== 10
) {
  throw new Error("El catálogo heredado no contiene 40/20/10 fichas.");
}
writeFileSync(
  new URL("../src/data/catalog.json", import.meta.url),
  `${JSON.stringify(catalog, null, 2)}\n`,
);

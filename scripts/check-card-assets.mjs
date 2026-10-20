import QRCode from "qrcode";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const destinations = JSON.parse(
  readFileSync(new URL("scripts/card-links.json", root), "utf8"),
);

for (const [name, url] of [
  ["qr.svg", destinations.digital],
  ["portfolio-qr.svg", destinations.print],
]) {
  const expected = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: "#142033", light: "#ffffffff" },
  });
  const actual = readFileSync(new URL(`public/${name}`, root), "utf8");
  if (actual !== expected)
    throw new Error(`${name} no coincide con card-links.json`);
}

const printedUrl = new URL(destinations.print);
if (
  printedUrl.protocol !== "https:" ||
  printedUrl.pathname !== "/presentasion/"
) {
  throw new Error("La URL impresa debe apuntar al portafolio público");
}

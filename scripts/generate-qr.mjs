import QRCode from "qrcode";
import { readFileSync, writeFileSync } from "node:fs";

const destinations = JSON.parse(
  readFileSync(new URL("./card-links.json", import.meta.url), "utf8"),
);

const codes = [
  { name: "qr.svg", url: destinations.digital },
  { name: "portfolio-qr.svg", url: destinations.print },
];

for (const code of codes) {
  const svg = await QRCode.toString(code.url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: "#142033", light: "#ffffffff" },
  });
  writeFileSync(new URL(`../public/${code.name}`, import.meta.url), svg);
}

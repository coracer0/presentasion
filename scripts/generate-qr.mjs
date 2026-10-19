import QRCode from "qrcode";
import { writeFileSync } from "node:fs";

const codes = [
  { name: "qr.svg", url: "https://wa.me/524181774447" },
  {
    name: "portfolio-qr.svg",
    url: "https://coracer0.github.io/presentasion/",
  },
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

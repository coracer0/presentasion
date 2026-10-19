import QRCode from "qrcode";
import { writeFileSync } from "node:fs";

const svg = await QRCode.toString("https://coracer0.github.io/presentasion/", {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 1,
  color: { dark: "#142033", light: "#ffffffff" },
});
writeFileSync(new URL("../public/qr.svg", import.meta.url), svg);

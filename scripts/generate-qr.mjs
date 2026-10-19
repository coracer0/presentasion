import QRCode from "qrcode";
import { writeFileSync } from "node:fs";

const svg = await QRCode.toString("https://wa.me/524181774447", {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 1,
  color: { dark: "#142033", light: "#ffffffff" },
});
writeFileSync(new URL("../public/qr.svg", import.meta.url), svg);

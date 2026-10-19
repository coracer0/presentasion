import { createRoot } from "react-dom/client";
import { OverlayGraphics } from "./components/Scene";
import { parseOverlayConfig } from "./lib/overlay";
import "./styles.css";

const root = document.getElementById("root");
if (root)
  createRoot(root).render(
    <OverlayGraphics
      config={parseOverlayConfig(window.location.search)}
      mode="overlay"
    />,
  );

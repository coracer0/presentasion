import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/presentasion/",
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        card: resolve(import.meta.dirname, "card.html"),
        printCard: resolve(import.meta.dirname, "print-card.html"),
        overlay: resolve(import.meta.dirname, "overlay.html"),
        reservationsCase: resolve(import.meta.dirname, "casos/reservas.html"),
        ordersCase: resolve(import.meta.dirname, "casos/pedidos.html"),
        pricesCase: resolve(import.meta.dirname, "casos/precios.html"),
        broadcastsCase: resolve(import.meta.dirname, "casos/directos.html"),
      },
    },
  },
  test: {
    environment: "jsdom",
  },
});

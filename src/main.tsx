import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, MotionConfig } from "motion/react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { Featured } from "./components/Featured";
import { Catalog } from "./components/Catalog";
import { Process } from "./components/Process";
import { Experience } from "./components/Experience";
import { SiteFooter } from "./components/SiteFooter";
import { DetailDialog } from "./components/DetailDialog";
import { ScrollReveal } from "./components/ScrollReveal";
import type { DemoId, PortfolioItem } from "./data/portfolio.types";
import { readDemoFromUrl } from "./lib/demo-link";
import "./styles.css";

function App() {
  const [demo, setDemo] = useState<DemoId | null>(() =>
    readDemoFromUrl(window.location.search),
  );
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const rememberFocus = () => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Hero />
        </motion.div>
        <ScrollReveal>
          <Featured
            onOpen={(id) => {
              rememberFocus();
              setDemo(id);
            }}
          />
        </ScrollReveal>
        <ScrollReveal>
          <Catalog
            onOpen={(selected) => {
              rememberFocus();
              setItem(selected);
            }}
          />
        </ScrollReveal>
        <ScrollReveal>
          <Process />
        </ScrollReveal>
        <ScrollReveal>
          <Experience />
        </ScrollReveal>
      </main>
      <SiteFooter />
      <DetailDialog
        demo={demo}
        item={item}
        onClose={() => {
          setDemo(null);
          setItem(null);
          const url = new URL(window.location.href);
          if (url.searchParams.has("demo")) {
            url.searchParams.delete("demo");
            window.history.replaceState({}, "", url);
          }
        }}
        returnFocus={returnFocus}
      />
    </MotionConfig>
  );
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);

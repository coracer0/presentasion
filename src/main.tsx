import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { OfferOverview } from "./components/OfferOverview";
import { Featured } from "./components/Featured";
import { Catalog } from "./components/Catalog";
import { Process } from "./components/Process";
import { Experience } from "./components/Experience";
import { SiteFooter } from "./components/SiteFooter";
import { DetailDialog } from "./components/DetailDialog";
import { ScrollReveal } from "./components/ScrollReveal";
import { TechServices } from "./components/TechServices";
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
        <div>
          <Hero />
        </div>
        <ScrollReveal>
          <OfferOverview />
        </ScrollReveal>
        <ScrollReveal>
          <Experience />
        </ScrollReveal>
        <ScrollReveal>
          <Featured
            onOpen={(id) => {
              rememberFocus();
              setDemo(id);
            }}
          />
        </ScrollReveal>
        <ScrollReveal>
          <Process />
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
          <TechServices />
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

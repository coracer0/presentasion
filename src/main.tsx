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
import type { DemoId, PortfolioItem } from "./data/portfolio.types";
import "./styles.css";

function App() {
  const [demo, setDemo] = useState<DemoId | null>(null);
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
      <SiteHeader />
      <main>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Hero />
        </motion.div>
        <Featured
          onOpen={(id) => {
            rememberFocus();
            setDemo(id);
          }}
        />
        <Catalog
          onOpen={(selected) => {
            rememberFocus();
            setItem(selected);
          }}
        />
        <Process />
        <Experience />
      </main>
      <SiteFooter />
      <DetailDialog
        demo={demo}
        item={item}
        onClose={() => {
          setDemo(null);
          setItem(null);
        }}
        returnFocus={returnFocus}
      />
    </MotionConfig>
  );
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);

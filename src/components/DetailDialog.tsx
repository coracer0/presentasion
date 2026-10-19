import { Suspense, lazy } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { automationExamples } from "../data/examples";
import { caseStudies, getCaseUrl } from "../data/case-studies";
import { LandingVisual } from "./LandingVisual";
import { DemoErrorBoundary } from "./DemoErrorBoundary";
import type { DemoId, PortfolioItem } from "../data/portfolio.types";
import type { DetailDialogProps } from "./site.types";

const PodcastDemo = lazy(() =>
  import("../demos/PodcastDemo").then((module) => ({
    default: module.PodcastDemo,
  })),
);
const AppointmentsDemo = lazy(() =>
  import("../demos/AppointmentsDemo").then((module) => ({
    default: module.AppointmentsDemo,
  })),
);
const PricesDemo = lazy(() =>
  import("../demos/PricesDemo").then((module) => ({
    default: module.PricesDemo,
  })),
);
const RestaurantDemo = lazy(() =>
  import("../demos/RestaurantDemo").then((module) => ({
    default: module.RestaurantDemo,
  })),
);
const MessagesDemo = lazy(() =>
  import("../demos/MessagesDemo").then((module) => ({
    default: module.MessagesDemo,
  })),
);
const QuotesDemo = lazy(() =>
  import("../demos/QuotesDemo").then((module) => ({
    default: module.QuotesDemo,
  })),
);

function AutomationDetails({ item }: { item: PortfolioItem }) {
  const example = automationExamples[item.id];
  return (
    <div className="detail-body">
      <p className="detail-lead">{example.problem}</p>
      <div className="detail-example">
        <div>
          <span>QUÉ LA PONE EN MARCHA</span>
          <p>{example.trigger}</p>
        </div>
        <div>
          <span>INFORMACIÓN QUE RECIBE</span>
          <p>{example.input}</p>
        </div>
        <div>
          <span>QUÉ HACE</span>
          <ol>
            {example.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <span>QUÉ ENTREGA</span>
          <p>{example.output}</p>
        </div>
      </div>
      <div className="detail-note">
        <span>HERRAMIENTAS CON LAS QUE SE CONECTARÍA</span>
        <p>{example.integrations}</p>
        <span>LÍMITE IMPORTANTE</span>
        <p>{example.limits}</p>
      </div>
    </div>
  );
}

function ConceptDetails({ item }: { item: PortfolioItem }) {
  return (
    <div className="detail-body">
      {item.kind === "landing" && <LandingVisual id={item.id} large />}
      <p className="detail-lead">{item.summary}</p>
      <div className="detail-note">
        <span>ESTADO</span>
        <p>
          {item.kind === "landing"
            ? "Exploración visual de una posible página de presentación. Sus textos y marca son ficticios."
            : "Concepto de producto. Alcance, diseño e integraciones se definen con cada cliente."}
        </p>
        <span>SIGUIENTE PASO</span>
        <p>
          Si una idea encaja con tu negocio, definimos usuarios, flujo principal
          y una primera versión medible.
        </p>
      </div>
      <a
        className="text-link"
        href="https://wa.me/524181774447?text=Hola%20Axel%2C%20vi%20una%20idea%20en%20tu%20portafolio%20y%20quiero%20contarte%20mi%20caso."
        target="_blank"
        rel="noopener noreferrer"
      >
        Cuéntame tu idea por WhatsApp <ArrowUpRight size={17} />
      </a>
    </div>
  );
}

function DemoContent({ id }: { id: DemoId }) {
  let content;
  switch (id) {
    case "podcast":
      content = <PodcastDemo />;
      break;
    case "appointments":
      content = <AppointmentsDemo />;
      break;
    case "prices":
      content = <PricesDemo />;
      break;
    case "restaurant":
      content = <RestaurantDemo />;
      break;
    case "messages":
      content = <MessagesDemo />;
      break;
    case "quotes":
      content = <QuotesDemo />;
      break;
    default:
      content = null;
  }
  return (
    <DemoErrorBoundary>
      <Suspense
        fallback={
          <p className="demo-loading" role="status">
            Preparando la demo…
          </p>
        }
      >
        {content}
      </Suspense>
    </DemoErrorBoundary>
  );
}

function DemoAfterword({ id }: { id: DemoId }) {
  const study = caseStudies[id];
  const contactUrl = `https://wa.me/524181774447?text=${encodeURIComponent(`Hola Axel, vi la demo de ${study.title} y quiero contarte mi caso.`)}`;
  return (
    <div className="demo-afterword">
      <details className="case-explainer">
        <summary>Cómo funcionaría en tu negocio</summary>
        <dl>
          <div>
            <dt>Problema</dt>
            <dd>{study.problem}</dd>
          </div>
          <div>
            <dt>Para quién</dt>
            <dd>{study.audience}</dd>
          </div>
          <div>
            <dt>Decisión de diseño</dt>
            <dd>{study.decision}</dd>
          </div>
          <div>
            <dt>Mi aporte</dt>
            <dd>{study.contribution}</dd>
          </div>
          <div>
            <dt>Lo que demuestra</dt>
            <dd>{study.ability}</dd>
          </div>
          <div>
            <dt>Límite de esta demo</dt>
            <dd>{study.limit}</dd>
          </div>
          <div>
            <dt>Antes de implementarlo</dt>
            <dd>{study.realWorld}</dd>
          </div>
          <div>
            <dt>Cómo medirlo</dt>
            <dd>{study.measure}</dd>
          </div>
        </dl>
      </details>
      <div className="demo-next-step">
        <p>¿Te serviría algo así para tu negocio?</p>
        <a href={contactUrl} target="_blank" rel="noopener noreferrer">
          Escríbeme por WhatsApp <ArrowUpRight size={16} />
        </a>
        <a href={getCaseUrl(id)}>
          Leer el caso completo <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}

export function DetailDialog({
  demo,
  item,
  onClose,
  returnFocus,
}: DetailDialogProps) {
  const open = demo !== null || item !== null;
  const title = demo ? caseStudies[demo].title : (item?.title ?? "");
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className={`dialog-content ${demo ? "dialog-demo" : ""}`}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus.current?.focus();
          }}
          aria-describedby="dialog-description"
        >
          <div className="dialog-header">
            <div>
              <p>
                {demo
                  ? "DEMO ORIGINAL · DATOS FICTICIOS"
                  : item?.kind === "automation"
                    ? "UNA TAREA MENOS · EJEMPLO EXPLICADO"
                    : item?.kind === "system"
                      ? "SISTEMA · CONCEPTO"
                      : "PÁGINA · EXPLORACIÓN VISUAL"}
              </p>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description id="dialog-description">
                {demo
                  ? "Prueba un flujo de ejemplo sin conexiones reales ni datos de clientes."
                  : "Descripción de una capacidad o concepto, no de un proyecto entregado a un cliente."}
              </Dialog.Description>
            </div>
            <Dialog.Close className="dialog-close" aria-label="Cerrar detalle">
              <X size={22} />
            </Dialog.Close>
          </div>
          {demo ? (
            <>
              <DemoContent id={demo} />
              <DemoAfterword id={demo} />
            </>
          ) : item?.kind === "automation" ? (
            <AutomationDetails item={item} />
          ) : item ? (
            <ConceptDetails item={item} />
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

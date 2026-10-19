import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { automationExamples } from "../data/examples";
import { LandingVisual } from "./LandingVisual";
import { PodcastDemo } from "../demos/PodcastDemo";
import { AppointmentsDemo } from "../demos/AppointmentsDemo";
import { PricesDemo } from "../demos/PricesDemo";
import { RestaurantDemo } from "../demos/RestaurantDemo";
import type { DemoId, PortfolioItem } from "../data/portfolio.types";
import type { DetailDialogProps } from "./site.types";

const demoTitles: Record<DemoId, string> = {
  podcast: "Estudio para podcast y directos",
  appointments: "Asistente de reservas",
  prices: "Monitor de precios",
  restaurant: "Menú y pedido guiado",
};

function AutomationDetails({ item }: { item: PortfolioItem }) {
  const example = automationExamples[item.id];
  return (
    <div className="detail-body">
      <p className="detail-lead">{example.problem}</p>
      <div className="detail-example">
        <div>
          <span>DISPARADOR</span>
          <p>{example.trigger}</p>
        </div>
        <div>
          <span>ENTRADA DE EJEMPLO</span>
          <p>{example.input}</p>
        </div>
        <div>
          <span>PROCESO</span>
          <ol>
            {example.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <span>RESULTADO ESPERADO</span>
          <p>{example.output}</p>
        </div>
      </div>
      <div className="detail-note">
        <span>INTEGRACIONES POSIBLES</span>
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
            ? "Exploración visual de una posible landing. Sus textos y marca son ficticios."
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
        href="mailto:ax.coracero@gmail.com?subject=Quiero%20conversar%20sobre%20un%20proyecto"
      >
        Conversemos sobre algo similar <ArrowUpRight size={17} />
      </a>
    </div>
  );
}

function DemoContent({ id }: { id: DemoId }) {
  switch (id) {
    case "podcast":
      return <PodcastDemo />;
    case "appointments":
      return <AppointmentsDemo />;
    case "prices":
      return <PricesDemo />;
    case "restaurant":
      return <RestaurantDemo />;
    default:
      return null;
  }
}

export function DetailDialog({
  demo,
  item,
  onClose,
  returnFocus,
}: DetailDialogProps) {
  const open = demo !== null || item !== null;
  const title = demo ? demoTitles[demo] : (item?.title ?? "");
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
                  ? "DEMO INTERACTIVA · DATOS FICTICIOS"
                  : item?.kind === "automation"
                    ? "SCRIPT · EJEMPLO EXPLICADO"
                    : item?.kind === "system"
                      ? "SISTEMA · CONCEPTO"
                      : "LANDING · EXPLORACIÓN VISUAL"}
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
            <DemoContent id={demo} />
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

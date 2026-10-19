import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Printer,
} from "lucide-react";
import "./styles.css";

const base = import.meta.env.BASE_URL;

function ContactCard() {
  return (
    <main className="contact-page">
      <article className="contact-card">
        <img
          src={`${base}profile.webp`}
          width="100"
          height="100"
          alt="Axel Coracero"
        />
        <span>HOLA, SOY AXEL</span>
        <h1>Cuéntame qué tienes en mente.</h1>
        <p>
          Creo páginas y herramientas que ayudan a negocios locales a atender
          mejor y ahorrar tareas repetitivas. Me importa escucharte y dejar todo
          claro.
        </p>
        <div className="contact-links">
          <a
            href="https://wa.me/524181774447"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={19} /> Escríbeme por WhatsApp{" "}
            <ArrowUpRight size={18} />
          </a>
          <a
            className="contact-alternative"
            href="mailto:ax.coracero@gmail.com"
          >
            <Mail size={19} /> Si prefieres, envíame un correo{" "}
            <ArrowUpRight size={18} />
          </a>
          <a href={base}>
            <ArrowLeft size={19} /> Ver portafolio <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="contact-qr">
          <img
            src={`${base}qr.svg`}
            width="84"
            height="84"
            alt="Código QR que abre WhatsApp para escribirme"
          />
          <span>
            Escanea y escríbeme por WhatsApp. También puedes explorar las demos
            desde el portafolio.
          </span>
        </div>
      </article>
    </main>
  );
}

function PrintCard() {
  return (
    <main className="print-sheet">
      <p>Tarjeta lista para imprimir · frente y reverso</p>
      <button type="button" onClick={() => window.print()}>
        <Printer size={17} /> Imprimir tarjeta
      </button>
      <div className="print-cards">
        <article className="print-card print-front">
          <span>AXEL CORACERO</span>
          <h1>Hagamos tu día más fácil.</h1>
          <p>Páginas web · Bots de mensajes · Herramientas a medida</p>
          <small>WhatsApp: +52 418 177 4447</small>
        </article>
        <article className="print-card print-back">
          <img
            src={`${base}portfolio-qr.svg`}
            width="100"
            height="100"
            alt="Código QR que abre el portafolio y sus demos"
          />
          <span>ESCANEA Y EXPLORA MIS DEMOS</span>
          <small>coracer0.github.io/presentasion/</small>
        </article>
      </div>
      <p className="print-note">
        Exporta dos páginas, una por cara, a escala 100% y con impresión a
        color.
      </p>
      <a href={base}>Volver al portafolio</a>
    </main>
  );
}

const root = document.getElementById("root");
if (root)
  createRoot(root).render(
    document.body.dataset.page === "print" ? <PrintCard /> : <ContactCard />,
  );

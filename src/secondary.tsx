import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  Mail,
  MessageCircle,
  Printer,
} from "lucide-react";
import cardLinks from "../scripts/card-links.json";
import { getWhatsAppUrl } from "./lib/contact";
import "./styles.css";

const base = import.meta.env.BASE_URL;
const portfolioLabel = new URL(cardLinks.print).href.replace("https://", "");

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
          Creo páginas, campañas y herramientas para negocios locales. También
          ayudo con computadoras, programas y dispositivos inteligentes. Me
          importa escucharte y dejar todo claro.
        </p>
        <div className="contact-links">
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
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
      <p>Tarjeta de presentación · frente y reverso</p>
      <a
        className="print-download"
        href={`${base}axel-coracero-tarjeta-imprenta.pdf`}
        download
      >
        <Download size={17} /> Descargar PDF para imprenta
      </a>
      <button type="button" onClick={() => window.print()}>
        <Printer size={17} /> Imprimir en casa
      </button>
      <div className="print-cards">
        <article className="print-card print-front">
          <svg
            className="print-front-motif"
            viewBox="0 0 112 135"
            aria-hidden="true"
          >
            <path d="M112 0H38l74 74Z" fill="#8da8ff" />
            <path
              d="M26 50h58L55 96Z"
              fill="none"
              stroke="#4e67ad"
              strokeWidth="2.5"
            />
            <path d="M51 90h42l-21 22Z" fill="#49af92" />
            <path
              d="M24 124h53m0 0-9-7m9 7-9 7"
              fill="none"
              stroke="#4e67ad"
              strokeWidth="2.5"
            />
          </svg>
          <h1>
            Osmar Axel <span>Coracero Godínez</span>
          </h1>
          <p className="print-promise">Hagamos tu día más fácil.</p>
          <p className="print-services">
            <span>Web, campañas y automatizaciones</span>
            <span>Computadoras y programas</span>
            <span>Hogar inteligente</span>
          </p>
          <small>WhatsApp&nbsp; · &nbsp;+52 418 177 4447</small>
        </article>
        <article className="print-card print-back">
          <svg
            className="print-back-motif"
            viewBox="0 0 336 192"
            aria-hidden="true"
          >
            <path d="M0 0h70L0 70Z" fill="#8da8ff" />
            <path d="M336 192h-70l70-70Z" fill="#49af92" />
            <path
              d="M52 102h32m0 0-8-6m8 6-8 6M284 102h-32m0 0 8-6m-8 6 8 6"
              fill="none"
              stroke="#a7bcff"
              strokeWidth="2"
            />
          </svg>
          <img
            src={`${base}portfolio-qr.svg`}
            width="100"
            height="100"
            alt="Código QR que abre el portafolio y sus demos"
          />
          <span>ESCANEA Y CONOCE LO QUE HAGO</span>
          <small>{portfolioLabel}</small>
        </article>
      </div>
      <p className="print-note">
        El PDF para imprenta tiene dos caras, 3 mm de sangrado y un margen
        seguro de 4 mm. Antes de imprimir muchas unidades, prueba el escaneo del
        QR en una muestra física. La opción de casa imprime al tamaño final, sin
        sangrado.
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

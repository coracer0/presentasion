import { useState } from "react";
import { Download, Megaphone, RotateCcw } from "lucide-react";
import { getCampaignConcept } from "../lib/campaign";
import type { CampaignFormat, CampaignGoal } from "../lib/campaign.types";

const imageUrl = `${import.meta.env.BASE_URL}casa-brasa-campana.webp`;

export function CampaignDemo() {
  const [goal, setGoal] = useState<CampaignGoal>("messages");
  const [format, setFormat] = useState<CampaignFormat>("post");
  const concept = getCampaignConcept(goal, format);

  return (
    <div className="demo-layout campaign-demo-layout">
      <div className="demo-controls">
        <p className="demo-kicker">CAMPAÑA DE MUESTRA · CASA BRASA</p>
        <h3>Un anuncio empieza por una intención clara.</h3>
        <p className="demo-hint">
          Elige qué quieres lograr y dónde se vería la pieza. Mira cómo cambian
          el mensaje y lo que convendría medir. Todo aquí es ficticio.
        </p>
        <fieldset className="campaign-choice">
          <legend>¿Qué debería conseguir?</legend>
          <button
            type="button"
            aria-pressed={goal === "messages"}
            onClick={() => setGoal("messages")}
          >
            Recibir mensajes
          </button>
          <button
            type="button"
            aria-pressed={goal === "awareness"}
            onClick={() => setGoal("awareness")}
          >
            Dar a conocer el local
          </button>
        </fieldset>
        <fieldset className="campaign-choice">
          <legend>¿En qué formato?</legend>
          <button
            type="button"
            aria-pressed={format === "post"}
            onClick={() => setFormat("post")}
          >
            Publicación cuadrada
          </button>
          <button
            type="button"
            aria-pressed={format === "story"}
            onClick={() => setFormat("story")}
          >
            Historia vertical
          </button>
        </fieldset>
        <button
          className="action-quiet campaign-reset"
          type="button"
          onClick={() => {
            setGoal("messages");
            setFormat("post");
          }}
        >
          <RotateCcw size={16} /> Volver al ejemplo inicial
        </button>
        <p className="campaign-demo-limit">
          No publica anuncios, no cobra ni usa cuentas o datos reales.
        </p>
      </div>
      <div className="campaign-stage">
        <div className="campaign-stage-head">
          <Megaphone size={18} aria-hidden="true" /> VISTA PREVIA / PUBLICIDAD
          FICTICIA
        </div>
        <div className={`campaign-creative campaign-${format}`}>
          <img
            src={imageUrl}
            width="1254"
            height="1254"
            alt="Hamburguesa con papas en una mesa cálida de restaurante"
          />
          <div className="campaign-creative-copy">
            <span>CASA BRASA / EJEMPLO</span>
            <strong>{concept.headline}</strong>
            <p>{concept.subline}</p>
            <b>{concept.callToAction} ↗</b>
          </div>
        </div>
        <a
          className="campaign-download"
          href={`${import.meta.env.BASE_URL}casa-brasa-${goal}-${format}.webp`}
          download={`casa-brasa-${goal}-${format}-muestra.webp`}
        >
          <Download size={16} aria-hidden="true" /> Descargar esta pieza de
          muestra
        </a>
        <div className="campaign-caption" aria-live="polite">
          <span>TEXTO PARA ACOMPAÑAR LA PIEZA</span>
          <p>{concept.caption}</p>
        </div>
        <dl className="campaign-plan">
          <div>
            <dt>Por qué este mensaje</dt>
            <dd>{concept.reason}</dd>
          </div>
          <div>
            <dt>Qué mediría</dt>
            <dd>{concept.measure}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

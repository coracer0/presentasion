import { useState } from "react";
import { Check, Copy, ExternalLink, RotateCcw } from "lucide-react";
import { OverlayGraphics } from "../components/Scene";
import { createOverlayUrl, defaultOverlay } from "../lib/overlay";
import type { OverlayConfig, Scene } from "../lib/overlay.types";

const sceneNames: Record<Scene, string> = {
  intro: "Apertura",
  interview: "Entrevista",
  break: "Pausa",
  callout: "Cierre",
};

function Field({
  label,
  value,
  onChange,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
}) {
  return (
    <label className="demo-field">
      <span>{label}</span>
      <input
        value={value}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function PodcastDemo() {
  const [config, setConfig] = useState<OverlayConfig>(defaultOverlay);
  const [copied, setCopied] = useState(false);
  const baseUrl = new URL(
    import.meta.env.BASE_URL,
    window.location.href,
  ).toString();
  const url = createOverlayUrl(config, baseUrl);
  const change = (field: keyof OverlayConfig, value: string) =>
    setConfig((current) => ({ ...current, [field]: value }));

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
      document.getElementById("overlay-url")?.focus();
    }
  }

  return (
    <div className="demo-layout podcast-layout">
      <div className="demo-controls">
        <p className="demo-kicker">01 / CONTROL DE ESCENA</p>
        <h3>Diseña el directo en segundos.</h3>
        <p className="demo-hint">
          Prueba cuatro escenas, edita los rótulos y genera una URL para agregar
          como Browser Source en OBS. Los cambios en OBS requieren actualizar la
          fuente.
        </p>
        <div className="scene-switch" aria-label="Escena">
          <span>ESCENA</span>
          <div>
            {(Object.keys(sceneNames) as Scene[]).map((scene) => (
              <button
                key={scene}
                type="button"
                aria-pressed={config.scene === scene}
                onClick={() => change("scene", scene)}
              >
                {sceneNames[scene]}
              </button>
            ))}
          </div>
        </div>
        <div className="demo-field-grid">
          <Field
            label="Nombre del programa"
            value={config.title}
            maxLength={48}
            onChange={(value) => change("title", value)}
          />
          <Field
            label="Conduce"
            value={config.host}
            maxLength={28}
            onChange={(value) => change("host", value)}
          />
          <Field
            label="Invitado/a"
            value={config.guest}
            maxLength={28}
            onChange={(value) => change("guest", value)}
          />
          <label className="demo-field color-field">
            <span>Color de marca</span>
            <input
              type="color"
              value={config.accent}
              onChange={(event) => change("accent", event.target.value)}
            />
          </label>
        </div>
        <label className="demo-field url-field">
          <span>URL para OBS · 1920 × 1080</span>
          <input
            id="overlay-url"
            value={url}
            readOnly
            onFocus={(event) => event.target.select()}
          />
        </label>
        <div className="demo-actions">
          <button className="action-primary" type="button" onClick={copyUrl}>
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? "URL copiada" : "Copiar URL"}
          </button>
          <a
            className="action-quiet"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} /> Abrir overlay
          </a>
          <button
            className="action-quiet"
            type="button"
            onClick={() => {
              setConfig(defaultOverlay);
              setCopied(false);
            }}
          >
            <RotateCcw size={16} /> Reiniciar
          </button>
        </div>
      </div>
      <div className="demo-stage">
        <div className="stage-meta">
          <span>PREVISUALIZACIÓN</span>
          <span>16:9 · DATOS DE EJEMPLO</span>
        </div>
        <OverlayGraphics config={config} />
        <p>
          La página de overlay usa fondo transparente para colocarse sobre la
          imagen o cámaras en OBS.
        </p>
      </div>
    </div>
  );
}

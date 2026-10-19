import type { CSSProperties } from "react";
import type { SceneProps } from "./scene.types";

function StageBackground({ config }: SceneProps) {
  return (
    <div className="stage-background" aria-hidden="true">
      <div className="stage-glow" />
      {config.scene === "interview" ? (
        <div className="stage-cameras">
          <div className="stage-camera">
            CAM 01<span>HOST</span>
          </div>
          <div className="stage-camera alt">
            CAM 02<span>INVITADO</span>
          </div>
        </div>
      ) : (
        <div className="stage-symbol">
          <span>LIVE</span>
          <strong>
            AC<span>.</span>
          </strong>
        </div>
      )}
    </div>
  );
}

export function OverlayGraphics({ config, mode = "preview" }: SceneProps) {
  const style = { "--scene-accent": config.accent } as CSSProperties;
  return (
    <div
      className={`scene-canvas scene-${config.scene} ${mode === "overlay" ? "scene-overlay" : ""}`}
      style={style}
    >
      {mode === "preview" && <StageBackground config={config} />}
      <div className="scene-topline">
        <span className="live-pip" /> EN VIVO <span className="scene-divider" />{" "}
        {config.title}
      </div>
      {config.scene === "intro" && (
        <div className="scene-center">
          <span>UN PODCAST ORIGINAL</span>
          <h2>{config.title}</h2>
          <p>Conversaciones que dejan huella.</p>
        </div>
      )}
      {config.scene === "interview" && (
        <div className="scene-lower-thirds">
          <div>
            <small>CONDUCE</small>
            <strong>{config.host}</strong>
          </div>
          <div>
            <small>INVITADO/A</small>
            <strong>{config.guest}</strong>
          </div>
        </div>
      )}
      {config.scene === "break" && (
        <div className="scene-center">
          <span>PAUSA BREVE</span>
          <h2>Volvemos enseguida</h2>
          <p>{config.title}</p>
        </div>
      )}
      {config.scene === "callout" && (
        <div className="scene-center">
          <span>FORMA PARTE DE LA CONVERSACIÓN</span>
          <h2>Síguenos en vivo</h2>
          <p>{config.title}</p>
        </div>
      )}
      <div className="scene-corner">
        AC<span>.</span> / STUDIO
      </div>
    </div>
  );
}

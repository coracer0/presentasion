import { Component } from "react";
import type { DemoErrorProps, DemoErrorState } from "./demo-error.types";

export class DemoErrorBoundary extends Component<
  DemoErrorProps,
  DemoErrorState
> {
  state: DemoErrorState = { failed: false };

  static getDerivedStateFromError(): DemoErrorState {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="demo-error" role="alert">
        <strong>No pudimos abrir esta demo.</strong>
        <p>
          Las demás secciones siguen disponibles. Recarga la página para
          intentarlo otra vez.
        </p>
        <button type="button" onClick={() => window.location.reload()}>
          Recargar y reintentar
        </button>
      </div>
    );
  }
}

import { useState } from "react";
import { BellRing, RotateCcw, TrendingDown } from "lucide-react";
import { initialPrices, priceDrop, shouldAlert } from "../lib/demos";
import type { PriceSample } from "../lib/demos.types";

const money = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export function PricesDemo() {
  const [prices, setPrices] = useState<readonly PriceSample[]>(initialPrices);
  const [threshold, setThreshold] = useState(100);
  const alerts = prices.filter((sample) => shouldAlert(sample, threshold));

  function simulate() {
    setPrices((current) =>
      current.map((sample) =>
        sample.id === "camera" ? { ...sample, current: 1120 } : sample,
      ),
    );
  }

  return (
    <div className="demo-layout prices-layout">
      <div className="demo-controls">
        <p className="demo-kicker">03 / MONITOREO DE PRECIOS</p>
        <h3>Detecta el cambio que importa.</h3>
        <p className="demo-hint">
          Los precios son ficticios. Elige cuánto debe bajar el precio y simula
          un cambio para ver el aviso. No consultamos tiendas externas.
        </p>
        <label className="demo-field">
          <span>Avisar cuando la baja sea de al menos (MXN)</span>
          <input
            type="number"
            min="1"
            max="10000"
            value={threshold}
            onChange={(event) => setThreshold(Number(event.target.value))}
          />
        </label>
        <div className="demo-actions">
          <button className="action-primary" type="button" onClick={simulate}>
            <TrendingDown size={17} /> Simular baja
          </button>
          <button
            className="action-quiet"
            type="button"
            onClick={() => {
              setPrices(initialPrices);
              setThreshold(100);
            }}
          >
            <RotateCcw size={16} /> Reiniciar
          </button>
        </div>
      </div>
      <div className="price-board">
        <div className="board-top">
          <span>PRODUCTOS OBSERVADOS</span>
          <span>DATOS DE EJEMPLO</span>
        </div>
        {prices.map((sample) => (
          <div className="price-row" key={sample.id}>
            <div>
              <span className="product-icon">{sample.name.slice(0, 1)}</span>
              <strong>{sample.name}</strong>
            </div>
            <div className="price-values">
              <small>Antes {money(sample.previous)}</small>
              <strong>{money(sample.current)}</strong>
            </div>
            <span
              className={`price-delta ${priceDrop(sample) > 0 ? "drop" : ""}`}
            >
              {priceDrop(sample) > 0
                ? `−${money(priceDrop(sample))}`
                : "Sin cambio"}
            </span>
          </div>
        ))}
        <div
          className={`alert-preview ${alerts.length ? "visible" : ""}`}
          role="status"
        >
          {alerts.length ? (
            <>
              <BellRing size={20} />
              <div>
                <strong>Alerta preparada</strong>
                <p>
                  {alerts[0].name} bajó {money(priceDrop(alerts[0]))}; supera tu
                  mínimo de {money(threshold)}.
                </p>
              </div>
            </>
          ) : (
            <>
              <BellRing size={20} />
              <div>
                <strong>Sin alertas por ahora</strong>
                <p>Simula una baja o cambia el mínimo para ver el aviso.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

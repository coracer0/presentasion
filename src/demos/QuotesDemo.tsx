import { useState, type FormEvent } from "react";
import { Calculator } from "lucide-react";
import { createPrintQuote, printProducts } from "../lib/local-business";
import type { PrintQuote } from "../lib/demos.types";

const formatMoney = (cents: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);

export function QuotesDemo() {
  const [productId, setProductId] = useState("flyers");
  const [quantity, setQuantity] = useState("100");
  const [urgent, setUrgent] = useState(false);
  const [quote, setQuote] = useState<PrintQuote | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = createPrintQuote(productId, Number(quantity), urgent);
    setQuote(next);
    setError(next ? "" : "Elige un producto y una cantidad entre 25 y 1000.");
  }

  function resetQuote() {
    setQuote(null);
    setError("");
  }

  return (
    <div className="demo-layout local-demo-layout">
      <div className="demo-controls">
        <p className="demo-kicker">COTIZACIÓN DE MUESTRA</p>
        <h3>Un precio claro, sin hacer cuentas a mano.</h3>
        <p className="demo-hint">
          Elige opciones para una imprenta ficticia y genera un presupuesto de
          ejemplo. Estos precios no son una oferta comercial.
        </p>
        <form className="quote-form" onSubmit={submit} noValidate>
          <label className="demo-field">
            <span>PRODUCTO</span>
            <select
              value={productId}
              onChange={(event) => {
                setProductId(event.target.value);
                resetQuote();
              }}
            >
              {printProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label className="demo-field">
            <span>CANTIDAD, DE 25 A 1000</span>
            <input
              type="number"
              min="25"
              max="1000"
              step="1"
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
                resetQuote();
              }}
            />
          </label>
          <label className="quote-urgent">
            <input
              type="checkbox"
              checked={urgent}
              onChange={(event) => {
                setUrgent(event.target.checked);
                resetQuote();
              }}
            />
            Lo necesito con prioridad (+20% de muestra)
          </label>
          {error && (
            <p className="quote-error" role="alert">
              {error}
            </p>
          )}
          <button className="action-primary" type="submit">
            <Calculator size={17} /> Calcular presupuesto
          </button>
        </form>
      </div>
      <div className="local-demo-stage">
        <div className="quote-sheet" aria-live="polite">
          <div className="quote-sheet-top">
            <span>IMPRENTA LOMA</span>
            <span>PRESUPUESTO FICTICIO</span>
          </div>
          <div className="quote-sheet-icon">
            <Calculator size={30} />
          </div>
          {quote ? (
            <>
              <h4>Así se forma el total.</h4>
              <dl>
                <div>
                  <dt>Producto</dt>
                  <dd>{quote.product.name}</dd>
                </div>
                <div>
                  <dt>Cantidad</dt>
                  <dd>{quote.quantity}</dd>
                </div>
                <div>
                  <dt>
                    {quote.quantity} ×{" "}
                    {formatMoney(quote.product.unitPriceCents)}
                  </dt>
                  <dd>
                    {formatMoney(quote.quantity * quote.product.unitPriceCents)}
                  </dd>
                </div>
                <div>
                  <dt>Preparación</dt>
                  <dd>{formatMoney(quote.product.setupPriceCents)}</dd>
                </div>
                {quote.urgent && (
                  <div>
                    <dt>Prioridad (+20%)</dt>
                    <dd>
                      {formatMoney(
                        quote.totalCents -
                          quote.product.setupPriceCents -
                          quote.quantity * quote.product.unitPriceCents,
                      )}
                    </dd>
                  </div>
                )}
              </dl>
              <p className="quote-total">
                <span>Total de muestra</span>
                <strong>{formatMoney(quote.totalCents)}</strong>
              </p>
              <p className="quote-fineprint">
                Faltaría confirmar materiales, impuestos, entrega y vigencia con
                el negocio.
              </p>
            </>
          ) : (
            <div className="quote-empty">
              <h4>Tu presupuesto aparecerá aquí.</h4>
              <p>El total mostrará de dónde sale cada cantidad.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Check, Plus, RotateCcw, ShoppingBag } from "lucide-react";
import { addToCart, cartTotal, menuItems } from "../lib/demos";
import type { Cart } from "../lib/demos.types";

const money = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export function RestaurantDemo() {
  const [cart, setCart] = useState<Cart>({});
  const [confirmed, setConfirmed] = useState(false);
  const count = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  function reset() {
    setCart({});
    setConfirmed(false);
  }

  return (
    <div className="demo-layout restaurant-layout">
      <div className="demo-controls">
        <p className="demo-kicker">04 / LANDING DE COMERCIO</p>
        <h3>Del antojo al pedido, sin fricción.</h3>
        <p className="demo-hint">
          Menú y compra simulados con datos ficticios. Añade productos y
          confirma para ver el resumen; no se procesa pago ni se envía un
          pedido.
        </p>
        <div className="demo-side-note">
          <ShoppingBag size={22} />
          <span>
            Un proyecto real puede integrar inventario, horarios, pagos y
            recepción de órdenes según la operación del restaurante.
          </span>
        </div>
        <div className="demo-actions">
          <button className="action-quiet" type="button" onClick={reset}>
            <RotateCcw size={16} /> Reiniciar demo
          </button>
        </div>
      </div>
      <div className="restaurant-board">
        <div className="restaurant-hero">
          <span>CASA BRASA · MENÚ DE MUESTRA</span>
          <h3>
            Hecho para
            <br />
            disfrutarse.
          </h3>
          <p>Una experiencia visual que lleva directo a la acción.</p>
        </div>
        <div className="menu-list">
          {menuItems.map((item) => (
            <div className="menu-row" key={item.id}>
              <span className={`food-art food-${item.id}`} aria-hidden="true" />
              <div>
                <strong>{item.name}</strong>
                <small>{item.note}</small>
              </div>
              <span>{money(item.price)}</span>
              <button
                type="button"
                aria-label={`Agregar ${item.name}`}
                onClick={() => {
                  setCart((current) => addToCart(current, item.id));
                  setConfirmed(false);
                }}
              >
                <Plus size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary" role="status">
          <div>
            <strong>
              {count} {count === 1 ? "producto" : "productos"}
            </strong>
            <span>Total {money(cartTotal(cart))}</span>
          </div>
          <button
            type="button"
            disabled={count === 0 || confirmed}
            onClick={() => setConfirmed(true)}
          >
            {confirmed ? (
              <>
                <Check size={17} /> Pedido de ejemplo confirmado
              </>
            ) : (
              "Ver resumen del pedido"
            )}
          </button>
        </div>
        {confirmed && (
          <p className="order-confirmation">
            Resumen de muestra:{" "}
            {menuItems
              .filter((item) => cart[item.id])
              .map((item) => `${cart[item.id]} × ${item.name}`)
              .join(", ")}
            .
          </p>
        )}
      </div>
    </div>
  );
}

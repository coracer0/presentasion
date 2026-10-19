const steps = [
  [
    "01",
    "Entendemos el reto",
    "Escucho cómo opera tu negocio y dónde se pierde tiempo o claridad.",
  ],
  [
    "02",
    "Diseñamos la experiencia",
    "Acordamos qué necesita la primera versión y cómo la usarán tus clientes.",
  ],
  [
    "03",
    "Construimos y probamos",
    "Construyo una primera versión y probamos juntos los pasos más importantes.",
  ],
  [
    "04",
    "Medimos y mejoramos",
    "Después de publicar, revisamos qué funciona y qué conviene mejorar.",
  ],
] as const;

export function Process() {
  return (
    <section id="proceso" className="process-section" tabIndex={-1}>
      <div className="section-shell">
        <div className="section-intro">
          <div>
            <span className="eyebrow">03 / FORMA DE TRABAJAR</span>
            <h2>
              Empezamos por entender
              <br />
              <em>tu problema.</em>
            </h2>
          </div>
          <p>
            Cada proyecto empieza por una necesidad concreta. La tecnología
            entra donde ayuda a resolverla.
          </p>
        </div>
        <div className="process-grid">
          {steps.map(([number, title, description]) => (
            <div className="process-step" key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

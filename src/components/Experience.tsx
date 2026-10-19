export function Experience() {
  return (
    <section className="section-shell experience-section">
      <div className="experience-photo">
        <img
          src={`${import.meta.env.BASE_URL}profile.webp`}
          width="520"
          height="520"
          alt="Axel Coracero"
        />
        <span>AC / EN PERSONA</span>
      </div>
      <div className="experience-copy">
        <span className="eyebrow">04 / DETRÁS DEL CÓDIGO</span>
        <h2>
          Ideas grandes.
          <br />
          <em>Trabajo cercano.</em>
        </h2>
        <p>
          Soy Axel Coracero, desarrollador independiente. He aplicado
          automatizaciones en un proyecto profesional privado que no puedo
          mostrar por confidencialidad. Por eso construí estas demos públicas:
          para enseñar mi forma de pensar sin revelar trabajo ajeno.
        </p>
        <p>
          Trabajo con negocios que necesitan algo más que una pantalla bonita:
          procesos más ágiles, software entendible y experiencias digitales que
          la gente quiera usar.
        </p>
        <div className="experience-note">
          <span>LO QUE VES AQUÍ</span>
          <strong>
            Prototipos propios, ejemplos ficticios y una conversación abierta
            sobre tu siguiente proyecto.
          </strong>
        </div>
      </div>
    </section>
  );
}

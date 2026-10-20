export function Experience() {
  return (
    <section
      id="sobre-mi"
      className="section-shell experience-section"
      tabIndex={-1}
    >
      <div className="experience-photo">
        <img
          src={`${import.meta.env.BASE_URL}profile.webp`}
          width="520"
          height="520"
          alt="Axel Coracero"
        />
        <span>AXEL / EN PERSONA</span>
      </div>
      <div className="experience-copy">
        <span className="eyebrow">01 / QUIÉN ESTÁ DETRÁS</span>
        <h2>
          Soy Axel.
          <br />
          <em>Trabajo contigo.</em>
        </h2>
        <p className="experience-lead">
          Mi nombre completo es Osmar Axel Coracero Godínez, pero puedes decirme
          Axel. Soy ingeniero en Desarrollo y Gestión de Software. Creo que
          todas las personas y negocios merecen software útil y de calidad sin
          tener que gastar una fortuna. Por eso empiezo por el problema que más
          pesa y propongo un alcance claro para su presupuesto.
        </p>
        <p>
          Me importa la confianza: escuchar bien, respetar los acuerdos y
          construir algo que sirva en el día a día. Pongo cuidado en los
          detalles y cariño en cada entrega.
        </p>
        <ul className="experience-values">
          <li>
            <strong>Acuerdos claros</strong>
            <span>Sabes qué vamos a hacer y qué incluye.</span>
          </li>
          <li>
            <strong>Calidad útil</strong>
            <span>Pruebo los pasos que importan a tu negocio.</span>
          </li>
          <li>
            <strong>Trato cercano</strong>
            <span>Hablamos sin tecnicismos innecesarios.</span>
          </li>
        </ul>
        <div className="experience-note">
          <span>MI RECORRIDO</span>
          <div>
            <p>
              Durante tres años y medio mantuve, corregí y amplié módulos de un
              sistema interno universitario, incluidos procesos de contabilidad,
              alumnos, calificaciones y calidad.
            </p>
            <p>
              También he creado bots de WhatsApp y sitios para negocios locales,
              una página para una empresa de software del sector aéreo y realicé
              cuatro meses de prácticas en seguridad y pruebas de un sistema
              bancario.
            </p>
          </div>
        </div>
        <p className="experience-personal">
          Vivo con una discapacidad psicomotora; a veces necesito un momento más
          para encontrar las palabras. Me gusta trabajar con calma, dejar
          acuerdos claros y poner mucho cariño en lo que construyo.
        </p>
        <p>
          En mis ratos libres disfruto los videojuegos. Me gusta descubrir cómo
          una buena experiencia puede hacer que algo complejo se sienta fácil.
        </p>
        <p className="experience-disclosure">
          Los trabajos de terceros tienen sus propios derechos. Las demos que
          ves aquí usan marcas y datos ficticios para mostrar cómo abordo
          problemas cotidianos.
        </p>
      </div>
    </section>
  );
}

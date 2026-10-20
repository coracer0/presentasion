import type { WebsiteType, WebsiteTypeGroup } from "./website-types.types";

export const websiteTypeGroups: readonly {
  id: WebsiteTypeGroup;
  title: string;
}[] = [
  { id: "showcase", title: "Para mostrarte" },
  { id: "commerce", title: "Para promocionar o vender" },
  { id: "operations", title: "Para trabajar mejor" },
];

export const websiteTypes: readonly WebsiteType[] = [
  {
    id: "digital-card",
    name: "Tarjeta digital",
    description:
      "Reúne tus datos, servicios y formas de contacto en un solo enlace fácil de compartir.",
    group: "showcase",
    featured: true,
  },
  {
    id: "service-page",
    name: "Página de un servicio",
    description:
      "Explica lo que ofreces y ayuda a que te escriban con una idea clara.",
    group: "showcase",
    featured: false,
  },
  {
    id: "business-site",
    name: "Sitio de negocio",
    description:
      "Presenta tu negocio, horarios, ubicación y servicios en un mismo lugar.",
    group: "showcase",
    featured: true,
  },
  {
    id: "portfolio",
    name: "Portafolio",
    description:
      "Muestra tu trabajo y tu forma de resolver problemas a posibles clientes.",
    group: "showcase",
    featured: false,
  },
  {
    id: "blog",
    name: "Blog",
    description:
      "Comparte consejos, novedades o historias que tu público quiera leer.",
    group: "showcase",
    featured: false,
  },
  {
    id: "digital-menu",
    name: "Menú digital",
    description:
      "Deja que tus clientes consulten platillos, fotos y precios desde su celular.",
    group: "commerce",
    featured: false,
  },
  {
    id: "product-catalog",
    name: "Catálogo de productos",
    description:
      "Organiza lo que vendes para que sea sencillo encontrarlo y preguntarte por ello.",
    group: "commerce",
    featured: true,
  },
  {
    id: "directory",
    name: "Directorio",
    description:
      "Agrupa negocios, personas o servicios y facilita encontrarlos por categoría.",
    group: "commerce",
    featured: false,
  },
  {
    id: "event-page",
    name: "Página de evento",
    description:
      "Cuenta de qué trata un evento, cuándo será y cómo pedir información.",
    group: "commerce",
    featured: false,
  },
  {
    id: "online-store",
    name: "Tienda en línea",
    description:
      "Presenta productos y arma un recorrido de compra acorde con tu negocio.",
    group: "commerce",
    featured: true,
  },
  {
    id: "bookings",
    name: "Reservas",
    description:
      "Ordena las solicitudes de horario y evita ir y venir entre mensajes.",
    group: "operations",
    featured: true,
    demoId: "appointments",
  },
  {
    id: "orders",
    name: "Pedidos",
    description:
      "Ayuda a elegir productos y revisar un pedido antes de enviarlo.",
    group: "operations",
    featured: false,
    demoId: "restaurant",
  },
  {
    id: "estimator",
    name: "Cotizador",
    description:
      "Da una estimación orientativa a partir de las opciones que elija tu cliente.",
    group: "operations",
    featured: true,
    demoId: "quotes",
  },
  {
    id: "client-portal",
    name: "Portal de clientes",
    description:
      "Reúne consultas y gestiones frecuentes en una herramienta diseñada contigo.",
    group: "operations",
    featured: false,
  },
  {
    id: "internal-dashboard",
    name: "Panel interno",
    description:
      "Organiza tareas e información del equipo en una vista hecha para su trabajo.",
    group: "operations",
    featured: false,
  },
];

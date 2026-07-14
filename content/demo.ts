import type {
  Locale,
  MenuDocument,
  PageDocument,
  SiteSettings,
  SpaceSummary,
} from "@/types/content";

const office: SpaceSummary = {
  _id: "demo-space-office",
  title: "Despachos privados",
  slug: "despachos",
  kind: "privateOffice",
  summary:
    "Despachos amueblados, luminosos y con llave, listos para trabajar desde el primer día.",
  image: "/images/office-interior.jpg",
  imageAlt: "Despacho privado de Las Palmas Business Center",
};

const meetingRoom: SpaceSummary = {
  _id: "demo-space-meeting",
  title: "Salas de reuniones",
  slug: "salas-de-reuniones",
  kind: "meetingRoom",
  summary:
    "Salas equipadas para reuniones, entrevistas, presentaciones y sesiones de equipo.",
  image: "/images/meeting-room.jpg",
  imageAlt: "Sala de reuniones de Las Palmas Business Center",
};

const coworking: SpaceSummary = {
  _id: "demo-space-coworking",
  title: "Coworking",
  slug: "coworking",
  kind: "coworking",
  summary:
    "Puestos flexibles en un entorno profesional, tranquilo y conectado.",
  image: "/images/office-interior.jpg",
  imageAlt: "Espacio de trabajo compartido",
};

const virtualOffice: SpaceSummary = {
  _id: "demo-space-virtual",
  title: "Oficina virtual",
  slug: "oficina-virtual",
  kind: "virtualOffice",
  summary:
    "Domiciliación, correspondencia y atención profesional sin una oficina permanente.",
  image: "/images/hero-building.jpg",
  imageAlt: "Fachada del centro de negocios en Vegueta",
};

const esHome: PageDocument = {
  _id: "demo-home-es",
  title: "Inicio",
  slug: "home",
  language: "es",
  isHomepage: true,
  navbarVariant: "light",
  metadata: {
    title: "Las Palmas Business Center | Despachos en Vegueta",
    description:
      "Despachos privados, salas de reuniones, coworking y oficina virtual en un edificio singular de Vegueta.",
    image: "/images/hero-building.jpg",
  },
  content: [
    {
      _key: "hero",
      _type: "heroBlock",
      brand: "Las Palmas Business Center",
      headline: "Tu espacio profesional en el corazón de Vegueta.",
      summary:
        "Despachos privados y salas de reunión en un edificio singular, con todo preparado para empezar a trabajar.",
      image: "/images/hero-building.jpg",
      imageAlt: "Interior de Las Palmas Business Center",
      primaryCta: { label: "Reservar una visita", href: "/es/contacto" },
      secondaryCta: { label: "Explorar espacios", href: "#spaces" },
    },
    {
      _key: "intro",
      _type: "introBlock",
      eyebrow: "El centro",
      headline:
        "Un edificio histórico actualizado para una forma de trabajar más sencilla.",
      body:
        "Las Palmas Business Center combina privacidad, servicio y una atmósfera cálida en el casco histórico de la ciudad. Tú eliges el espacio; nosotros nos ocupamos del resto.",
    },
    {
      _key: "spaces",
      _type: "spaceListBlock",
      eyebrow: "Espacios y servicios",
      headline: "Elige cómo quieres trabajar.",
      intro:
        "Una estructura preparada para profesionales, equipos, reuniones y empresas que necesitan presencia en Las Palmas.",
      spaces: [office, meetingRoom, coworking, virtualOffice],
    },
    {
      _key: "included",
      _type: "featureListBlock",
      eyebrow: "Todo incluido",
      headline: "Llegar, abrir el portátil y empezar.",
      intro:
        "Sin obras, altas de suministros ni coordinación de proveedores.",
      items: [
        { _key: "reception", title: "Recepción", text: "Atención de visitas, llamadas y correspondencia." },
        { _key: "connectivity", title: "Conectividad", text: "Internet en despachos, salas y zonas comunes." },
        { _key: "comfort", title: "Confort", text: "Climatización, limpieza, mantenimiento y office." },
        { _key: "security", title: "Seguridad", text: "Acceso controlado, alarma y cámaras de seguridad." },
      ],
    },
    {
      _key: "building",
      _type: "splitContentBlock",
      eyebrow: "Vegueta",
      headline: "Una ubicación que también forma parte de tu imagen.",
      body:
        "Trabaja y recibe a tus clientes en el centro histórico de Las Palmas de Gran Canaria, cerca de aparcamientos y a unos 25 minutos del aeropuerto.",
      image: "/images/meeting-room.jpg",
      imageAlt: "Sala luminosa en Las Palmas Business Center",
      tone: "sand",
      cta: { label: "Conocer el centro", href: "/es/el-centro" },
    },
    {
      _key: "testimonial",
      _type: "testimonialBlock",
      eyebrow: "Quienes trabajan aquí",
      headline: "Un entorno profesional que se siente diferente.",
      testimonials: [
        {
          _id: "demo-testimonial-pedro",
          quote:
            "Excelente ubicación, de fácil acceso y con un entorno profesional excelente; instalaciones muy afines a nuestro modelo de negocio e imagen de firma.",
          name: "Pedro Suárez Jiménez",
          role: "Director Canarias",
          company: "Icapital",
        },
      ],
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: "Ven a verlo",
      headline: "Tu próximo espacio de trabajo puede empezar con una visita.",
      body:
        "Cuéntanos qué necesitas y te mostraremos las opciones disponibles.",
      primaryCta: { label: "Reservar una visita", href: "/es/contacto" },
      secondaryCta: { label: "Llamar al 928 321 651", href: "tel:+34928321651" },
    },
  ],
};

const enHome: PageDocument = {
  ...esHome,
  _id: "demo-home-en",
  title: "Home",
  language: "en",
  metadata: {
    title: "Las Palmas Business Center | Offices in Vegueta",
    description:
      "Private offices, meeting rooms, coworking and virtual-office services in a distinctive Vegueta building.",
    image: "/images/hero-building.jpg",
  },
  content: [
    {
      _key: "hero",
      _type: "heroBlock",
      brand: "Las Palmas Business Center",
      headline: "Your professional space in the heart of Vegueta.",
      summary:
        "Private offices and meeting rooms in a distinctive building, ready for you to start working.",
      image: "/images/hero-building.jpg",
      imageAlt: "Las Palmas Business Center interior",
      primaryCta: { label: "Book a visit", href: "/en/contact" },
      secondaryCta: { label: "Explore spaces", href: "#spaces" },
    },
    {
      _key: "intro",
      _type: "introBlock",
      eyebrow: "The center",
      headline: "A historic building updated for a simpler way of working.",
      body:
        "Las Palmas Business Center combines privacy, service and a warm atmosphere in the historic center. You choose the space; we take care of the rest.",
    },
    {
      _key: "spaces",
      _type: "spaceListBlock",
      eyebrow: "Spaces and services",
      headline: "Choose how you want to work.",
      spaces: [
        { ...office, title: "Private offices", slug: "private-offices", summary: "Furnished, lockable and ready from day one." },
        { ...meetingRoom, title: "Meeting rooms", slug: "meeting-rooms", summary: "Equipped for meetings, interviews and presentations." },
        { ...coworking, title: "Coworking", summary: "Flexible desks in a calm, professional setting." },
        { ...virtualOffice, title: "Virtual office", slug: "virtual-office", summary: "A professional Las Palmas address and business support." },
      ],
    },
    {
      _key: "included",
      _type: "featureListBlock",
      eyebrow: "Included",
      headline: "Arrive, open your laptop and begin.",
      items: [
        { _key: "reception", title: "Reception", text: "Visitors, calls and correspondence." },
        { _key: "connectivity", title: "Connectivity", text: "Internet throughout the center." },
        { _key: "comfort", title: "Comfort", text: "Climate control, cleaning, maintenance and kitchen." },
        { _key: "security", title: "Security", text: "Controlled access, alarm and cameras." },
      ],
    },
    {
      _key: "building",
      _type: "splitContentBlock",
      eyebrow: "Vegueta",
      headline: "A location that becomes part of your professional image.",
      body:
        "Work and meet clients in the historic center of Las Palmas de Gran Canaria, near parking and around 25 minutes from the airport.",
      image: "/images/meeting-room.jpg",
      imageAlt: "Bright meeting room at Las Palmas Business Center",
      tone: "sand",
      cta: { label: "Discover the center", href: "/en/the-center" },
    },
    {
      _key: "cta",
      _type: "ctaBlock",
      eyebrow: "Come and see it",
      headline: "Your next workspace can begin with a visit.",
      body: "Tell us what you need and we will show you the available options.",
      primaryCta: { label: "Book a visit", href: "/en/contact" },
      secondaryCta: { label: "Call +34 928 321 651", href: "tel:+34928321651" },
    },
  ],
};

function servicePage({
  locale,
  slug,
  title,
  headline,
  summary,
  image,
  imageAlt,
  features,
}: {
  locale: Locale;
  slug: string;
  title: string;
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  features: Array<{ title: string; text: string }>;
}): PageDocument {
  const isSpanish = locale === "es";
  return {
    _id: `demo-${locale}-${slug}`,
    title,
    slug,
    language: locale,
    navbarVariant: "light",
    metadata: { title: `${title} | Las Palmas Business Center`, description: summary, image },
    content: [
      {
        _key: "hero",
        _type: "heroBlock",
        brand: "Las Palmas Business Center",
        headline,
        summary,
        image,
        imageAlt,
        primaryCta: {
          label: isSpanish ? "Consultar disponibilidad" : "Check availability",
          href: `/${locale}/${isSpanish ? "contacto" : "contact"}`,
        },
      },
      {
        _key: "features",
        _type: "featureListBlock",
        eyebrow: isSpanish ? "Qué incluye" : "What is included",
        headline: isSpanish ? "Todo preparado para trabajar." : "Everything ready for work.",
        items: features.map((item, index) => ({ _key: `feature-${index}`, ...item })),
      },
      {
        _key: "cta",
        _type: "ctaBlock",
        eyebrow: isSpanish ? "Siguiente paso" : "Next step",
        headline: isSpanish ? "Ven a conocer el espacio." : "Come and see the space.",
        body: isSpanish
          ? "Te ayudaremos a elegir la opción que mejor se adapte a tu actividad."
          : "We will help you choose the option that best fits your work.",
        primaryCta: {
          label: isSpanish ? "Reservar una visita" : "Book a visit",
          href: `/${locale}/${isSpanish ? "contacto" : "contact"}`,
        },
      },
    ],
  };
}

const esServiceFeatures = [
  { title: "Atención profesional", text: "Recepción de visitas, llamadas y correspondencia." },
  { title: "Servicios incluidos", text: "Internet, suministros, limpieza, mantenimiento y climatización." },
  { title: "Flexibilidad", text: "Opciones adaptadas a la duración y al tipo de uso." },
  { title: "Ubicación", text: "Una dirección profesional en el centro histórico de la ciudad." },
];

const enServiceFeatures = [
  { title: "Professional reception", text: "Visitor, telephone and correspondence handling." },
  { title: "Included services", text: "Internet, utilities, cleaning, maintenance and climate control." },
  { title: "Flexibility", text: "Options adapted to the length and type of use." },
  { title: "Location", text: "A professional address in the historic center." },
];

const demoPages: PageDocument[] = [
  esHome,
  enHome,
  servicePage({ locale: "es", slug: "despachos", title: "Despachos privados", headline: "Un despacho propio, sin empezar de cero.", summary: "Espacios privados, amueblados y listos para trabajar con todos los servicios del centro.", image: "/images/office-interior.jpg", imageAlt: "Despacho privado amueblado", features: esServiceFeatures }),
  servicePage({ locale: "en", slug: "private-offices", title: "Private offices", headline: "Your own office, without starting from zero.", summary: "Private, furnished spaces ready for work with all center services included.", image: "/images/office-interior.jpg", imageAlt: "Furnished private office", features: enServiceFeatures }),
  servicePage({ locale: "es", slug: "salas-de-reuniones", title: "Salas de reuniones", headline: "El entorno adecuado para una buena reunión.", summary: "Salas de distintos tamaños para entrevistas, juntas, presentaciones y sesiones de trabajo.", image: "/images/meeting-room.jpg", imageAlt: "Sala de reuniones equipada", features: esServiceFeatures }),
  servicePage({ locale: "en", slug: "meeting-rooms", title: "Meeting rooms", headline: "The right setting for a productive meeting.", summary: "Rooms for interviews, board meetings, presentations and collaborative sessions.", image: "/images/meeting-room.jpg", imageAlt: "Equipped meeting room", features: enServiceFeatures }),
  servicePage({ locale: "es", slug: "coworking", title: "Coworking", headline: "Flexibilidad con ambiente profesional.", summary: "Puestos compartidos y flexibles para trabajar con comodidad en el centro de Las Palmas.", image: "/images/office-interior.jpg", imageAlt: "Espacio de coworking", features: esServiceFeatures }),
  servicePage({ locale: "en", slug: "coworking", title: "Coworking", headline: "Flexibility in a professional atmosphere.", summary: "Shared and flexible workspaces in central Las Palmas.", image: "/images/office-interior.jpg", imageAlt: "Coworking space", features: enServiceFeatures }),
  servicePage({ locale: "es", slug: "oficina-virtual", title: "Oficina virtual", headline: "Una presencia profesional en Las Palmas.", summary: "Domiciliación, gestión de correspondencia y atención empresarial sin una oficina permanente.", image: "/images/hero-building.jpg", imageAlt: "Edificio de Las Palmas Business Center", features: esServiceFeatures }),
  servicePage({ locale: "en", slug: "virtual-office", title: "Virtual office", headline: "A professional presence in Las Palmas.", summary: "Business address, correspondence and support without a permanent office.", image: "/images/hero-building.jpg", imageAlt: "Las Palmas Business Center building", features: enServiceFeatures }),
  servicePage({ locale: "es", slug: "el-centro", title: "El centro", headline: "Tradición, modernidad y servicio en Vegueta.", summary: "Un edificio singular del casco histórico, completamente actualizado para trabajar y recibir clientes.", image: "/images/hero-building.jpg", imageAlt: "Interior del centro de negocios", features: esServiceFeatures }),
  servicePage({ locale: "en", slug: "the-center", title: "The center", headline: "Tradition, modernity and service in Vegueta.", summary: "A distinctive historic building fully updated for work and client meetings.", image: "/images/hero-building.jpg", imageAlt: "Business center interior", features: enServiceFeatures }),
  servicePage({ locale: "es", slug: "contacto", title: "Contacto", headline: "Hablemos de lo que necesitas.", summary: "Cuéntanos qué espacio buscas y cuándo te gustaría empezar.", image: "/images/meeting-room.jpg", imageAlt: "Sala del centro de negocios", features: esServiceFeatures }),
  servicePage({ locale: "en", slug: "contact", title: "Contact", headline: "Tell us what you need.", summary: "Let us know which space you need and when you would like to begin.", image: "/images/meeting-room.jpg", imageAlt: "Business center meeting room", features: enServiceFeatures }),
];

const settings: SiteSettings = {
  _id: "demo-site-settings",
  brandName: "Las Palmas Business Center",
  shortName: "LPBC",
  description:
    "Despachos, salas de reuniones y servicios empresariales en Vegueta.",
  address: "C/ Agustín Millares 18, 35001 Las Palmas de Gran Canaria, España",
  phone: ["+34 928 321 651", "+34 928 316 232"],
  email: ["direccion@laspalmasbusiness.center"],
  receptionHours: "Pendiente de confirmar",
  accessHours: "Acceso 365 días al año",
  defaultMetadata: {
    title: "Las Palmas Business Center",
    description:
      "Espacios de trabajo y servicios empresariales en Vegueta, Las Palmas de Gran Canaria.",
    image: "/images/hero-building.jpg",
  },
};

const menus: Record<Locale, MenuDocument> = {
  es: {
    _id: "demo-menu-es",
    language: "es",
    items: [
      { _key: "spaces", label: "Espacios", href: "/es/despachos" },
      { _key: "virtual", label: "Oficina virtual", href: "/es/oficina-virtual" },
      { _key: "center", label: "El centro", href: "/es/el-centro" },
      { _key: "contact", label: "Contacto", href: "/es/contacto" },
    ],
    cta: { label: "Reservar una visita", href: "/es/contacto" },
  },
  en: {
    _id: "demo-menu-en",
    language: "en",
    items: [
      { _key: "spaces", label: "Spaces", href: "/en/private-offices" },
      { _key: "virtual", label: "Virtual office", href: "/en/virtual-office" },
      { _key: "center", label: "The center", href: "/en/the-center" },
      { _key: "contact", label: "Contact", href: "/en/contact" },
    ],
    cta: { label: "Book a visit", href: "/en/contact" },
  },
};

export function getDemoHome(locale: Locale): PageDocument {
  return locale === "en" ? enHome : esHome;
}

export function getDemoPage(slug: string, locale: Locale): PageDocument | null {
  return demoPages.find((page) => page.language === locale && page.slug === slug) ?? null;
}

export function getDemoShell(locale: Locale) {
  return { settings, menu: menus[locale] };
}

export function getDemoPageSlugs(locale: Locale) {
  return demoPages
    .filter((page) => page.language === locale && !page.isHomepage)
    .map((page) => page.slug);
}

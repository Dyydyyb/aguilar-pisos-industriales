/**
 * Fuente única de datos para Aguilar Pisos Industriales.
 * Reemplazá las rutas en `projectsData` por tus fotografías reales en `/public/images/`.
 */

export const BUSINESS_INFO = {
  name: 'Aguilar Pisos Industriales',
  shortName: 'AGUILAR',
  tagline: 'Pisos Industriales',
  location: 'Buenos Aires, Zona Sur',
  coverage: 'Buenos Aires, Zona Sur (AMBA y alrededores)',
  commercialHook: 'Cotizaciones y consultas 100% sin cargo',
  phoneDisplay: '+54 9 11 5889-0608',
  phoneHref: 'tel:+5491158890608',
  whatsappNumber: '5491158890608',
  whatsappBaseUrl: 'https://wa.me/5491158890608',
  instagramHandle: '@aguilar.pisos.industriales',
  instagramUrl: 'https://www.instagram.com/aguilar.pisos.industriales/',
};

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Cotizador', href: '#cotizador' },
  { label: 'Contacto', href: '#contacto' },
];

export const HERO_INDICATORS = [
  {
    id: 'maquinaria',
    title: 'Maquinaria de Llaneado Doble',
    detail: 'Allanadoras simples y dobles tripuladas propias',
    icon: 'cog',
  },
  {
    id: 'obra-civil',
    title: 'Obra Civil y Arquitectura',
    detail: 'Dirección técnica, plateas y naves llave en mano',
    icon: 'building',
  },
  {
    id: 'presupuesto',
    title: 'Presupuesto Sin Cargo',
    detail: 'Relevamiento y asesoramiento técnico en Zona Sur y AMBA',
    icon: 'clipboard',
  },
];

/**
 * Opciones del Filtro Inteligente de WhatsApp
 */
export const WHATSAPP_SERVICE_OPTIONS = [
  'Piso Industrial / Galpón',
  'Entrada / Playón Vehicular',
  'Arquitectura y Construcción',
  'Otro / Asesoramiento',
];

export const WHATSAPP_AREA_OPTIONS = [
  'Menos de 100 m²',
  '100 a 500 m²',
  '500 a 1.500 m²',
  'Más de 1.500 m²',
  'No lo sé aún',
];

/**
 * Catálogo de servicios dividido en dos divisiones técnicas.
 * Cada servicio declara `filterCategory` para sincronizarse automáticamente con WhatsAppFilter.
 */
export const SERVICE_DIVISIONS = [
  {
    id: 'pisos',
    label: 'Pisos Industriales',
    summary:
      'Ejecución mecanizada de pavimentos de hormigón de alta resistencia superficial y estructural para exigencia intensiva.',
    items: [
      {
        id: 'llaneado-mecanico',
        title: 'Hormigón llaneado mecánico',
        description:
          'Terminación monolítica de alta planimetría ejecutada con allanadoras simples y dobles tripuladas para lograr máxima densidad superficial.',
        specs: ['Allanadoras dobles', 'Alta planimetría', 'Sin desprendimiento de polvo'],
        filterCategory: 'Piso Industrial / Galpón',
        icon: 'disc',
      },
      {
        id: 'galpones-depositos',
        title: 'Pisos para galpones, depósitos y naves logísticas',
        description:
          'Losas estructurales diseñadas para soportar estanterías de gran porte, tránsito permanente de autoelevadores y cargas concentradas.',
        specs: ['Hormigón H-25 / H-30', 'Malla estructural', 'Tránsito pesado'],
        filterCategory: 'Piso Industrial / Galpón',
        icon: 'warehouse',
      },
      {
        id: 'playones-rampas',
        title: 'Playones de maniobras, rampas y entradas vehiculares',
        description:
          'Pavimentos rígidos exteriores con terminación antideslizante o peinada para dársenas de carga, camiones y accesos de alto tránsito.',
        specs: ['Pendientes pluviales', 'Terminación antideslizante', 'Alto tránsito'],
        filterCategory: 'Entrada / Playón Vehicular',
        icon: 'truck',
      },
      {
        id: 'endurecedores-juntas',
        title: 'Endurecedores superficiales, corte y sellado de juntas',
        description:
          'Aplicación en fresco de cuarzo o corindón para resistencia a la abrasión, aserrado mecánico de contracción y sellado elástico técnico.',
        specs: ['Cuarzo / Corindón', 'Aserrado preciso', 'Sellado poliuretánico'],
        filterCategory: 'Piso Industrial / Galpón',
        icon: 'shield',
      },
    ],
  },
  {
    id: 'arquitectura',
    label: 'Arquitectura y Construcción',
    summary:
      'Planificación técnica, dirección profesional y ejecución llave en mano de infraestructura industrial, comercial y civil.',
    items: [
      {
        id: 'proyecto-direccion',
        title: 'Proyecto, dirección y ejecución de obra',
        description:
          'Desarrollo de documentación técnica, cómputos, planificación de etapas y conducción integral en obra con seguimiento permanente.',
        specs: ['Dirección técnica', 'Cómputo y presupuesto', 'Control de calidad'],
        filterCategory: 'Arquitectura y Construcción',
        icon: 'compass',
      },
      {
        id: 'naves-llave-en-mano',
        title: 'Construcción de galpones y naves industriales llave en mano',
        description:
          'Ejecución integral desde fundaciones, estructura metálica y cerramientos hasta el piso industrial terminado listo para operar.',
        specs: ['Llave en mano', 'Estructura y pisos', 'Plazos coordinados'],
        filterCategory: 'Arquitectura y Construcción',
        icon: 'factory',
      },
      {
        id: 'movimiento-plateas',
        title: 'Movimiento de suelos, nivelación láser y plateas de fundación',
        description:
          'Preparación de sub-base compactada, aporte de tosca, control altimétrico láser y ejecución de plateas armadas de fundación.',
        specs: ['Nivelación láser', 'Compactación controlada', 'Plateas armadas'],
        filterCategory: 'Arquitectura y Construcción',
        icon: 'layers',
      },
      {
        id: 'remodelaciones-civil',
        title: 'Remodelaciones industriales, muros y obra civil integral',
        description:
          'Ampliaciones, readecuación de plantas en funcionamiento, tabiques de hormigón, muros perimetrales y reformas edilicias completas.',
        specs: ['Muros y tabiques', 'Ampliaciones', 'Obra civil integral'],
        filterCategory: 'Arquitectura y Construcción',
        icon: 'hammer',
      },
    ],
  },
];

/**
 * Datos del Slider de Proyectos Realizados.
 * Imágenes ubicadas en `/public/images/` — reemplazables directamente manteniendo la ruta.
 */
export const projectsData = [
  {
    id: 'llaneado-doble',
    title: 'Llaneado con Allanadora Doble Tripulada',
    category: 'Pisos Industriales',
    location: 'Quilmes, Buenos Aires Zona Sur',
    area: '1.800 m²',
    specHighlight: 'Hormigón H-30 • Endurecedor de cuarzo • Juntas aserradas',
    description:
      'Ejecución de piso industrial monolítico para centro de distribución con nivelación láser y terminación mecánica de alta densidad mediante allanadora doble tripulada.',
    image: '/images/project-llaneado-doble.webp',
    alt: 'Allanadora doble tripulada ejecutando hormigón llaneado mecánico en nave industrial',
    filterCategory: 'Piso Industrial / Galpón',
  },
  {
    id: 'playon-vehicular',
    title: 'Pavimento y Entrada Vehicular de Alto Tránsito',
    category: 'Playones y Accesos',
    location: 'Ezeiza, Buenos Aires',
    area: '950 m²',
    specHighlight: 'Espesor 18 cm • Malla doble • Pendientes pluviales',
    description:
      'Construcción de playón de maniobras y rampa de acceso para tránsito pesado de camiones, con control de pendientes, paños modulares aserrados y cordones de contención.',
    image: '/images/project-playon-vehicular.webp',
    alt: 'Playón exterior de hormigón armado y acceso vehicular industrial con juntas de dilatación',
    filterCategory: 'Entrada / Playón Vehicular',
  },
  {
    id: 'nave-industrial',
    title: 'Nave Industrial en Zona Sur',
    category: 'Arquitectura y Construcción',
    location: 'Florencio Varela, Zona Sur',
    area: '2.400 m²',
    specHighlight: 'Obra integral • Piso llaneado mate • Sellado elastomérico',
    description:
      'Obra civil y terminación de nave logística completa: cerramientos perimetrales, estructura portante y piso industrial de alta planimetría listo para instalación de racks.',
    image: '/images/project-nave-industrial.webp',
    alt: 'Interior de nave industrial terminada con piso de hormigón llaneado mate y estructura metálica',
    filterCategory: 'Arquitectura y Construcción',
  },
  {
    id: 'platea-estructura',
    title: 'Platea de Fundación y Estructura Civil',
    category: 'Obra Civil y Fundaciones',
    location: 'Avellaneda, Buenos Aires',
    area: '1.250 m²',
    specHighlight: 'Compactación de sub-base • Armadura estructural • Nivelación láser',
    description:
      'Movimiento de suelos, preparación de base compactada, armado de doble malla estructural, encofrado perimetral y hormigonado continuo para platea industrial.',
    image: '/images/project-platea-obra-civil.webp',
    alt: 'Armado de malla estructural de acero y colado de hormigón en platea de fundación industrial',
    filterCategory: 'Arquitectura y Construcción',
  },
];

export const FORM_SERVICE_OPTIONS = [
  'Piso Industrial / Hormigón Llaneado',
  'Piso para Galpón o Nave Logística',
  'Playón de Maniobras / Entrada Vehicular',
  'Endurecedores, Corte y Sellado de Juntas',
  'Proyecto y Dirección de Obra',
  'Construcción de Galpón / Nave Llave en Mano',
  'Movimiento de Suelos y Platea de Fundación',
  'Remodelación Industrial / Obra Civil Integral',
  'Otro / Asesoramiento Técnico',
];

/**
 * Construye el texto exacto y la URL codificada para WhatsApp.
 */
export function buildWhatsAppQuoteMessage({ service, serviceDetail, area, zone }) {
  const cleanZone = zone && zone.trim().length > 0 ? zone.trim() : 'A confirmar (Buenos Aires / Zona Sur)';
  const formattedService =
    serviceDetail && serviceDetail.trim().length > 0
      ? `${service} (${serviceDetail.trim()})`
      : service;

  return `Hola Aguilar Pisos Industriales, ¿cómo están? Quiero solicitar una cotización sin cargo. • Servicio: ${formattedService} • Superficie aprox.: ${area} • Zona: ${cleanZone}. ¡Espero su respuesta!`;
}

export function buildWhatsAppUrl(message) {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

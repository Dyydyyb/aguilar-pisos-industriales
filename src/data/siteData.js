/**
 * Fuente única de datos para Aguilar Pisos Industriales.
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
  { label: 'Alianzas', href: '#alianzas' },
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
export const ALLIANCE_SERVICE_OPTION = 'Alianza Corralón / Proveedor';

export const WHATSAPP_SERVICE_OPTIONS = [
  'Piso Industrial / Galpón',
  'Entrada / Playón Vehicular',
  'Arquitectura y Construcción',
  'Otro / Asesoramiento',
  ALLIANCE_SERVICE_OPTION,
];

export const WHATSAPP_AREA_OPTIONS = [
  'Menos de 100 m²',
  '100 a 500 m²',
  '500 a 1.500 m²',
  'Más de 1.500 m²',
  'No lo sé aún',
];

export const WHATSAPP_SECTOR_OPTIONS = [
  'Corralón de Materiales',
  'Hormigonera',
  'Estudio de Arquitectura / Constructora',
  'Otro',
];

/**
 * Alianzas Estratégicas B2B (Corralones, Hormigoneras y Estudios)
 */
export const ALLIANCE_PILLARS = [
  {
    id: 'cero-reclamos',
    title: 'Cero Reclamos por Mala Colocación',
    description:
      'El mejor hormigón falla si no se nivela, llanea y cura correctamente. Nuestra ejecución bajo dirección de Maestro Mayor de Obras garantiza que tus materiales rindan al máximo.',
    icon: 'shield',
  },
  {
    id: 'derivacion-mutua',
    title: 'Derivación Mutua de Ventas',
    description:
      'A los clientes que captamos por nuestra cuenta les derivamos la compra de hormigón elaborado, mallas, endurecedores y áridos directamente a nuestros corralones aliados.',
    icon: 'repeat',
  },
  {
    id: 'presupuestos-rapidos',
    title: 'Presupuestos Rápidos en 24/48 hs',
    description:
      'Relevamiento técnico en obra sin cargo en Florencio Varela y toda Zona Sur para que tu cliente cierre la compra de materiales cuanto antes.',
    icon: 'clock',
  },
];

export const ALLIANCE_DIRECT_WHATSAPP_MESSAGE =
  'Hola Aguilar Pisos Industriales, ¿cómo están? Me comunico desde un corralón / empresa del rubro para conversar sobre una alianza comercial de recomendación de obras y materiales en Zona Sur.';

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
 * Datos del Slider de Proyectos Realizados (obras reales de Aguilar Pisos Industriales).
 * Imágenes ubicadas en `/public/images/`.
 */
export const projectsData = [
  {
    id: 'plaza-san-juan-bautista',
    featured: true,
    title: 'Plaza Principal San Juan Bautista — Hormigón Peinado y Llaneado con Pigmento Azul',
    category: 'Obra Destacada',
    location: 'Plaza San Juan Bautista, Florencio Varela',
    execution: 'Hormigón peinado + Llaneado pigmentado',
    specHighlight:
      'Terminación combinada • Llaneado mecánico con allanadora • Pigmento mineral azul',
    description:
      'Intervención principal en la emblemática Plaza San Juan Bautista de Florencio Varela. Ejecución combinada de sectores en hormigón peinado antideslizante junto a paños llaneados mecánicamente con endurecedor y pigmento azul.',
    image: '/images/obra-plaza-san-juan-bautista.webp',
    imagePosition: 'object-[50%_58%]',
    alt: 'Hormigón peinado y sector llaneado con pigmento azul junto a allanadora mecánica en Plaza Principal San Juan Bautista de Florencio Varela',
    filterCategory: 'Piso Industrial / Galpón',
  },
  {
    id: 'piso-industrial-acceso-camiones',
    featured: false,
    title: 'Piso Industrial de Acceso de Camiones',
    category: 'Pisos Industriales',
    location: 'Buenos Aires, Zona Sur',
    execution: 'Allanadora doble tripulada',
    specHighlight: 'Hormigón de alta resistencia • Llaneado mecánico doble • Tránsito pesado',
    description:
      'Ejecución de piso industrial de alta resistencia para acceso y circulación de camiones pesados, terminado con allanadora doble tripulada propia para lograr máxima planimetría y durabilidad superficial.',
    image: '/images/obra-acceso-camiones.webp',
    imagePosition: 'object-[50%_62%]',
    alt: 'Operario conduciendo allanadora doble tripulada sobre piso industrial de hormigón para acceso de camiones',
    filterCategory: 'Entrada / Playón Vehicular',
  },
  {
    id: 'construccion-playon-civico',
    featured: false,
    title: 'Construcción de Playón Cívico',
    category: 'Obra Civil y Espacios Públicos',
    location: 'Buenos Aires, Zona Sur',
    execution: 'Hormigón nivelado y peinado',
    specHighlight: 'Paños modulares • Reglas de nivelación • Terminación antideslizante',
    description:
      'Construcción integral de playón cívico exterior en hormigón armado, ejecutado por paños modulares con control de pendientes, fratazado de borde y textura superficial peinada antideslizante.',
    image: '/images/obra-playon-civico.webp',
    imagePosition: 'object-[50%_64%]',
    alt: 'Construcción de playón cívico de hormigón con terminación peinada y nivelación por paños',
    filterCategory: 'Arquitectura y Construcción',
  },
  {
    id: 'senda-plaza-barrial',
    featured: false,
    title: 'Senda para Plaza Barrial',
    category: 'Arquitectura y Obra Civil',
    location: 'Buenos Aires, Zona Sur',
    execution: 'Hormigón peinado continuo',
    specHighlight: 'Encofrado lineal • Hormigón elaborado • Terminación peinada peatonal',
    description:
      'Ejecución de senda peatonal continua de hormigón elaborado para plaza barrial, con preparación de base, encofrado perimetral alineado, descarga directa de mixer y peinado antideslizante.',
    image: '/images/obra-senda-plaza-barrial.webp',
    imagePosition: 'object-[50%_50%]',
    alt: 'Ejecución de senda peatonal de hormigón peinado en plaza barrial con camión mixer en obra',
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
  'Alianza Comercial (Corralón / Hormigonera / Estudio)',
  'Otro / Asesoramiento Técnico',
];

/**
 * Construye el texto exacto y la URL codificada para WhatsApp (cliente final o alianza B2B).
 */
export function buildWhatsAppQuoteMessage({ service, serviceDetail, area, sector, zone }) {
  const cleanZone =
    zone && zone.trim().length > 0 ? zone.trim() : 'A confirmar (Buenos Aires / Zona Sur)';

  if (service === ALLIANCE_SERVICE_OPTION) {
    const cleanSector = sector || WHATSAPP_SECTOR_OPTIONS[0];
    return `Hola Aguilar Pisos Industriales, ¿cómo están? Me comunico para conversar sobre una alianza comercial de recomendación de obras y materiales en Zona Sur. • Rubro: ${cleanSector} • Zona: ${cleanZone}. ¡Espero su respuesta!`;
  }

  const formattedService =
    serviceDetail && serviceDetail.trim().length > 0
      ? `${service} (${serviceDetail.trim()})`
      : service;

  return `Hola Aguilar Pisos Industriales, ¿cómo están? Quiero solicitar una cotización sin cargo. • Servicio: ${formattedService} • Superficie aprox.: ${area} • Zona: ${cleanZone}. ¡Espero su respuesta!`;
}

export function buildWhatsAppUrl(message) {
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

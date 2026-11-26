import { useEffect, useState } from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { BUSINESS_INFO, DEFAULT_WHATSAPP_MESSAGES, buildWhatsAppUrl } from '../data/siteData';

const HIDE_ON_SECTION_IDS = ['cotizador', 'contacto', 'footer-principal'];

export default function FloatingWhatsApp() {
  const [hiddenInZone, setHiddenInZone] = useState(false);
  const whatsappHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGES.general);

  // Oculta el botón flotante cuando el usuario ya está en #cotizador, #contacto o <footer>
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observed = HIDE_ON_SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (observed.length === 0) return undefined;

    const visibleSet = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSet.add(entry.target.id);
          } else {
            visibleSet.delete(entry.target.id);
          }
        });
        setHiddenInZone(visibleSet.size > 0);
      },
      { threshold: 0.15 }
    );

    observed.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hiddenInZone}
      tabIndex={hiddenInZone ? -1 : 0}
      aria-label={`Enviar consulta por WhatsApp a ${BUSINESS_INFO.name} (${BUSINESS_INFO.phoneDisplay})`}
      className={`animate-float-entry fixed right-4 bottom-4 z-40 inline-flex min-h-[52px] min-w-[52px] items-center justify-center gap-2.5 rounded-full border border-obra-hover bg-obra px-3.5 text-sm font-semibold text-white shadow-md shadow-charcoal/35 transition-[opacity,transform,background-color] duration-200 hover:bg-obra-hover active:scale-[0.96] sm:right-6 sm:bottom-6 sm:px-5 ${
        hiddenInZone
          ? 'pointer-events-none opacity-0 translate-y-3'
          : 'opacity-100 translate-y-0 hover:-translate-y-0.5'
      }`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

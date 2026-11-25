import WhatsAppIcon from './WhatsAppIcon';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/siteData';

export default function FloatingWhatsApp() {
  const whatsappHref = buildWhatsAppUrl(
    'Hola Aguilar Pisos Industriales, ¿cómo están? Quiero hacer una consulta sin cargo.'
  );

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Enviar consulta por WhatsApp a ${BUSINESS_INFO.name} (${BUSINESS_INFO.phoneDisplay})`}
      className="fixed right-4 bottom-4 z-40 inline-flex min-h-[52px] min-w-[52px] items-center justify-center gap-2.5 border border-[#C2410C] bg-[#EA580C] px-3.5 text-sm font-semibold text-white shadow-md shadow-slate-950/35 transition-colors duration-150 hover:bg-[#C2410C] active:scale-[0.98] sm:right-6 sm:bottom-6 sm:px-5"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

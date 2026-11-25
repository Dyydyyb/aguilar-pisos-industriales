import { ClipboardCheck, Instagram, MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';
import WhatsAppIcon from './WhatsAppIcon';
import { BUSINESS_INFO, NAV_LINKS, buildWhatsAppUrl } from '../data/siteData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappHref = buildWhatsAppUrl(
    'Hola Aguilar Pisos Industriales, ¿cómo están? Quiero solicitar una cotización sin cargo.'
  );

  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC] pb-20 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-[#334155] pb-8 sm:gap-10 sm:pb-12 lg:grid-cols-12">
          {/* Identidad y garantía comercial */}
          <div className="lg:col-span-5">
            <a href="#inicio" aria-label="Aguilar Pisos Industriales — Volver arriba">
              <BrandLogo variant="light" />
            </a>

            <p className="mt-4 sm:mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-slate-300">
              Pisos industriales de alta resistencia, hormigón llaneado mecánico con maquinaria
              propia, arquitectura y construcción integral para galpones, fábricas y obras civiles.
            </p>

            <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-xl border border-[#334155] bg-[#1E293B] px-3.5 py-2 text-xs font-semibold text-[#F8FAFC]">
              <ClipboardCheck className="h-4 w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
              <span>Cotizaciones y visitas técnicas sin cargo</span>
            </div>
          </div>

          {/* Navegación + Contacto lado a lado en móvil */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-7 lg:grid-cols-7 lg:gap-10">
            <div className="lg:col-span-3">
              <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-slate-200">
                Navegación
              </h3>
              <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-[34px] sm:min-h-[36px] items-center text-xs sm:text-sm text-slate-300 transition-colors hover:text-[#EA580C]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-slate-200">
                Contacto Directo
              </h3>

              <ul className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm text-slate-300">
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[36px] sm:min-h-[40px] items-center gap-2.5 text-[#F8FAFC] transition-colors hover:text-[#EA580C]"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#EA580C]" />
                    <span className="tabular-nums font-semibold">{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </li>

                <li className="hidden sm:block">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex min-h-[40px] items-center gap-3 transition-colors hover:text-[#F8FAFC]"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
                    <span>Atención telefónica y WhatsApp directo</span>
                  </a>
                </li>

                <li className="flex items-start gap-2.5 py-0.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
                  <span>{BUSINESS_INFO.coverage}</span>
                </li>

                <li>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[36px] sm:min-h-[40px] items-center gap-2.5 transition-colors hover:text-[#EA580C]"
                  >
                    <Instagram className="h-4 w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
                    <span className="break-all sm:break-normal">{BUSINESS_INFO.instagramHandle}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:pt-6">
          <p className="tabular-nums">
            © {currentYear} {BUSINESS_INFO.name}. Todos los derechos reservados.
          </p>
          <p>{BUSINESS_INFO.location} • Argentina</p>
        </div>
      </div>
    </footer>
  );
}

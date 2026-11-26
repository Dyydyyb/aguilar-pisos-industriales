import { ClipboardCheck, Instagram, MapPin, Phone } from 'lucide-react';
import BrandLogo from './BrandLogo';
import WhatsAppIcon from './WhatsAppIcon';
import {
  BUSINESS_INFO,
  DEFAULT_WHATSAPP_MESSAGES,
  NAV_LINKS,
  buildWhatsAppUrl,
} from '../data/siteData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGES.general);

  return (
    <footer id="footer-principal" className="bg-charcoal text-ink-inverse pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-steel-border pb-8 sm:gap-10 sm:pb-12 lg:grid-cols-12">
          {/* Identidad y garantía comercial */}
          <div className="lg:col-span-5">
            <a
              href="#inicio"
              className="inline-flex min-h-[44px] items-center rounded-xl"
              aria-label="Aguilar Pisos Industriales — Volver arriba"
            >
              <BrandLogo variant="light" />
            </a>

            <p className="mt-4 sm:mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-ink-inverse-muted">
              Pisos industriales de alta resistencia, hormigón llaneado mecánico con maquinaria
              propia y construcción integral bajo {BUSINESS_INFO.technicalDirection}.
            </p>

            <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-xl border border-steel-border bg-graphite px-3.5 py-2 text-xs font-semibold text-ink-inverse">
              <ClipboardCheck className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
              <span>Cotizaciones y visitas técnicas sin cargo</span>
            </div>
          </div>

          {/* Navegación + Contacto directo */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-7 lg:gap-10">
            <div className="lg:col-span-3">
              <h2 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-ink-inverse">
                Navegación
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-1 sm:block sm:mt-4 sm:space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-[44px] items-center text-sm text-ink-inverse-muted transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h2 className="font-display text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-ink-inverse">
                Contacto Directo
              </h2>

              <ul className="mt-3 sm:mt-4 space-y-1 text-sm text-ink-inverse-muted">
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-3 text-ink-inverse transition-colors hover:text-obra-bright"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-obra-bright" />
                    <span className="tabular-nums font-semibold">
                      WhatsApp {BUSINESS_INFO.phoneDisplay}
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex min-h-[44px] items-center gap-3 transition-colors hover:text-white"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
                    <span>Llamar por teléfono directo</span>
                  </a>
                </li>

                <li className="flex min-h-[44px] items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
                  <span>{BUSINESS_INFO.coverage}</span>
                </li>

                <li>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-3 transition-colors hover:text-obra-bright"
                  >
                    <Instagram className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
                    <span>{BUSINESS_INFO.instagramHandle}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 pt-5 text-xs text-ink-inverse-muted sm:flex-row sm:items-center sm:pt-6">
          <p className="tabular-nums">
            © {currentYear} {BUSINESS_INFO.name}. Todos los derechos reservados.
          </p>
          <p>{BUSINESS_INFO.location} • Argentina</p>
        </div>
      </div>
    </footer>
  );
}

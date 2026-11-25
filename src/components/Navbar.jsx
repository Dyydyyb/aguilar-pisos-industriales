import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import WhatsAppIcon from './WhatsAppIcon';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { BUSINESS_INFO, NAV_LINKS, buildWhatsAppUrl } from '../data/siteData';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { progress, isScrolled } = useScrollProgress(20);

  const quickWhatsAppHref = buildWhatsAppUrl(
    'Hola Aguilar Pisos Industriales, ¿cómo están? Quiero realizar una consulta sin cargo.'
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavSelect = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        isScrolled || mobileOpen
          ? 'bg-[#0F172A] border-b border-[#334155]'
          : 'bg-[#0F172A]/90 border-b border-[#334155]/60'
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          onClick={handleNavSelect}
          className="inline-flex items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EA580C]"
          aria-label="Aguilar Pisos Industriales — Ir al inicio"
        >
          <BrandLogo variant="light" compact />
        </a>

        {/* Navegación Desktop */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-5 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-2 text-sm font-medium text-slate-200 transition-colors duration-150 hover:text-[#F8FAFC] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-[#EA580C] after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acciones Desktop */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
          <a
            href={quickWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#334155] bg-[#1E293B] px-3.5 text-sm font-medium text-[#F8FAFC] transition-[background-color,border-color,transform] duration-150 hover:border-slate-400 hover:bg-[#334155] active:scale-[0.97]"
            aria-label={`Escribir por WhatsApp al ${BUSINESS_INFO.phoneDisplay}`}
          >
            <WhatsAppIcon className="h-4 w-4 text-[#EA580C]" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#cotizador"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#EA580C] px-4 xl:px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#C2410C] active:scale-[0.97]"
          >
            Cotizar Sin Cargo
          </a>
        </div>

        {/* Controles Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={quickWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#334155] bg-[#1E293B] text-[#F8FAFC] transition-[border-color,transform] hover:border-[#EA580C] active:scale-[0.97]"
            aria-label="Abrir WhatsApp directo"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#EA580C]" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#334155] bg-[#1E293B] text-[#F8FAFC] transition-[border-color,transform] hover:border-slate-400 active:scale-[0.97]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile animado fluido */}
      <div
        id="mobile-nav-drawer"
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          mobileOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden border-t border-[#334155] bg-[#0F172A]">
          <nav aria-label="Navegación móvil" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavSelect}
                className="flex min-h-[48px] items-center justify-between rounded-xl px-3 text-base font-medium text-slate-100 transition-colors hover:bg-[#1E293B] hover:text-[#EA580C]"
              >
                <span>{link.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#334155]" aria-hidden="true" />
              </a>
            ))}

            <div className="mt-3 grid grid-cols-1 gap-2.5 border-t border-[#1E293B] pt-4 sm:grid-cols-2">
              <a
                href="#cotizador"
                onClick={handleNavSelect}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#EA580C] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#C2410C] active:scale-[0.97]"
              >
                Cotizar Sin Cargo
              </a>
              <a
                href={quickWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavSelect}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#334155] bg-[#1E293B] px-4 text-sm font-medium text-[#F8FAFC] transition-colors hover:bg-[#334155] active:scale-[0.97]"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#EA580C]" />
                <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Barra sutil de progreso de lectura (100% GPU via scaleX) */}
      <div className="h-[2px] w-full bg-[#1E293B] overflow-hidden" aria-hidden="true">
        <div
          className="h-full w-full origin-left bg-[#EA580C] transition-transform duration-100 ease-out"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
    </header>
  );
}

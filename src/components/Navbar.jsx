import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import WhatsAppIcon from './WhatsAppIcon';
import { useScrollProgress } from '../hooks/useScrollProgress';
import {
  BUSINESS_INFO,
  DEFAULT_WHATSAPP_MESSAGES,
  NAV_LINKS,
  buildWhatsAppUrl,
} from '../data/siteData';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { progressBarRef, isScrolled } = useScrollProgress(20);

  const quickWhatsAppHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGES.general);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Seguimiento de sección activa en viewport para orientación en navegación
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const sectionElements = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      Boolean
    );
    if (sectionElements.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavSelect = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        isScrolled || mobileOpen
          ? 'bg-charcoal border-b border-steel-border'
          : 'bg-charcoal/92 border-b border-steel-border/60'
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          onClick={handleNavSelect}
          className="inline-flex min-h-[44px] items-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-obra-bright"
          aria-label="Aguilar Pisos Industriales — Ir al inicio"
        >
          <BrandLogo variant="light" compact />
        </a>

        {/* Navegación Desktop */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-4 xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative inline-flex min-h-[44px] items-center px-1 text-sm font-medium transition-colors duration-150 after:absolute after:bottom-2 after:left-1 after:right-1 after:h-[2px] after:origin-left after:rounded-full after:bg-obra-bright after:transition-transform after:duration-200 motion-reduce:after:transition-none ${
                  isActive
                    ? 'text-white after:scale-x-100'
                    : 'text-ink-inverse-muted hover:text-white after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Acciones Desktop */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
          <a
            href={quickWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-steel-border-strong bg-graphite px-3.5 text-sm font-medium text-ink-inverse transition-[background-color,border-color,transform] duration-150 hover:border-ink-inverse-muted hover:bg-steel-border active:scale-[0.97]"
            aria-label={`Escribir por WhatsApp al ${BUSINESS_INFO.phoneDisplay}`}
          >
            <WhatsAppIcon className="h-4 w-4 text-obra-bright" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#cotizador"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-obra px-4 xl:px-5 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-obra-hover active:scale-[0.97]"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-steel-border-strong bg-graphite text-ink-inverse transition-[border-color,transform] hover:border-obra-bright active:scale-[0.97]"
            aria-label="Abrir WhatsApp directo"
          >
            <WhatsAppIcon className="h-5 w-5 text-obra-bright" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-steel-border-strong bg-graphite text-ink-inverse transition-[border-color,transform] hover:border-ink-inverse-muted active:scale-[0.97]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menú Mobile con inert cuando está cerrado para evitar enlaces fantasma en Tab */}
      <div
        id="mobile-nav-drawer"
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none lg:hidden ${
          mobileOpen
            ? 'visible grid-rows-[1fr] opacity-100'
            : 'invisible grid-rows-[0fr] opacity-0 pointer-events-none'
        }`}
      >
        <div className="overflow-hidden border-t border-steel-border bg-charcoal">
          <nav aria-label="Navegación móvil" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavSelect}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex min-h-[48px] items-center justify-between rounded-xl px-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-graphite text-white'
                      : 'text-ink-inverse-muted hover:bg-graphite hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isActive ? 'bg-obra-bright' : 'bg-steel-border'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}

            <div className="mt-3 grid grid-cols-1 gap-2.5 border-t border-graphite pt-4 sm:grid-cols-2">
              <a
                href="#cotizador"
                onClick={handleNavSelect}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-obra px-4 text-sm font-semibold text-white transition-colors hover:bg-obra-hover active:scale-[0.97]"
              >
                Cotizar Sin Cargo
              </a>
              <a
                href={quickWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavSelect}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-steel-border-strong bg-graphite px-4 text-sm font-medium text-ink-inverse transition-colors hover:bg-steel-border active:scale-[0.97]"
              >
                <WhatsAppIcon className="h-4 w-4 text-obra-bright" />
                <span className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Barra de progreso de lectura actualizada por ref (0 re-renders por frame) */}
      <div className="h-[2px] w-full bg-graphite overflow-hidden" aria-hidden="true">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left bg-obra-bright"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </header>
  );
}

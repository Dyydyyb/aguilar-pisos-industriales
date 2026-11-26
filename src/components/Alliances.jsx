import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Handshake,
  Repeat,
  ShieldCheck,
} from 'lucide-react';
import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import {
  ALLIANCE_PILLARS,
  DEFAULT_WHATSAPP_MESSAGES,
  buildWhatsAppUrl,
} from '../data/siteData';

const PILLAR_ICONS = {
  shield: ShieldCheck,
  repeat: Repeat,
  clock: Clock,
};

export default function Alliances({ onConfigureAlliance }) {
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0);
  const allianceWhatsAppHref = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGES.allianceDirect);

  const handleRailScroll = (event) => {
    const container = event.currentTarget;
    const firstCard = container.firstElementChild;
    if (!firstCard) return;
    const stepWidth = firstCard.getBoundingClientRect().width + 14;
    if (stepWidth <= 0) return;
    const nextIndex = Math.min(
      ALLIANCE_PILLARS.length - 1,
      Math.max(0, Math.round(container.scrollLeft / stepWidth))
    );
    setMobileScrollIndex(nextIndex);
  };

  return (
    <section
      id="alianzas"
      className="border-b border-steel-border bg-charcoal py-12 text-ink-inverse sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado B2B */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-steel-border bg-graphite px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold tracking-[0.06em] sm:tracking-[0.08em] text-ink-inverse-muted uppercase">
            <Handshake className="h-4 w-4 shrink-0 text-obra-bright" aria-hidden="true" />
            <span className="truncate">
              RED DE PROVEEDORES Y COLEGAS
              <span className="mx-1.5 text-steel-border-strong" aria-hidden="true">
                •
              </span>
              <span className="text-ink-inverse">ZONA SUR</span>
            </span>
          </div>

          <h2 className="mt-4 sm:mt-5 font-display text-2xl font-extrabold tracking-[-0.03em] text-ink-inverse text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Alianzas Estratégicas: Corralones, Hormigoneras y Estudios
          </h2>

          <div className="mt-3 sm:mt-4 flex items-end justify-between gap-3">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-inverse-muted sm:text-lg">
              ¿Vendés materiales o hormigón elaborado y tus clientes necesitan mano de obra
              calificada? Trabajemos en sinergia bajo Dirección Técnica profesional.
            </p>
            <span className="shrink-0 text-xs font-semibold text-obra-bright md:hidden">
              Deslizá →
            </span>
          </div>
        </Reveal>

        {/* Propuesta de valor B2B: riel horizontal en móvil, grilla 3 columnas desde md (tablets incluidas) */}
        <div className="relative mt-6 sm:mt-12">
          <div
            onScroll={handleRailScroll}
            className="no-scrollbar flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-5 lg:gap-6 md:overflow-visible md:pb-0"
          >
            {ALLIANCE_PILLARS.map((pillar, index) => {
              const IconComponent = PILLAR_ICONS[pillar.icon] || ShieldCheck;
              return (
                <Reveal
                  key={pillar.id}
                  as="article"
                  variant="scale"
                  delayMs={index * 90}
                  className="flex w-[80vw] max-w-[320px] shrink-0 snap-start flex-col rounded-2xl border border-steel-border bg-graphite/90 p-5 transition-colors duration-200 hover:border-steel-border-strong md:w-auto md:max-w-none lg:p-8"
                >
                  <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-steel-border bg-charcoal text-obra-bright">
                    <IconComponent className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>

                  <h3 className="mt-4 sm:mt-6 font-display text-base font-bold leading-snug tracking-[-0.02em] text-ink-inverse lg:text-xl">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 sm:mt-3 text-xs leading-relaxed text-ink-inverse-muted sm:text-sm lg:text-[15px]">
                    {pillar.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
          <div
            className="pointer-events-none absolute top-0 right-0 bottom-1 w-8 bg-gradient-to-l from-charcoal to-transparent md:hidden"
            aria-hidden="true"
          />
        </div>

        {/* Indicador de posición del riel móvil */}
        <div className="mt-3 flex items-center justify-center gap-1.5 md:hidden" aria-hidden="true">
          {ALLIANCE_PILLARS.map((pillar, idx) => (
            <span
              key={pillar.id}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                idx === mobileScrollIndex ? 'w-6 bg-obra-bright' : 'w-2 bg-steel-border'
              }`}
            />
          ))}
        </div>

        {/* Barra de acción directa CTA B2B con borde naranja del sistema */}
        <Reveal variant="scale" delayMs={180} className="mt-6 sm:mt-10">
          <div className="flex flex-col gap-5 rounded-2xl border border-obra-bright/60 bg-graphite p-5 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-base font-bold leading-snug tracking-[-0.02em] text-ink-inverse sm:text-xl">
                ¿Tenés un corralón, planta hormigonera o estudio de arquitectura en Zona Sur?
              </p>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-ink-inverse-muted">
                Coordinemos una charla directa por WhatsApp para establecer un esquema de
                derivación mutua y respaldo técnico en obra.
              </p>

              {onConfigureAlliance && (
                <button
                  type="button"
                  onClick={onConfigureAlliance}
                  className="group mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-xs sm:text-sm font-semibold text-obra-bright transition-colors hover:text-white"
                >
                  <span>Especificar rubro y localidad en el cotizador</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>

            <a
              href={allianceWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] sm:min-h-[52px] shrink-0 items-center justify-center gap-2.5 rounded-xl bg-obra px-5 sm:px-6 py-3 text-center text-xs sm:text-base font-bold text-white transition-[background-color,transform] duration-150 hover:bg-obra-hover active:scale-[0.97]"
            >
              <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
              <span>Postularme como Corralón / Proveedor Aliado</span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

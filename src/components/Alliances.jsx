import { ArrowUpRight, Clock, Handshake, Repeat, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';
import WhatsAppIcon from './WhatsAppIcon';
import {
  ALLIANCE_DIRECT_WHATSAPP_MESSAGE,
  ALLIANCE_PILLARS,
  buildWhatsAppUrl,
} from '../data/siteData';

const PILLAR_ICONS = {
  shield: ShieldCheck,
  repeat: Repeat,
  clock: Clock,
};

export default function Alliances() {
  const allianceWhatsAppHref = buildWhatsAppUrl(ALLIANCE_DIRECT_WHATSAPP_MESSAGE);

  return (
    <section
      id="alianzas"
      className="border-b border-slate-700 bg-slate-900 py-12 text-[#F8FAFC] sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado B2B */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-[0.06em] sm:tracking-[0.08em] text-slate-200 uppercase">
            <Handshake className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
            <span className="truncate">
              RED DE PROVEEDORES Y COLEGAS
              <span className="mx-1.5 text-slate-500" aria-hidden="true">
                •
              </span>
              <span className="text-[#F8FAFC]">ZONA SUR</span>
            </span>
          </div>

          <h2 className="mt-4 sm:mt-5 font-display text-2xl font-extrabold tracking-[-0.03em] text-[#F8FAFC] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Alianzas Estratégicas: Corralones, Hormigoneras y Estudios
          </h2>

          <div className="mt-3 sm:mt-4 flex items-end justify-between gap-3">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-lg">
              ¿Vendés materiales o hormigón elaborado y tus clientes necesitan mano de obra
              calificada? Trabajemos en sinergia bajo Dirección Técnica profesional.
            </p>
            <span className="shrink-0 text-[11px] font-semibold text-[#EA580C] lg:hidden">
              Deslizá →
            </span>
          </div>
        </Reveal>

        {/* Propuesta de valor B2B: riel horizontal deslizable en celulares, 3 columnas en desktop */}
        <div className="no-scrollbar mt-6 sm:mt-12 flex gap-3.5 overflow-x-auto snap-x snap-mandatory pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0">
          {ALLIANCE_PILLARS.map((pillar, index) => {
            const IconComponent = PILLAR_ICONS[pillar.icon] || ShieldCheck;
            return (
              <Reveal
                key={pillar.id}
                as="article"
                variant="scale"
                delayMs={index * 90}
                className="group flex w-[80vw] max-w-[320px] shrink-0 snap-start flex-col rounded-2xl border border-slate-700 bg-slate-800/80 p-5 transition-[transform,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-slate-500 lg:w-auto lg:max-w-none sm:p-8"
              >
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-[#EA580C] transition-colors duration-200 group-hover:border-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white">
                  <IconComponent className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h3 className="mt-4 sm:mt-6 font-display text-base font-bold leading-snug tracking-[-0.02em] text-[#F8FAFC] sm:text-xl">
                  {pillar.title}
                </h3>

                <p className="mt-2 sm:mt-3 text-xs leading-relaxed text-slate-300 sm:text-[15px]">
                  {pillar.description}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Barra de acción directa CTA B2B redondeada */}
        <Reveal variant="scale" delayMs={180} className="mt-6 sm:mt-10">
          <div className="flex flex-col gap-4 sm:gap-6 rounded-2xl border border-orange-600/50 bg-[#1E293B] p-5 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-base font-bold leading-snug tracking-[-0.02em] text-[#F8FAFC] sm:text-xl">
                ¿Tenés un corralón, planta hormigonera o estudio de arquitectura en Zona Sur?
              </p>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                Coordinemos una reunión breve o charla directa por WhatsApp para establecer un
                esquema de derivación mutua y respaldo técnico en obra.
              </p>
            </div>

            <a
              href={allianceWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[48px] sm:min-h-[52px] shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#EA580C] px-5 sm:px-6 py-3 text-center text-xs sm:text-base font-bold text-white transition-[background-color,transform] duration-150 hover:bg-[#C2410C] active:scale-[0.97]"
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

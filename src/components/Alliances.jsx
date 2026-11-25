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
      className="border-b border-slate-700 bg-slate-900 py-20 text-[#F8FAFC] sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado B2B */}
        <Reveal className="max-w-3xl">
          <div className="inline-flex max-w-full flex-wrap items-center gap-2 border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold tracking-[0.08em] text-slate-200 uppercase">
            <Handshake className="h-4 w-4 shrink-0 text-[#EA580C]" aria-hidden="true" />
            <span>RED DE PROVEEDORES Y COLEGAS</span>
            <span className="text-slate-500" aria-hidden="true">
              •
            </span>
            <span className="text-[#F8FAFC]">ZONA SUR</span>
          </div>

          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] text-[#F8FAFC] text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Alianzas Estratégicas: Corralones, Hormigoneras y Estudios
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            ¿Vendés materiales o hormigón elaborado y tus clientes necesitan mano de obra
            calificada? Trabajemos en sinergia bajo Dirección Técnica profesional.
          </p>
        </Reveal>

        {/* Propuesta de valor B2B en 3 tarjetas */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {ALLIANCE_PILLARS.map((pillar, index) => {
            const IconComponent = PILLAR_ICONS[pillar.icon] || ShieldCheck;
            return (
              <Reveal
                key={pillar.id}
                as="article"
                delayMs={index * 90}
                className="flex flex-col border border-slate-700 bg-slate-800/80 p-6 transition-colors duration-150 hover:border-slate-500 sm:p-8"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-slate-700 bg-slate-900 text-[#EA580C]">
                  <IconComponent className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>

                <h3 className="mt-6 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-[#F8FAFC] sm:text-xl">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                  {pillar.description}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Barra de acción directa CTA B2B */}
        <Reveal delayMs={180} className="mt-8 sm:mt-10">
          <div className="flex flex-col gap-6 border border-orange-600/50 bg-[#1E293B] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-lg font-bold leading-snug tracking-[-0.02em] text-[#F8FAFC] sm:text-xl">
                ¿Tenés un corralón, planta hormigonera o estudio de arquitectura en Zona Sur?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Coordinemos una reunión breve o charla directa por WhatsApp para establecer un
                esquema de derivación mutua y respaldo técnico en obra.
              </p>
            </div>

            <a
              href={allianceWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2.5 bg-[#EA580C] px-6 py-3.5 text-center text-sm font-bold text-white transition-colors duration-150 hover:bg-[#C2410C] active:scale-[0.98] sm:text-base"
            >
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              <span>Postularme como Corralón / Proveedor Aliado</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function BrandLogo({ variant = 'light', compact = false }) {
  const isLight = variant === 'light';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {/* Logo oficial Aguilar Pisos Industriales en sello circular mate */}
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white border ${
          compact ? 'h-11 w-11' : 'h-14 w-14'
        } ${isLight ? 'border-[#334155]' : 'border-[#CBD5E1]'}`}
      >
        <img
          src="/images/logo-aguilar.png"
          alt="Logo Aguilar Pisos Industriales"
          width={150}
          height={150}
          className="h-full w-full object-contain"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-[-0.02em] ${
            compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          } ${isLight ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}
        >
          AGUILAR
        </span>
        <span
          className={`mt-1 text-[11px] font-medium tracking-[0.14em] uppercase ${
            isLight ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Pisos <span className="text-[#EA580C]">Industriales</span>
        </span>
      </span>
    </span>
  );
}

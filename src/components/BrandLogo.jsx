export default function BrandLogo({ variant = 'light', compact = false }) {
  const isLight = variant === 'light';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {/* Logo oficial Aguilar Pisos Industriales en sello circular mate */}
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white border ${
          compact ? 'h-11 w-11' : 'h-13 w-13'
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

      <span className="flex flex-col justify-center gap-[4px] translate-y-[1px]">
        <span
          className={`font-display font-extrabold leading-[0.92] tracking-[-0.02em] ${
            compact ? 'text-[17px] sm:text-[18px]' : 'text-xl'
          } ${isLight ? 'text-[#F8FAFC]' : 'text-[#0F172A]'}`}
        >
          AGUILAR
        </span>
        <span
          className={`text-[10px] font-semibold leading-[0.95] tracking-[0.14em] uppercase ${
            isLight ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Pisos <span className="text-[#EA580C]">Industriales</span>
        </span>
      </span>
    </span>
  );
}

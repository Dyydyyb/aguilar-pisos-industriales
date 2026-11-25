export default function BrandLogo({ variant = 'light', compact = false }) {
  const isLight = variant === 'light';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      {/* Isologo arquitectónico 100% mate */}
      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center border ${
          isLight
            ? 'border-[#334155] bg-[#1E293B]'
            : 'border-[#CBD5E1] bg-[#0F172A]'
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 36 36" className="h-6 w-6" fill="none">
          <path
            d="M7 28L14.8 8H21.2L29 28H23.7L21.9 22.8H14.1L12.3 28H7ZM15.5 18.6H20.5L18 11.4L15.5 18.6Z"
            fill="#F8FAFC"
          />
        </svg>
        <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-[#EA580C]" />
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

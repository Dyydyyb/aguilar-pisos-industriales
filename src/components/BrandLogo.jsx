export default function BrandLogo({ variant = 'light', compact = false }) {
  const isLight = variant === 'light';

  return (
    <span className="inline-flex items-center gap-3 select-none">
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white border ${
          compact ? 'h-11 w-11' : 'h-13 w-13'
        } ${isLight ? 'border-steel-border' : 'border-concrete-border'}`}
      >
        <img
          src="/images/logo-aguilar.webp"
          alt=""
          aria-hidden="true"
          width={150}
          height={150}
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>

      <span className="flex flex-col justify-center gap-[4px] translate-y-[1px]">
        <span
          className={`font-display font-extrabold leading-[0.92] tracking-[-0.02em] ${
            compact ? 'text-[17px] sm:text-[18px]' : 'text-xl'
          } ${isLight ? 'text-ink-inverse' : 'text-ink'}`}
        >
          AGUILAR
        </span>
        <span
          className={`text-[10px] font-semibold leading-[0.95] tracking-[0.14em] uppercase ${
            isLight ? 'text-ink-inverse-muted' : 'text-ink-muted'
          }`}
        >
          Pisos{' '}
          <span className={isLight ? 'text-obra-bright' : 'text-obra'}>Industriales</span>
        </span>
      </span>
    </span>
  );
}

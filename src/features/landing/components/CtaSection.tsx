import { Button } from '~/components/ui/button';

export  function CtaSection() {
  return (
    <div>
      <div className="mx-auto max-w-7xl py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="relative isolate overflow-hidden bg-card px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            Redo att hitta ditt första jobb?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-muted-foreground">
            Ingen erfarenhet? Inget problem. Börja söka bland jobb som faktiskt är nybörjarvänliga med ärliga betyg och AI-klassificering.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                document.querySelector('input[name="q"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => (document.querySelector('input[name="q"]') as HTMLInputElement)?.focus(), 500);
              }}>
                Börja söka jobb
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href="#" className="text-sm/6 font-semibold">
                Hur det fungerar
                <span aria-hidden="true">→</span>
              </a>
            </Button>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
          >
            <circle r={512} cx={512} cy={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

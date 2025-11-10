import { BentoCard, BentoGrid } from "~/components/ui/bento-grid";
import { featureCards } from "~/config/features";

export function BentoSection() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Everything you need for your job search
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base sm:text-lg">
            Streamline your job search with powerful tools and insights
          </p>
        </div>

        <BentoGrid className="auto-rows-[16rem] grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <BentoCard
              key={feature.name}
              name={feature.name}
              description={feature.description}
              Icon={feature.Icon}
              background={feature.background}
              href={feature.href}
              cta={feature.cta}
              className={feature.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

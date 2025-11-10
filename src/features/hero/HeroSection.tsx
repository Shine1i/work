import { cn } from "~/lib/utils";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroStats } from "./HeroStats";
import { SearchForm } from "./SearchForm";

export function HeroSection({ className }: { className?: string }) {
  const headlineId = "hero-title";

  return (
    <section
      className={cn(
        "bg-background text-foreground relative isolate h-dvh overflow-hidden",
        className,
      )}
    >
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 sm:pt-40 sm:pb-20 lg:px-8 lg:pt-48">
        <HeroContent headlineId={headlineId} />
        <SearchForm labelledById={headlineId} className="mt-8 sm:mt-10" />
      </div>

      <HeroStats />
    </section>
  );
}

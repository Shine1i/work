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

      <div className="mx-auto flex min-h-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <HeroContent headlineId={headlineId} />
        <SearchForm labelledById={headlineId} className="mt-8 sm:mt-10" />
      </div>

      <HeroStats />
    </section>
  );
}

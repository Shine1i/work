import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { AnimatedGridPattern } from "~/components/magicui/animated-grid-pattern";
import { landingNavConfig, landingNavItems } from "~/config/navigation";
import { UserStatus } from "~/features/auth/UserStatus";
import { HeroSection } from "~/features/hero/HeroSection";
import { BentoSection } from "~/features/landing/BentoSection";
import { BlogSection } from "~/features/landing/BlogSection";
import { CtaSection } from "~/features/landing/CtaSection";
import { PopularCategories } from "~/features/landing/PopularCategories";
import { RecentJobs } from "~/features/landing/RecentJobs";
import CardNav from "~/features/navigation/CardNav";
import { recentJobsQueryOptions } from "~/lib/jobs/queries";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    // Prefetch jobs data for SSR
    context.queryClient.prefetchQuery(recentJobsQueryOptions());
  },
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <CardNav
        logo={landingNavConfig.logo}
        logoAlt={landingNavConfig.logoAlt}
        items={landingNavItems}
      />
      <HeroSection />

      {/* Rest of the page with AnimatedGridPattern background */}
      <div className="relative z-0 isolate overflow-hidden">
        {/* AnimatedGridPattern background - covers entire section after hero */}
        <div className="absolute inset-0 -z-10">
          <AnimatedGridPattern
            aria-hidden
            className="text-foreground/10 [--opacity:0.2]"
            width={48}
            height={48}
            x={-1}
            y={-1}
            numSquares={60}
          />
          <div
            aria-hidden
            className="from-background/70 via-background/30 to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-b"
          />
        </div>

        {/* Content with proper z-index */}
        <div className="relative z-10">
          <PopularCategories />
          <Suspense fallback={<div className="py-12 text-center">Loading jobs...</div>}>
            <RecentJobs />
          </Suspense>
          <BentoSection />
          <BlogSection />
          <CtaSection />

          {/* Quick links / theme toggle + auth status */}
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <a
                  className="text-foreground/80 hover:text-foreground underline max-sm:text-sm"
                  href="https://github.com/dotnize/react-tanstarter"
                  target="_blank"
                  title="Template repository on GitHub"
                  rel="noreferrer noopener"
                >
                  dotnize/react-tanstarter
                </a>
                <ThemeToggle />
              </div>

              <Suspense fallback={<div className="py-6">Loading user...</div>}>
                <UserStatus />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

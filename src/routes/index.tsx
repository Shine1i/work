import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import DotGrid from "~/components/DotGrid";
import { landingNavConfig, landingNavItems } from "~/config/navigation";
import { UserStatus } from "~/features/auth/UserStatus";
import { HeroSection } from "~/features/hero/HeroSection";
import { BentoSection } from "~/features/landing/BentoSection";
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
        buttonBgColor={landingNavConfig.buttonBgColor}
        buttonTextColor={landingNavConfig.buttonTextColor}
      />
      <HeroSection />

      {/* Rest of the page with DotGrid background */}
      <div className="relative z-0">
        {/* DotGrid background - covers entire section after hero */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <DotGrid
            dotSize={4}
            gap={20}
            baseColor="#e0e0e0"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            className="opacity-20 dark:opacity-10"
          />
        </div>

        {/* Content with proper z-index */}
        <div className="relative z-10">
          <BentoSection />
          <PopularCategories />
          <Suspense fallback={<div className="py-12 text-center">Loading jobs...</div>}>
            <RecentJobs />
          </Suspense>

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

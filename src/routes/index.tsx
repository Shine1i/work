import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ThemeToggle } from "~/components/app/theme-toggle";
import { AnimatedGridPattern } from "~/components/magicui/animated-grid-pattern";
import { landingNavConfig, landingNavItems } from "~/features/navigation/config/config";
import { UserStatus } from "~/features/auth/components/UserStatus";
import { HeroSection } from "~/features/landing/components/HeroSection";
import { BentoSection } from "~/features/landing/components/BentoSection";
import { BlogSection } from "~/features/landing/components/BlogSection";
import { CtaSection } from "~/features/landing/components/CtaSection";
import { FaqSection } from "~/features/landing/components/FaqSection";
import { PopularCities } from "~/features/landing/components/PopularCategories";
import { PopularCompanies } from "~/features/landing/components/PopularCompanies";
import { RecentJobs } from "~/features/landing/components/RecentJobs";
import CardNav from "~/features/navigation/components/CardNav";
import { popularCitiesQueryOptions } from "~/features/landing/api/cities/queries";
import { popularCompaniesQueryOptions } from "~/features/landing/api/companies/queries";
import { recentJobsQueryOptions } from "~/features/landing/api/jobs/queries";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    // Prefetch cities, jobs and companies data for SSR
    context.queryClient.prefetchQuery(popularCitiesQueryOptions());
    context.queryClient.prefetchQuery(recentJobsQueryOptions());
    context.queryClient.prefetchQuery(popularCompaniesQueryOptions());
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
          <Suspense fallback={<div className="py-12 text-center">Loading cities...</div>}>
            <PopularCities />
          </Suspense>
          <Suspense fallback={<div className="py-12 text-center">Loading companies...</div>}>
            <PopularCompanies />
          </Suspense>
          <Suspense fallback={<div className="py-12 text-center">Loading jobs...</div>}>
            <RecentJobs />
          </Suspense>
          <BentoSection />
          <BlogSection />
          <FaqSection />
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

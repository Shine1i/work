import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ThemeToggle } from "~/components/theme-toggle";
import { landingNavConfig, landingNavItems } from "~/config/navigation";
import { UserStatus } from "~/features/auth/UserStatus";
import { HeroSection } from "~/features/hero/HeroSection";
import CardNav from "~/features/navigation/CardNav";

export const Route = createFileRoute("/")({
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
  );
}

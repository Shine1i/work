import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { HeroSection } from "~/components/hero/HeroSection";
import { SignOutButton } from "~/components/sign-out-button";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import { Navbar } from "~/components/ui/navbar";
import { authQueryOptions } from "~/lib/auth/queries";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      {/* Landing hero */}
      <HeroSection />


      {/* Keep existing quick links / theme toggle + auth actions */}
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
            <UserAction />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function UserAction() {
  const { data: user } = useSuspenseQuery(authQueryOptions());

  return user ? (
    <div className="flex flex-col items-center gap-2">
      <p>Welcome back, {user.name}!</p>
      <Button type="button" asChild className="mb-2 w-fit" size="lg">
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>
      <div className="text-center text-xs sm:text-sm">
        Session user:
        <pre className="max-w-screen overflow-x-auto px-2 text-start">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <SignOutButton />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-2">
      <p>You are not signed in.</p>
      <Button type="button" asChild className="w-fit" size="lg">
        <Link to="/login">Log in</Link>
      </Button>
    </div>
  );
}

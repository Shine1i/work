import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "~/components/theme-toggle";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function Navbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-border/50 sticky top-0 z-40 w-full border-b bg-transparent",
        // blur only, no background fill
        "supports-[backdrop-filter]:backdrop-blur-sm",
        className,
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-extrabold tracking-tight">
            <span className="text-foreground">Job</span>
            <span className="text-primary">Pool</span>
          </Link>
          <div className="text-muted-foreground hidden items-center gap-4 text-sm sm:flex">
            <Link to="/" className="hover:text-foreground">
              Jobs
            </Link>
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground">
              How it works
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

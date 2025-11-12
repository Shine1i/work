import { AnimatedGridPattern } from "~/components/magicui/animated-grid-pattern";

export function HeroBackground() {
  return (
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
      {/* Overlay for contrast */}
      <div
        aria-hidden
        className="from-background/70 via-background/30 to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-b"
      />
    </div>
  );
}

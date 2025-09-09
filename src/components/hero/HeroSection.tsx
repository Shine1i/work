import { motion } from "motion/react";
import { Briefcase, GraduationCap, Gauge, Sparkles } from "lucide-react";

import { AnimatedGridPattern } from "~/components/magicui/animated-grid-pattern";
import { cn } from "~/lib/utils";
import { SearchForm } from "./SearchForm";
import { StatBadge } from "./StatBadge";
import { Highlighter } from "~/components/ui/highlighter";

export function HeroSection({ className }: { className?: string }) {
  const headlineId = "hero-title";

  return (
    <section className={cn("relative isolate overflow-hidden bg-background text-foreground h-dvh", className)}>
      {/* Background grid */}
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
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/80" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20">
        <div className="text-center">
          <motion.h1
            id={headlineId}
            className="text-balance font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            Beat the bots. Get hired faster.
          </motion.h1>

          <motion.p
            className="mx-auto mt-4 max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg md:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            The <Highlighter action="underline" color="#FF9800">biggest job pool</Highlighter> in one search.
            Built for starters — and we use AI to <Highlighter action="highlight" color="#87CEFA">write your CV</Highlighter> and apply.
          </motion.p>
        </div>

        <SearchForm labelledById={headlineId} className="mt-8 sm:mt-10" />

        {/* Mobile fallback: show a tidy grid below on small screens */}
        <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
          <StatBadge label="Total jobs" value="182,300" icon={<Briefcase className="size-4" />} />
          <StatBadge label="Entry-level" value="48,920" icon={<GraduationCap className="size-4" />} />
          <StatBadge label="AI classified" value="120,450" icon={<Sparkles className="size-4" />} />
          <StatBadge label="Avg stegEtt" value="0.73" icon={<Gauge className="size-4" />} />
        </div>
      </div>

      {/* Overlayed floating badges on md+ screens (anchored to section) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatBadge
            label="Total jobs"
            value="182,300"
            icon={<Briefcase className="size-4" />}
            positionClassName="top-24 left-4"
            delay={0.2}
          />
          <StatBadge
            label="Entry-level"
            value="48,920"
            icon={<GraduationCap className="size-4" />}
            positionClassName="top-24 right-4"
            delay={0.3}
          />
          <StatBadge
            label="AI classified"
            value="120,450"
            icon={<Sparkles className="size-4" />}
            positionClassName="top-[58%] left-6"
            delay={0.35}
          />
          <StatBadge
            label="Avg stegEtt score"
            value="0.73"
            icon={<Gauge className="size-4" />}
            positionClassName="top-[60%] right-6"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { forwardRef, useRef } from "react";
import { User, Search, Briefcase } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "~/utils";
import { AnimatedBeam } from "~/components/ui/animated-beam";
import { NumberTicker } from "~/components/ui/number-ticker";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-10 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// Smart Job Search - Animated Beam with Level Badges
export function SmartJobSearchContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10" />

      <div
        className="relative flex h-full w-full items-center justify-center p-4"
        ref={containerRef}
      >
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex flex-row items-center justify-between px-4">
            <Circle ref={userRef}>
              <User className="size-5" />
            </Circle>
            <Circle ref={searchRef}>
              <Search className="size-5" />
            </Circle>
            <Circle ref={jobsRef}>
              <Briefcase className="size-5" />
            </Circle>
          </div>

          {/* Badges positioned at bottom right */}
          <div className="flex justify-end">
            <div className="hidden flex-wrap justify-end gap-1.5 opacity-80 md:flex">
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400">
                Nybörjare
              </span>
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                Mellannivå
              </span>
              <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-400">
                Senior
              </span>
            </div>
          </div>
        </div>

        <AnimatedBeam
          duration={3}
          containerRef={containerRef}
          fromRef={userRef}
          toRef={searchRef}
          pathOpacity={0.15}
        />
        <AnimatedBeam
          duration={3}
          containerRef={containerRef}
          fromRef={searchRef}
          toRef={jobsRef}
          pathOpacity={0.15}
        />
      </div>
    </>
  );
}

// Resume Tools - Dual Border Beams
export function ResumeToolsContent() {
  return (
    <>
      {/* Tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 dark:from-orange-500/10 dark:to-red-500/10" />
      <AnimatedListDemo/>
    </>
  );
}

// Career Insights - Border Beam only
export function CareerInsightsContent() {
  return (
    <>
      {/* Tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10" />


    </>
  );
}

// 80,000+ Jobs - Border Beam with Counter
export function JobsDatabaseContent() {
  return (
    <>
      {/* Tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10" />

      <div className="relative flex h-full w-full items-center justify-center">
        <div className="hidden text-center opacity-70 sm:flex items-center md:block">

          <NumberTicker
            value={80000}
            startValue={40000}
            className="text-5xl font-bold text-blue-500/60 dark:text-cyan-500/60 lg:text-6xl"
          />
          <span className="text-5xl font-bold text-blue-500/60 dark:text-cyan-500/60 lg:text-6xl">+</span>
          <p className="mt-2 text-xs text-neutral-500/80 dark:text-neutral-400/80">Aktiva Jobb</p>
        </div>
      </div>
    </>
  );
}


interface Item {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

let resumeTools = [
  {
    name: "CV-Hjälpare",
    description: "Smart formatering & optimering",
    time: "Aktiv",
    icon: "📄",
    color: "#00C9A7",
  },
  {
    name: "CV-Byggare",
    description: "Professionella mallar",
    time: "Aktiv",
    icon: "✨",
    color: "#FFB800",
  },
  {
    name: "Jobbanpassning",
    description: "Anpassad till ansökan",
    time: "Aktiv",
    icon: "🎯",
    color: "#FF3D71",
  },
  {
    name: "ATS-Förbättrad",
    description: "AI-driven analys",
    time: "Aktiv",
    icon: "🤖",
    color: "#1E86FF",
  },
]

resumeTools = Array.from({ length: 10 }, () => resumeTools).flat()

const ResumeToolCard = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full min-w-[280px] max-w-[320px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-gradient-to-br from-orange-500/20 to-red-500/20 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-12 shrink-0 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-base font-semibold">{name}</span>
          </figcaption>
          <p className="text-xs font-normal dark:text-white/60 text-gray-600">
            {description}
          </p>
          <span className="text-[10px] text-green-600 dark:text-green-400 font-medium mt-0.5">{time}</span>
        </div>
      </div>
    </figure>
  )
}

export function AnimatedListDemo({
                                   className,
                                 }: {
  className?: string
}) {
  const [visibleCards, setVisibleCards] = React.useState([0, 1, 2]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        const next = [...prev];
        next.shift(); // Remove first card
        next.push((next[next.length - 1] + 1) % resumeTools.length); // Add new card at end
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-start justify-center overflow-hidden p-6 pt-8",
        className
      )}
    >
      <div className="flex flex-row gap-4 items-center">
        <AnimatePresence initial={false} mode="sync">
          {visibleCards.map((cardIndex) => (
            <motion.div
              key={resumeTools[cardIndex].name}
              layout
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 0.7, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.8 }}
              transition={{
                layout: { duration: 0.4, ease: "easeInOut" },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                x: { type: "spring", stiffness: 250, damping: 25 },
              }}
            >
              <ResumeToolCard {...resumeTools[cardIndex]} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}


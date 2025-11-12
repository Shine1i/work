"use client";

import { forwardRef, useRef } from "react";
import { User, Search, Briefcase } from "lucide-react";
import { cn } from "~/lib/utils";
import { AnimatedBeam } from "~/components/ui/animated-beam";
import { BorderBeam } from "~/components/ui/border-beam";

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
                Entry Level
              </span>
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                Mid Level
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

      <div className="opacity-50">
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-orange-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          className="from-transparent via-red-500 to-transparent"
        />
      </div>
    </>
  );
}

// Career Insights - Border Beam only
export function CareerInsightsContent() {
  return (
    <>
      {/* Tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10" />

      <div className="opacity-50">
        <BorderBeam
          duration={7}
          size={450}
          className="from-transparent via-green-500 to-transparent"
        />
      </div>
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
        <div className="hidden text-center opacity-70 md:block">
          <div className="text-5xl font-bold text-blue-500/60 dark:text-cyan-500/60 lg:text-6xl">
            80,000+
          </div>
          <p className="mt-2 text-xs text-neutral-500/80 dark:text-neutral-400/80">Active Jobs</p>
        </div>
        <div className="opacity-50">
          <BorderBeam
            duration={8}
            size={500}
            className="from-transparent via-blue-500 to-transparent"
          />
        </div>
      </div>
    </>
  );
}


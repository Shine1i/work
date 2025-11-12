import { heroStats } from "~/features/landing/config/stats.config";
import { StatBadge } from "./StatBadge";

export function HeroStats() {
  return (
    <>
      {/* Mobile fallback: show a tidy grid below on small screens */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:hidden">
        {heroStats.map((stat, idx) => (
          <StatBadge key={idx} label={stat.label} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Overlayed floating badges on md+ screens (anchored to section) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {heroStats.map((stat, idx) => (
            <StatBadge
              key={idx}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              positionClassName={stat.desktopPosition}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </>
  );
}

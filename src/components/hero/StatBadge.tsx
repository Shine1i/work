import { motion } from "motion/react";
import { type ReactNode } from "react";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

export type StatBadgeProps = {
  label: string;
  value?: string | number;
  icon?: ReactNode;
  positionClassName?: string;
  delay?: number;
  isLoading?: boolean;
  className?: string;
};

export function StatBadge({
  label,
  value,
  icon,
  positionClassName,
  delay = 0,
  isLoading = false,
  className,
}: StatBadgeProps) {
  return (
    <motion.div
      aria-label={`${label}: ${value ?? "loading"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={cn(
        "pointer-events-none select-none",
        // absolute placement on md+ screens only — on small screens it will stack naturally
        "md:pointer-events-auto md:absolute",
        positionClassName,
      )}
    >
      <motion.div
        // gentle float loop; disabled by prefers-reduced-motion automatically by motion
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <Card
          className={cn(
            // glassy surface
            "backdrop-blur-sm bg-background/60 dark:bg-background/40 border-border/50 shadow-sm",
            // compact layout
            "px-4 py-3 flex items-center gap-3 rounded-xl",
            // hover lift on md+
            "md:hover:shadow-md md:hover:-translate-y-0.5 transition",
            className,
          )}
        >
          {icon ? (
            <div
              aria-hidden
              className="bg-muted/40 text-foreground/80 flex size-8 items-center justify-center rounded-lg"
            >
              {icon}
            </div>
          ) : null}

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs leading-none">{label}</span>
            {isLoading ? (
              <Skeleton className="mt-1 h-5 w-24" />
            ) : (
              <span className="text-sm font-semibold leading-none mt-1">
                {value}
              </span>
            )}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

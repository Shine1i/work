import { type ReactNode } from "react";
import { cn } from "~/utils";

export function Highlighter({
  children,
  action = "underline",
  color = "#FF9800",
  className,
}: {
  children: ReactNode;
  action?: "underline" | "highlight";
  color?: string; // hex or css color
  className?: string;
}) {
  if (action === "highlight") {
    return (
      <span
        className={cn("rounded px-1.5 py-0.5", className)}
        style={{ backgroundColor: color }}
      >
        {children}
      </span>
    );
  }

  // underline
  return (
    <span
      className={cn("underline decoration-[0.2em] underline-offset-4", className)}
      style={{ textDecorationColor: color }}
    >
      {children}
    </span>
  );
}

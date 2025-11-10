import { Briefcase, Gauge, GraduationCap, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export interface StatData {
  label: string;
  value: string;
  icon: ReactNode;
  desktopPosition?: string;
  delay?: number;
}

export const heroStats: StatData[] = [
  {
    label: "Total jobs",
    value: "182,300",
    icon: <Briefcase className="size-4" />,
    desktopPosition: "top-40 left-4",
    delay: 0.2,
  },
  {
    label: "Entry-level",
    value: "48,920",
    icon: <GraduationCap className="size-4" />,
    desktopPosition: "top-40 right-4",
    delay: 0.3,
  },
  {
    label: "AI classified",
    value: "120,450",
    icon: <Sparkles className="size-4" />,
    desktopPosition: "top-[58%] left-6",
    delay: 0.35,
  },
  {
    label: "Avg stegEtt score",
    value: "0.73",
    icon: <Gauge className="size-4" />,
    desktopPosition: "top-[60%] right-6",
    delay: 0.4,
  },
];

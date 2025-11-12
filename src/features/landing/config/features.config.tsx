import {
  Briefcase,
  FileText,
  TrendingUp,
  Database,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  SmartJobSearchContent,
  ResumeToolsContent,
  CareerInsightsContent,
  JobsDatabaseContent,
} from "~/features/landing/components/BentoCardContent";

export interface FeatureCard {
  name: string;
  description: string;
  Icon: React.ElementType;
  background: ReactNode;
  href: string;
  cta: string;
  className: string;
  content?: ReactNode;
}

export const featureCards: FeatureCard[] = [
  {
    name: "Smart Job Search",
    description: "Find jobs that actually fit your skills and goals.",
    Icon: Briefcase,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
    ),
    href: "/jobs",
    cta: "Explore Jobs",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    content: <SmartJobSearchContent />,
  },
  {
    name: "Resume Tools",
    description: "Build a resume that stands out to employers.",
    Icon: FileText,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
    ),
    href: "/resume",
    cta: "Build Resume",
    className: "col-span-1",
    content: <ResumeToolsContent />,
  },
  {
    name: "Career Insights",
    description: "Get tips tailored to your career journey.",
    Icon: TrendingUp,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
    ),
    href: "/insights",
    cta: "View Insights",
    className: "col-span-1",
    content: <CareerInsightsContent />,
  },
  {
    name: "80,000+ Jobs",
    description: "Massive job database updated daily with fresh opportunities.",
    Icon: Database,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
    ),
    href: "/jobs",
    cta: "Browse All",
    className: "col-span-1 md:col-span-2",
    content: <JobsDatabaseContent />,
  },
];

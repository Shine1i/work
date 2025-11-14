import {
  Award,
  Briefcase,
  Database,
  FileText,
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
    name: "AI-Klassificerade Jobb",
    description: "Varje jobb klassificerat efter verklig nybörjarvänlighet – inte bara 'entry-level' i titeln.",
    Icon: Briefcase,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
    ),
    href: "/jobs",
    cta: "Utforska Jobb",
    className: "col-span-1 md:col-span-2 lg:col-span-2",
    content: <SmartJobSearchContent />,
  },
  {
    name: "CV-Optimering för ATS",
    description: "Anpassa ditt CV för att klara AI-screening och komma till mänskliga rekryterare.",
    Icon: FileText,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
    ),
    href: "/resume",
    cta: "Optimera CV",
    className: "col-span-1",
    content: <ResumeToolsContent />,
  },
  {
    name: "Ärlighetspoäng 1-10",
    description: "Se exakt hur nybörjarvänligt varje jobb är, inklusive dolda krav och erfarenhetskrav.",
    Icon: Award,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
    ),
    href: "/insights",
    cta: "Se Poäng",
    className: "col-span-1",
    content: <CareerInsightsContent />,
  },
  {
    name: "80 000+ Jobb Klassificerade",
    description: "Sveriges största jobbdatabas med ärlig AI-klassificering uppdaterad dagligen.",
    Icon: Database,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
    ),
    href: "/jobs",
    cta: "Bläddra Alla",
    className: "col-span-1 md:col-span-2",
    content: <JobsDatabaseContent />,
  },
];

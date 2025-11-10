import {
  Briefcase,
  FileText,
  TrendingUp,
  CheckSquare,
  GraduationCap,
  Building2,
} from "lucide-react";
import type { ReactNode } from "react";

export interface FeatureCard {
  name: string;
  description: string;
  Icon: React.ElementType;
  background: ReactNode;
  href: string;
  cta: string;
  className: string;
}

export const featureCards: FeatureCard[] = [
  {
    name: "Smart Job Search",
    description: "Search thousands of jobs with advanced filters for experience, location, and more.",
    Icon: Briefcase,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
    ),
    href: "/jobs",
    cta: "Explore Jobs",
    className: "col-span-1 md:col-span-2",
  },
  {
    name: "Resume Tools",
    description: "Build and optimize your resume with AI-powered suggestions.",
    Icon: FileText,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
    ),
    href: "/resume",
    cta: "Build Resume",
    className: "col-span-1",
  },
  {
    name: "Career Insights",
    description: "Get personalized career recommendations based on your skills and goals.",
    Icon: TrendingUp,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
    ),
    href: "/insights",
    cta: "View Insights",
    className: "col-span-1",
  },
  {
    name: "Application Tracking",
    description: "Track your applications and follow up at the right time.",
    Icon: CheckSquare,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
    ),
    href: "/tracking",
    cta: "Track Apps",
    className: "col-span-1 md:col-span-2",
  },
  {
    name: "Skill Development",
    description: "Identify skill gaps and find resources to level up your career.",
    Icon: GraduationCap,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20" />
    ),
    href: "/skills",
    cta: "Learn More",
    className: "col-span-1",
  },
  {
    name: "Company Reviews",
    description: "Read authentic reviews from employees and make informed decisions.",
    Icon: Building2,
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20" />
    ),
    href: "/reviews",
    cta: "Read Reviews",
    className: "col-span-1",
  },
];

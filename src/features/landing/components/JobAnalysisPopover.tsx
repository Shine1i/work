import {
  Award,
  Briefcase,
  Car,
  Clock,
  FileCheck,
  FileText,
  GraduationCap,
  Shield,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import type { Job } from "~/features/landing/api/jobs/queries";
import {
  formatExperienceLevel,
  formatExperienceYears,
  formatLocationFlexibility,
  getExperienceLevelColor,
  getSwedishApplicationProcessType,
} from "~/features/landing/utils/ai-classification";

interface JobAnalysisPopoverProps {
  job: Job;
}

interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  colorClass?: string;
}

function MetricItem({ icon, label, value, colorClass }: MetricItemProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-muted-foreground">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className={`truncate text-sm font-medium ${colorClass || ""}`}>{value}</p>
      </div>
    </div>
  );
}

function getScoreColor(score: number | null): string {
  if (!score) return "";
  if (score >= 7) return "text-green-600 dark:text-green-400";
  if (score >= 5) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function getYearsColor(min: number | null, max: number | null): string {
  const avgYears = min && max ? (min + max) / 2 : min || max || 0;
  if (avgYears <= 2) return "text-green-600 dark:text-green-400";
  if (avgYears <= 4) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function getExperienceLevelTextColor(level: string | null): string {
  const classes = getExperienceLevelColor(level);
  if (classes.includes("green")) return "text-green-600 dark:text-green-400";
  if (classes.includes("yellow")) return "text-yellow-600 dark:text-yellow-400";
  if (classes.includes("red")) return "text-red-600 dark:text-red-400";
  return "";
}

export function JobAnalysisPopover({ job }: JobAnalysisPopoverProps) {
  const score = job.entrylevelScore ? job.entrylevelScore.toFixed(1) : null;
  const scoreNum = job.entrylevelScore;
  const confidence = job.classificationConfidence
    ? Math.round(job.classificationConfidence * 100)
    : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1">
          Bedömning
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          {/* Gaming-style card with key metrics */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg border border-primary/20 p-4 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-3">
              {score !== null && (
                <MetricItem
                  icon={<Award className="size-4" />}
                  label="Nybörjarvänlig"
                  value={`${score}/10`}
                  colorClass={getScoreColor(scoreNum)}
                />
              )}
              {job.experienceLevel && (
                <MetricItem
                  icon={<Briefcase className="size-4" />}
                  label="Nivå"
                  value={formatExperienceLevel(job.experienceLevel)}
                  colorClass={getExperienceLevelTextColor(job.experienceLevel)}
                />
              )}
              {(job.requiredExperienceYearsMin !== null ||
                job.requiredExperienceYearsMax !== null) && (
                <MetricItem
                  icon={<Clock className="size-4" />}
                  label="Erfarenhet"
                  value={formatExperienceYears(
                    job.requiredExperienceYearsMin,
                    job.requiredExperienceYearsMax,
                  )}
                  colorClass={getYearsColor(job.requiredExperienceYearsMin, job.requiredExperienceYearsMax)}
                />
              )}
              {job.educationCanReplaceExperience !== null && (
                <MetricItem
                  icon={<GraduationCap className="size-4" />}
                  label="Utbildning"
                  value={job.educationCanReplaceExperience ? "Ersätter erfarenhet" : "Krävs ej"}
                />
              )}
              {job.requiresAssessment !== null && (
                <MetricItem
                  icon={<FileCheck className="size-4" />}
                  label="Test"
                  value={job.requiresAssessment ? "Ja" : "Nej"}
                />
              )}
              {job.requiresDriversLicense !== null && (
                <MetricItem
                  icon={<Car className="size-4" />}
                  label="Körkort"
                  value={job.requiresDriversLicense ? "Krävs" : "Krävs ej"}
                />
              )}
              {job.applicationProcessType && (
                <MetricItem
                  icon={<FileText className="size-4" />}
                  label="Ansökan"
                  value={getSwedishApplicationProcessType(job.applicationProcessType)}
                />
              )}
              {confidence !== null && (
                <MetricItem
                  icon={<Shield className="size-4" />}
                  label="Tillförlitlighet"
                  value={`${confidence}%`}
                />
              )}
            </div>
          </div>

          {/* Reasoning section */}
          {job.entrylevelReasoning && (
            <div>
              <h4 className="mb-2 text-sm font-semibold">Bedömning</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {job.entrylevelReasoning}
              </p>
            </div>
          )}

          {/* Implicit requirements */}
          {job.implicitRequirements && job.implicitRequirements.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold">Implicita krav</h4>
              <ul className="text-muted-foreground space-y-1 text-xs">
                {job.implicitRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 size-1 shrink-0 rounded-full bg-current" />
                    <span className="flex-1">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

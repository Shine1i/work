import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { Job } from "~/features/landing/api/jobs/queries";
import {
  formatExperienceLevel,
  formatLocationFlexibility,
  getExperienceLevelColor,
} from "~/features/landing/utils/ai-classification";
import { getSwedishEmploymentType } from "~/features/landing/utils/employment-type";
import { JobAnalysisPopover } from "./JobAnalysisPopover";

interface JobCardProps {
  job: Job;
}

function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "Nyligen";

  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Idag";
  if (diffInDays === 1) return "Igår";
  if (diffInDays < 7) return `${diffInDays} dagar sedan`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} veckor sedan`;
  return `${Math.floor(diffInDays / 30)} månader sedan`;
}

export function JobCard({ job }: JobCardProps) {
  const badges: React.ReactNode[] = [];

  if (job.experienceLevel) {
    const colorClasses = getExperienceLevelColor(job.experienceLevel);
    badges.push(
      <Badge key="experience" variant="outline" className={colorClasses}>
        {formatExperienceLevel(job.experienceLevel)}
      </Badge>,
    );
  }

  if (job.occupation) {
    badges.push(
      <Badge key="occupation" variant="secondary">
        {job.occupation}
      </Badge>,
    );
  }

  if (job.employmentType) {
    badges.push(
      <Badge key="employment" variant="outline">
        {getSwedishEmploymentType(job.employmentType)}
      </Badge>,
    );
  }

  if (job.locationFlexibility && job.locationFlexibility !== "unknown") {
    badges.push(
      <Badge key="location" variant="outline">
        {formatLocationFlexibility(job.locationFlexibility)}
      </Badge>,
    );
  }

  if (job.aiTags) {
    job.aiTags.slice(0, 2).forEach((tag: string, idx: number) => {
      badges.push(
        <Badge key={`tag-${idx}`} variant="outline" className="capitalize">
          {tag}
        </Badge>,
      );
    });
  }

  return (
    <Card className="relative h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
            {job.companyLogoUrl ? (
              <img
                src={job.companyLogoUrl}
                alt={job.companyName || "Company"}
                className="size-12 rounded-md object-contain"
              />
            ) : (
              <div className="bg-muted flex size-12 items-center justify-center rounded-md">
                <Briefcase className="text-muted-foreground size-6" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 font-semibold leading-tight">{job.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{job.companyName}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-0">
          {job.locationText && (
            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <MapPin className="size-4" />
              <span className="line-clamp-1">{job.locationText}</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">{badges.slice(0, 4)}</div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs" suppressHydrationWarning>
              {formatRelativeTime(job.publishedAt)}
            </span>
          </div>

          <div className="flex gap-2">
            <JobAnalysisPopover job={job} />
            <Button asChild size="sm" className="flex-1">
              <a href={job.applicationUrl || "#"} target="_blank" rel="noopener noreferrer">
                Ansök
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
  );
}

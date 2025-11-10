import { Briefcase, MapPin } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import type { Job } from "~/lib/jobs/queries";
import { ScoreIndicator } from "./ScoreIndicator";

interface JobCardProps {
  job: Job;
}

function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return "Recently";

  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}

function formatExperienceLevel(level: string | null): string {
  if (!level) return "Any";
  const map: Record<string, string> = {
    true_entry_level: "Entry Level",
    low_experience: "Junior",
    experience_required: "Experienced",
    internship: "Internship",
  };
  return map[level] || level;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <a
      href={job.applicationUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-transform hover:scale-[1.02]"
    >
      <Card className="relative h-full">
        {/* Score indicator in top right */}
        {job.stegettOverallScore && (
          <div className="absolute right-3 top-3 z-10">
            <ScoreIndicator score={job.stegettOverallScore} />
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start gap-3 pr-14">
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

          <div className="flex flex-wrap gap-2">
            {job.experienceLevel && (
              <Badge variant="secondary">{formatExperienceLevel(job.experienceLevel)}</Badge>
            )}
            {job.locationFlexibility && job.locationFlexibility !== "unknown" && (
              <Badge variant="outline">
                {job.locationFlexibility.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>
            )}
            {job.aiTags?.slice(0, 2).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-muted-foreground text-xs">
            <span suppressHydrationWarning>{formatRelativeTime(job.publishedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

import { useSuspenseQuery } from "@tanstack/react-query";
import { JobCard } from "~/features/jobs/JobCard";
import { recentJobsQueryOptions } from "~/lib/jobs/queries";

export function RecentJobs() {
  const { data: jobs } = useSuspenseQuery(recentJobsQueryOptions());

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Recent Entry-Level Jobs
          </h2>
          <p className="text-muted-foreground  mt-3 max-w-2xl text-base sm:text-lg">
            Hand-picked opportunities perfect for beginners
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(n+4)]:hidden lg:[&>*:nth-child(n+4)]:grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

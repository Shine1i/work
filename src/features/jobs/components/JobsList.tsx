import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { JobCard } from "~/features/landing/components/JobCard";
import type { SearchResponse } from "../types/search";

interface JobsListProps {
  data: SearchResponse;
}

export function JobsList({ data }: JobsListProps) {
  const { jobs, total, page, totalPages } = data;

  if (jobs.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <h3 className="text-lg font-semibold">No jobs found</h3>
        <p className="text-muted-foreground mt-2 text-sm">
          Try adjusting your filters or search query to see more results.
        </p>
      </div>
    );
  }

  // Calculate pagination range
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Jobs Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-muted-foreground text-sm">
            Showing {(page - 1) * data.perPage + 1}–{Math.min(page * data.perPage, total)} of {total} jobs
          </p>

          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <Button variant="outline" size="sm" asChild disabled={page === 1}>
              {page === 1 ? (
                <span className="cursor-not-allowed">
                  <ChevronLeft className="size-4" />
                  Prev
                </span>
              ) : (
                <Link
                  to="/jobs/search"
                  search={(prev) => ({
                    ...prev,
                    page: page - 1,
                  })}
                >
                  <ChevronLeft className="size-4" />
                  Prev
                </Link>
              )}
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((pageNum, idx) =>
                pageNum === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-sm">
                    ...
                  </span>
                ) : (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    size="sm"
                    asChild
                    className="min-w-[40px]"
                  >
                    <Link
                      to="/jobs/search"
                      search={(prev) => ({
                        ...prev,
                        page: pageNum as number,
                      })}
                    >
                      {pageNum}
                    </Link>
                  </Button>
                ),
              )}
            </div>

            {/* Next Button */}
            <Button variant="outline" size="sm" asChild disabled={page === totalPages}>
              {page === totalPages ? (
                <span className="cursor-not-allowed">
                  Next
                  <ChevronRight className="size-4" />
                </span>
              ) : (
                <Link
                  to="/jobs/search"
                  search={(prev) => ({
                    ...prev,
                    page: page + 1,
                  })}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Link>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

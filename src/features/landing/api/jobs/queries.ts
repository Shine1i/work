import { queryOptions } from "@tanstack/react-query";
import { $getRecentFriendlyJobs } from "./server-functions";

export const recentJobsQueryOptions = () =>
  queryOptions({
    queryKey: ["jobs", "recent", "friendly"],
    queryFn: ({ signal }) => $getRecentFriendlyJobs({ signal }),
  });

export type RecentJobsResult = Awaited<ReturnType<typeof $getRecentFriendlyJobs>>;
export type Job = RecentJobsResult[number];

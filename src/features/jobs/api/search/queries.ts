import { queryOptions } from "@tanstack/react-query";
import type { SearchParams } from "../../types/search";
import { $searchJobs } from "./server-functions";

export const searchJobsQueryOptions = (params: SearchParams) =>
  queryOptions({
    queryKey: ["jobs", "search", params],
    queryFn: ({ signal }) => $searchJobs({ data: params, signal }),
    staleTime: 30000, // 30 seconds
  });

export type SearchJobsResult = Awaited<ReturnType<typeof $searchJobs>>;

import { queryOptions } from "@tanstack/react-query";
import { $getAllAiTags } from "./server-functions";

export const allAiTagsQueryOptions = () =>
  queryOptions({
    queryKey: ["ai-tags", "all"],
    queryFn: () => $getAllAiTags(),
    staleTime: 1000 * 60 * 60, // 1 hour - tags don't change often
  });

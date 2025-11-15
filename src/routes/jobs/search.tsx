import { createFileRoute } from "@tanstack/react-router";
import { SearchResults } from "~/features/jobs/components/SearchResults";
import { searchParamsSchema } from "~/features/jobs/types/search";
import { $searchJobs } from "~/features/jobs/api/search/server-functions";

export const Route = createFileRoute("/jobs/search")({
  validateSearch: searchParamsSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const data = await $searchJobs({ data: deps });
    return data;
  },
  component: SearchPage,
});

function SearchPage() {
  const data = Route.useLoaderData();
  const params = Route.useSearch();

  return <SearchResults data={data} params={params} />;
}

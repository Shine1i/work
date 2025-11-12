import { queryOptions } from "@tanstack/react-query";
import { $getPopularCompanies } from "./functions";

export const popularCompaniesQueryOptions = () =>
  queryOptions({
    queryKey: ["companies", "popular"],
    queryFn: ({ signal }) => $getPopularCompanies({ signal }),
  });

export type PopularCompaniesResult = Awaited<ReturnType<typeof $getPopularCompanies>>;
export type PopularCompany = PopularCompaniesResult[number];

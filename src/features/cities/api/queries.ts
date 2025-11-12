import { queryOptions } from "@tanstack/react-query";
import { $getPopularCities } from "./server-functions";

export const popularCitiesQueryOptions = () =>
  queryOptions({
    queryKey: ["cities", "popular"],
    queryFn: ({ signal }) => $getPopularCities({ signal }),
  });

export type PopularCitiesResult = Awaited<ReturnType<typeof $getPopularCities>>;
export type PopularCity = PopularCitiesResult[number];

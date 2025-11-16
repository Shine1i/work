import { SlidersHorizontal } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import type { SearchParams, SearchResponse } from "../types/search";
import { JobSearchBar } from "./JobSearchBar";
import { JobsList } from "./JobsList";
import { SearchFilters } from "./SearchFilters";

interface SearchResultsProps {
  data: SearchResponse;
  params: SearchParams;
}

export function SearchResults({ data, params }: SearchResultsProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Partial<SearchParams>>({});

  // Callback to update filters from sidebar
  const handleFiltersChange = useCallback((filters: Partial<SearchParams>) => {
    setCurrentFilters(filters);
  }, []);

  return (
    <div className="container  mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Bar */}
      <div className="mb-6">
        <JobSearchBar
          initialValues={{
            q: params.q,
            location: params.location,
            experience_level: params.experience_level,
          }}
          currentFilters={currentFilters}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden w-full lg:block lg:w-64 lg:flex-shrink-0">
          <div className="sticky top-4">
            <SearchFilters initialParams={params} onFiltersChange={handleFiltersChange} />
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="mr-2 size-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your job search with filters</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <SearchFilters initialParams={params} onFiltersChange={handleFiltersChange} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {/* Results Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Job Search</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {data.total.toLocaleString()} {data.total === 1 ? "job" : "jobs"} found
              </p>
            </div>

            {/* Sort Dropdown - Placeholder for future */}
            <Select defaultValue="newest">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="score">Entry Level Score</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jobs List with Pagination */}
          <JobsList data={data} />
        </main>
      </div>
    </div>
  );
}

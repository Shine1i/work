import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { type FormEvent } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { SearchParams } from "../types/search";

interface JobSearchBarProps {
  initialValues?: Partial<SearchParams>;
  currentFilters?: Partial<SearchParams>;
}

export function JobSearchBar({ initialValues = {}, currentFilters = {} }: JobSearchBarProps) {
  const navigate = useNavigate();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Get search bar values
    const q = formData.get("q") as string;
    const location = formData.get("location") as string;

    // Merge with current sidebar filters
    const searchParams: any = {
      ...currentFilters,
      page: 1, // Reset to first page
    };

    // Add search bar values if not empty
    if (q && q.trim()) searchParams.q = q.trim();
    if (location && location.trim()) searchParams.location = location.trim();

    // Navigate with combined params
    navigate({
      to: "/jobs/search",
      search: searchParams,
    });
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col items-stretch gap-2 md:flex-row">
            {/* Keyword */}
            <div className="relative min-w-0 flex-1">
              <label htmlFor="q" className="sr-only">
                Job title or keyword
              </label>
              <Search
                aria-hidden
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <Input
                id="q"
                name="q"
                placeholder="Job title, company, skills..."
                defaultValue={initialValues.q || ""}
                autoComplete="off"
                className="h-11 rounded-md bg-transparent pl-9"
              />
            </div>

            <div className="bg-border hidden w-px self-stretch md:block" />

            {/* Location */}
            <div className="relative min-w-0 flex-1">
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <MapPin
                aria-hidden
                className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <Input
                id="location"
                name="location"
                placeholder="City, region, or remote"
                defaultValue={initialValues.location || ""}
                autoComplete="off"
                className="h-11 rounded-md bg-transparent pl-9"
              />
            </div>

            {/* Search Button */}
            <Button type="submit" className="h-11 md:w-auto">
              <Search className="mr-2 size-4" />
              Search
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

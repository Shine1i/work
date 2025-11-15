import { useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { SearchParams } from "../types/search";

interface SearchFiltersProps {
  params: SearchParams;
}

export function SearchFilters({ params }: SearchFiltersProps) {
  const navigate = useNavigate();

  const updateFilter = (key: keyof SearchParams, value: string | number | boolean | undefined) => {
    // Convert "any" to undefined to remove filter
    const filterValue = value === "any" ? undefined : value;

    navigate({
      to: "/jobs/search",
      search: (prev) => ({
        ...prev,
        [key]: filterValue,
        page: 1, // Reset to first page on filter change
      }),
    });
  };

  const clearFilters = () => {
    navigate({
      to: "/jobs/search",
      search: { page: 1 },
    });
  };

  const hasActiveFilters = Object.keys(params).some(
    (key) => key !== "page" && params[key as keyof SearchParams] !== undefined,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <SlidersHorizontal className="size-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-1 size-4" />
            Clear All
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["employment", "experience", "location"]} className="w-full">
        {/* Employment Type */}
        <AccordionItem value="employment">
          <AccordionTrigger>Employment Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={params.employment_type || "any"}
                onValueChange={(value) => updateFilter("employment_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Level */}
        <AccordionItem value="experience">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={params.experience_level || "any"}
                onValueChange={(value) => updateFilter("experience_level", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="true_entry_level">True Entry Level</SelectItem>
                  <SelectItem value="low_experience">Low Experience</SelectItem>
                  <SelectItem value="experience_required">Experience Required</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location Flexibility */}
        <AccordionItem value="location">
          <AccordionTrigger>Work Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={params.location_flexibility || "any"}
                onValueChange={(value) => updateFilter("location_flexibility", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="on_site_only">On-site Only</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="full_remote">Full Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Application Type */}
        <AccordionItem value="application">
          <AccordionTrigger>Application Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={params.application_process_type || "any"}
                onValueChange={(value) => updateFilter("application_process_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="quick_apply">Quick Apply</SelectItem>
                  <SelectItem value="standard_ats">Standard ATS</SelectItem>
                  <SelectItem value="complex_ats">Complex ATS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Salary Range */}
        <AccordionItem value="salary">
          <AccordionTrigger>Salary Range (SEK)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div>
                <Label htmlFor="salary_min" className="text-sm">
                  Min
                </Label>
                <Input
                  id="salary_min"
                  type="number"
                  placeholder="0"
                  value={params.salary_min || ""}
                  onChange={(e) =>
                    updateFilter("salary_min", e.target.value ? Number(e.target.value) : undefined)
                  }
                />
              </div>
              <div>
                <Label htmlFor="salary_max" className="text-sm">
                  Max
                </Label>
                <Input
                  id="salary_max"
                  type="number"
                  placeholder="100000"
                  value={params.salary_max || ""}
                  onChange={(e) =>
                    updateFilter("salary_max", e.target.value ? Number(e.target.value) : undefined)
                  }
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Entry Level Score */}
        <AccordionItem value="score">
          <AccordionTrigger>Min. Entry Level Score</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Input
                type="number"
                min="0"
                max="1"
                step="0.1"
                placeholder="0.5"
                value={params.entrylevel_score_min || ""}
                onChange={(e) =>
                  updateFilter("entrylevel_score_min", e.target.value ? Number(e.target.value) : undefined)
                }
              />
              <p className="text-muted-foreground text-xs">Score between 0 and 1 (higher is better)</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Max Experience Required */}
        <AccordionItem value="exp_years">
          <AccordionTrigger>Max. Years Experience</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Input
                type="number"
                min="0"
                placeholder="2"
                value={params.experience_years_max || ""}
                onChange={(e) =>
                  updateFilter("experience_years_max", e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Filters */}
        <AccordionItem value="additional">
          <AccordionTrigger>Additional Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="education_replaces"
                  checked={params.education_replaces_experience || false}
                  onCheckedChange={(checked: boolean) =>
                    updateFilter("education_replaces_experience", checked === true ? true : undefined)
                  }
                />
                <Label htmlFor="education_replaces" className="cursor-pointer text-sm font-normal">
                  Education can replace experience
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no_assessment"
                  checked={params.no_assessment || false}
                  onCheckedChange={(checked: boolean) =>
                    updateFilter("no_assessment", checked === true ? true : undefined)
                  }
                />
                <Label htmlFor="no_assessment" className="cursor-pointer text-sm font-normal">
                  No assessment required
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no_license"
                  checked={params.no_drivers_license || false}
                  onCheckedChange={(checked: boolean) =>
                    updateFilter("no_drivers_license", checked === true ? true : undefined)
                  }
                />
                <Label htmlFor="no_license" className="cursor-pointer text-sm font-normal">
                  No driver's license required
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

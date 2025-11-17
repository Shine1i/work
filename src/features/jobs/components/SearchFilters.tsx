import { useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect } from "react";
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
  initialParams: SearchParams;
  onFiltersChange: (filters: Partial<SearchParams>) => void;
}

export function SearchFilters({ initialParams, onFiltersChange }: SearchFiltersProps) {
  const navigate = useNavigate();

  // Local state for filters (doesn't trigger navigation)
  const [filters, setFilters] = useState<Partial<SearchParams>>({
    employment_type: initialParams.employment_type,
    experience_level: initialParams.experience_level,
    location_flexibility: initialParams.location_flexibility,
    application_process_type: initialParams.application_process_type,
    salary_min: initialParams.salary_min,
    salary_max: initialParams.salary_max,
    entrylevel_score_min: initialParams.entrylevel_score_min,
    experience_years_max: initialParams.experience_years_max,
    education_replaces_experience: initialParams.education_replaces_experience,
    no_assessment: initialParams.no_assessment,
    no_drivers_license: initialParams.no_drivers_license,
  });

  // Update parent when filters change
  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = (key: keyof SearchParams, value: string | number | boolean | undefined) => {
    // Convert "any" to undefined to remove filter
    const filterValue = value === "any" ? undefined : value;

    setFilters((prev) => ({
      ...prev,
      [key]: filterValue,
    }));
  };

  const clearFilters = () => {
    // Navigate immediately with cleared filters
    navigate({
      to: "/jobs/search",
      search: { page: 1 },
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== undefined);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <SlidersHorizontal className="size-5" />
          Filter
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="mr-1 size-4" />
            Rensa alla
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["employment", "experience", "location"]} className="w-full">
        {/* Employment Type */}
        <AccordionItem value="employment">
          <AccordionTrigger>Anställningstyp</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={filters.employment_type || "any"}
                onValueChange={(value) => updateFilter("employment_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Alla</SelectItem>
                  <SelectItem value="full_time">Heltid</SelectItem>
                  <SelectItem value="part_time">Deltid</SelectItem>
                  <SelectItem value="contract">Konsult</SelectItem>
                  <SelectItem value="internship">Praktik</SelectItem>
                  <SelectItem value="temporary">Tillfällig</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience Level */}
        <AccordionItem value="experience">
          <AccordionTrigger>Erfarenhetsnivå</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={filters.experience_level || "any"}
                onValueChange={(value) => updateFilter("experience_level", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Alla</SelectItem>
                  <SelectItem value="true_entry_level">Verklig nybörjarnivå</SelectItem>
                  <SelectItem value="low_experience">Låg erfarenhet</SelectItem>
                  <SelectItem value="experience_required">Erfarenhet krävs</SelectItem>
                  <SelectItem value="internship">Praktik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Location Flexibility */}
        <AccordionItem value="location">
          <AccordionTrigger>Arbetsplats</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={filters.location_flexibility || "any"}
                onValueChange={(value) => updateFilter("location_flexibility", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Alla</SelectItem>
                  <SelectItem value="on_site_only">Endast på plats</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="full_remote">Helt fjärr</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Application Type */}
        <AccordionItem value="application">
          <AccordionTrigger>Ansökningstyp</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Select
                value={filters.application_process_type || "any"}
                onValueChange={(value) => updateFilter("application_process_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alla" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Alla</SelectItem>
                  <SelectItem value="quick_apply">Snabb ansökan</SelectItem>
                  <SelectItem value="standard_ats">Standard ATS</SelectItem>
                  <SelectItem value="complex_ats">Komplex ATS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Salary Range */}
        <AccordionItem value="salary">
          <AccordionTrigger>Löneintervall (SEK)</AccordionTrigger>
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
                  value={filters.salary_min || ""}
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
                  value={filters.salary_max || ""}
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
          <AccordionTrigger>Min. nybörjarpoäng</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Input
                type="number"
                min="0"
                max="10"
                step="0.5"
                placeholder="5"
                value={filters.entrylevel_score_min || ""}
                onChange={(e) =>
                  updateFilter("entrylevel_score_min", e.target.value ? Number(e.target.value) : undefined)
                }
              />
              <p className="text-muted-foreground text-xs">Poäng mellan 0 och 10 (högre är bättre)</p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Max Experience Required */}
        <AccordionItem value="exp_years">
          <AccordionTrigger>Max antal års erfarenhet</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Input
                type="number"
                min="0"
                placeholder="2"
                value={filters.experience_years_max || ""}
                onChange={(e) =>
                  updateFilter("experience_years_max", e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Filters */}
        <AccordionItem value="additional">
          <AccordionTrigger>Ytterligare filter</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="education_replaces"
                  checked={filters.education_replaces_experience || false}
                  onCheckedChange={(checked: boolean) =>
                    updateFilter("education_replaces_experience", checked === true ? true : undefined)
                  }
                />
                <Label htmlFor="education_replaces" className="cursor-pointer text-sm font-normal">
                  Utbildning kan ersätta erfarenhet
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no_assessment"
                  checked={filters.no_assessment || false}
                  onCheckedChange={(checked: boolean) =>
                    updateFilter("no_assessment", checked === true ? true : undefined)
                  }
                />
                <Label htmlFor="no_assessment" className="cursor-pointer text-sm font-normal">
                  Ingen bedömning krävs
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no_license"
                  checked={filters.no_drivers_license || false}
                  onCheckedChange={(checked: boolean) =>
                    updateFilter("no_drivers_license", checked === true ? true : undefined)
                  }
                />
                <Label htmlFor="no_license" className="cursor-pointer text-sm font-normal">
                  Inget körkort krävs
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

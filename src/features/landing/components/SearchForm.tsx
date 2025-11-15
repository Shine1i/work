import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";

import { PulsatingButton } from "~/components/magicui/pulsating-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/utils";

export type SearchFormValues = {
  q?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  required_experience_years_min?: string;
  company?: string;
  occupation?: string;
  location_flexibility?: string;
  application_process_type?: string;
  ai_tags?: string;
  entrylevel_score_min?: string;
};

interface FilterState {
  employmentType: string;
  experienceLevel: string;
  locationFlexibility: string;
  applicationProcessType: string;
}

export function SearchForm({
  className,
  labelledById,
}: {
  className?: string;
  labelledById?: string;
}) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    employmentType: "any",
    experienceLevel: "any",
    locationFlexibility: "any",
    applicationProcessType: "any",
  });

  const updateFilter = <K extends keyof FilterState>(key: K, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: SearchFormValues = Object.fromEntries(
      Array.from(fd.entries()).map(([k, v]) => [k, String(v)]),
    ) as SearchFormValues;

    // include controlled selects
    payload.employment_type = filters.employmentType !== "any" ? filters.employmentType : undefined;
    payload.experience_level = filters.experienceLevel !== "any" ? filters.experienceLevel : undefined;
    payload.location_flexibility = filters.locationFlexibility !== "any" ? filters.locationFlexibility : undefined;
    payload.application_process_type = filters.applicationProcessType !== "any" ? filters.applicationProcessType : undefined;

    // Remove empty values and prepare search params
    const searchParams = Object.fromEntries(
      Object.entries(payload).filter(([_, v]) => v !== undefined && v !== ""),
    ) as Record<string, string>;

    // Navigate to search page with filters
    navigate({
      to: "/jobs/search",
      search: { ...searchParams, page: 1 } as any,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(className)}
    >
      <Card className="bg-background/70 dark:bg-background/50 mx-auto w-full max-w-5xl rounded-2xl border shadow-sm backdrop-blur-sm">
        <CardContent className="p-4 sm:px-6">
          <form
            role="search"
            aria-labelledby={labelledById}
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            {/* Primary row: compact pill with separators and icons */}
            <div className="flex flex-col gap-3">
              <div className="bg-background/80 dark:bg-background/50 flex flex-col rounded-xl items-stretch gap-2  border-2 border-border/60 p-2 shadow-sm md:flex-row md:rounded-sm md:p-1.5">
                {/* Keyword */}
                <div className="relative min-w-0 flex-1">
                  <label htmlFor="q" className="sr-only">
                    Jobbtitel eller sökord
                  </label>
                  <Search
                    aria-hidden
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />
                  <Input
                    id="q"
                    name="q"
                    placeholder="Jobbtitel, företag, färdigheter..."
                    autoComplete="off"
                    className="h-12 rounded-md border-border/50 bg-transparent pl-9 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="bg-border hidden w-px self-stretch md:block" />

                {/* Location */}
                <div className="relative min-w-0 flex-1">
                  <label htmlFor="location" className="sr-only">
                    Plats
                  </label>
                  <MapPin
                    aria-hidden
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  />
                  <Input
                    id="location"
                    name="location"
                    placeholder="Stad, region eller distans"
                    autoComplete="off"
                    className="h-12 rounded-md border-border/50 bg-transparent pl-9 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="bg-border hidden w-px self-stretch md:block" />

                {/* Experience Level */}
                <div className="w-full min-w-0 md:w-[220px] md:flex-none">
                  <label className="sr-only">Erfarenhetsnivå</label>
                  <Select value={filters.experienceLevel} onValueChange={(v) => updateFilter("experienceLevel", v)}>
                    <SelectTrigger
                      aria-label="Erfarenhetsnivå"
                      className="!h-12 w-full justify-between rounded-md border-border/50 bg-transparent px-4 py-0 text-base focus:ring-1 focus:ring-ring md:text-sm"
                    >
                      <SelectValue placeholder="Alla nivåer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Alla nivåer</SelectItem>
                      <SelectItem value="true_entry_level">Nybörjare</SelectItem>
                      <SelectItem value="low_experience">Junior</SelectItem>
                      <SelectItem value="experience_required">Erfaren</SelectItem>
                      <SelectItem value="internship">Praktik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <PulsatingButton
                  type="submit"
                  aria-label="Sök jobb"
                  className="h-12 w-full justify-center rounded-md px-6 md:w-auto"
                >
                  <div className="inline-flex items-center gap-2">
                    <Search className="size-4" />
                    Sök
                  </div>
                </PulsatingButton>
              </div>
            </div>

            {/* More filters */}
            <Accordion type="single" collapsible>
              <AccordionItem value="more">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <SlidersHorizontal className="size-4" /> Fler filter
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Employment Type */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Anställningstyp
                      </label>
                      <Select value={filters.employmentType} onValueChange={(v) => updateFilter("employmentType", v)}>
                        <SelectTrigger aria-label="Anställningstyp" className="h-10 border-border/60">
                          <SelectValue placeholder="Alla" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Alla</SelectItem>
                          <SelectItem value="full_time">Heltid</SelectItem>
                          <SelectItem value="part_time">Deltid</SelectItem>
                          <SelectItem value="contract">Konsult</SelectItem>
                          <SelectItem value="internship">Praktik</SelectItem>
                          <SelectItem value="temporary">Timanställning</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="employment_type" value={filters.employmentType} />
                    </div>

                    {/* Location Flexibility */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Arbetsplats
                      </label>
                      <Select value={filters.locationFlexibility} onValueChange={(v) => updateFilter("locationFlexibility", v)}>
                        <SelectTrigger aria-label="Arbetsplats" className="h-10 border-border/60">
                          <SelectValue placeholder="Alla" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Alla</SelectItem>
                          <SelectItem value="on_site_only">På plats</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="full_remote">Distans</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="location_flexibility" value={filters.locationFlexibility} />
                    </div>

                    {/* Application Process Type */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Ansökningstyp
                      </label>
                      <Select value={filters.applicationProcessType} onValueChange={(v) => updateFilter("applicationProcessType", v)}>
                        <SelectTrigger aria-label="Ansökningstyp" className="h-10 border-border/60">
                          <SelectValue placeholder="Alla" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Alla</SelectItem>
                          <SelectItem value="quick_apply">Snabbansökan</SelectItem>
                          <SelectItem value="standard_ats">Standard ATS</SelectItem>
                          <SelectItem value="complex_ats">Komplex ATS</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="application_process_type" value={filters.applicationProcessType} />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label htmlFor="company" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Företagsnamn
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="t.ex. Spotify, H&M"
                        className="h-10 border-border/60"
                      />
                    </div>

                    {/* Occupation */}
                    <div>
                      <label htmlFor="occupation" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Yrke
                      </label>
                      <Input
                        id="occupation"
                        name="occupation"
                        placeholder="t.ex. Utvecklare, Designer"
                        className="h-10 border-border/60"
                      />
                    </div>

                    {/* Min Years Experience */}
                    <div>
                      <label htmlFor="required_experience_years_min" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Min. antal års erfarenhet
                      </label>
                      <Input
                        id="required_experience_years_min"
                        name="required_experience_years_min"
                        type="number"
                        min={0}
                        step={1}
                        placeholder="0"
                        className="h-10 border-border/60"
                      />
                    </div>

                    {/* AI Tags */}
                    <div>
                      <label htmlFor="ai_tags" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        AI-taggar
                      </label>
                      <Input
                        id="ai_tags"
                        name="ai_tags"
                        placeholder="t.ex. junior, nybörjare"
                        className="h-10 border-border/60"
                      />
                    </div>

                    {/* Entry-level Score */}
                    <div>
                      <label htmlFor="entrylevel_score" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Min. nybörjarpoäng (1–10)
                      </label>
                      <Input
                        id="entrylevel_score"
                        name="entrylevel_score_min"
                        type="number"
                        min={1}
                        max={10}
                        step={0.1}
                        placeholder="5"
                        className="h-10 border-border/60"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

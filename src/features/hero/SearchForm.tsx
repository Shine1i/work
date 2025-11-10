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
import { cn } from "~/lib/utils";

export type SearchFormValues = {
  q?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  required_experience_years_min?: string;
  company?: string;
  occupation?: string;
  location_flexibility?: string;
  company_size?: string;
  language_level?: string;
  application_process_type?: string;
  growth_potential?: string;
  ai_tags?: string;
  stegett_overall_score_min?: string;
};

interface FilterState {
  employmentType: string;
  experienceLevel: string;
  companySize: string;
  locationFlexibility: string;
  languageLevel: string;
  applicationProcessType: string;
  growthPotential: string;
}

export function SearchForm({
  className,
  labelledById,
}: {
  className?: string;
  labelledById?: string;
}) {
  const [filters, setFilters] = useState<FilterState>({
    employmentType: "any",
    experienceLevel: "any",
    companySize: "any",
    locationFlexibility: "any",
    languageLevel: "any",
    applicationProcessType: "any",
    growthPotential: "any",
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
    payload.employment_type = filters.employmentType;
    payload.experience_level = filters.experienceLevel;
    payload.company_size = filters.companySize;
    payload.location_flexibility = filters.locationFlexibility;
    payload.language_level = filters.languageLevel;
    payload.application_process_type = filters.applicationProcessType;
    payload.growth_potential = filters.growthPotential;

    // UI only for now
    console.log("searchFormSubmit", payload);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(className)}
    >
      <Card className="bg-background/70 dark:bg-background/50 mx-auto w-full max-w-5xl rounded-2xl border shadow-sm backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <form
            role="search"
            aria-labelledby={labelledById}
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            {/* Primary row: compact pill with separators and icons */}
            <div className="flex flex-col gap-3">
              <div className="bg-background/80 dark:bg-background/50 flex flex-col items-stretch gap-2 rounded-xl border-2 border-border/60 p-2 shadow-sm md:flex-row md:rounded-full md:p-1.5">
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
                    placeholder="Job title or keyword"
                    autoComplete="off"
                    className="h-12 rounded-full border-border/50 bg-transparent pl-9 focus-visible:ring-1 focus-visible:ring-ring"
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
                    placeholder="City, country, or remote"
                    autoComplete="off"
                    className="h-12 rounded-full border-border/50 bg-transparent pl-9 focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="bg-border hidden w-px self-stretch md:block" />

                {/* Experience Level */}
                <div className="w-full min-w-0 md:w-[220px] md:flex-none">
                  <label className="sr-only">Experience level</label>
                  <Select value={filters.experienceLevel} onValueChange={(v) => updateFilter("experienceLevel", v)}>
                    <SelectTrigger
                      aria-label="Experience level"
                      className="!h-12 w-full justify-between rounded-full border-border/50 bg-transparent px-4 py-0 text-base focus:ring-1 focus:ring-ring md:text-sm"
                    >
                      <SelectValue placeholder="Any level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any level</SelectItem>
                      <SelectItem value="true_entry_level">True entry level</SelectItem>
                      <SelectItem value="low_experience">Low experience</SelectItem>
                      <SelectItem value="experience_required">Experience required</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <PulsatingButton
                  type="submit"
                  aria-label="Search jobs"
                  className="h-12 w-full justify-center rounded-full px-6 md:w-auto"
                >
                  <div className="inline-flex items-center gap-2">
                    <Search className="size-4" />
                    Search
                  </div>
                </PulsatingButton>
              </div>
            </div>

            {/* More filters */}
            <Accordion type="single" collapsible>
              <AccordionItem value="more">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <SlidersHorizontal className="size-4" /> More filters
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Employment Type */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Employment type
                      </label>
                      <Select value={filters.employmentType} onValueChange={(v) => updateFilter("employmentType", v)}>
                        <SelectTrigger aria-label="Employment type" className="h-10 border-border/60">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="full_time">Full-time</SelectItem>
                          <SelectItem value="part_time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="employment_type" value={filters.employmentType} />
                    </div>

                    {/* Location Flexibility */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Work location
                      </label>
                      <Select value={filters.locationFlexibility} onValueChange={(v) => updateFilter("locationFlexibility", v)}>
                        <SelectTrigger aria-label="Location flexibility" className="h-10 border-border/60">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="on_site_only">On-site only</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="full_remote">Full remote</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="location_flexibility" value={filters.locationFlexibility} />
                    </div>

                    {/* Company Size */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Company size
                      </label>
                      <Select value={filters.companySize} onValueChange={(v) => updateFilter("companySize", v)}>
                        <SelectTrigger aria-label="Company size" className="h-10 border-border/60">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="startup">Startup</SelectItem>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="company_size" value={filters.companySize} />
                    </div>

                    {/* Language Level */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Language requirement
                      </label>
                      <Select value={filters.languageLevel} onValueChange={(v) => updateFilter("languageLevel", v)}>
                        <SelectTrigger aria-label="Language level" className="h-10 border-border/60">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="english_sufficient">English sufficient</SelectItem>
                          <SelectItem value="swedish_required">Swedish required</SelectItem>
                          <SelectItem value="bilingual_preferred">Bilingual preferred</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="language_level" value={filters.languageLevel} />
                    </div>

                    {/* Application Process Type */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Application type
                      </label>
                      <Select value={filters.applicationProcessType} onValueChange={(v) => updateFilter("applicationProcessType", v)}>
                        <SelectTrigger aria-label="Application process type" className="h-10 border-border/60">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="quick_apply">Quick apply</SelectItem>
                          <SelectItem value="standard_ats">Standard ATS</SelectItem>
                          <SelectItem value="complex_ats">Complex ATS</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="application_process_type" value={filters.applicationProcessType} />
                    </div>

                    {/* Growth Potential */}
                    <div>
                      <label className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Growth potential
                      </label>
                      <Select value={filters.growthPotential} onValueChange={(v) => updateFilter("growthPotential", v)}>
                        <SelectTrigger aria-label="Growth potential" className="h-10 border-border/60">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="growth_potential" value={filters.growthPotential} />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label htmlFor="company" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Company name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="e.g. Google, Spotify"
                        className="h-10 border-border/60"
                      />
                    </div>

                    {/* Occupation */}
                    <div>
                      <label htmlFor="occupation" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Occupation
                      </label>
                      <Input
                        id="occupation"
                        name="occupation"
                        placeholder="e.g. Developer, Designer"
                        className="h-10 border-border/60"
                      />
                    </div>

                    {/* Min Years Experience */}
                    <div>
                      <label htmlFor="required_experience_years_min" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Min. years experience
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
                        AI tags
                      </label>
                      <Input
                        id="ai_tags"
                        name="ai_tags"
                        placeholder="e.g. junior, entry"
                        className="h-10 border-border/60"
                      />
                    </div>

                    {/* StegEtt Score */}
                    <div>
                      <label htmlFor="steg_score" className="text-muted-foreground mb-1.5 block text-sm font-medium">
                        Min. stegEtt score (0–1)
                      </label>
                      <Input
                        id="steg_score"
                        name="stegEtt_overall_score_min"
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                        placeholder="0.5"
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

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";

import { PulsatingButton } from "~/components/magicui/pulsating-button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { cn } from "~/lib/utils";

export type SearchFormValues = {
  q?: string;
  location?: string;
  employment_type?: string;
  experience_level?: string;
  required_experience_years_min?: string;
  company?: string;
  occupation?: string;
  interaction_level?: string;
  company_size?: string;
  language_level?: string;
  ai_tags?: string;
  stegett_overall_score_min?: string;
};

export function SearchForm({
  className,
  labelledById,
}: {
  className?: string;
  labelledById?: string;
}) {
  const [employmentType, setEmploymentType] = useState<string>("any");
  const [experienceLevel, setExperienceLevel] = useState<string>("any");
  const [companySize, setCompanySize] = useState<string>("any");
  const [interactionLevel, setInteractionLevel] = useState<string>("any");
  const [languageLevel, setLanguageLevel] = useState<string>("any");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: SearchFormValues = Object.fromEntries(
      Array.from(fd.entries()).map(([k, v]) => [k, String(v)])
    ) as SearchFormValues;

    // include controlled selects (mirrored via hidden inputs, but keep it explicit)
    payload.employment_type = employmentType;
    payload.experience_level = experienceLevel;
    payload.company_size = companySize;
    payload.interaction_level = interactionLevel;
    payload.language_level = languageLevel;

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
      <Card className="mx-auto w-full max-w-5xl rounded-2xl border shadow-sm backdrop-blur-sm bg-background/70 dark:bg-background/50">
        <CardContent className="p-4 sm:p-6">
          <form
            role="search"
            aria-labelledby={labelledById}
            onSubmit={onSubmit}
            className="flex flex-col gap-4"
          >
            {/* Primary row: compact pill with separators and icons */}
            <div className="flex flex-col gap-3">
              <div className="flex items-stretch gap-2 rounded-full border bg-background/70 dark:bg-background/40 p-1 shadow-xs">
                {/* Keyword */}
                <div className="relative flex-1 min-w-0">
                  <label htmlFor="q" className="sr-only">Job title or keyword</label>
                  <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="q"
                    name="q"
                    placeholder="Job title or keyword"
                    autoComplete="off"
                    className="h-12 rounded-full  pl-9 focus-visible:ring-0"
                  />
                </div>

                <div className="hidden md:block w-px self-stretch bg-border/70" />

                {/* Location */}
                <div className="relative flex-1 min-w-0">
                  <label htmlFor="location" className="sr-only">Location</label>
                  <MapPin aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="City, country, or remote"
                    autoComplete="off"
                    className="h-12 rounded-full  bg-transparent pl-9 focus-visible:ring-0"
                  />
                </div>

                <div className="hidden md:block w-px self-stretch bg-border/70" />

                {/* Experience Level */}
                <div className="min-w-[180px] md:min-w-[220px]">
                  <label className="sr-only">Experience level</label>
                  <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                    <SelectTrigger aria-label="Experience level" className="h-12 w-full justify-between rounded-full border-0 bg-transparent">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="true_entry_level">True entry level</SelectItem>
                      <SelectItem value="low_experience">Low experience</SelectItem>
                      <SelectItem value="mid">Mid</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <PulsatingButton
                  type="submit"
                  aria-label="Search jobs"
                  className="h-12 rounded-full px-6"
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm text-muted-foreground">Employment type</label>
                      <Select value={employmentType} onValueChange={setEmploymentType}>
                        <SelectTrigger aria-label="Employment type" className="mt-1">
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
                      <input type="hidden" name="employment_type" value={employmentType} />
                    </div>

                    <div>
                      <label htmlFor="required_experience_years_min" className="text-sm text-muted-foreground">
                        Min. years of experience
                      </label>
                      <Input
                        id="required_experience_years_min"
                        name="required_experience_years_min"
                        type="number"
                        min={0}
                        step={1}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Company size</label>
                      <Select value={companySize} onValueChange={setCompanySize}>
                        <SelectTrigger aria-label="Company size" className="mt-1">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="company_size" value={companySize} />
                    </div>

                    <div>
                      <label htmlFor="company" className="text-sm text-muted-foreground">
                        Company
                      </label>
                      <Input id="company" name="company" placeholder="Optional" className="mt-1" />
                    </div>

                    <div>
                      <label htmlFor="occupation" className="text-sm text-muted-foreground">
                        Occupation
                      </label>
                      <Input id="occupation" name="occupation" placeholder="Optional" className="mt-1" />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Interaction level</label>
                      <Select value={interactionLevel} onValueChange={setInteractionLevel}>
                        <SelectTrigger aria-label="Interaction level" className="mt-1">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="on_site">On-site</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="interaction_level" value={interactionLevel} />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Language level</label>
                      <Select value={languageLevel} onValueChange={setLanguageLevel}>
                        <SelectTrigger aria-label="Language level" className="mt-1">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="native">Native</SelectItem>
                        </SelectContent>
                      </Select>
                      <input type="hidden" name="language_level" value={languageLevel} />
                    </div>

                    <div>
                      <label htmlFor="ai_tags" className="text-sm text-muted-foreground">
                        AI tags (partial match)
                      </label>
                      <Input id="ai_tags" name="ai_tags" placeholder="e.g. junior, entry, internship" className="mt-1" />
                    </div>

                    <div>
                      <label htmlFor="steg_score" className="text-sm text-muted-foreground">
                        stegEtt overall score min (0–1)
                      </label>
                      <Input
                        id="steg_score"
                        name="stegEtt_overall_score_min"
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                        placeholder="0.5"
                        className="mt-1"
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

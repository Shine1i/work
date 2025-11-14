const APPLICATION_PROCESS_TYPE_SWEDISH: Record<string, string> = {
  quick_apply: "Snabbansökan",
  standard_ats: "Standard ATS",
  complex_ats: "Komplex ATS",
};

const EXPERIENCE_LEVEL_SWEDISH: Record<string, string> = {
  true_entry_level: "Nybörjare",
  low_experience: "Junior",
  experience_required: "Erfaren",
  internship: "Praktik",
};

const LOCATION_FLEXIBILITY_SWEDISH: Record<string, string> = {
  on_site_only: "På plats",
  hybrid: "Hybrid",
  full_remote: "Distans",
  unknown: "Okänd",
};

export function getSwedishApplicationProcessType(type: string | null): string {
  if (!type) return "Okänd";
  return APPLICATION_PROCESS_TYPE_SWEDISH[type] || type;
}

export function formatExperienceLevel(level: string | null): string {
  if (!level) return "Valfri";
  return EXPERIENCE_LEVEL_SWEDISH[level] || level;
}

export function formatLocationFlexibility(flexibility: string | null): string {
  if (!flexibility || flexibility === "unknown") return "Okänd";
  return LOCATION_FLEXIBILITY_SWEDISH[flexibility] || flexibility;
}

export function formatExperienceYears(min: number | null, max: number | null): string {
  if (!min && !max) return "Ingen erfarenhet krävs";
  if (min && max) {
    if (min === max) return `${min} år`;
    return `${min}-${max} år`;
  }
  if (min) return `Minst ${min} år`;
  if (max) return `Max ${max} år`;
  return "Ingen erfarenhet krävs";
}

export function getExperienceLevelColor(level: string | null): string {
  if (!level) return "";
  const colorMap: Record<string, string> = {
    true_entry_level: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    internship: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    low_experience: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    experience_required: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  };
  return colorMap[level] || "";
}

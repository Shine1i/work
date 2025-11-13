const EMPLOYMENT_TYPE_SWEDISH: Record<string, string> = {
  full_time: "Heltid",
  part_time: "Deltid",
  temporary: "Visstid",
  contract: "Konsult",
  hourly: "Timme",
  unknown: "Okänd",
};

export function getSwedishEmploymentType(type: string | null): string {
  if (!type) return "Okänd";
  return EMPLOYMENT_TYPE_SWEDISH[type] || type;
}

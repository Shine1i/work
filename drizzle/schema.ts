import { pgTable, varchar, foreignKey, unique, serial, integer, text, timestamp, doublePrecision, boolean, uniqueIndex, index, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const applicationProcessTypeEnum = pgEnum("application_process_type_enum", ['quick_apply', 'standard_ats', 'complex_ats'])
export const experienceLevelEnum = pgEnum("experience_level_enum", ['true_entry_level', 'low_experience', 'experience_required', 'internship'])
export const jobStatusEnum = pgEnum("job_status_enum", ['pending', 'running', 'completed', 'failed', 'stopped'])
export const locationFlexibilityEnum = pgEnum("location_flexibility_enum", ['on_site_only', 'hybrid', 'full_remote'])


export const alembicVersion = pgTable("alembic_version", {
	versionNum: varchar("version_num", { length: 32 }).primaryKey().notNull(),
});

export const jobPostings = pgTable("job_postings", {
	id: serial().primaryKey().notNull(),
	companyId: integer("company_id").notNull(),
	title: varchar({ length: 255 }).notNull(),
	descriptionText: text("description_text").notNull(),
	locationText: varchar("location_text", { length: 255 }),
	employmentType: varchar("employment_type", { length: 100 }),
	occupation: varchar({ length: 255 }),
	positionsToFill: integer("positions_to_fill"),
	publishedAt: timestamp("published_at", { mode: 'string' }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }),
	applicationUrl: text("application_url"),
	applicationEmail: varchar("application_email", { length: 255 }),
	sourceName: varchar("source_name", { length: 100 }).notNull(),
	sourceJobId: varchar("source_job_id", { length: 100 }).notNull(),
	sourceUrl: text("source_url").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	averageSalary: doublePrecision("average_salary"),
}, (table) => [
	foreignKey({
			columns: [table.companyId],
			foreignColumns: [companies.id],
			name: "job_postings_company_id_fkey"
		}),
	unique("_source_job_uc").on(table.sourceName, table.sourceJobId),
	unique("job_postings_source_url_key").on(table.sourceUrl),
]);

export const companies = pgTable("companies", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	companyLogoUrl: text("company_logo_url"),
	websiteUrl: text("website_url"),
	createdAt: timestamp("created_at", { mode: 'string' }),
}, (table) => [
	unique("companies_name_key").on(table.name),
]);

export const aiClassifications = pgTable("ai_classifications", {
	id: serial().primaryKey().notNull(),
	jobPostingId: integer("job_posting_id").notNull(),
	experienceLevel: experienceLevelEnum("experience_level"),
	educationCanReplaceExperience: boolean("education_can_replace_experience"),
	requiredExperienceYearsMin: doublePrecision("required_experience_years_min"),
	requiredExperienceYearsMax: doublePrecision("required_experience_years_max"),
	implicitRequirements: text("implicit_requirements").array(),
	applicationProcessType: applicationProcessTypeEnum("application_process_type"),
	requiresAssessment: boolean("requires_assessment"),
	locationFlexibility: locationFlexibilityEnum("location_flexibility"),
	requiresDriversLicense: boolean("requires_drivers_license"),
	entrylevelScore: doublePrecision("entrylevel_score"),
	entrylevelReasoning: text("entrylevel_reasoning"),
	aiTags: text("ai_tags").array(),
	classificationConfidence: doublePrecision("classification_confidence"),
	modelVersion: varchar("model_version", { length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.jobPostingId],
			foreignColumns: [jobPostings.id],
			name: "ai_classifications_job_posting_id_fkey"
		}),
	unique("ai_classifications_job_posting_id_key").on(table.jobPostingId),
]);

export const jobRuns = pgTable("job_runs", {
	id: serial().primaryKey().notNull(),
	status: jobStatusEnum().notNull(),
	startedAt: timestamp("started_at", { mode: 'string' }),
	completedAt: timestamp("completed_at", { mode: 'string' }),
	currentStage: varchar("current_stage", { length: 50 }),
	progressPercentage: doublePrecision("progress_percentage"),
	jobsScraped: integer("jobs_scraped"),
	jobsInserted: integer("jobs_inserted"),
	jobsDeduplicated: integer("jobs_deduplicated"),
	jobsClassified: integer("jobs_classified"),
	errorMessage: text("error_message"),
	triggeredBy: varchar("triggered_by", { length: 100 }),
	configSnapshot: text("config_snapshot"),
	createdAt: timestamp("created_at", { mode: 'string' }),
}, (table) => [
	uniqueIndex("ix_job_runs_single_running").using("btree", table.status.asc().nullsLast().op("enum_ops")).where(sql`(status = 'running'::job_status_enum)`),
	index("ix_job_runs_status").using("btree", table.status.asc().nullsLast().op("enum_ops")),
]);

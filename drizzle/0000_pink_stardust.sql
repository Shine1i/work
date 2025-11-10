-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."application_process_type_enum" AS ENUM('quick_apply', 'standard_ats', 'complex_ats');--> statement-breakpoint
CREATE TYPE "public"."company_size_enum" AS ENUM('startup', 'small', 'medium', 'large', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."experience_level_enum" AS ENUM('true_entry_level', 'low_experience', 'experience_required', 'internship');--> statement-breakpoint
CREATE TYPE "public"."growth_potential_enum" AS ENUM('high', 'medium', 'low');--> statement-breakpoint
CREATE TYPE "public"."interaction_level_enum" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."job_status_enum" AS ENUM('pending', 'running', 'completed', 'failed', 'stopped');--> statement-breakpoint
CREATE TYPE "public"."language_level_enum" AS ENUM('swedish_required', 'english_sufficient', 'bilingual_preferred');--> statement-breakpoint
CREATE TYPE "public"."location_flexibility_enum" AS ENUM('on_site_only', 'hybrid', 'full_remote', 'unknown');--> statement-breakpoint
CREATE TABLE "alembic_version" (
	"version_num" varchar(32) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"company_logo_url" text,
	"website_url" text,
	"created_at" timestamp,
	CONSTRAINT "companies_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "job_postings" (
	"id" serial PRIMARY KEY NOT NULL,
	"company_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description_text" text NOT NULL,
	"location_text" varchar(255),
	"employment_type" varchar(100),
	"occupation" varchar(255),
	"positions_to_fill" integer,
	"published_at" timestamp NOT NULL,
	"expires_at" timestamp,
	"application_url" text,
	"application_email" varchar(255),
	"source_name" varchar(100) NOT NULL,
	"source_job_id" varchar(100) NOT NULL,
	"source_url" text NOT NULL,
	"created_at" timestamp,
	CONSTRAINT "_source_job_uc" UNIQUE("source_name","source_job_id"),
	CONSTRAINT "job_postings_source_url_key" UNIQUE("source_url")
);
--> statement-breakpoint
CREATE TABLE "ai_classifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"job_posting_id" integer NOT NULL,
	"experience_level" "experience_level_enum",
	"education_can_replace_experience" boolean,
	"required_experience_years_min" double precision,
	"required_experience_years_max" double precision,
	"implicit_requirements" text[],
	"application_process_type" "application_process_type_enum",
	"requires_assessment" boolean,
	"interaction_level" "interaction_level_enum",
	"cultural_signals" text[],
	"growth_potential" "growth_potential_enum",
	"company_size" "company_size_enum",
	"language_level" "language_level_enum",
	"location_flexibility" "location_flexibility_enum",
	"requires_drivers_license" boolean,
	"stegett_overall_score" double precision,
	"stegett_reasoning" text,
	"ai_tags" text[],
	"classification_confidence" double precision,
	"model_version" varchar(100) NOT NULL,
	"created_at" timestamp,
	CONSTRAINT "ai_classifications_job_posting_id_key" UNIQUE("job_posting_id")
);
--> statement-breakpoint
CREATE TABLE "job_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "job_status_enum" NOT NULL,
	"started_at" timestamp,
	"completed_at" timestamp,
	"current_stage" varchar(50),
	"progress_percentage" double precision,
	"jobs_scraped" integer,
	"jobs_inserted" integer,
	"jobs_deduplicated" integer,
	"jobs_classified" integer,
	"error_message" text,
	"triggered_by" varchar(100),
	"config_snapshot" text,
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_classifications" ADD CONSTRAINT "ai_classifications_job_posting_id_fkey" FOREIGN KEY ("job_posting_id") REFERENCES "public"."job_postings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "ix_job_runs_single_running" ON "job_runs" USING btree ("status" enum_ops) WHERE (status = 'running'::job_status_enum);--> statement-breakpoint
CREATE INDEX "ix_job_runs_status" ON "job_runs" USING btree ("status" enum_ops);
*/
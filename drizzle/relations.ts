import { relations } from "drizzle-orm/relations";
import { companies, jobPostings, aiClassifications } from "./schema";

export const jobPostingsRelations = relations(jobPostings, ({one, many}) => ({
	company: one(companies, {
		fields: [jobPostings.companyId],
		references: [companies.id]
	}),
	aiClassifications: many(aiClassifications),
}));

export const companiesRelations = relations(companies, ({many}) => ({
	jobPostings: many(jobPostings),
}));

export const aiClassificationsRelations = relations(aiClassifications, ({one}) => ({
	jobPosting: one(jobPostings, {
		fields: [aiClassifications.jobPostingId],
		references: [jobPostings.id]
	}),
}));
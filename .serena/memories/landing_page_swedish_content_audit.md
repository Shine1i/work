# Landing Page Swedish Content Audit

## Current English Content by Section

### 1. HERO SECTION (HeroContent.tsx)
- **Title**: "Your all-in-one job search hub"
- **Description**: "Search thousands of jobs in one place. No experience? Bad at resumes? Struggling to find the right fit? We've got you covered."
- **Highlighter highlights**:
  - "thousands of jobs" (orange underline)
  - "We've got you covered." (blue highlight)
- **Component structure**: 
  - motion.h1 (animates in with opacity/y transition, 0.65s)
  - motion.p (animates in slightly after, 0.6s delay 0.08s)
  - Uses Highlighter component for color emphasis

### 2. SEARCH FORM (SearchForm.tsx)
Primary row fields:
- Job title input: "Job title or keyword"
- Location input: "City, country, or remote"
- Experience Level dropdown: "Any level"
- Search button: "Search"

More filters accordion (7 sections):
- Employment type: "Any" / Full-time / Part-time / Contract / Internship / Temporary
- Work location: "Any" / On-site only / Hybrid / Full remote
- Company size: "Any" / Startup / Small / Medium / Large
- Language requirement: "Any" / English sufficient / Swedish required / Bilingual preferred
- Application type: "Any" / Quick apply / Standard ATS / Complex ATS
- Growth potential: "Any" / High / Medium / Low
- Company name: "e.g. Google, Spotify"
- Occupation: "e.g. Developer, Designer"
- Min. years experience
- AI tags: "e.g. junior, entry"
- Min. stegEtt score (0–1): "0.5"

### 3. FEATURE CARDS CONFIG (features.config.tsx)
Cards array with 4 feature cards:
1. **Smart Job Search**
   - Name: "Smart Job Search"
   - Description: "Find jobs that actually fit your skills and goals."
   - CTA: "Explore Jobs"

2. **Resume Tools**
   - Name: "Resume Tools"
   - Description: "Build a resume that stands out to employers."
   - CTA: "Build Resume"

3. **Career Insights**
   - Name: "Career Insights"
   - Description: "Get tips tailored to your career journey."
   - CTA: "View Insights"

4. **80,000+ Jobs**
   - Name: "80,000+ Jobs"
   - Description: "Massive job database updated daily with fresh opportunities."
   - CTA: "Browse All"

### 4. BENTO CARD CONTENT (BentoCardContent.tsx)
**SmartJobSearchContent**: 3 level badges
- "Entry Level"
- "Mid Level"
- "Senior"

**ResumeToolsContent**: Resume tool cards (10 items looping):
- "CV Helper" - "Smart formatting & optimization"
- "Resume Builder" - "Professional templates"
- "Job Adaptation" - "Tailored to application"
- "AST Enhanced" - "AI-powered analysis"
- Status: "Active"

**JobsDatabaseContent**: Counter badge
- "Active Jobs"

### 5. CTA SECTION (CtaSection.tsx)
- Heading: "Boost your productivity today"
- Description: "Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea." (Lorem ipsum placeholder)
- Buttons:
  - "Get started"
  - "Learn more →"

### 6. FOOTER (Footer.tsx @ src/components/app/Footer.tsx)
**Navigation sections**:
- Solutions: Marketing, Analytics, Automation, Commerce, Insights
- Support: Submit ticket, Documentation, Guides
- Company: About, Blog, Jobs, Press
- Legal: Terms of service, Privacy policy, License
- Social: Facebook, Instagram, X, GitHub, YouTube

**Newsletter section**:
- Heading: "Subscribe to our newsletter"
- Description: "The latest news, articles, and resources, sent to your inbox weekly."
- Input placeholder: "Enter your email"
- Button: "Subscribe"

**Copyright**: "&copy; 2024 Your Company, Inc. All rights reserved."

### 7. NAVIGATION CONFIG (src/features/navigation/config/config.ts)
**Nav items** (landingNavItems):
- Explore: "Jobs", "Features"
- Resources: "How it works", "Docs"
- Account: "Log in", "Sign up"

**Logo**: "JobPool"

### 8. FAQ SECTION (FaqSection.tsx)
- Heading: "Frequently asked questions"
- Support text: "Have a different question and can't find the answer you're looking for? Reach out to our support team by sending us an email and we'll get back to you as soon as we can."
- 6 FAQ items (placeholder content with jokes)

### 9. BLOG SECTION (BlogSection.tsx)
- 3 blog posts with placeholder content
- Titles: "Boost your conversion rate", "How to use search engine optimization to drive sales", "Improve your customer experience"
- Lorem ipsum descriptions

## Component Structure for TypingAnimation Integration

### Key Animation Patterns:
1. **HeroContent**: Uses `motion.h1` and `motion.p` from motion/react
   - Initial: opacity 0, y offset
   - Animate: opacity 1, y 0
   - Can integrate TypingAnimation into motion.h1 or motion.p

2. **SearchForm**: Uses motion.div for container
   - Could integrate TypingAnimation for labels

3. **Feature Cards**: Static text in config arrays
   - Would need to modify display component to wrap text in TypingAnimation

## Swedish vs English Inconsistencies
1. **Language field value**: "Swedish required" is English in UI label
2. **All content is currently English** - no Swedish translations exist yet
3. **Placeholder content**: Lorem ipsum + joke FAQs need replacement with real Swedish content

## File Locations
- Hero: `/src/features/landing/components/HeroContent.tsx`
- Search Form: `/src/features/landing/components/SearchForm.tsx`
- Feature Cards: `/src/features/landing/config/features.config.tsx`
- Bento Content: `/src/features/landing/components/BentoCardContent.tsx`
- CTA: `/src/features/landing/components/CtaSection.tsx`
- Footer: `/src/components/app/Footer.tsx`
- Navigation: `/src/features/navigation/config/config.ts`
- FAQ: `/src/features/landing/components/FaqSection.tsx`
- Blog: `/src/features/landing/components/BlogSection.tsx`

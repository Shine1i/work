import { motion } from "motion/react";
import { Highlighter } from "~/components/ui/highlighter";

export function HeroContent({ headlineId }: { headlineId: string }) {
  return (
    <div className="text-center">
      <motion.h1
        id={headlineId}
        className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        Your all-in-one job search hub
      </motion.h1>

      <motion.p
        className="text-muted-foreground mx-auto mt-4 max-w-3xl text-base text-pretty sm:text-lg md:text-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
      >
        Search{" "}
        <Highlighter action="underline" color="#FF9800">
          thousands of jobs
        </Highlighter>{" "}
        in one place. No experience? Bad at resumes? Struggling to find the right fit?{" "}
        <Highlighter action="highlight" color="#87CEFA">
          We've got you covered.
        </Highlighter>
      </motion.p>
    </div>
  );
}

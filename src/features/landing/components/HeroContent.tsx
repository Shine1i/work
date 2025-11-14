import { motion } from "motion/react";
import { TypingAnimation } from "~/components/ui/typing-animation";
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
        En plattform som{" "}
        <TypingAnimation
          words={[
            "hittar ditt första jobb",
            "optimerar ditt CV",
            "klarar AI-screeningen",
            "matchar dina färdigheter",
          ]}
          loop={true}
          pauseDelay={2000}
          typeSpeed={80}
          deleteSpeed={40}
          className="text-primary"
        />
      </motion.h1>

      <motion.p
        className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-foreground/90 sm:text-base"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        Företag använder AI för att screena din ansökan – det är inte fusk att anpassa sig, det är smart.
      </motion.p>

      <motion.p
        className="text-muted-foreground mx-auto mt-4 hidden max-w-3xl text-base text-pretty sm:text-lg md:block md:text-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        Sök bland{" "}
        <Highlighter action="underline" color="#FF9800">
          80 000+ klassificerade jobb
        </Highlighter>{" "}
        med ärliga entry-level betyg. Ingen erfarenhet? Svårt med CV? Vet inte var du passar?{" "}
        <Highlighter action="highlight" color="#87CEFA">
          Vi hjälper dig.
        </Highlighter>
      </motion.p>
    </div>
  );
}

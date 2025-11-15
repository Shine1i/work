import { motion } from "motion/react";
import { Highlighter } from "~/components/ui/highlighter";
import { TypingAnimation } from "~/components/ui/typing-animation";

export function HeroContent({ headlineId }: { headlineId: string }) {
  return (
    <div className="text-center">
      <motion.h1
        id={headlineId}
        className="text-2xl font-extrabold tracking-tight text-balance sm:text-3xl md:text-5xl"
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
        className="text-muted-foreground mx-auto mt-4 hidden max-w-3xl text-base text-pretty sm:text-lg md:block md:text-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
      >
        Företag{" "}
        <Highlighter action="underline" color="#FF9800">
          använder AI
        </Highlighter>{" "}
        för att screena din ansökan –{" "}
        <Highlighter action="underline" color="#6e56cf" className="">
          det är inte fusk
        </Highlighter>{" "}
        att anpassa sig, det är smart.
      </motion.p>
    </div>
  );
}

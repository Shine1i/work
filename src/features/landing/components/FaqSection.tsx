const faqs = [
  {
    id: 1,
    question: "Varför är det så svårt att hitta entry-level jobb i Sverige?",
    answer:
      "Ungdomsarbetslösheten ligger på 28,6% och många 'entry-level' jobb kräver faktiskt 2-3 års erfarenhet. Det är en paradox där företag säger de behöver arbetskraft men ställer orimliga krav. Vi löser detta genom att ärligt klassificera varje jobb efter verklig nybörjarvänlighet.",
  },
  {
    id: 2,
    question: 'Hur använder företag AI för att screena ansökningar?',
    answer:
      'De flesta stora företag använder ATS-system (Applicant Tracking Systems) som automatiskt filtrerar CV:n baserat på nyckelord innan en människa ens ser dem. Systemet letar efter exakta matchningar mot jobbeskrivningen, vilket innebär att stavfel eller fel format kan diskvalificera dig direkt.',
  },
  {
    id: 3,
    question: 'Är det okej att använda AI för min ansökan?',
    answer:
      "Absolut! Företagen använder AI för att screena dig – det är inte fusk att anpassa sig, det är smart. Vi hjälper dig optimera ditt CV för att klara AI-screeningen och komma till de mänskliga rekryterarna. Det handlar om att spela på samma villkor.",
  },
  {
    id: 4,
    question: 'Varför kräver "nybörjare" jobb erfarenhet?',
    answer:
      'Detta är ett känt problem där 65% av unga mellan 20-25 år tycker kraven är helt orimliga. Många jobb märks som "entry-level" men har dolda krav på tidigare arbetslivserfarenhet. Vår AI-klassificering avslöjar dessa dolda krav så du kan fokusera på jobb som faktiskt är nybörjarvänliga.',
  },
  {
    id: 5,
    question: 'Hur kan er plattform hjälpa mig få mitt första jobb?',
    answer:
      'Vi klassificerar alla 80 000+ jobb efter verklig nybörjarvänlighet med ett poäng 1-10. Du ser exakt vilka jobb som kräver erfarenhet, vilka som accepterar utbildning istället, och vilka med komplexa ansökningsprocesser. Plus verktyg för att optimera ditt CV för ATS-system.',
  },
  {
    id: 6,
    question: 'Vad betyder "entry-level score" på 1-10?',
    answer:
      'Vårt AI-system analyserar varje jobb och ger ett ärligt betyg där 10 är perfekt för nybörjare och 1 kräver mycket erfarenhet. Vi kollar på erfarenhetskrav, utbildningskrav, dolda krav, ansökningsprocessens komplexitet, och om företaget faktiskt anställer juniorer. Inga fler falska "entry-level" jobb.',
  },
]

export  function FaqSection() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Vanliga frågor</h2>
        <p className="mt-6 max-w-2xl text-base/7 text-muted-foreground">
          Har du en annan fråga och kan inte hitta svaret? Kontakta vårt supportteam genom att{' '}
          <a href="#" className="font-semibold text-primary hover:text-primary/80">
            skicka oss ett mail
          </a>{' '}
          så återkommer vi så snart vi kan.
        </p>
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base/7 font-semibold text-foreground">{faq.question}</dt>
                <dd className="mt-2 text-base/7 text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

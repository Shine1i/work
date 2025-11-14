import { useSuspenseQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { popularCompaniesQueryOptions, type PopularCompany } from "~/features/landing/api/companies/queries";

export function PopularCompanies() {
  const { data: companies } = useSuspenseQuery(popularCompaniesQueryOptions());

  return (
    <section className="py-8 sm:py-6 sm:mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Populära Företag
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-base sm:text-lg">
            Topföretag som rekryterar nu
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {companies.map((company: PopularCompany) => (
              <CarouselItem
                key={company.id}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="h-full !py-0 overflow-hidden border-2 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                      {company.companyLogoUrl ? (
                        <img
                          src={company.companyLogoUrl}
                          alt={company.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 line-clamp-1 font-semibold text-sm">
                        {company.name}
                      </h3>
                      <p className="text-muted-foreground text-xs font-medium">
                        {company.jobCount} jobb
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

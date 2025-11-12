import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardContent } from "~/components/ui/card";
import { BorderBeam } from "~/components/ui/border-beam";
import { cityImages, defaultCityImage } from "~/features/landing/config/cities.config";
import { popularCitiesQueryOptions, type PopularCity } from "~/features/cities/api/queries";

export function PopularCities() {
  const { data: cities } = useSuspenseQuery(popularCitiesQueryOptions());

  return (
    <section className=" ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Popular Cities</h2>
          <p className="text-muted-foreground   max-w-2xl text-base sm:text-lg">
            Browse jobs by location
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cities.map((city: PopularCity, index: number) => (
            <a
              key={city.name}
              href="#"
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full relative !pt-0 overflow-hidden border-2 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <BorderBeam
                  size={80}
                  duration={12}
                  delay={index * 2}
                  colorFrom="hsl(var(--primary))"
                  colorTo="hsl(var(--primary) / 0.3)"
                />
                <CardContent className="flex flex-col p-0 relative z-10">
                  <div className="relative w-full h-32 overflow-hidden">
                    <img
                      src={cityImages[city.name || ""] || defaultCityImage}
                      alt={city.name || "City"}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-sm">{city.name}</h3>
                    <p className="text-muted-foreground mt-1.5 text-xs font-medium">
                      {city.jobCount.toLocaleString()} jobs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

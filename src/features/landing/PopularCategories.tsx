import { Card, CardContent } from "~/components/ui/card";
import { BorderBeam } from "~/components/ui/border-beam";
import { categories } from "~/config/categories";

export function PopularCategories() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Popular Categories</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base sm:text-lg">
            Browse jobs by category
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href={category.href}
              className="group block transition-transform hover:scale-105"
            >
              <Card className="h-full relative overflow-hidden border-2 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <BorderBeam
                  size={80}
                  duration={12}
                  delay={index * 2}
                  colorFrom="hsl(var(--primary))"
                  colorTo="hsl(var(--primary) / 0.3)"
                />
                <CardContent className="flex flex-col items-center p-5 text-center relative z-10">
                  <div className="text-primary mb-3 text-3xl group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h3 className="font-semibold text-sm">{category.name}</h3>
                  <p className="text-muted-foreground mt-1.5 text-xs font-medium">
                    {category.count.toLocaleString()} jobs
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

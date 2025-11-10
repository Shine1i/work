import { Card, CardContent } from "~/components/ui/card";
import { categories } from "~/config/categories";

export function PopularCategories() {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Popular Categories</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base sm:text-lg">
            Browse jobs by category
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="block transition-transform hover:scale-105"
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <div className="text-primary mb-2">{category.icon}</div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-muted-foreground mt-1 text-xs">
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

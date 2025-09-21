import { BarChart3, Briefcase, Building2, FileText, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { MagicCard } from "~/components/magicui/magic-card";
import { cn } from "~/lib/utils";

export function BentoGrid({ className }: { className?: string }) {
  const items = [
    {
      title: "Biggest job pool",
      desc: "Aggregate listings from many platforms into one fast search.",
      icon: <Briefcase className="size-5" />,
      span: "col-span-12 md:col-span-6 lg:col-span-7",
      from: "var(--primary)",
      to: "var(--ring)",
    },
    {
      title: "AI resume + cover letter",
      desc: "Tailored drafts for every role you apply to.",
      icon: <FileText className="size-5" />,
      span: "col-span-12 md:col-span-6 lg:col-span-5",
      from: "var(--chart-4)",
      to: "var(--chart-5)",
    },
    {
      title: "Entry‑level friendly",
      desc: "Hide years‑of‑experience traps and surface starter roles.",
      icon: <GraduationCap className="size-5" />,
      span: "col-span-12 md:col-span-6 lg:col-span-4",
      from: "var(--secondary)",
      to: "var(--accent)",
    },
    {
      title: "Smart match signal",
      desc: "Use stegEtt score to quickly gauge fit before you apply.",
      icon: <BarChart3 className="size-5" />,
      span: "col-span-12 md:col-span-6 lg:col-span-4",
      from: "var(--chart-2)",
      to: "var(--chart-3)",
    },
    {
      title: "Company insights",
      desc: "Pull key facts, culture notes, and interview tips instantly.",
      icon: <Building2 className="size-5" />,
      span: "col-span-12 md:col-span-12 lg:col-span-4",
      from: "var(--muted)",
      to: "var(--primary)",
    },
  ];

  return (
    <section
      id="features"
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      <div className="grid auto-rows-[1fr] grid-cols-12 gap-4">
        {items.map((it, idx) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className={cn(it.span)}
          >
            <MagicCard
              className="h-full rounded-2xl"
              gradientFrom={it.from}
              gradientTo={it.to}
              gradientColor="color-mix(in oklab, var(--primary) 14%, transparent)"
              gradientOpacity={0.25}
            >
              <div className="flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="text-primary flex items-center gap-3">
                  {it.icon}
                  <h3 className="text-base font-semibold">{it.title}</h3>
                </div>
                <p className="text-muted-foreground mt-3 text-sm">{it.desc}</p>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function Example() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-600">
          Deploy faster
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Everything you need to deploy your app
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Mobile friendly
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
                  cupidatat commodo.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Performance
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores
                  impedit.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                  className="w-full max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Security
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse
                  semper morbi.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                  Powerful APIs
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                  Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem
                  sodales gravida.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10">
                  <div className="flex bg-gray-900 outline outline-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                        NotificationSetting.jsx
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14">{/* Your code example */}</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "~/utils"
import { Button } from "~/components/ui/button"
import { BorderBeam } from "~/components/ui/border-beam"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "content"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
  content?: ReactNode
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  content,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl border-2",
      // light & dark styles
      "bg-card/60 backdrop-blur-sm",
      "hover:bg-card/80 transition-all duration-300",
      "[box-shadow:0_0_0_1px_hsl(var(--border)),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.08)]",
      "hover:[box-shadow:0_0_0_1px_hsl(var(--primary)),0_4px_8px_rgba(0,0,0,.08),0_16px_32px_rgba(0,0,0,.12)]",
      "transform-gpu",
      className
    )}
    {...props}
  >
    <BorderBeam
      size={100}
      duration={15}
      colorFrom="hsl(var(--primary))"
      colorTo="hsl(var(--primary) / 0.2)"
      borderWidth={2}
    />
    <div>{background}</div>
    {content && <div className="pointer-events-none absolute inset-0">{content}</div>}
    <div className="p-4">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-primary/80" />
        <h3 className="text-xl font-semibold text-foreground">
          {name}
        </h3>
        <p className="max-w-lg text-muted-foreground">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="pointer-events-auto p-0"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
    >
      <Button
        variant="link"
        asChild
        size="sm"
        className="pointer-events-auto p-0"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/5" />
  </div>
)

export { BentoCard, BentoGrid }

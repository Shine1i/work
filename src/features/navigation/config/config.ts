export interface NavLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface NavItem {
  label: string;
  bgClassName: string;
  textClassName: string;
  links: NavLink[];
}

export const landingNavItems: NavItem[] = [
  {
    label: "Utforska",
    bgClassName: "bg-primary",
    textClassName: "text-primary-foreground",
    links: [
      { label: "Jobb", href: "/", ariaLabel: "Bläddra bland jobb" },
      { label: "Funktioner", href: "#features", ariaLabel: "Visa funktioner" },
    ],
  },
  {
    label: "Resurser",
    bgClassName: "bg-emerald-500",
    textClassName: "text-white",
    links: [
      { label: "Hur det fungerar", href: "#how-it-works", ariaLabel: "Hur det fungerar" },
      { label: "Dokumentation", href: "#", ariaLabel: "Dokumentation" },
    ],
  },
  {
    label: "Konto",
    bgClassName: "bg-amber-500",
    textClassName: "text-white",
    links: [
      { label: "Logga in", href: "/login", ariaLabel: "Logga in på ditt konto" },
      { label: "Registrera dig", href: "/signup", ariaLabel: "Skapa ett konto" },
    ],
  },
];

export const landingNavConfig = {
  logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'%3E%3Ctext x='5' y='30' font-family='system-ui' font-weight='900' font-size='24' fill='%236366f1'%3EJobPool%3C/text%3E%3C/svg%3E",
  logoAlt: "JobPool",
};

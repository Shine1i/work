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
    label: "Explore",
    bgClassName: "bg-primary",
    textClassName: "text-primary-foreground",
    links: [
      { label: "Jobs", href: "/", ariaLabel: "Browse Jobs" },
      { label: "Features", href: "#features", ariaLabel: "View Features" },
    ],
  },
  {
    label: "Resources",
    bgClassName: "bg-emerald-500",
    textClassName: "text-white",
    links: [
      { label: "How it works", href: "#how-it-works", ariaLabel: "How it works" },
      { label: "Docs", href: "#", ariaLabel: "Documentation" },
    ],
  },
  {
    label: "Account",
    bgClassName: "bg-amber-500",
    textClassName: "text-white",
    links: [
      { label: "Log in", href: "/login", ariaLabel: "Log in to your account" },
      { label: "Sign up", href: "/signup", ariaLabel: "Create an account" },
    ],
  },
];

export const landingNavConfig = {
  logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 40'%3E%3Ctext x='5' y='30' font-family='system-ui' font-weight='900' font-size='24' fill='%236366f1'%3EJobPool%3C/text%3E%3C/svg%3E",
  logoAlt: "JobPool",
};

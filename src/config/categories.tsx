import {
  Palette,
  Code,
  Megaphone,
  Package,
  TrendingUp,
  Headphones,
} from "lucide-react";
import type { ReactNode } from "react";

export interface Category {
  name: string;
  description: string;
  icon: ReactNode;
  count: number;
  href: string;
}

export const categories: Category[] = [
  {
    name: "Design",
    description: "UI/UX, Graphic Design, Product Design",
    icon: <Palette className="size-6" />,
    count: 1234,
    href: "#",
  },
  {
    name: "Engineering",
    description: "Software Development, DevOps, Data",
    icon: <Code className="size-6" />,
    count: 2341,
    href: "#",
  },
  {
    name: "Marketing",
    description: "Digital Marketing, Content, Growth",
    icon: <Megaphone className="size-6" />,
    count: 987,
    href: "#",
  },
  {
    name: "Product",
    description: "Product Management, Strategy",
    icon: <Package className="size-6" />,
    count: 756,
    href: "#",
  },
  {
    name: "Sales",
    description: "Business Development, Account Management",
    icon: <TrendingUp className="size-6" />,
    count: 1456,
    href: "#",
  },
  {
    name: "Support",
    description: "Customer Success, Technical Support",
    icon: <Headphones className="size-6" />,
    count: 654,
    href: "#",
  },
];

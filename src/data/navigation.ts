import { NavItem } from "@/types";

export const mainNavItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  {
    label: "Industries",
    href: "#",
    children: [
      { label: "Private Chefs", href: "/private-chefs" },
      { label: "Restaurants", href: "/restaurants" },
      { label: "Retreats", href: "/retreats" },
      { label: "Yoga & Wellness", href: "/yoga-wellness" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNavItems = {
  studio: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  industries: [
    { label: "Private Chefs", href: "/private-chefs" },
    { label: "Restaurants", href: "/restaurants" },
    { label: "Retreats", href: "/retreats" },
    { label: "Yoga & Wellness", href: "/yoga-wellness" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

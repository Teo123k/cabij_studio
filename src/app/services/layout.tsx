import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Production Services",
  description:
    "Creative direction, branded content production and ongoing content partnerships for hospitality and wellness brands.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

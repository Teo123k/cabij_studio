import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Cabij Studio creative studies and concept campaigns for chefs, restaurants, retreats and wellness brands.",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact and Book a Creative Call",
  description:
    "Book a creative call or send a qualified content-production enquiry to Cabij Studio.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

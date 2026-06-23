import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceWorkerCleanup } from "@/components/ServiceWorkerCleanup";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cabijstudio.co"),
  title: {
    default: "Cabij Studio — Creative Production for Hospitality & Wellness",
    template: "%s | Cabij Studio",
  },
  description:
    "Premium social content production for private chefs, restaurants, retreats and wellness brands. We create branded short-form video and imagery built around your people, spaces and identity.",
  keywords: [
    "hospitality content production",
    "restaurant social media video",
    "private chef content creation",
    "retreat marketing content",
    "yoga instructor video content",
    "wellness brand creative studio",
    "short-form video production",
  ],
  authors: [{ name: "Cabij Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cabijstudio.co",
    siteName: "Cabij Studio",
    title: "Cabij Studio — Creative Production for Hospitality & Wellness",
    description:
      "Premium social content production for private chefs, restaurants, retreats and wellness brands.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cabij Studio — Creative Production for Hospitality & Wellness",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabij Studio — Creative Production for Hospitality & Wellness",
    description:
      "Premium social content production for private chefs, restaurants, retreats and wellness brands.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://cabijstudio.co";
  const email =
    process.env.NEXT_PUBLIC_EMAIL || "info@cabij-production.co";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Cabij Studio",
    url: siteUrl,
    email,
    description:
      "Creative production studio for hospitality and wellness brands.",
    areaServed: "Worldwide",
    serviceType: [
      "Creative direction",
      "Short-form video production",
      "Hospitality content production",
      "Wellness brand content production",
    ],
    ...(instagramUrl ? { sameAs: [instagramUrl] } : {}),
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <ServiceWorkerCleanup />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

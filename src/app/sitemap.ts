import { MetadataRoute } from "next";
import { portfolioProjects } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cabijstudio.co";
  const currentDate = new Date();

  const routes = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
    "/private-chefs",
    "/restaurants",
    "/retreats",
    "/yoga-wellness",
    "/privacy",
    "/terms",
  ];

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : route === "/privacy" || route === "/terms" ? 0.3 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = portfolioProjects.map(
    (project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${baseUrl}${project.imageSrc}`],
    })
  );

  return [...staticRoutes, ...projectRoutes];
}

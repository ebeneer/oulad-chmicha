import type { MetadataRoute } from "next";
import { accommodations } from "@/lib/domain";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/hebergements", "/activites", "/contact"];
  const now = new Date();
  return [
    ...staticPages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...accommodations.map((item) => ({
      url: `${siteConfig.url}/hebergements/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

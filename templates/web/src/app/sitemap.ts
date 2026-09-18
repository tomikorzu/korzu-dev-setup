import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

// This file lists all the pages that should be indexed by browsers.

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/components"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.5,
  }));
}

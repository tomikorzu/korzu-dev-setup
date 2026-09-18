import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

// This file lists the pages that should be indexed by bots. (e.g: /home, /about)

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/*", "/api/*"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

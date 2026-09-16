import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

/** Root layout metadata — defines the title template every page's title fills into. */
export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: siteConfig.name, template: `%s · ${siteConfig.name}` },
    description: siteConfig.description,
    openGraph: {
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
    },
  };
}

interface PageMetadataOptions {
  title: string;
  description?: string;
  /** Path relative to the site root, e.g. "/blog/my-post" */
  path?: string;
  noIndex?: boolean;
}

/** Per-page metadata — title fills into the root layout's template automatically. */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

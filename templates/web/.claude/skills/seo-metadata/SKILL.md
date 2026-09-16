---
name: seo-metadata
description: Use when adding a page or editing site-wide SEO — titles, descriptions, sitemap, robots, OG image. Helpers already exist, don't hand-roll metadata objects.
---

# SEO: metadata helpers, sitemap, robots, OG image

`src/site.config.ts` holds the site's identity (name, url, description) — edit that, not
individual pages, to rebrand SEO defaults across the whole app.

## Rules

1. **Every page under `src/app/[locale]/` exports `metadata`** via
   `createMetadata({ title, description, path })` from
   `@/modules/shared/utils/seo.util` — never build a raw `Metadata` object by hand. `title` is a
   plain string; it fills into the root layout's `%s · SiteName` template automatically.
2. **The root layout's metadata comes from `createRootMetadata()`** — that's the only place the
   title template, `metadataBase`, and default OG/Twitter config are defined. Don't duplicate
   them per page.
3. **New routes go in `src/app/sitemap.ts`'s route list** so they're discoverable — it's a plain
   array of paths, not auto-generated from the file system.
4. **The OG image (`src/app/opengraph-image.tsx`) is generated, not a static file** — it uses
   `next/og`'s `ImageResponse` with plain inline styles (no MUI theme access in that runtime).
   Update it if the brand color changes meaningfully, pulling from
   `projectConfig.brand.primary` like it already does.
5. **Use `noIndex: true`** in `createMetadata()` for pages that shouldn't be indexed (drafts,
   internal tools) instead of hand-writing a `robots` meta tag.

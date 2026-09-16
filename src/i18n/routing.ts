import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  // Default locale has no URL prefix ("/"), others do ("/es") — existing
  // plain hrefs keep working for the default locale without extra wiring.
  localePrefix: "as-needed",
});

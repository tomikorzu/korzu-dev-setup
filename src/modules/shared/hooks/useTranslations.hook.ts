"use client";

import { useLanguage } from "../providers/LanguageProvider.provider";

/**
 * Custom hook to handle translations with SSR-safe hydration
 * Returns the appropriate text based on current language, defaulting to English during SSR
 */
export function useTranslations() {
  const { language, isHydrated, toggleLanguage, setLanguage } = useLanguage();

  const t = (enText: string, esText: string): string => {
    if (!isHydrated) {
      return enText;
    }
    return language === "EN" ? enText : esText;
  };

  return {
    t,
    language,
    isHydrated,
    toggleLanguage,
    setLanguage,
  };
}

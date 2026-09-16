"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  Language,
  LOCAL_STORAGE_KEYS,
} from "@/modules/shared/constants/storageKeys.constant";

export const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
  isHydrated: boolean;
  setLanguage: (language: Language) => void;
}>({
  language: Language.EN,
  toggleLanguage: () => {},
  isHydrated: false,
  setLanguage: () => {},
});

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLanguage = navigator.language.toUpperCase();
  const [language, setLanguage] = useState<Language>(
    userLanguage === "ES" ? Language.ES : Language.EN,
  );
  const [isHydrated, setIsHydrated] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.ES : Language.EN);
  };

  useEffect(() => {
    const storedLanguage =
      localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) || Language.ES;
    setLanguage(storedLanguage as Language);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, language);
    }
  }, [language, isHydrated]);

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, isHydrated, setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

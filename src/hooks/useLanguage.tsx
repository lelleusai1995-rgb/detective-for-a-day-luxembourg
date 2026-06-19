import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Language, LocalizedText } from "../types/caseTypes";
import { pickText } from "../utils/assetUtils";
import { t as translate, type UIKey } from "../data/translations";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/storage";

const SUPPORTED: Language[] = ["en", "it", "sq"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Translate a UI label. */
  t: (key: UIKey) => string;
  /** Resolve localized case content with the fallback chain. */
  loc: (text: LocalizedText | undefined) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageRaw] = useLocalStorage<Language>(
    STORAGE_KEYS.language,
    "en",
  );

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageRaw(SUPPORTED.includes(lang) ? lang : "en");
    },
    [setLanguageRaw],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key: UIKey) => translate(language, key),
      loc: (text: LocalizedText | undefined) => pickText(text, language),
    }),
    [language, setLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

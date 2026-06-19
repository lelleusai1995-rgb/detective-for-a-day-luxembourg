import type {
  Language,
  LocalizedAsset,
  LocalizedText,
} from "../types/caseTypes";
import { LANGUAGE_FALLBACK_ORDER } from "../types/caseTypes";

/**
 * Resolve a localized string using the language fallback chain:
 * selected language -> en -> it -> sq -> any available value.
 */
export function pickText(
  text: LocalizedText | undefined,
  language: Language,
): string {
  if (!text) return "";
  const order: Language[] = [
    language,
    ...LANGUAGE_FALLBACK_ORDER.filter((l) => l !== language),
  ];
  for (const lang of order) {
    const value = text[lang];
    if (value && value.trim()) return value;
  }
  // Last resort: any non-empty value present on the object.
  const anyValue = Object.values(text).find((v) => v && v.trim());
  return anyValue ?? "";
}

/** Resolve a localized file path / URL with the same fallback chain. */
export function pickAsset(
  asset: LocalizedAsset | undefined,
  language: Language,
): string | undefined {
  if (!asset) return undefined;
  const order: Language[] = [
    language,
    ...LANGUAGE_FALLBACK_ORDER.filter((l) => l !== language),
  ];
  for (const lang of order) {
    const value = asset[lang];
    if (value && value.trim()) return value;
  }
  const anyValue = Object.values(asset).find((v) => v && v.trim());
  return anyValue ?? undefined;
}

/** Lowercased file extension (without dot), or "" if none. */
export function fileExtension(path: string): string {
  const clean = path.split("?")[0].split("#")[0];
  const dot = clean.lastIndexOf(".");
  if (dot === -1) return "";
  return clean.slice(dot + 1).toLowerCase();
}

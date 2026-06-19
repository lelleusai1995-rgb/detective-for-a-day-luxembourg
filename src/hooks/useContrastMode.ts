import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/storage";

export type ContrastMode = "normal" | "high_contrast" | "inverted";

export const CONTRAST_MODES: ContrastMode[] = [
  "normal",
  "high_contrast",
  "inverted",
];

/**
 * Reads/writes the contrast preference and reflects it onto <html> as
 * data-contrast, which the stylesheet uses to swap the colour palette.
 */
export function useContrastMode() {
  const [mode, setMode] = useLocalStorage<ContrastMode>(
    STORAGE_KEYS.contrastMode,
    "normal",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-contrast", mode);
  }, [mode]);

  return { mode, setMode };
}

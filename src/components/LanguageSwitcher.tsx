import { useEffect, useRef, useState } from "react";
import type { Language } from "../types/caseTypes";
import { useLanguage } from "../hooks/useLanguage";

const LANGS: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "it", label: "IT" },
  { code: "sq", label: "SQ" },
];

/**
 * Language selector. Two shapes:
 *  - default: a three-option chip selector (used on the start screen);
 *  - compact: a small dropdown button (used in the header on every screen),
 *    so the language can be changed from any page without losing progress.
 * Both write to the same language context / LocalStorage key.
 */
export default function LanguageSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the compact menu when tapping/clicking outside of it.
  useEffect(() => {
    if (!compact || !open) return;
    function onDocPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onDocPointer);
    return () => document.removeEventListener("pointerdown", onDocPointer);
  }, [compact, open]);

  if (!compact) {
    return (
      <div className="lang-select" role="group" aria-label="Language">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            className={`chip ${language === l.code ? "active" : ""}`}
            aria-pressed={language === l.code}
            onClick={() => setLanguage(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  const current = LANGS.find((l) => l.code === language) ?? LANGS[0];

  return (
    <div className="lang-menu" ref={ref}>
      <button
        type="button"
        className="btn btn-ghost lang-menu-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        title={`Language: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden>🌐</span>
        <span>{current.label}</span>
      </button>

      {open && (
        <div className="lang-menu-list" role="menu">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              role="menuitemradio"
              aria-checked={language === l.code}
              className={`lang-menu-item ${language === l.code ? "active" : ""}`}
              onClick={() => {
                setLanguage(l.code);
                setOpen(false);
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

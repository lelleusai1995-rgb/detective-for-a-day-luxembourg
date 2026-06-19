import { useContrastMode, CONTRAST_MODES } from "../hooks/useContrastMode";
import { useLanguage } from "../hooks/useLanguage";

const LABEL_KEY = {
  normal: "contrastNormal",
  high_contrast: "contrastHigh",
  inverted: "contrastInverted",
} as const;

/** Cycles through normal / high contrast / inverted. Large touch target. */
export default function ContrastToggle({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useContrastMode();
  const { t } = useLanguage();

  function cycle() {
    const idx = CONTRAST_MODES.indexOf(mode);
    setMode(CONTRAST_MODES[(idx + 1) % CONTRAST_MODES.length]);
  }

  return (
    <button
      type="button"
      className="btn btn-ghost"
      style={compact ? { width: "auto", minWidth: 48, padding: "0 12px" } : undefined}
      onClick={cycle}
      aria-label={`${t("contrast")}: ${t(LABEL_KEY[mode])}`}
      title={`${t("contrast")}: ${t(LABEL_KEY[mode])}`}
    >
      <span aria-hidden>◐</span>
      {!compact && <span>{t(LABEL_KEY[mode])}</span>}
    </button>
  );
}

import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import ContrastToggle from "./ContrastToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../hooks/useLanguage";

type Props = {
  title: string;
  children: ReactNode;
  /** When set, a back arrow is shown that navigates to this path (or -1). */
  back?: string | number;
  /** Hide the bottom navigation (e.g. on full-screen reading views). */
  hideNav?: boolean;
};

export default function GameLayout({
  title,
  children,
  back,
  hideNav = false,
}: Props) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="app-shell">
      <header className="app-header">
        {back !== undefined && (
          <button
            type="button"
            className="btn btn-ghost"
            style={{ width: "auto", minWidth: 48, padding: "0 12px" }}
            onClick={() =>
              typeof back === "number" ? navigate(back) : navigate(back)
            }
            aria-label={t("back")}
          >
            ←
          </button>
        )}
        <span className="title">{title}</span>
        <div className="header-controls">
          <LanguageSwitcher compact />
          <ContrastToggle compact />
        </div>
      </header>

      <main className="app-main">{children}</main>

      {!hideNav && <BottomNav />}
    </div>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import LanguageSwitcher from "./LanguageSwitcher";
import ContrastToggle from "./ContrastToggle";

export default function StartScreen() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);

  function start() {
    navigate(`/game/${caseId}/briefing`);
  }

  return (
    <div className="app-shell">
      <main className="app-main">
        <div className="hero">
          <div className="logo" aria-hidden>
            🔎
          </div>
          <p className="kicker">{t("appName")}</p>
          <h1>{status === "ready" ? loc(data.title) : t("loading")}</h1>
          {status === "ready" && <p className="muted">{loc(data.subtitle)}</p>}
        </div>

        {status === "error" && (
          <p className="notice notice-strong">{t("loadError")}</p>
        )}

        <div className="card stack">
          <div className="field" style={{ marginBottom: 4 }}>
            <label>{t("language")}</label>
            <LanguageSwitcher />
          </div>

          <div className="field" style={{ marginBottom: 4 }}>
            <label>{t("contrast")}</label>
            <ContrastToggle />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={start}
            disabled={status !== "ready"}
          >
            {t("startInvestigation")}
          </button>
        </div>
      </main>
    </div>
  );
}

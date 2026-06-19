import { Link, useNavigate, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useViewedEvidence } from "../hooks/useViewedEvidence";
import { useLocalProgress } from "../hooks/useLocalProgress";
import GameLayout from "./GameLayout";

export default function HomeScreen() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { viewedIds } = useViewedEvidence();
  const { finalUnlocked, resetProgress } = useLocalProgress();
  const base = `/game/${caseId}`;

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("appName")}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  const total = data.evidence.length;
  const viewedInCase = data.evidence.filter((e) =>
    viewedIds.includes(e.id),
  ).length;
  const pct = total ? Math.round((viewedInCase / total) * 100) : 0;

  function handleReset() {
    if (window.confirm(t("resetConfirm"))) {
      resetProgress();
      navigate(`/game/${caseId}`);
    }
  }

  return (
    <GameLayout title={loc(data.title)}>
      <p className="kicker">{t("appName")}</p>
      <h1>{loc(data.title)}</h1>
      <p className="muted">{loc(data.subtitle)}</p>

      <div className="card">
        <p className="section-label" style={{ marginTop: 0 }}>
          {t("objective")}
        </p>
        <p style={{ marginBottom: 0 }}>
          {loc(data.objective ?? data.subtitle)}
        </p>
      </div>

      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span className="section-label" style={{ margin: 0 }}>
            {t("progress")}
          </span>
          <span className="small muted">
            {t("evidenceViewed")}: {viewedInCase}/{total}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="home-grid">
        <Link to={`${base}/archive`} className="btn card tile">
          <span className="tile-icon" aria-hidden>
            🗂️
          </span>
          {t("archive")}
        </Link>
        <Link to={`${base}/chapters`} className="btn card tile">
          <span className="tile-icon" aria-hidden>
            📖
          </span>
          {t("chapters")}
        </Link>
        <Link to={`${base}/timeline`} className="btn card tile">
          <span className="tile-icon" aria-hidden>
            🕒
          </span>
          {t("timeline")}
        </Link>
        <Link to={`${base}/suspects`} className="btn card tile">
          <span className="tile-icon" aria-hidden>
            👥
          </span>
          {t("suspects")}
        </Link>
        <Link to={`${base}/final`} className="btn btn-primary card tile full">
          <span className="tile-icon" aria-hidden>
            {finalUnlocked ? "⚖️" : "🔒"}
          </span>
          {t("finalAccusation")}
        </Link>
      </div>

      <div style={{ marginTop: 20 }}>
        <button className="btn btn-danger" onClick={handleReset}>
          {t("resetProgress")}
        </button>
      </div>
    </GameLayout>
  );
}

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalProgress } from "../hooks/useLocalProgress";
import GameLayout from "./GameLayout";

export default function FinalSolutionScreen() {
  const { caseId } = useParams();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { finalAnswer } = useLocalProgress();
  const [revealed, setRevealed] = useState(false);

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("finalAccusation")} back={`/game/${caseId}/home`}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  const correctCulpritId = data.final.culpritSuspectId;
  const correctSuspect = data.suspects.find((s) => s.id === correctCulpritId);
  const isCorrect =
    finalAnswer != null && finalAnswer.culpritSuspectId === correctCulpritId;

  // Warning gate so the host can stop the group reaching the answer too soon.
  if (!revealed) {
    return (
      <GameLayout title={t("finalAccusation")} back={`/game/${caseId}/home`}>
        <h1>{t("viewSolution")}</h1>
        <div className="notice notice-strong">{t("solutionWarning")}</div>
        <button
          className="btn btn-primary"
          onClick={() => setRevealed(true)}
          style={{ marginTop: 12 }}
        >
          {t("showSolution")}
        </button>
      </GameLayout>
    );
  }

  return (
    <GameLayout title={t("finalAccusation")} back={`/game/${caseId}/home`}>
      {finalAnswer && (
        <div className={`solution-banner ${isCorrect ? "win" : "lose"}`}>
          <div className="verdict">
            {isCorrect ? `✓ ${t("caseSolved")}` : `✗ ${t("wrongAccusation")}`}
          </div>
        </div>
      )}

      <h2>{loc(data.final.solutionTitle)}</h2>

      {!isCorrect && finalAnswer && (
        <div className="doc-text" style={{ marginBottom: 14 }}>
          {loc(data.final.wrongAnswerExplanation)}
        </div>
      )}

      <div className="card">
        <p className="section-label" style={{ marginTop: 0 }}>
          {t("suspects")}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>{correctSuspect?.name ?? correctCulpritId}</strong>
          {correctSuspect && <> — {loc(correctSuspect.role)}</>}
        </p>
      </div>

      <div className="doc-text">{loc(data.final.solutionExplanation)}</div>

      <div style={{ marginTop: 20 }}>
        <Link className="btn" to={`/game/${caseId}/home`}>
          {t("backToHome")}
        </Link>
      </div>
    </GameLayout>
  );
}

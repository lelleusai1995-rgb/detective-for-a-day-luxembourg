import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalProgress, type FinalAnswer } from "../hooks/useLocalProgress";
import GameLayout from "./GameLayout";
import PasswordGate from "./PasswordGate";

export default function FinalAnswerForm() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const {
    finalUnlocked,
    setFinalUnlocked,
    finalAnswer,
    setFinalAnswer,
    setCompleted,
  } = useLocalProgress();

  const [culprit, setCulprit] = useState(finalAnswer?.culpritSuspectId ?? "");
  const [motive, setMotive] = useState(finalAnswer?.motive ?? "");
  const [method, setMethod] = useState(finalAnswer?.method ?? "");
  const [decisive, setDecisive] = useState(
    finalAnswer?.decisiveEvidence ?? "",
  );
  const [redHerring, setRedHerring] = useState(finalAnswer?.redHerring ?? "");
  const [confidence, setConfidence] = useState<FinalAnswer["confidence"]>(
    finalAnswer?.confidence ?? "medium",
  );
  const [editing, setEditing] = useState(false);

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("finalAccusation")}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  // Gate: requires the final password (also reachable from chapter 4).
  if (!finalUnlocked) {
    return (
      <GameLayout title={t("finalAccusation")} back={`/game/${caseId}/home`}>
        <h1>{t("finalLocked")}</h1>
        <p className="muted">{t("finalLockedHelp")}</p>
        <PasswordGate
          password={data.final.unlockPassword}
          acceptedAnswers={data.final.acceptedUnlockAnswers}
          label={t("finalUnlockPassword")}
          onUnlock={() => setFinalUnlocked(true)}
          altPassword={data.hostSolutionCode}
          onAlt={() => {
            // Host/facilitator code: unlock and jump straight to the solution.
            setFinalUnlocked(true);
            navigate(`/game/${caseId}/solution`);
          }}
        />
      </GameLayout>
    );
  }

  const submitted = finalAnswer !== null && !editing;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const answer: FinalAnswer = {
      culpritSuspectId: culprit,
      motive,
      method,
      decisiveEvidence: decisive,
      redHerring,
      confidence,
      submittedAt: new Date().toISOString(),
    };
    setFinalAnswer(answer);
    setCompleted(true);
    setEditing(false);
  }

  if (submitted) {
    return (
      <GameLayout title={t("finalAccusation")} back={`/game/${caseId}/home`}>
        <div className="notice">{t("answerSaved")}</div>
        <div className="card">
          <p className="section-label" style={{ marginTop: 0 }}>
            {t("yourAccusation")}
          </p>
          <p>
            <strong>
              {data.suspects.find((s) => s.id === finalAnswer!.culpritSuspectId)
                ?.name ?? "—"}
            </strong>
          </p>
          <p className="small muted">{finalAnswer!.motive}</p>
        </div>
        <div className="stack">
          <button className="btn" onClick={() => setEditing(true)}>
            {t("editAnswer")}
          </button>
          <Link className="btn btn-primary" to={`/game/${caseId}/solution`}>
            {t("viewSolution")} →
          </Link>
        </div>
      </GameLayout>
    );
  }

  return (
    <GameLayout title={t("finalAccusation")} back={`/game/${caseId}/home`}>
      <h1>{t("finalAccusation")}</h1>
      <form className="card stack" onSubmit={submit}>
        <div className="field">
          <label htmlFor="culprit">{loc(qLabel(data, "culprit"))}</label>
          <select
            id="culprit"
            value={culprit}
            onChange={(e) => setCulprit(e.target.value)}
            required
          >
            <option value="">{t("selectSuspect")}</option>
            {data.suspects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="motive">{loc(qLabel(data, "motive"))}</label>
          <textarea
            id="motive"
            value={motive}
            onChange={(e) => setMotive(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="method">{loc(qLabel(data, "method"))}</label>
          <textarea
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="decisive">{loc(qLabel(data, "decisive"))}</label>
          <textarea
            id="decisive"
            value={decisive}
            onChange={(e) => setDecisive(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="redherring">{loc(qLabel(data, "redHerring"))}</label>
          <textarea
            id="redherring"
            value={redHerring}
            onChange={(e) => setRedHerring(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="confidence">{t("confidence")}</label>
          <select
            id="confidence"
            value={confidence}
            onChange={(e) =>
              setConfidence(e.target.value as FinalAnswer["confidence"])
            }
          >
            <option value="low">{t("low")}</option>
            <option value="medium">{t("medium")}</option>
            <option value="high">{t("high")}</option>
          </select>
        </div>

        <button className="btn btn-primary" type="submit" disabled={!culprit}>
          {t("submitAccusation")}
        </button>
      </form>
    </GameLayout>
  );
}

// Use the case-configured question labels if present, else fall back to a
// localized default keyed by the slot.
function qLabel(
  data: { final: { questions: { id: string; label: { en?: string } }[] } },
  slot: string,
) {
  const found = data.final.questions.find((q) => q.id === slot);
  if (found) return found.label;
  const defaults: Record<string, { en: string }> = {
    culprit: { en: "Who is the culprit?" },
    motive: { en: "What is the motive?" },
    method: { en: "How was it done?" },
    decisive: { en: "Which evidence is decisive?" },
    redHerring: { en: "Which red herring had to be discarded?" },
  };
  return defaults[slot] ?? { en: slot };
}

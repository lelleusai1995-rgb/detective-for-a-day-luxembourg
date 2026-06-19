import { Link, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useViewedEvidence } from "../hooks/useViewedEvidence";
import { useLocalProgress } from "../hooks/useLocalProgress";
import { isChapterAccessible, findGatingChapter } from "../utils/progression";
import GameLayout from "./GameLayout";
import EvidenceCard from "./EvidenceCard";
import PasswordGate from "./PasswordGate";

export default function ChapterDetail() {
  const { caseId, chapterId } = useParams();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { isViewed } = useViewedEvidence();
  const { unlockedChapters, unlockChapter, setFinalUnlocked, isChapterUnlocked } =
    useLocalProgress();

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("chapters")} back={`/game/${caseId}/chapters`}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  const chapter = data.chapters.find((c) => c.id === chapterId);
  if (!chapter) {
    return (
      <GameLayout title={t("chapters")} back={`/game/${caseId}/chapters`}>
        <p className="notice notice-strong">{t("noResults")}</p>
      </GameLayout>
    );
  }

  // ---- Locked chapter: reveal only a password gate, never the content. ----
  if (!isChapterAccessible(chapter, unlockedChapters)) {
    const gate = findGatingChapter(data, chapter.id);
    return (
      <GameLayout title={t("locked")} back={`/game/${caseId}/chapters`}>
        <p className="kicker">{loc(chapter.title)}</p>
        <h1>🔒 {t("chapterLocked")}</h1>
        <p className="muted">{t("chapterLockedHelp")}</p>
        {gate?.unlock ? (
          <PasswordGate
            password={gate.unlock.password}
            acceptedAnswers={gate.unlock.acceptedAnswers}
            onUnlock={() => unlockChapter(chapter.id)}
          />
        ) : (
          <p className="notice notice-strong">{t("noResults")}</p>
        )}
      </GameLayout>
    );
  }

  const chapterEvidence = chapter.evidenceIds
    .map((id) => data.evidence.find((e) => e.id === id))
    .filter(Boolean);

  const unlock = chapter.unlock;
  const nextAlreadyUnlocked =
    unlock?.unlocksFinal === true
      ? false
      : unlock?.nextChapterId
        ? isChapterUnlocked(unlock.nextChapterId)
        : false;

  return (
    <GameLayout title={loc(chapter.title)} back={`/game/${caseId}/chapters`}>
      <p className="kicker">{loc(chapter.title)}</p>
      <h1>{loc(chapter.title)}</h1>
      <p>{loc(chapter.intro)}</p>

      <div className="card">
        <p className="section-label" style={{ marginTop: 0 }}>
          {t("chapterObjective")}
        </p>
        <p style={{ marginBottom: 0 }}>{loc(chapter.objective)}</p>
      </div>

      {chapter.question && (
        <div className="card">
          <p className="section-label" style={{ marginTop: 0 }}>
            {t("discussionQuestion")}
          </p>
          <p style={{ marginBottom: 0 }}>{loc(chapter.question)}</p>
        </div>
      )}

      <p className="section-label">{t("evidenceInChapter")}</p>
      {chapterEvidence.length === 0 ? (
        <p className="muted">{t("noResults")}</p>
      ) : (
        chapterEvidence.map((e) => (
          <EvidenceCard
            key={e!.id}
            evidence={e!}
            caseData={data}
            caseId={caseId!}
            viewed={isViewed(e!.id)}
          />
        ))
      )}

      {unlock && (
        <div style={{ marginTop: 18 }}>
          <p className="section-label">
            {unlock.unlocksFinal ? t("finalUnlockPassword") : t("unlocksNext")}
          </p>
          {nextAlreadyUnlocked ? (
            <p className="notice">
              ✓ {t("unlocked")} —{" "}
              <Link to={`/game/${caseId}/chapter/${unlock.nextChapterId}`}>
                {t("continue")}
              </Link>
            </p>
          ) : (
            <PasswordGate
              password={unlock.password}
              acceptedAnswers={unlock.acceptedAnswers}
              onUnlock={() => {
                if (unlock.unlocksFinal) {
                  setFinalUnlocked(true);
                } else if (unlock.nextChapterId) {
                  unlockChapter(unlock.nextChapterId);
                }
              }}
            />
          )}
          {unlock.unlocksFinal && (
            <Link className="btn btn-primary" to={`/game/${caseId}/final`}>
              {t("finalAccusation")} →
            </Link>
          )}
        </div>
      )}
    </GameLayout>
  );
}

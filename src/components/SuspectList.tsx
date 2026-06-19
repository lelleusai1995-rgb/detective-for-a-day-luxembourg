import { useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalProgress } from "../hooks/useLocalProgress";
import { isChapterAccessible } from "../utils/progression";
import GameLayout from "./GameLayout";
import SuspectCard from "./SuspectCard";

export default function SuspectList() {
  const { caseId } = useParams();
  const { t } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { unlockedChapters } = useLocalProgress();

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("suspects")}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  // Deeper for/against analysis stays hidden until the relevant chapter is
  // accessible, so the Suspects screen doesn't spoil late-game reasoning.
  function detailsRevealed(revealFromChapter?: string): boolean {
    if (!revealFromChapter) return true;
    const chapter = data!.chapters.find((c) => c.id === revealFromChapter);
    if (!chapter) return true;
    return isChapterAccessible(chapter, unlockedChapters);
  }

  return (
    <GameLayout title={t("suspects")}>
      <h1>{t("suspects")}</h1>
      <p className="muted">{t("tagline")}</p>
      {data.suspects
        .filter((s) => detailsRevealed(s.visibleFromChapter))
        .map((s) => (
          <SuspectCard
            key={s.id}
            suspect={s}
            revealDetails={detailsRevealed(s.revealFromChapter)}
          />
        ))}
    </GameLayout>
  );
}

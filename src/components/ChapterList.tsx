import { Link, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalProgress } from "../hooks/useLocalProgress";
import { isChapterAccessible } from "../utils/progression";
import GameLayout from "./GameLayout";

/**
 * The chapter list shows every chapter, but locked chapters only open a
 * password gate (see ChapterDetail) — their evidence and content stay hidden
 * until the previous chapter's answer is entered.
 */
export default function ChapterList() {
  const { caseId } = useParams();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { unlockedChapters } = useLocalProgress();

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("chapters")}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  const ordered = [...data.chapters].sort((a, b) => a.order - b.order);

  return (
    <GameLayout title={t("chapters")}>
      {ordered.map((c) => {
        const accessible = isChapterAccessible(c, unlockedChapters);
        return (
          <Link
            key={c.id}
            to={`/game/${caseId}/chapter/${c.id}`}
            className="card card-link"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <p className="kicker">{loc(c.title)}</p>
                {/* Locked chapters reveal no narrative content, only the title. */}
                {accessible && <p className="card-desc">{loc(c.intro)}</p>}
              </div>
              <span
                className={`badge ${accessible ? "badge-green" : "badge-amber"}`}
              >
                {accessible ? `✓ ${t("unlocked")}` : `🔒 ${t("locked")}`}
              </span>
            </div>
          </Link>
        );
      })}
    </GameLayout>
  );
}

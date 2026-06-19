import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useViewedEvidence } from "../hooks/useViewedEvidence";
import { useLocalProgress } from "../hooks/useLocalProgress";
import { isEvidenceAccessible } from "../utils/progression";
import GameLayout from "./GameLayout";
import EvidenceCard from "./EvidenceCard";
import { pickText } from "../utils/assetUtils";

type StatusFilter = "all" | "viewed" | "not_viewed";

export default function EvidenceArchive() {
  const { caseId } = useParams();
  const { language, t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { isViewed } = useViewedEvidence();
  const { unlockedChapters } = useLocalProgress();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [chapter, setChapter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    return data.evidence.filter((e) => {
      // Never leak evidence from chapters that are still locked.
      if (!isEvidenceAccessible(data, e.chapterId, unlockedChapters)) {
        return false;
      }
      if (category !== "all" && e.category !== category) return false;
      if (chapter !== "all" && e.chapterId !== chapter) return false;
      if (statusFilter === "viewed" && !isViewed(e.id)) return false;
      if (statusFilter === "not_viewed" && isViewed(e.id)) return false;
      if (q) {
        const haystack = [
          pickText(e.title, language),
          pickText(e.description, language),
          ...(e.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [
    data,
    query,
    category,
    chapter,
    statusFilter,
    isViewed,
    language,
    unlockedChapters,
  ]);

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("archive")}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  const categories = Object.keys(data.categories ?? {});
  // Only offer chapter filters / counts for chapters the device can read.
  const visibleChapters = data.chapters.filter((c) =>
    isEvidenceAccessible(data, c.id, unlockedChapters),
  );
  const accessibleTotal = data.evidence.filter((e) =>
    isEvidenceAccessible(data, e.chapterId, unlockedChapters),
  ).length;

  return (
    <GameLayout title={t("archive")}>
      <div className="field">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("search")}
        />
      </div>

      <p className="section-label">{t("filterChapter")}</p>
      <div className="chip-row">
        <button
          className={`chip ${chapter === "all" ? "active" : ""}`}
          onClick={() => setChapter("all")}
        >
          {t("allChapters")}
        </button>
        {visibleChapters.map((c) => (
          <button
            key={c.id}
            className={`chip ${chapter === c.id ? "active" : ""}`}
            onClick={() => setChapter(c.id)}
          >
            {loc(c.title)}
          </button>
        ))}
      </div>

      {categories.length > 0 && (
        <>
          <p className="section-label">{t("filterCategory")}</p>
          <div className="chip-row">
            <button
              className={`chip ${category === "all" ? "active" : ""}`}
              onClick={() => setCategory("all")}
            >
              {t("allCategories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {loc(data.categories![cat])}
              </button>
            ))}
          </div>
        </>
      )}

      <p className="section-label">{t("filterStatus")}</p>
      <div className="chip-row">
        {(["all", "not_viewed", "viewed"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            className={`chip ${statusFilter === s ? "active" : ""}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === "all"
              ? t("all")
              : s === "viewed"
                ? t("viewed")
                : t("notViewed")}
          </button>
        ))}
      </div>

      <p className="small muted" style={{ marginTop: 14 }}>
        {filtered.length} / {accessibleTotal}
      </p>

      {filtered.length === 0 ? (
        <p className="muted">{t("noResults")}</p>
      ) : (
        filtered.map((e) => (
          <EvidenceCard
            key={e.id}
            evidence={e}
            caseData={data}
            caseId={caseId!}
            viewed={isViewed(e.id)}
          />
        ))
      )}
    </GameLayout>
  );
}

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useViewedEvidence } from "../hooks/useViewedEvidence";
import { useLocalProgress } from "../hooks/useLocalProgress";
import { useAssetManifest, filesForFolder } from "../hooks/useAssetManifest";
import { isEvidenceAccessible } from "../utils/progression";
import GameLayout from "./GameLayout";
import AssetViewer from "./AssetViewer";

export default function EvidenceDetail() {
  const { caseId, evidenceId } = useParams();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { markViewed } = useViewedEvidence();
  const { unlockedChapters } = useLocalProgress();
  const manifest = useAssetManifest(caseId);

  const evidence = data?.evidence.find((e) => e.id === evidenceId);
  const accessible =
    !!data &&
    !!evidence &&
    isEvidenceAccessible(data, evidence.chapterId, unlockedChapters);

  useEffect(() => {
    if (evidence && accessible) markViewed(evidence.id);
  }, [evidence, accessible, markViewed]);

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("archive")} back={`/game/${caseId}/archive`}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  if (!evidence) {
    return (
      <GameLayout title={t("archive")} back={`/game/${caseId}/archive`}>
        <p className="notice notice-strong">{t("noResults")}</p>
        <Link className="btn" to={`/game/${caseId}/archive`}>
          {t("backToArchive")}
        </Link>
      </GameLayout>
    );
  }

  // Locked evidence must not reveal its content: send the player to the gate.
  if (!accessible) {
    return (
      <GameLayout title={t("locked")} back={`/game/${caseId}/archive`}>
        <h1>🔒 {t("chapterLocked")}</h1>
        <p className="muted">{t("chapterLockedHelp")}</p>
        <Link
          className="btn btn-primary"
          to={`/game/${caseId}/chapter/${evidence.chapterId}`}
        >
          {t("chapters")} →
        </Link>
      </GameLayout>
    );
  }

  const chapter = data.chapters.find((c) => c.id === evidence.chapterId);
  const categoryLabel = data.categories?.[evidence.category];
  const relatedSuspects = (evidence.relatedSuspects ?? [])
    .map((id) => data.suspects.find((s) => s.id === id))
    .filter(Boolean);
  const files = filesForFolder(manifest, evidence.assetFolder);

  return (
    <GameLayout title={loc(evidence.title)} back={`/game/${caseId}/archive`}>
      <h1>{loc(evidence.title)}</h1>

      <div className="badge-row">
        {categoryLabel && <span className="badge">{loc(categoryLabel)}</span>}
        {chapter && <span className="badge">{loc(chapter.title)}</span>}
        {evidence.recommendedFirstRead && (
          <span className="badge badge-gold">★ {t("recommendedFirstRead")}</span>
        )}
      </div>

      <p className="muted">{loc(evidence.description)}</p>

      <AssetViewer evidence={evidence} files={files} />

      {relatedSuspects.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <p className="section-label">{t("relatedSuspects")}</p>
          <div className="badge-row">
            {relatedSuspects.map((s) => (
              <Link
                key={s!.id}
                to={`/game/${caseId}/suspects`}
                className="badge"
              >
                {s!.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <Link className="btn" to={`/game/${caseId}/archive`}>
          ← {t("backToArchive")}
        </Link>
      </div>
    </GameLayout>
  );
}

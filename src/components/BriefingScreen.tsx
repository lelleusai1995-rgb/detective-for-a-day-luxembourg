import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useViewedEvidence } from "../hooks/useViewedEvidence";
import { useAssetManifest, filesForFolder } from "../hooks/useAssetManifest";
import GameLayout from "./GameLayout";
import AssetViewer from "./AssetViewer";

/**
 * Shown right after the start screen: the opening briefing, i.e. the evidence
 * flagged `recommendedFirstRead` (falling back to the first chapter-0 item).
 * The player can then continue into the case.
 */
export default function BriefingScreen() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { markViewed } = useViewedEvidence();
  const manifest = useAssetManifest(caseId);

  const briefing =
    data?.evidence.find((e) => e.recommendedFirstRead) ??
    data?.evidence.find((e) => e.chapterId === "chapter-0") ??
    data?.evidence[0];

  useEffect(() => {
    if (briefing) markViewed(briefing.id);
  }, [briefing, markViewed]);

  if (status !== "ready" || !data || !briefing) {
    return (
      <GameLayout title={t("briefingTitle")} hideNav>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  return (
    <GameLayout title={t("briefingTitle")} hideNav>
      <p className="kicker">{t("recommendedFirstRead")}</p>
      <h1>{loc(briefing.title)}</h1>
      <p className="muted">{loc(briefing.description)}</p>

      <AssetViewer
        evidence={briefing}
        files={filesForFolder(manifest, briefing.assetFolder)}
      />

      <div style={{ marginTop: 20 }}>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/game/${caseId}/home`)}
        >
          {t("continueToArchive")} →
        </button>
      </div>
    </GameLayout>
  );
}

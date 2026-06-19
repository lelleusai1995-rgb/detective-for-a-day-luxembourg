import { Link } from "react-router-dom";
import type { CaseConfig, Evidence } from "../types/caseTypes";
import { useLanguage } from "../hooks/useLanguage";

const TYPE_ICON: Record<Evidence["type"], string> = {
  text: "📝",
  pdf: "📄",
  image: "🖼️",
  audio: "🎧",
  link: "🔗",
};

type Props = {
  evidence: Evidence;
  caseData: CaseConfig;
  caseId: string;
  viewed: boolean;
};

export default function EvidenceCard({
  evidence,
  caseData,
  caseId,
  viewed,
}: Props) {
  const { t, loc } = useLanguage();
  const categoryLabel = caseData.categories?.[evidence.category];

  return (
    <Link
      to={`/game/${caseId}/evidence/${evidence.id}`}
      className="card card-link"
    >
      <div
        style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
      >
        <span style={{ fontSize: "1.4rem" }} aria-hidden>
          {TYPE_ICON[evidence.type]}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="card-title">{loc(evidence.title)}</p>
          <p className="card-desc">{loc(evidence.description)}</p>
          <div className="badge-row">
            {categoryLabel && (
              <span className="badge">{loc(categoryLabel)}</span>
            )}
            {evidence.recommendedFirstRead && (
              <span className="badge badge-gold">★ {t("recommendedFirstRead")}</span>
            )}
            {viewed && <span className="badge badge-green">✓ {t("viewedBadge")}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

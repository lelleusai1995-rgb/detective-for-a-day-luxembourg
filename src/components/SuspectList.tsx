import { useParams } from "react-router-dom";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import GameLayout from "./GameLayout";
import SuspectCard from "./SuspectCard";

export default function SuspectList() {
  const { caseId } = useParams();
  const { t } = useLanguage();
  const { status, data } = useCaseData(caseId);

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("suspects")}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  return (
    <GameLayout title={t("suspects")}>
      <h1>{t("suspects")}</h1>
      <p className="muted">{t("tagline")}</p>
      {data.suspects.map((s) => (
        <SuspectCard key={s.id} suspect={s} />
      ))}
    </GameLayout>
  );
}

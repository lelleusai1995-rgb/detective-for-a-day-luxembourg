import { useParams } from "react-router-dom";
import type { TimelineReliability } from "../types/caseTypes";
import { useCaseData } from "../hooks/useCaseData";
import { useLanguage } from "../hooks/useLanguage";
import { useLocalProgress } from "../hooks/useLocalProgress";
import { isChapterAccessible } from "../utils/progression";
import GameLayout from "./GameLayout";

const RELIABILITY_BADGE: Record<TimelineReliability, string> = {
  confirmed: "badge-green",
  probable: "badge-amber",
  disputed: "badge-red",
};

export default function TimelineView() {
  const { caseId } = useParams();
  const { t, loc } = useLanguage();
  const { status, data } = useCaseData(caseId);
  const { unlockedChapters } = useLocalProgress();

  if (status !== "ready" || !data) {
    return (
      <GameLayout title={t("timeline")}>
        <p className="muted">
          {status === "error" ? t("loadError") : t("loading")}
        </p>
      </GameLayout>
    );
  }

  const reliabilityLabel: Record<TimelineReliability, string> = {
    confirmed: t("confirmed"),
    probable: t("probable"),
    disputed: t("disputed"),
  };

  // Hide events tied to chapters the player has not yet unlocked, so the
  // timeline never narrates the solution ahead of progress.
  const visibleEvents = data.timeline.filter((ev) => {
    if (!ev.visibleFromChapter) return true;
    const chapter = data.chapters.find((c) => c.id === ev.visibleFromChapter);
    if (!chapter) return true;
    return isChapterAccessible(chapter, unlockedChapters);
  });

  // Group events by date, preserving the order given in the case file.
  const byDate: { date: string; events: typeof data.timeline }[] = [];
  for (const ev of visibleEvents) {
    let bucket = byDate.find((b) => b.date === ev.date);
    if (!bucket) {
      bucket = { date: ev.date, events: [] };
      byDate.push(bucket);
    }
    bucket.events.push(ev);
  }

  return (
    <GameLayout title={t("timeline")}>
      <h1>{t("timeline")}</h1>
      {byDate.map((bucket) => (
        <div key={bucket.date}>
          <p className="section-label">{bucket.date}</p>
          {bucket.events.map((ev) => (
            <div key={ev.id} className="timeline-event">
              {ev.time && <div className="timeline-time">{ev.time}</div>}
              <div style={{ fontWeight: 700 }}>{loc(ev.title)}</div>
              <p className="card-desc" style={{ marginBottom: 6 }}>
                {loc(ev.description)}
              </p>
              <div className="badge-row">
                {ev.location && <span className="badge">📍 {ev.location}</span>}
                <span className={`badge ${RELIABILITY_BADGE[ev.reliability]}`}>
                  {reliabilityLabel[ev.reliability]}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </GameLayout>
  );
}

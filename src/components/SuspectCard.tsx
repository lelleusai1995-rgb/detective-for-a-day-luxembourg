import type { Suspect, SuspectStatus } from "../types/caseTypes";
import { useLanguage } from "../hooks/useLanguage";

const STATUS_BADGE: Record<SuspectStatus, string> = {
  witness: "badge",
  suspect: "badge-amber",
  strong_suspect: "badge-red",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function SuspectCard({ suspect }: { suspect: Suspect }) {
  const { t, loc } = useLanguage();

  const statusLabelKey: Record<SuspectStatus, string> = {
    witness: t("statusWitness"),
    suspect: t("statusSuspect"),
    strong_suspect: t("statusStrongSuspect"),
  };

  return (
    <div className="card suspect-card">
      <div className="suspect-head">
        {suspect.avatar ? (
          <img className="avatar" src={suspect.avatar} alt="" />
        ) : (
          <span className="avatar" aria-hidden>
            {initials(suspect.name)}
          </span>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="card-title" style={{ margin: 0 }}>
            {suspect.name}
          </p>
          <p className="card-desc" style={{ margin: 0 }}>
            {loc(suspect.role)}
          </p>
        </div>
      </div>

      {suspect.status && (
        <div className="badge-row">
          <span className={`badge ${STATUS_BADGE[suspect.status]}`}>
            {statusLabelKey[suspect.status]}
          </span>
        </div>
      )}

      <p style={{ marginBottom: 8 }}>{loc(suspect.profile)}</p>

      <details>
        <summary>{t("declaredAlibi")}</summary>
        <p style={{ margin: "8px 0 0" }}>{loc(suspect.declaredAlibi)}</p>
      </details>

      <details>
        <summary>{t("motive")}</summary>
        <p style={{ margin: "8px 0 0" }}>{loc(suspect.motive)}</p>
      </details>

      {suspect.contraEvidence && suspect.contraEvidence.length > 0 && (
        <details>
          <summary>{t("evidenceAgainst")}</summary>
          <ul className="inline-list" style={{ marginTop: 8 }}>
            {suspect.contraEvidence.map((c, i) => (
              <li key={i}>{loc(c)}</li>
            ))}
          </ul>
        </details>
      )}

      {suspect.proEvidence && suspect.proEvidence.length > 0 && (
        <details>
          <summary>{t("evidenceFor")}</summary>
          <ul className="inline-list" style={{ marginTop: 8 }}>
            {suspect.proEvidence.map((c, i) => (
              <li key={i}>{loc(c)}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}

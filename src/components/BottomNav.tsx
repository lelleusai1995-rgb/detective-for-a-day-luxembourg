import { NavLink, useParams } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function BottomNav() {
  const { caseId } = useParams();
  const { t } = useLanguage();
  const base = `/game/${caseId}`;

  const items = [
    { to: `${base}/home`, icon: "🏠", label: t("home") },
    { to: `${base}/archive`, icon: "🗂️", label: t("archive") },
    { to: `${base}/chapters`, icon: "📖", label: t("chapters") },
    { to: `${base}/timeline`, icon: "🕒", label: t("timeline") },
    { to: `${base}/suspects`, icon: "👥", label: t("suspects") },
  ];

  return (
    <nav className="bottom-nav" aria-label="Primary">
      <div className="bottom-nav-inner">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon" aria-hidden>
              {it.icon}
            </span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

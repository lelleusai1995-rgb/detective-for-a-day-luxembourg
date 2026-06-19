import { useState } from "react";
import type { Evidence, ManifestFile } from "../types/caseTypes";
import { useLanguage } from "../hooks/useLanguage";
import { pickAsset, fileExtension } from "../utils/assetUtils";

const IMAGE_EXTS = ["png", "jpg", "jpeg", "gif", "webp", "svg"];
const AUDIO_EXTS = ["mp3", "wav", "ogg", "m4a"];
const TEXTISH_EXTS = ["txt", "md", "csv"];

/** Turn a file name into a readable label: "body-discovery-report" -> "Body discovery report". */
function readableName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/**
 * Renders the body of a piece of evidence. Attachments come from the generated
 * assets manifest (files dropped into the evidence folder); a legacy `file`
 * path in case.json is used as a fallback. The internal text `content` is
 * ALWAYS shown when present, so a missing or not-yet-added file never blocks
 * the player and the app never crashes because a file is absent.
 */
export default function AssetViewer({
  evidence,
  files = [],
}: {
  evidence: Evidence;
  files?: ManifestFile[];
}) {
  const { language, t, loc } = useLanguage();
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  const content = loc(evidence.content);
  const transcript = loc(evidence.transcript);
  const externalUrl = pickAsset(evidence.externalUrl, language);

  // Resolve the attachments to show: manifest files first, else the legacy
  // single `file` path from case.json (kept for backward compatibility).
  let attachments: ManifestFile[] = files;
  if (attachments.length === 0) {
    const legacy = pickAsset(evidence.file, language);
    if (legacy) {
      const ext = fileExtension(legacy);
      const name = legacy.split("/").pop() ?? legacy;
      attachments = [{ url: legacy, name, ext }];
    }
  }

  function markFailed(url: string) {
    setFailed((prev) => ({ ...prev, [url]: true }));
  }

  function renderOne(file: ManifestFile, showLabel: boolean) {
    const ext = file.ext;
    const isImage = IMAGE_EXTS.includes(ext);
    const isAudio = AUDIO_EXTS.includes(ext);
    const isPdf = ext === "pdf";
    const isTextish = TEXTISH_EXTS.includes(ext);
    const broken = failed[file.url];

    return (
      <div className="stack" key={file.url}>
        {showLabel && (
          <p className="section-label" style={{ marginBottom: 0 }}>
            {readableName(file.name)}
          </p>
        )}

        {isImage && !broken && (
          <>
            <img
              className="asset-image"
              src={file.url}
              alt={loc(evidence.title)}
              loading="lazy"
              onError={() => markFailed(file.url)}
            />
            <a
              className="btn btn-ghost"
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("openImageNewTab")} ↗
            </a>
          </>
        )}

        {isPdf && !broken && (
          <>
            <object
              className="asset-frame"
              data={file.url}
              type="application/pdf"
              aria-label={loc(evidence.title)}
            >
              <p className="muted small">{t("assetMissing")}</p>
            </object>
            <div className="btn-row">
              <a
                className="btn"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("openPdfNewTab")} ↗
              </a>
              <a className="btn btn-ghost" href={file.url} download>
                {t("downloadFile")}
              </a>
            </div>
          </>
        )}

        {isAudio && (
          <audio controls preload="none" src={file.url}>
            {t("assetMissing")}
          </audio>
        )}

        {(isTextish || (!isImage && !isPdf && !isAudio)) && (
          <a
            className="btn"
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("openAttachment")} ↗
          </a>
        )}

        {(isImage || isPdf) && broken && (
          <a className="btn btn-ghost" href={file.url} download>
            {t("downloadFile")}
          </a>
        )}
      </div>
    );
  }

  const expectsFile =
    evidence.type === "pdf" ||
    evidence.type === "image" ||
    evidence.type === "audio";
  const showMissingNote =
    attachments.length === 0 && externalUrl === undefined && expectsFile;

  return (
    <div className="stack">
      {/* ---- LINK ---- */}
      {evidence.type === "link" && externalUrl && (
        <a
          className="btn btn-primary"
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("openLinkNewTab")} ↗
        </a>
      )}

      {/* ---- Attachments (manifest or legacy file) ---- */}
      {attachments.length === 1 && renderOne(attachments[0], false)}
      {attachments.length > 1 && (
        <div className="stack">
          <p className="section-label" style={{ marginBottom: 0 }}>
            {t("attachments")} ({attachments.length})
          </p>
          {attachments.map((f) => (
            <div className="card" key={f.url} style={{ marginBottom: 0 }}>
              {renderOne(f, true)}
            </div>
          ))}
        </div>
      )}

      {/* ---- Gentle, non-immersion-breaking note when a file is not added yet ---- */}
      {showMissingNote && (
        <p className="notice">{t("assetMissing")}</p>
      )}

      {/* ---- Internal text content: the always-available fallback ---- */}
      {content && <div className="doc-text">{content}</div>}

      {/* ---- Transcript (esp. for audio) ---- */}
      {transcript && (
        <div>
          <p className="section-label">{t("transcript")}</p>
          <div className="doc-text">{transcript}</div>
        </div>
      )}

      {!content && !transcript && attachments.length === 0 && !externalUrl && (
        <p className="muted">{t("assetMissing")}</p>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import type { AssetManifest, ManifestFile } from "../types/caseTypes";

/**
 * Loads the generated assets manifest for a case (static JSON in /public).
 * The manifest lists the files found in each evidence folder, so the app can
 * attach attachments without any path being hard-coded in case.json.
 *
 * Missing/!ok/parse-failure all resolve to an empty manifest: evidence then
 * falls back to its text content, exactly as before.
 */

const cache = new Map<string, AssetManifest>();
const EMPTY: AssetManifest = { folders: {} };

export function useAssetManifest(caseId: string | undefined): AssetManifest {
  const [manifest, setManifest] = useState<AssetManifest>(
    () => (caseId && cache.get(caseId)) || EMPTY,
  );

  useEffect(() => {
    if (!caseId) return;
    if (cache.has(caseId)) {
      setManifest(cache.get(caseId)!);
      return;
    }
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}cases/${caseId}/assets-manifest.json`)
      .then((res) => (res.ok ? res.json() : EMPTY))
      .then((data: AssetManifest) => {
        if (cancelled) return;
        const safe: AssetManifest =
          data && typeof data === "object" && data.folders
            ? data
            : EMPTY;
        cache.set(caseId, safe);
        setManifest(safe);
      })
      .catch(() => {
        if (cancelled) return;
        cache.set(caseId, EMPTY);
        setManifest(EMPTY);
      });
    return () => {
      cancelled = true;
    };
  }, [caseId]);

  return manifest;
}

/** Files attached to an evidence folder, or [] when none / no folder set. */
export function filesForFolder(
  manifest: AssetManifest,
  assetFolder: string | undefined,
): ManifestFile[] {
  if (!assetFolder) return [];
  return manifest.folders[assetFolder] ?? [];
}

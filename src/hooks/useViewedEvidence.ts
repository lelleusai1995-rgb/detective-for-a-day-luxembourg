import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../utils/storage";

/** Tracks which evidence ids have been opened, persisted per device. */
export function useViewedEvidence() {
  const [viewedIds, setViewedIds] = useLocalStorage<string[]>(
    STORAGE_KEYS.viewedEvidence,
    [],
  );

  const markViewed = useCallback(
    (evidenceId: string) => {
      setViewedIds((prev) =>
        prev.includes(evidenceId) ? prev : [...prev, evidenceId],
      );
    },
    [setViewedIds],
  );

  const isViewed = useCallback(
    (evidenceId: string) => viewedIds.includes(evidenceId),
    [viewedIds],
  );

  return { viewedIds, markViewed, isViewed, setViewedIds };
}

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {
  STORAGE_KEYS,
  LEGACY_STORAGE_KEYS,
  removeStorage,
} from "../utils/storage";

export type FinalAnswer = {
  culpritSuspectId: string;
  motive: string;
  method: string;
  decisiveEvidence: string;
  redHerring: string;
  confidence: "low" | "medium" | "high";
  submittedAt: string;
};

/**
 * All non-language, non-evidence progress for the current device:
 * unlocked chapters, final-box unlock state, the submitted answer
 * and the completion flag. No player identity is stored — each device keeps
 * its own anonymous progress.
 */
export function useLocalProgress() {
  const [unlockedChapters, setUnlockedChapters] = useLocalStorage<string[]>(
    STORAGE_KEYS.unlockedChapters,
    [],
  );
  const [finalUnlocked, setFinalUnlocked] = useLocalStorage<boolean>(
    STORAGE_KEYS.finalUnlocked,
    false,
  );
  const [finalAnswer, setFinalAnswer] = useLocalStorage<FinalAnswer | null>(
    STORAGE_KEYS.finalAnswer,
    null,
  );
  const [completed, setCompleted] = useLocalStorage<boolean>(
    STORAGE_KEYS.completed,
    false,
  );

  const unlockChapter = useCallback(
    (chapterId: string) => {
      setUnlockedChapters((prev) =>
        prev.includes(chapterId) ? prev : [...prev, chapterId],
      );
    },
    [setUnlockedChapters],
  );

  const isChapterUnlocked = useCallback(
    (chapterId: string) => unlockedChapters.includes(chapterId),
    [unlockedChapters],
  );

  const resetProgress = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach(removeStorage);
    LEGACY_STORAGE_KEYS.forEach(removeStorage);
    setUnlockedChapters([]);
    setFinalUnlocked(false);
    setFinalAnswer(null);
    setCompleted(false);
  }, [
    setUnlockedChapters,
    setFinalUnlocked,
    setFinalAnswer,
    setCompleted,
  ]);

  return {
    unlockedChapters,
    unlockChapter,
    isChapterUnlocked,
    setUnlockedChapters,
    finalUnlocked,
    setFinalUnlocked,
    finalAnswer,
    setFinalAnswer,
    completed,
    setCompleted,
    resetProgress,
  };
}

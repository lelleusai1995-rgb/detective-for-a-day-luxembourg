// ---------------------------------------------------------------------------
// Chapter progression helpers.
//
// The briefing (order 0) and the first real chapter (order 1) are always open.
// Every later chapter must be unlocked with the password configured on the
// chapter that precedes it (see `unlock.nextChapterId` in case.json). This logic
// is generic: it reads chapter `order` and the device's unlocked-chapter list,
// never any case-specific id.
// ---------------------------------------------------------------------------

import type { CaseConfig, Chapter } from "../types/caseTypes";

/** True when the chapter can be opened on this device. */
export function isChapterAccessible(
  chapter: Chapter,
  unlockedChapterIds: string[],
): boolean {
  return chapter.order <= 1 || unlockedChapterIds.includes(chapter.id);
}

/** The chapter whose password unlocks `chapterId` (undefined for open chapters). */
export function findGatingChapter(
  data: CaseConfig,
  chapterId: string,
): Chapter | undefined {
  return data.chapters.find((c) => c.unlock?.nextChapterId === chapterId);
}

/**
 * Whether a given evidence item is currently readable on this device.
 * In `all_unlocked` mode everything is readable. In `chapter_locked` mode an
 * item is readable only when its chapter is accessible.
 */
export function isEvidenceAccessible(
  data: CaseConfig,
  evidenceChapterId: string,
  unlockedChapterIds: string[],
): boolean {
  if (data.evidenceUnlockMode !== "chapter_locked") return true;
  const chapter = data.chapters.find((c) => c.id === evidenceChapterId);
  if (!chapter) return true;
  return isChapterAccessible(chapter, unlockedChapterIds);
}

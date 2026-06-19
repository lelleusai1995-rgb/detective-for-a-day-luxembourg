// Thin, crash-safe LocalStorage helpers. All keys are namespaced with `dfad.`.

export const STORAGE_KEYS = {
  language: "dfad.language",
  viewedEvidence: "dfad.viewedEvidence",
  unlockedChapters: "dfad.unlockedChapters",
  finalUnlocked: "dfad.finalUnlocked",
  finalAnswer: "dfad.finalAnswer",
  completed: "dfad.completed",
  contrastMode: "dfad.contrastMode",
} as const;

/**
 * LocalStorage keys used by older builds that are no longer read or written.
 * They are cleared on reset so a device does not keep stale data around.
 */
export const LEGACY_STORAGE_KEYS = ["dfad.nickname"] as const;

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be full or unavailable (private mode). Fail silently —
    // the app must keep working without persistence.
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

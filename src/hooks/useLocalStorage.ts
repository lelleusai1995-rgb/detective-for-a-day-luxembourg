import { useCallback, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

/**
 * useState mirrored to LocalStorage. Crash-safe: if storage is unavailable
 * the value still lives in React state for the session.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [stored, setStored] = useState<T>(() => readStorage(key, initialValue));

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next =
          typeof value === "function"
            ? (value as (p: T) => T)(prev)
            : value;
        writeStorage(key, next);
        return next;
      });
    },
    [key],
  );

  // Keep multiple tabs / components in sync within the same device.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === key && e.newValue !== null) {
        try {
          setStored(JSON.parse(e.newValue) as T);
        } catch {
          /* ignore malformed */
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  return [stored, setValue];
}

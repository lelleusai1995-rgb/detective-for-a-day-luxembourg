import { useEffect, useState } from "react";
import type { CaseConfig } from "../types/caseTypes";

type CaseState =
  | { status: "loading"; data: null; error: null }
  | { status: "ready"; data: CaseConfig; error: null }
  | { status: "error"; data: null; error: string };

const cache = new Map<string, CaseConfig>();

/**
 * Load a case definition from /cases/<caseId>/case.json.
 * No backend — just a static fetch of the JSON shipped in /public.
 */
export function useCaseData(caseId: string | undefined): CaseState {
  const [state, setState] = useState<CaseState>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!caseId) {
      setState({ status: "error", data: null, error: "Missing case id" });
      return;
    }

    if (cache.has(caseId)) {
      setState({ status: "ready", data: cache.get(caseId)!, error: null });
      return;
    }

    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    fetch(`${import.meta.env.BASE_URL}cases/${caseId}/case.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: CaseConfig) => {
        if (cancelled) return;
        cache.set(caseId, data);
        setState({ status: "ready", data, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          status: "error",
          data: null,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [caseId]);

  return state;
}

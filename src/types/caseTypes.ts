// ---------------------------------------------------------------------------
// Detective for a Day — Case data model
//
// These types describe the GENERIC, reusable case format. Nothing about the
// Luxembourg story is encoded here. To ship another case, replace
// `public/cases/<caseId>/case.json` and its assets — the app does not change.
// ---------------------------------------------------------------------------

export type Language = "en" | "it" | "sq";

/** Order in which the app resolves localized content. */
export const LANGUAGE_FALLBACK_ORDER: Language[] = ["en", "it", "sq"];

export type LocalizedText = {
  en?: string;
  it?: string;
  sq?: string;
};

/** A localized file path or external URL (one per language, all optional). */
export type LocalizedAsset = {
  en?: string;
  it?: string;
  sq?: string;
};

export type EvidenceType = "text" | "pdf" | "image" | "audio" | "link";

export type EvidenceCategory = string;

export type AssetStatus = "ready" | "placeholder" | "missing";

export type Evidence = {
  id: string;
  chapterId: string;
  title: LocalizedText;
  category: EvidenceCategory;
  description: LocalizedText;
  type: EvidenceType;
  difficulty?: "base" | "intermediate" | "advanced";
  importance?: "low" | "medium" | "high" | "critical";
  tags?: string[];
  /** Internal text content (markdown-ish plain text). Used as fallback too. */
  content?: LocalizedText;
  /** Optional static asset (pdf/image/audio) per language. */
  file?: LocalizedAsset;
  /**
   * Folder (relative to the case `assets/` root) whose files are attached to
   * this evidence automatically via the generated assets manifest. Drop files
   * into that folder and run `npm run assets:manifest` — no JSON edit needed.
   * Example: "chapter-1/02-body-discovery-report__ONE_FILE__pdf".
   */
  assetFolder?: string;
  /** Optional transcript shown under audio (or as text fallback). */
  transcript?: LocalizedText;
  /** Optional external link per language. */
  externalUrl?: LocalizedAsset;
  relatedSuspects?: string[];
  relatedTimelineEvents?: string[];

  // --- Authoring / pipeline metadata (never shown to players) ---
  redHerring?: boolean;
  recommendedFirstRead?: boolean;
  manuallyReplaceable?: boolean;
  assetStatus?: AssetStatus;
  suggestedFilename?: string;
  generationPromptRef?: string;
};

export type Chapter = {
  id: string;
  order: number;
  title: LocalizedText;
  intro: LocalizedText;
  objective: LocalizedText;
  /** Discussion question shown to push group collaboration. */
  question?: LocalizedText;
  evidenceIds: string[];
  /** Unlock config for the NEXT chapter (or final box on the last chapter). */
  unlock?: {
    nextChapterId?: string;
    /** Set true on the chapter whose password unlocks the final answer box. */
    unlocksFinal?: boolean;
    password: string;
    acceptedAnswers?: string[];
    hint?: LocalizedText;
  };
};

export type SuspectStatus = "witness" | "suspect" | "strong_suspect";

export type Suspect = {
  id: string;
  name: string;
  role: LocalizedText;
  origin?: LocalizedText;
  profile: LocalizedText;
  motive: LocalizedText;
  declaredAlibi: LocalizedText;
  proEvidence?: LocalizedText[];
  contraEvidence?: LocalizedText[];
  avatar?: string;
  status?: SuspectStatus;
  /** When set, the suspect card is hidden until this chapter is accessible. */
  visibleFromChapter?: string;
  /**
   * When set, the deeper analysis (points for/against = proEvidence /
   * contraEvidence) stays hidden until this chapter is accessible. The neutral
   * profile (name, role, origin, profile, motive, alibi) always shows. Generic:
   * any case can use it to avoid spoiling late-game reasoning from minute one.
   */
  revealFromChapter?: string;
};

export type TimelineReliability = "confirmed" | "probable" | "disputed";

export type TimelineEvent = {
  id: string;
  date: string;
  time?: string;
  title: LocalizedText;
  description: LocalizedText;
  location?: string;
  involvedSuspects?: string[];
  reliability: TimelineReliability;
  /**
   * When set, this event is hidden until the given chapter is accessible
   * (same gating rule as evidence). Used to keep later-chapter reveals out of
   * the timeline until the player has earned them. Events without this field
   * are always visible.
   */
  visibleFromChapter?: string;
};

export type FinalQuestion = {
  id: string;
  label: LocalizedText;
  /** "suspect" renders a suspect picker; "text" renders a free-text field. */
  kind: "suspect" | "text";
};

export type FinalConfig = {
  unlockPassword: string;
  acceptedUnlockAnswers?: string[];
  /** Suspect id of the true culprit. */
  culpritSuspectId: string;
  motiveKeywords?: string[];
  questions: FinalQuestion[];
  solutionTitle: LocalizedText;
  solutionExplanation: LocalizedText;
  wrongAnswerExplanation: LocalizedText;
};

export type EvidenceUnlockMode = "all_unlocked" | "chapter_locked";

/** One attachment discovered inside an evidence folder by the manifest script. */
export type ManifestFile = {
  /** Site-root URL, e.g. "/cases/lux-gelle-fra/assets/chapter-1/.../report.pdf". */
  url: string;
  /** File name as it sits in the folder, e.g. "report.pdf". */
  name: string;
  /** Lowercased extension without the dot, e.g. "pdf". */
  ext: string;
};

/**
 * Static manifest of the files present in each evidence folder. Generated by
 * `scripts/generate-assets-manifest.mjs` because a browser cannot list a static
 * folder at runtime. Keyed by folder path relative to the case `assets/` root.
 */
export type AssetManifest = {
  generatedAt?: string;
  folders: Record<string, ManifestFile[]>;
};

export type CaseConfig = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  objective?: LocalizedText;
  languageDefault: Language;
  evidenceUnlockMode: EvidenceUnlockMode;
  /** Optional host code to reveal the solution screen directly. */
  hostSolutionCode?: string;
  /** Map of category id -> localized label (used to render filters/badges). */
  categories?: Record<string, LocalizedText>;
  chapters: Chapter[];
  evidence: Evidence[];
  suspects: Suspect[];
  timeline: TimelineEvent[];
  final: FinalConfig;
};

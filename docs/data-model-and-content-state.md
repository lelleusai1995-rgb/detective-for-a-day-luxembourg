# Data Model and Content State

## Case JSON Location

**Path:** `public/cases/lux-gelle-fra/case.json`

**Size:** 1407 lines (~89KB)

**Loading:** Fetched at runtime via `src/hooks/useCaseData.ts` from `/cases/lux-gelle-fra/case.json`

**Structure:** Single JSON file containing all case data (no split files)

## Case JSON Structure

Top-level object with the following properties:

```typescript
{
  id: string;                          // "lux-gelle-fra"
  languageDefault: Language;           // "en"
  evidenceUnlockMode: "all_unlocked" | "chapter_locked";
  hostSolutionCode: string;            // "DETECTIVE2026"
  title: LocalizedText;               // Case title in EN/IT/SQ
  subtitle: LocalizedText;            // Subtitle in EN/IT/SQ
  objective: LocalizedText;           // Case objective in EN/IT/SQ
  categories: Record<string, LocalizedText>;  // 14 categories
  chapters: Chapter[];                 // 5 chapters (0-4)
  evidence: Evidence[];                // 25 evidence items
  suspects: Suspect[];                // 10 suspects
  timeline: TimelineEvent[];          // 9 timeline events
  final: FinalConfig;                 // Final solution config
}
```

## Main Entities

### 1. Case Metadata

**Fields:**
- `id`: Unique case identifier (used in URLs)
- `languageDefault`: Default language ("en", "it", or "sq")
- `evidenceUnlockMode`: `"chapter_locked"` (current default — archive shows only unlocked-chapter evidence) or `"all_unlocked"` (open archive)
- `hostSolutionCode`: Hidden facilitator code; entered into the final password field, it jumps straight to the solution

### 2. Chapters

**Array of 5 chapters** (orders 0-4):

```typescript
{
  id: string;                          // e.g., "chapter-1"
  order: number;                       // 0, 1, 2, 3, 4
  title: LocalizedText;               // Chapter title
  intro: LocalizedText;               // Introduction text
  objective: LocalizedText;           // Chapter objective
  question?: LocalizedText;           // Discussion question (optional)
  evidenceIds: string[];              // Evidence IDs in this chapter
  unlock?: {                          // Unlock config (optional)
    nextChapterId?: string;           // Next chapter ID (chapters 1-3)
    unlocksFinal?: boolean;           // True for chapter 4
    password: string;                 // Required password
    acceptedAnswers?: string[];       // Alternative accepted answers
    hint?: LocalizedText;             // Hint text
  };
}
```

**Current chapters** (each password requires combining ≥2 evidence items):
- Chapter 0: Confidential Briefing (1 evidence)
- Chapter 1: The Body Under the Fireworks (5 evidence, password: PONTADOLPHE — fireworks programme + map)
- Chapter 2: The Retreat Alibis (6 evidence, password: GLACIS — statements + walking distances)
- Chapter 3: The Evidence Does Not Add Up (6 evidence, password: 0044 — badge access log + badge note)
- Chapter 4: The Traitor's Code (8 evidence, password: ROYALPREVIEW — body of the real patch notes)

The old passwords (GELLEFRA / ACIERIE86 / LAB9 / PATCHNOTES) are no longer valid
and are not accepted as aliases.

### 3. Evidence

**Array of 25 evidence items:**

```typescript
{
  id: string;                          // Unique evidence ID
  chapterId: string;                   // Parent chapter ID
  title: LocalizedText;               // Evidence title
  category: string;                   // Category key (maps to categories object)
  description: LocalizedText;         // Short description
  type: EvidenceType;                 // "text" | "pdf" | "image" | "audio" | "link"
  difficulty?: "base" | "intermediate" | "advanced";
  importance?: "low" | "medium" | "high" | "critical";
  tags?: string[];                    // Searchable tags
  content?: LocalizedText;            // Full text content (fallback)
  assetFolder?: string;               // Folder (relative to assets/) whose files attach via the manifest
  file?: LocalizedAsset;              // Legacy single file path per language (fallback only)
  transcript?: LocalizedText;         // Transcript for audio
  externalUrl?: LocalizedAsset;       // External URL for link type
  relatedSuspects?: string[];         // Suspect IDs
  relatedTimelineEvents?: string[];   // Timeline event IDs

  // Authoring metadata (not shown to players)
  redHerring?: boolean;               // Marks as misleading clue
  recommendedFirstRead?: boolean;     // Suggest reading first
  manuallyReplaceable?: boolean;      // Can be replaced with real asset
  assetStatus?: "ready" | "placeholder" | "missing";
  suggestedFilename?: string;         // Recommended filename
  generationPromptRef?: string;       // Reference to asset prompt doc
}
```

**Evidence types distribution:**
- PDF: 18 items
- Image: 4 items
- Audio: 1 item
- Link: 0 items (all configured but none used)
- Text-only: 2 items (implicit via missing files)

**assetStatus:** retained as authoring metadata only. It no longer drives any
player-facing banner — the AssetViewer never shows a "placeholder" banner.
Whether a real file appears is determined purely by what is in the evidence's
`assetFolder` (via `assets-manifest.json`).

### 4. Suspects

**Array of 10 suspects:**

```typescript
{
  id: string;                          // Unique suspect ID
  name: string;                       // Display name
  status: "witness" | "suspect" | "strong_suspect";
  role: LocalizedText;               // Job title
  origin?: LocalizedText;            // Nationality/origin
  profile: LocalizedText;            // Character profile
  motive: LocalizedText;             // Possible motive
  declaredAlibi: LocalizedText;      // Stated alibi
  proEvidence?: LocalizedText[];     // Evidence supporting innocence (hidden until revealFromChapter)
  contraEvidence?: LocalizedText[];  // Evidence suggesting guilt (hidden until revealFromChapter)
  avatar?: string;                   // Path to avatar image
  visibleFromChapter?: string;       // Chapter when the whole card becomes visible
  revealFromChapter?: string;        // Chapter from which pro/contra (deep analysis) is shown; profile/motive/alibi always visible
}
```

**Suspect breakdown:**
- Witnesses: 2 (Giulia Ferri, Erion Dervishi)
- Persons of interest (`suspect`): 8 (Marco Bellandi, Elira Kodra, Davide Rinaldi, Arben Leka, Sofia Martelli, Matteo Serra, Luca Moretti, Nora Weiss)
- Strong suspects: 0 — the `strong_suspect` status was removed from Davide so the screen no longer telegraphs the red herring. Each suspect carries `revealFromChapter: "chapter-3"` so for/against evidence is hidden until Chapter 3.

**Avatar status:** None have avatar paths configured (show initials instead)

### 5. Timeline

**Array of 9 timeline events:**

```typescript
{
  id: string;                          // Unique event ID
  date: string;                        // Date string
  time?: string;                       // Time string (optional)
  title: LocalizedText;               // Event title
  description: LocalizedText;         // Event description
  location?: string;                   // Location name
  involvedSuspects?: string[];         // Suspect IDs involved
  reliability: "confirmed" | "probable" | "disputed";
}
```

**Timeline span:** 20 June (arrival) to 23 June (body discovery)

### 6. Final Solution

```typescript
{
  unlockPassword: string;              // "ROYALPREVIEW"
  acceptedUnlockAnswers?: string[];    // ["ROYAL PREVIEW", "ROYAL-PREVIEW", "ROYAL_PREVIEW"]
  culpritSuspectId: string;            // "nora-weiss"
  motiveKeywords?: string[];          // Keywords for motive matching
  questions: FinalQuestion[];         // 5 questions (culprit, motive, method, decisive, redHerring)
  solutionTitle: LocalizedText;       // Solution screen title
  solutionExplanation: LocalizedText; // Full solution explanation
  wrongAnswerExplanation: LocalizedText; // Explanation for wrong answers
}
```

### 7. Categories

**14 evidence categories** (localized labels):

| Category Key | EN Label | IT Label | SQ Label |
|--------------|----------|----------|----------|
| briefing | Briefing | Briefing | Brifing |
| newspaper | Newspaper | Giornale | Gazetë |
| police_report | Police report | Verbale di polizia | Raport policie |
| map | Maps & places | Mappe e luoghi | Harta & vende |
| official_act | Official act | Atto ufficiale | Akt zyrtar |
| witness_statement | Witness statement | Testimonianza | Dëshmi |
| call_log | Call log | Cronologia chiamate | Regjistër thirrjesh |
| chat | Chat & messages | Chat e messaggi | Chat & mesazhe |
| internal_document | Internal document | Documento interno | Dokument i brendshëm |
| forensic | Forensic report | Referto forense | Raport forenzik |
| technical_log | Technical log | Log tecnico | Log teknik |
| photo | Photo | Foto | Foto |
| audio | Audio | Audio | Audio |
| contract | Contract | Contratto | Kontratë |

## Localized Text Structure

**Type:** `LocalizedText = { en?: string; it?: string; sq?: string }`

**Resolution strategy** (via `src/utils/assetUtils.ts` → `pickText()`):
1. Try selected language (e.g., "it")
2. Fall back to "en"
3. Fall back to "sq"
4. Fall back to any non-empty value present
5. Return empty string if all empty

**Usage:** Applied to all case content fields (titles, descriptions, content, objectives, profiles, etc.)

## Evidence File References

**Type:** `LocalizedAsset = { en?: string; it?: string; sq?: string }`

**Resolution strategy** (via `src/utils/assetUtils.ts` → `pickAsset()`):
- Same fallback chain as LocalizedText
- Returns `undefined` if no path found

**Path convention:**
- Must start with `/cases/...` (relative to site root, not file system)
- Example: `/cases/lux-gelle-fra/assets/chapter-1/body-discovery-report.pdf`
- Do NOT use `public/` prefix (Vite serves public/ from root)
- Use forward slashes only (Windows backslashes not supported)

**Per-language files:**
- Can provide different files per language
- If only `en` provided, all languages use it
- Example: `{ en: "/cases/.../report-en.pdf", it: "/cases/.../report-it.pdf" }`

## Missing Files and Text Fallback

**Degradation strategy** (implemented in `src/components/AssetViewer.tsx`):

1. **Folder has files (via manifest):**
   - One file renders directly; multiple files render as a list of attachments
   - Each is rendered by extension (pdf/image/audio) or offered as an Open/Download link

2. **Folder empty / no file yet:**
   - Displays `content` text (and `transcript`) only — **no** notice and **no** banner
   - The absence of an uploaded file is invisible to players

3. **Asset load failure (e.g., broken image):**
   - Image component has `onError` handler
   - Falls back to a download link
   - Still shows `content` text — no warning banner

4. **No content and no file:**
   - Renders nothing extra (no notice); this state does not occur in the shipped case, where every item has full `content`

**Key principle:** The app never crashes or becomes unplayable due to missing files. All evidence has complete text content, so the game is fully playable without any asset files.

## AssetStatus Field

**Values (authoring metadata only — not player-facing):**
- `"placeholder"` — text content is complete; a real file can still be dropped in later.
- `"ready"` — a real file is in place.
- `"missing"` — file intentionally absent.

**Current state:** items carry `assetStatus: "placeholder"` as a tracking hint.

**Usage:**
- Purely an authoring/tracking aid. The AssetViewer ignores it — what renders is
  decided by the files actually present in the evidence's `assetFolder` (manifest).

## Current Evidence Categories

**14 categories** defined in `case.json` under `categories` object.

**Category usage distribution:**
- briefing: 1 item
- newspaper: 1 item
- police_report: 3 items
- map: 2 items
- official_act: 3 items
- witness_statement: 3 items
- call_log: 3 items
- chat: 1 item
- internal_document: 3 items
- forensic: 4 items
- technical_log: 3 items
- photo: 1 item
- audio: 1 item
- contract: 1 item

**Inconsistencies:** None detected. All evidence items reference valid category keys.

## Current Asset Folders and Naming Conventions

**Folder structure under `public/cases/lux-gelle-fra/assets/`:**

Each evidence item has its **own folder**, named so you know what belongs there:

```
assets/
├── chapter-0/00-police-engagement-email__ONE_FILE__pdf-or-png/
├── chapter-1/01-newspaper-article__ONE_FILE__pdf-or-png/
├── chapter-1/02-body-discovery-report__ONE_FILE__pdf/
├── chapter-1/05-emergency-call__MULTI_FILE__audio-and-transcript/
├── chapter-2/... chapter-3/... chapter-4/...   # one folder per evidence item
└── shared/             # Shared assets (avatars, maps, etc.)
    ├── suspect-avatars/
    └── maps/
```

Folder name = `NN-short-name__ONE_FILE|MULTI_FILE__type-hint`. The folder is bound
to an evidence item by its `assetFolder` field in `case.json`.

**Current state:** folders exist but ship empty (only `.gitkeep`). Every evidence
item plays from its text content until a file is dropped in and
`npm run assets:manifest` is run.

**Naming convention:**
- The folder name is self-describing (chapter, order, name, count, type).
- File names inside can be anything readable; the manifest detects them by extension.

**File extensions used:**
- `.pdf` — Documents, reports, transcripts
- `.png` — Images, maps, screenshots
- `.jpg` / `.jpeg` — Photos
- `.mp3` — Audio (also supports .wav, .ogg, .m4a)

## How to Add a New Evidence Item Safely

**Step-by-step process:**

1. **Choose a unique ID:**
   - Format: `ch{chapter-number}-{descriptive-name}`
   - Example: `ch4-new-evidence-doc`
   - Ensure ID is not already used in `evidence` array

2. **Add to `evidence` array in `case.json`:**
   ```json
   {
     "id": "ch4-new-evidence-doc",
     "chapterId": "chapter-4",
     "title": { "en": "New Evidence Document" },
     "category": "police_report",
     "description": { "en": "A newly discovered report." },
     "type": "pdf",
     "importance": "medium",
     "assetFolder": "chapter-4/09-new-evidence-doc__ONE_FILE__pdf",
     "content": { "en": "Full text content goes here as fallback..." }
   }
   ```

3. **Add to chapter's `evidenceIds` array:**
   - Find the chapter object in `chapters` array
   - Add the new ID to `evidenceIds` array
   - Example: `"evidenceIds": ["ch4-luxevent-contract", "ch4-new-evidence-doc", ...]`

4. **Create the folder + drop any file (optional):**
   - Create `public/cases/lux-gelle-fra/assets/chapter-4/09-new-evidence-doc__ONE_FILE__pdf/`
   - Drop the file in and run `npm run assets:manifest`

5. **Test:**
   - Run/refresh the dev server
   - Navigate to the chapter and open the evidence
   - Verify rendering; remove the file + re-run the manifest to test fallback

**Important notes:**
- Always provide `content` text as fallback
- Use a valid `category` key from the `categories` object
- The `assetFolder` value (and the folder name) must match exactly

## How to Attach a Manually Generated PDF/Image/Audio Safely

**For existing evidence items (no JSON edit):**

1. **Generate or obtain the asset file:**
   - Follow prompts in `docs/asset-generation-prompts.md` if using AI
   - Or create manually with appropriate tools

2. **Drop the file into the evidence's folder:**
   - The folder is the item's `assetFolder`, e.g.
     `public/cases/lux-gelle-fra/assets/chapter-1/02-body-discovery-report__ONE_FILE__pdf/`
   - The file name can be anything readable

3. **Regenerate the manifest:**
   - `npm run assets:manifest` (also runs on `npm run dev` / `npm run build`)

4. **Test:**
   - Reload the app
   - Navigate to the evidence detail
   - Verify the asset loads correctly
   - Test on mobile if possible

**File type specifics:**

**PDF:**
- Use `.pdf` extension
- Ensure text is readable on mobile (large font, high contrast)
- Test inline embed and new-tab fallback buttons

**Image:**
- Use `.png`, `.jpg`, or `.jpeg`
- Optimize for mobile (consider file size)
- Ensure text is readable if image contains text
- Test both inline view and new-tab link

**Audio:**
- Use `.mp3` (preferred), `.wav`, `.ogg`, or `.m4a`
- Provide transcript in `transcript` field
- Test audio player controls
- Consider file size for mobile data

**External link:**
- Set `type: "link"`
- Use `externalUrl` field instead of `file`
- App adds `target="_blank"` and `rel="noopener noreferrer"` automatically

## Current Content Risks

### Spoilers Too Early

**Risk assessment:** LOW (addressed)

**Current state:**
- `evidenceUnlockMode: "chapter_locked"` — the archive shows only evidence from
  unlocked chapters, and locked-chapter evidence cannot be opened directly
  (the evidence route shows a lock screen)
- Chapter content (intro/objective/question/evidence) is hidden behind the
  password gate for locked chapters
- The final accusation form is locked until the final answer is entered; the
  solution screen sits behind that

**To verify:** Confirm with a clean LocalStorage that Chapters 2–4 reveal nothing
before being unlocked, and that the archive count reflects only unlocked evidence.

### Missing Translations

**Risk assessment:** LOW-MEDIUM

**Current state:**
- English: Complete (source of truth)
- Italian: Partial but functional (most UI labels translated)
- Albanian: Partial but functional (most UI labels translated)
- Fallback chain ensures English appears if translation missing

**Missing translations:**
- Some UI labels may be missing in IT/SQ (falls back to EN)
- Case content may have incomplete IT/SQ translations

**Mitigation:**
- Fallback chain prevents broken UI
- English is default language
- Game is fully playable in English

**To verify:** Audit `src/data/translations.ts` for missing IT/SQ keys; audit `case.json` for missing content translations

### Placeholder Assets

**Risk assessment:** LOW for live demo

**Current state:**
- Evidence items carry `assetStatus: "placeholder"` as authoring metadata only
- Two pre-generated assets ship (the briefing email PDF and the event-map PNG); all other folders are empty
- All evidence has complete text fallback
- There is **no** placeholder banner and **no** missing-file notice — a missing file is invisible

**Impact:**
- Game is fully playable without assets
- Immersion may be reduced without visual/audio elements
- Players never see any "placeholder" or "missing file" message

**Mitigation:**
- Text content is complete and engaging
- Assets can be added incrementally via the folder-drop + `assets:manifest` workflow
- Note: the two pre-generated assets predate the anti-spoiler text/prompt pass; the event-map PNG still prints street numbers (now harmless — no longer a password) and the briefing PDF may carry the older briefing wording. Regenerate with the updated prompts for full consistency, or remove them to play from the updated text.

**To verify:** Test with actual players to assess whether lack of assets affects engagement

### Broken Links

**Risk assessment:** LOW

**Current state:**
- No external link evidence items configured (all are pdf/image/audio/text)
- All file paths are internal to the app
- No external URLs in current case

**Future risk:**
- If external links are added, they could become broken over time
- No link validation or checking mechanism

**Mitigation:**
- Use `target="_blank"` and `rel="noopener noreferrer"` for security
- Consider adding link checking in admin tools (if built)

### Weak Evidence Ordering

**Risk assessment:** LOW-MEDIUM

**Current state:**
- Evidence within chapters is ordered by array position in `evidenceIds`
- Archive shows evidence in array order (not sorted by importance or date)
- No explicit ordering hints (e.g., "read this first")

**Potential issues:**
- Players might read evidence in confusing order
- Critical evidence might be buried later in the list
- Red herrings might be read before context is established

**Mitigation:**
- `recommendedFirstRead` field exists but only used on briefing item
- Importance badges (low/medium/high/critical) help prioritize
- Chapter structure provides some ordering

**To verify:** Test with actual players to see if evidence ordering causes confusion

### Inconsistent Category Usage

**Risk assessment:** LOW

**Current state:**
- All 14 categories are defined
- All evidence items reference valid category keys
- No orphaned or unused categories detected

**No inconsistencies found.**

### Missing Suspect Avatars

**Risk assessment:** LOW

**Current state:**
- No suspect has an `avatar` path configured
- App shows initials instead (e.g., "NW" for Nora Weiss)
- Avatar folder structure exists but is empty

**Impact:**
- Visual distinction between suspects is reduced
- Reliance on initials for identification

**Mitigation:**
- Initials are clear and functional
- Avatar system is built and ready for use
- Avatar paths can be added without code changes

**To verify:** Assess whether lack of avatars affects suspect memorability during gameplay

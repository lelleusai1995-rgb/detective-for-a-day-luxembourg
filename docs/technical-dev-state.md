# Technical Development State

## Framework and Runtime Assumptions

**Frontend Framework:**
- React 18.3.1 with TypeScript 5.5.4
- Vite 5.4.6 as build tool and dev server
- React Router DOM 6.26.2 for client-side routing
- No external UI component library — custom CSS styling

**Runtime Environment:**
- Modern browsers with ES6+ support
- LocalStorage API required for persistence (gracefully degrades if unavailable)
- No server-side rendering (SSR) — pure client-side SPA
- PWA-capable browsers (manifest.webmanifest provided)

**Development Environment:**
- Node.js (for npm scripts)
- TypeScript compilation via `tsc -b && vite build`
- Hot module replacement via Vite dev server

## Folder Structure and Purpose

```
src/
├── components/          # All React UI components (19 files)
│   ├── AssetViewer.tsx          # Renders evidence assets (PDF/image/audio/link)
│   ├── BottomNav.tsx            # Fixed bottom navigation bar
│   ├── BriefingScreen.tsx       # Chapter 0 briefing screen
│   ├── ChapterDetail.tsx        # Single chapter detail with evidence list
│   ├── ChapterList.tsx          # List of all chapters
│   ├── ContrastToggle.tsx       # Contrast mode switcher
│   ├── EvidenceArchive.tsx      # Full evidence archive with filters
│   ├── EvidenceCard.tsx         # Single evidence card component
│   ├── EvidenceDetail.tsx       # Evidence detail screen
│   ├── FinalAnswerForm.tsx      # Final accusation form
│   ├── FinalSolutionScreen.tsx  # Solution reveal screen
│   ├── GameLayout.tsx           # Layout wrapper with header/back button
│   ├── HomeScreen.tsx           # Main home screen with navigation grid
│   ├── LanguageSwitcher.tsx     # Language selection (EN/IT/SQ)
│   ├── PasswordGate.tsx         # Password input component for unlocks
│   ├── StartScreen.tsx          # Initial landing screen
│   ├── SuspectCard.tsx          # Single suspect card
│   ├── SuspectList.tsx          # Suspect list screen
│   └── TimelineView.tsx         # Timeline events screen
├── data/
│   └── translations.ts          # UI label dictionary (EN/IT/SQ)
├── hooks/
│   ├── useCaseData.ts           # Load case JSON from /cases/{id}/case.json
│   ├── useContrastMode.ts       # Contrast mode state and HTML attribute
│   ├── useLanguage.tsx          # Language context and fallback resolution
│   ├── useAssetManifest.ts      # Load assets-manifest.json; map folder -> files
│   ├── useLocalProgress.ts      # Progress state (unlocks, final answer — no nickname)
│   ├── useLocalStorage.ts       # Generic LocalStorage hook with sync
│   └── useViewedEvidence.ts     # Track viewed evidence IDs
├── types/
│   └── caseTypes.ts             # Generic case data model (reusable)
├── utils/
│   ├── assetUtils.ts            # Localized text/asset resolution helpers
│   ├── normalizeAnswer.ts       # Password matching normalization
│   ├── progression.ts          # Chapter accessibility / evidence-leak guards
│   └── storage.ts               # LocalStorage helpers with crash safety
├── styles/
│   └── index.css                # Global styles, mobile-first, contrast modes
├── App.tsx                      # Route definitions (11 routes)
└── main.tsx                     # React entry point with providers

public/
├── cases/
│   └── lux-gelle-fra/
│       ├── case.json              # Case data (each evidence has an assetFolder)
│       ├── assets-manifest.json   # Generated: folder -> [files] (do not hand-edit)
│       └── assets/                # One folder per evidence item
│           ├── chapter-0/00-police-engagement-email__ONE_FILE__pdf-or-png/
│           ├── chapter-1/02-body-discovery-report__ONE_FILE__pdf/
│           ├── chapter-1/05-emergency-call__MULTI_FILE__audio-and-transcript/
│           ├── ...               # (folders for every chapter-1..4 evidence item)
│           └── shared/           # Shared assets (avatars, maps)
├── favicon.svg
├── manifest.webmanifest
└── _redirects                    # Netlify SPA fallback

scripts/
└── generate-assets-manifest.mjs  # `npm run assets:manifest` (predev/prebuild)

docs/
├── asset-generation-prompts.md   # AI prompts for generating evidence assets
├── how-to-add-evidence-assets.md # Folder-drop asset workflow
└── (dev-state docs)
```

## Routing Structure

**Router:** React Router DOM v6 (client-side, BrowserRouter)

**Routes defined in `src/App.tsx`:**

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Navigate to `/game/lux-gelle-fra` | Root redirect to default case |
| `/game/:caseId` | StartScreen | Landing screen with language + contrast (no nickname) |
| `/game/:caseId/briefing` | BriefingScreen | Chapter 0 briefing |
| `/game/:caseId/home` | HomeScreen | Main hub with navigation grid |
| `/game/:caseId/archive` | EvidenceArchive | Full evidence archive with filters |
| `/game/:caseId/evidence/:evidenceId` | EvidenceDetail | Single evidence detail |
| `/game/:caseId/chapters` | ChapterList | List of all chapters |
| `/game/:caseId/chapter/:chapterId` | ChapterDetail | Single chapter with evidence list |
| `/game/:caseId/timeline` | TimelineView | Timeline events |
| `/game/:caseId/suspects` | SuspectList | Suspect list |
| `/game/:caseId/final` | FinalAnswerForm | Final accusation form |
| `/game/:caseId/solution` | FinalSolutionScreen | Solution reveal |
| `*` | Navigate to `/game/lux-gelle-fra` | Catch-all redirect |

**Default case ID:** `lux-gelle-fra` (defined in `App.tsx`)

## State Management Approach

**No external state management library** — state is managed through:

1. **React Context Providers:**
   - `LanguageProvider` (`src/hooks/useLanguage.tsx`) — wraps entire app, provides language and translation functions

2. **Custom Hooks:**
   - `useCaseData` — Loads and caches case JSON from static file
   - `useLanguage` — Consumes LanguageProvider context
   - `useLocalStorage` — Generic LocalStorage synchronization hook
   - `useLocalProgress` — Wraps multiple useLocalStorage calls for game progress
   - `useViewedEvidence` — Tracks viewed evidence IDs
   - `useContrastMode` — Manages contrast mode state

3. **Component State:**
   - Local useState for UI state (form inputs, filter selections, modals, etc.)

**No global state store** (Redux, Zustand, etc.) — state is either:
- In React Context (language)
- In LocalStorage (progress)
- In component state (transient UI)

## LocalStorage Keys and Data

**Namespace:** All keys are prefixed with `dfad.` (defined in `src/utils/storage.ts`)

| Key | Type | Purpose |
|-----|------|---------|
| `dfad.language` | "en" \| "it" \| "sq" | Selected language |
| `dfad.viewedEvidence` | string[] | Array of evidence IDs viewed by player |
| `dfad.unlockedChapters` | string[] | Array of chapter IDs unlocked |
| `dfad.finalUnlocked` | boolean | Whether final accusation form is unlocked |
| `dfad.finalAnswer` | object \| null | Submitted final accusation (culprit, motive, method, decisiveEvidence, redHerring, confidence, submittedAt) |
| `dfad.completed` | boolean | Whether player has completed the case |
| `dfad.contrastMode` | "normal" \| "high_contrast" \| "inverted" | Contrast mode preference |

> **Removed:** `dfad.nickname` is no longer read or written. It is listed in
> `LEGACY_STORAGE_KEYS` (`src/utils/storage.ts`) and cleared on reset so old
> devices don't keep stale data. There is no player identity stored anywhere.

**Storage behavior:**
- Crash-safe: if LocalStorage is unavailable (private mode, full), app continues using React state only
- Cross-tab sync: StorageEvent listener syncs state across tabs for same key
- JSON serialization: all values are JSON.stringify/JSON.parse
- Silent failure: write failures are ignored to prevent crashes

## Case Loading Strategy

**Loader:** `src/hooks/useCaseData.ts`

**Process:**
1. Fetch from `${import.meta.env.BASE_URL}cases/${caseId}/case.json`
2. Parse JSON as `CaseConfig` type
3. Cache in memory (Map) to avoid repeated fetches
4. Return state: `{ status: "loading" \| "ready" \| "error", data: CaseConfig \| null, error: string \| null }`

**Error handling:**
- Missing caseId → error state
- HTTP error → error state with status code
- JSON parse error → error state
- Cache hit → returns cached data immediately

**No validation** beyond type checking — assumes case.json is valid per schema

## Evidence Loading/Rendering Strategy

**Loader:** `src/components/AssetViewer.tsx` (receives the discovered files), fed
by `src/hooks/useAssetManifest.ts`.

**Attachment resolution (folder/manifest):**
- Each evidence item has an `assetFolder` (relative to the case `assets/` root).
- `scripts/generate-assets-manifest.mjs` scans `assets/**` and writes
  `assets-manifest.json` (`folder -> [{url,name,ext}]`).
- `useAssetManifest` fetches that manifest; `filesForFolder(manifest, assetFolder)`
  returns the files for an item, which `EvidenceDetail`/`BriefingScreen` pass to
  `AssetViewer`.
- One file renders directly; multiple files render as a list of attachments.
- Type is inferred from the file extension (pdf/image/audio/text-ish/other).
- A legacy single `file` path in `case.json` is still honored as a fallback when
  no manifest files are present.

**Evidence type handling:**

| Type | Rendering | Fallback |
|------|-----------|----------|
| `text` | Shows `content` field as pre-formatted text | Always available |
| `pdf` | `<object>` embed + new-tab button + download button | Shows `content` text if file missing |
| `image` | `<img>` tag with lazy loading + new-tab button | Shows `content` text if file missing or load fails |
| `audio` | `<audio controls>` + transcript below | Shows transcript text if file missing |
| `link` | `<a target="_blank" rel="noopener noreferrer">` | Shows `content` text if URL missing |

**Asset resolution:**
- Uses `src/utils/assetUtils.ts` → `pickAsset(asset, language)`
- Fallback chain: selected language → en → it → sq → any available value
- File paths are URLs relative to site root (start with `/cases/...`)

**Degradation strategy:**
- No placeholder banner and **no missing-file notice** are shown — both were
  removed. The absence of an uploaded file is invisible to players.
- If a folder is empty, the evidence simply renders its title, description and
  full `content` text (and `transcript` where present).
- If a real file fails to load (broken image/PDF): a download/open link is
  offered instead — no large warning banner.
- `content` text is ALWAYS shown as fallback.
- App never crashes due to missing files.
- The `assetMissing` / `assetMissingTitle` / `placeholderNotice` UI keys were
  removed from `src/data/translations.ts` as dead code.

## Language/i18n Strategy

**Two separate localization systems:**

### 1. Case Content (evidence, suspects, chapters, etc.)
- Defined in `case.json` as `LocalizedText` objects: `{ en?: string, it?: string, sq?: string }`
- Resolution via `src/utils/assetUtils.ts` → `pickText(text, language)`
- Fallback chain: selected language → en → it → sq → any available value
- Applied to: titles, descriptions, content, objectives, profiles, etc.

### 2. UI Labels (buttons, messages, etc.)
- Defined in `src/data/translations.ts` as dictionary
- English is source of truth and complete
- Italian and Albanian are partial (Partial<Dictionary>)
- Resolution via `t(language, key)` function
- Missing keys fall back to English automatically

**Language persistence:**
- Stored in `dfad.language` LocalStorage key
- Default: "en"
- Changed via LanguageSwitcher component

**Context:**
- `LanguageProvider` wraps entire app in `src/main.tsx`
- Provides `language`, `setLanguage`, `t` (UI translation), `loc` (content translation) via `useLanguage` hook

## Contrast/Accessibility Strategy

**Implementation:** CSS custom properties driven by `data-contrast` attribute on `<html>`

**Three modes:**

| Mode | Attribute | Colors |
|------|-----------|--------|
| Normal | `data-contrast="normal"` (default) | Dark theme (#0d0f14 bg), gold/dark-red accents |
| High contrast | `data-contrast="high_contrast"` | Pure black/white, stronger borders, brighter accents |
| Inverted | `data-contrast="inverted"` | Light background (#f4f5f7), dark text |

**State management:**
- `src/hooks/useContrastMode.ts` manages state
- Persists to `dfad.contrastMode` LocalStorage key
- Sets `data-contrast` attribute on `document.documentElement`
- Initialized at app root in `App.tsx` before any screen renders

**Toggle component:** `src/components/ContrastToggle.tsx`

**Accessibility features:**
- Minimum touch target: 48px (--touch CSS variable)
- Focus indicators: 3px outline with offset
- Safe area insets support for notched phones
- Semantic HTML elements
- ARIA labels where needed
- High contrast mode for readability

## Optional Supabase Integration

**Status:** Not implemented

**No Supabase code exists** in the current repository. The app uses only LocalStorage for persistence.

**Future integration points (if needed):**
- Replace `useLocalStorage` hooks with Supabase client
- Sync progress across devices
- Store final accusations in a database
- Add analytics tracking

**Current assumption:** LocalStorage-only persistence is sufficient for the MVP live demo.

## Build/Deploy Assumptions

**Build command:** `npm run build` (runs `prebuild` → `assets:manifest`, then `tsc -b && vite build`)
- `prebuild` regenerates `assets-manifest.json` from the current files
- TypeScript type checking
- Vite build outputs to `dist/` folder (public/ is copied verbatim, manifest included)
- Static site generation (no SSR)
- `npm run dev` similarly runs `predev` → `assets:manifest` first
- Run `npm run assets:manifest` by hand after dropping files if a running dev server doesn't pick them up

**Preview command:** `npm run preview` (serves `dist/` locally)

**Deployment targets:**

### Vercel
- `vercel.json` rewrites all routes to `index.html`
- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: Vite

### Netlify
- `netlify.toml` configures build and publish
- Build command: `npm run build`
- Publish directory: `dist`
- `public/_redirects` has SPA fallback: `/* /index.html 200`

**Environment variables:**
- None required (app is fully static)
- `import.meta.env.BASE_URL` used for case loading (defaults to `/`)

**PWA:**
- `public/manifest.webmanifest` provided
- Service worker not currently implemented
- Can be added for offline support later

## Known Technical Risks

**LocalStorage limitations:**
- Storage quota (~5-10MB) — unlikely to be hit with current data size
- Private mode may block storage — app handles gracefully with React state fallback
- Clearing browser data loses all progress — expected behavior

**Case JSON size:**
- Current case.json is ~89KB
- Larger cases could impact initial load time
- No lazy loading of case data — entire JSON loaded upfront

**Asset file size:**
- No current asset limits
- Large PDFs/images could slow loading
- No compression or optimization pipeline

**No backend validation:**
- Password matching is client-side only
- No server-side verification of final answers
- Players could inspect code to find passwords (acceptable for casual game)

**Browser compatibility:**
- Requires modern ES6+ support
- Older browsers (IE11) not supported
- PDF inline embedding varies by browser (fallback buttons provided)

**Deployment:**
- No automated testing pipeline
- No CI/CD configuration in repo
- Manual deployment required

**Type safety:**
- TypeScript used but no strict mode enforcement visible
- Case JSON not validated against schema at runtime
- Invalid JSON could cause runtime errors

## Important Conventions for Future Changes

**Do not hardcode story logic in components:**
- All case-specific content must live in `case.json`
- Components must remain generic and reusable
- No suspect names, passwords, or plot points in React code

**Preserve case.json configurability:**
- The app is designed to support multiple cases
- Changes must not break the generic case data model in `src/types/caseTypes.ts`
- Evidence types, categories, and structures must remain flexible

**Preserve LocalStorage behavior:**
- Keep the `dfad.` namespace prefix
- Maintain crash-safety (app works without LocalStorage)
- Preserve cross-tab sync via StorageEvent

**Preserve EN/IT/SQ fallback:**
- Always use `pickText()` and `pickAsset()` for case content
- Always use `t()` for UI labels
- Never assume a translation exists — always provide fallback

**Preserve missing-asset fallback:**
- Never assume a file exists
- Always show text content when file is missing
- Use `assetStatus` to indicate placeholder vs ready vs missing

**Asset path conventions:**
- All asset paths must start with `/cases/...` (not `public/...`)
- Paths are relative to site root, not file system
- Use forward slashes only (Windows paths not supported)

**Password matching:**
- Always use `normalizeAnswer()` and `matchesPassword()` from `src/utils/normalizeAnswer.ts`
- Do not implement custom password logic
- Keep the forgiving matching behavior (case-insensitive, accent-insensitive, space-tolerant)

**Component structure:**
- Keep components small and focused
- Use `GameLayout` for consistent header/back button
- Use `AssetViewer` for all evidence rendering
- Do not duplicate asset rendering logic

**CSS conventions:**
- Use CSS custom properties for theming
- Maintain mobile-first responsive design
- Preserve the three contrast modes
- Keep max-width at 720px (--maxw variable)

**File organization:**
- Keep case data in `public/cases/{caseId}/`
- Keep generic types in `src/types/`
- Keep reusable utilities in `src/utils/`
- Keep hooks in `src/hooks/`

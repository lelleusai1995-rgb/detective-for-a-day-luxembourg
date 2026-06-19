# Development State Overview

## What the App Currently Does

Detective for a Day is a mobile-first Progressive Web App (PWA) for running a private murder-mystery session with 10–15 people on their smartphones via a shared link. The app delivers the case "The Gëlle Fra Case - Murder Under the Grand Ducal Fireworks" where players read evidence, reconstruct a timeline, and submit a final accusation identifying the culprit, motive, method, and decisive evidence.

Key capabilities:
- No nickname, no login, no backend, no database — case content lives in static JSON
- Progress is stored per device in LocalStorage (anonymous, per device)
- Supports English (default), Italian, and Albanian — switchable from every screen via the header control
- Evidence includes text, PDF, image, audio, and external links
- Evidence files are added by dropping them into per-evidence folders; a generated `assets-manifest.json` wires them in (no JSON/code edit)
- Missing assets never break the game — text fallback is always available
- Genuinely password-locked chapter progression (Chapter 1 open; Chapters 2–4 and the Final Accusation locked until solved)
- The evidence archive only shows evidence from unlocked chapters (`chapter_locked` mode)
- Final accusation form with confidence rating, locked until the final answer is entered
- Solution screen reveals the correct answer after submission
- Host can jump directly to solution by entering a hidden facilitator code into the final password field

## What the Current MVP Supports

**Supported Features:**
- Full case delivery through static JSON (`public/cases/lux-gelle-fra/case.json`)
- 5 chapters (0-4) with password-locked progression
- 25 evidence items with full text content
- 10 suspects with profiles, alibis, and evidence for/against
- 9 timeline events with reliability ratings
- Evidence archive with search, category filter, chapter filter, and viewed status filter
- Chapter-based view with objectives and discussion questions
- Timeline view with chronological events
- Suspect list with detailed cards
- Final accusation form (culprit, motive, method, decisive evidence, red herring, confidence)
- Solution screen with win/lose feedback
- Language switching (EN/IT/SQ) with fallback chain, available from every screen
- Three contrast modes (normal, high contrast, inverted), available from every screen
- LocalStorage persistence for language, viewed evidence, unlocked chapters, final answer, completion flag, contrast mode (no nickname/identity stored)
- Password matching with forgiving normalization (case-insensitive, accent-insensitive, space/punctuation tolerant)
- Asset viewer supporting PDF (inline), images, audio, and external links
- Mobile-responsive design with bottom navigation
- PWA manifest and service worker foundation

**Evidence Types:**
- Text-only evidence (always available)
- PDF documents (inline embed with new-tab/download fallbacks)
- Images (PNG/JPG/JPEG/GIF/WebP/SVG)
- Audio (MP3/WAV/OGG/M4A with transcript support)
- External links (safe new-tab opening with noopener noreferrer)

## What the Current MVP Does NOT Support

**Not Implemented:**
- Real-time multiplayer collaboration
- Backend/database persistence
- User accounts or authentication
- Admin CMS for case editing
- App store deployment (iOS/Android stores)
- Push notifications
- Real-time chat or discussion tools
- Automatic progress sync across devices (each device is independent)
- Supabase or any cloud persistence (only LocalStorage)
- Analytics or telemetry
- Email notifications
- Social sharing features
- Multiple concurrent cases in the same deployment (single case per build)

**Content Limitations:**
- Only one case is currently shipped (lux-gelle-fra)
- No actual PDF/image/audio files ship yet — every evidence item plays from its full text content until files are dropped into the per-evidence folders
- Only English has complete translations; Italian and Albanian are partial but functional via fallback

## Current User Journey

1. **Opening the link** — User opens `/game/lux-gelle-fra` (root `/` redirects automatically)
2. **Start screen** — User selects language (EN/IT/SQ) and contrast mode, then taps "Start the investigation". No nickname, no login.
3. **Briefing (Chapter 0)** — User reads the confidential police email introducing the case
4. **Home screen** — User sees objective, progress bar, and navigation grid (Archive, Chapters, Timeline, Suspects, Final Accusation)
5. **Chapter progression** — Chapter 1 is open. Chapters 2–4 are genuinely locked: tapping a locked chapter only shows a password gate (no content/evidence). Each password requires combining at least two evidence items (no answer is a visible string copied from a title):
   - Solve Chapter 1 → `PONTADOLPHE` unlocks Chapter 2
   - Solve Chapter 2 → `GLACIS` unlocks Chapter 3
   - Solve Chapter 3 → `0044` unlocks Chapter 4
   - Solve Chapter 4 → `ROYALPREVIEW` unlocks the Final Accusation
6. **Evidence exploration** — The archive shows only evidence from unlocked chapters (`chapter_locked` mode); locked-chapter evidence is not revealed
7. **Final accusation** — After unlocking with the final password, user submits culprit, motive, method, decisive evidence, red herring, and confidence
8. **Solution** — User views the solution screen showing whether the accusation was correct, with a detailed explanation
9. **Reset** — User can reset all local progress from the home screen
10. **Language/contrast** — Can be changed from any screen via the header controls, without losing progress

## Current Game Structure

**Landing/Start Screen** (`/game/:caseId`)
- Language selection (EN/IT/SQ)
- Contrast mode toggle
- "Start the investigation" button (no nickname, no disclaimer)

**Briefing Screen** (`/game/:caseId/briefing`)
- Chapter 0 content only
- Single evidence item (police engagement email)
- "Continue to the case" button

**Home Screen** (`/game/:caseId/home`)
- Case title and subtitle (no nickname/player name)
- Objective text
- Progress bar (evidence viewed / total)
- Navigation grid: Archive, Chapters, Timeline, Suspects, Final Accusation (final tile shows a lock icon until unlocked)
- Reset progress button

**Evidence Archive** (`/game/:caseId/archive`)
- Full list of all evidence (25 items)
- Search by title/description/tags
- Filter by chapter (all chapters + all)
- Filter by category (14 categories)
- Filter by status (all/viewed/not viewed)
- Evidence cards with title, description, category badge, chapter badge, viewed status
- Click to open evidence detail

**Evidence Detail** (`/game/:caseId/evidence/:evidenceId`)
- Evidence title and description
- Asset viewer (PDF/image/audio/link or text-only)
- No placeholder notice and no missing-file notice (removed) — a missing file is invisible
- Text content always shown as the canonical fallback
- Transcript shown for audio evidence
- Related suspects (if any)
- Related timeline events (if any)
- Importance badge (low/medium/high/critical)
- Back to archive

**Chapter List** (`/game/:caseId/chapters`)
- List of all chapters with unlock status
- Each chapter shows title, intro, objective, evidence count
- Locked chapters show lock icon
- Click to open chapter detail

**Chapter Detail** (`/game/:caseId/chapter/:chapterId`)
- Chapter title, intro, objective
- Discussion question (if present)
- List of evidence in this chapter
- Password gate at bottom (if not unlocked yet)
- Hint button
- "Unlock next chapter" button (for chapters 1-3)
- "Unlock final accusation" button (for chapter 4)

**Timeline View** (`/game/:caseId/timeline`)
- Chronological list of 9 events
- Each event shows date, time (if present), title, description, location
- Reliability badge (confirmed/probable/disputed)
- Involved suspects (if any)

**Suspects** (`/game/:caseId/suspects`)
- List of 10 suspects
- Each suspect shows name, role, status badge (witness/person of interest) — there is no "strong suspect" red badge anymore
- Early on, only neutral profile info is shown (profile, motive, declared alibi). The deeper "points for/against" sections stay hidden until the suspect's `revealFromChapter` chapter is unlocked (Chapter 3), so the screen no longer spoils late-game reasoning from minute one
- Click to expand suspect detail

**Suspect Detail** (`/game/:caseId/suspects` - inline expansion)
- Full profile, motive, declared alibi (always)
- Evidence for (proEvidence) / against (contraEvidence) — only once `revealFromChapter` is reached; before that a short neutral note explains more becomes available later
- Avatar or initials

**Final Answer** (`/game/:caseId/final`)
- Password gate if not unlocked (requires "PATCHNOTES")
- Form with: culprit dropdown, motive textarea, method textarea, decisive evidence textarea, red herring textarea, confidence dropdown (low/medium/high)
- Submit button
- After submission: shows saved accusation with edit option and "View solution" button

**Final Solution** (`/game/:caseId/solution`)
- Win/lose banner based on accusation accuracy
- Solution explanation text
- Wrong answer explanation text (if incorrect)
- Back to home

**Navigation**
- Bottom navigation bar with: Home, Archive, Chapters, Timeline, Suspects
- Active state highlighting
- Sticky header with back button, title, and the compact **language + contrast** controls (available on every screen)

## Chapter-Gated Experience (live/demo default)

The app ships as a **genuinely chapter-gated experience**:

- `evidenceUnlockMode` in `case.json` is set to `"chapter_locked"`
- The briefing and Chapter 1 are open; Chapters 2–4 and the Final Accusation are locked
- Tapping a locked chapter shows only a password gate — its intro, objective, discussion question and evidence stay hidden
- The evidence archive shows only evidence from unlocked chapters, and a direct link to locked evidence shows a lock screen instead of the content
- Unlock is real and persisted in LocalStorage (`dfad.unlockedChapters` / `dfad.finalUnlocked`)

The `"all_unlocked"` mode is still supported by the code (it makes every clue visible from the start); switch `evidenceUnlockMode` back to `"all_unlocked"` only if you deliberately want an open archive. The chapter **password gates** remain real in both modes.

## Functional Mismatches

**No major functional mismatches detected** between the current implementation and the intended live/demo behavior:
- Static JSON case delivery ✓
- LocalStorage persistence (no nickname) ✓
- EN/IT/SQ support with fallback, switchable from every screen ✓
- Folder-drop assets via generated manifest ✓
- Missing asset graceful degradation ✓
- Real chapter locking; archive does not leak locked evidence ✓
- Final accusation locked until the final answer ✓
- Mobile-first design ✓
- No backend ✓

## MUST for Live Demo

**Critical for the live demo session:**
1. **Case content completeness** — All 25 evidence items have full text fallback, so the game is playable without assets
2. **Password codes** — Ensure chapter passwords (PONTADOLPHE, GLACIS, 0044, ROYALPREVIEW) and host code (DETECTIVE2026) are communicated to the facilitator (the old GELLEFRA/ACIERIE86/LAB9/PATCHNOTES are no longer valid)
3. **Language defaults** — English is the default and is complete; IT/SQ work via fallback
4. **LocalStorage behavior** — Each device stores progress independently; no sync between devices
5. **Mobile responsiveness** — App is designed for mobile; test on actual smartphones
6. **URL structure** — Share the `/game/lux-gelle-fra` URL (or root `/` which redirects)
7. **Reset capability** — Users can reset progress if needed during testing
8. **Asset degradation** — Missing assets show clear notices but never break the game
9. **Contrast modes** — Available for accessibility needs
10. **Solution access** — Host can jump to solution with DETECTIVE2026 code

**Optional but recommended:**
- Add actual asset files (PDF/images/audio) to enhance immersion (see `docs/asset-generation-prompts.md`)
- Test on multiple device types (iOS Safari, Android Chrome)
- Verify deployment on chosen platform (Vercel/Netlify)

## LATER / Reusable Platform

**Future platform capabilities (not currently implemented):**
- **Multiple cases** — The app is already generic; swap `case.json` and assets to ship a different case
- **Case selection screen** — Could add a case picker at root before entering a specific case
- **Backend persistence** — Could add optional Supabase or similar for cross-device sync
- **Admin CMS** — Could build a web interface for editing case JSON
- **Real-time features** — Could add live chat, shared annotations, or collaborative highlighting
- **Analytics** — Could add tracking of evidence views, time spent, common wrong answers
- **Multi-language completeness** — Could complete IT/SQ translations for all UI strings
- **Asset management system** — Could build a tool for uploading and organizing evidence assets
- **Export/import** — Could allow case creators to export/import case JSON
- **Versioning** — Could add case versioning and migration support

**Current architecture is well-positioned for these extensions**:
- Generic case data model (`src/types/caseTypes.ts`)
- Static JSON loading pattern
- Component-based UI
- Clear separation between case content and app logic
- No hardcoded story logic in components

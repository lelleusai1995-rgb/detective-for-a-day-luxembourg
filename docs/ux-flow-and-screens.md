# UX Flow and Screens

## Start/Landing Screen

**Route:** `/game/:caseId`

**User goal:** Pick language/contrast and enter the case immediately

**Main UI elements:**
- App logo (magnifying glass emoji)
- App title ("Detective for a Day")
- Case title and subtitle (loaded from case.json)
- Language selector (EN/IT/SQ chips)
- Contrast mode toggle (normal/high contrast/inverted)
- "Start the investigation" button (enabled once the case is loaded)

No nickname field, no login, no fiction disclaimer.

**Source components:** `src/components/StartScreen.tsx`

**Source data:** `case.json` (title, subtitle), `src/data/translations.ts` (UI labels)

**Current strengths:**
- One tap to enter — no personal input required
- Language and contrast can also be changed later from any screen's header

**Current weaknesses:**
- No explanation of what the game is before starting
- No way to preview the case before committing

**Mobile-specific risks:**
- Keyboard may cover content on small screens
- Safe area insets handled via CSS

---

## Home Screen

**Route:** `/game/:caseId/home`

**User goal:** Navigate to main game sections and track progress

**Main UI elements:**
- Case title and subtitle (no nickname/player name)
- Objective text
- Progress bar (evidence viewed / total)
- Navigation grid (5 tiles): Archive, Chapters, Timeline, Suspects, Final Accusation (final tile shows a lock icon until unlocked)
- Reset progress button (danger style)

**Source components:** `src/components/HomeScreen.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (title, subtitle, objective), LocalStorage (progress)

**Current strengths:**
- Clear central hub
- Progress tracking visible
- All main sections accessible
- Reset capability available

**Current weaknesses:**
- Progress bar only tracks evidence viewed, not chapters unlocked
- No indication of which chapters are locked
- Final Accusation tile is always visible even when locked

**Mobile-specific risks:**
- Grid layout may be cramped on very small screens
- Reset button requires confirmation (good for preventing accidental resets)

---

## Chapter View (Chapter List)

**Route:** `/game/:caseId/chapters`

**User goal:** See all chapters and their unlock status

**Main UI elements:**
- List of all 5 chapters
- Unlocked chapters show title + intro snippet; **locked chapters show only the title** and a lock badge (no intro/content)
- Tapping a locked chapter opens a password gate, not the content
- Click to open chapter detail

**Source components:** `src/components/ChapterList.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (chapters), LocalStorage (unlockedChapters)

**Current strengths:**
- Clear visual indication of locked/unlocked state
- Chapter objectives visible before opening
- Evidence count helps gauge chapter size

**Current weaknesses:**
- No indication of password requirements
- No hint about how to unlock locked chapters
- No progress indicator within chapters

**Mobile-specific risks:**
- Long chapter intros may require scrolling
- Tap targets may be small on dense lists

---

## Chapter Detail

**Route:** `/game/:caseId/chapter/:chapterId`

**User goal:** View chapter content, read evidence, unlock next chapter

**Main UI elements:**
- **If the chapter is locked:** only a lock screen — chapter title, a locked
  notice, and a password gate (with the previous chapter's hint). No intro,
  objective, question, evidence or related content is revealed.
- **If the chapter is unlocked:** chapter title, intro, objective, discussion
  question (if present), the list of evidence cards, and — at the bottom — the
  password gate that unlocks the **next** chapter (or the final accusation).
- Hint button (reveals hint)
- Back button in header

**Source components:** `src/components/ChapterDetail.tsx`, `src/components/PasswordGate.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (chapter data, unlock config), LocalStorage (unlockedChapters)

**Current strengths:**
- All chapter evidence in one place
- Password gate provides clear progression
- Hint system helps when stuck
- Discussion question encourages collaboration

**Current weaknesses:**
- No indication of which evidence is "recommended first read"
- Password input doesn't show what's expected format
- No feedback on wrong password beyond "not the right answer"
- No way to skip password (must solve to progress)

**Mobile-specific risks:**
- Password input on mobile keyboard may be frustrating
- Long evidence lists require significant scrolling
- Hint may be obscured by keyboard on small screens

---

## Evidence Archive

**Route:** `/game/:caseId/archive`

**User goal:** Browse, search, and filter all evidence

**Main UI elements:**
- Search input field
- Chapter filter chips (all + each chapter)
- Category filter chips (all + each category)
- Status filter chips (all/viewed/not viewed)
- Result count (X / Y)
- Evidence cards (title, description, category badge, chapter badge, viewed status)
- Click to open evidence detail

**Source components:** `src/components/EvidenceArchive.tsx`, `src/components/EvidenceCard.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (evidence, categories, chapters), LocalStorage (viewedEvidence)

**Current strengths:**
- Comprehensive filtering (search + 3 filter types)
- Viewed status tracking
- Category and chapter badges for context
- Shows only evidence from unlocked chapters (no spoilers from locked chapters)

**Current weaknesses:**
- No sort options (date, importance, etc.)
- No way to filter by importance
- Search searches title, description, tags only (not content)
- No indication of which evidence is critical vs optional

**Mobile-specific risks:**
- Filter chips use horizontal scroll (may be hard to discover)
- Many filters may feel overwhelming on small screens
- Search input may be obscured by keyboard

---

## Evidence Detail / Asset Viewer

**Route:** `/game/:caseId/evidence/:evidenceId`

**User goal:** Read evidence content and view attached assets

**Main UI elements:**
- Evidence title and description
- Asset viewer (PDF embed, image, audio player, or link button)
- No placeholder notice and no missing-file notice (both removed) — a missing file is silent
- Text content (always shown as the canonical fallback)
- Transcript (for audio evidence)
- Related suspects (if any)
- Related timeline events (if any)
- Importance badge (low/medium/high/critical)
- Back to archive button

**Source components:** `src/components/EvidenceDetail.tsx`, `src/components/AssetViewer.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (evidence), `src/utils/assetUtils.ts` (asset resolution)

**Current strengths:**
- Graceful degradation for missing files
- Text content always available
- Multiple viewing options for PDFs (embed, new-tab, download)
- Transcript support for audio
- Related suspects and timeline events provide context

**Current weaknesses:**
- No way to navigate to next/previous evidence
- No bookmarking or favoriting
- No highlighting or annotation
- No way to zoom images beyond browser default
- PDF embed may not work on all mobile browsers

**Mobile-specific risks:**
- PDF embed height fixed at 70vh (may be too tall/short on some devices)
- Audio player controls vary by browser
- Long text content requires significant scrolling
- External links open in new tab (may confuse users)

---

## Timeline

**Route:** `/game/:caseId/timeline`

**User goal:** View chronological events of the case

**Main UI elements:**
- Vertical timeline with 9 events
- Each event shows: date, time (if present), title, description, location
- Reliability badge (confirmed/probable/disputed)
- Involved suspects (if any)
- Gold dot markers on timeline

**Source components:** `src/components/TimelineView.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (timeline)

**Current strengths:**
- Clear visual timeline
- Reliability ratings help assess evidence quality
- Involved suspects provide context
- Chronological ordering aids reconstruction

**Current weaknesses:**
- No filtering (e.g., by suspect, by location)
- No way to jump to related evidence
- No visual indication of time gaps
- No way to zoom or collapse sections

**Mobile-specific risks:**
- Long descriptions require scrolling
- Timeline may be very long on small screens
- Tap targets may be small for event details

---

## Suspects

**Route:** `/game/:caseId/suspects`

**User goal:** View all suspects and their profiles

**Main UI elements:**
- List of 10 suspects
- Each suspect shows: name, role, status badge (witness / person of interest — no "strong suspect" badge)
- Avatar or initials
- Click to expand neutral details (profile, motive, alibi) — always available
- Points for/against (proEvidence / contraEvidence) appear only once the suspect's `revealFromChapter` (Chapter 3) is unlocked; before that a short neutral note explains more becomes available later
- Expandable/collapsible details (using HTML `<details>`)

**Source components:** `src/components/SuspectList.tsx`, `src/components/SuspectCard.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (suspects)

**Current strengths:**
- Clear status badges distinguish witnesses from suspects
- Expandable details keep initial view clean
- Evidence for/against provides balanced view
- Avatar or initials for visual identification

**Current weaknesses:**
- No filtering by status (witness vs suspect)
- No sorting (e.g., by status, by role)
- No way to jump to related evidence
- Details use native `<details>` which may have inconsistent styling

**Mobile-specific risks:**
- Long suspect profiles require scrolling
- `<details>` element behavior varies by browser
- Avatar initials may be hard to read for some names

---

## Final Answer

**Route:** `/game/:caseId/final`

**User goal:** Submit final accusation (culprit, motive, method, decisive evidence, red herring)

**Main UI elements:**
- Password gate if not unlocked (requires "ROYALPREVIEW"; host code DETECTIVE2026 jumps to the solution)
- Form with:
  - Culprit dropdown (all suspects)
  - Motive textarea
  - Method textarea
  - Decisive evidence textarea
  - Red herring textarea
  - Confidence dropdown (low/medium/high)
- Submit button
- After submission: saved accusation display with edit button and "View solution" button
- Back button in header

**Source components:** `src/components/FinalAnswerForm.tsx`, `src/components/PasswordGate.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (final config, suspects), LocalStorage (finalUnlocked, finalAnswer)

**Current strengths:**
- Password gate prevents premature submission
- All required fields clearly labeled
- Confidence rating captures uncertainty
- Can edit answer after submission
- Clear path to solution after submission

**Current weaknesses:**
- No validation on text fields (can be empty)
- No character limits on textareas (could be very long)
- No hint about what constitutes a "good" answer
- No way to save draft before submitting
- Password gate doesn't explain where to find the password

**Mobile-specific risks:**
- Long form requires significant scrolling
- Textarea input on mobile keyboard may be frustrating
- Dropdown may be hard to use on small screens
- Submit button at bottom may be hard to reach

---

## Final Solution

**Route:** `/game/:caseId/solution`

**User goal:** View whether accusation was correct and read full solution

**Main UI elements:**
- Win/lose banner (green for correct, red for incorrect)
- Solution title
- Full solution explanation
- Wrong answer explanation (if accusation was incorrect)
- Back to home button

**Source components:** `src/components/FinalSolutionScreen.tsx`, `src/components/GameLayout.tsx`

**Source data:** `case.json` (final solution), LocalStorage (finalAnswer, completed)

**Current strengths:**
- Clear visual feedback on accuracy
- Comprehensive solution explanation
- Different explanation for wrong answers
- Back to home allows replay

**Current weaknesses:**
- No way to compare submitted answer to correct answer side-by-side
- No indication of which parts were correct vs incorrect
- No scoring or partial credit
- No way to retry without resetting progress

**Mobile-specific risks:**
- Long solution text requires significant scrolling
- Win/lose banner may not be visible above fold

---

## Navigation / Bottom Nav

**Location:** Fixed at bottom of screen on all main screens

**User goal:** Quick navigation between main sections

**Main UI elements:**
- 5 nav items: Home, Archive, Chapters, Timeline, Suspects
- Icons for each section
- Active state highlighting (gold color)
- Safe area inset support for notched phones

**Source components:** `src/components/BottomNav.tsx`

**Source data:** None (static)

**Current strengths:**
- Always visible for quick access
- Clear active state
- Touch-friendly (48px min height)
- Consistent across all screens

**Current weaknesses:**
- No Final Accusation in bottom nav (must access from Home)
- No way to hide or customize
- No indication of unread content
- No badge for locked/unlocked state

**Mobile-specific risks:**
- Takes up screen space on small devices
- May overlap content if not properly padded
- Safe area insets handled via CSS

---

## Language Selector

**Location:** On the start screen (3-chip selector) **and in the header of every
in-game screen** (a compact dropdown next to the contrast control).

**User goal:** Select/switch preferred language (EN/IT/SQ) at any time

**Main UI elements:**
- Start screen: 3 language chips (EN, IT, SQ)
- In-game header: a compact "🌐 EN" button that opens a small EN/IT/SQ menu
- Active state highlighting

**Source components:** `src/components/LanguageSwitcher.tsx` (the `compact` prop
renders the header dropdown), placed in `src/components/GameLayout.tsx`

**Source data:** `src/data/translations.ts`, LocalStorage (`dfad.language`)

**Current strengths:**
- Can be changed from any page without losing progress; the page updates immediately
- Same context/LocalStorage key everywhere (one language system)
- Persists across sessions

**Current weaknesses:**
- No indication of which languages are complete vs partial
- No full language names shown (only codes)

**Mobile-specific risks:**
- Chips may be hard to tap on very small screens
- Horizontal layout may require scrolling on narrow screens

---

## Contrast/Accessibility Toggle

**Location:** Start screen, and in the header of every in-game screen (compact toggle next to the language control)

**User goal:** Select preferred contrast mode for accessibility

**Main UI elements:**
- 3 contrast mode chips: Normal, High contrast, Inverted
- Active state highlighting
- Horizontal layout

**Source components:** `src/components/ContrastToggle.tsx`

**Source data:** LocalStorage (contrastMode)

**Current strengths:**
- Three modes accommodate different needs
- Immediate visual feedback
- Persists across sessions
- CSS-driven (no JavaScript for rendering)

**Current weaknesses:**
- No explanation of what each mode does
- No preview before selecting

**Mobile-specific risks:**
- Chips may be hard to tap on very small screens
- High contrast mode may not be tested on all devices

---

## Likely UX Improvement Areas

**Evidence discovery:**
- Add "recommended first read" badges to critical evidence
- Add importance sorting in archive
- Add way to mark evidence as "important" or "to review"
- Add next/previous navigation in evidence detail

**Chapter progression:**
- Add hint about where to find password in locked chapters
- Add partial credit or alternative unlock methods
- Add chapter completion indicators
- Add ability to jump between chapters without returning to list

**Navigation:**
- Add Final Accusation to bottom nav when unlocked
- Add unread badges to nav items
- Add breadcrumb navigation
- (Done) Language/contrast controls are now in the header on every screen

**Forms:**
- Add character limits to textareas
- Add draft saving for final answer form
- Add validation hints (e.g., "motive should explain why")
- Add auto-save on form fields

**Mobile optimization:**
- Improve PDF embed for mobile browsers (fallback to download)
- Add pull-to-refresh on archive
- Add swipe gestures for evidence navigation
- Improve filter chip discoverability (add "more" indicator)
- Add compact mode for suspect list

**Collaboration:**
- Add way to share evidence link with team
- Add discussion notes per evidence
- Add team progress summary
- Add way to export/import progress (for device continuity)

**Accessibility:**
- Add screen reader announcements for password validation
- Add keyboard navigation for all interactive elements
- Add ARIA labels for icon-only buttons
- Add focus trap in modals (if added)
- Test high contrast mode with actual screen readers

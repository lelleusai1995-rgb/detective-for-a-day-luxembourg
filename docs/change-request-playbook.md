# Change Request Playbook

This document helps you write precise, effective prompts for future AI-assisted changes to the Detective for a Day app. Using these templates and rules will ensure changes are implemented correctly, maintain code quality, and avoid unintended side effects.

## Golden Rules for Change Requests

1. **Be specific about files** - Always specify the exact file path(s) to modify
2. **Reference existing code** - Quote or describe the current implementation to provide context
3. **Distinguish MUST vs LATER** - Clearly indicate if this is for live demo (MUST) or platform improvement (LATER)
4. **Preserve existing functionality** - State explicitly what must NOT change
5. **Test requirements** - Describe how to verify the change works
6. **Avoid scope creep** - Request one focused change at a time unless changes are closely related

## Template for Content Changes (case.json, translations)

```
Change the [field] in [file path] to [new content].

Current content:
[Quote the current content or describe it]

Desired change:
[Describe exactly what should change]

Preserve:
- [List what must not change, e.g., other fields, structure, other languages]

Verification:
- [How to test: open X screen, look for Y, expect Z result]

Priority: [MUST for live demo / LATER for platform]
```

### Example: Adding a new evidence item

```
Add a new evidence item to the evidence array in public/cases/lux-gelle-fra/case.json.

New evidence details:
- ID: ch4-new-evidence
- Chapter: chapter-4
- Title: "New Document"
- Category: police_report
- Type: pdf
- File path: /cases/lux-gelle-fra/assets/chapter-4/new-doc.pdf
- Content: [full text content]

Add the ID "ch4-new-evidence" to the evidenceIds array of chapter-4.

Preserve:
- All existing evidence items
- All existing chapter structures
- All existing translations

Verification:
- Open Chapter 4 detail
- Verify new evidence appears in list
- Click to open and verify content displays

Priority: MUST for live demo
```

### Example: Adding a translation

```
Add Italian translation for the "archive" UI label in src/data/translations.ts.

Current EN value: "Archive"
Desired IT value: "Archivio"

Add the translation to the `it` object under the "archive" key.

Preserve:
- All existing EN translations
- All existing IT translations
- All existing SQ translations

Verification:
- Change language to Italian on start screen
- Navigate to archive
- Verify "Archivio" appears in header

Priority: LATER for platform
```

## Template for UI/UX Changes (components)

```
Modify [component name] in [file path] to [describe change].

Current behavior:
[Describe what currently happens]

Desired behavior:
[Describe what should happen instead]

Implementation notes:
- [Any specific implementation preferences, e.g., use existing pattern, add to specific section]

Preserve:
- [List what must not change, e.g., other components, routing, data flow]

Verification:
- [How to test: navigate to X screen, perform Y action, expect Z result]

Priority: [MUST for live demo / LATER for platform]
```

### Example: Adding a filter to evidence archive

```
Add an importance filter to the evidence archive in src/components/EvidenceArchive.tsx.

Current behavior:
- Evidence archive has filters for chapter, category, and status
- No filter for importance level

Desired behavior:
- Add a new filter section with chips: All, Low, Medium, High, Critical
- Filter should work alongside existing filters (AND logic)
- Use the same chip-row pattern as existing filters

Implementation notes:
- Add state variable: importanceFilter with default "all"
- Add filter logic in the useMemo filtered array
- Add UI section after status filter, following existing pattern

Preserve:
- All existing filters (chapter, category, status, search)
- All existing filter logic
- All existing styling

Verification:
- Open evidence archive
- Click "Critical" chip
- Verify only critical evidence shows
- Verify other filters still work

Priority: LATER for platform
```

### Example: Moving language selector to home screen

> NOTE: This is now **implemented** — `LanguageSwitcher` (compact) and
> `ContrastToggle` live in the header (`GameLayout`) on every screen. The example
> below is retained only to illustrate the change-request format.

```
Move the language selector from StartScreen to HomeScreen.

Current behavior:
- Language selector (LanguageSwitcher component) only appears on start screen
- Cannot change language after starting game without resetting

Desired behavior:
- Add language selector to HomeScreen (src/components/HomeScreen.tsx)
- Place in a card near the top, below objective
- Keep language selector on StartScreen as well

Implementation notes:
- Import LanguageSwitcher in HomeScreen.tsx
- Add to JSX in a card with appropriate styling
- Follow existing card pattern from StartScreen

Preserve:
- Language selector on StartScreen (don't remove it)
- All HomeScreen functionality
- Language persistence in LocalStorage

Verification:
- Start game in English
- Navigate to home screen
- Change language to Italian
- Verify UI labels change to Italian
- Refresh page
- Verify language persists

Priority: LATER for platform
```

## Template for Technical/Logic Changes (hooks, utils)

```
Modify [function/hook name] in [file path] to [describe change].

Current implementation:
[Describe current logic or quote relevant code]

Desired implementation:
[Describe new logic or provide pseudocode]

Considerations:
- [Any edge cases to handle, e.g., null checks, error handling]
- [Performance considerations, e.g., avoid re-renders]

Preserve:
- [List what must not change, e.g., function signature, other functions, data structures]

Verification:
- [How to test: trigger X, observe Y, expect Z result]

Priority: [MUST for live demo / LATER for platform]
```

### Example: Adding auto-save to final answer form

```
Add auto-save functionality to the final answer form in src/components/FinalAnswerForm.tsx.

Current behavior:
- Form fields use local state only
- No saving to LocalStorage until submit
- Navigating away loses all input

Desired behavior:
- Auto-save form state to LocalStorage on every field change
- Restore saved draft when form loads (if draft exists)
- Clear draft after successful submission
- Use a new LocalStorage key: dfad.finalAnswerDraft

Implementation notes:
- Add useEffect to watch form state changes
- Write to LocalStorage via writeStorage utility
- On component mount, check LocalStorage for draft and populate state
- Clear draft in the submit function after setFinalAnswer

Preserve:
- All existing form validation
- All existing submit logic
- All existing LocalStorage keys (don't conflict with dfad.finalAnswer)

Verification:
- Start filling final answer form
- Navigate to home screen
- Return to final answer form
- Verify draft is restored
- Submit form
- Navigate away and return
- Verify draft is cleared

Priority: LATER for platform
```

### Example: Improving password matching error messages

```
Improve error messaging in the password gate component (src/components/PasswordGate.tsx).

Current behavior:
- Wrong password shows generic "Not the right answer" message
- No guidance on what might be wrong

Desired behavior:
- Add more specific error messages:
  - If input is empty: "Please enter a password"
  - If input is too short (< 3 chars): "Password is too short"
  - Otherwise: "That's not the right answer. Try again."
- Keep the forgiving normalization (case-insensitive, etc.)

Implementation notes:
- Add validation before calling matchesPassword
- Use translation keys for messages (use t() function)
- Add new UI keys to translations.ts if needed

Preserve:
- All existing password matching logic (normalizeAnswer, matchesPassword)
- All existing password normalization (case-insensitive, etc.)
- All existing hints functionality

Verification:
- Enter empty password and submit
- Verify "Please enter a password" message
- Enter "x" and submit
- Verify "Password is too short" message
- Enter wrong password and submit
- Verify "That's not the right answer" message
- Enter correct password
- Verify it unlocks

Priority: LATER for platform
```

## Template for Styling Changes (CSS)

```
Modify [CSS rule/component] in [file path] to [describe change].

Current styling:
[Describe current CSS or quote relevant rule]

Desired styling:
[Describe new CSS or provide specific values]

Target screens:
- [List which screens/components are affected]

Preserve:
- [List what must not change, e.g., other components, responsive behavior, contrast modes]

Verification:
- [How to test: open X screen, check Y element, expect Z appearance]

Priority: [MUST for live demo / LATER for platform]
```

### Example: Making importance badges more prominent

```
Make importance badges more prominent in src/styles/index.css.

Current styling:
- .badge class uses --text-muted color
- .badge-gold, .badge-green, .badge-red, .badge-amber use colored borders
- Badges are relatively small (0.72rem font size)

Desired styling:
- Increase font size of badges to 0.85rem
- Add bold font weight (700)
- For critical importance: use .badge-red with red background (not just border)
- Keep other importance levels as-is

Target screens:
- Evidence archive (badge on evidence cards)
- Evidence detail (importance display)

Preserve:
- All other badge styles
- All other CSS rules
- Contrast mode compatibility (badges must work in all 3 modes)

Verification:
- Open evidence archive
- Verify importance badges are larger and bolder
- Check critical evidence has red background badge
- Test in high contrast mode
- Test in inverted mode

Priority: LATER for platform
```

## Template for New Features

```
Implement [feature name] to [describe purpose].

Requirements:
- [Detailed list of what the feature must do]
- [User interaction flow]

Implementation approach:
- [Suggested components/files to create or modify]
- [Data structures needed, if any]
- [Routing changes, if any]

Preserve:
- [List existing functionality that must not break]

Verification:
- [Step-by-step test plan]

Priority: [MUST for live demo / LATER for platform]
```

### Example: Adding settings screen for language and contrast

```
Implement a settings screen to allow changing language and contrast mode after starting the game.

Requirements:
- New route: /game/:caseId/settings
- Add "Settings" button to home screen (near reset button)
- Settings screen contains:
  - Language selector (EN/IT/SQ)
  - Contrast mode selector (normal/high contrast/inverted)
- Changes apply immediately
- Changes persist to LocalStorage

Implementation approach:
- Create new component: src/components/SettingsScreen.tsx
- Add route to src/App.tsx
- Add "Settings" button/link to src/components/HomeScreen.tsx
- Reuse existing LanguageSwitcher and ContrastToggle components
- Use GameLayout for consistent header

Preserve:
- All existing language and contrast functionality
- All existing screens and routes
- All LocalStorage key names

Verification:
- Start game in English, normal contrast
- Navigate to home screen
- Click Settings
- Change to Italian, high contrast
- Verify changes apply immediately
- Navigate to other screens
- Verify language and contrast persist
- Refresh page
- Verify settings persist

Priority: LATER for platform
```

## Common Pitfalls to Avoid

**Don't do this:**
- "Fix the evidence archive" - Too vague
- "Make the app better" - No specific goal
- "Add a feature to help users" - No clear requirement
- "Change the colors" - No specific values
- "Update the case" - No specific changes

**Do this instead:**
- "Add an importance filter to the evidence archive with chips for All, Low, Medium, High, Critical"
- "Add a settings screen at /game/:caseId/settings with language and contrast controls"
- "Change the primary button color from gold to blue using hex code #3B82F6"
- "Update the case title in case.json from 'The Gëlle Fra Case' to 'The Golden Lady Case'"

## Important Technical Constraints

**Always preserve:**
- The `dfad.` LocalStorage namespace prefix
- The language fallback chain (selected → en → it → sq → any)
- The password normalization logic (case-insensitive, accent-insensitive, space-tolerant)
- The missing-asset fallback (text content always shown)
- The asset path convention (start with `/cases/...`)
- The generic case data model in `src/types/caseTypes.ts`

**Never hardcode in components:**
- Suspect names, IDs, or plot points
- Passwords or unlock codes
- Case-specific content or logic
- Evidence IDs or chapter IDs

**Always use existing utilities:**
- `pickText()` and `pickAsset()` from `src/utils/assetUtils.ts` for localization
- `normalizeAnswer()` and `matchesPassword()` from `src/utils/normalizeAnswer.ts` for passwords
- `t()` from `src/data/translations.ts` for UI labels
- `readStorage()` and `writeStorage()` from `src/utils/storage.ts` for LocalStorage

**Always follow patterns:**
- Use `GameLayout` for consistent header/back button
- Use `AssetViewer` for evidence rendering
- Use `LanguageProvider` for language context
- Use `useLocalStorage` hook for state persistence

## Before Submitting a Change Request

**Checklist:**
- [ ] Have I specified the exact file path(s)?
- [ ] Have I quoted or described the current implementation?
- [ ] Have I clearly described the desired change?
- [ ] Have I stated what must NOT change?
- [ ] Have I provided verification steps?
- [ ] Have I indicated MUST vs LATER priority?
- [ ] Have I avoided scope creep (one focused change)?
- [ ] Have I checked if this change affects case.json (if so, preserve structure)?
- [ ] Have I checked if this change affects LocalStorage (if so, preserve keys)?
- [ ] Have I checked if this change affects translations (if so, use fallback chain)?

## Examples of Good Change Requests

**Content update:**
```
Update the evidence ID "ch2-phone-log" in public/cases/lux-gelle-fra/case.json.
Change the description from "Phone log" to "Erion's call log from June 21".
Preserve all other fields.
Verify by opening the evidence detail and checking the description.
Priority: MUST for live demo
```

**Bug fix:**
```
Fix the progress bar in src/components/HomeScreen.tsx.
Current behavior: Progress bar shows 0% even when evidence has been viewed.
Desired behavior: Progress bar should show (viewed / total) * 100 percentage.
The viewedIds array from useViewedEvidence hook is available.
Preserve all other home screen functionality.
Verify by viewing evidence and checking progress bar updates.
Priority: MUST for live demo
```

**Platform improvement:**
```
Add a "Sort by" dropdown to the evidence archive in src/components/EvidenceArchive.tsx.
Options: "Chapter", "Category", "Importance", "Viewed status".
Default: "Chapter".
Sort the filtered array accordingly.
Preserve all existing filters and search.
Verify by selecting different sort options and checking order.
Priority: LATER for platform
```

## Examples of Bad Change Requests

**Too vague:**
- "Make the app look better"
- "Fix the bugs"
- "Update the case"

**Scope creep:**
- "Add a settings screen, fix all the filters, and redesign the entire UI"
- "Update all translations, add a new chapter, and change the password system"

**Missing context:**
- "Change the button color" (which button? what color?)
- "Add a filter" (what filter? where? how?)

**No preservation clause:**
- "Replace the password system with a new one" (would break existing gameplay)

**No verification:**
- "Add a new feature to help users" (no way to verify it works)

## Quick Reference: File Locations

**Case content:**
- `public/cases/lux-gelle-fra/case.json` - All case data (each evidence has `assetFolder`)
- `public/cases/lux-gelle-fra/assets/` - One folder per evidence item (drop files here)
- `public/cases/lux-gelle-fra/assets-manifest.json` - Generated; do not hand-edit
- `scripts/generate-assets-manifest.mjs` - `npm run assets:manifest` (runs on predev/prebuild)

**UI components:**
- `src/components/StartScreen.tsx` - Landing screen
- `src/components/HomeScreen.tsx` - Main hub
- `src/components/EvidenceArchive.tsx` - Evidence list
- `src/components/EvidenceDetail.tsx` - Evidence view
- `src/components/ChapterList.tsx` - Chapter list
- `src/components/ChapterDetail.tsx` - Chapter view
- `src/components/TimelineView.tsx` - Timeline
- `src/components/SuspectList.tsx` - Suspects
- `src/components/FinalAnswerForm.tsx` - Final accusation
- `src/components/FinalSolutionScreen.tsx` - Solution
- `src/components/AssetViewer.tsx` - Asset rendering
- `src/components/PasswordGate.tsx` - Password input
- `src/components/BottomNav.tsx` - Navigation
- `src/components/GameLayout.tsx` - Layout wrapper

**Core logic:**
- `src/hooks/useCaseData.ts` - Case loading
- `src/hooks/useAssetManifest.ts` - Load assets-manifest.json; folder -> files
- `src/hooks/useLanguage.tsx` - Language context
- `src/hooks/useLocalProgress.ts` - Progress state (no nickname)
- `src/hooks/useViewedEvidence.ts` - Evidence tracking
- `src/hooks/useLocalStorage.ts` - LocalStorage hook
- `src/utils/assetUtils.ts` - Localization helpers
- `src/utils/normalizeAnswer.ts` - Password matching
- `src/utils/progression.ts` - Chapter accessibility / evidence-leak guards
- `src/utils/storage.ts` - Storage helpers (+ LEGACY_STORAGE_KEYS)
- `src/data/translations.ts` - UI labels
- `src/types/caseTypes.ts` - Type definitions (Evidence.assetFolder, AssetManifest)

**Styling:**
- `src/styles/index.css` - Global styles

**Routing:**
- `src/App.tsx` - Route definitions
- `src/main.tsx` - Entry point

**Configuration:**
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite config
- `tsconfig.json` - TypeScript config

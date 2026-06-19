# Final Live-Demo Readiness Report — The Gëlle Fra Case

Status: **ready for the live demo.** Build passes, the case plays end-to-end from
text fallback with empty evidence folders, all four gates use deduction-based
passwords, the Suspects screen no longer spoils the solution, and the
missing-file alert has been removed. English is the source of truth; Italian and
Albanian are aligned for all player-facing previews and every edited string.

---

## 1. Files changed

**Components / code**
- `src/components/AssetViewer.tsx` — removed the missing-file notice and the
  inline `assetMissing` fallbacks; a missing file is now invisible (text fallback only).
- `src/components/SuspectCard.tsx` — added a `revealDetails` prop; for/against
  sections render only when revealed, else a neutral note.
- `src/components/SuspectList.tsx` — computes per-suspect reveal state generically
  from `revealFromChapter` + unlocked chapters; also respects `visibleFromChapter`.
- `src/types/caseTypes.ts` — documented `visibleFromChapter`, added generic
  `revealFromChapter` to `Suspect`.
- `src/data/translations.ts` — removed dead keys `assetMissing`,
  `assetMissingTitle`, `placeholderNotice`; added `suspectDetailsLocked` (EN/IT/SQ).

**Content**
- `public/cases/lux-gelle-fra/case.json` — passwords, questions, intros/objectives,
  evidence content, suspects, timeline and solution (details below).
- `public/cases/lux-gelle-fra/assets-manifest.json` — regenerated.

**Docs**
- `README.md`, `docs/dev-state-overview.md`, `docs/technical-dev-state.md`,
  `docs/data-model-and-content-state.md`, `docs/ux-flow-and-screens.md`,
  `docs/how-to-add-evidence-assets.md`, `docs/asset-generation-prompts.md`,
  `docs/testing-and-live-demo-checklist.md`, `docs/known-gaps-and-technical-debt.md`
  — updated for new passwords, no missing-file alert, completed SQ previews,
  progressive suspect reveal, and de-spoilered Chapter 3/4 content.
- `docs/story-evidence-critical-audit.md` — implementation note appended (history preserved).
- `docs/final-live-demo-readiness-report.md` — this file.

---

## 2. Summary of story fixes

- **Anti-spoiler passwords:** all four leaked passwords replaced with answers
  that require combining ≥2 evidence items.
- **Suspects screen de-spoilered:** removed the unique `strong_suspect` red badge
  (Davide → `suspect`); for/against analysis gated behind Chapter 3 via
  `revealFromChapter`; Nora's contra softened to neutral lines.
- **Chapter 3 forensic pointers:** `relatedSuspects` emptied on
  `ch3-badge-holder-fragment` and `ch3-golden-dust-report` (no longer "Related
  suspect: Nora Weiss").
- **Chapter 3/4 over-telling removed:** Ch3 intro/objective neutralised (no
  "a badge proves an object, not a person"); Ch4 reconstructed timeline rewritten
  to logged facts only (no false "operational message", no "the killing", no
  "name that person"); `ch4-nora-luxevent-call-log` editorial removed; the
  `MOTIVE:` gloss removed from the supplier-review email; the timeline murder
  event neutralised to "estimated time of death".
- **00:49 / 00:51 contradiction made playable:** the chat "back at the house"
  line (`tl-22-return`, now `disputed`) and the 00:49 badge are shown side by side
  in the facts-only timeline; the Chapter 4 objective asks players to compare
  claimed locations against badge access times. Coherent return path: 00:49 LHoFT
  → 01:04 taxi → home, making "home at 00:51" the provable lie.
- **Badge #0017 possession gap closed:** `ch2-first-badge-access-note` and
  `ch4-temporary-badge-memo` now state #0017 was handed in to the Operations desk
  and kept un-deactivated in the spare-badge drawer (Operations = Nora).
- **Meta/production language removed:** `ch3-erion-audio-transcript` no longer says
  "Audio file may be added later"; no "placeholder/fictional/game" wording in
  player-facing text.
- **Motive strengthened in-world:** the supplier review now also covers "payments
  routed to coordinators outside the standard schedule" (personal exposure).
- **Date consistency:** midnight fireworks relabelled **23 June 00:00–00:20**.

The full murder sequence remains explained only on the **solution screen**.

---

## 3. Final password table

| Gate | Password | Accepted aliases | Logic (≥2 items) |
|------|----------|------------------|------------------|
| Ch.1 → Ch.2 | `PONTADOLPHE` | `PONT ADOLPHE`, `ADOLPHE`, `BRIDGE`, `ADOLPHE BRIDGE` | The launch point of the fireworks, inferred from the **fireworks programme** + the **event map** (launched near Pont Adolphe, watched from the Gëlle Fra). |
| Ch.2 → Ch.3 | `GLACIS` | `PLACE DE GLACIS`, `PLACEDEGLACIS` | The stated location from which nobody could reach the side room in time — from **statements** + **walking distances** (Glacis → side room is 25–30 min). |
| Ch.3 → Ch.4 | `0044` | `BADGE0044`, `BADGE 0044`, `NORA BADGE`, `NORA'S BADGE`, `#0044` | The badge number that brackets the side-room events — from the **badge access log** + the **badge note** (the loud badge #0017 is the lost one; #0044 brackets it). |
| Ch.4 → Final | `ROYALPREVIEW` | `ROYAL PREVIEW`, `ROYAL-PREVIEW`, `ROYAL_PREVIEW` | The hidden mode removed in the **body** of the real patch notes (cross-referenced with the group chat). Not the document title. |

Matching is case-insensitive, trimmed, accent- and space/punctuation-tolerant
(`src/utils/normalizeAnswer.ts`), so `pont adolphe`, `#0044`, `royal-preview`
all pass.

**Host/facilitator code:** `DETECTIVE2026` — entered into the **final** password
field, it jumps straight to the solution screen. Never shown to players.

---

## 4. Confirmations

- **Old passwords no longer work.** Verified by a normalization test: `GELLEFRA`,
  `ACIERIE86`, `LAB9`, `PATCHNOTES` match no gate; the new passwords and all
  aliases match their gates. They are not retained as aliases.
- **Missing-file alert / placeholder removed.** `AssetViewer` shows no
  "file not available" / "allegato non disponibile" / placeholder message in any
  language; the dead translation keys were removed. Text fallback always shows.
- **Edited text updated in EN/IT/SQ.** Every edited preview field is complete in
  all three languages; every edited string that already had IT/SQ was updated in
  step; the solution and wrong-answer explanations now include SQ.
- **Albanian evidence preview/card text complete.** A script confirms every
  evidence title/description, chapter title/intro/objective/question, suspect
  role/profile and category label has `en`, `it` and `sq` (no missing language).
  Long evidence bodies/transcripts may still fall back to EN by design.
- **Suspects screen does not solve the case early.** No red badge; pro/contra
  hidden until Chapter 3.
- **Chapter 3 does not point only at Nora.** The two forensic items have no
  related suspects.
- **Chapter 4 evidence does not narrate the murder.** The reconstructed timeline
  is facts-only.

---

## 5. Documentation updated

`README.md`, `docs/dev-state-overview.md`, `docs/technical-dev-state.md`,
`docs/data-model-and-content-state.md`, `docs/ux-flow-and-screens.md`,
`docs/how-to-add-evidence-assets.md`, `docs/asset-generation-prompts.md`,
`docs/testing-and-live-demo-checklist.md`, `docs/known-gaps-and-technical-debt.md`,
`docs/story-evidence-critical-audit.md` (implementation note appended), and this
report.

---

## 6. Remaining known risks

- **`case.json` is downloadable.** The full solution, passwords and host code ship
  to the browser (no backend — out of scope). Keep teams off DevTools; brief
  facilitators. (Audit I-18.)
- **Two pre-generated assets predate this pass.** `event-map.png` still prints the
  old street numbers (now harmless — no longer a password) and
  `police-engagement-email.pdf` may show the older briefing wording. The in-app
  text is the updated, spoiler-safe version. **Recommendation:** regenerate both
  with the updated prompts in `docs/asset-generation-prompts.md`, or remove the
  two files (then re-run `npm run assets:manifest`) to play purely from text.
- **LATER story polish:** no second murder-grade alternative suspect; Sofia's "L."
  and Luca's "note" threads are loose ends; no hint feature (references removed).
- **IT/SQ long bodies:** some long evidence bodies still fall back to EN (previews
  are complete).

---

## 7. Test results

- `npm run assets:manifest` → `lux-gelle-fra: 2 file(s) in 2 folder(s)` →
  `public/cases/lux-gelle-fra/assets-manifest.json` written. **OK.**
- `npm run build` (`tsc -b && vite build`) → 66 modules transformed, built in
  ~0.8s, `dist/` produced (index.html, CSS 9.08 kB, JS 209.42 kB). **OK, no TS errors.**
- `JSON.parse(case.json)` → **valid.**
- Password normalization test (16 cases) → **all pass** (new + aliases unlock; old fail).
- Preview-completeness script → **no preview field missing a language.**
- Repo grep → no old password appears as an active answer/test instruction in
  `src/` or `case.json`; remaining mentions are documentation history / "no longer valid" notes.

---

## 8. Facilitator checklist before the live demo

1. Share the production URL; players open it on their phones, pick language/contrast, tap **Start the investigation** (no nickname/login).
2. Keep the passwords private; hand them out only if a team is stuck:
   - Ch.1→2 `PONTADOLPHE` · Ch.2→3 `GLACIS` · Ch.3→4 `0044` · Final `ROYALPREVIEW`.
3. Keep the host code `DETECTIVE2026` for yourself — entered in the **final**
   password field it jumps to the solution. Never show it to players.
4. Remind teams that progress is per-device (LocalStorage); language and contrast
   can be changed from any screen's header.
5. (Optional) Regenerate or remove the two pre-generated assets (see §6) for full
   visual consistency with the updated, address-free, spoiler-safe text.
6. Keep teams off browser DevTools (the solution is in the downloadable `case.json`).

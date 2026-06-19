# Story & Evidence Critical Audit — The Gëlle Fra Case

> Scope: brutal, actionable audit of `public/cases/lux-gelle-fra/case.json` and the
> surrounding docs/components. **No source files were changed.** This document is the
> only deliverable. Every criticism carries a concrete fix tagged **MUST** (fix before
> the next live use) or **LATER** (improve when convenient).
>
> Verification note: passwords, the solution, the culprit, all "locked" evidence and the
> host code all live inside a single `case.json` that the browser fetches at runtime
> (`useCaseData.ts` → `/cases/lux-gelle-fra/case.json`). Anything in that file is readable
> by any player via DevTools/Network. The chapter "locking" is presentation-only. This
> cannot be fixed without a backend, which is explicitly out of scope — so it is treated
> as a *facilitator-briefing* item, not a code fix.

---

## 1. Executive Verdict

**Overall rating: Slightly easy → Too easy (currently unfair-in-reverse: it spoils itself).**
The story skeleton is genuinely good — the "logistics beat technology" inversion, the
badge-proves-an-object-not-a-person idea, and the framed-developer red herring are a solid
mystery spine. But the *implementation* leaks the answer at almost every layer: the
passwords are transcriptions of visible strings, the Suspects screen hands players the full
pro/contra reasoning at minute one, and Chapter 3–4 evidence narrates the solution in prose.
As shipped, a sharp team solves this in 30–50 minutes, not 2–3 hours, and they solve it by
*reading the app telling them the answer* rather than by deduction.

### Top 5 critical problems

1. **All four chapter passwords are visible-string transcriptions, not deductions.**
   `GELLEFRA` is literally the product title shown on every screen. `ACIERIE86` is printed
   verbatim (twice) in the first statement of Chapter 2 and its own description says "Several
   mention the same base address." `LAB9` is in the header line of the Chapter 3 access log.
   `PATCHNOTES` is the title of a Chapter 4 evidence item, and the chapter question says "its
   title is your final key." None require cross-evidence reasoning. (Section 5.)
2. **The Suspects screen is an ungated spoiler.** `SuspectList.tsx` renders all 10 suspects
   with full `proEvidence`/`contraEvidence` and status badges from the start. Davide is the
   only `strong_suspect` (red badge) — telegraphing "obvious = innocent" — and Nora's contra
   lines plus Davide's "can't be in two places" pro line give away the whole solution before
   any chapter is unlocked. (Sections 5, 6, 10.)
3. **The app argues the player out of the red herring instead of letting them earn it.**
   Chapter 3 intro/objective explicitly say "a badge proves the use of an object, not the
   identity of the person holding it" and "Show that Davide's badge could have been used by
   someone else." Two Chapter 3 forensic items list `relatedSuspects: [nora-weiss]` only,
   pointing straight at Nora. The Chapter 4 reconstructed-timeline evidence narrates the
   murder ("false 'operational check' message", "00:33–00:39 the killing") and ends "Name
   that person." Deductive load ≈ zero. (Sections 4, 9.)
4. **The map asset prompt leaks two future passwords.** `ch1-event-map`'s app fallback hides
   the addresses ("LHoFT office"), but its generation prompt asks for labels
   "Armundia House — Rue de l'Aciérie 86" and "LHoFT — Rue du Laboratoire 9". If that asset
   is generated as specified, Chapter 1 visibly prints the Chapter 2 and Chapter 3 passwords.
   (Sections 4, 6, 8.)
5. **Motive and Nora's physical placement are under-evidenced for a murder conviction.**
   The motive is a *procurement review* (favouritism), never personal enrichment/criminal
   exposure — thin grounds for murder. Nora's badge (#0044) never appears on the side-room
   door; her presence there is pure inference. Meanwhile a real smoking gun exists but is
   buried: her badge is at the LHoFT corridor at 00:49 while she chats "back at the house" at
   00:51, though house↔LHoFT is 20–25 min — a contradiction no question points at. (Sections 4, 9, 11.)

### Is the case playable tomorrow?
**Yes, mechanically** (no crashes; text fallback complete). **No, as a satisfying mystery** —
without the MUST fixes it will be solved trivially and the "aha" inversion will land flat
because the app already told everyone the answer.

### Are the current passwords acceptable?
**No.** All four are "too obvious — fixable" at best; `GELLEFRA` and `PATCHNOTES` are
**fundamentally wrong** (title of the product / title of an evidence item). See Section 5.

### Are evidence/assets aligned enough for a demo?
**Text-only: mostly yes** (the content and prompts were clearly written together).
**With generated assets: no** — the map prompt leaks passwords, and several prompts request
facts the app fallback omits (or vice-versa). See Sections 6–7.

### Immediate MUST fixes before live use
- Replace or harden all four passwords so each needs ≥2 evidence items (Section 5).
- Gate `proEvidence`/`contraEvidence` and `status` on the Suspects screen by chapter, or
  strip the spoiler lines (Section 5/10). *(Note: this is the one MUST that needs a tiny
  component change; if code is frozen, the JSON-only mitigation is to move spoiler lines out
  of pro/contra into later-chapter evidence and drop the `strong_suspect` status.)*
- Remove `relatedSuspects: [nora-weiss]`-only pointers from Chapter 3 forensic items.
- Fix the `ch1-event-map` prompt to NOT print street addresses.
- Soften Chapter 3/4 intros/objectives and the reconstructed-timeline so they stop asserting
  the solution.
- Brief the facilitator that the whole solution is in the downloadable `case.json`.

### LATER improvements
- Strengthen Nora's motive (personal stake), add 1–2 genuinely viable alternative suspects,
  surface the 00:49-vs-00:51 contradiction as an intended clue, fix the fireworks date label,
  implement or delete the documented-but-missing "hint" feature, and reconcile the docs
  (evidence count, placeholder banner, hint button all describe things that don't match code).

---

## 2. Severity Scale

| Severity | Meaning |
|---|---|
| **Blocker** | Breaks the game as a mystery or as software; must fix before any real session. |
| **High** | Seriously damages difficulty/fairness/immersion; fix before a paid/important demo. |
| **Medium** | Noticeable weakness or inconsistency; fix when iterating. |
| **Low** | Cosmetic, doc-only, or edge-case. |

**Difficulty score (per gate/chapter), 1–5:** 1 = too hard/unfair · 2 = hard but solvable ·
3 = balanced · 4 = easy · 5 = trivial/leaked/answer visible.

**Leak risk score, 1–5:** 1 = answer never visible before the gate · 3 = derivable from one
careful read · 5 = printed verbatim in visible player text/title.

**Fairness score, 1–5:** 1 = impossible to reach fairly · 3 = fair with effort · 5 = handed
to the player (unfairly easy / spoiled).

---

## 3. Critical Issues Register

| ID | Severity | Area | File / field / evidence ID | Current issue | Why it hurts gameplay | Recommended fix | MUST/LATER |
|---|---|---|---|---|---|---|---|
| I-01 | Blocker | Password | chapter-1 `unlock.password` `GELLEFRA` | Password = the case title ("The Gëlle Fra Case"), shown on start/home/every chapter badge, plus newspaper, body report, photo title, group chat. | First gate is solved before reading anything; sets a "just type what you see" tone. | Replace with a value requiring program+map+report cross-read (Section 5). | MUST |
| I-02 | Blocker | Password | chapter-2 `unlock` `ACIERIE86` | "Rue de l'Aciérie 86" appears verbatim twice in `ch2-suspect-statements`; the item description even says "Several mention the same base address"; the question asks for "the exact street and number." | Pure transcription from one item; the chapter's actual alibi-cracking reasoning is unused by the gate. | Re-anchor the gate on the alibi contradiction (Section 5). | MUST |
| I-03 | Blocker | Password | chapter-3 `unlock` `LAB9` | "Rue du Laboratoire 9 (LHoFT)" is the header line of `ch3-badge-access-log`; tag `laboratoire`; also in ch1/ch2 asset prompts. | Single-read transcription; disconnected from the "contaminated evidence" reasoning the chapter sets up. | Re-anchor on what the badge log *proves* (Section 5). | MUST |
| I-04 | Blocker | Password | chapter-4 `unlock` / `final` `PATCHNOTES` | Equals the title of `ch4-real-patch-notes` ("The Real Patch Notes"); question says "its title is your final key"; phrase also in ch2 chat and ch3 patch log; folder `08-real-patch-notes`. | The final, climactic gate is a title copy. | Anchor on the *content* of the patch notes (e.g. `ROYALPREVIEW`) (Section 5). | MUST |
| I-05 | Blocker | Spoiler / UI | `src/components/SuspectList.tsx` + all `suspects[].proEvidence/contraEvidence/status` | All suspects render with full pro/contra + status from minute 1, ungated. | Hands players the entire deduction (Nora's badge custody + supplier calls; Davide's "can't be in two places"; Matteo's "scheduled deploy"). Mystery collapses. | Gate pro/contra + status by chapter (needs small code change), OR move spoiler lines into later-chapter evidence and remove `strong_suspect`. | MUST |
| I-06 | High | Spoiler | `ch3-golden-dust-report`, `ch3-badge-holder-fragment` `relatedSuspects` | Both list `["nora-weiss"]` only. EvidenceDetail renders "Related suspects: Nora Weiss". | Chapter 3 forensic points straight at the culprit, a chapter early. | Remove these `relatedSuspects`, or balance with 2–3 names. | MUST |
| I-07 | High | Asset leak | `docs/asset-generation-prompts.md#ch1-event-map` | Prompt requests labels with "Rue de l'Aciérie 86" and "Rue du Laboratoire 9"; app fallback hides them. | If generated, Chapter 1 prints the Ch2 & Ch3 passwords. | Change prompt to show place names only, no street numbers. | MUST |
| I-08 | High | Logic / over-tell | chapter-3 `intro`/`objective`, chapter-4 `ch4-final-reconstructed-timeline.content` | Text states the red-herring resolution and narrates the murder/operational-message and "Name that person." | Removes the deductive work; the "evidence" asserts the conclusion. | Rewrite to present facts, not conclusions (Sections 4, 7). | MUST |
| I-09 | High | Contradiction (unused) | `ch2-group-chat-screenshot` (00:51 "back at the house") vs `ch3-badge-access-log` (#0044 at LHoFT 00:49) vs `ch2-walking-distances` (house↔LHoFT 20–25 min) | Physically impossible to be home at 00:51 if at LHoFT at 00:49; never referenced by any question/hint; muddied by a 01:04 taxi call. | A genuine smoking gun is wasted and reads like an authoring bug. | Surface it as the intended Chapter 3/4 deduction; resolve the taxi line. | MUST |
| I-10 | High | Motive | `ch4-grand-duke-supplier-review-email`, `ch4-luxevent-contract` | Motive is a *procurement favouritism review*; no personal enrichment, kickbacks, or criminal exposure shown. | Murder over "single-supplier preference, review recommended" is disproportionate; weakens the whole case. | Add evidence of personal payments / criminal exposure to Nora (Section 7). | LATER |
| I-11 | High | Logic gap | `ch2-first-badge-access-note`, `ch4-temporary-badge-memo` | The frame requires Nora to physically hold the "lost" #0017, but no item establishes the badge was recovered into Operations custody — it was just "lost" and "not deactivated." | A sharp team objects "if it's lost, how did Nora get it?" — undermining the solution. | Add a line that a recovered/handed-in badge sat in the Operations drawer un-deactivated. | MUST |
| I-12 | Medium | Thin field | suspects (Marco, Elira, Sofia, Matteo, Luca) | Alternative suspects have generic, non-lethal motives; once Davide is cleared, only Nora has means+motive+access. | Late game is uncontested; reduces debate and time. | Give 1–2 suspects a credible (but ultimately refuted) murder-grade motive. | LATER |
| I-13 | Medium | Date consistency | `ch1-fireworks-program`, `tl-22-fireworks` | Midnight fireworks "00:00–00:20" filed under "22 June", while every later event is "23 June". 00:00 is 23 June. | In a timing-driven mystery, an off-by-a-day label invites mistaken alibi math. | Label fireworks "23 June 00:00–00:20" (eve of National Day). | LATER |
| I-14 | Medium | Gate/chapter mismatch | all chapters | Each chapter teaches rich reasoning (place misdirection, alibi math, contaminated evidence, motive web) but gates on an unrelated transcription. | Players learn the chapter is "find the string", not "reason". | Tie each password to that chapter's actual reasoning (Section 5). | MUST |
| I-15 | Low | Immersion | `ch3-erion-audio.content.en` | Player-facing fallback says "Audio file may be added later. The transcript below carries the full content." | Meta/production text breaks immersion. | Replace with a neutral in-world caption or leave only the transcript. | MUST |
| I-16 | Low | Docs vs code | `testing-and-live-demo-checklist.md`, `dev-state-overview.md`, `ux-flow-and-screens.md` | Repeatedly reference a "Show hint" button / hint system; `PasswordGate.tsx` renders no hint and `case.json` sets no `hint`. | Facilitators expect a hint feature that doesn't exist. | Implement a hint toggle OR delete the references; populate `unlock.hint` if kept. | LATER |
| I-17 | Low | Docs accuracy | `data-model-and-content-state.md` | Claims "25 evidence items" (actual 26), "1407 lines / ~89KB" (actual 1814 lines), and a "placeholder banner" that `technical-dev-state.md` says was removed. | Misleads future authors. | Correct the counts and the banner claim. | LATER |
| I-18 | Medium | Architecture leak | `case.json` (whole) | Entire solution + passwords + host code shipped to the browser. | Tech-savvy player can read everything. | Out of scope to fix (no backend); brief facilitators; keep teams off DevTools. | LATER |
| I-19 | Low | Folder-name leak | `assetFolder` values, e.g. `chapter-4/03-nora-luxevent-call-log...` | Once files are dropped in, asset URLs expose names like "nora-luxevent-call-log". | Minor late-chapter hinting via network panel. | Rename folders to neutral ordinals (e.g. `03-doc`) if assets are added. | LATER |

---

## 4. Chapter-by-Chapter Logic Audit

### Chapter 0 — Confidential Briefing
- **Intended reasoning:** Understand why an external team is reviewing the case; set the "trust
  the mosaic, the loudest clue isn't the true one" frame.
- **Evidence used:** `ch0-police-engagement-email` (1 item).
- **What works:** Clean hook; names the badge-in-the-trail puzzle; lists the 6 deliverables.
- **What fails:** It pre-announces the twist ("The loudest clue is not always the true one"),
  which, combined with Davide being the only `strong_suspect`, pre-disposes players to discount
  the obvious suspect before they've met any evidence.
- **Password assessment:** No gate (always open). Fine.
- **Fixes:** Soften "the loudest clue is not always the true one" to something less of a tell,
  e.g. "no single document is decisive on its own." **MUST** (cheap, high impact).

### Chapter 1 — The Body Under the Fireworks
- **Intended reasoning:** Establish place + time window (00:30–00:45), and that the misdirection
  is the fireworks crowd vs the side room. Answer the question "where was everyone looking while
  no one was watching" = the Gëlle Fra viewpoint.
- **Evidence used:** newspaper, body-discovery report, event map, fireworks program, emergency call.
- **What works:** The body report (time window, two traces, badge holder of record) and the
  emergency call ("a torch, a heavy one — no, it's gone") are good, layered scene-setting. The
  program + map anchor timing and geography.
- **What fails:** The gate answer (`GELLEFRA`) is the case title and appears in 4 of the 5 items —
  there is nothing to *find*. The question explicitly says "name that place," so players type the
  word that's been on screen since the start screen.
- **Password assessment:** Difficulty 5, Leak 5, Fairness 5 (spoiled). `singleEvidenceSolvable: yes`;
  `foundInTitle: yes` (the *case* title).
- **Fixes:** See Section 5, I-01. Keep the "misdirection place" *concept*, change the *answer* to
  something that requires combining the program (launch point) and the map. **MUST.**

### Chapter 2 — The Retreat Alibis
- **Intended reasoning:** Compare statements vs walking distances vs call logs; notice multiple
  incomplete alibis; understand who *can't* be where they claim.
- **Evidence used:** suspect statements, walking distances, group chat, Nora call log, first badge
  access note, Gëlle Fra group photo.
- **What works:** Genuinely the strongest *reasoning* chapter — the raw material for alibi math is
  all here (distances, the 00:23 LuxEvent call, the lost-badge note). The group photo gives Marco/
  Sofia/Arben honest alibis.
- **What fails:** The gate (`ACIERIE86`) ignores all of that and asks for the base address, which is
  printed twice and flagged in the description. The chapter *teaches* alibi-cracking but *tests*
  transcription. Also the "00:51 back at the house" line (a real contradiction with later badge data)
  is planted here but never paid off.
- **Password assessment:** Difficulty 5, Leak 5, Fairness 5. `singleEvidenceSolvable: yes`.
- **Fixes:** Re-anchor the gate on the alibi contradiction (Section 5, I-02). Resolve/exploit the
  taxi + "back at the house" lines (I-09). **MUST.**

### Chapter 3 — The Evidence Does Not Add Up
- **Intended reasoning:** Separate strong-looking technical clues (badge #0017, the 00:17 patch) from
  the truth; realize the badge proves an object, not a person; clear Davide via the 00:31 audio.
- **Evidence used:** badge access log, badge-holder fragment, golden-dust report, patch log 00:17,
  Erion audio, Davide photo metadata.
- **What works:** The audio (Davide at Glacis 00:31, 25–30 min from the side room) is a clean,
  fair exoneration. The golden-dust "not fireworks → LuxEvent" pivot is a nice supply-chain turn.
  The badge log is the spine of the case.
- **What fails:** The chapter *tells* players the answer: the intro says "a badge proves the use of
  an object, not the identity of the person holding it"; the objective says "Show that Davide's badge
  could have been used by someone else." Two forensic items point only at Nora via `relatedSuspects`.
  The gate (`LAB9`) is the access-log header line.
- **Password assessment:** Difficulty 5, Leak 5, Fairness 5. `singleEvidenceSolvable: yes`.
- **Fixes:** Rewrite intro/objective to be neutral; remove the Nora-only `relatedSuspects`; re-anchor
  the gate on what the log *proves* (e.g. the bracketing badge number `0044`, requiring the player to
  read the log + the badge note together). **MUST** (Sections 5, 6, 7).

### Chapter 4 — The Traitor's Code
- **Intended reasoning:** Tie supplier + badges + access + motive; name Nora; understand the patch
  notes were exoneration, not murder.
- **Evidence used:** LuxEvent contract, Grand Duke review email, Nora↔LuxEvent 41s call, Arben 2nd
  statement, reconstructed timeline, temporary-badge memo, missing-flashlight report, real patch notes.
- **What works:** Good *quantity* of converging material (contract favouritism, motive email, 41s call
  in the lower-town sector, weapon provenance). The "patch notes = embarrassment, not murder" reveal is
  a satisfying button.
- **What fails:** `ch4-final-reconstructed-timeline` is not evidence — it's the solution in prose,
  including an "operational check message" that exists in no document and the exact "00:33–00:39 killing"
  window, ending "Name that person." The gate (`PATCHNOTES`) is the title of an item in the same chapter,
  and the question says so. Motive is thin (I-10); Nora's possession of #0017 is unestablished (I-11).
- **Password assessment:** Difficulty 5, Leak 5, Fairness 5. `singleEvidenceSolvable: yes`.
- **Fixes:** Demote the reconstructed timeline to facts-only (or move it to the solution screen); anchor
  the gate on the patch-notes *content* (`ROYALPREVIEW`); strengthen motive; close the badge-possession
  gap. **MUST/LATER** per item (Section 7).

---

## 5. Password Leakage and Difficulty Audit

Matching is accent/space/case/punct-insensitive (`normalizeAnswer.ts`), so "GELLE FRA",
"gëlle fra", " gellefra " all pass. Aliases below are normalized equivalently.

### Password: `GELLEFRA` (Chapter 1 → 2)
| Field | Finding |
|---|---|
| Aliases | `GELLE FRA`, `GËLLE FRA`, `GOLDEN LADY` |
| All occurrences | **Case title** (`title.*`), subtitle context; `ch1-newspaper-article` (×2), `ch1-body-discovery-report` (via place), `ch2-gelle-fra-group-photo` **title**, `ch2-group-chat` ("under the Gëlle Fra"), `ch1-event-map`, timeline `tl-22-fireworks` location, chapter-1 question; docs and `# DETECTIVE…` source files. |
| Visible-occurrence risk | **5** — printed as the product title on the start screen and every chapter badge. |
| First visible occurrence | Start screen (before any evidence). |
| Guessable from first evidence? | Yes (and from the title alone). |
| Solvable from one evidence? | Yes. |
| Requires cross-evidence reasoning? | **No.** |
| difficultyScore / leakRiskScore | **5 / 5** |
| `foundInVisibleText` / `…TitleOrDescription` / `…FirstEvidence` | yes / **yes (case title)** / yes |
| Recommendation | **Fundamentally wrong — replace.** |
| Replacement proposal | Concept stays ("where everyone looked while no one watched"), but the *answer* should require combining items. Option A: `PONT ADOLPHE` — the fireworks *launch* point (from `ch1-fireworks-program` + `ch1-event-map`), distinct from the *viewing* crowd, forcing players to read program+map rather than echo the title. Option B (harder): `0030` / `00:30` — the start of the death window, derived from the body report's TOD vs the program's fireworks end (00:20). Derive from **2 items** (program + map, or report + program). |

### Password: `ACIERIE86` (Chapter 2 → 3)
| Field | Finding |
|---|---|
| Aliases | `ACIERIE 86`, `RUE DE L ACIERIE 86`, `RUE DE L'ACIERIE 86` |
| All occurrences | `ch2-suspect-statements` content (×2: Marco, Nora) and **its description** ("the same base address"); `ch4-final-reconstructed-timeline` ("Rue de l'Aciérie 86"); `ch1-event-map` **asset prompt** (I-07); `ch2-walking-distances` prompt; docs. |
| Visible-occurrence risk | **5** — printed verbatim and flagged by the item's own description. |
| First visible occurrence | First item of Chapter 2. |
| Guessable from first evidence? | Yes. |
| Solvable from one evidence? | Yes. |
| Requires cross-evidence reasoning? | **No.** |
| difficultyScore / leakRiskScore | **5 / 5** |
| `foundInVisibleText` / `…TitleOrDescription` / `…FirstEvidence` | yes / **yes (description)** / yes |
| Recommendation | **Too obvious — replace the gate concept.** |
| Replacement proposal | Make Chapter 2 gate on the alibi the player must *break*. Answer `DAVIDE` is wrong (he's innocent) — instead ask "whose stated location is contradicted by the call log + walking times?" with answer **`NORA`** is too on-the-nose for Ch2; safer: answer the *time* that can't be reconciled, e.g. `0049` is a Ch3 fact. Best Ch2 answer: **`GLACIS`** — the only place from which the side-room badge use at ~00:28 is physically impossible (read `ch2-walking-distances` "LHoFT → Glacis 25–30 min" + `ch2-suspect-statements` Davide "at/near Glacis"), establishing the contradiction that *seems* to damn Davide. Requires statements + distances (**2 items**). Keep `RUE DE L'ACIERIE 86` only as the literal map label, never as a gate. |

### Password: `LAB9` (Chapter 3 → 4)
| Field | Finding |
|---|---|
| Aliases | `LABORATOIRE 9`, `LABORATOIRE9`, `RUE DU LABORATOIRE 9` |
| All occurrences | `ch3-badge-access-log` header line + tag `laboratoire`; `ch4-*` timeline; `ch1-event-map` & `ch2-walking-distances` **asset prompts** (so derivable as early as Ch1 if those assets exist); docs. |
| Visible-occurrence risk | **5** — header line of the chapter's first technical log. |
| First visible occurrence | First item of Chapter 3 (earlier if map asset generated). |
| Guessable from first evidence? | Yes. |
| Solvable from one evidence? | Yes. |
| Requires cross-evidence reasoning? | **No.** |
| difficultyScore / leakRiskScore | **5 / 5** |
| `foundInVisibleText` / `…TitleOrDescription` / `…FirstEvidence` | yes / no / yes |
| Recommendation | **Too obvious — replace.** |
| Replacement proposal | Anchor on what the log *proves*: the badge number that brackets the side room. Answer **`0044`** (Nora's badge, present at 00:11/00:19/00:49) requires the player to read the access log AND the `ch2-first-badge-access-note` (which establishes #0017 was Davide's lost badge) to realize a *different* badge brackets the murder — i.e. genuine cross-evidence inference. Alternatively **`0017`** is too obvious (it's the "loud" badge). Use `0044`. Requires **2 items**. |

### Password: `PATCHNOTES` (Chapter 4 → Final)
| Field | Finding |
|---|---|
| Aliases | `PATCH NOTES` |
| All occurrences | `ch4-real-patch-notes` **title** ("The Real Patch Notes") + content; chapter-4 **question** ("its title is your final key"); `ch2-group-chat` ("they must NOT see the patch notes"); `ch3-patch-log-0017` title/tags; folder `08-real-patch-notes`; docs. |
| Visible-occurrence risk | **5** — it is an evidence title, and the question points at it. |
| First visible occurrence | Chapter 2 chat (phrase), Chapter 4 title (answer). |
| Guessable from first evidence? | Yes. |
| Solvable from one evidence? | Yes (the title). |
| Requires cross-evidence reasoning? | **No.** |
| difficultyScore / leakRiskScore | **5 / 5** |
| `foundInVisibleText` / `…TitleOrDescription` / `…FirstEvidence` | yes / **yes (title)** / yes |
| Recommendation | **Fundamentally wrong — replace.** |
| Replacement proposal | Anchor on the *content* the player must actually read inside the patch notes: the name of the removed hidden mode → **`ROYALPREVIEW`** (alias `ROYAL PREVIEW`). The Chapter 4 question becomes "the patch notes name what was actually fixed — name the hidden mode that was removed," forcing a read of the body, not the title. Cross-reference with `ch2-group-chat` ("they must NOT see the patch notes") to confirm meaning. Requires **2 items** (chat + patch notes). |

### Host / facilitator code: `DETECTIVE2026`
- Wired only as `altPassword` in `FinalAnswerForm.tsx` (hidden field path), never rendered to players.
  **Acceptable.** Only accidental visibility is via the downloadable `case.json` (I-18). No change needed
  beyond the facilitator briefing.

**Summary:** every player-facing password scores Difficulty 5 / Leak 5 / Fairness 5 — i.e. all four are
"trivial/leaked." This confirms the suspicion in the brief: each can be solved by spotting a repeated
word or a title, with no cross-evidence reasoning. **All four are MUST-replace.**

---

## 6. Full Evidence Alignment Matrix

Legend — Spoiler risk: 🟥 high / 🟧 med / 🟩 low. "Mismatch" = app text vs `asset-generation-prompts.md`.

| Evidence ID | Ch | Title (EN) | App shortcut/description | Fallback content summary | Prompt ref | Prompt expected facts | Mismatch | Spoiler | Canonical action required |
|---|---|---|---|---|---|---|---|---|---|
| ch0-police-engagement-email | 0 | Police Liaison — Support Request | "urgent email to review a restricted package" | Hook; 6 deliverables; "loudest clue isn't true" | ✓ ch0 | Email, sender, subject, badge-in-trail, 4 deliverables | Prompt says "identify culprit, motive, method, decisive" (4); content lists 6 steps incl. timeline+archive review | 🟩 | Reconcile deliverables count; soften the "loudest clue" tell. |
| ch1-newspaper-article | 1 | "Mystery During the National Day" | "front page sets the scene" | Crowd at Gëlle Fra, midnight fireworks, officials reviewing records | ✓ | No victim name, atmosphere | IT content drops the final consultants paragraph (EN-only) | 🟧 (echoes `GELLEFRA`) | Complete IT/SQ; keep victim unnamed. |
| ch1-body-discovery-report | 1 | Body Discovery Report | "position, time window, two traces" | Side room, TOD 00:30–00:45, badge holder fragment, golden dust, holder of record D. Rinaldi | ✓ | Same | Aligned | 🟧 (names Rinaldi as holder — intended) | Keep; ensure "to be verified" stays on the badge line. |
| ch1-event-map | 1 | Event Map | "key locations + walking distances" | Lists 5 places; **no street numbers** | ✓ | **Prompt adds "Rue de l'Aciérie 86" & "Rue du Laboratoire 9"** | **YES — prompt leaks Ch2+Ch3 passwords** | 🟥 | **MUST: strip street numbers from the prompt.** |
| ch1-fireworks-program | 1 | Festivities & Fireworks Programme | "official schedule" | Concerts; fireworks 00:00–00:20; 23 June 10:00 address (did not happen) | ✓ | Same | Fireworks filed under "22 June" (I-13) | 🟩 | Relabel fireworks to 23 June 00:00. |
| ch1-emergency-call-transcript | 1 | Emergency Call Transcript | "disturbed early-morning call" | "a torch, a heavy one — no, it's gone"; caller unidentified | ✓ | Same; mark [inaudible] | Aligned | 🟩 | Keep (weapon seed). MULTI_FILE folder OK. |
| ch2-suspect-statements | 2 | Collected Statements | "**Several mention the same base address**" | 5 alibis; Aciérie 86 ×2 | ✓ | Same | Description telegraphs the Ch2 password | 🟥 (password leak) | **MUST: remove "same base address" hint; de-emphasize the address.** |
| ch2-walking-distances | 2 | Walking Distances Map | "test which alibis are possible" | Distance table + Glacis-vs-side-room note | ✓ | Adds "person at Glacis couldn't be at side room" | Aligned (good) | 🟩 | Keep; this should be the Ch2 reasoning anchor. |
| ch2-group-chat-screenshot | 2 | Armundia Group Chat | "team chat 22 June" (redHerring) | Patch-notes worry; Marco invites to Gëlle Fra; **Nora "00:51 back at the house"** | ✓ | Reads as software-bug worry | The 00:51 line contradicts Ch3 00:49 badge (I-09) — unused | 🟧 | Keep, but make the 00:51 line an intended clue. |
| ch2-nora-call-log | 2 | Nora — Call Log (Night) | "looks operational — for now" | 00:23 LuxEvent 41s among routine calls; **01:04 Taxi** | ✓ | 41s call notable not conclusive | 01:04 taxi vs "00:51 home" / 00:49 badge unexplained | 🟧 | Reconcile taxi vs home timing. |
| ch2-first-badge-access-note | 2 | Temporary Badge Access | "who issued the badges" | Operations issues; #0017→Rinaldi; lost 21 June; NOT deactivated | ✓ | Same | No statement it was recovered into custody (I-11) | 🟧 | Add a "handed in / spare in Operations drawer" line. |
| ch2-gelle-fra-group-photo | 2 | Group Photo Under the Gëlle Fra | "crowd photo, members visible" | 00:07; Marco/Sofia/Arben visible; Nora/Davide absent | ✓ | Timestamp 00:07; anonymous | Aligned | 🟩 | Keep (honest alibis). |
| ch3-badge-access-log | 3 | Badge Access Log | "door events incl. side room" | #0044 Nora 00:11/00:19/00:49; #0017 00:28/00:42 | ✓ | "#0044 brackets the side room" | Header prints "Rue du Laboratoire 9" = Ch3 password | 🟥 (password leak) | **MUST: keep facts, but the password must not be this header.** |
| ch3-badge-holder-fragment | 3 | Badge Holder Fragment | "fragment on victim's cuff" | ABS code → LuxEvent batch via Operations | ✓ | Batch/Operations link, no name | `relatedSuspects:[nora-weiss]` only (I-06) | 🟥 | **MUST: remove Nora-only related suspect.** |
| ch3-golden-dust-report | 3 | Golden Dust — Analysis | "not fireworks fallout" | LuxEvent decorative coating, not pyrotechnic | ✓ | Links to supply chain | `relatedSuspects:[nora-weiss]` only (I-06) | 🟥 | **MUST: remove Nora-only related suspect.** |
| ch3-patch-log-0017 | 3 | Deployment Log — Patch 00:17 | "read the trigger field" (redHerring) | SCHEDULED cron, set 21 June by m.serra; no human session | ✓ | Routine automation | Aligned | 🟩 | Keep (clears Matteo). |
| ch3-erion-audio-transcript | 3 | Recovered Audio (Erion) | "near Glacis at key moment" | **"Audio file may be added later…"** + transcript: Davide at Glacis 00:31 | ✓ | Crowd Albanian phrase ≠ Arben; Davide at Glacis 00:31 | Content has production meta-text (I-15) | 🟧 | **MUST: remove meta line.** |
| ch3-davide-photo-metadata | 3 | Photo Metadata — Davide | "disputed metadata" | Unsynced clock; cross-check confirms Glacis | ✓ | Same | Aligned | 🟩 | Keep. |
| ch4-luxevent-contract | 4 | LuxEvent — Contract Extract | "who signed off renewals" | Sign-off Operations (N. Weiss); 3 renewals no review; compliance flag | ✓ | Procurement irregularities | No personal-enrichment evidence (I-10) | 🟧 | Add kickback/benefit hook (LATER). |
| ch4-grand-duke-supplier-review-email | 4 | Supplier Review Requested | "Duke about to order a review" | Review after weekend; "personal closeness of certain coordinators"; **content prints "MOTIVE:" label** | ✓ | "certain coordinators", not Nora | Content includes an out-of-world "MOTIVE:" annotation | 🟧 | Move "MOTIVE:" gloss out of the in-world doc body. |
| ch4-nora-luxevent-call-log | 4 | The 41-Second Call | "00:23 call inside death window" | 00:23:11 41s, lower-town sector; **content cross-refs + "ties Nora to the scene"** | ✓ | Strong tie, not "guilty" | Content editorializes ("ties Nora to the scene and to the supplier") | 🟧 | Trim the editorial conclusion to a neutral cross-reference. |
| ch4-arben-second-statement | 4 | Arben — Second Statement | "places Nora near a van" | Nora by LuxEvent van (21 June); figure in event jacket 00:20; Giulia confirms Davide | ✓ | Observational, no accusation | Aligned | 🟧 | Keep. |
| ch4-final-reconstructed-timeline | 4 | Reconstructed Timeline | "investigators' best reconstruction" | **Narrates murder, "operational check message", "Name that person"** | ✓ | "keep it factual" | **Prompt says factual; content asserts the solution (I-08)** | 🟥 | **MUST: demote to facts-only or move to solution screen.** |
| ch4-temporary-badge-memo | 4 | Temporary Badge Handling | "who could fail to deactivate" | Operations custody; #0017 usable till 00:42; only Operations held spares | ✓ | Custody logic | Possession-of-lost-badge gap (I-11) | 🟧 | Add the recovered-badge line. |
| ch4-missing-flashlight-report | 4 | Missing Technical Flashlight | "heavy event flashlight vanished" | Injury consistent w/ heavy torch; one signed out, never returned; removed via container | ✓ | Weapon provenance | "plausibly" speculative but acceptable | 🟩 | Keep. |
| ch4-real-patch-notes | 4 | The Real Patch Notes | "what was actually fixed" | Removed "royal-preview" mode; rounding bug; exoneration | ✓ | Title = final password | **Title IS the password (I-04)**; content meta-explains the phrase | 🟥 | **MUST: move password to content (`ROYALPREVIEW`); trim meta-gloss.** |

---

## 7. Canonical Evidence Content — 1:1 Replacement Drafts

> These are copy-pasteable in-world drafts. They keep the multilingual structure (write EN here,
> mirror into `it`/`sq`), never use the words "fictional/invented/game/disclaimer", and never add a
> backend. Only items needing change are drafted in full; items marked *Keep as-is* need no rewrite.

### [ch0-police-engagement-email] — Police Liaison
- **Current problem:** Pre-announces the twist ("loudest clue isn't true").
- **Role in investigation:** Hook + deliverables.
- **Content to insert:** Keep the email, change the analyst warning line to:
  *"No single document is decisive on its own — the badge logs, calls, maps, chat screenshots and
  forensic notes only resolve when read together."* (Drop "the loudest clue is not always the true one.")
- **Required visible facts:** death of the Grand Duke, badge in the access trail, 6 deliverables.
- **Must not reveal:** culprit, that the badge was used by a non-holder.
- **Suggested fallback update:** as above. **Suggested prompt update:** align deliverables count.
- **Priority:** MUST (one line).

### [ch1-event-map] — Event Map
- **Current problem:** Prompt prints street numbers = future passwords (I-07).
- **Role:** Geography + walking baseline.
- **Visible labels:** "Gëlle Fra / Place de la Constitution", "Pont Adolphe", "Place de Glacis",
  "Armundia House", "LHoFT". **No street numbers.** Connector lines with 5-min-rounded times.
- **Timestamps/captions:** none. **Readable on mobile:** large labels, ≤6 nodes.
- **Must not be shown:** "Rue de l'Aciérie 86", "Rue du Laboratoire 9", any address.
- **Suggested fallback update:** already address-free — keep. **Prompt update:** delete the two street
  numbers from the label list. **Priority:** MUST.

### [ch1-fireworks-program] — Programme
- **Current problem:** Fireworks filed under 22 June (I-13).
- **Body rows:** 21 June 20:00–04:00 distributed concerts; 22 June 21:00–02:00 Glacis concert;
  **23 June 00:00–00:20 fireworks** (viewed from Place de la Constitution & Pont Adolphe);
  23 June 10:00 National Day address (did not take place).
- **Emphasize:** the 00:00–00:20 fireworks window (it bounds the death window).
- **Priority:** LATER (consistency).

### [ch2-suspect-statements] — Collected Statements
- **Current problem:** Description and content telegraph the base address (Ch2 password, I-02).
- **Role:** Raw alibi material for the alibi-contradiction gate.
- **Body (keep the 5 statements)** but:
  - Change the **description** to: *"Five short alibis. Cross-check them against the distances and the
    call log — at least one cannot be true."* (Remove "Several mention the same base address.")
  - Keep "Rue de l'Aciérie 86" inside Marco's/Nora's lines only as flavour; it is no longer a gate.
  - Sharpen Nora's line to enable the contradiction: *"…then back to the house. Nothing unusual."*
    (Leave the false "home" timing to be broken by the badge log.)
- **Must not reveal:** that Nora is lying (let distances/badges expose it).
- **Priority:** MUST.

### [ch2-group-chat-screenshot] — Group Chat
- **Current problem:** The 00:51 "back at the house" line is a real clue but unused (I-09).
- **Keep** the chat. Ensure the **00:51 Nora "back at the house"** line stays verbatim — it is the
  anchor that the Chapter 3 badge log (00:49 at LHoFT) will contradict.
- **Must not reveal:** that "patch notes" means anything but a software bug.
- **Priority:** MUST (pairs with I-09 payoff).

### [ch2-nora-call-log] — Nora Call Log
- **Current problem:** 01:04 taxi vs "00:51 home" vs 00:49 LHoFT badge is unexplained.
- **Fix:** Either (a) remove the 01:04 taxi line, or (b) change "00:51 back at the house" reasoning so
  the taxi is the *return* leg, making the timeline coherent: 00:49 LHoFT → 01:04 taxi → home. If you
  keep the taxi, the "back at the house at 00:51" chat becomes the provable lie (good).
- **Priority:** MUST (logic).

### [ch2-first-badge-access-note] / [ch4-temporary-badge-memo] — Badge custody
- **Current problem:** Frame needs Nora to hold the *lost* #0017, but nothing says it was recovered (I-11).
- **Add one line (memo):** *"A badge handed in to the Operations desk is held there until deactivation.
  #0017 was logged as handed in on 21 June but never deactivated — it sat usable in the Operations
  drawer."* This closes the "if it's lost, how did she get it" objection without naming Nora as user.
- **Must not reveal:** that Nora used it. **Priority:** MUST.

### [ch3-badge-access-log] — Badge Access Log
- **Current problem:** Header line is the Ch3 password; password must move off it.
- **Header:** keep "ACCESS LOG — institutional building / service corridor" but the **gate answer is now
  `0044`** (the bracketing badge), not the address. Keep all five log rows unchanged.
- **Observations block:** keep "#0017 is Davide's lost badge" and "#0044 brackets the side-room events."
- **Priority:** MUST (with Section 5 password change).

### [ch3-badge-holder-fragment] & [ch3-golden-dust-report] — Forensics
- **Current problem:** `relatedSuspects:[nora-weiss]` only → straight pointer (I-06).
- **Fix:** Set `relatedSuspects` to `[]` (the supply-batch/Operations link is in the text and is enough),
  or list `["nora-weiss","luca-moretti","sofia-martelli"]` to keep it non-fingering.
- **Body:** unchanged. **Priority:** MUST.

### [ch3-erion-audio-transcript] — Recovered Audio
- **Current problem:** Content fallback contains production meta-text (I-15).
- **content.en →** a neutral in-world caption: *"Recovered clip. Transcript below."* (or empty; the
  `transcript` field already carries the substance).
- **Transcript:** keep (Davide audible at Glacis 00:31; Albanian phrase = crowd, not Arben).
- **Inference supported:** Davide cannot be at the side room (25–30 min away). **Priority:** MUST.

### [ch4-grand-duke-supplier-review-email] — Motive email
- **Current problem:** In-world doc contains an out-of-world "MOTIVE:" annotation; motive is thin (I-10).
- **Body:** keep the quote; **delete the "MOTIVE: …" paragraph** from the document body (it's authorial).
- **LATER strengthen motive:** add a sibling item or a clause implying personal exposure, e.g.
  *"the audit will also examine payments routed to coordinators outside the standard schedule"* — turning
  a procurement review into a personal-criminal threat worth killing over.
- **Must not reveal:** Nora by name (use "certain coordinators"). **Priority:** MUST (delete gloss) / LATER (strengthen).

### [ch4-nora-luxevent-call-log] — The 41-second call
- **Current problem:** Editorializes ("ties Nora to the scene and to the supplier").
- **Body:** keep CDR + the 00:28 cross-reference; **replace the closing sentence** with a neutral
  cross-reference: *"Cell sector: lower town, consistent with the LHoFT / side-room area — not the Glacis.
  Cross-reference: 00:28 side-room access (#0017)."* Let the player draw the tie. **Priority:** MUST.

### [ch4-final-reconstructed-timeline] — Reconstructed Timeline
- **Current problem:** Narrates the solution incl. an unsourced "operational check message" and "Name
  that person" (I-08).
- **Option A (preferred):** Move this whole narrative to the **solution screen** and replace the Ch4
  evidence with a *facts-only* timeline (times + badge/call/location events, no interpretation, no
  "Name that person", no invented "operational message").
- **Option B:** Keep as evidence but strip every interpretive clause; list only logged facts.
- **Must not reveal:** the conclusion. **Priority:** MUST.

### [ch4-real-patch-notes] — The Real Patch Notes
- **Current problem:** Title is the final password; content meta-explains the phrase (I-04).
- **Title:** keep "The Real Patch Notes" (it's fine as a title once it's *not* the password).
- **Gate answer → `ROYALPREVIEW`** (the removed hidden mode named in the body). Body keeps:
  *"Removed an undocumented 'royal-preview' mode that could display unauthorised sample data; fixed an
  access-log rounding bug that mislabelled event times."*
- **Trim** the meta paragraph ("This is the whole meaning of Davide's message…") to a single in-world
  line or move it to the solution.
- **Chapter-4 question →** "The patch notes name what was actually fixed. Name the hidden mode that was
  removed — that name is your final key." **Priority:** MUST.

### Items to **Keep as-is** (no rewrite needed)
`ch1-newspaper-article` (complete IT/SQ — LATER), `ch1-body-discovery-report`, `ch1-emergency-call-transcript`,
`ch2-walking-distances`, `ch2-gelle-fra-group-photo`, `ch3-patch-log-0017`, `ch3-davide-photo-metadata`,
`ch4-luxevent-contract` (LATER motive hook), `ch4-arben-second-statement`, `ch4-missing-flashlight-report`.

---

## 8. Shortcut Text Alignment Matrix

| Source type | Source location / field | Current text | Issue | Risk | Exact replacement text |
|---|---|---|---|---|---|
| Case title | `title` | "The Gëlle Fra Case" | Equals Ch1 password | 🟥 | Keep title; **change the Ch1 password** instead (Section 5). |
| Chapter question | chapter-1 `question` | "...name that place." | Answer = case title | 🟥 | "The fireworks were *launched* from one point and *watched* from another. Name the launch point." (→ Pont Adolphe) |
| Evidence description | `ch2-suspect-statements` | "Several mention the same base address." | Telegraphs Ch2 password | 🟥 | "Five short alibis. Cross-check them against the distances and the call log — at least one cannot be true." |
| Chapter question | chapter-2 `question` | "...find the group's base — the exact street and number." | Transcription gate | 🟥 | "One person's stated location is impossible given the walking times and the call log. From where could no one reach the side room in time? Name that place." (→ Glacis) |
| Chapter intro | chapter-3 `intro` | "...a badge proves the use of an object, not the identity of the person holding it." | States the twist | 🟥 | "The forensic and technical traces look damning for one developer. Read them carefully and decide how much they really prove." |
| Chapter objective | chapter-3 `objective` | "Show that Davide's badge could have been used by someone else..." | States the answer | 🟥 | "Weigh each technical clue: which are solid, and which only look strong?" |
| Chapter question | chapter-3 `question` | "...Hint: consider the location where official records might be misleading." | Points to LHoFT/Laboratoire | 🟧 | "Two badges move that night. One is loud. Which badge number actually brackets the side room? Give the number." (→ 0044) |
| Chapter question | chapter-4 `question` | "...its title is your final key." | Password = a title | 🟥 | "The patch notes name what was actually fixed. Name the hidden mode that was removed." (→ royal-preview) |
| Evidence content | `ch4-final-reconstructed-timeline` | "...Name that person." + murder narration | Asserts solution | 🟥 | Facts-only timeline (Section 7); remove the closing line. |
| Evidence content | `ch4-nora-luxevent-call-log` | "...ties Nora to the scene and to the supplier." | Editorial conclusion | 🟧 | "Cross-reference: 00:28 side-room access (#0017)." |
| Evidence content | `ch4-grand-duke-supplier-review-email` | "MOTIVE: this review threatened to expose..." | Out-of-world gloss | 🟧 | Delete the MOTIVE paragraph; keep only the quoted email. |
| Evidence content | `ch3-erion-audio-transcript.content` | "Audio file may be added later..." | Production meta | 🟧 | "Recovered clip. Transcript below." |
| Suspect status | `davide-rinaldi.status` | `strong_suspect` (red badge) | Telegraphs red herring | 🟥 | Set to `suspect` like the others (remove the only red badge). |
| Suspect contra | `nora-weiss.contraEvidence` | "Managed and could retrieve temporary badges; knew the side-room access" / "Repeatedly called by an external supplier" | Whole solution, ungated | 🟥 | Gate by chapter, or reduce to neutral ("Coordinated logistics and suppliers") until Ch3/4. |
| Suspect pro | `davide-rinaldi.proEvidence` | "Recovered audio places him at the Glacis at 00:31 — he cannot be in two places." | Ch3 reveal at minute 1 | 🟥 | Gate by chapter, or remove until Ch3 is unlocked. |
| Suspect pro | `matteo-serra.proEvidence` | "The 00:17 patch was a scheduled automated deploy..." | Ch3 reveal at minute 1 | 🟥 | Gate by chapter, or remove until Ch3. |
| Chapter intro | chapter-0 email | "The loudest clue is not always the true one." | Pre-frames the twist | 🟧 | "No single document is decisive on its own." |

---

## 9. Culprit Proof Chain (can a player fairly reach Nora Weiss?)

| Claim | Supporting evidence IDs | Strength | Available before final accusation? | Inference fair? | Too direct? | Suggested adjustment |
|---|---|---|---|---|---|---|
| Nora had access to temporary badges | ch2-first-badge-access-note, ch4-temporary-badge-memo | Strong | Yes (Ch2/4) | Yes | Slightly (memo says "only Operations") | Keep; the "only Operations" line is fair. |
| Davide's badge was lost / not deactivated | ch2-first-badge-access-note, ch4-temporary-badge-memo | Strong | Yes | Yes | No | Keep. |
| Badge #0017 used in the side room | ch3-badge-access-log | Strong | Yes (Ch3) | Yes | No | Keep. |
| Nora's movement brackets #0017 | ch3-badge-access-log (#0044 at 00:11/00:19/00:49) | Medium | Yes (Ch3) | Yes, but #0044 never on the side-room door | Borderline | Add the 00:49-vs-00:51 contradiction (I-09) to firm it up. |
| Nora connected to LuxEvent Secure | ch2-nora-call-log, ch4-nora-luxevent-call-log, ch4-luxevent-contract, ch4-arben-second-statement | Strong | Yes | Yes | No | Keep. |
| LuxEvent had procurement irregularities | ch4-luxevent-contract | Strong | Yes (Ch4) | Yes | No | Keep. |
| Grand Duke about to trigger a supplier review | ch4-grand-duke-supplier-review-email | Strong | Yes (Ch4) | Yes | No | Strengthen to personal exposure (I-10). |
| Golden dust links to LuxEvent, not fireworks | ch3-golden-dust-report | Strong | Yes (Ch3) | Yes | No | Keep; remove Nora-only relatedSuspects. |
| Weapon likely a technical torch | ch1-emergency-call-transcript, ch4-missing-flashlight-report | Strong | Yes | Yes | No | Keep. |
| Davide's alibi rescued by audio/cross-checks | ch3-erion-audio-transcript, ch3-davide-photo-metadata, ch4-arben-second-statement | Strong | Yes (Ch3/4) | Yes | No | Keep. |
| Patch notes = technical red herring, not the mechanism | ch3-patch-log-0017, ch4-real-patch-notes | Strong | Yes | Yes | No | Keep. |

**Verdict:** the chain *closes* — every required claim has support available before the accusation, so the
solution is **fair** in the "can they get there" sense. The problem is the opposite: it is **too fair / too
direct** because the Suspects screen, the Ch3/4 prose and the reconstructed timeline pre-chew most of these
inferences. The one genuinely *weak* link (Nora physically in the side room: #0044 never appears on that door)
should be reinforced by surfacing the 00:49/00:51 contradiction rather than by more authorial assertion.

---

## 10. False Suspect Fairness Matrix

| Suspect | Why they look suspicious | What clears them | Balance | Evidence to add / soften |
|---|---|---|---|---|
| **Davide Rinaldi** | Badge #0017 opened the side room; dead phone; knows logs; "patch notes" message; only `strong_suspect`. | Audio at Glacis 00:31; badge was lost & not deactivated; patch was scheduled; patch-notes = embarrassment. | **Too strong as a red herring, too obvious as innocent.** The app flags him red and then argues he's innocent. | Set status to `suspect`; stop the intros from arguing his innocence; let players discover it. |
| **Nora Weiss** | Badge custody; LuxEvent calls; 41s call in death window; supplier favouritism; motive. | (She's the culprit.) | Correctly the answer, but **spoiled** by ungated contra lines + Ch3 relatedSuspects. | Gate her contra lines; remove Ch3 Nora-only pointers. |
| **Elira Kodra** | "If it gets out we're finished"; badge near LHoFT at an ambiguous time. | Line was about a software bug; badge has innocent op explanation. | Balanced-to-weak (no murder motive). | LATER: give her a sharper, briefly-credible motive to sustain doubt. |
| **Arben Leka** | Knew the route; Albanian voice seemed to match a recording. | Seen at fireworks; no side-room access; phrase was crowd. | Balanced (good mid-game suspicion). | Keep. |
| **Sofia Martelli** | Deleted a chat with "L."; knew the room. | "L." is a personal contact; no technical access. | Weak; the "L." thread dead-ends. | LATER: either pay off "L." or drop it (currently a loose end). |
| **Matteo Serra** | 00:17 patch; odd-hours laptop. | Scheduled deploy; not near scene. | Weak (cleared by one log). | Keep as a quick red herring. |
| **Luca Moretti** | Lied about a 00:12 movement; named in a confidential note. | Movement was to fetch his phone; no access. | Weak. | LATER: tie his "confidential note" mention to something to add doubt. |
| **Giulia Ferri** (witness) | Confused initial statement. | Later confirms Davide's alibi. | Fine as witness. | Keep. |
| **Erion Dervishi** (witness) | Footage missing 00:09–00:23; phone off. | His audio clears Davide. | Fine as witness. | Keep; the missing-footage detail is a nice texture. |

**Overall:** the suspect field is **front-loaded on Davide and thin everywhere else**. After Davide is cleared
(which the app does for the player), no one but Nora has a murder-grade motive, so the endgame is uncontested.
LATER: elevate one of Elira/Luca to a credible-but-refutable alternative to keep the final vote genuinely tense.

---

## 11. Timeline and Alibi Consistency Audit

Death window: **00:30–00:45** (body report). Fireworks **00:00–00:20**. Key movements:

| Time | Event | Source | Consistent? |
|---|---|---|---|
| 00:07 | Marco/Sofia/Arben at Gëlle Fra (photo) | ch2-gelle-fra-group-photo | ✓ honest alibis |
| 00:11 / 00:19 | #0044 (Nora) LHoFT main door / service corridor | ch3-badge-access-log | ✓ |
| 00:23 | Nora 41s call to LuxEvent, lower-town sector | ch2/ch4 call logs | ✓ |
| 00:28 | #0017 opens side room | ch3-badge-access-log | ✓ (Davide elsewhere) |
| 00:31 | Davide audible at Glacis (25–30 min away) | ch3-erion-audio | ✓ exonerates Davide |
| 00:31 | "Grand Duke enters via false operational message" | ch4 timeline only | ⚠ **unsourced** — no message exists in any evidence |
| 00:33–00:39 | "the killing" | ch4 timeline only | ⚠ asserted precision; within window, OK as estimate |
| 00:42 | #0017 exits side room | ch3-badge-access-log | ✓ |
| 00:45 | "return toward the house" | ch4 timeline | ⚠ contradicts 00:49 LHoFT badge below |
| 00:49 | #0044 (Nora) LHoFT service corridor again | ch3-badge-access-log | ⚠ if "returning home" at 00:45, why badge back at LHoFT at 00:49? |
| 00:51 | Nora "back at the house" (chat) | ch2-group-chat | ❌ **impossible** — house↔LHoFT is 20–25 min; she was at LHoFT at 00:49 |
| 01:04 | Nora "Taxi" call | ch2-nora-call-log | ⚠ contradicts "home at 00:51" |
| 07:50 | Body discovered | ch1-body-discovery-report | ✓ |

**Distance sanity checks (from `ch1-event-map` / `ch2-walking-distances`):**
- Glacis → side room/LHoFT = 25–30 min → Davide (Glacis 00:31) cannot be at the side room (00:28–00:42). **✓ solid.**
- House → LHoFT = 20–25 min → Nora cannot be "home at 00:51" after a 00:49 LHoFT badge. **❌ contradiction** (this is the strongest unforced clue and is currently wasted — I-09).
- Arben: Gëlle Fra 23:55 → Pont Adolphe 00:20 (3–5 min) → home 00:45 (~20–25 min): tight but plausible. **✓.**

**Conclusions:**
1. The fireworks date label (22 vs 23 June) should be fixed (I-13).
2. The "00:45 return" + "00:49 LHoFT" + "00:51 home" + "01:04 taxi" cluster is internally inconsistent.
   Pick one coherent return path (recommended: 00:49 LHoFT → 01:04 taxi → home) and convert the "00:51 home"
   chat into the *provable lie* that cracks Nora's alibi. **MUST.**
3. The "false operational message" at 00:31 is asserted but never evidenced. Either add a small artefact
   (a planted message/note) or drop the claim from player-facing text. **MUST** (move to solution if kept).

---

## 12. Duration / Difficulty Estimate

Assumptions: 10–15 colleagues, likely 2–4 teams sharing devices; reading + debate, not speed-running;
**current** (un-fixed) build with leaked passwords and spoiler Suspects screen.

| Phase | Fast group | Average group | Slow group | Likely bottleneck | "Too easy" moment | "What do I do?" moment |
|---|---|---|---|---|---|---|
| Chapter 0 (briefing) | 2 min | 4 min | 6 min | none | the whole thing | none |
| Chapter 1 | 5 min | 10 min | 18 min | reading 5 items | password = title (instant) | "is the answer really just 'Gëlle Fra'?" disbelief |
| Chapter 2 | 6 min | 12 min | 20 min | distance/alibi reading | address printed twice | the alibi math is never actually required |
| Chapter 3 | 6 min | 12 min | 22 min | audio/forensic reading | intro states the twist; address in header | none (app explains it) |
| Chapter 4 | 8 min | 15 min | 25 min | 8 items to skim | timeline narrates the answer; title = password | "which doc is the title?" (briefly) |
| Final accusation | 5 min | 10 min | 20 min | writing 5 answers | Suspects screen already named Nora | wording the motive/decisive evidence |
| **Total** | **~32 min** | **~63 min** | **~110 min** | — | — | — |

**Current rating: Slightly easy → Too easy.** Average ≈ 1 hour, well short of the 2–3 hour target, and the
hour is spent *reading the solution*, not deducing it.

**After the MUST fixes** (real cross-evidence passwords, gated suspect reasoning, de-asserted Ch3/4 text,
surfaced 00:49/00:51 contradiction), estimated average rises to **~110–150 min** with healthy debate, landing
in **Balanced → Slightly hard** — the intended range. Add the LATER motive/alt-suspect work to reliably fill
2–3 hours with a genuinely contested final vote.

---

## 13. Recommended Change Plan

### MUST before demo

1. **Replace Chapter 1 password.**
   - File: `public/cases/lux-gelle-fra/case.json` · object: `chapters[1].unlock` · field: `password`/`acceptedAnswers` + `chapters[1].question`.
   - New: `password: "PONT ADOLPHE"` (aliases `["PONTADOLPHE","ADOLPHE BRIDGE"]`); question → "The fireworks were launched from one point and watched from another. Name the launch point." Derive from `ch1-fireworks-program` + `ch1-event-map`.
   - Verify: with clean LocalStorage, "GELLEFRA" no longer unlocks; "Pont Adolphe" does; the answer is not printed verbatim before the gate.

2. **Replace Chapter 2 password.**
   - `chapters[2].unlock` + `chapters[2].question`; new answer `GLACIS` (aliases `["PLACE DE GLACIS"]`); question per Section 8.
   - Verify: requires reading statements + walking-distances; "Aciérie 86" no longer unlocks.

3. **Replace Chapter 3 password.**
   - `chapters[3].unlock` + `chapters[3].question`; new answer `0044` (aliases `["#0044","BADGE 0044"]`); question per Section 8.
   - Verify: requires badge log + first-badge note; "LAB9"/"Laboratoire 9" no longer unlocks.

4. **Replace final password.**
   - `chapters[4].unlock` and `final.unlockPassword`/`acceptedUnlockAnswers` + `chapters[4].question`; new answer `ROYALPREVIEW` (alias `["ROYAL PREVIEW"]`); question per Section 8.
   - Verify: requires reading the patch-notes body; "PATCHNOTES" no longer unlocks; host code `DETECTIVE2026` still jumps to solution.

5. **De-spoil the Suspects screen.**
   - Preferred (tiny code change, allowed if code isn't frozen): in `SuspectCard.tsx`/`SuspectList.tsx`, render `proEvidence`/`contraEvidence`/`status` only when the suspect's `visibleFromChapter` (or a new per-field gate) is unlocked.
   - JSON-only fallback (no code change): in `case.json`, set `davide-rinaldi.status` → `"suspect"`; move the spoiler pro/contra lines (Davide's "can't be in two places", Matteo's "scheduled deploy", Nora's badge/supplier contra) out of the suspect objects and into the relevant later-chapter evidence content.
   - Verify: at Chapter 1, no suspect card reveals a later-chapter conclusion; no red badge.

6. **Remove Chapter 3 Nora-only pointers.**
   - `ch3-badge-holder-fragment.relatedSuspects` and `ch3-golden-dust-report.relatedSuspects` → `[]` (or 3 names).
   - Verify: EvidenceDetail no longer shows "Related suspects: Nora Weiss" in Chapter 3.

7. **Fix the event-map prompt leak.**
   - `docs/asset-generation-prompts.md#ch1-event-map`: delete "Rue de l'Aciérie 86" and "Rue du Laboratoire 9" from the label list.
   - Verify: a generated map shows place names only, no street numbers.

8. **De-assert Chapter 3/4 text.**
   - `chapters[3].intro`/`objective`, `chapters[4].question`, `ch4-final-reconstructed-timeline.content`, `ch4-nora-luxevent-call-log.content`, `ch4-grand-duke-supplier-review-email.content` per Sections 7–8 (facts, not conclusions; drop "Name that person", the "MOTIVE:" gloss, and the editorial tie).
   - Verify: no player-facing item states the culprit or narrates the murder.

9. **Surface the alibi contradiction & fix the return cluster.**
   - Reconcile `ch2-nora-call-log` (01:04 taxi) with the 00:49 badge and the "00:51 home" chat; make "home at 00:51" the provable lie. Update `tl-22-return` accordingly.
   - Verify: the timeline is internally consistent and the 00:49-vs-00:51 gap is a deliberate, discoverable clue.

10. **Close the badge-possession gap.**
    - Add a line to `ch4-temporary-badge-memo` (or `ch2-first-badge-access-note`) that #0017 was handed in to Operations and never deactivated.
    - Verify: the "if lost, how did Nora get it?" objection is answered in-world.

11. **Remove production meta-text.**
    - `ch3-erion-audio-transcript.content.en` → neutral caption.
    - Verify: no "may be added later" text shows to players.

12. **Facilitator briefing (no code).**
    - Document that `case.json` contains the full solution; keep teams off DevTools; distribute the *new* passwords to facilitators.

### LATER

- Strengthen Nora's motive to personal/criminal exposure (I-10); elevate one alternative suspect (I-12).
- Fix the fireworks date label (I-13); pay off or drop Sofia's "L." and Luca's "confidential note" threads.
- Implement the documented hint feature (a "Show hint" toggle reading `unlock.hint`) and populate
  `unlock.hint` per chapter — or delete every hint reference from the docs (I-16).
- Correct `data-model-and-content-state.md` counts/banner claims (I-17); rename `assetFolder`s to neutral
  ordinals if real assets are added (I-19); complete IT/SQ translations for partially-localized fields.

---

## 14. Final AI Prompt for Implementation Later

> Paste this to an implementation agent **after** this audit is approved. It changes content only; it must
> not add a backend, must keep EN/IT/SQ structure, must not reintroduce nickname/login, and must not print
> "fictional/invented/game/disclaimer" in any player-facing text.

```
You are editing the static, mobile-first "Detective for a Day" case
public/cases/lux-gelle-fra/case.json (and docs/asset-generation-prompts.md). Apply ONLY the changes below.
Do not add a backend/Supabase. Keep the en/it/sq multilingual structure for every edited string (translate
new EN text into it and sq). Do not reintroduce any nickname/login. Do not add disclaimer/"fictional"/"game"
wording to player-facing evidence. After editing, run the app with clean LocalStorage and confirm each
acceptance check.

PASSWORDS (make each require >=2 evidence items; current answers are leaked):
1. chapters[1] (chapter-1): set unlock.password="PONT ADOLPHE", acceptedAnswers=["PONTADOLPHE","ADOLPHE BRIDGE"];
   rewrite chapters[1].question(en/it/sq) to: "The fireworks were launched from one point and watched from
   another. Name the launch point." (Answer derived from ch1-fireworks-program + ch1-event-map.)
2. chapters[2] (chapter-2): set unlock.password="GLACIS", acceptedAnswers=["PLACE DE GLACIS"];
   rewrite question to ask which stated location makes the 00:28 side-room badge use impossible (statements +
   walking-distances). Change ch2-suspect-statements.description to remove "same base address" and point to
   cross-checking distances and the call log.
3. chapters[3] (chapter-3): set unlock.password="0044", acceptedAnswers=["#0044","BADGE 0044"];
   rewrite question to "Two badges move that night. Which badge number actually brackets the side room?"
   Rewrite chapter-3 intro/objective to be neutral (do NOT state that a badge proves an object not a person,
   do NOT say Davide's badge could have been used by someone else).
4. chapters[4] + final: set password/acceptedUnlockAnswers to "ROYALPREVIEW"/["ROYAL PREVIEW"] in BOTH
   chapters[4].unlock and final; rewrite chapters[4].question to "The patch notes name what was actually
   fixed. Name the hidden mode that was removed." Keep ch4-real-patch-notes TITLE but ensure the body names
   the "royal-preview" mode; trim its meta paragraph.

SPOILER REMOVAL:
5. Set suspects[davide-rinaldi].status="suspect". Move these spoiler lines OUT of suspect pro/contra and into
   the matching later-chapter evidence content: Davide proEvidence "Recovered audio... two places" -> already
   in ch3-erion-audio (delete from suspect); Matteo proEvidence "00:17 patch was scheduled" -> already in
   ch3-patch-log (delete from suspect); Nora contraEvidence about badge custody/supplier -> keep only a
   neutral line ("Coordinated logistics and suppliers"). (If component edits are permitted, instead gate
   pro/contra/status rendering by chapter in SuspectCard.tsx using a per-suspect visibleFromChapter.)
6. Set ch3-badge-holder-fragment.relatedSuspects=[] and ch3-golden-dust-report.relatedSuspects=[].

DE-ASSERT THE SOLUTION:
7. ch4-final-reconstructed-timeline.content: remove all interpretation, the invented "operational check
   message", the "00:33-00:39 the killing" certainty, and "Name that person." Leave only logged facts
   (times + badge/call/location events). 
8. ch4-nora-luxevent-call-log.content: replace the closing editorial sentence with a neutral cross-reference
   to the 00:28 access. ch4-grand-duke-supplier-review-email.content: delete the "MOTIVE:" paragraph.
9. chapter-0 email + chapter intros: change "the loudest clue is not always the true one" to "no single
   document is decisive on its own."

LOGIC/CONSISTENCY:
10. Make Nora's "00:51 back at the house" chat the provable lie: reconcile ch2-nora-call-log (01:04 taxi),
    the 00:49 LHoFT badge and tl-22-return so the only coherent path is 00:49 LHoFT -> 01:04 taxi -> home,
    and "home at 00:51" is impossible (house<->LHoFT 20-25 min).
11. Add to ch4-temporary-badge-memo: badge #0017 was handed in to the Operations desk on 21 June and never
    deactivated (it sat usable in the Operations drawer).
12. ch3-erion-audio-transcript.content.en: replace "Audio file may be added later..." with "Recovered clip.
    Transcript below."
13. ch1-fireworks-program + tl-22-fireworks: label the midnight fireworks as 23 June 00:00-00:20.

ASSET PROMPT:
14. docs/asset-generation-prompts.md#ch1-event-map: remove "Rue de l'Aciérie 86" and "Rue du Laboratoire 9"
    from the map labels (place names only, no street numbers).

ACCEPTANCE CHECKS (clean LocalStorage):
- None of GELLEFRA / ACIERIE86 / LAB9 / PATCHNOTES unlock anything anymore; the new answers do.
- Each new password is NOT printed verbatim in any visible text before its gate; each needs >=2 items.
- At Chapter 1, no suspect card reveals a later-chapter conclusion and no red status badge appears.
- No Chapter 3 evidence shows "Related suspects: Nora Weiss".
- No player-facing item names the culprit or narrates the murder.
- Host code DETECTIVE2026 still opens the solution screen from the final gate.
- App builds (npm run build) and plays via text fallback with all asset folders still empty.
```

---

*End of original audit. Nothing in the application source was modified at the time this audit was written.*

---

## 15. Implementation Note (final live-demo pass)

The MUST fixes from this audit were implemented in a later pass. Summary of what
changed in the application (the audit text above is preserved as history):

- **Passwords (I-01..I-04, I-14):** replaced with deduction-based answers, each
  needing ≥2 evidence items — Ch1 `PONTADOLPHE` (programme + map), Ch2 `GLACIS`
  (statements + walking distances), Ch3 `0044` (badge log + badge note), Final
  `ROYALPREVIEW` (patch-notes body). Old passwords removed (not kept as aliases).
  Chapter questions rewritten in EN/IT/SQ.
- **Suspects screen (I-05):** implemented a generic `revealFromChapter` gate in
  `SuspectCard`/`SuspectList`; pro/contra now hidden until Chapter 3. Davide's
  `strong_suspect` status set to `suspect`. Nora's contra softened to neutral.
- **Ch3 Nora-only pointers (I-06):** `relatedSuspects` emptied on
  `ch3-badge-holder-fragment` and `ch3-golden-dust-report`.
- **Event-map prompt leak (I-07):** street numbers removed from the prompt (and
  the walking-distances / badge-log / reconstructed-timeline prompts).
- **Over-tell (I-08):** Ch3 intro/objective neutralised; `ch4-final-reconstructed-timeline`
  rewritten to logged facts only; `ch4-nora-luxevent-call-log` editorial removed;
  `MOTIVE:` gloss removed from `ch4-grand-duke-supplier-review-email`; the
  timeline `tl-22-murder` event neutralised to "estimated time of death".
- **00:49/00:51 contradiction (I-09):** surfaced — `tl-22-return` now reflects the
  "back at the house" chat claim (disputed); Ch4 objective asks players to compare
  claimed locations against badge access times; the reconstructed timeline lists
  the 00:49 badge and the 00:51 chat side by side.
- **Badge-possession gap (I-11):** `ch2-first-badge-access-note` and
  `ch4-temporary-badge-memo` now state #0017 was handed in to the Operations desk
  and kept (un-deactivated) in the spare-badge drawer.
- **Meta text (I-15):** `ch3-erion-audio-transcript` "Audio file may be added later"
  replaced with a neutral in-world caption.
- **Date label (I-13):** midnight fireworks relabelled 23 June 00:00–00:20.
- **Missing-file UI:** the missing-file notice was removed entirely (no
  player-facing message); the placeholder banner was already gone.
- **Motive (I-10):** strengthened in-world to personal exposure (payments to
  coordinators outside the standard schedule) in the supplier-review email and
  the solution.

Items left as **LATER** (not blocking the demo): elevating an alternative suspect
(I-12), paying off Sofia's "L." / Luca's note threads, the documented-but-absent
hint feature (I-16 — references removed from the checklist instead), and the
architecture leak (I-18, out of scope — facilitator briefing).
See `docs/final-live-demo-readiness-report.md` for the full change list and test results.

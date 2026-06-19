# Asset Generation Prompts — The Gëlle Fra Case

This file contains ready-to-copy prompts for generating the visual/PDF assets
that accompany the evidence. **The app already works without any of these
files**: every piece of evidence has full text content as a fallback. These
assets only make the experience richer.

Each evidence item in `case.json` has a `generationPromptRef` that links to the
matching section heading below.

## Global visual style (apply to every prompt)

Recommend to the generator, for all assets:

- realistic **investigative dossier** style; neutral, official layout;
- **Do not add any disclaimer line or meta text inside the document.** Use
  neutral invented branding (e.g. "Luxembourg Police Liaison Office",
  "LuxEvent Secure") so the documents read as real in-world props;
- **NO** real police logos, **NO** real government seals, **NO** real
  national emblems, **NO** real people or real company logos — only invented
  branding;
- no gore, no graphic injury imagery;
- no offensive national/ethnic stereotypes; all characters are invented;
- **readable on a phone**: large body text, high contrast, generous spacing;
- export as **PDF** for documents, **PNG** for screenshots/maps, **JPG** for
  photos;
- keep any text large enough to read on a 380px-wide screen.

> The prompts below describe in-world props. Whatever a prompt says, **do not
> print the words "fictional", "invented", "game", or any disclaimer line inside
> the generated asset.** Keep the branding invented (made-up names/logos) and
> avoid real logos, seals or real people.

## How the columns work

For each asset: **Evidence ID**, **Target filename**, **Target folder**,
**Asset type**, **Purpose**, **MUST / NICE TO HAVE**, the **Prompt**, **Must
not reveal**, and **Visual style**.

---

### ch0-police-engagement-email

- **Target filename:** `police-engagement-email.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-0/`
- **Asset type:** PDF (or PNG) of an email
- **Purpose:** the opening hook; invites the team to investigate
- **Priority:** MUST

**Prompt:**
> Create a realistic, invented official-looking email document for a
> investigative team event. Sender: "Luxembourg Police Liaison Office". Do
> not use real police logos, government seals or institutional branding. Clean
> official email layout: subtle grey header, From/To/Subject fields, a
> timestamp, and body text. Subject: "Urgent Investigative Support Request — The
> Gëlle Fra Case". The email asks an external investigative review team to
> examine a restricted evidence package concerning the death of Grand
> Duke Émeric IV of Luxembourg-Vallée after the National Day fireworks. Mention
> that a temporary Armundia badge appears in the access trail and that players
> must identify culprit, motive, method and decisive evidence. Immersive,
> professional, suitable for a corporate team-building game.

- **Must not reveal:** the culprit, the motive, or that the badge was used by someone other than its holder.
- **Visual style:** corporate/official email, grey header band, monospace timestamp.

---

### ch1-newspaper-article

- **Target filename:** `newspaper-article.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-1/`
- **Asset type:** PDF (newspaper front page) or PNG
- **Purpose:** atmosphere; establishes the public mystery
- **Priority:** NICE TO HAVE

**Prompt:**
> Design an invented newspaper front page titled "LE COURRIER DU GRAND-DUCHÉ"
> (invented paper). Headline: "Mystery During the National Day". Dateline 23
> June, morning edition. A short lead about an "unexpected death" near the
> official celebration route, tens of thousands gathered at Place de la
> Constitution under the golden Gëlle Fra statue for midnight fireworks, and
> officials reviewing access records. Do not add any disclaimer line; use neutral invented branding. Vintage-but-clean newspaper layout.

- **Must not reveal:** the victim's name, the culprit, or any suspect names.
- **Visual style:** classic newspaper, serif masthead, one column of body text, no photos of real people.

---

### ch1-body-discovery-report

- **Target filename:** `body-discovery-report.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-1/`
- **Asset type:** PDF (police report)
- **Purpose:** establishes location, time window, badge fragment and golden dust
- **Priority:** MUST

**Prompt:**
> Create an invented on-scene police report (reference GF-2306-001). Fields:
> location (secondary side room near the official route, lower old town),
> deceased (adult male, internally identified as Grand Duke Émeric IV of
> Luxembourg-Vallée — invented), discovery (23 June 07:50 by cleaning staff),
> apparent cause (single blunt-force head impact, no weapon found), estimated
> time of death 00:30–00:45, plus two trace notes: a black plastic fragment
> consistent with a badge holder, and fine golden dust to be analysed. Add a
> verification note that a temporary Armundia badge (holder of record: D.
> Rinaldi) appears in the room's door log. Neutral official form layout.

- **Must not reveal:** that the badge was used by Nora; do not conclude who the killer is.
- **Visual style:** form-like report with field labels, reference number, no graphic imagery.

---

### ch1-event-map

- **Target filename:** `event-map.png`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-1/`
- **Asset type:** PNG map/diagram
- **Purpose:** shows the five key locations and walking distances
- **Priority:** MUST

**Prompt:**
> Create a clean, stylised, invented city-centre map (not a real map) marking
> five labelled points: "Gëlle Fra / Place de la Constitution", "Pont Adolphe",
> "Place de Glacis", "Armundia House — Rue de l'Aciérie 86", "LHoFT — Rue du
> Laboratoire 9". Draw simple connector lines with walking-time labels (e.g.
> "15–20 min"). Large legible labels, dark dossier background, gold accents.

- **Must not reveal:** nothing sensitive; purely geographic.
- **Visual style:** schematic map, large labels, high contrast, mobile-friendly.

---

### ch1-fireworks-program

- **Target filename:** `fireworks-program.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-1/`
- **Asset type:** PDF schedule
- **Purpose:** anchors the timeline (concerts, midnight fireworks, ceremony)
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented "National Day Programme" schedule sheet for 21–23 June:
> distributed concerts 21 June 20:00–04:00; mega concert at Place de Glacis 22
> June 21:00–02:00; fireworks 00:00–00:20 viewed from Place de la Constitution
> and Pont Adolphe; National Day ceremony 23 June 10:00 with a scheduled public
> address by the Grand Duke. Festive but official one-page layout.

- **Must not reveal:** anything about the crime.
- **Visual style:** event programme, timetable rows, festive header, invented crest only.

---

### ch1-emergency-call-transcript

- **Target filename:** `emergency-call-transcript.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-1/`
- **Asset type:** PDF transcript
- **Purpose:** introduces the "heavy torch" detail and the chaos of discovery
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented emergency-line transcript received 23 June 07:58. Operator
> and an unidentified caller reporting a man not moving in a side room behind the
> official route; the caller mentions "a torch, a heavy one — no, it's gone" then
> the call drops. Mark inaudible sections with [inaudible]. Plain transcript
> layout with timestamps.

- **Must not reveal:** the caller's identity or the killer.
- **Visual style:** monospace transcript, header with reference and time.

---

### ch2-suspect-statements

- **Target filename:** `suspect-statements.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-2/`
- **Asset type:** PDF
- **Purpose:** five declared alibis; repeats the "Rue de l'Aciérie 86" base
- **Priority:** MUST

**Prompt:**
> Create an invented "collected statements" document summarising five short
> alibis from retreat members: Marco Bellandi (fireworks at Gëlle Fra, then back
> to Rue de l'Aciérie 86), Davide Rinaldi (at/near Glacis, phone dead 23:50–00:40,
> reported his temporary badge lost), Elira Kodra (passed Glacis, back early,
> briefly near the office), Nora Weiss (organisational calls then back to Rue de
> l'Aciérie 86), Arben Leka (Gëlle Fra 23:55, Pont Adolphe 00:20, home 00:45).
> Note that the group base is Rue de l'Aciérie 86. Tidy interview-summary layout.

- **Must not reveal:** that Nora is lying; present all alibis evenly.
- **Visual style:** statement sheet, one boxed paragraph per person.

---

### ch2-walking-distances

- **Target filename:** `walking-distances-map.png`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-2/`
- **Asset type:** PNG chart/map
- **Purpose:** lets players test whether alibis are physically possible
- **Priority:** MUST

**Prompt:**
> Create a clear walking-distances chart between Gëlle Fra, Pont
> Adolphe, Place de Glacis, Armundia House (Rue de l'Aciérie 86) and LHoFT (Rue
> du Laboratoire 9), with times rounded to 5 minutes (e.g. "LHoFT → Glacis:
> 25–30 min"). Add a highlighted note: a person genuinely at the Glacis could
> not be at the side room near the LHoFT within minutes. Large readable table.

- **Must not reveal:** the culprit by name.
- **Visual style:** matrix/table or labelled diagram, high contrast.

---

### ch2-group-chat-screenshot

- **Target filename:** `group-chat-screenshot.png`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-2/`
- **Asset type:** PNG (phone chat screenshot)
- **Purpose:** the "patch notes" red herring against Davide/Elira
- **Priority:** MUST

**Prompt:**
> Create an invented group-chat screenshot (generic messaging-app look, invented
> app name) from 22 June. Messages: Elira asks if the compliance doc was final;
> Davide replies "they must NOT see the patch notes before we fix it"; Elira "if
> it gets out we're finished"; Sofia "relax it's just a bug"; Marco invites people
> to the Gëlle Fra fireworks spot; Nora "back at the house, long day" at 00:51.
> Phone-style chat bubbles with timestamps and first names only.

- **Must not reveal:** that "patch notes" refers to the murder — it must read as a software bug worry. Do not show Nora doing anything incriminating.
- **Visual style:** mobile chat UI, alternating bubbles, no real app logo.

---

### ch2-nora-call-log

- **Target filename:** `nora-call-log.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-2/`
- **Asset type:** PDF call log
- **Purpose:** plants the 00:23 41-second LuxEvent call among routine calls
- **Priority:** MUST

**Prompt:**
> Create an invented phone call-log extract for "N. Weiss", 22–23 June, listing
> several routine calls (Events Logistics, Taxi) and two calls to "LuxEvent S.",
> including one at 00:23 lasting 41 seconds. Add a neutral note that most calls
> look operational. Table with time, direction, contact, duration.

- **Must not reveal:** explicit guilt; the 41-second call should look notable but not conclusive yet.
- **Visual style:** call-log table, monospace times.

---

### ch2-first-badge-access-note

- **Target filename:** `first-badge-access-note.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-2/`
- **Asset type:** PDF internal note
- **Purpose:** establishes Operations manages/issues badges; #0017 lost, not deactivated
- **Priority:** NICE TO HAVE

**Prompt:**
> Create a short invented internal note stating that temporary access badges
> for the retreat were issued and managed by Operations (N. Weiss) with supplier
> LuxEvent Secure; badge #0017 was issued to D. Rinaldi, reported lost on 21
> June, and NOT deactivated immediately. Plain internal-memo layout.

- **Must not reveal:** that Nora used the badge — only that Operations managed badges.
- **Visual style:** internal memo, header with "INTERNAL — confidential".

---

### ch2-gelle-fra-group-photo

- **Target filename:** `gelle-fra-group-photo.jpg`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-2/`
- **Asset type:** JPG photo (illustration)
- **Purpose:** supports several Gëlle Fra alibis (Marco, Sofia, Arben)
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented illustrated crowd scene under a golden statue during
> fireworks, timestamp 00:07 overlaid in a corner. Stylised, non-photographic,
> with anonymous figures (no recognisable real faces). Festive night atmosphere.

- **Must not reveal:** Nora or Davide present; keep them absent from the frame.
- **Visual style:** illustration/painting style, anonymous silhouettes, fireworks.

---

### ch3-badge-access-log

- **Target filename:** `badge-access-log.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-3/`
- **Asset type:** PDF technical log
- **Purpose:** shows #0044 (Nora) in the corridor around the #0017 side-room access
- **Priority:** MUST

**Prompt:**
> Create an invented door access log near "Rue du Laboratoire 9 (LHoFT)" and a
> side room for the night of 22–23 June. Entries: 00:11 LHoFT main door badge
> #0044 (N. Weiss) GRANTED; 00:19 service corridor #0044 GRANTED; 00:28 side
> room #0017 (D. Rinaldi) GRANTED; 00:42 side room #0017 GRANTED (exit); 00:49
> service corridor #0044 GRANTED. Add observations that #0017 was the lost badge
> and that #0044 brackets the side-room events. Monospace log table.

- **Must not reveal:** an explicit statement that Nora held #0017 — let players infer it.
- **Visual style:** system log, monospace, fixed columns.

---

### ch3-badge-holder-fragment

- **Target filename:** `badge-holder-fragment.jpg`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-3/`
- **Asset type:** JPG forensic close-up (illustration)
- **Purpose:** links the cuff fragment to a LuxEvent supply batch
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented forensic close-up of a small black ABS plastic fragment on
> a neutral scale card, with a caption noting a partial moulding code matching a
> LuxEvent Secure badge-holder batch distributed via Operations. Clinical,
> evidence-photo style, no gore.

- **Must not reveal:** a name; only the supply batch / Operations link.
- **Visual style:** evidence photo on grid card, ruler scale, label tag.

---

### ch3-golden-dust-report

- **Target filename:** `golden-dust-report.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-3/`
- **Asset type:** PDF forensic analysis
- **Purpose:** golden dust is LuxEvent decorative coating, NOT fireworks
- **Priority:** MUST

**Prompt:**
> Create an invented forensic analysis concluding that the golden dust near the
> body is a metallic-gold decorative coating used on LuxEvent Secure event
> ribbon/marking tape, NOT pyrotechnic residue. Note that this links the scene to
> the event supply chain rather than the fireworks crowd. Lab-report layout with
> sample ID and conclusion box.

- **Must not reveal:** the culprit's name directly.
- **Visual style:** lab report, sample table, conclusion highlighted.

---

### ch3-patch-log-0017

- **Target filename:** `patch-log-0017.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-3/`
- **Asset type:** PDF CI/CD log
- **Purpose:** the 00:17 patch is a SCHEDULED deploy (red herring)
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented CI/CD deployment log for 23 June around 00:17 showing a
> deploy with trigger=SCHEDULED (cron 00:17, configured 21 June 14:02 by
> m.serra), success at 00:17:44, artifact "royal-demo-1.4.1", automated
> notification. Add a note that no human session is attached overnight.
> Monospace pipeline log.

- **Must not reveal:** any link to the murder — it must read as routine automation.
- **Visual style:** build pipeline log, monospace, green "success" line.

---

### ch3-erion-audio-transcript

- **Target filename (audio):** `erion-audio.mp3` — **and/or** a transcript PDF `erion-audio-transcript.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-3/`
- **Asset type:** MP3 audio (optional) + PDF/text transcript
- **Purpose:** proves Davide was at the Glacis at 00:31 (can't be in two places)
- **Priority:** MUST (the transcript text already ships in `case.json`)

**Prompt (transcript PDF):**
> Create an invented recovered-audio transcript, file timestamp 00:31, location
> near Place de Glacis with loud concert background. Davide (in Italian) says his
> phone is dead and to film with the other phone; Erion responds; a separate
> crowd voice speaks a short Albanian phrase ("po vijmë, prit te ura"). Add an
> analyst note that Albanian phrases are common in the crowd and that Davide is
> audible at the Glacis at 00:31. Transcript layout with speaker labels.

**Prompt (optional MP3):** record ~20s of crowd/concert ambience with two short
spoken lines as above. Keep voices invented; no real names of real people.

- **Must not reveal:** that the Albanian phrase is Arben (it is NOT); keep it crowd noise.
- **Visual style:** transcript with [crowd]/[music] cues; audio = ambient clip.

---

### ch3-davide-photo-metadata

- **Target filename:** `davide-photo-metadata.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-3/`
- **Asset type:** PDF metadata review
- **Purpose:** the "ambiguous metadata" doubt does not survive cross-checking
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented photo-metadata review: a photo placing Davide at the Glacis
> had an ambiguous timestamp (unsynced device clock), but cross-checked against
> the recovered audio (00:31) and concert network time it is consistent with
> Davide being at the Glacis during the death window. EXIF-style table plus a
> conclusion paragraph.

- **Must not reveal:** the culprit.
- **Visual style:** EXIF metadata table, conclusion box.

---

### ch4-luxevent-contract

- **Target filename:** `luxevent-contract.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF contract extract
- **Purpose:** shows favours funnelled to LuxEvent via Operations
- **Priority:** MUST

**Prompt:**
> Create an invented supplier-contract extract for "LuxEvent Secure" (badge
> holders, access kits, event logistics) with internal sponsor/sign-off
> "Operations (N. Weiss)". Add notes: three renewals without competitive review,
> two scope extensions outside procurement, and a compliance flag recommending a
> review. Formal contract-extract layout.

- **Must not reveal:** the murder method; keep it about procurement irregularities.
- **Visual style:** contract document, clauses, signature block (invented).

---

### ch4-grand-duke-supplier-review-email

- **Target filename:** `grand-duke-email-review.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF confidential email
- **Purpose:** the MOTIVE — a supplier review due the day after the murder
- **Priority:** MUST

**Prompt:**
> Create an invented confidential email extract from the "Office of Grand Duke
> Émeric IV", 22 June 18:40, ordering a full review of the LuxEvent Secure
> arrangement immediately after the weekend, citing the renewal pattern and the
> "personal closeness of certain coordinators" to the supplier, to be raised on
> the 24th. Official confidential email layout.

- **Must not reveal:** Nora by name (say "certain coordinators"); do not state she is the killer.
- **Visual style:** confidential email, classification banner (invented).

---

### ch4-nora-luxevent-call-log

- **Target filename:** `nora-luxevent-call-log.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF call detail record
- **Purpose:** the decisive 41-second call at 00:23 in the lower-town sector
- **Priority:** MUST

**Prompt:**
> Create an invented call detail record: Party A N. Weiss, Party B LuxEvent
> Secure, start 23 June 00:23:11, duration 41 seconds, cell sector "lower town"
> consistent with the LHoFT/side-room area (NOT the Glacis). Add a cross-
> reference to the 00:28 side-room access by badge #0017. CDR table layout.

- **Must not reveal:** an explicit "she is guilty" statement — present it as a strong tie.
- **Visual style:** telecom CDR, fixed-width fields, cross-reference note.

---

### ch4-arben-second-statement

- **Target filename:** `arben-second-statement.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF witness statement
- **Purpose:** Arben places Nora by a LuxEvent van; Giulia confirms Davide's alibi
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented second witness statement from Arben Leka: on 21 June he saw
> Nora talking with a man by a LuxEvent technical van; on the fireworks night
> around 00:20 near Pont Adolphe he saw a figure in an event jacket moving fast
> toward the lower buildings; the Albanian phrase on a recording was not him.
> Add a short addition by Giulia Ferri confirming Davide was at the Glacis.
> Statement-sheet layout.

- **Must not reveal:** a direct accusation — keep it observational.
- **Visual style:** witness statement form.

---

### ch4-final-reconstructed-timeline

- **Target filename:** `final-timeline.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF timeline
- **Purpose:** ties the night together toward Nora
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented reconstructed timeline of the night with rows for 00:00–
> 00:20 fireworks (crowd at Gëlle Fra; Davide at Glacis per audio 00:31),
> 00:11/00:19 badge #0044 (Nora) in the LHoFT corridor, 00:23 Nora's 41s LuxEvent
> call, 00:28 side room opened with #0017, 00:31 Grand Duke enters, 00:33–00:39
> the killing, 00:42 #0017 exits, 00:45 return toward Rue de l'Aciérie 86.
> Vertical timeline layout.

- **Must not reveal:** keep it factual; the conclusion is for the solution screen.
- **Visual style:** vertical timeline with time chips.

---

### ch4-temporary-badge-memo

- **Target filename:** `temporary-badge-memo.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF memo
- **Purpose:** only Operations could hold/retrieve and fail to deactivate #0017
- **Priority:** NICE TO HAVE

**Prompt:**
> Create an invented memo on temporary-badge handling: badges collected at the
> Operations desk; on loss, Operations must deactivate immediately and store any
> recovered badge; badge #0017 (Davide) was reported lost on 21 June but not
> deactivated and remained usable until 00:42 on 23 June; only Operations (N.
> Weiss) had routine custody of recovered/spare badges. Memo layout.

- **Must not reveal:** a direct guilt statement; let the custody logic speak.
- **Visual style:** internal memo.

---

### ch4-missing-flashlight-report

- **Target filename:** `missing-flashlight-report.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF inventory/scene note
- **Purpose:** the weapon — a heavy technical flashlight removed via supplier container
- **Priority:** MUST

**Prompt:**
> Create an invented inventory/scene note: the injury is consistent with a heavy
> metal technical flashlight used by event staff; LuxEvent Secure event-kit
> inventory shows one heavy technical flashlight signed out for the National Day
> and never returned; the likely weapon was removed from the scene, plausibly in
> a LuxEvent equipment container via the supplier's logistics. No weapon at the
> scene. Inventory-note layout.

- **Must not reveal:** no graphic injury detail; no explicit naming of the killer.
- **Visual style:** inventory note, item table.

---

### ch4-real-patch-notes

- **Target filename:** `real-patch-notes.pdf`
- **Target folder:** `public/cases/lux-gelle-fra/assets/chapter-4/`
- **Asset type:** PDF release/patch notes
- **Purpose:** explains the "patch notes" phrase, clears Davide, holds the final password
- **Priority:** MUST

**Prompt:**
> Create invented software patch notes titled "PATCH NOTES — royal-demo 1.4.1":
> removed an undocumented "royal-preview" mode showing unauthorised sample data;
> fixed an access-log rounding bug mislabelling event times. Explain the secrecy
> was about not showing a buggy hidden preview to the Grand Duke — a software
> embarrassment, not a murder plan — so Davide's alarming message is actually his
> exoneration. Release-notes layout. (Title doubles as the final password: PATCH
> NOTES.)

- **Must not reveal:** anything beyond the software explanation; do NOT mention Nora here.
- **Visual style:** changelog/release-notes, version header, bullet fixes.

---

### Suspect avatar set (NICE TO HAVE)

- **Target filenames:** `<suspect-id>.png` (e.g. `nora-weiss.png`) — IDs:
  `marco-bellandi, elira-kodra, davide-rinaldi, arben-leka, sofia-martelli,
  matteo-serra, giulia-ferri, erion-dervishi, nora-weiss, luca-moretti`
- **Target folder:** `public/cases/lux-gelle-fra/assets/shared/suspect-avatars/`
- **Asset type:** PNG portraits (illustration)
- **Purpose:** avatars on suspect cards
- **Priority:** NICE TO HAVE

**Prompt:**
> Create a set of 10 invented, neutral illustrated avatar portraits for a
> corporate murder mystery: diverse, professional, friendly, non-photographic,
> not resembling any real person. Consistent flat-illustration style, simple
> background, square framing. No name tags, no stereotypes.

- **Must not reveal:** nothing — make the culprit's avatar no different from the others.
- **Visual style:** flat vector portraits, consistent palette.
- **To use them:** add `"avatar": "/cases/lux-gelle-fra/assets/shared/suspect-avatars/nora-weiss.png"` to that suspect in `case.json`.

---

### Fictional floor plan / institutional side-room plan (NICE TO HAVE)

- **Target filename:** `side-room-floor-plan.png`
- **Target folder:** `public/cases/lux-gelle-fra/assets/shared/maps/`
- **Asset type:** PNG floor plan
- **Purpose:** shows the side room, service corridor and the LHoFT relationship
- **Priority:** NICE TO HAVE

**Prompt:**
> Create a simple invented floor plan of an institutional building wing showing
> a "secondary side room" off the official route, a "service corridor" linking to
> the LHoFT (Rue du Laboratoire 9), and labelled access doors. Schematic,
> architectural-line style, large labels.

- **Must not reveal:** the killer; purely spatial.
- **Visual style:** architectural floor plan, line drawing, labelled doors.
- **To use it:** add a new evidence item with its own `assetFolder` (see
  `how-to-add-evidence-assets.md`).

---

## Where each asset goes (folder-drop, no JSON edit)

The **Target folder** lines above point at the chapter directory for context,
but each evidence item now has its **own folder** inside it, named so you know
exactly what belongs there, e.g.
`chapter-1/02-body-discovery-report__ONE_FILE__pdf/`. The folder is mapped to
the evidence by the `assetFolder` field already present in `case.json`.

## How to add a generated asset to the app

1. **Generate** the PDF/PNG/JPG/MP3 using a prompt above (the **Target
   filename** is only a suggestion — any readable file name works).
2. **Drop** it into the evidence's folder under
   `public/cases/lux-gelle-fra/assets/<chapter>/<NN-name__ONE_FILE__type>/`.
   `__MULTI_FILE__` folders (e.g. the emergency call and Erion audio) can hold
   several files, such as an audio clip plus its transcript PDF.
3. **Regenerate the manifest:** `npm run assets:manifest` (also runs
   automatically on `npm run dev` / `npm run build`).
4. **Test** from the evidence detail page (see `how-to-add-evidence-assets.md`).

You do **not** edit `case.json` or any code to add a file to an existing
evidence folder. The app never breaks if a file is missing: the evidence title,
description and full text fallback are always shown, with — only when a document
was expected — a small, neutral "The attached file is not available yet." note.

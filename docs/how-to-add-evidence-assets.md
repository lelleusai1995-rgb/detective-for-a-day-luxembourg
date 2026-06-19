# How to add an evidence asset (drop a file in a folder)

Each evidence item has its **own folder** under
`public/cases/lux-gelle-fra/assets/...`. You add a real PDF/PNG/JPG/MP3 by
dropping it into the right folder and regenerating the manifest. **You do not
edit `case.json` and you do not touch any React code.**

Every evidence item also ships with full **text content**, so the game works
even before any file exists. Adding a file simply upgrades that item from a text
fallback to a real document.

## The 4 steps

1. **Pick the right folder.** Folder names are self-describing:

   ```
   public/cases/lux-gelle-fra/assets/
     chapter-1/
       02-body-discovery-report__ONE_FILE__pdf/
       03-event-map__ONE_FILE__png-jpg/
       05-emergency-call__MULTI_FILE__audio-and-transcript/
   ```

   The name tells you: chapter, order, short evidence name, whether it expects
   `ONE_FILE` or `MULTI_FILE`, and the expected type(s).

2. **Drop your file(s) into that folder.** Any supported file is detected by
   its extension — the file name itself can be anything readable.

3. **Regenerate the manifest:**

   ```bash
   npm run assets:manifest
   ```

   `npm run dev` and `npm run build` run this automatically (`predev` /
   `prebuild`), so during local development a save + refresh is usually enough;
   run the command by hand if a newly added file doesn't appear.

4. **Test.** Open the evidence (e.g.
   `/game/lux-gelle-fra/evidence/ch1-body-discovery-report`) and confirm the
   file renders. On phones where inline PDFs are limited, use the **Open in new
   tab** / **Download** buttons that are always shown.

That's it. No JSON edit, no code edit for any existing evidence folder.

## How the mapping works

Each evidence item in `case.json` has an `assetFolder` field, e.g.:

```json
{ "id": "ch1-body-discovery-report",
  "assetFolder": "chapter-1/02-body-discovery-report__ONE_FILE__pdf" }
```

`npm run assets:manifest` scans `assets/**` and writes
`public/cases/lux-gelle-fra/assets-manifest.json`, a map of
`folder -> [files]`. At runtime the app loads that manifest and attaches the
files found in an item's `assetFolder` to it. The `assetFolder` values are
already filled in for every shipped evidence item, so for existing evidence you
**never** edit JSON.

## Supported file types

- Documents: `.pdf`
- Images: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.svg`
- Audio: `.mp3`, `.wav`, `.ogg`, `.m4a`
- Text-ish (opened in a new tab): `.txt`, `.md`, `.csv`

The type is inferred from the extension. PDFs render inline with new-tab and
download buttons; images render inline with an open-in-new-tab button; audio
gets a player; anything else gets an **Open attachment** button.

## ONE_FILE vs MULTI_FILE folders

- **`__ONE_FILE__`** folders are expected to hold a single attachment. Drop one
  file; it renders directly.
- **`__MULTI_FILE__`** folders may hold several (e.g. an audio clip plus its
  transcript PDF). All files in the folder appear as a small list of
  attachments, each openable/renderable. Example:

  ```
  chapter-3/05-erion-audio__MULTI_FILE__audio-and-transcript/
    erion-audio.mp3
    erion-audio-transcript.pdf
  ```

Nothing enforces the count — `ONE_FILE`/`MULTI_FILE` is a hint for you. If you
drop two files into a `ONE_FILE` folder, both show; the folder name is just
guidance.

## Empty folders never break the game

If a folder is empty (or you remove a file and re-run the manifest), the
evidence still works: it shows its full text content, and — only when a document
was expected — a small, neutral "The attached file is not available yet." note.
There are no immersion-breaking placeholder banners.

## Per-language files

The folder/manifest convention attaches the same files for every language. If
you need a different document per language, add the language code to the file
name (e.g. `report-it.pdf`) and the players will see all variants as
attachments. For most cases the text content already covers translation, so a
single shared file is the norm.

## Suspect avatars

Avatars are still referenced directly in `case.json` (not via the manifest).
Add an `avatar` path to a suspect:

```json
{ "id": "nora-weiss", "name": "Nora Weiss",
  "avatar": "/cases/lux-gelle-fra/assets/shared/suspect-avatars/nora-weiss.png" }
```

Without an avatar the card shows the suspect's initials, so a missing file is
never a problem.

## Adding a brand-new evidence item

Existing evidence needs no JSON edits. To add a *new* clue:

1. Add an object to the `evidence` array in `case.json` with a unique `id`,
   `chapterId`, `category`, `type`, localized `title`/`description`/`content`,
   and an `assetFolder` (the folder you will create).
2. Add the new `id` to that chapter's `evidenceIds` array.
3. Create the folder under `public/cases/lux-gelle-fra/assets/<chapter>/` using
   the `NN-name__ONE_FILE__type` (or `__MULTI_FILE__`) convention, drop any
   file in, and run `npm run assets:manifest`.

## Troubleshooting

- **File doesn't appear:** run `npm run assets:manifest` and refresh. Confirm
  the file is inside the item's `assetFolder` (check the `assetFolder` value in
  `case.json`).
- **Works locally but not deployed:** make sure the file lives under `public/`
  and was committed. `public/` (including `assets-manifest.json`) is copied
  verbatim into the build, and the manifest is regenerated on `prebuild`.
- **JSON won't load / app shows the load error:** you likely introduced a JSON
  syntax error in `case.json` (a trailing comma or unclosed quote). Validate it.

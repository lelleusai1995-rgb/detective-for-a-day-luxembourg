# Detective for a Day

A mobile-first web app / PWA for running a private murder-mystery session with
~10–15 people on their phones, via a shared link. No nickname, no login, no
backend, no database — the case lives in static JSON and progress is stored per
device in LocalStorage.

The shipped case is **The Gëlle Fra Case — Murder Under the Grand Ducal
Fireworks**. The app is generic: swap `public/cases/<caseId>/case.json` and its
`assets/` to run a different case.

## Run locally

```bash
npm install
npm run dev
```

`npm run dev` regenerates the assets manifest first (a `predev` step), then
starts Vite. Open the URL Vite prints, then go to `/game/lux-gelle-fra` (the
root `/` redirects there automatically). English is selected by default;
Italian and Albanian can be switched **from any screen** via the compact
language control in the top header, next to the contrast control.

There is no nickname/login step: open the link, pick language and contrast, tap
**Start the investigation**, and you are in.

## Build & preview

```bash
npm run build      # type-checks then builds to dist/
npm run preview    # serves the production build locally
```

## Deploy

The app is a static SPA. SPA fallback config is included for both hosts.

**Vercel:** import the repo (framework: Vite). `vercel.json` rewrites all routes
to `index.html`. Build command `npm run build`, output `dist`.

**Netlify:** `netlify.toml` sets build `npm run build`, publish `dist`, and the
`/* -> /index.html 200` redirect (also in `public/_redirects`).

## Adding evidence assets (drop a file into a folder — no JSON edit)

The case ships with full text for every clue, so it is playable immediately. To
attach real PDFs/images/audio, **drop the file into the pre-made folder for that
evidence** under `public/cases/lux-gelle-fra/assets/<chapter>/`. The folder
names tell you what belongs there and whether one or many files are expected,
e.g. `chapter-1/02-body-discovery-report__ONE_FILE__pdf/`.

Then regenerate the manifest the app reads at runtime:

```bash
npm run assets:manifest
```

(`npm run dev` and `npm run build` run this automatically as a `predev` /
`prebuild` step, so for local work you usually don't need to run it by hand.)

You do **not** edit `case.json` or any React code to add a file to an existing
evidence folder. See:

- `docs/how-to-add-evidence-assets.md` — the folder-drop workflow.
- `docs/asset-generation-prompts.md` — copy-paste AI prompts for every asset.

## Generate the assets manifest

```bash
npm run assets:manifest    # scans assets/** -> writes assets-manifest.json
```

A browser cannot list a static folder at runtime, so this script
(`scripts/generate-assets-manifest.mjs`) records which files are present in each
evidence folder. The app loads `assets-manifest.json` and attaches the files to
the matching evidence item. If the manifest or a file is missing, the evidence
falls back to its full text content — nothing breaks.

## Project layout

```
public/cases/lux-gelle-fra/   case.json + assets/ (folders per evidence) + assets-manifest.json
scripts/                       generate-assets-manifest.mjs (assets:manifest)
src/types/                    generic case data model
src/data/translations.ts      UI i18n (EN complete; IT/SQ partial w/ fallback)
src/hooks/                     localStorage, language, case loader, progress, contrast, asset manifest
src/utils/                    answer normalisation, storage, localized-asset helpers, progression
src/components/                all screens + AssetViewer, PasswordGate, nav, etc.
docs/                          asset prompts + how-to + dev-state docs
```

## Chapter locking

Chapter progression is **real**. The briefing and Chapter 1 are open from the
start; Chapter 2, 3, 4 and the Final Accusation are genuinely locked until the
correct answer is entered — tapping a locked chapter only shows a password gate,
never its content or evidence. With `evidenceUnlockMode: "chapter_locked"`, the
evidence archive only shows evidence from unlocked chapters, and a direct link
to locked evidence shows a lock screen instead of the content.

## Passwords (configurable in case.json)

Each password requires combining at least two pieces of evidence — none is a
visible string you can copy from a title or a single document:

| Gate | Password | Accepted aliases | Derived from |
|------|----------|------------------|--------------|
| Ch.1 → Ch.2 | `PONTADOLPHE` | `PONT ADOLPHE`, `ADOLPHE`, `BRIDGE`, `ADOLPHE BRIDGE` | fireworks programme + event map (the launch point) |
| Ch.2 → Ch.3 | `GLACIS` | `PLACE DE GLACIS`, `PLACEDEGLACIS` | statements + walking distances (the alibi place that makes the side-room access impossible) |
| Ch.3 → Ch.4 | `0044` | `BADGE0044`, `BADGE 0044`, `NORA BADGE`, `NORA'S BADGE`, `#0044` | badge access log + badge note (the badge number that brackets the side room) |
| Ch.4 → Final | `ROYALPREVIEW` | `ROYAL PREVIEW`, `ROYAL-PREVIEW`, `ROYAL_PREVIEW` | the **body** of the real patch notes (the hidden mode that was removed) |

Matching is case-insensitive, trimmed, accent- and space/punctuation-tolerant,
with aliases. The old passwords (`GELLEFRA`, `ACIERIE86`, `LAB9`, `PATCHNOTES`)
are **no longer valid**. A host/facilitator code, entered into the **final**
password field, jumps straight to the solution: `DETECTIVE2026`
(`hostSolutionCode` in `case.json`; never shown to players).

## Missing assets

The case ships with full text for every clue and no asset files. When an
evidence folder is empty, the player sees the title, description and full text
content with **no** missing-file notice and **no** placeholder banner — the
absence of a file is invisible. Drop a real PDF/image/audio into the folder and
re-run `npm run assets:manifest` and the asset renders normally.

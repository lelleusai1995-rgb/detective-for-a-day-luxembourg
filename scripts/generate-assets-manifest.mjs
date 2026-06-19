// ---------------------------------------------------------------------------
// Asset manifest generator
//
// A browser cannot list the files inside a static folder at runtime, so we
// scan the case `assets/` tree at build/dev time and write a small JSON map.
// The app fetches that map and attaches whatever files it finds to the matching
// evidence item — meaning you can drop PDFs/PNGs/MP3s into the pre-made folders
// and they show up WITHOUT editing case.json or any React code.
//
// Run:  node scripts/generate-assets-manifest.mjs
// (wired to run automatically before `npm run dev` and `npm run build`).
// ---------------------------------------------------------------------------

import { readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CASES_DIR = join(ROOT, "public", "cases");

// Files that are organisational, not evidence attachments.
const IGNORED_NAMES = new Set([".gitkeep", ".ds_store", "thumbs.db"]);

/** Recursively collect all files under `dir` (absolute paths). */
async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile()) {
      if (!IGNORED_NAMES.has(entry.name.toLowerCase())) out.push(full);
    }
  }
  return out;
}

/** Build the manifest for a single case folder (contains assets/). */
async function buildCaseManifest(caseId) {
  const assetsDir = join(CASES_DIR, caseId, "assets");
  if (!existsSync(assetsDir)) return null;

  const files = await walk(assetsDir);
  const folders = {};

  for (const abs of files) {
    // Folder path relative to assets/, using forward slashes for URLs.
    const relFromAssets = relative(assetsDir, abs).split(sep).join("/");
    const lastSlash = relFromAssets.lastIndexOf("/");
    if (lastSlash === -1) continue; // file sits directly in assets/ — skip
    const folder = relFromAssets.slice(0, lastSlash);
    const name = relFromAssets.slice(lastSlash + 1);
    const ext = extname(name).slice(1).toLowerCase();
    const url = `/cases/${caseId}/assets/${relFromAssets}`;

    if (!folders[folder]) folders[folder] = [];
    folders[folder].push({ url, name, ext });
  }

  // Stable, human-friendly ordering: by filename inside each folder.
  for (const key of Object.keys(folders)) {
    folders[key].sort((a, b) => a.name.localeCompare(b.name));
  }

  return { generatedAt: new Date().toISOString(), folders };
}

async function main() {
  if (!existsSync(CASES_DIR)) {
    console.warn(`[assets:manifest] No cases dir at ${CASES_DIR}; nothing to do.`);
    return;
  }

  const entries = await readdir(CASES_DIR, { withFileTypes: true });
  let count = 0;
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const caseId = entry.name;
    const manifest = await buildCaseManifest(caseId);
    if (!manifest) continue;
    const outPath = join(CASES_DIR, caseId, "assets-manifest.json");
    await writeFile(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
    const folderCount = Object.keys(manifest.folders).length;
    const fileCount = Object.values(manifest.folders).reduce(
      (n, arr) => n + arr.length,
      0,
    );
    console.log(
      `[assets:manifest] ${caseId}: ${fileCount} file(s) in ${folderCount} folder(s) -> ${relative(ROOT, outPath)}`,
    );
    count++;
  }
  if (count === 0) console.log("[assets:manifest] No case assets found.");
}

main().catch((err) => {
  console.error("[assets:manifest] Failed:", err);
  process.exit(1);
});

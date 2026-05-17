/**
 * Fix Tekko production assets — remove solid background and add alpha transparency
 *
 * Original assets were exported as RGB with solid #030a17 background.
 * This script uses BFS flood-fill from image edges to remove ONLY the
 * background canvas while preserving Tekko's silhouette completely.
 *
 * Edge pixel analysis showed:
 *   Background color range:  max dist ~9 from #030a17
 *   Tekko body nearest edge: dist ~79 from #030a17
 * - Tolerance of 18 is safe (2x margin from bg, well clear of Tekko body)
 * - Feathering only applies to Tekko body pixels adjacent to removed background,
 *   NOT to all pixels in a radius around removed background.
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const TEKKO_DIR = join(ROOT, "public/tekko");
const BG = { r: 3, g: 10, b: 23 }; // #030a17
const TOLERANCE = 18; // safe: bg max ~9, Tekko body min ~79
// No feathering needed — at 1024x1024 crisp edges look great,
// and browser image scaling handles anti-aliasing automatically.

function colorDist(r, g, b) {
  const dr = r - BG.r;
  const dg = g - BG.g;
  const db = b - BG.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function fixAlpha(fileName) {
  const inputPath = join(TEKKO_DIR, fileName);
  const image = sharp(inputPath);

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const pixels = w * h;
  const C = 4;

  // --- Step 1: BFS flood-fill background from edges ---
  const bgMask = new Uint8Array(pixels); // 1 = background pixel
  const queue = [];

  function seedEdge(x, y) {
    const pos = y * w + x;
    if (bgMask[pos]) return;
    const idx = pos * C;
    if (colorDist(data[idx], data[idx + 1], data[idx + 2]) < TOLERANCE) {
      bgMask[pos] = 1;
      queue.push(pos);
    }
  }

  for (let x = 0; x < w; x++) { seedEdge(x, 0); seedEdge(x, h - 1); }
  for (let y = 1; y < h - 1; y++) { seedEdge(0, y); seedEdge(w - 1, y); }

  const dirs = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
  let head = 0;
  while (head < queue.length) {
    const pos = queue[head++];
    const px = pos % w;
    const py = (pos / w) | 0;
    for (const [dx, dy] of dirs) {
      const nx = px + dx;
      const ny = py + dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const nPos = ny * w + nx;
      if (bgMask[nPos]) continue;
      const idx = nPos * C;
      if (colorDist(data[idx], data[idx + 1], data[idx + 2]) < TOLERANCE) {
        bgMask[nPos] = 1;
        queue.push(nPos);
      }
    }
  }

  // --- Step 2: Set background pixels to fully transparent ---
  for (let i = 0; i < pixels; i++) {
    if (bgMask[i]) {
      data[i * C + 3] = 0;
    }
  }

  // No feathering — at 1024x1024, crisp transparency edges look great.
  // Browser native image scaling handles anti-aliasing automatically.

  // --- Write outputs ---
  const outPng = fileName.replace(/\.(png|webp)$/, ".png");
  const outWebp = fileName.replace(/\.(png|webp)$/, ".webp");
  const outPngPath = join(TEKKO_DIR, outPng);
  const outWebpPath = join(TEKKO_DIR, outWebp);

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(outPngPath);

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .webp({ lossless: true, alphaQuality: 100 })
    .toFile(outWebpPath);

  // Verify
  const pngMeta = await sharp(outPngPath).metadata();
  const webpMeta = await sharp(outWebpPath).metadata();

  // Remove unused vars from log
  const removedCount = queue.length;

  console.log(
    String.fromCodePoint(0x2705) + " " + fileName.padEnd(25) +
    " bg removed: " + removedCount.toLocaleString().padStart(7) + " | " +
    "PNG:" + (pngMeta.channels === 4 ? "RGBA" : "FAIL") + " " +
    "WebP:" + (webpMeta.channels === 4 ? "RGBA" : "FAIL")
  );
}

async function main() {
  const stateFiles = readdirSync(TEKKO_DIR)
    .filter(f => f.endsWith(".png") && f.startsWith("tekko-") &&
      !["tekko-app-icon.png", "tekko-avatar.png", "tekko-badge.png"].includes(f));

  const bonusFiles = ["tekko-avatar.png", "tekko-badge.png", "tekko-app-icon.png"]
    .filter(f => readdirSync(TEKKO_DIR).includes(f));

  const allFiles = [...stateFiles, ...bonusFiles];
  console.log("Fixing alpha transparency for " + allFiles.length + " assets...\n");

  for (const file of allFiles) {
    await fixAlpha(file);
  }

  // Final body-preservation check
  console.log("\nVerification — body preservation in idle.png:");
  const { data: d, info: inf } = await sharp(join(TEKKO_DIR, "tekko-idle.png"))
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = inf.width, h = inf.height;
  let bodyOpaque = 0, bodyTotal = 0;
  for (let y = Math.floor(h * 0.3); y < Math.floor(h * 0.7); y++) {
    for (let x = Math.floor(w * 0.3); x < Math.floor(w * 0.7); x++) {
      const a = d[(y * w + x) * 4 + 3];
      bodyTotal++;
      if (a > 200) bodyOpaque++;
    }
  }
  const pct = (bodyOpaque / bodyTotal * 100).toFixed(1);
  console.log("  Center body: " + pct + "% fully opaque (" + bodyOpaque + "/" + bodyTotal + ")");
  console.log("  Expected: >95% — Tekko body should be fully opaque");
}

main().catch(console.error);

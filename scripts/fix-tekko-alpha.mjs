/**
 * Fix Tekko production assets — flood-fill background to transparent
 *
 * Assets were exported with a solid #030a17 background instead of alpha.
 * This script uses connected-component flood-fill from the edges to safely
 * remove only the canvas background while preserving Tekko's dark body pixels.
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const TEKKO_DIR = join(ROOT, "public/tekko");
const BG = { r: 3, g: 10, b: 23 }; // #030a17
const TOLERANCE = 65; // max color distance for background matching (safe: bg max ~60, char min ~80)
const ANTI_ALIAS_RADIUS = 2; // feather pixels adjacent to transparency

function colorDist(r, g, b) {
  const dr = r - BG.r;
  const dg = g - BG.g;
  const db = b - BG.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

async function fixAlpha(inputName) {
  const inputPath = join(TEKKO_DIR, inputName);
  const image = sharp(inputPath);

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const pixels = w * h;
  const channels = 4;

  // ── Step 1: Flood-fill from edges ────────────────────────────────
  const bgMask = new Uint8Array(pixels); // 1 = background (to remove)
  const queue = [];

  function seedEdge(px, py) {
    const pos = py * w + px;
    if (bgMask[pos]) return;
    const idx = pos * channels;
    if (colorDist(data[idx], data[idx + 1], data[idx + 2]) < TOLERANCE) {
      bgMask[pos] = 1;
      queue.push(pos);
    }
  }

  // Seed all 4 edges
  for (let x = 0; x < w; x++) {
    seedEdge(x, 0);
    seedEdge(x, h - 1);
  }
  for (let y = 1; y < h - 1; y++) {
    seedEdge(0, y);
    seedEdge(w - 1, y);
  }

  // BFS flood-fill (8-directional)
  const dirs = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1],
  ];
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
      const idx = nPos * channels;
      if (colorDist(data[idx], data[idx + 1], data[idx + 2]) < TOLERANCE) {
        bgMask[nPos] = 1;
        queue.push(nPos);
      }
    }
  }

  // ── Step 2: Apply alpha ──────────────────────────────────────────
  const removed = new Set();
  for (let i = 0; i < pixels; i++) {
    if (bgMask[i]) {
      data[i * 4 + 3] = 0;
      removed.add(i);
    }
  }

  // ── Step 3: Anti-alias edges ─────────────────────────────────────
  // Feather pixels adjacent to newly transparent areas
  const featherPass = new Map(); // pos → alpha reduction
  for (const pos of removed) {
    const px = pos % w;
    const py = (pos / w) | 0;
    for (let dy = -ANTI_ALIAS_RADIUS; dy <= ANTI_ALIAS_RADIUS; dy++) {
      for (let dx = -ANTI_ALIAS_RADIUS; dx <= ANTI_ALIAS_RADIUS; dx++) {
        if (dx === 0 && dy === 0) continue;
        const nx = px + dx;
        const ny = py + dy;
        if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
        const nPos = ny * w + nx;
        if (removed.has(nPos)) continue;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const weight = Math.max(0, 1 - dist / (ANTI_ALIAS_RADIUS + 1));
        const current = featherPass.get(nPos) || 1;
        if (weight < current) {
          featherPass.set(nPos, weight);
        }
      }
    }
  }

  for (const [pos, factor] of featherPass) {
    const alphaIdx = pos * 4 + 3;
    // Don't fully zero out — blend semi-transparent for smooth edges
    data[alphaIdx] = Math.round(data[alphaIdx] * factor);
  }

  const outputNamePng = inputName.replace(/\.(png|webp)$/, ".png");
  const outputNameWebp = inputName.replace(/\.(png|webp)$/, ".webp");
  const outputPathPng = join(TEKKO_DIR, outputNamePng);
  const outputPathWebp = join(TEKKO_DIR, outputNameWebp);

  // Write PNG with alpha
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile(outputPathPng);

  // Write WebP lossless (preserves alpha, VP8L format)
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .webp({ lossless: true, alphaQuality: 100 })
    .toFile(outputPathWebp);

  console.log(
    `✅ ${inputName.padEnd(25)} → ${queue.length} edge-connected bg pixels removed, ` +
    `${featherPass.size} anti-alias feather pixels`
  );

  // Verify alpha
  const pngMeta = await sharp(outputPathPng).metadata();
  const webpMeta = await sharp(outputPathWebp).metadata();
  console.log(
    `   PNG: ${pngMeta.channels === 4 ? "✅ RGBA" : "❌ No alpha"}  ` +
    `WebP: ${webpMeta.channels === 4 ? "✅ RGBA" : "❌ No alpha"}`
  );
}

async function main() {
  const files = readdirSync(TEKKO_DIR)
    .filter((f) => f.endsWith(".png") && !f.includes("tekko-app") && !f.includes("avatar") && !f.includes("badge"));

  console.log(`Processing ${files.length} state assets...\n`);

  for (const file of files) {
    await fixAlpha(file);
  }

  // Also fix bonus assets
  const bonusFiles = ["tekko-avatar.png", "tekko-badge.png", "tekko-app-icon.png"];
  for (const file of bonusFiles) {
    if (readdirSync(TEKKO_DIR).includes(file)) {
      await fixAlpha(file);
    }
  }

  console.log("\nAll done. Verifying results...\n");

  // Quick verification
  for (const f of readdirSync(TEKKO_DIR).filter((f) => f.endsWith(".png"))) {
    const meta = await sharp(join(TEKKO_DIR, f)).metadata();
    if (meta.channels !== 4) {
      console.warn(`⚠️  ${f} still has no alpha (${meta.channels} channels)`);
    }
  }
  for (const f of readdirSync(TEKKO_DIR).filter((f) => f.endsWith(".webp") && !f.endsWith(".webp.bak"))) {
    const meta = await sharp(join(TEKKO_DIR, f)).metadata();
    if (meta.channels !== 4) {
      console.warn(`⚠️  ${f} still has no alpha (${meta.channels} channels)`);
    }
  }
}

main().catch(console.error);

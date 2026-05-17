/**
 * Generate OG image for tekup.dk — 1200×630 PNG
 * Uses Sharp to composite Tekko badge + gradient background + text
 */
import sharp from "sharp";
import { join } from "node:path";

const ROOT = process.cwd();
const OUTPUT = join(ROOT, "public/og-image.png");

const W = 1200;
const H = 630;

// Simple SVG background with gradient + text
const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="50%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <!-- Subtle grid pattern -->
  <g opacity="0.03" stroke="#fff" stroke-width="0.5">
    ${Array.from({length: 12}, (_, i) => `<line x1="0" y1="${i*60}" x2="${W}" y2="${i*60}" />`).join('\n    ')}
    ${Array.from({length: 20}, (_, i) => `<line x1="${i*70}" y1="0" x2="${i*70}" y2="${H}" />`).join('\n    ')}
  </g>
  <!-- Decorative blobs -->
  <ellipse cx="200" cy="150" rx="300" ry="250" fill="#10b981" opacity="0.06"/>
  <ellipse cx="1000" cy="450" rx="250" ry="200" fill="#f59e0b" opacity="0.05"/>
  <!-- Brand accent line -->
  <rect x="60" y="240" width="80" height="4" rx="2" fill="url(#accent)"/>
  <!-- Title -->
  <text x="60" y="310" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#ffffff">Tekup Digital</text>
  <!-- Subtitle -->
  <text x="60" y="380" font-family="system-ui, sans-serif" font-size="24" fill="#9ca3af">AI-agenter, websites &amp; chatbots til danske SMV'er</text>
  <!-- Bottom tag -->
  <rect x="60" y="520" width="280" height="36" rx="18" fill="#10b981" opacity="0.15"/>
  <text x="200" y="544" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#34d399" text-anchor="middle">Baseret i Aarhus · Dansk support</text>
  <!-- URL -->
  <text x="1060" y="560" font-family="system-ui, sans-serif" font-size="16" fill="#6b7280" text-anchor="end">tekup.dk</text>
</svg>`;

async function main() {
  // Try to include Tekko badge if it exists
  const badgePath = join(ROOT, "public/tekko/tekko-badge.png");
  const hasBadge = await import("node:fs").then(fs => fs.existsSync(badgePath));

  const composite = [];

  if (hasBadge) {
    const badge = await sharp(badgePath)
      .resize(180, 180, { fit: "contain" })
      .png()
      .toBuffer();
    composite.push({ input: badge, top: 50, left: 920 });
  }

  // Render background SVG
  const bg = Buffer.from(svg);

  composite.unshift({ input: bg, top: 0, left: 0 });

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 10, g: 10, b: 10, alpha: 1 } },
  })
    .composite(composite)
    .png()
    .toFile(OUTPUT);

  console.log(`✅ OG image generated: ${OUTPUT} (${W}×${H})`);
}

main().catch((err) => {
  console.error("❌ Failed to generate OG image:", err);
  process.exit(1);
});

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "src/components/tekko/tekkoStates.ts",
  "src/components/tekko/TekkoMascot.tsx",
  "src/components/tekko/TekkoAssistantWidget.tsx",
  "src/components/tekko/TekkoAvatar.tsx",
  "src/components/tekko/TekkoEmptyState.tsx",
  "src/components/tekko/TekkoStatusCard.tsx",
  "src/components/tekko/TekkoToast.tsx",
  "src/components/tekko/index.ts",
  "src/app/tekko/page.tsx",
  "public/tekko-widget.js",
  "docs/TEKKO_MASCOT_SYSTEM.md",
  "docs/TEKKO_IMPLEMENTATION_AUDIT.md",
];

const requiredStates = [
  "idle",
  "thinking",
  "working",
  "success",
  "warning",
  "error",
  "sleeping",
  "connecting",
];

const requiredSvgAssets = requiredStates.map((state) => `public/tekko/tekko-${state}.svg`);
const requiredPngAssets = requiredStates.map((state) => `public/tekko/tekko-${state}.png`);
const requiredWebpAssets = requiredStates.map((state) => `public/tekko/tekko-${state}.webp`);
const requiredExtraAssets = [
  "public/tekko/tekko-avatar.png",
  "public/tekko/tekko-avatar.webp",
  "public/tekko/tekko-badge.png",
  "public/tekko/tekko-badge.webp",
  "public/tekko/tekko-app-icon.png",
  "public/tekko/tekko-app-icon.webp",
];
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

for (const file of [...requiredFiles, ...requiredSvgAssets, ...requiredPngAssets, ...requiredWebpAssets, ...requiredExtraAssets]) {
  check(existsSync(join(root, file)), `Missing required Tekko file: ${file}`);
}

if (existsSync(join(root, "src/components/tekko/tekkoStates.ts"))) {
  const stateSource = read("src/components/tekko/tekkoStates.ts");
  check(stateSource.includes("TekkoAssetSources"), "tekkoStates.ts does not define TekkoAssetSources");
  check(stateSource.includes("createTekkoAsset"), "tekkoStates.ts does not centralize Tekko asset creation");
  for (const state of requiredStates) {
    check(stateSource.includes(`"${state}"`), `tekkoStates.ts does not include state: ${state}`);
    check(stateSource.includes("tekko-${state}.webp"), `tekkoStates.ts does not define WebP source template`);
    check(stateSource.includes("tekko-${state}.png"), `tekkoStates.ts does not define PNG source template`);
    check(stateSource.includes("tekko-${state}.svg"), `tekkoStates.ts does not define SVG fallback template`);
  }
}

if (existsSync(join(root, "src/components/tekko/TekkoMascot.tsx"))) {
  const mascot = read("src/components/tekko/TekkoMascot.tsx");
  check(mascot.includes("preferProductionAsset"), "TekkoMascot does not expose preferProductionAsset");
  check(mascot.includes("asset.sources.webp"), "TekkoMascot does not try WebP production assets");
  check(mascot.includes("asset.sources.png"), "TekkoMascot does not try PNG production assets");
  check(mascot.includes("asset.sources.svg"), "TekkoMascot does not keep SVG fallback");
  check(mascot.includes("setSourceIndex"), "TekkoMascot does not step through fallback sources");
}

if (existsSync(join(root, "src/app/page.tsx"))) {
  const page = read("src/app/page.tsx");
  check(page.includes("TekkoAssistantWidget"), "Landing page does not use TekkoAssistantWidget");
  check(page.includes("TekkoMascot"), "Landing page does not use TekkoMascot");
  check(page.includes('state="success"'), "Landing page does not use Tekko success state");
}

if (existsSync(join(root, "src/app/tekko/page.tsx"))) {
  const preview = read("src/app/tekko/page.tsx");
  check(preview.includes("Tekko Mascot Preview Lab"), "Tekko preview lab title is missing");
  check(preview.includes("preferProductionAsset={false}"), "Tekko preview lab does not show SVG fallback mode");
  check(preview.includes("TekkoAssistantWidget"), "Tekko preview lab does not render assistant widget surface");
  check(preview.includes("TekkoEmptyState"), "Tekko preview lab does not render empty state surface");
  for (const state of requiredStates) {
    check(preview.includes(`"${state}"`), `Tekko preview lab does not include state: ${state}`);
  }
}

if (existsSync(join(root, "src/app/layout.tsx"))) {
  const layout = read("src/app/layout.tsx");
  check(layout.includes("/tekko-widget.js"), "Root layout does not load the Tekko widget script");
  check(layout.includes("TekkoWidget.init"), "Root layout does not initialize TekkoWidget");
  check(layout.includes("https://chat.tekup.dk"), "Root layout does not point TekkoWidget at chat.tekup.dk");
}

if (existsSync(join(root, "public/tekko-widget.js"))) {
  const widget = read("public/tekko-widget.js");
  check(widget.includes("window.TekkoWidget"), "Tekko widget does not expose window.TekkoWidget");
  check(widget.includes("TEKKO_IDLE_SOURCES"), "Tekko widget does not define asset source fallback list");
  check(widget.includes("/tekko/tekko-idle.webp"), "Tekko widget does not try WebP mascot asset");
  check(widget.includes("/tekko/tekko-idle.png"), "Tekko widget does not try PNG mascot asset");
  check(widget.includes("/tekko/tekko-idle.svg"), "Tekko widget does not keep SVG mascot fallback");
  check(widget.includes("createTekkoImage"), "Tekko widget does not centralize mascot image creation");
  check(widget.includes("Tekko tænker"), "Tekko widget does not show thinking copy");
  check(widget.includes("/api/chat"), "Tekko widget does not call the expected chat endpoint");
  check(widget.includes("escapeHtml"), "Tekko widget is missing escapeHtml safety helper");
}

if (failures.length > 0) {
  console.error("Tekko verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Tekko verification passed: ${requiredStates.length} states, SVG fallbacks, PNG + WebP production assets, bonus assets, preview lab, landing integration, widget asset pipeline, and widget embed are present.`);

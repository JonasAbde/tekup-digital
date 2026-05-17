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

const requiredAssets = requiredStates.map((state) => `public/tekko/tekko-${state}.svg`);
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

for (const file of [...requiredFiles, ...requiredAssets]) {
  check(existsSync(join(root, file)), `Missing required Tekko file: ${file}`);
}

if (existsSync(join(root, "src/components/tekko/tekkoStates.ts"))) {
  const stateSource = read("src/components/tekko/tekkoStates.ts");
  for (const state of requiredStates) {
    check(stateSource.includes(`"${state}"`), `tekkoStates.ts does not include state: ${state}`);
    check(stateSource.includes(`/tekko/tekko-${state}.svg`), `tekkoStates.ts does not reference asset for state: ${state}`);
  }
}

if (existsSync(join(root, "src/app/page.tsx"))) {
  const page = read("src/app/page.tsx");
  check(page.includes("TekkoAssistantWidget"), "Landing page does not use TekkoAssistantWidget");
  check(page.includes("TekkoMascot"), "Landing page does not use TekkoMascot");
  check(page.includes('state="success"'), "Landing page does not use Tekko success state");
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
  check(widget.includes("Tekko tænker"), "Tekko widget does not show thinking copy");
  check(widget.includes("/api/chat"), "Tekko widget does not call the expected chat endpoint");
  check(widget.includes("escapeHtml"), "Tekko widget is missing escapeHtml safety helper");
}

if (failures.length > 0) {
  console.error("Tekko verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Tekko verification passed: ${requiredStates.length} states, ${requiredAssets.length} assets, landing integration, and widget embed are present.`);

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function exists(path) {
  return existsSync(join(root, path));
}

const requiredFiles = [
  "package.json",
  "next.config.ts",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/sitemap.ts",
  "src/app/not-found.tsx",
  "src/app/tekko/page.tsx",
  "src/components/TekkoWidgetLoader.tsx",
  "public/tekko-widget.js",
  "public/og-image.png",
  "scripts/verify-tekko.mjs",
  "scripts/generate-og-image.mjs",
  "docs/TEKKO_MASCOT_SYSTEM.md",
  "public/tekko/README.md",
];

for (const file of requiredFiles) {
  check(exists(file), `Missing release-critical file: ${file}`);
}

if (exists("package.json")) {
  const pkg = JSON.parse(read("package.json"));
  check(pkg.scripts?.["verify:tekko"] === "node scripts/verify-tekko.mjs", "package.json missing verify:tekko script");
  check(pkg.scripts?.["generate:og"] === "node scripts/generate-og-image.mjs", "package.json missing generate:og script");
  check(Boolean(pkg.scripts?.build), "package.json missing build script");
  check(Boolean(pkg.scripts?.lint), "package.json missing lint script");
}

if (exists("src/app/layout.tsx")) {
  const layout = read("src/app/layout.tsx");
  check(layout.includes("metadataBase: new URL(siteUrl)"), "layout metadataBase is missing");
  check(layout.includes("/og-image.png"), "layout OpenGraph image is missing");
  check(layout.includes("application/ld+json"), "layout JSON-LD structured data is missing");
  check(layout.includes("<CookieConsent />"), "layout does not render CookieConsent");
  check(layout.includes("<TekkoWidgetLoader />"), "layout does not render TekkoWidgetLoader");
  check(layout.includes('lang="da"'), "layout html language is not Danish");
}

if (exists("src/components/TekkoWidgetLoader.tsx")) {
  const loader = read("src/components/TekkoWidgetLoader.tsx");
  check(loader.includes('src="/tekko-widget.js"'), "TekkoWidgetLoader does not load local widget script");
  check(loader.includes("afterInteractive"), "TekkoWidgetLoader should load afterInteractive");
  check(loader.includes("https://chat.tekup.dk"), "TekkoWidgetLoader does not initialize production chat URL");
}

if (exists("src/app/page.tsx")) {
  const page = read("src/app/page.tsx");
  check(page.includes("function validateField"), "contact form validation is missing");
  check(page.includes("function Spinner"), "contact form spinner is missing");
  check(page.includes("TekkoAssistantWidget"), "landing page missing TekkoAssistantWidget");
  check(page.includes("TekkoMascot"), "landing page missing TekkoMascot");
  check(page.includes('state="working"'), "landing page missing Tekko working state");
  check(page.includes('state="error"'), "landing page missing Tekko error state");
  check(page.includes('state="success"'), "landing page missing Tekko success state");
  check(page.includes('id="om-os"'), "landing page missing om-os anchor");
  check(page.includes('id="kontakt"'), "landing page missing kontakt anchor");
}

if (exists("src/app/sitemap.ts")) {
  const sitemap = read("src/app/sitemap.ts");
  check(sitemap.includes("https://tekup.dk"), "sitemap missing production base URL");
  check(sitemap.includes("/tekko"), "sitemap missing /tekko route");
  check(sitemap.includes("LAST_MODIFIED"), "sitemap should use deterministic LAST_MODIFIED constant");
  check(!sitemap.includes("new Date()"), "sitemap should not use dynamic new Date() in static route output");
}

if (exists("src/app/not-found.tsx")) {
  const notFound = read("src/app/not-found.tsx");
  check(notFound.includes("TekkoMascot"), "404 page missing TekkoMascot");
  check(notFound.includes('state="error"'), "404 page should use Tekko error state");
}

if (exists("public/tekko-widget.js")) {
  const widget = read("public/tekko-widget.js");
  check(widget.includes("window.TekkoWidget"), "widget does not expose window.TekkoWidget");
  check(widget.includes("/tekko/tekko-idle.webp"), "widget does not try Tekko WebP asset first");
  check(widget.includes("/tekko/tekko-idle.png"), "widget does not include PNG fallback");
  check(widget.includes("/tekko/tekko-idle.svg"), "widget does not include SVG fallback");
  check(widget.includes("escapeHtml"), "widget missing escapeHtml helper");
  check(widget.includes("/api/chat"), "widget missing chat endpoint call");
}

if (exists("public/tekko/README.md")) {
  const assetReadme = read("public/tekko/README.md");
  check(assetReadme.includes("production-ready"), "Tekko asset README should state production-ready status");
  check(assetReadme.includes("WebP"), "Tekko asset README missing WebP guidance");
  check(assetReadme.includes("PNG"), "Tekko asset README missing PNG guidance");
  check(assetReadme.includes("SVG"), "Tekko asset README missing SVG fallback guidance");
}

if (failures.length > 0) {
  console.error("Release verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Release verification passed: metadata, sitemap, Tekko, widget, contact form, OG, 404, and production asset contracts are present.");

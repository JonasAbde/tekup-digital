import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://tekup.dk";
const LAST_MODIFIED = new Date("2026-05-17T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: LAST_MODIFIED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tekko`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.2 },
    { url: `${BASE_URL}/privatliv`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/cookies`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/vilkar`, lastModified: LAST_MODIFIED, changeFrequency: "monthly", priority: 0.3 },
  ];
}

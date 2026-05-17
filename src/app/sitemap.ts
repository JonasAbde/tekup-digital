import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tekup.dk";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/privatliv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/vilkar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}

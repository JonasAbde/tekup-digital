"use client";

import Script from "next/script";

/**
 * Client component that loads the Tekko chat widget and initializes it
 * once the script is available. Keeps layout.tsx a pure Server Component.
 */
export function TekkoWidgetLoader() {
  return (
    <Script
      src="/tekko-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as typeof window & {
          TekkoWidget?: { init: (opts: { apiUrl: string }) => void };
        };
        w.TekkoWidget?.init({ apiUrl: "https://chat.tekup.dk" });
      }}
    />
  );
}

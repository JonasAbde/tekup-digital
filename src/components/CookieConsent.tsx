"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("tekup-cookie-consent");
    if (!consent) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("tekup-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("tekup-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 backdrop-blur-xl"
      role="dialog"
      aria-label="Cookie-samtykke"
      aria-describedby="cookie-description"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-5 sm:flex-row sm:px-6">
        <div className="flex-1">
          <p id="cookie-description" className="text-sm leading-relaxed text-gray-400">
            Vi bruger cookies til at forbedre din oplevelse på hjemmesiden. Nogle cookies er nødvendige
            for at siden fungerer, mens andre hjælper os med at forstå, hvordan du bruger siden.
            Læs mere i vores{" "}
            <a href="/cookies" className="text-brand-light underline hover:text-brand">
              cookiepolitik
            </a>{" "}
            og{" "}
            <a href="/privatliv" className="text-brand-light underline hover:text-brand">
              privatlivspolitik
            </a>.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-gray-300 transition-all hover:border-white/40 hover:text-white"
          >
            Afvis
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-dark"
          >
            Acceptér
          </button>
        </div>
      </div>
    </div>
  );
}

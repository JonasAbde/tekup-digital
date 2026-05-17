import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookiepolitik",
  description: "Sådan bruger Tekup Digital cookies — og hvordan du kan styre dem.",
};

export default function CookiesPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Cookiepolitik</h1>
        <p className="mt-2 text-sm text-muted">Senest opdateret: 17. maj 2026</p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-accent" />

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-light">
          <section>
            <h2 className="mb-3 text-lg font-bold text-white">1. Hvad er cookies?</h2>
            <p>
              Cookies er små tekstfiler, der placeres på din computer, tablet eller mobiltelefon, når du besøger en hjemmeside.
              Cookies hjælper med at få hjemmesiden til at fungere effektivt og giver oplysninger til ejeren af siden.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">2. Hvilke cookies bruger vi?</h2>
            <p>Vi bruger udelukkende nødvendige tekniske cookies:</p>
            <div className="mt-3 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-xs" role="table">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="px-4 py-3 font-semibold text-white" scope="col">Cookie</th>
                    <th className="px-4 py-3 font-semibold text-white" scope="col">Formål</th>
                    <th className="px-4 py-3 font-semibold text-white" scope="col">Varighed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-white">tekup-cookie-consent</td>
                    <td className="px-4 py-3">Husker dit cookie-samtykke</td>
                    <td className="px-4 py-3">12 måneder</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-mono text-white">__cf_bm</td>
                    <td className="px-4 py-3">Cloudflare sikkerhedscookie</td>
                    <td className="px-4 py-3">30 minutter</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-white">cf_clearance</td>
                    <td className="px-4 py-3">Cloudflare clearance cookie</td>
                    <td className="px-4 py-3">1 år</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2">
              Vi anvender <strong>ikke</strong> tredjeparts cookies til markedsføring, analyse eller tracking — medmindre du har givet
              dit udtrykkelige samtykke via vores cookie-banner.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">3. Sådan administrerer du cookies</h2>
            <p>
              Du kan til enhver tid trække dit samtykke tilbage eller ændre dine cookie-indstillinger.
              De fleste browsere giver dig også mulighed for at slette eller blokere cookies manuelt:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Chrome:</strong> Indstillinger → Privatliv og sikkerhed → Cookies</li>
              <li><strong>Safari:</strong> Indstillinger → Privatliv → Cookies</li>
              <li><strong>Firefox:</strong> Indstillinger → Privatliv & Sikkerhed → Cookies</li>
              <li><strong>Edge:</strong> Indstillinger → Cookies og webstedstilladelser</li>
            </ul>
            <p className="mt-2">
              Bemærk at hvis du blokerer alle cookies, kan dele af hjemmesiden opleves anderledes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">4. Kontakt</h2>
            <p>
              Har du spørgsmål til vores brug af cookies, er du velkommen til at kontakte os:
            </p>
            <p className="mt-1">
              Tekup Digital ApS · <a href="mailto:hej@tekup.dk" className="text-brand-light underline">hej@tekup.dk</a> · +45 91 72 55 99
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

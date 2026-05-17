import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privatlivspolitik",
  description: "Tekup Digitals privatlivspolitik — sådan behandler vi dine personoplysninger.",
};

export default function PrivatlivPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Privatlivspolitik</h1>
        <p className="mt-2 text-sm text-muted">Senest opdateret: 17. maj 2026</p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-accent" />

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-light">
          <section>
            <h2 className="mb-3 text-lg font-bold text-white">1. Dataansvarlig</h2>
            <p>
              Tekup Digital ApS<br />
              M.P. Bruuns Gade 36<br />
              8000 Aarhus C<br />
              CVR: 45 35 29 18<br />
              Email: hej@tekup.dk<br />
              Telefon: +45 91 72 55 99
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">2. Hvilke personoplysninger indsamler vi?</h2>
            <p>Vi indsamler følgende oplysninger:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Kontaktoplysninger:</strong> Navn, email, telefonnummer — når du udfylder vores kontaktformular</li>
              <li><strong>Tekniske oplysninger:</strong> IP-adresse, browsertype, operativsystem, besøgte sider — via cookies</li>
              <li><strong>Kommunikation:</strong> Indholdet af beskeder du sender til os</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">3. Formål og behandlingsgrundlag</h2>
            <p>Vi behandler dine oplysninger til følgende formål:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Besvare henvendelser</strong> (behandlingsgrundlag: legitim interesse)</li>
              <li><strong>Forbedre hjemmesiden</strong> via analyse af brugsmønstre (grundlag: samtykke via cookie-banner)</li>
              <li><strong>Overholde retlige forpligtelser</strong> (grundlag: retlig forpligtelse)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">4. Opbevaring</h2>
            <p>
              Vi opbevarer dine personoplysninger så længe det er nødvendigt for de formål, de blev indsamlet til.
              Kontaktoplysninger fra henvendelser slettes senest 12 måneder efter sidste kontakt.
              Tekniske data (cookies) opbevares i maksimalt 12 måneder.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">5. Dine rettigheder</h2>
            <p>Du har efter GDPR følgende rettigheder:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Ret til indsigt i de oplysninger vi behandler om dig</li>
              <li>Ret til berigtigelse af urigtige oplysninger</li>
              <li>Ret til sletning ("retten til at blive glemt")</li>
              <li>Ret til begrænsning af behandling</li>
              <li>Ret til dataportabilitet</li>
              <li>Ret til at trække samtykke tilbage</li>
            </ul>
            <p className="mt-2">
              Kontakt os på <a href="mailto:hej@tekup.dk" className="text-brand-light underline">hej@tekup.dk</a> for at udøve dine rettigheder.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">6. Klage til Datatilsynet</h2>
            <p>
              Hvis du mener, at vi behandler dine personoplysninger i strid med GDPR, kan du klage til Datatilsynet:
            </p>
            <p className="mt-1">
              Datatilsynet · Carl Jacobsens Vej 35 · 2500 Valby<br />
              <a href="mailto:dt@datatilsynet.dk" className="text-brand-light underline">dt@datatilsynet.dk</a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">7. Tredjeparter</h2>
            <p>Vi anvender følgende tredjeparter i forbindelse med vores hjemmeside:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>Cloudflare</strong> — CDN og sikkerhed (USA). Overførsel baseret på EU-Kommissionens standardkontraktbestemmelser.</li>
              <li><strong>GitHub</strong> — Kildekode-hosting (USA). Overførsel baseret på SCC.</li>
            </ul>
            <p className="mt-2">
              Vi anvender kun nødvendige cookies. Ingen tredjeparts tracking-cookies sættes uden dit udtrykkelige samtykke.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

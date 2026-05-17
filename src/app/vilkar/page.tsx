import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handelsbetingelser",
  description: "Tekup Digitals handelsbetingelser for levering af AI-agenter, websites, chatbots og relaterede ydelser.",
};

export default function VilkarPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Handelsbetingelser</h1>
        <p className="mt-2 text-sm text-muted">Senest opdateret: 17. maj 2026</p>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand to-accent" />

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-light">
          <section>
            <h2 className="mb-3 text-lg font-bold text-white">1. Generelt</h2>
            <p>
              Disse handelsbetingelser gælder for alle leverancer og aftaler indgået med Tekup Digital ApS
              (CVR: 45 35 29 18), herefter kaldet &quot;Tekup&quot; eller &quot;vi&quot;.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">2. Ydelser</h2>
            <p>
              Tekup leverer følgende typer ydelser:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li><strong>AI-agenter:</strong> Support-, Sales- og Admin-agenter leveres som SaaS-abonnement med opsætningsgebyr</li>
              <li><strong>Hjemmesider:</strong> Starter (1-side) og Pro (5-sider) leveres som færdige løsninger med CMS-adgang</li>
              <li><strong>Chatbots:</strong> FAQ-baserede AI-chatbots leveres som SaaS-abonnement</li>
              <li><strong>Tilvalg:</strong> Compliance, SEO og løbende vedligeholdelse kan tilkøbes separat</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">3. Priser og betaling</h2>
            <p>
              Alle priser er i DKK og eksklusive moms, medmindre andet er angivet.
              Opsætningsgebyr faktureres ved aftalens indgåelse. Månedlige abonnementer faktureres forud.
              Betalingsfrist er 8 dage fra fakturadato.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">4. Fortrydelsesret</h2>
            <p>
              Som forbruger har du 14 dages fortrydelsesret fra aftalens indgåelse.
              Fortrydelsesretten gælder ikke for digitale ydelser, der er påbegyndt med dit udtrykkelige samtykke.
              Erhvervskunder har 14 dages fortrydelsesret, medmindre andet er aftalt skriftligt.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">5. Opsigelse</h2>
            <p>
              Månedlige abonnementer kan opsiges med 30 dages varsel til udgangen af en måned.
              Ved opsigelse stopper adgangen til abonnementsydelsen ved periodens udløb.
              Opsætningsgebyr refunderes ikke ved opsigelse inden for de første 30 dage.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">6. Levering</h2>
            <p>
              Website Starter leveres inden for 3 hverdage efter modtagelse af alt nødvendigt materiale.
              Website Pro leveres inden for 5-7 hverdage. AI-agenter opsættes inden for 1-3 hverdage.
              Leveringstider er vejledende og ikke bindende.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">7. Ansvarsbegrænsning</h2>
            <p>
              Tekup er ikke ansvarlig for driftstab, tabt fortjeneste eller andre indirekte tab som følge af
              brug af vores ydelser. Vores maksimale erstatningsansvar er begrænset til det beløb, kunden
              har betalt for den pågældende ydelse i de seneste 12 måneder.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">8. Tvister</h2>
            <p>
              Tvister søges løst ved forhandling. Opnås der ikke enighed, henvises tvisten til
              Retten i Aarhus. Danske retsregler finder anvendelse.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-white">9. Kontakt</h2>
            <p>
              Tekup Digital ApS<br />
              M.P. Bruuns Gade 36, 8000 Aarhus C<br />
              CVR: 45 35 29 18<br />
              <a href="mailto:hej@tekup.dk" className="text-brand-light underline">hej@tekup.dk</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

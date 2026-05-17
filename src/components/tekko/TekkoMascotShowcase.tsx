import { TekkoAssistantWidget } from "./TekkoAssistantWidget";
import { TekkoStatusCard } from "./TekkoStatusCard";
import { TekkoAvatar } from "./TekkoAvatar";

export function TekkoMascotShowcase() {
  return (
    <section className="rounded-3xl border border-border bg-gradient-to-br from-brand/10 via-card to-accent/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <TekkoAssistantWidget
          state="thinking"
          title="Mød Tekko, din AI-makker"
          message="Tekko hjælper med at gøre AI-agenter, chatbots og workflows nemmere at forstå, bygge og bruge. Ikke magi. Bare bedre feedback. Endelig."
          progress={72}
          actions={[{ label: "Book gratis samtale", href: "#kontakt" }]}
        />

        <div className="grid gap-3">
          <TekkoStatusCard
            state="working"
            title="Bygger automatisering"
            message="Viser klart når systemet arbejder. Brugere slipper for at gætte, hvilket åbenbart stadig er et produktproblem i 2026."
          />
          <TekkoStatusCard
            state="success"
            title="Klar til brug"
            message="Brug Tekko til succes-feedback, onboarding og statusmomenter."
          />
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-4">
            <TekkoAvatar state="idle" />
            <div>
              <p className="text-sm font-semibold text-white">Assistant avatar</p>
              <p className="text-xs text-muted-light">Klar til chatbot, dashboard og support widgets.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

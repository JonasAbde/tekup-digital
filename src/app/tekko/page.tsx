import {
  TekkoAssistantWidget,
  TekkoAvatar,
  TekkoEmptyState,
  TekkoMascot,
  TekkoStatusCard,
  TekkoToast,
  type TekkoState,
} from "@/components/tekko";

export const metadata = {
  title: "Tekko Mascot Preview",
  robots: { index: false, follow: false },
};

const states: TekkoState[] = [
  "idle",
  "thinking",
  "working",
  "success",
  "warning",
  "error",
  "sleeping",
  "connecting",
];

const stateDescriptions: Record<TekkoState, string> = {
  idle: "Ready and attentive",
  thinking: "Gathering context",
  working: "Building automation",
  success: "Task completed",
  warning: "Needs review",
  error: "Blocked or failed",
  sleeping: "Inactive or offline",
  connecting: "Reconnecting",
};

export default function TekkoPreviewPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-3xl border border-border bg-card/60 p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-light">
            Internal mascot QA
          </p>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Tekko Mascot Preview Lab
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-light">
            Use this page to review Tekko states, production asset fallback behavior,
            assistant surfaces, and widget-ready avatar usage before release.
          </p>
        </div>

        <section className="mb-10 rounded-3xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Production asset mode</h2>
              <p className="mt-1 text-sm text-muted-light">
                WebP → PNG → SVG → text fallback. Until final assets exist, SVGs should render.
              </p>
            </div>
            <span className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-light">
              preferProductionAsset=true
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {states.map((state) => (
              <article key={state} className="rounded-2xl border border-border bg-background/50 p-5 text-center">
                <TekkoMascot state={state} size="lg" />
                <h3 className="mt-4 text-base font-bold capitalize text-white">{state}</h3>
                <p className="mt-1 text-xs text-muted-light">{stateDescriptions[state]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-3xl border border-border bg-card/50 p-6 backdrop-blur">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">SVG fallback mode</h2>
              <p className="mt-1 text-sm text-muted-light">
                Forces SVG fallback for comparison and debugging.
              </p>
            </div>
            <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
              preferProductionAsset=false
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {states.map((state) => (
              <article key={state} className="rounded-2xl border border-border bg-background/50 p-5 text-center">
                <TekkoMascot state={state} size="lg" preferProductionAsset={false} />
                <h3 className="mt-4 text-base font-bold capitalize text-white">{state}</h3>
                <p className="mt-1 text-xs text-muted-light">{stateDescriptions[state]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <TekkoAssistantWidget
            state="working"
            title="Tekko is preparing your automation"
            message="Review the production mascot surface before release. Human supervision, how quaint."
            progress={72}
            actions={[{ label: "Til forsiden", href: "/" }]}
          />
          <div className="grid gap-4">
            <TekkoStatusCard
              state="success"
              title="Production pipeline ready"
              message="WebP and PNG assets can now be dropped in without changing component usage."
            />
            <TekkoStatusCard
              state="warning"
              title="Final art assets still needed"
              message="This page validates the pipeline, not the final reference-quality artwork."
            />
          </div>
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <TekkoEmptyState
            title="No final production assets yet"
            message="Add reference-quality PNG/WebP assets under public/tekko and this page will show them automatically."
            actionLabel="View asset issue"
            actionHref="https://github.com/JonasAbde/tekup-digital/issues/5"
          />
          <div className="rounded-3xl border border-border bg-card/50 p-6 backdrop-blur">
            <h2 className="mb-5 text-2xl font-bold text-white">Avatar and toast surfaces</h2>
            <div className="flex flex-wrap items-center gap-4">
              {states.map((state) => (
                <TekkoAvatar key={state} state={state} statusLabel={`Tekko ${state}`} />
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              <TekkoToast state="success" title="Automation ready" message="3 tasks completed successfully." />
              <TekkoToast state="error" title="Needs attention" message="A workflow failed and should be reviewed." />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

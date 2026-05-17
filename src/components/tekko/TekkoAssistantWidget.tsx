import { TekkoMascot } from "./TekkoMascot";
import { getTekkoAsset, tekkoStateStyles, type TekkoState } from "./tekkoStates";

type TekkoAssistantWidgetProps = {
  state?: TekkoState;
  title: string;
  message?: string;
  progress?: number;
  actions?: Array<{ label: string; href: string }>;
  className?: string;
};

export function TekkoAssistantWidget({
  state = "idle",
  title,
  message,
  progress,
  actions = [],
  className = "",
}: TekkoAssistantWidgetProps) {
  const asset = getTekkoAsset(state);
  const safeProgress = typeof progress === "number" ? Math.min(100, Math.max(0, progress)) : undefined;

  return (
    <aside
      className={[
        "rounded-2xl border border-border bg-card/70 p-5 shadow-2xl shadow-black/20 backdrop-blur",
        className,
      ].join(" ")}
      aria-label="Tekko assistant"
    >
      <div className="flex items-start gap-4">
        <TekkoMascot state={state} size="md" />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className={["rounded-full border px-2.5 py-1 text-xs font-medium", tekkoStateStyles[state]].join(" ")}>{asset.label}</span>
            <span className="text-xs text-muted">Tekko Assistant</span>
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-light">{message ?? asset.message}</p>

          {safeProgress !== undefined && (
            <div className="mt-4" aria-label={`Progress ${safeProgress}%`}>
              <div className="mb-1 flex items-center justify-between text-xs text-muted">
                <span>Progress</span>
                <span>{safeProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand via-cyan-400 to-accent transition-all duration-500"
                  style={{ width: `${safeProgress}%` }}
                />
              </div>
            </div>
          )}

          {actions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map((action) => (
                <a
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  className="rounded-lg border border-border bg-white/5 px-3 py-2 text-xs font-semibold text-white transition hover:border-brand/40 hover:bg-brand/10"
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

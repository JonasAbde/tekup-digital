import { TekkoMascot } from "./TekkoMascot";
import { getTekkoAsset, tekkoStateStyles, type TekkoState } from "./tekkoStates";

type TekkoStatusCardProps = {
  state?: TekkoState;
  title?: string;
  message?: string;
  className?: string;
};

export function TekkoStatusCard({ state = "idle", title, message, className = "" }: TekkoStatusCardProps) {
  const asset = getTekkoAsset(state);

  return (
    <article className={["rounded-2xl border p-5", tekkoStateStyles[state], className].join(" ")}>
      <div className="flex items-center gap-4">
        <TekkoMascot state={state} size="md" showGlow={false} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-current/80">{asset.label}</p>
          <h3 className="mt-1 text-base font-bold text-white">{title ?? asset.message}</h3>
          {message && <p className="mt-1 text-sm leading-relaxed text-muted-light">{message}</p>}
        </div>
      </div>
    </article>
  );
}

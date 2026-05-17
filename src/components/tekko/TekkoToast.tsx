import { TekkoMascot } from "./TekkoMascot";
import { tekkoStateStyles, type TekkoState } from "./tekkoStates";

type TekkoToastProps = {
  state?: TekkoState;
  title: string;
  message?: string;
  className?: string;
};

export function TekkoToast({ state = "success", title, message, className = "" }: TekkoToastProps) {
  return (
    <div
      className={["flex items-center gap-3 rounded-2xl border bg-card/90 p-4 shadow-2xl shadow-black/25 backdrop-blur", tekkoStateStyles[state], className].join(" ")}
      role="status"
      aria-live="polite"
    >
      <TekkoMascot state={state} size="sm" showGlow={false} />
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">{title}</p>
        {message && <p className="mt-0.5 text-xs leading-relaxed text-muted-light">{message}</p>}
      </div>
    </div>
  );
}

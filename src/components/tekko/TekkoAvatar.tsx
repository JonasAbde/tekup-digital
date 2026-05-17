import { TekkoMascot } from "./TekkoMascot";
import { tekkoStateStyles, type TekkoSize, type TekkoState } from "./tekkoStates";

type TekkoAvatarProps = {
  state?: TekkoState;
  size?: TekkoSize;
  statusLabel?: string;
  className?: string;
};

export function TekkoAvatar({ state = "idle", size = "sm", statusLabel = "Tekko is online", className = "" }: TekkoAvatarProps) {
  return (
    <div
      className={["relative inline-flex rounded-full border p-1", tekkoStateStyles[state], className].join(" ")}
      aria-label={statusLabel}
      title={statusLabel}
    >
      <TekkoMascot state={state} size={size} showGlow={false} animated={false} />
      <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border border-background bg-brand" aria-hidden="true" />
    </div>
  );
}
